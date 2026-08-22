import fs from "node:fs";
import path from "node:path";

export const ALLOWED_LIFECYCLE_STATUSES = new Set([
  "merged",
  "draft",
  "closed",
  "changes-requested",
  "approved",
  "in-review",
  "open",
]);

/**
 * Classify a repository file path into an architectural layer.
 * Tests always take precedence across all components and platforms.
 */
export function classifyFileLayer(filePath, overrides = {}) {
  if (overrides[filePath]) {
    return overrides[filePath];
  }
  // Tests take precedence across all platforms and components
  if (
    filePath.includes("/tests/") ||
    filePath.includes("/Unit Tests/") ||
    filePath.endsWith("Test.java") ||
    filePath.endsWith("Tests.swift")
  ) {
    return "tests";
  }
  if (filePath.includes("components-ios/") || filePath.includes("AIComponentKit.xcodeproj")) {
    return "ios";
  }
  if (filePath.includes("components/src/")) {
    return "android";
  }
  if (filePath.includes("buildserver/") || filePath.includes("common/src/")) {
    return "build";
  }
  if (filePath.includes("appengine/") && !filePath.includes("replmgr")) {
    return "editor";
  }
  if (filePath.includes("blocklyeditor/") || filePath.includes("docs/")) {
    return "integration";
  }
  return "unclassified";
}

/**
 * Derive objective PR lifecycle status in strict order:
 * 1. Merged
 * 2. Draft
 * 3. Closed
 * 4. Changes requested (latest review per reviewer)
 * 5. Approved (latest review per reviewer)
 * 6. In review (requested reviewers or comments/reviews present)
 * 7. Open
 */
export function deriveStatus(prData, reviews = []) {
  // Group reviews by reviewer to determine their latest verdict
  // A newer APPROVED supersedes an older CHANGES_REQUESTED from the same reviewer.
  const latestVerdictByUser = new Map();
  for (const review of reviews || []) {
    const userKey = review.user?.login || review.user?.id;
    if (!userKey) continue;
    if (
      review.state === "APPROVED" ||
      review.state === "CHANGES_REQUESTED" ||
      review.state === "DISMISSED"
    ) {
      latestVerdictByUser.set(userKey, review.state);
    }
  }

  const latestStates = Array.from(latestVerdictByUser.values());
  let reviewDecision = null;
  if (latestStates.includes("CHANGES_REQUESTED")) {
    reviewDecision = "CHANGES_REQUESTED";
  } else if (latestStates.includes("APPROVED")) {
    reviewDecision = "APPROVED";
  } else if (
    (prData.requested_reviewers && prData.requested_reviewers.length > 0) ||
    (reviews && reviews.length > 0)
  ) {
    reviewDecision = "REVIEW_REQUESTED";
  }

  // 1. Merged
  if (prData.merged_at) {
    return {
      status: "merged",
      statusLabel: "Merged",
      statusTone: "purple",
    };
  }

  // 2. Draft
  if (prData.draft) {
    return {
      status: "draft",
      statusLabel: "Draft",
      statusTone: "gray",
    };
  }

  // 3. Closed without merging
  if (prData.state === "closed" && !prData.merged_at) {
    return {
      status: "closed",
      statusLabel: "Closed",
      statusTone: "gray",
    };
  }

  // 4. Changes requested
  if (reviewDecision === "CHANGES_REQUESTED") {
    return {
      status: "changes-requested",
      statusLabel: "Changes Requested",
      statusTone: "amber",
    };
  }

  // 5. Approved
  if (reviewDecision === "APPROVED") {
    return {
      status: "approved",
      statusLabel: "Approved",
      statusTone: "green",
    };
  }

  // 6. In review
  if (reviewDecision === "REVIEW_REQUESTED") {
    return {
      status: "in-review",
      statusLabel: "In Review",
      statusTone: "blue",
    };
  }

  // 7. Open
  return {
    status: "open",
    statusLabel: "Open",
    statusTone: "teal",
  };
}

/**
 * Aggregates raw GitHub PR results into the static contribution snapshot schema v2.
 */
