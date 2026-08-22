export const repository = "https://github.com/Akashgite1/appinventor-sources";

export const navigation = [
  { group: "Start here", items: [
    { id: "overview", label: "Project overview" },
    { id: "outcomes", label: "Outcomes" },
    { id: "deliverables", label: "Deliverables" },
  ]},
  { group: "Implementation", items: [
    { id: "architecture", label: "Architecture" },
    { id: "project-format", label: "Project format" },
    { id: "editor", label: "Translation editor" },
    { id: "build-pipeline", label: "Build pipeline" },
  ]},

  { group: "Verification", items: [
    { id: "contribution-map", label: "Contribution map" },
    { id: "testing", label: "Testing evidence" },
  ]},

  { group: "Handoff", items: [
    { id: "contributors", label: "Contributor guide" },
    { id: "future", label: "Future work" },
    { id: "links", label: "Project links" },
  ]},
];

export interface PullRequestItem {
  id: string;
  number: number;
  prUrl: string;
  repo: "mit-cml/appinventor-sources" | "Akashgite1/appinventor-sources";
  isUpstream?: boolean;
  title: string;
  branch: string;
  baseBranch: string;
  status: "merged" | "ready" | "in-review" | "upstream";
  statusLabel: string;
  statusTone: "purple" | "green" | "blue" | "amber";
  summary: string;
  highlights: string[];
  order: number;
}

export const upstreamPr: PullRequestItem = {
  id: "pr-3976",
  number: 3976,
  prUrl: "https://github.com/mit-cml/appinventor-sources/pull/3976#commits-pushed-93913c8",
  repo: "mit-cml/appinventor-sources",
  isUpstream: true,
  title: "Add static Designer text translations for i18n",
  branch: "feature-i18n-mvp-implementation",
  baseBranch: "master",
  status: "upstream",
  statusLabel: "Upstream PR",
  statusTone: "purple",
  summary: "Foundational upstream pull request implementing static Designer text translations, core i18n data model, build pipeline asset extraction, and initial Android runtime support for App Inventor projects.",
  highlights: [
    "Core Young Android translation data model and key generator",
    "Appengine translation panel integration with Designer components",
    "Buildserver asset generator and manifest compiler",
    "Android runtime translation loader and Form property application",
  ],
  order: 0,
};

