import { Icon } from "../ui/Icon";

const layerData = [
  {
    area: "Project storage",
    files: ["YoungAndroidStructureConstants.java", "YoungAndroidProjectService.java"],
    responsibility: "Defines and creates youngandroidproject/translations.json",
  },
  {
    area: "Translation editor",
    files: [
      "TranslationEditor.java",
      "TranslationFileNode.java",
      "TranslationPanel.java",
      "YaProjectEditor.java",
    ],
    responsibility: "Loads, edits, synchronizes, and autosaves translation source data",
  },
  {
    area: "Buildserver source loading",
    files: ["buildserver/.../Project.java"],
    responsibility: "Reads the project translation document during compilation",
  },
  {
    area: "Asset generation",
    files: ["I18nTranslationAssetGenerator.java"],
    responsibility: "Validates the source and generates the manifest and per-language payloads",
  },
  {
    area: "Android packaging",
    files: ["AttachCompAssets.java"],
    responsibility: "Places generated i18n assets in the Android application",
  },
  {
    area: "iOS packaging",
    files: ["GenerateI18nTranslationAssets.java", "IosBuildFactory.java"],
    responsibility: "Generates and packages the assets required by the iOS application",
  },
  {
    area: "Android runtime",
    files: ["I18nTranslationManager.java", "I18nFormatter.java", "Form.java"],
    responsibility:
      "Loads translations, applies fallback, formats placeholders, and updates properties",
  },
  {
    area: "iOS runtime",
    files: ["I18nTranslationManager.swift", "I18nFormatter.swift", "Form.swift"],
    responsibility: "Implements the corresponding behavior in Swift",
  },
];

const contractRules = [
  {
    title: "Project source",
    description: "Editable data is stored in youngandroidproject/translations.json.",
  },
  {
    title: "Backward compatibility",
    description: "Older projects without the file must continue to open.",
  },
  {
    title: "Generated output",
    description:
      "Compiled applications contain i18n/manifest.json and i18n/languages/*.json, not the combined source document.",
  },
  {
    title: "Stable keys",
    description: "Renaming a component must not discard its translation key or translated values.",
  },
  {
    title: "Safe startup",
    description:
      "Absent or malformed translation assets must not prevent the application from starting.",
  },
  {
    title: "Cross-platform behavior",
    description:
      "Android and iOS may use separate implementations, but they must interpret the generated contract consistently.",
  },
];

const verificationRules = [
  {
    change: "Formatting or Java changes",
    verification: "git diff --check and ant tests",
    code: true,
  },
  {
    change: "Generator or packaging",
    verification: "ant -f buildserver/build.xml tests and package inspection",
    code: true,
  },
  {
    change: "Project persistence",
    verification: "Fresh project, edit, autosave, reopen, .aia export, and re-import",
    code: false,
  },
  {
    change: "Android runtime",
    verification: "Android runtime tests and a generated APK",
    code: false,
  },
  {
    change: "iOS runtime",
    verification: "Swift unit tests and buildserver packaging tests",
    code: false,
  },
  {
    change: "Asset-contract change",
    verification: "Generator tests plus Android and iOS loader tests",
    code: false,
  },
];

