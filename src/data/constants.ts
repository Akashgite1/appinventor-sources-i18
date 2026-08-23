import type {
  ContributionSnapshot,
  PullRequestSnapshot,
  FileChangeTuple,
  ContributionLayerId,
} from "./contribution.types";
import rawSnapshot from "./contribution.snapshot.json";

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
      { id: "verification", label: "Verification" },
    ],
  },
  {
    group: "Handoff",
    items: [
      { id: "contributors", label: "Contributor guide" },
      { id: "future", label: "Future work" },
      { id: "acknowledgements", label: "Acknowledgements" },
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

export interface VerificationCheck {
  area: string;
  verification: string;
  result: "Passed" | "Covered";
  tone?: "green" | "purple";
  isCode?: boolean;
}

export const verificationChecks: VerificationCheck[] = [
  {
    area: "Automated regression tests",
    verification: "ant tests",
    result: "Passed",
    tone: "green",
    isCode: true,
  },
  {
    area: "Project persistence",
    verification: "Fresh .aia export, import, and translation reload",
    result: "Passed",
    tone: "green",
    isCode: false,
  },
  {
    area: "Android packaging",
    verification: "APK inspection confirmed the generated manifest and per-language assets",
    result: "Passed",
    tone: "green",
    isCode: false,
  },
  {
    area: "iOS implementation",
    verification:
      "Buildserver tests and Swift unit coverage for loading, fallback, formatting, APIs, and preview behavior",
    result: "Covered",
    tone: "purple",
    isCode: false,
  },
];

// Backwards compatibility alias
export const checks = verificationChecks.map((item) => [
  item.area,
  item.verification,
  item.result,
  "",
]);

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

// Consumed directly from pre-computed snapshot layers (no browser-side reclassification)
export const contributionLayers = contributionSnapshot.layers;

export const snapshotTotals = contributionSnapshot.totals;
export const snapshotMeta = {
  generatedAt: contributionSnapshot.generatedAt,
  lastAttemptAt: contributionSnapshot.lastAttemptAt,
  stale: contributionSnapshot.stale,
  source: contributionSnapshot.source,
};

export function shortFileName(path: string) {
  return path.slice(path.lastIndexOf("/") + 1);
}