export const pullRequests: PullRequestItem[] = [
  upstreamPr,
  {
    id: "pr-2",
    number: 2,
    prUrl: "https://github.com/Akashgite1/appinventor-sources/pull/2",
    repo: "Akashgite1/appinventor-sources",
    title: "Add dynamic i18n translation keys and runtime lookup",
    branch: "feature-i18n-dynamic-placeholders",
    baseBranch: "feature-i18n-mvp-implementation",
    status: "merged",
    statusLabel: "Merged",
    statusTone: "purple",
    summary: "Introduced dynamic translation keys with positional placeholders ({0}, {1}), runtime text interpolation, and lookup functions across component blocks.",
    highlights: [
      "Dynamic translation key format with positional parameter syntax",
      "Runtime placeholder substitution engine in components",
      "Dynamic string lookup with graceful fallback to primary text",
    ],
    order: 1,
  },
  {
    id: "pr-3",
    number: 3,
    prUrl: "https://github.com/Akashgite1/appinventor-sources/pull/3",
    repo: "Akashgite1/appinventor-sources",
    title: "Add Companion i18n preview language selector",
    branch: "feature-i18n-companion-preview-language",
    baseBranch: "feature-i18n-mvp-implementation",
    status: "merged",
    statusLabel: "Merged",
    statusTone: "purple",
    summary: "Added live preview language switching directly within the Companion toolbar, allowing creators to test multilingual UI without rebuilding APKs.",
    highlights: [
      "Companion toolbar preview language dropdown selector",
      "Guarded update flow preventing glitches during REPL asset transfers",
      "Instant visual UI re-rendering for the active Form",
    ],
    order: 2,
  },
  {
    id: "pr-4",
    number: 4,
    prUrl: "https://github.com/Akashgite1/appinventor-sources/pull/4",
    repo: "Akashgite1/appinventor-sources",
    title: "Move i18n translation state to activity-owned manager",
    branch: "feature-i18n-form-owned-translation-manager",
    baseBranch: "feature-i18n-mvp-implementation",
    status: "merged",
    statusLabel: "Merged",
    statusTone: "purple",
    summary: "Decoupled translation state from individual Form instances into an activity-owned manager, ensuring stable lifecycle state and cross-screen coordination.",
    highlights: [
      "Activity-owned I18nTranslationManager instance",
      "Decoupled Form rendering from translation storage",
      "Persistent locale caching across multi-screen transitions",
    ],
    order: 3,
  },
  {
    id: "pr-5",
    number: 5,
    prUrl: "https://github.com/Akashgite1/appinventor-sources/pull/5",
    repo: "Akashgite1/appinventor-sources",
    title: "Split i18n translations into per-language assets",
    branch: "feature-i18n-per-language-assets",
    baseBranch: "feature-i18n-mvp-implementation",
    status: "ready",
    statusLabel: "Ready",
    statusTone: "green",
    summary: "Optimized packaging by compiling translations into one lightweight manifest plus isolated, compact per-language JSON asset payloads.",
    highlights: [
      "Modular manifest plus language asset partitioning",
      "Significantly reduced APK and memory footprints",
      "On-demand lazy loading of requested language payloads",
    ],
    order: 4,
  },
  {
    id: "pr-7",
    number: 7,
    prUrl: "https://github.com/Akashgite1/appinventor-sources/pull/7",
    repo: "Akashgite1/appinventor-sources",
    title: "Store and autosave i18n translations in a project file",
    branch: "feature-i18n-translation-autosave",
    baseBranch: "feature-i18n-per-language-assets",
    status: "ready",
    statusLabel: "Ready",
    statusTone: "green",
    summary: "Migrated translation source persistence from project settings properties to a dedicated translations.json project file hooked into FileEditor autosave.",
    highlights: [
      "Dedicated translations.json file node in project structure",
      "Integration with FileEditor dirty-tracking and autosave timers",
      "Eliminated custom save RPCs in favor of standard project persistence",
    ],
    order: 5,
  },
  {
    id: "pr-8",
    number: 8,
    prUrl: "https://github.com/Akashgite1/appinventor-sources/pull/8",
    repo: "Akashgite1/appinventor-sources",
    title: "Hide shared sidebars in the translation editor",
    branch: "feature-i18n-translation-ui-layout",
    baseBranch: "feature-i18n-translation-autosave",
    status: "in-review",
    statusLabel: "Ready / In Review",
    statusTone: "blue",
    summary: "Customized workspace viewport by hiding Designer and Blocks sidebars and the Media panel when the Translation editor is active.",
    highlights: [
      "Distraction-free, dedicated full-viewport translation layout",
      "Context-aware sidebar toggle on view switching",
      "Clean visual transition between Designer, Blocks, and Translations",
    ],
    order: 6,
  },
  {
    id: "pr-9",
    number: 9,
    prUrl: "https://github.com/Akashgite1/appinventor-sources/pull/9",
    repo: "Akashgite1/appinventor-sources",
    title: "Feature i18n translation workspace layout",
    branch: "feature-i18n-translation-workspace-layout",
    baseBranch: "feature-i18n-translation-ui-layout",
    status: "in-review",
    statusLabel: "In Review",
    statusTone: "blue",
    summary: "Implemented comprehensive translation workspace with language navigation sidebar, real-time search filtering, and pagination.",
    highlights: [
      "Language navigation sidebar with translation completion statistics",
      "Real-time key and string search filter with highlighting",
      "Paginated entry table handling large projects smoothly",
    ],
    order: 7,
  },
  {
    id: "pr-10",
    number: 10,
    prUrl: "https://github.com/Akashgite1/appinventor-sources/pull/10",
    repo: "Akashgite1/appinventor-sources",
    title: "Add translation language setup flow",
    branch: "feature-i18n-translation-language-setup",
    baseBranch: "feature-i18n-translation-workspace-layout",
    status: "in-review",
    statusLabel: "In Review",
    statusTone: "blue",
    summary: "Built interactive language configuration modal with catalog selection, custom language tags, and canonical BCP-47 validation.",
    highlights: [
      "Searchable language catalog modal with predefined languages",
      "Custom BCP-47 tag validation (script, region, and numeric forms)",
      "Primary vs target language designation and fallback rules",
    ],
    order: 8,
  },
  {
    id: "pr-11",
    number: 11,
    prUrl: "https://github.com/Akashgite1/appinventor-sources/pull/11",
    repo: "Akashgite1/appinventor-sources",
    title: "Add iOS runtime support for app translations",
    branch: "feature-i18n-ios-runtime",
    baseBranch: "feature-i18n-translation-language-setup",
    status: "in-review",
    statusLabel: "In Review",
    statusTone: "blue",
    summary: "Complete Swift runtime implementation matching Android parity: asset loading, locale fallback, pre-initialize application, dynamic APIs, and iOS Companion preview.",
    highlights: [
      "Swift I18nTranslationManager and I18nFormatter implementation",
      "Buildserver iOS asset extraction task (GenerateI18nTranslationAssets)",
      "Comprehensive Swift XCTest unit test suite",
      "iOS Companion live preview language switching support",
    ],
    order: 9,
  },
];

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

