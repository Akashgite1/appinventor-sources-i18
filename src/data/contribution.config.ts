import type { TrackedPrConfig, LayerConfig, ContributionLayerId } from "./contribution.types";

export const trackedPullRequests: TrackedPrConfig[] = [
  {
    id: "pr-3976",
    number: 3976,
    repo: "mit-cml/appinventor-sources",
    isUpstream: true,
    title: "Add static Designer text translations for i18n",
    fallbackBranch: "feature-i18n-mvp-implementation",
    fallbackBaseBranch: "master",
    summary:
      "Foundational upstream pull request implementing static Designer text translations, core i18n data model, build pipeline asset extraction, and initial Android runtime support for App Inventor projects.",
    highlights: [
      "Core Young Android translation data model and key generator",
      "Appengine translation panel integration with Designer components",
      "Buildserver asset generator and manifest compiler",
      "Android runtime translation loader and Form property application",
    ],
    order: 0,
    layer: "integration",
  },
  {
    id: "pr-2",
    number: 2,
    repo: "Akashgite1/appinventor-sources",
    title: "Add dynamic i18n translation keys and runtime lookup",
    fallbackBranch: "feature-i18n-dynamic-placeholders",
    fallbackBaseBranch: "feature-i18n-mvp-implementation",
    summary:
      "Introduced dynamic translation keys with positional placeholders ({0}, {1}), runtime text interpolation, and lookup functions across component blocks.",
    highlights: [
      "Dynamic translation key format with positional parameter syntax",
      "Runtime placeholder substitution engine in components",
      "Dynamic string lookup with graceful fallback to primary text",
    ],
    order: 1,
    layer: "android",
  },
  {
    id: "pr-3",
    number: 3,
    repo: "Akashgite1/appinventor-sources",
    title: "Add Companion i18n preview language selector",
    fallbackBranch: "feature-i18n-companion-preview-language",
    fallbackBaseBranch: "feature-i18n-mvp-implementation",
    summary:
      "Added live preview language switching directly within the Companion toolbar, allowing creators to test multilingual UI without rebuilding APKs.",
    highlights: [
      "Companion toolbar preview language dropdown selector",
      "Guarded update flow preventing glitches during REPL asset transfers",
      "Instant visual UI re-rendering for the active Form",
    ],
    order: 2,
    layer: "integration",
  },
  {
    id: "pr-4",
    number: 4,
    repo: "Akashgite1/appinventor-sources",
    title: "Move i18n translation state to activity-owned manager",
    fallbackBranch: "feature-i18n-form-owned-translation-manager",
    fallbackBaseBranch: "feature-i18n-mvp-implementation",
    summary:
      "Decoupled translation state from individual Form instances into an activity-owned manager, ensuring stable lifecycle state and cross-screen coordination.",
    highlights: [
      "Activity-owned I18nTranslationManager instance",
      "Decoupled Form rendering from translation storage",
      "Persistent locale caching across multi-screen transitions",
    ],
    order: 3,
    layer: "android",
  },
  {
    id: "pr-5",
    number: 5,
    repo: "Akashgite1/appinventor-sources",
    title: "Split i18n translations into per-language assets",
    fallbackBranch: "feature-i18n-per-language-assets",
    fallbackBaseBranch: "feature-i18n-mvp-implementation",
    displayStatusOverride: "ready",
    summary:
      "Optimized packaging by compiling translations into one lightweight manifest plus isolated, compact per-language JSON asset payloads.",
    highlights: [
      "Modular manifest plus language asset partitioning",
      "Significantly reduced APK and memory footprints",
      "On-demand lazy loading of requested language payloads",
    ],
    order: 4,
    layer: "build",
  },
  {
    id: "pr-7",
    number: 7,
    repo: "Akashgite1/appinventor-sources",
    title: "Store and autosave i18n translations in a project file",
    fallbackBranch: "feature-i18n-translation-autosave",
    fallbackBaseBranch: "feature-i18n-per-language-assets",
    displayStatusOverride: "ready",
    summary:
      "Migrated translation source persistence from project settings properties to a dedicated translations.json project file hooked into FileEditor autosave.",
    highlights: [
      "Dedicated translations.json file node in project structure",
      "Integration with FileEditor dirty-tracking and autosave timers",
      "Eliminated custom save RPCs in favor of standard project persistence",
    ],
    order: 5,
    layer: "editor",
  },
  {
    id: "pr-8",
    number: 8,
    repo: "Akashgite1/appinventor-sources",
    title: "Hide shared sidebars in the translation editor",
    fallbackBranch: "feature-i18n-translation-ui-layout",
    fallbackBaseBranch: "feature-i18n-translation-autosave",
    summary:
      "Customized workspace viewport by hiding Designer and Blocks sidebars and the Media panel when the Translation editor is active.",
    highlights: [
      "Distraction-free, dedicated full-viewport translation layout",
      "Context-aware sidebar toggle on view switching",
      "Clean visual transition between Designer, Blocks, and Translations",
    ],
    order: 6,
    layer: "editor",
  },
  {
    id: "pr-9",
    number: 9,
    repo: "Akashgite1/appinventor-sources",
    title: "Feature i18n translation workspace layout",
    fallbackBranch: "feature-i18n-translation-workspace-layout",
    fallbackBaseBranch: "feature-i18n-translation-ui-layout",
    summary:
      "Implemented comprehensive translation workspace with language navigation sidebar, real-time search filtering, and pagination.",
    highlights: [
      "Language navigation sidebar with translation completion statistics",
      "Real-time key and string search filter with highlighting",
      "Paginated entry table handling large projects smoothly",
    ],
    order: 7,
    layer: "editor",
  },
  {
    id: "pr-10",
    number: 10,
    repo: "Akashgite1/appinventor-sources",
    title: "Add translation language setup flow",
    fallbackBranch: "feature-i18n-translation-language-setup",
    fallbackBaseBranch: "feature-i18n-translation-workspace-layout",
    summary:
      "Built interactive language configuration modal with catalog selection, custom language tags, and canonical BCP-47 validation.",
    highlights: [
      "Searchable language catalog modal with predefined languages",
      "Custom BCP-47 tag validation (script, region, and numeric forms)",
      "Primary vs target language designation and fallback rules",
    ],
    order: 8,
    layer: "editor",
  },
  {
    id: "pr-11",
    number: 11,
    repo: "Akashgite1/appinventor-sources",
    title: "Add iOS runtime support for app translations",
    fallbackBranch: "feature-i18n-ios-runtime",
    fallbackBaseBranch: "feature-i18n-translation-language-setup",
    summary:
      "Complete Swift runtime implementation matching Android parity: asset loading, locale fallback, pre-initialize application, dynamic APIs, and iOS Companion preview.",
    highlights: [
      "Swift I18nTranslationManager and I18nFormatter implementation",
      "Buildserver iOS asset extraction task (GenerateI18nTranslationAssets)",
      "Comprehensive Swift XCTest unit test suite",
      "iOS Companion live preview language switching support",
    ],
    order: 9,
    layer: "ios",
  },
];

