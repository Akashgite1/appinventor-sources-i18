#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { aggregateGithubData, atomicWriteJson } from "./contribution-core.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const configPath = path.resolve(rootDir, "src/data/contribution.config.json");
const snapshotPath = path.resolve(rootDir, "src/data/contribution.snapshot.json");

// Read configuration from the single data-only source of truth
const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const { trackedPullRequests = [] } = configData;

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
    throw new Error(`GitHub API HTTP ${res.status} ${res.statusText} for ${url}`);
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

    for (const prConfig of trackedPullRequests) {
      console.log(`📡 Fetching ${prConfig.repo}#${prConfig.number} (${prConfig.title})...`);
      const prUrl = `https://api.github.com/repos/${prConfig.repo}/pulls/${prConfig.number}`;
      const prData = await fetchGithubApi(prUrl, token);

      const filesUrl = `https://api.github.com/repos/${prConfig.repo}/pulls/${prConfig.number}/files`;
      const files = await fetchPaginated(filesUrl, token);

      const commitsUrl = `https://api.github.com/repos/${prConfig.repo}/pulls/${prConfig.number}/commits`;
      const commits = await fetchPaginated(commitsUrl, token);

      let reviews = [];
      try {
        const reviewsUrl = `https://api.github.com/repos/${prConfig.repo}/pulls/${prConfig.number}/reviews`;
        reviews = await fetchPaginated(reviewsUrl, token);
      } catch (reviewErr) {
        console.warn(`  ⚠️ Could not fetch reviews for PR #${prConfig.number}: ${reviewErr.message}`);
      }

      rawResults.push({
        config: prConfig,
        prData,
        files,
        commits,
        reviews,
      });
    }

    const snapshot = aggregateGithubData(rawResults, configData);
    atomicWriteJson(snapshotPath, snapshot);

    if (process.env.GITHUB_OUTPUT) {
      try {
        fs.appendFileSync(process.env.GITHUB_OUTPUT, "is_fresh=true\n");
      } catch (_) {}
    }

    console.log("✅ Successfully synchronized GitHub snapshot!");
    console.log(
      `📊 Totals: ${snapshot.totals.uniqueCommits} commits, ${snapshot.totals.filesTouched} files touched (+${snapshot.totals.linesAdded}/-${snapshot.totals.linesDeleted}), ${snapshot.totals.newFiles} new files.`
    );
    console.log(`📁 Atomically written to: ${snapshotPath}`);
  } catch (err) {
    console.warn(`⚠️ GitHub synchronization encountered an error: ${err.message}`);

    if (fs.existsSync(snapshotPath)) {
      console.log("🛡️ Preserving existing fallback snapshot...");
      try {
        const existing = JSON.parse(fs.readFileSync(snapshotPath, "utf-8"));
        existing.stale = true;
        existing.source = "fallback";
        existing.lastAttemptAt = new Date().toISOString();

        atomicWriteJson(snapshotPath, existing);

        if (process.env.GITHUB_OUTPUT) {
          try {
            fs.appendFileSync(process.env.GITHUB_OUTPUT, "is_fresh=false\n");
          } catch (_) {}
        }

        console.log("⚠️ Marked existing snapshot as fallback/stale. Build may continue with cached data.");
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

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  run();
}
