import { Icon } from "../ui/Icon";

export function ProjectFormatSection() {
  return (
    <section id="project-format" className="doc-section">
      <h2>
        <a href="#project-format">#</a> Project format
      </h2>
      <p>
        Editable translation data is stored in <code>youngandroidproject/translations.json</code>.
        This project-level source file contains the configured languages, static and dynamic
        translation entries, source metadata, and translated values. It is autosaved through App
        Inventor’s standard project-file lifecycle, travels with the project archive, and is read
        by the buildserver when generating runtime assets.
      </p>

      <ul className="check-list">
        <li>
          <Icon name="check" />
          <span>
            Stored at <code>youngandroidproject/translations.json</code>.
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>Created automatically for new projects.</span>
        </li>
        <li>
          <Icon name="check" />
          <span>Added when older projects without the file are opened.</span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            Loaded and autosaved through the standard <code>FileEditor</code> lifecycle.
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            Included with the editable project archive (<code>.aia</code>).
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>Read directly by the buildserver.</span>
        </li>
        <li>
          <Icon name="check" />
          <span>Converted into runtime assets during compilation.</span>
        </li>
      </ul>

      <h3>Project archive vs compiled assets</h3>
      <div className="format-grid">
        <div className="code-block">
          <div>
            <span>Editable project source</span>
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
└── translations.json`}</code>
          </pre>
        </div>

        <div className="code-block">
          <div>
            <span>Generated application assets</span>
            <button
              onClick={() =>
                navigator.clipboard?.writeText("assets/i18n/manifest.json")
              }
            >
              Copy path
            </button>
          </div>
          <pre>
            <code>{`assets/i18n/
├── manifest.json
└── languages/
    ├── en.json    # English (base)
    ├── hi.json    # Hindi
    ├── mr.json    # Marathi
    ├── fr.json    # French
    ├── de.json    # German
    └── es.json    # Spanish`}</code>
          </pre>
        </div>
      </div>
      <p>
        The generator creates the base-language file (<code>en.json</code>) plus one file for every
        configured target language.
      </p>

      <h3>Source document</h3>
      <div className="code-block">
        <div>
          <span>translations.json</span>
          <button
            onClick={() =>
              navigator.clipboard?.writeText(
                JSON.stringify(
                  {
                    baseLanguage: "en",
                    languages: ["hi", "mr", "fr", "de", "es"],
                    entries: {
                      i18n_d6905c89: {
                        kind: "static",
                        source: {
                          screen: "Screen1",
                          component: "Button1",
                          type: "Button",
                          property: "Text",
                          baseText: "Continue",
                        },
                        translations: {
                          hi: "जारी रखें",
                          mr: "पुढे जा",
                          fr: "Continuer",
                          de: "Weiter",
                          es: "Continuar",
                        },
                      },
                    },
                  },
                  null,
                  2
                )
              )
            }
          >
            Copy JSON
          </button>
        </div>
        <pre>
          <code>{`{
  "baseLanguage": "en",
  "languages": ["hi", "mr", "fr", "de", "es"],
  "entries": {
    "i18n_d6905c89": {
      "kind": "static",
      "source": {
        "screen": "Screen1",
        "component": "Button1",
        "type": "Button",
        "property": "Text",
        "baseText": "Continue"
      },
      "translations": {
        "hi": "जारी रखें",
        "mr": "पुढे जा",
        "fr": "Continuer",
        "de": "Weiter",
        "es": "Continuar"
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
            Supported language-tag forms are language (<code>mr</code>), language-region (
            <code>pt-BR</code>), language-script (<code>zh-Hans</code>), language-script-region (
            <code>zh-Hant-TW</code>), and language-numeric-region (<code>es-419</code>).
          </p>
        </div>
      </div>
    </section>
  );
}
