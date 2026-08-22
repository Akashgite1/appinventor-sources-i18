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
    { id: "runtimes", label: "Android & iOS" },
  ]},
  { group: "Verification", items: [
    { id: "contribution-map", label: "Contribution map" },
    { id: "testing", label: "Testing evidence" },
    { id: "review", label: "Review iterations" },
  ]},
  { group: "Handoff", items: [
    { id: "contributors", label: "Contributor guide" },
    { id: "future", label: "Future work" },
    { id: "links", label: "Project links" },
  ]},
];

export const milestones = [
  {
    title: "Core i18n model",
    branch: "feature-i18n-mvp-implementation",
    summary: "Introduced translation state, key-based entries, and the first end-to-end project flow.",
  },
  {
    title: "Form-owned state",
    branch: "feature-i18n-form-owned-translation-manager",
    summary: "Separated translation management from the UI and aligned state with the active form lifecycle.",
  },
  {
    title: "Companion preview",
    branch: "feature-i18n-companion-preview-language",
    summary: "Added preview-language selection and guarded updates while Companion assets are transferring.",
  },
  {
    title: "Per-language assets",
    branch: "feature-i18n-per-language-assets",
    summary: "Compiled one manifest plus dedicated language payloads instead of shipping the editor source file.",
  },
  {
    title: "Project-file autosave",
    branch: "feature-i18n-translation-autosave",
    summary: "Moved source translations to a project file and reused the existing FileEditor autosave lifecycle.",
  },
  {
    title: "Translation workspace",
    branch: "feature-i18n-translation-workspace-layout",
    summary: "Built a full-width workspace with language navigation, search, pagination, and dynamic entries.",
  },
  {
    title: "Language setup",
    branch: "feature-i18n-translation-language-setup",
    summary: "Added language configuration and canonical language-tag handling.",
  },
  {
    title: "iOS runtime",
    branch: "feature-i18n-ios-runtime",
    summary: "Added iOS packaging, loading, formatting, pre-initialize application, dynamic APIs, and Companion preview support.",
  },
];

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