export type ContributionLayer = "editor" | "build" | "android" | "ios" | "tests" | "integration";
export type FileChange = [path: string, additions: number, deletions: number, kind: "new" | "modified"];

export const fileChanges: FileChange[] = [
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationPanel.java", 1923, 562, "new"],
  ["appinventor/components/src/com/google/appinventor/components/runtime/util/I18nTranslationManager.java", 975, 191, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/style/neo/neo.css", 743, 42, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/style/classic/variableColors.css", 742, 42, "modified"],
  ["appinventor/components-ios/src/I18nTranslationManager.swift", 576, 13, "new"],
  ["appinventor/components-ios/tests/Unit Tests/util/I18nTranslationManagerTests.swift", 488, 8, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationLanguageSidebar.java", 381, 31, "new"],
  ["appinventor/buildserver/src/com/google/appinventor/buildserver/util/I18nTranslationAssetGenerator.java", 316, 87, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationSetupPanel.java", 270, 0, "new"],
  ["appinventor/buildserver/tests/com/google/appinventor/buildserver/util/I18nTranslationAssetGeneratorTest.java", 241, 14, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationLanguageCatalog.java", 172, 0, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/DynamicTranslationsWorkspace.java", 167, 19, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationEditor.java", 146, 10, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/YaProjectEditor.java", 126, 5, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/StaticTranslationsWorkspace.java", 123, 4, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/YaVisibleComponentsPanel.java", 102, 6, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationWorkspaceToolbar.java", 90, 16, "new"],
  ["appinventor/components/src/com/google/appinventor/components/runtime/Form.java", 87, 7, "modified"],
  ["appinventor/buildserver/tests/com/google/appinventor/buildserver/tasks/ios/GenerateI18nTranslationAssetsTest.java", 64, 0, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationDesignerChangeListener.java", 63, 2, "new"],
  ["appinventor/components-ios/tests/Unit Tests/util/I18nFormatterTests.swift", 59, 0, "new"],
  ["appinventor/components/tests/com/google/appinventor/components/runtime/util/I18nFormatterTest.java", 58, 1, "new"],
  ["appinventor/components/src/com/google/appinventor/components/runtime/util/I18nFormatter.java", 57, 1, "new"],
  ["appinventor/buildserver/src/com/google/appinventor/buildserver/tasks/ios/GenerateI18nTranslationAssets.java", 56, 0, "new"],
  ["appinventor/components-ios/src/I18nFormatter.swift", 53, 0, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationWorkspaceEmptyState.java", 51, 0, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/actions/SwitchToTranslationEditorAction.java", 49, 3, "new"],
  ["appinventor/buildserver/src/com/google/appinventor/buildserver/tasks/android/AttachCompAssets.java", 48, 13, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationEntry.java", 45, 0, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationFileNode.java", 41, 5, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/DynamicTranslationEntry.java", 39, 0, "new"],
  ["appinventor/components-ios/src/Form.swift", 39, 0, "modified"],
  ["appinventor/components/src/com/google/appinventor/components/runtime/util/TranslationProvider.java", 39, 0, "new"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/DesignToolbar.java", 31, 6, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/i18n/TranslationKeyGenerator.java", 27, 0, "new"],
  ["appinventor/buildserver/src/com/google/appinventor/buildserver/Project.java", 23, 2, "modified"],
  ["appinventor/blocklyeditor/src/replmgr.js", 19, 5, "modified"],
  ["appinventor/components/src/com/google/appinventor/components/runtime/AppInventorCompatActivity.java", 18, 1, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/YaBlocksEditor.java", 17, 4, "modified"],
  ["appinventor/AIComponentKit.xcodeproj/project.pbxproj", 16, 0, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/OdeMessages.java", 12, 0, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/server/project/youngandroid/YoungAndroidProjectService.java", 12, 0, "modified"],
  ["appinventor/common/src/com/google/appinventor/common/constants/YoungAndroidStructureConstants.java", 11, 0, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/Ode.java", 10, 0, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/server/project/youngandroid/YoungAndroidSettingsBuilder.java", 8, 8, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/style/neo/DesignToolbarNeo.ui.xml", 6, 2, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/ProjectEditor.java", 6, 0, "modified"],
  ["appinventor/components/src/com/google/appinventor/components/runtime/AndroidViewComponent.java", 6, 0, "modified"],
  ["appinventor/docs/markdown/reference/components/userinterface.md", 6, 0, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/shared/settings/SettingsConstants.java", 5, 5, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/style/neo/DesignToolbarNeo.java", 4, 2, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/DesignToolbar.ui.xml", 4, 0, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/settings/project/YoungAndroidSettings.java", 2, 2, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/style/neo/YaVisibleComponentsPanelNeo.ui.xml", 2, 0, "modified"],
  ["appinventor/appengine/src/com/google/appinventor/client/editor/youngandroid/YaVisibleComponentsPanel.ui.xml", 1, 0, "modified"],
  ["appinventor/buildserver/src/com/google/appinventor/buildserver/resources/runtime.scm", 1, 0, "modified"],
  ["appinventor/buildserver/src/com/google/appinventor/buildserver/tasks/ios/IosBuildFactory.java", 1, 0, "modified"],
  ["appinventor/components/src/com/google/appinventor/components/runtime/AndroidNonvisibleComponent.java", 1, 0, "modified"],
  ["appinventor/components/src/com/google/appinventor/components/runtime/ReplForm.java", 1, 0, "modified"],
];

export const contributionLayers: Array<{ id: ContributionLayer; label: string; role: string; connection: string }> = [
  { id: "editor", label: "Translation editor", role: "Authoring and project persistence", connection: "Discovers Designer text and autosaves the shared translations.json source file." },
  { id: "build", label: "Build pipeline", role: "Validation and asset generation", connection: "Reads the project source and emits a manifest plus one compact file per language." },
  { id: "android", label: "Android runtime", role: "Packaging and application", connection: "Loads generated assets, resolves locale fallback, and applies properties before initialization." },
  { id: "ios", label: "iOS runtime", role: "Packaging and application", connection: "Consumes the same asset contract through Swift loading, formatting, and form integration." },
  { id: "tests", label: "Verification", role: "Contract and behavior coverage", connection: "Covers generators, loaders, fallback behavior, formatting, and malformed input." },
  { id: "integration", label: "Integration", role: "Tooling, Companion, and docs", connection: "Connects the editor and runtimes to existing toolbars, REPL messaging, project metadata, and documentation." },
];

export function getContributionLayer(path: string): ContributionLayer {
  if (path.includes("/tests/")) return "tests";
  if (path.includes("components-ios/") || path.includes("AIComponentKit.xcodeproj")) return "ios";
  if (path.includes("components/src/")) return "android";
  if (path.includes("buildserver/") || path.includes("common/src/")) return "build";
  if (path.includes("appengine/") && !path.includes("replmgr")) return "editor";
  return "integration";
}

export function shortFileName(path: string) {
  return path.slice(path.lastIndexOf("/") + 1);
}
