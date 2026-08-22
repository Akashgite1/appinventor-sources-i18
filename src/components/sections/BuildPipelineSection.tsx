import { Icon } from "../ui/Icon";

export function BuildPipelineSection() {
  return (
    <section id="build-pipeline" className="doc-section">
      <h2>
        <a href="#build-pipeline">#</a> Build pipeline
      </h2>

      <ol className="steps">
        <li>
          <span>1</span>
          <div>
            <strong>Read the project source</strong>
            <p>
              The buildserver reads <code>youngandroidproject/translations.json</code> directly.
            </p>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <strong>Parse and validate</strong>
            <p>
              The shared generator parses the translation document, validates the base and
              translation language tags, and collects the available translation entries and
              languages.
            </p>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <strong>Generate runtime assets</strong>
            <p>
              The generator creates a versioned manifest and one versioned JSON file for the base
              language and every collected translation language. The manifest records the base
              language, language-file paths, and translation-entry metadata.
            </p>
          </div>
        </li>
        <li>
          <span>4</span>
          <div>
            <strong>Package for each platform</strong>
            <p>
              Android and iOS use platform-specific build tasks to place the generated{" "}
              <code>i18n</code> manifest and language files into their application packaging
              inputs.
            </p>
          </div>
        </li>
      </ol>

      <div className="callout warning">
        <Icon name="branch" />
        <div>
          <strong>Only generated assets are packaged</strong>
          <p>
            The combined editable <code>translations.json</code> remains part of the project source.
            Compiled applications contain the generated manifest and per-language files rather than
            the combined source document.
          </p>
        </div>
      </div>
    </section>
  );
}
