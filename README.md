# MIT App Inventor i18n — GSoC 2026

GitHub Pages-ready source for the Google Summer of Code (GSoC) 2026 final work product and technical handoff for **Internationalization (i18n) support in MIT App Inventor**.

Live Documentation: `https://<user>.github.io/<repo>/`

---

## Architecture & Automated GitHub Data Synchronization

The site is built with **React + Vite + TypeScript** and remains **100% static**. No runtime API requests or credentials are exposed in the client browser bundle.

### How Synchronization Works

1. **Build-Time Generation**: Before the Vite production bundle is created, `scripts/generate-github-data.mjs` executes in Node.js, querying the public GitHub REST API for all tracked pull requests.
2. **Deterministic Aggregation**:
   - Computes unique commit SHAs across all PR branches.
   - Computes unique touched files, churn additions, deletions, and new files.
   - Categorizes files into architectural layers with test-first priority.
   - Derives objective PR statuses (Merged, Draft, Closed, Approved, Changes Requested, In Review, Open, or custom overrides like Ready).
3. **Static Snapshot Output**: Results are written to `src/data/contribution.snapshot.json` and compiled directly into the static site assets.
4. **Scheduled Workflow**: GitHub Actions runs every 6 hours (`cron: "17 */6 * * *"`) and on `workflow_dispatch` to regenerate and redeploy the latest snapshot automatically.

### Generated vs. Configured Information

| Information | Source | Location |
|---|---|---|
| **Live PR Status & State** (Merged, In Review, Open, etc.) | Generated from GitHub API | `contribution.snapshot.json` |
| **Commit SHAs & Total Count** (deduplicated union) | Generated from GitHub API | `contribution.snapshot.json` |
| **File Churn & Diff Stats** (additions, deletions, new files) | Generated from GitHub API | `contribution.snapshot.json` |
| **Tracked PR List & Semantic Overrides** | Manually configured | `src/data/contribution.config.ts` |
| **PR Summaries & Technical Highlights** | Manually configured | `src/data/contribution.config.ts` |
| **Architectural Layer Roles & Connections** | Manually configured | `src/data/contribution.config.ts` |
| **Layer Classification Rules & Path Overrides** | Manually configured | `src/data/contribution.config.ts` |

---

## Metric Definitions

- **Unique Commits**: Union of all commit SHAs across all tracked PRs (duplicate cherry-picks/merges counted once).
- **Files Touched**: Union of distinct file paths modified across the PR stack.
- **Lines Added / Deleted**: Sum of line additions and deletions from the tracked PR file records.
- **New Files**: Union of unique file paths whose GitHub file status is `added`.
- **Renamed Files**: Preserves current filename and tracks previous filename when reported by GitHub.

---

## Local Development & Refresh

### 1. Run Development Server

```bash
npm install
npm run dev
```

The site will load using the local checked-in snapshot (`src/data/contribution.snapshot.json`).

### 2. Refresh GitHub Snapshot Locally

To query live GitHub data locally:

```bash
# Optional: set GH_TOKEN to avoid GitHub rate limits
GH_TOKEN="<your-github-token>" npm run generate:github-data
```

### 3. Run Aggregation Tests

```bash
npm test
```

### 4. Build Production Bundle

```bash
npm run build
```

The compiled static assets will be in `dist/`.

---

## Deployment & Fallback Behavior

- **GitHub Pages CI (`.github/workflows/deploy-pages.yml`)**:
  - Automatically executes on push to `main`, manual dispatch, and every 6 hours on a cron schedule.
  - Passes `GITHUB_TOKEN` to `npm run generate:github-data` inside the runner.
  - Runs unit tests (`npm test`) before building the static bundle.
- **Resilient Fallback**:
  - If the GitHub API is unavailable or rate-limited, the generator retains the existing checked-in snapshot, marks `stale: true`, logs a warning, and allows the deployment build to finish cleanly.
  - The UI displays `"Using cached GitHub snapshot"` when stale, avoiding empty/zero counters.

---

## How to Add Another Tracked Pull Request

To track an additional PR:

1. Open `src/data/contribution.config.ts`.
2. Add an entry to the `trackedPullRequests` array:
   ```ts
   {
     id: "pr-12",
     number: 12,
     repo: "Akashgite1/appinventor-sources",
     title: "PR Title Here",
     summary: "Short explanation of the feature and impact.",
     highlights: [
       "Key accomplishment 1",
       "Key accomplishment 2",
     ],
     order: 10,
     layer: "editor", // or build, android, ios, tests, integration
   }
   ```
3. Run `npm run generate:github-data && npm test && npm run build` to update the snapshot.