export function aggregateGithubData(prRawResults, configData) {
  const {
    trackedPullRequests = [],
    contributionLayers = [],
    fileLayerOverrides = {},
  } = configData || {};

  const commitShaSet = new Set();
  const fileMap = new Map(); // filePath -> { path, additions, deletions, kind, previousFilename, layer }
  const pullRequestsSnapshot = [];

  for (const item of prRawResults) {
    const { config, prData, files = [], commits = [], reviews = [] } = item;

    // Collect unique commits
    for (const commit of commits) {
      if (commit?.sha) {
        commitShaSet.add(commit.sha);
      }
    }

    // Process changed files with rename deduplication across stacked PRs
    for (const file of files) {
      const filePath = file.filename;
      const additions = file.additions || 0;
      const deletions = file.deletions || 0;
      const status = file.status; // 'added', 'modified', 'renamed', 'removed'
      const previousFilename = file.previous_filename;

      // If this file was previously known by another name in a stacked PR, alias/migrate it
      if (previousFilename && fileMap.has(previousFilename) && previousFilename !== filePath) {
        const oldRecord = fileMap.get(previousFilename);
        fileMap.delete(previousFilename);

        if (!fileMap.has(filePath)) {
          fileMap.set(filePath, {
            path: filePath,
            additions: oldRecord.additions,
            deletions: oldRecord.deletions,
            kind: oldRecord.kind === "new" || status === "added" ? "new" : "modified",
            previousFilename: oldRecord.previousFilename || previousFilename,
            layer: classifyFileLayer(filePath, fileLayerOverrides),
          });
        } else {
          const current = fileMap.get(filePath);
          current.additions += oldRecord.additions;
          current.deletions += oldRecord.deletions;
          if (oldRecord.kind === "new") {
            current.kind = "new";
          }
        }
      }

      if (!fileMap.has(filePath)) {
        fileMap.set(filePath, {
          path: filePath,
          additions: 0,
          deletions: 0,
          kind: status === "added" ? "new" : "modified",
          previousFilename: previousFilename || undefined,
          layer: classifyFileLayer(filePath, fileLayerOverrides),
        });
      }

      const entry = fileMap.get(filePath);
      entry.additions += additions;
      entry.deletions += deletions;
      if (status === "added") {
        entry.kind = "new";
      }
      if (previousFilename && !entry.previousFilename) {
        entry.previousFilename = previousFilename;
      }
    }

    // Compute derived PR status
    const { status, statusLabel, statusTone } = deriveStatus(prData, reviews);

    pullRequestsSnapshot.push({
      id: config.id,
      number: prData.number,
      repo: config.repo,
      isUpstream: Boolean(config.isUpstream),
      prUrl: prData.html_url || `https://github.com/${config.repo}/pull/${prData.number}`,
      title: config.title || prData.title,
      branch: prData.head?.ref || config.fallbackBranch || "unknown",
      baseBranch: prData.base?.ref || config.fallbackBaseBranch || "master",
      headSha: prData.head?.sha || "",
      state: prData.state || "open",
      isDraft: Boolean(prData.draft),
      mergedAt: prData.merged_at || null,
      additions: prData.additions ?? 0,
      deletions: prData.deletions ?? 0,
      changedFilesCount: prData.changed_files ?? files.length,
      commitShas: commits.map((c) => c.sha).filter(Boolean),
      updatedAt: prData.updated_at || new Date().toISOString(),
      status,
      statusLabel,
      statusTone,
      summary: config.summary,
      highlights: config.highlights || [],
      order: config.order ?? 0,
    });
  }


  // Sort PR snapshots deterministically by order
  pullRequestsSnapshot.sort((a, b) => a.order - b.order);

  // Compute file changes list
  const allFilesList = Array.from(fileMap.values());
  const uniqueNewFiles = allFilesList.filter((f) => f.kind === "new").length;
  const totalLinesAdded = allFilesList.reduce((sum, f) => sum + f.additions, 0);
  const totalLinesDeleted = allFilesList.reduce((sum, f) => sum + f.deletions, 0);

  // Layer statistics
  const layersSnapshot = contributionLayers.map((layer) => {
    const layerFiles = allFilesList
      .filter((f) => f.layer === layer.id)
      .map(
        (f) =>
          /** @type {[string, number, number, 'new' | 'modified', string?]} */ ([
            f.path,
            f.additions,
            f.deletions,
            f.kind,
            ...(f.previousFilename ? [f.previousFilename] : []),
          ])
      );

    // Sort layer files deterministically: additions desc, deletions desc, path asc
    layerFiles.sort((a, b) => b[1] - a[1] || b[2] - a[2] || a[0].localeCompare(b[0]));

    const additions = layerFiles.reduce((sum, f) => sum + f[1], 0);
    const deletions = layerFiles.reduce((sum, f) => sum + f[2], 0);

    return {
      id: layer.id,
      label: layer.label,
      role: layer.role,
      connection: layer.connection,
      files: layerFiles,
      additions,
      deletions,
    };
  });

  const unclassifiedFiles = allFilesList
    .filter((f) => f.layer === "unclassified")
    .map(
      (f) =>
        /** @type {[string, number, number, 'new' | 'modified', string?]} */ ([
          f.path,
          f.additions,
          f.deletions,
          f.kind,
          ...(f.previousFilename ? [f.previousFilename] : []),
        ])
    );
  unclassifiedFiles.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const fileChangesTuples = allFilesList.map(
    (f) =>
      /** @type {[string, number, number, 'new' | 'modified', string?]} */ ([
        f.path,
        f.additions,
        f.deletions,
        f.kind,
        ...(f.previousFilename ? [f.previousFilename] : []),
      ])
  );
  fileChangesTuples.sort((a, b) => b[1] - a[1] || b[2] - a[2] || a[0].localeCompare(b[0]));

  const snapshot = {
    schemaVersion: 2,
    generatedAt: new Date().toISOString(),
    source: "github",
    stale: false,
    totals: {
      uniqueCommits: commitShaSet.size,
      filesTouched: fileMap.size,
      linesAdded: totalLinesAdded,
      linesDeleted: totalLinesDeleted,
      newFiles: uniqueNewFiles,
    },
    layers: layersSnapshot,
    pullRequests: pullRequestsSnapshot,
    unclassifiedFiles,
    fileChanges: fileChangesTuples,
  };

  validateContributionSnapshot(snapshot);
  return snapshot;
}

