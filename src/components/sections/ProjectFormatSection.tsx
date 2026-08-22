import { Icon } from "../ui/Icon";

export function ProjectFormatSection() {
  return (
    <section id="project-format" className="doc-section">
      <h2>
        <a href="#project-format">#</a> Project format
      </h2>
      <p>
        Editable translations are stored in a dedicated project file rather than project settings.
        This avoids putting potentially large JSON data into the settings object and allows the
        existing file editor lifecycle to persist it.
      </p>
      <div className="code-block">
        <div>
          <span>Project archive</span>
          <button
            onClick={() =>
              navigator.clipboard?.writeText("youngandroidproject/translations.json")
            }
          >
            Copy path
          </button>
        </div>
        <pre>
          <code>{`youngandroidproject/
├── project.properties
└── translations.json

assets/i18n/                 # compiled application only
├── manifest.json
└── languages/
    ├── en.json
    ├── hi.json
    └── mr.json`}</code>
        </pre>
      </div>
      <h3>Source document</h3>
      <div className="code-block">
        <div>
          <span>translations.json</span>
        </div>
        <pre>
          <code>{`{
  "baseLanguage": "en",
  "languages": ["en", "hi", "mr"],
  "entries": {
    "screen1.button1.text": {
      "kind": "property",
      "source": {
        "screen": "Screen1",
        "component": "Button1",
        "property": "Text"
      },
      "translations": {
        "en": "Continue",
        "hi": "जारी रखें",
        "mr": "पुढे जा"
      }
    }
  }
}`}</code>
        </pre>
      </div>
      <div className="callout note">
        <Icon name="code" />
        <div>
          <strong>Language tags</strong>
          <p>
            Canonical language, script, region, and numeric-region forms are accepted—for example{" "}
            <code>mr</code>, <code>pt-BR</code>, <code>zh-Hans</code>, <code>zh-Hant-TW</code>, and{" "}
            <code>es-419</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