export const contributionLayers: LayerConfig[] = [
  {
    id: "editor",
    label: "Translation editor",
    role: "Authoring and project persistence",
    connection: "Discovers Designer text and autosaves the shared translations.json source file.",
  },
  {
    id: "build",
    label: "Build pipeline",
    role: "Validation and asset generation",
    connection: "Reads the project source and emits a manifest plus one compact file per language.",
  },
  {
    id: "android",
    label: "Android runtime",
    role: "Packaging and application",
    connection: "Loads generated assets, resolves locale fallback, and applies properties before initialization.",
  },
  {
    id: "ios",
    label: "iOS runtime",
    role: "Packaging and application",
    connection: "Consumes the same asset contract through Swift loading, formatting, and form integration.",
  },
  {
    id: "tests",
    label: "Verification",
    role: "Contract and behavior coverage",
    connection: "Covers generators, loaders, fallback behavior, formatting, and malformed input.",
  },
  {
    id: "integration",
    label: "Integration",
    role: "Tooling, Companion, and docs",
    connection: "Connects the editor and runtimes to existing toolbars, REPL messaging, project metadata, and documentation.",
  },
];

export const fileLayerOverrides: Record<string, ContributionLayerId> = {
  "appinventor/blocklyeditor/src/replmgr.js": "integration",
  "appinventor/docs/markdown/reference/components/userinterface.md": "integration",
  "appinventor/AIComponentKit.xcodeproj/project.pbxproj": "ios",
  "appinventor/common/src/com/google/appinventor/common/constants/YoungAndroidStructureConstants.java": "build",
};

export function classifyFileLayer(path: string): ContributionLayerId {
  if (fileLayerOverrides[path]) {
    return fileLayerOverrides[path];
  }
  // Tests take precedence across all platforms and components
  if (
    path.includes("/tests/") ||
    path.includes("/Unit Tests/") ||
    path.endsWith("Test.java") ||
    path.endsWith("Tests.swift")
  ) {
    return "tests";
  }
  if (path.includes("components-ios/") || path.includes("AIComponentKit.xcodeproj")) {
    return "ios";
  }
  if (path.includes("components/src/")) {
    return "android";
  }
  if (path.includes("buildserver/") || path.includes("common/src/")) {
    return "build";
  }
  if (path.includes("appengine/") && !path.includes("replmgr")) {
    return "editor";
  }
  if (path.includes("blocklyeditor/") || path.includes("docs/")) {
    return "integration";
  }
  return "unclassified";
}
