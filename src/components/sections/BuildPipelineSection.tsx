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
            <strong>Read project source</strong>
            <p>
              The buildserver reads <code>youngandroidproject/translations.json</code> directly.
            </p>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <strong>Validate and normalize</strong>
            <p>
              The shared generator validates the schema, base language, language tags, and entries.
            </p>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <strong>Generate runtime assets</strong>
            <p>
              A versioned manifest points to one JSON payload per configured language.
            </p>
          </div>
        </li>
        <li>
          <span>4</span>
          <div>
            <strong>Package per platform</strong>
            <p>
              Android and iOS build tasks place the same logical assets in their application
              packages.
            </p>
          </div>
        </li>
      </ol>
      <div className="callout warning">
        <Icon name="branch" />
        <div>
          <strong>Do not ship the source document</strong>
          <p>
            Compiled apps contain the generated manifest and language files, not the combined
            editable <code>translations.json</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
