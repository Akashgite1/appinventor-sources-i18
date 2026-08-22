# MIT App Inventor i18n — GSoC 2026

GitHub Pages-ready documentation website for the Google Summer of Code (GSoC) 2026 final work product and technical handoff for **Internationalization (i18n) support in MIT App Inventor**.

Live Documentation: `https://<user>.github.io/<repo>/`

---

## Architecture & Automated GitHub Data Synchronization

The website is built with **React + Vite + TypeScript** and remains **100% static**. No client-side database, no backend server, no runtime GitHub API calls, and no exposed GitHub tokens in the frontend bundle.

### How Synchronization Works

1. **Single Source of Truth (`src/data/contribution.config.json`)**:
   Contains data-only PR configurations (titles, summaries, highlights, branch fallbacks), layer metadata, and file classification overrides. Adding or adjusting a PR requires editing **exactly one file**.
2. **Build-Time Generation (`scripts/generate-github-data.mjs`)**:
   Before the Vite static bundle is built, the generator script queries the public GitHub REST API for MIT App Inventor upstream PR `#3976` and contributor PRs `#2, #3, #4, #5, and #7–#11`.
3. **Deterministic Aggregation & Atomic Writing (`scripts/contribution-core.mjs`)**:
   - Aggregates unique commits, unique files touched, diff churn (+additions/-deletions), and new files.
   - Categorizes changed files into architectural layers with **test-first precedence**.
   - Derives objective lifecycle status in strict order: `Merged` $\rightarrow$ `Draft` $\rightarrow$ `Closed` $\rightarrow$ `Changes requested` $\rightarrow$ `Approved` $\rightarrow$ `In review` $\rightarrow$ `Open` (evaluating latest effective review per reviewer).
   - Deduplicates renamed files across stacked PRs without double-counting churn.
   - Writes `src/data/contribution.snapshot.json` atomically using temporary files and directory rename.
4. **Direct UI Consumption**:
   The React application imports the generated snapshot directly. The browser client does not run a redundant file classifier.

---

## Metric Definitions

- **Unique Commits**: Unique commits are the union of exact commit SHAs returned for all tracked pull requests. The same SHA appearing in multiple stacked PRs is counted once. Rebases and cherry-picks that produce different SHAs are counted as different commits.
- **Files Touched**: Union of distinct file paths modified across the tracked PR stack.
- **Lines Added / Deleted**: Sum of line additions and deletions accumulated from tracked PR file records.
- **New Files**: Union of unique file paths whose GitHub status is `added`.
- **Renamed Files**: Preserves current filename and associates historical additions/deletions with the previous filename without double-counting.

---

## Local Development & Refresh

### 1. Run Development Server

```bash
npm ci
npm run dev
```

The site will load using the local checked-in snapshot (`src/data/contribution.snapshot.json`).

### 2. Refresh GitHub Snapshot Locally

```bash
# Optional: set GH_TOKEN to avoid GitHub API rate limits
GH_TOKEN="<your-github-token>" npm run generate:github-data
```

### 3. Run Aggregation & Sync Audit Tests

```bash
npm test
```

### 4. Build Production Bundle

```bash
npm run build
```

The compiled static website is generated in `dist/`.

---

## GitHub Actions & Fallback Semantics

### Workflow Architecture (`.github/workflows/deploy-pages.yml`)
- Triggers on `push` to `main`, manual `workflow_dispatch`, and scheduled cron runs (`cron: "17 */6 * * *"`).
  > **Note**: GitHub Actions scheduled cron triggers and `workflow_dispatch` become active once the workflow file exists on the default branch (`main`).
- Uses `npm ci` for deterministic, clean dependency installation.
- Runs `npm run generate:github-data` with `GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.
- Runs `npm test` and `npm run build` to verify correctness.

### Stale Fallback Handling
- **Checked-in Snapshot vs. Live Deployment**: The repository contains a checked-in fallback snapshot (`src/data/contribution.snapshot.json`) with known good data so local builds and offline environments work out of the box.
- **Resilient CI Execution**: If GitHub API queries fail during a scheduled cron run (e.g. rate-limiting or network outage), the generator marks the snapshot as `stale: true`, sets `source: "fallback"`, records `lastAttemptAt`, and the deployment job is skipped. This ensures that the last successfully deployed live snapshot remains online without overwriting it with stale data.
- **UI Freshness Indicator**:
  - Fresh snapshot: `Last synchronized from GitHub: <formatted date and time>`
  - Stale fallback: `Using cached GitHub snapshot` with an amber indicator.

---

## How to Add Another Tracked Pull Request

Adding a new PR requires modifying **exactly one file**:

1. Open `src/data/contribution.config.json`.
2. Add your PR object into the `trackedPullRequests` array:
   ```json
   {
     "id": "pr-12",
     "number": 12,
     "repo": "Akashgite1/appinventor-sources",
     "isUpstream": false,
     "title": "PR Title Here",
     "fallbackBranch": "feature-branch-name",
     "fallbackBaseBranch": "base-branch-name",
     "summary": "Concise summary of the PR.",
     "highlights": [
       "Key accomplishment 1",
       "Key accomplishment 2"
     ],
     "order": 10,
     "layer": "editor"
   }
   ```
3. Run `npm run generate:github-data && npm test && npm run build` to regenerate the snapshot and compile the site.
