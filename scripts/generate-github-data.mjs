#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const snapshotPath = path.resolve(rootDir, "src/data/contribution.snapshot.json");

// Import semantic config from src/data/contribution.config.ts
// We implement the classifier and configs directly or via dynamic import
export const contributionLayers = [
  {
    id: "editor",
    label: "Translation editor",
    role: "Authoring and project persistence",
    connection: "Discovers Designer text and autosaves the shared translations.json source file.",
  },
  {
    id: "build",
    label: "Build pipeline",
    role: "Validation and asset generation",
    connection: "Reads the project source and emits a manifest plus one compact file per language.",
  },
  {
    id: "android",
    label: "Android runtime",
    role: "Packaging and application",
    connection: "Loads generated assets, resolves locale fallback, and applies properties before initialization.",
  },
  {
    id: "ios",
    label: "iOS runtime",
    role: "Packaging and application",
    connection: "Consumes the same asset contract through Swift loading, formatting, and form integration.",
  },
  {
    id: "tests",
    label: "Verification",
    role: "Contract and behavior coverage",
    connection: "Covers generators, loaders, fallback behavior, formatting, and malformed input.",
  },
  {
    id: "integration",
    label: "Integration",
    role: "Tooling, Companion, and docs",
    connection: "Connects the editor and runtimes to existing toolbars, REPL messaging, project metadata, and documentation.",
  },
];

export const fileLayerOverrides = {
  "appinventor/blocklyeditor/src/replmgr.js": "integration",
  "appinventor/docs/markdown/reference/components/userinterface.md": "integration",
  "appinventor/AIComponentKit.xcodeproj/project.pbxproj": "ios",
  "appinventor/common/src/com/google/appinventor/common/constants/YoungAndroidStructureConstants.java": "build",
};

