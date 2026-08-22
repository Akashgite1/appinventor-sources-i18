import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import {
  aggregateGithubData,
  deriveStatus,
  classifyFileLayer,
  atomicWriteJson,
  markSnapshotAsFallback,
  validateContributionSnapshot,
  ALLOWED_LIFECYCLE_STATUSES,
} from "../scripts/contribution-core.mjs";

const configPath = path.resolve("src/data/contribution.config.json");
const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const realSnapshotPath = path.resolve("src/data/contribution.snapshot.json");

describe("GitHub Data Aggregator & Hardening Tests", () => {
  it("validates the real checked-in contribution.snapshot.json against schemaVersion 2", () => {
    const realSnapshot = JSON.parse(fs.readFileSync(realSnapshotPath, "utf-8"));
    assert.equal(realSnapshot.schemaVersion, 2);
    assert.ok(validateContributionSnapshot(realSnapshot));

    for (const pr of realSnapshot.pullRequests) {
      assert.ok(
        ALLOWED_LIFECYCLE_STATUSES.has(pr.status),
        `Status ${pr.status} on PR ${pr.id} must be an allowed lifecycle status.`
      );
      assert.notEqual(pr.status, "ready", "Status 'ready' is not an allowed lifecycle status");
      assert.notEqual(pr.status, "upstream", "Status 'upstream' is not an allowed lifecycle status");
      assert.equal(typeof pr.isUpstream, "boolean");
    }
  });

  it("verifies one shared configuration source is loaded from contribution.config.json", () => {
    assert.ok(Array.isArray(configData.trackedPullRequests));
    assert.ok(Array.isArray(configData.contributionLayers));
    assert.ok(typeof configData.fileLayerOverrides === "object");

    const prNumbers = configData.trackedPullRequests.map((p) => p.number);
    const expected = [3976, 2, 3, 4, 5, 7, 8, 9, 10, 11];
    assert.deepEqual(prNumbers, expected);
  });

  it("deduplicates commit SHAs across multiple pull requests", () => {
    const mockPrs = [
      {
        config: { id: "pr-1", number: 1, repo: "test/repo", order: 1 },
        prData: { number: 1, additions: 10, deletions: 2, state: "open" },
        files: [],
        commits: [{ sha: "abc123" }, { sha: "def456" }],
        reviews: [],
      },
      {
        config: { id: "pr-2", number: 2, repo: "test/repo", order: 2 },
        prData: { number: 2, additions: 5, deletions: 1, state: "open" },
        files: [],
        commits: [{ sha: "def456" }, { sha: "ghi789" }], // duplicate def456
        reviews: [],
      },
    ];

    const snapshot = aggregateGithubData(mockPrs, configData);
    assert.equal(snapshot.totals.uniqueCommits, 3); // abc123, def456, ghi789
  });

  it("deduplicates files touched and accumulates line additions/deletions across PRs", () => {
    const mockPrs = [
      {
        config: { id: "pr-1", number: 1, repo: "test/repo", order: 1 },
        prData: { number: 1, state: "open" },
        files: [
          { filename: "appinventor/components/src/Form.java", additions: 50, deletions: 10, status: "modified" },
          { filename: "appinventor/appengine/src/Panel.java", additions: 100, deletions: 0, status: "added" },
        ],
        commits: [],
        reviews: [],
      },
      {
        config: { id: "pr-2", number: 2, repo: "test/repo", order: 2 },
        prData: { number: 2, state: "open" },
        files: [
          { filename: "appinventor/components/src/Form.java", additions: 20, deletions: 5, status: "modified" },
          { filename: "appinventor/buildserver/src/Generator.java", additions: 40, deletions: 2, status: "added" },
        ],
        commits: [],
        reviews: [],
      },
    ];

    const snapshot = aggregateGithubData(mockPrs, configData);
    assert.equal(snapshot.totals.filesTouched, 3);
    assert.equal(snapshot.totals.linesAdded, 210);
    assert.equal(snapshot.totals.linesDeleted, 17);
    assert.equal(snapshot.totals.newFiles, 2);

    const formFile = snapshot.fileChanges.find((f) => f[0] === "appinventor/components/src/Form.java");
    assert.ok(formFile);
    assert.equal(formFile[1], 70);
    assert.equal(formFile[2], 15);
  });

  it("ensures renamed paths are not double-counted when the old path appeared in an earlier stacked PR", () => {
    const mockPrs = [
      {
        config: { id: "pr-1", number: 1, repo: "test/repo", order: 1 },
        prData: { number: 1, state: "open" },
        files: [
          { filename: "appinventor/appengine/src/OldPanel.java", additions: 30, deletions: 5, status: "added" },
        ],
        commits: [],
        reviews: [],
      },
      {
        config: { id: "pr-2", number: 2, repo: "test/repo", order: 2 },
        prData: { number: 2, state: "open" },
        files: [
          {
            filename: "appinventor/appengine/src/NewPanel.java",
            previous_filename: "appinventor/appengine/src/OldPanel.java",
            additions: 15,
            deletions: 2,
            status: "renamed",
          },
        ],
        commits: [],
        reviews: [],
      },
    ];

    const snapshot = aggregateGithubData(mockPrs, configData);
    assert.equal(snapshot.totals.filesTouched, 1);
    assert.equal(snapshot.totals.linesAdded, 45); // 30 + 15
    assert.equal(snapshot.totals.linesDeleted, 7); // 5 + 2
    assert.equal(snapshot.totals.newFiles, 1);

    const renamed = snapshot.fileChanges.find((f) => f[0] === "appinventor/appengine/src/NewPanel.java");
    assert.ok(renamed);
    assert.equal(renamed[4], "appinventor/appengine/src/OldPanel.java");
  });

  it("proves a newer approval supersedes an older change request from the same reviewer", () => {
    // Reviewer 1 requested changes, then later approved
    const reviewsA = [
      { user: { login: "reviewer-1" }, state: "CHANGES_REQUESTED" },
      { user: { login: "reviewer-1" }, state: "APPROVED" },
    ];
    const statusA = deriveStatus({ state: "open" }, reviewsA);
    assert.equal(statusA.status, "approved");

    // Reviewer 1 approved, but later requested changes
    const reviewsB = [
      { user: { login: "reviewer-1" }, state: "APPROVED" },
      { user: { login: "reviewer-1" }, state: "CHANGES_REQUESTED" },
    ];
    const statusB = deriveStatus({ state: "open" }, reviewsB);
    assert.equal(statusB.status, "changes-requested");

    // Reviewer 1 approved, but Reviewer 2 requested changes
    const reviewsC = [
      { user: { login: "reviewer-1" }, state: "APPROVED" },
      { user: { login: "reviewer-2" }, state: "CHANGES_REQUESTED" },
    ];
    const statusC = deriveStatus({ state: "open" }, reviewsC);
    assert.equal(statusC.status, "changes-requested");
  });


  it("strictly adheres to objective lifecycle priority (merged > draft > closed > changes-requested > approved > in-review > open)", () => {
    // 1. Merged takes absolute precedence
    assert.equal(
      deriveStatus({ state: "closed", merged_at: "2026-08-01T00:00:00Z", draft: true }, []).status,
      "merged"
    );

    // 2. Draft takes precedence over reviews/open
    assert.equal(
      deriveStatus({ state: "open", draft: true }, [{ user: { login: "r1" }, state: "APPROVED" }]).status,
      "draft"
    );

    // 3. Closed without merge
    assert.equal(
      deriveStatus({ state: "closed", merged_at: null }, [{ user: { login: "r1" }, state: "APPROVED" }]).status,
      "closed"
    );

    // 4. Changes requested
    assert.equal(
      deriveStatus({ state: "open" }, [{ user: { login: "r1" }, state: "CHANGES_REQUESTED" }]).status,
      "changes-requested"
    );

    // 5. Approved
    assert.equal(
      deriveStatus({ state: "open" }, [{ user: { login: "r1" }, state: "APPROVED" }]).status,
      "approved"
    );

    // 6. In review
    assert.equal(
      deriveStatus({ state: "open", requested_reviewers: [{ login: "r1" }] }, []).status,
      "in-review"
    );

    // 7. Open
    assert.equal(
      deriveStatus({ state: "open", requested_reviewers: [] }, []).status,
      "open"
    );
  });

  it("classifies layer with test-first priority and places unknown files in unclassified", () => {
    assert.equal(classifyFileLayer("appinventor/components/tests/com/google/util/I18nTest.java"), "tests");
    assert.equal(classifyFileLayer("appinventor/components-ios/tests/Unit Tests/ManagerTests.swift"), "tests");
    assert.equal(classifyFileLayer("appinventor/buildserver/tests/com/google/util/AssetGenTest.java"), "tests");

    assert.equal(classifyFileLayer("appinventor/components-ios/src/I18nManager.swift"), "ios");
    assert.equal(classifyFileLayer("appinventor/components/src/com/google/runtime/Form.java"), "android");
    assert.equal(classifyFileLayer("appinventor/buildserver/src/com/google/util/AssetGen.java"), "build");
    assert.equal(classifyFileLayer("appinventor/appengine/src/com/google/editor/TranslationPanel.java"), "editor");
    assert.equal(classifyFileLayer("appinventor/blocklyeditor/src/replmgr.js", configData.fileLayerOverrides), "integration");

    assert.equal(classifyFileLayer("some/random/untracked/script.py"), "unclassified");
  });

  it("proves real filesystem fallback handling preserves generatedAt and adds lastAttemptAt", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "fallback-test-"));
    const tempSnapshotPath = path.join(tempDir, "contribution.snapshot.json");

    const originalGeneratedAt = "2026-08-15T10:00:00.000Z";
    const testSnapshot = {
      schemaVersion: 2,
      generatedAt: originalGeneratedAt,
      source: "github",
      stale: false,
      totals: { uniqueCommits: 5, filesTouched: 1, linesAdded: 10, linesDeleted: 2, newFiles: 1 },
      layers: [
        {
          id: "editor",
          label: "Translation editor",
          role: "Authoring",
          connection: "Source",
          files: [["appengine/Panel.java", 10, 2, "new"]],
          additions: 10,
          deletions: 2,
        },
      ],
      pullRequests: [
        {
          id: "pr-1",
          number: 1,
          repo: "test/repo",
          isUpstream: false,
          prUrl: "https://github.com/test/repo/pull/1",
          title: "Test PR",
          branch: "test",
          baseBranch: "master",
          headSha: "abc",
          state: "open",
          isDraft: false,
          mergedAt: null,
          additions: 10,
          deletions: 2,
          changedFilesCount: 1,
          commitShas: ["abc"],
          updatedAt: originalGeneratedAt,
          status: "open",

          statusLabel: "Open",
          statusTone: "teal",
          summary: "Summary",
          highlights: [],
          order: 1,
        },
      ],
      unclassifiedFiles: [],
      fileChanges: [["appengine/Panel.java", 10, 2, "new"]],
    };

    atomicWriteJson(tempSnapshotPath, testSnapshot);

    const testAttemptTime = "2026-08-23T02:00:00.000Z";
    markSnapshotAsFallback(tempSnapshotPath, testAttemptTime);

    // Reload from filesystem and verify
    const reloaded = JSON.parse(fs.readFileSync(tempSnapshotPath, "utf-8"));
    assert.equal(reloaded.stale, true);
    assert.equal(reloaded.source, "fallback");
    assert.equal(reloaded.generatedAt, originalGeneratedAt, "generatedAt must be preserved");
    assert.equal(reloaded.lastAttemptAt, testAttemptTime);
    assert.ok(validateContributionSnapshot(reloaded));

    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("proves atomic failure cleans up temporary files and leaves original intact", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "atomic-fail-test-"));
    const targetFile = path.join(tempDir, "original.json");
    const originalContent = { state: "original-safe" };
    fs.writeFileSync(targetFile, JSON.stringify(originalContent), "utf-8");

    const failingFs = {
      ...fs,
      mkdirSync: fs.mkdirSync.bind(fs),
      writeFileSync: fs.writeFileSync.bind(fs),
      renameSync: () => {
        throw new Error("Simulated I/O rename failure");
      },
      existsSync: fs.existsSync.bind(fs),
      unlinkSync: fs.unlinkSync.bind(fs),
    };

    assert.throws(
      () => {
        atomicWriteJson(targetFile, { state: "corrupted" }, failingFs);
      },
      /Simulated I\/O rename failure/
    );

    // Verify original file is still intact
    const after = JSON.parse(fs.readFileSync(targetFile, "utf-8"));
    assert.deepEqual(after, originalContent);

    // Verify no temporary files remain
    const files = fs.readdirSync(tempDir);
    assert.equal(files.length, 1);
    assert.equal(files[0], "original.json");

    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("rejects invalid snapshot structures with validateContributionSnapshot", () => {
    assert.throws(() => validateContributionSnapshot(null), /non-null object/);
    assert.throws(() => validateContributionSnapshot({ schemaVersion: 1 }), /Unsupported schemaVersion/);
    assert.throws(
      () =>
        validateContributionSnapshot({
          schemaVersion: 2,
          generatedAt: "2026-08-01",
          source: "github",
          stale: false,
          totals: { uniqueCommits: -1, filesTouched: 0, linesAdded: 0, linesDeleted: 0, newFiles: 0 },
          layers: [],
          pullRequests: [],
          fileChanges: [],
        }),
      /Invalid totals.uniqueCommits/
    );
    assert.throws(
      () =>
        validateContributionSnapshot({
          schemaVersion: 2,
          generatedAt: "2026-08-01",
          source: "github",
          stale: false,
          totals: { uniqueCommits: 1, filesTouched: 1, linesAdded: 10, linesDeleted: 0, newFiles: 1 },
          layers: [
            {
              id: "editor",
              label: "Editor",
              role: "Role",
              connection: "Conn",
              files: [["a.txt", 10, 0, "new"]],
              additions: 10,
              deletions: 0,
            },
          ],
          pullRequests: [
            { id: "pr-1", status: "invalid-status", isUpstream: false },
          ],
          fileChanges: [["a.txt", 10, 0, "new"]],
        }),
      /Invalid PR status/
    );
  });

});
