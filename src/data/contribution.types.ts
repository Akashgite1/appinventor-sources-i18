export type ContributionLayerId =
  | "editor"
  | "build"
  | "android"
  | "ios"
  | "tests"
  | "integration"
  | "unclassified";

export type DerivedStatus =
  | "merged"
  | "draft"
  | "closed"
  | "changes-requested"
  | "approved"
  | "in-review"
  | "open";

export type StatusTone = "purple" | "green" | "blue" | "amber" | "teal" | "gray";

export interface TrackedPrConfig {
  id: string;
  number: number;
  repo: string;
  isUpstream?: boolean;
  title: string;
  summary: string;
  highlights: string[];
  order: number;
  layer?: ContributionLayerId;
  fallbackBranch?: string;
  fallbackBaseBranch?: string;
}

export interface LayerConfig {
  id: ContributionLayerId;
  label: string;
  role: string;
  connection: string;
}

export interface PullRequestSnapshot {
  id: string;
  number: number;
  repo: string;
  isUpstream: boolean;
  prUrl: string;
  title: string;
  branch: string;
  baseBranch: string;
  headSha: string;
  state: "open" | "closed";
  isDraft: boolean;
  mergedAt: string | null;
  additions: number;
  deletions: number;
  changedFilesCount: number;
  commitShas: string[];
  updatedAt: string;
  status: DerivedStatus;

  statusLabel: string;
  statusTone: StatusTone;
  summary: string;
  highlights: string[];
  order: number;
}

export type FileChangeKind = "new" | "modified";

export type FileChangeTuple = [
  path: string,
  additions: number,
  deletions: number,
  kind: FileChangeKind,
  previousFilename?: string
];

export interface LayerStatSnapshot {
  id: ContributionLayerId;
  label: string;
  role: string;
  connection: string;
  files: FileChangeTuple[];
  additions: number;
  deletions: number;
}

export interface ContributionTotalsSnapshot {
  uniqueCommits: number;
  filesTouched: number;
  linesAdded: number;
  linesDeleted: number;
  newFiles: number;
}

export interface ContributionSnapshot {
  schemaVersion: 2;
  generatedAt: string;
  lastAttemptAt?: string;
  source: "github" | "fallback";
  stale: boolean;
  totals: ContributionTotalsSnapshot;
  layers: LayerStatSnapshot[];
  pullRequests: PullRequestSnapshot[];
  unclassifiedFiles: FileChangeTuple[];
  fileChanges: FileChangeTuple[];
}