/**
 * Validates a contribution snapshot against schema v2 constraints.
 * Throws a detailed Error if validation fails.
 */
export function validateContributionSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object") {
    throw new Error("Snapshot must be a non-null object.");
  }
  if (snapshot.schemaVersion !== 2) {
    throw new Error(`Unsupported schemaVersion ${snapshot.schemaVersion}. Expected schemaVersion: 2.`);
  }
  if (typeof snapshot.generatedAt !== "string" || !snapshot.generatedAt) {
    throw new Error("Missing or invalid generatedAt timestamp.");
  }
  if (snapshot.source !== "github" && snapshot.source !== "fallback") {
    throw new Error(`Invalid snapshot source "${snapshot.source}". Must be 'github' or 'fallback'.`);
  }
  if (typeof snapshot.stale !== "boolean") {
    throw new Error("Missing or invalid stale flag.");
  }

  // Totals validation
  const { totals, layers, pullRequests, fileChanges, unclassifiedFiles = [] } = snapshot;
  if (!totals || typeof totals !== "object") {
    throw new Error("Missing totals object.");
  }
  for (const metric of ["uniqueCommits", "filesTouched", "linesAdded", "linesDeleted", "newFiles"]) {
    if (typeof totals[metric] !== "number" || totals[metric] < 0 || !Number.isFinite(totals[metric])) {
      throw new Error(`Invalid totals.${metric}: expected non-negative finite number.`);
    }
  }

  // Arrays check
  if (!Array.isArray(layers) || !Array.isArray(pullRequests) || !Array.isArray(fileChanges)) {
    throw new Error("Snapshot must contain layers, pullRequests, and fileChanges arrays.");
  }

  // File reconciliation
  if (fileChanges.length !== totals.filesTouched) {
    throw new Error(
      `fileChanges length (${fileChanges.length}) does not match totals.filesTouched (${totals.filesTouched}).`
    );
  }

  const seenFilePaths = new Set();
  for (const fileTuple of fileChanges) {
    if (!Array.isArray(fileTuple) || typeof fileTuple[0] !== "string") {
      throw new Error("Invalid fileChange tuple format.");
    }
    const filePath = fileTuple[0];
    if (seenFilePaths.has(filePath)) {
      throw new Error(`Duplicate file path detected in fileChanges: ${filePath}`);
    }
    seenFilePaths.add(filePath);
  }

  // Layer reconciliation
  const layerAdditionsSum = layers.reduce((sum, l) => sum + (l.additions || 0), 0);
  const layerDeletionsSum = layers.reduce((sum, l) => sum + (l.deletions || 0), 0);
  const layerFilesCount = layers.reduce((sum, l) => sum + (l.files?.length || 0), 0);

  const unclassifiedAdditionsSum = unclassifiedFiles.reduce((sum, f) => sum + (f[1] || 0), 0);
  const unclassifiedDeletionsSum = unclassifiedFiles.reduce((sum, f) => sum + (f[2] || 0), 0);
  const unclassifiedFilesCount = unclassifiedFiles.length;

  if (layerAdditionsSum + unclassifiedAdditionsSum !== totals.linesAdded) {
    throw new Error(
      `Layer additions (${layerAdditionsSum} + ${unclassifiedAdditionsSum}) do not match totals.linesAdded (${totals.linesAdded}).`
    );
  }
  if (layerDeletionsSum + unclassifiedDeletionsSum !== totals.linesDeleted) {
    throw new Error(
      `Layer deletions (${layerDeletionsSum} + ${unclassifiedDeletionsSum}) do not match totals.linesDeleted (${totals.linesDeleted}).`
    );
  }
  if (layerFilesCount + unclassifiedFilesCount !== totals.filesTouched) {
    throw new Error(
      `Layer files count (${layerFilesCount} + ${unclassifiedFilesCount}) does not match totals.filesTouched (${totals.filesTouched}).`
    );
  }

  // PR validation
  const seenPrIds = new Set();
  for (const pr of pullRequests) {
    if (!pr.id || typeof pr.id !== "string") {
      throw new Error(`Missing PR id: ${JSON.stringify(pr)}`);
    }
    if (seenPrIds.has(pr.id)) {
      throw new Error(`Duplicate PR ID detected: ${pr.id}`);
    }
    seenPrIds.add(pr.id);

    if (!ALLOWED_LIFECYCLE_STATUSES.has(pr.status)) {
      throw new Error(
        `Invalid PR status "${pr.status}" on ${pr.id}. Must be one of: ${Array.from(ALLOWED_LIFECYCLE_STATUSES).join(", ")}.`
      );
    }
    if (typeof pr.isUpstream !== "boolean") {
      throw new Error(`Missing or invalid isUpstream boolean on ${pr.id}`);
    }
  }

  return true;
}