export function ContributorGuideSection() {
  return (
    <section id="contributors" className="doc-section">
      <h2>
        <a href="#contributors">#</a> Contributor guide
      </h2>
      <p className="lead" style={{ fontSize: "16.5px", color: "#e6edf3", maxWidth: "860px" }}>
        The i18n implementation spans project storage, the Translation editor, build-time asset
        generation, and two platform runtimes. Start by identifying which contract your change
        affects; most changes should not require modifying every layer.
      </p>

      {/* ── 1. Layer Matrix ── */}
      <h3>Find the correct layer</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: "24%" }}>Area</th>
              <th style={{ width: "38%" }}>Primary files</th>
              <th style={{ width: "38%" }}>Responsibility</th>
            </tr>
          </thead>
          <tbody>
            {layerData.map((layer) => (
              <tr key={layer.area}>
                <td>
                  <strong>{layer.area}</strong>
                </td>
                <td>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {layer.files.map((file) => (
                      <code key={file}>{file}</code>
                    ))}
                  </div>
                </td>
                <td>{layer.responsibility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── 2. Common Workflows ── */}
      <h3>Common change workflows</h3>

      <div className="setup-steps-container">
        {/* Workflow 1 */}
        <div className="setup-step-card">
          <h4>
            <Icon name="code" /> Changing the editable source schema
          </h4>
          <p>If fields in <code>translations.json</code> are added, removed, or renamed:</p>
          <ol className="inner-steps">
            <li>Update the Translation editor’s import and export logic.</li>
            <li>Preserve compatibility with projects that do not yet contain the file.</li>
            <li>Update <code>I18nTranslationAssetGenerator</code> to validate and consume the new shape.</li>
            <li>Confirm that an exported <code>.aia</code> contains the updated source document.</li>
            <li>Add tests for valid input, missing optional fields, and malformed input.</li>
          </ol>
          <div className="callout warning" style={{ margin: "14px 0 0", padding: "12px 16px" }}>
            <Icon name="branch" />
            <div>
              <strong>Source document separation</strong>
              <p>The editable source document is project data. It must not be packaged directly into compiled applications.</p>
            </div>
          </div>
        </div>

        {/* Workflow 2 */}
        <div className="setup-step-card">
          <h4>
            <Icon name="stack" /> Changing the generated asset contract
          </h4>
          <p>Changes to <code>manifest.json</code> or the per-language files affect both runtimes.</p>
          <ol className="inner-steps">
            <li>Update <code>I18nTranslationAssetGenerator</code>.</li>
            <li>Increment the appropriate format version when the runtime contract changes.</li>
            <li>Update the Android and iOS loaders together.</li>
            <li>Update generator and runtime tests.</li>
            <li>Inspect compiled packages to confirm that they contain only the generated manifest and language files.</li>
          </ol>
          <div className="subtext-note" style={{ margin: "14px 0 0" }}>
            <strong>Note:</strong> Do not assume that changing the source schema requires changing the runtime contract. The generator may be able to translate the new source shape into the existing asset format.
          </div>
        </div>

        {/* Workflow 3 */}
        <div className="setup-step-card">
          <h4>
            <Icon name="sparkles" /> Changing Translation editor behavior
          </h4>
          <p>Editor-only changes usually belong in <code>TranslationPanel</code> or its associated workspace classes.</p>
          <p style={{ margin: "6px 0 4px", fontWeight: 600, color: "#e6edf3" }}>Verify that:</p>
          <ul className="property-specs">
            <li>Designer text is rediscovered when a form changes.</li>
            <li>Component renames preserve existing translation keys and values.</li>
            <li>Permanently deleted components remove their translation entries.</li>
            <li>Language and translation edits mark the file for autosave.</li>
            <li>Reopening or importing the project restores the saved values.</li>
          </ul>
          <div className="subtext-note" style={{ margin: "14px 0 0" }}>
            A visual layout change should not require modifications to the generator or either runtime unless it also changes stored data.
          </div>
        </div>

        {/* Workflow 4 */}
        <div className="setup-step-card">
          <h4>
            <Icon name="globe" /> Changing locale or fallback behavior
          </h4>
          <p>Locale resolution is implemented separately on Android and iOS. If its behavior changes, test both implementations with:</p>
          <ul className="property-specs">
            <li>An exact language tag;</li>
            <li>A language-and-region tag;</li>
            <li>Language-only fallback;</li>
            <li>An unsupported device language; and</li>
            <li>Missing translated values.</li>
          </ul>
          <div className="subtext-note" style={{ margin: "14px 0 0" }}>
            When no applicable translated value is available, the application must continue using its base text.
          </div>
        </div>
      </div>

      {/* ── 3. Invariant Contracts ── */}
      <h3>Contracts that must remain true</h3>
      <ul className="check-list" style={{ margin: "16px 0 28px", maxWidth: "860px" }}>
        {contractRules.map((rule) => (
          <li key={rule.title}>
            <Icon name="check" />
            <span>
              <strong>{rule.title}:</strong> {rule.description}
            </span>
          </li>
        ))}
      </ul>

      {/* ── 4. Verification by Change Type ── */}
      <h3>Verification by change type</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: "35%" }}>Change</th>
              <th style={{ width: "65%" }}>Minimum verification</th>
            </tr>
          </thead>
          <tbody>
            {verificationRules.map((row) => (
              <tr key={row.change}>
                <td>
                  <strong>{row.change}</strong>
                </td>
                <td>
                  {row.change === "Formatting or Java changes" ? (
                    <span>
                      <code>git diff --check</code> and <code>ant tests</code>
                    </span>
                  ) : row.change === "Generator or packaging" ? (
                    <span>
                      <code>ant -f buildserver/build.xml tests</code> and package inspection
                    </span>
                  ) : row.change === "Project persistence" ? (
                    <span>
                      Fresh project, edit, autosave, reopen, <code>.aia</code> export, and re-import
                    </span>
                  ) : (
                    row.verification
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="fine-print" style={{ marginTop: "20px" }}>
        Use the project’s current contribution instructions to select the correct base branch.
        Runtime or Companion changes and editor/buildserver-only changes may follow different
        upstream branch policies.
      </p>
    </section>
  );
}