export function classifyFileLayer(filePath) {
  if (fileLayerOverrides[filePath]) {
    return fileLayerOverrides[filePath];
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

export const trackedPullRequests = [
  {
    id: "pr-3976",
    number: 3976,
    repo: "mit-cml/appinventor-sources",
    isUpstream: true,
    title: "Add static Designer text translations for i18n",
    fallbackBranch: "feature-i18n-mvp-implementation",
    fallbackBaseBranch: "master",
    summary:
      "Foundational upstream pull request implementing static Designer text translations, core i18n data model, build pipeline asset extraction, and initial Android runtime support for App Inventor projects.",
    highlights: [
      "Core Young Android translation data model and key generator",
      "Appengine translation panel integration with Designer components",
      "Buildserver asset generator and manifest compiler",
      "Android runtime translation loader and Form property application",
    ],
    order: 0,
    layer: "integration",
  },
  {
    id: "pr-2",
    number: 2,
    repo: "Akashgite1/appinventor-sources",
    title: "Add dynamic i18n translation keys and runtime lookup",
    fallbackBranch: "feature-i18n-dynamic-placeholders",
    fallbackBaseBranch: "feature-i18n-mvp-implementation",
    summary:
      "Introduced dynamic translation keys with positional placeholders ({0}, {1}), runtime text interpolation, and lookup functions across component blocks.",
    highlights: [
      "Dynamic translation key format with positional parameter syntax",
      "Runtime placeholder substitution engine in components",
      "Dynamic string lookup with graceful fallback to primary text",
    ],
    order: 1,
    layer: "android",
  },
  {
    id: "pr-3",
    number: 3,
    repo: "Akashgite1/appinventor-sources",
    title: "Add Companion i18n preview language selector",
    fallbackBranch: "feature-i18n-companion-preview-language",
    fallbackBaseBranch: "feature-i18n-mvp-implementation",
    summary:
      "Added live preview language switching directly within the Companion toolbar, allowing creators to test multilingual UI without rebuilding APKs.",
    highlights: [
      "Companion toolbar preview language dropdown selector",
      "Guarded update flow preventing glitches during REPL asset transfers",
      "Instant visual UI re-rendering for the active Form",
    ],
    order: 2,
    layer: "integration",
  },
  {
    id: "pr-4",
    number: 4,
    repo: "Akashgite1/appinventor-sources",
    title: "Move i18n translation state to activity-owned manager",
    fallbackBranch: "feature-i18n-form-owned-translation-manager",
    fallbackBaseBranch: "feature-i18n-mvp-implementation",
    summary:
      "Decoupled translation state from individual Form instances into an activity-owned manager, ensuring stable lifecycle state and cross-screen coordination.",
    highlights: [
      "Activity-owned I18nTranslationManager instance",
      "Decoupled Form rendering from translation storage",
      "Persistent locale caching across multi-screen transitions",
    ],
    order: 3,
    layer: "android",
  },
  {
    id: "pr-5",
    number: 5,
    repo: "Akashgite1/appinventor-sources",
    title: "Split i18n translations into per-language assets",
    fallbackBranch: "feature-i18n-per-language-assets",
    fallbackBaseBranch: "feature-i18n-mvp-implementation",
    displayStatusOverride: "ready",
    summary:
      "Optimized packaging by compiling translations into one lightweight manifest plus isolated, compact per-language JSON asset payloads.",
    highlights: [
      "Modular manifest plus language asset partitioning",
      "Significantly reduced APK and memory footprints",
      "On-demand lazy loading of requested language payloads",
    ],
    order: 4,
    layer: "build",
  },
  {
    id: "pr-7",
    number: 7,
    repo: "Akashgite1/appinventor-sources",
    title: "Store and autosave i18n translations in a project file",
    fallbackBranch: "feature-i18n-translation-autosave",
    fallbackBaseBranch: "feature-i18n-per-language-assets",
    displayStatusOverride: "ready",
    summary:
      "Migrated translation source persistence from project settings properties to a dedicated translations.json project file hooked into FileEditor autosave.",
    highlights: [
      "Dedicated translations.json file node in project structure",
      "Integration with FileEditor dirty-tracking and autosave timers",
      "Eliminated custom save RPCs in favor of standard project persistence",
    ],
    order: 5,
    layer: "editor",
  },
  {
    id: "pr-8",
    number: 8,
    repo: "Akashgite1/appinventor-sources",
    title: "Hide shared sidebars in the translation editor",
    fallbackBranch: "feature-i18n-translation-ui-layout",
    fallbackBaseBranch: "feature-i18n-translation-autosave",
    summary:
      "Customized workspace viewport by hiding Designer and Blocks sidebars and the Media panel when the Translation editor is active.",
    highlights: [
      "Distraction-free, dedicated full-viewport translation layout",
      "Context-aware sidebar toggle on view switching",
      "Clean visual transition between Designer, Blocks, and Translations",
    ],
    order: 6,
    layer: "editor",
  },
  {
    id: "pr-9",
    number: 9,
    repo: "Akashgite1/appinventor-sources",
    title: "Feature i18n translation workspace layout",
    fallbackBranch: "feature-i18n-translation-workspace-layout",
    fallbackBaseBranch: "feature-i18n-translation-ui-layout",
    summary:
      "Implemented comprehensive translation workspace with language navigation sidebar, real-time search filtering, and pagination.",
    highlights: [
      "Language navigation sidebar with translation completion statistics",
      "Real-time key and string search filter with highlighting",
      "Paginated entry table handling large projects smoothly",
    ],
    order: 7,
    layer: "editor",
  },
  {
    id: "pr-10",
    number: 10,
    repo: "Akashgite1/appinventor-sources",
    title: "Add translation language setup flow",
    fallbackBranch: "feature-i18n-translation-language-setup",
    fallbackBaseBranch: "feature-i18n-translation-workspace-layout",
    summary:
      "Built interactive language configuration modal with catalog selection, custom language tags, and canonical BCP-47 validation.",
    highlights: [
      "Searchable language catalog modal with predefined languages",
      "Custom BCP-47 tag validation (script, region, and numeric forms)",
      "Primary vs target language designation and fallback rules",
    ],
    order: 8,
    layer: "editor",
  },
  {
    id: "pr-11",
    number: 11,
    repo: "Akashgite1/appinventor-sources",
    title: "Add iOS runtime support for app translations",
    fallbackBranch: "feature-i18n-ios-runtime",
    fallbackBaseBranch: "feature-i18n-translation-language-setup",
    summary:
      "Complete Swift runtime implementation matching Android parity: asset loading, locale fallback, pre-initialize application, dynamic APIs, and iOS Companion preview.",
    highlights: [
      "Swift I18nTranslationManager and I18nFormatter implementation",
      "Buildserver iOS asset extraction task (GenerateI18nTranslationAssets)",
      "Comprehensive Swift XCTest unit test suite",
      "iOS Companion live preview language switching support",
    ],
    order: 9,
    layer: "ios",
  },
];

export function deriveStatus(prData, reviews = [], config = {}) {
  // Explicit status override from semantic configuration
  if (config.displayStatusOverride) {
    const override = config.displayStatusOverride;
    const labels = {
      ready: "Ready",
      merged: "Merged",
      draft: "Draft",
      closed: "Closed",
      "changes-requested": "Changes Requested",
      approved: "Approved",
      "in-review": "In Review",
      open: "Open",
      upstream: "Upstream PR",
    };
    const tones = {
      ready: "green",
      merged: "purple",
      draft: "gray",
      closed: "gray",
      "changes-requested": "amber",
      approved: "green",
      "in-review": "blue",
      open: "teal",
      upstream: "purple",
    };
    return {
      status: override,
      statusLabel: labels[override] || override,
      statusTone: tones[override] || "gray",
    };
  }

  // Upstream repository spotlight
  if (config.isUpstream && prData.state === "open") {
    return {
      status: "upstream",
      statusLabel: "Upstream PR",
      statusTone: "purple",
    };
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
  const reviewStates = (reviews || []).map((r) => r.state);
  if (reviewStates.includes("CHANGES_REQUESTED")) {
    return {
      status: "changes-requested",
      statusLabel: "Changes Requested",
      statusTone: "amber",
    };
  }

  // 5. Approved
  if (reviewStates.includes("APPROVED")) {
    return {
      status: "approved",
      statusLabel: "Approved",
      statusTone: "green",
    };
  }

  // 6. In review
  if (
    (prData.requested_reviewers && prData.requested_reviewers.length > 0) ||
    reviewStates.length > 0
  ) {
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
 * Pure aggregation logic for testability and execution
 */
export function aggregateGithubData(
  prRawResults,
  trackedConfigs = trackedPullRequests,
  layerConfigs = contributionLayers,
  classifyFn = classifyFileLayer
) {
  const commitShaSet = new Set();
  const fileMap = new Map(); // path -> { additions, deletions, kind, previousFilename, layer }

  const pullRequestsSnapshot = [];

  for (const item of prRawResults) {
    const { config, prData, files, commits, reviews } = item;

    // Collect unique commits
    for (const commit of commits || []) {
      if (commit.sha) {
        commitShaSet.add(commit.sha);
      }
    }

    // Process changed files
    for (const file of files || []) {
      const filePath = file.filename;
      const additions = file.additions || 0;
      const deletions = file.deletions || 0;
      const status = file.status; // 'added', 'modified', 'renamed', 'removed'
      const previousFilename = file.previous_filename;

      if (!fileMap.has(filePath)) {
        fileMap.set(filePath, {
          path: filePath,
          additions: 0,
          deletions: 0,
          kind: status === "added" ? "new" : "modified",
          previousFilename: previousFilename || undefined,
          layer: classifyFn(filePath),
        });
      }

      const existing = fileMap.get(filePath);
      existing.additions += additions;
      existing.deletions += deletions;
      if (status === "added") {
        existing.kind = "new";
      }
      if (previousFilename && !existing.previousFilename) {
        existing.previousFilename = previousFilename;
      }
    }

    // Compute derived PR status
    const { status, statusLabel, statusTone } = deriveStatus(prData, reviews, config);

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
      changedFilesCount: prData.changed_files ?? (files || []).length,
      commitShas: (commits || []).map((c) => c.sha).filter(Boolean),
      reviewDecision: reviews?.length ? reviews[reviews.length - 1].state : null,
      updatedAt: prData.updated_at || new Date().toISOString(),
      status,
      statusLabel,
      statusTone,
      summary: config.summary,
      highlights: config.highlights || [],
      order: config.order,
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
  const layersSnapshot = layerConfigs.map((layer) => {
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

  return {
    schemaVersion: 1,
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
}

async function fetchGithubApi(url, token) {
  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "appinventor-i18n-gsoc-sync",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

async function fetchPaginated(baseUrl, token) {
  let page = 1;
  const results = [];
  while (true) {
    const separator = baseUrl.includes("?") ? "&" : "?";
    const url = `${baseUrl}${separator}per_page=100&page=${page}`;
    const chunk = await fetchGithubApi(url, token);
    if (!Array.isArray(chunk) || chunk.length === 0) {
      break;
    }
    results.push(...chunk);
    if (chunk.length < 100) {
      break;
    }
    page++;
  }
  return results;
}

export async function run() {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || "";
  console.log("🔄 Starting GitHub data synchronization...");
  if (token) {
    console.log("🔑 Authenticated using GitHub token from environment.");
  } else {
    console.log("ℹ️ No GH_TOKEN found; using public unauthenticated API access.");
  }

  try {
    const rawResults = [];

    for (const config of trackedPullRequests) {
      console.log(`📡 Fetching ${config.repo}#${config.number} (${config.title})...`);
      const prUrl = `https://api.github.com/repos/${config.repo}/pulls/${config.number}`;
      const prData = await fetchGithubApi(prUrl, token);

      const filesUrl = `https://api.github.com/repos/${config.repo}/pulls/${config.number}/files`;
      const files = await fetchPaginated(filesUrl, token);

      const commitsUrl = `https://api.github.com/repos/${config.repo}/pulls/${config.number}/commits`;
      const commits = await fetchPaginated(commitsUrl, token);

      let reviews = [];
      try {
        const reviewsUrl = `https://api.github.com/repos/${config.repo}/pulls/${config.number}/reviews`;
        reviews = await fetchPaginated(reviewsUrl, token);
      } catch (reviewErr) {
        console.warn(`  ⚠️ Could not fetch reviews for PR #${config.number}: ${reviewErr.message}`);
      }

      rawResults.push({
        config,
        prData,
        files,
        commits,
        reviews,
      });
    }

    const snapshot = aggregateGithubData(rawResults);

    fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
    fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2) + "\n", "utf-8");

    console.log("✅ Successfully synchronized GitHub snapshot!");
    console.log(
      `📊 Totals: ${snapshot.totals.uniqueCommits} commits, ${snapshot.totals.filesTouched} files touched (+${snapshot.totals.linesAdded}/-${snapshot.totals.linesDeleted}), ${snapshot.totals.newFiles} new files.`
    );
    console.log(`📁 Written to: ${snapshotPath}`);
  } catch (err) {
    console.warn(`⚠️ GitHub synchronization encountered an error: ${err.message}`);

    if (fs.existsSync(snapshotPath)) {
      console.log("🛡️ Preserving existing fallback snapshot...");
      try {
        const existing = JSON.parse(fs.readFileSync(snapshotPath, "utf-8"));
        existing.stale = true;
        fs.writeFileSync(snapshotPath, JSON.stringify(existing, null, 2) + "\n", "utf-8");
        console.log("⚠️ Marked existing snapshot as stale. Continuing build.");
        process.exit(0);
      } catch (parseErr) {
        console.error("❌ Failed to parse existing fallback snapshot.", parseErr);
        process.exit(1);
      }
    } else {
      console.error("❌ No fallback snapshot available. Build cannot continue.");
      process.exit(1);
    }
  }
}

// Run if called directly
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  run();
}