/**
 * Atomically writes a JSON object to target file path using a temporary file in the same directory.
 * Removes temporary files if an error occurs. Supports dependency-injected fs implementation.
 */
export function atomicWriteJson(targetPath, data, fsImpl = fs) {
  const targetDir = path.dirname(targetPath);
  fsImpl.mkdirSync(targetDir, { recursive: true });

  const randomSuffix = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const tempPath = path.join(targetDir, `.tmp-${path.basename(targetPath)}-${randomSuffix}.tmp`);

  try {
    fsImpl.writeFileSync(tempPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
    fsImpl.renameSync(tempPath, targetPath);
  } catch (err) {
    if (fsImpl.existsSync && fsImpl.existsSync(tempPath)) {
      try {
        fsImpl.unlinkSync(tempPath);
      } catch (_) {}
    }
    throw err;
  }
}

/**
 * Marks a checked-in snapshot as fallback while preserving generatedAt and atomic writing.
 */
export function markSnapshotAsFallback(snapshotPath, attemptedAt = new Date().toISOString(), fsImpl = fs) {
  if (!fsImpl.existsSync(snapshotPath)) {
    throw new Error(`Snapshot file does not exist at ${snapshotPath}`);
  }

  const existing = JSON.parse(fsImpl.readFileSync(snapshotPath, "utf-8"));
  existing.stale = true;
  existing.source = "fallback";
  existing.lastAttemptAt = attemptedAt;

  validateContributionSnapshot(existing);
  atomicWriteJson(snapshotPath, existing, fsImpl);
  return existing;
}
