import type {
  ContributionSnapshot,
  PullRequestSnapshot,
  FileChangeTuple,
  ContributionLayerId,
} from "./contribution.types";
import rawSnapshot from "./contribution.snapshot.json";
import {
  contributionLayers as defaultLayers,
  classifyFileLayer,
} from "./contribution.config";

export const repository = "https://github.com/Akashgite1/appinventor-sources";

export const navigation = [
  {
    group: "Start here",
    items: [
      { id: "overview", label: "Project overview" },
      { id: "outcomes", label: "Outcomes" },
      { id: "deliverables", label: "Deliverables" },
    ],
  },
  {
    group: "Implementation",
    items: [
      { id: "architecture", label: "Architecture" },
      { id: "project-format", label: "Project format" },
      { id: "editor", label: "Translation editor" },
      { id: "build-pipeline", label: "Build pipeline" },
    ],
  },
  {
    group: "Verification",
    items: [
      { id: "contribution-map", label: "Contribution map" },
      { id: "testing", label: "Testing evidence" },
    ],
  },
  {
    group: "Handoff",
    items: [
      { id: "contributors", label: "Contributor guide" },
      { id: "future", label: "Future work" },
      { id: "links", label: "Project links" },
    ],
  },
];

export const contributionSnapshot = rawSnapshot as unknown as ContributionSnapshot;


export type PullRequestItem = PullRequestSnapshot;

export const pullRequests: PullRequestItem[] = contributionSnapshot.pullRequests;

export const upstreamPr: PullRequestItem =
  pullRequests.find((pr) => pr.isUpstream) || pullRequests[0];

// Alias for backward compatibility
export const milestones = pullRequests.map((pr) => ({
  title: pr.title,
  branch: pr.branch,
  summary: pr.summary,
  prUrl: pr.prUrl,
  number: pr.number,
  status: pr.status,
  statusLabel: pr.statusLabel,
  statusTone: pr.statusTone,
}));

export const checks = [
  ["Full repository suite", "ant tests", "Passed", "7m 00s on final storage revision"],
  ["Buildserver suite", "ant -f buildserver/build.xml tests", "Passed", "Includes iOS asset-generation tests"],
  ["Project archive", "Fresh .aia export/import", "Passed", "translations.json persisted and reloaded"],
  ["Android package", "APK archive inspection", "Passed", "Manifest + en/fr/hi/mr language assets"],
  ["Legacy storage", "Project/settings inspection", "Passed", "No I18nTranslations settings property"],
  ["iOS runtime", "Swift unit coverage", "Covered", "Loader, formatter, fallback, APIs, and preview behavior"],
];

export const reviewChanges = [
  "Replaced project-settings storage with a dedicated translations.json project file.",
  "Reused FileEditor dirty-state and autosave instead of creating a translation-specific timer or RPC.",
  "Centralized refresh and persistence behavior in handleTranslationsChanged(boolean).",
  "Preserved stable translation keys when components are renamed and removed stale entries on deletion.",
  "Expanded language tags to canonical language, script, region, and numeric-region forms.",
];

export type ContributionLayer = ContributionLayerId;
export type FileChange = FileChangeTuple;

export const fileChanges: FileChange[] = contributionSnapshot.fileChanges as FileChange[];

export const contributionLayers = defaultLayers;

export const snapshotTotals = contributionSnapshot.totals;
export const snapshotMeta = {
  generatedAt: contributionSnapshot.generatedAt,
  stale: contributionSnapshot.stale,
  source: contributionSnapshot.source,
};

export function getContributionLayer(path: string): ContributionLayer {
  return classifyFileLayer(path);
}

export function shortFileName(path: string) {
  return path.slice(path.lastIndexOf("/") + 1);
}
