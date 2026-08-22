import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  aggregateGithubData,
  deriveStatus,
  classifyFileLayer,
} from "../scripts/generate-github-data.mjs";

describe("GitHub Data Aggregator Tests", () => {
  it("deduplicates commit SHAs across multiple pull requests", () => {
    const mockPrs = [
      {
        config: { id: "pr-1", number: 1, repo: "test/repo", order: 1, highlights: [] },
        prData: { number: 1, additions: 10, deletions: 2, state: "open" },
        files: [],
        commits: [{ sha: "abc123" }, { sha: "def456" }],
        reviews: [],
      },
      {
        config: { id: "pr-2", number: 2, repo: "test/repo", order: 2, highlights: [] },
        prData: { number: 2, additions: 5, deletions: 1, state: "open" },
        files: [],
        commits: [{ sha: "def456" }, { sha: "ghi789" }], // duplicate def456
        reviews: [],
      },
    ];

    const snapshot = aggregateGithubData(mockPrs);
    assert.equal(snapshot.totals.uniqueCommits, 3); // abc123, def456, ghi789
  });

  it("deduplicates files touched and accumulates line additions/deletions across PRs", () => {
    const mockPrs = [
      {
        config: { id: "pr-1", number: 1, repo: "test/repo", order: 1, highlights: [] },
        prData: { number: 1, state: "open" },
        files: [
          { filename: "appinventor/components/src/Form.java", additions: 50, deletions: 10, status: "modified" },
          { filename: "appinventor/appengine/src/Panel.java", additions: 100, deletions: 0, status: "added" },
        ],
        commits: [],
        reviews: [],
      },
      {
        config: { id: "pr-2", number: 2, repo: "test/repo", order: 2, highlights: [] },
        prData: { number: 2, state: "open" },
        files: [
          // Same file touched in PR 2
          { filename: "appinventor/components/src/Form.java", additions: 20, deletions: 5, status: "modified" },
          { filename: "appinventor/buildserver/src/Generator.java", additions: 40, deletions: 2, status: "added" },
        ],
        commits: [],
        reviews: [],
      },
    ];

    const snapshot = aggregateGithubData(mockPrs);
    assert.equal(snapshot.totals.filesTouched, 3); // Form.java, Panel.java, Generator.java
    assert.equal(snapshot.totals.linesAdded, 210); // 50 + 100 + 20 + 40
    assert.equal(snapshot.totals.linesDeleted, 17); // 10 + 0 + 5 + 2
    assert.equal(snapshot.totals.newFiles, 2); // Panel.java, Generator.java

    // Check individual accumulated file record
    const formFile = snapshot.fileChanges.find((f) => f[0] === "appinventor/components/src/Form.java");
    assert.ok(formFile);
    assert.equal(formFile[1], 70); // 50 + 20
    assert.equal(formFile[2], 15); // 10 + 5
    assert.equal(formFile[3], "modified");
  });

  it("handles renamed files and preserves previous filename", () => {
    const mockPrs = [
      {
        config: { id: "pr-1", number: 1, repo: "test/repo", order: 1, highlights: [] },
        prData: { number: 1, state: "open" },
        files: [
          {
            filename: "appinventor/appengine/src/NewPanel.java",
            previous_filename: "appinventor/appengine/src/OldPanel.java",
            additions: 10,
            deletions: 5,
            status: "renamed",
          },
        ],
        commits: [],
        reviews: [],
      },
    ];

    const snapshot = aggregateGithubData(mockPrs);
    const renamedFile = snapshot.fileChanges.find((f) => f[0] === "appinventor/appengine/src/NewPanel.java");
    assert.ok(renamedFile);
    assert.equal(renamedFile[4], "appinventor/appengine/src/OldPanel.java");
  });

  it("correctly derives all objective PR statuses in priority order", () => {
    // 1. Merged
    assert.equal(deriveStatus({ state: "closed", merged_at: "2026-08-01T00:00:00Z" }).status, "merged");

    // 2. Draft
    assert.equal(deriveStatus({ state: "open", draft: true }).status, "draft");

    // 3. Closed without merge
    assert.equal(deriveStatus({ state: "closed", merged_at: null }).status, "closed");

    // 4. Changes requested
    assert.equal(
      deriveStatus({ state: "open" }, [{ state: "CHANGES_REQUESTED" }]).status,
      "changes-requested"
    );

    // 5. Approved
    assert.equal(
      deriveStatus({ state: "open" }, [{ state: "APPROVED" }]).status,
      "approved"
    );

    // 6. In review (requested reviewers or reviews present)
    assert.equal(
      deriveStatus({ state: "open", requested_reviewers: [{ login: "reviewer" }] }, []).status,
      "in-review"
    );
    assert.equal(
      deriveStatus({ state: "open" }, [{ state: "COMMENTED" }]).status,
      "in-review"
    );

    // 7. Open
    assert.equal(deriveStatus({ state: "open", requested_reviewers: [] }, []).status, "open");

    // Override support (e.g. Ready)
    assert.equal(
      deriveStatus({ state: "open" }, [], { displayStatusOverride: "ready" }).status,
      "ready"
    );

    // Upstream spotlight
    assert.equal(
      deriveStatus({ state: "open" }, [], { isUpstream: true }).status,
      "upstream"
    );
  });

  it("classifies layer with test-first priority and places unknown files in unclassified", () => {
    // Tests take precedence even inside components or buildserver
    assert.equal(classifyFileLayer("appinventor/components/tests/com/google/util/I18nTest.java"), "tests");
    assert.equal(classifyFileLayer("appinventor/components-ios/tests/Unit Tests/ManagerTests.swift"), "tests");
    assert.equal(classifyFileLayer("appinventor/buildserver/tests/com/google/util/AssetGenTest.java"), "tests");

    // Platform layers
    assert.equal(classifyFileLayer("appinventor/components-ios/src/I18nManager.swift"), "ios");
    assert.equal(classifyFileLayer("appinventor/components/src/com/google/runtime/Form.java"), "android");
    assert.equal(classifyFileLayer("appinventor/buildserver/src/com/google/util/AssetGen.java"), "build");
    assert.equal(classifyFileLayer("appinventor/appengine/src/com/google/editor/TranslationPanel.java"), "editor");
    assert.equal(classifyFileLayer("appinventor/blocklyeditor/src/replmgr.js"), "integration");

    // Unclassified unknown file
    assert.equal(classifyFileLayer("some/random/untracked/script.py"), "unclassified");
  });

  it("places unclassified files into snapshot.unclassifiedFiles collection", () => {
    const mockPrs = [
      {
        config: { id: "pr-1", number: 1, repo: "test/repo", order: 1, highlights: [] },
        prData: { number: 1, state: "open" },
        files: [
          { filename: "random/mystery_file.txt", additions: 15, deletions: 3, status: "added" },
        ],
        commits: [],
        reviews: [],
      },
    ];

    const snapshot = aggregateGithubData(mockPrs);
    assert.equal(snapshot.unclassifiedFiles.length, 1);
    assert.equal(snapshot.unclassifiedFiles[0][0], "random/mystery_file.txt");
  });
});
