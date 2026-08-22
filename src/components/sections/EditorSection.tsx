import { Icon } from "../ui/Icon";

export function EditorSection() {
  return (
    <section id="editor" className="doc-section editor-section">
      <h2>
        <a href="#editor">#</a> Translation editor
      </h2>
      <p>
        The Translation editor provides one project-level workspace for preparing application text
        for Android and iOS. It discovers eligible text properties from the Designer, stores
        translations for each configured language, and supports reusable messages for text
        generated while the application is running.
      </p>
      <p>
        Translation changes are saved automatically with the project. Separate translation projects
        or platform-specific translation source files are not required.
      </p>

      <h3>Open the Translation editor</h3>
      <ol className="ordered-steps">
        <li>Create a new App Inventor project or open an existing project.</li>
        <li>Add components in the Designer and configure their user-facing text properties.</li>
        <li>
          Select <strong>Translations</strong> from the project toolbar alongside{" "}
          <strong>Designer</strong> and <strong>Blocks</strong>.
        </li>
        <li>
          If translation has not been configured for the project, the welcome screen opens
          automatically.
        </li>
      </ol>
      <p className="subtext-note">
        Both the Neo and Classic interfaces provide the same <strong>Translations</strong> action
        and open the same project translation workspace.
      </p>

      <h3>First-time setup</h3>

      <div className="setup-steps-container">
        <div className="setup-step-card">
          <h4>1. Choose the base language</h4>
          <p>
            Select the language currently used by the application’s Designer text and messages. For
            example, select English if properties such as button labels and screen titles are
            written in English.
          </p>
          <p>
            Select a language from the provided catalog. To use another supported language tag,
            select <strong>Other</strong> and enter the language tag manually.
          </p>
          <p>
            Select <strong>Continue</strong> to complete the initial setup.
          </p>
        </div>

        <div className="setup-step-card">
          <h4>2. Add a translation language</h4>
          <p>
            After choosing the base language, the workspace prompts you to add a target language.
          </p>
          <p>
            Use the language sidebar to select a target language and then select{" "}
            <strong>Add Language</strong>. A supported custom language tag can also be entered
            through the <strong>Other</strong> option.
          </p>
          <p>
            The target language must be different from the base language, and the same target
            language cannot be added more than once.
          </p>
        </div>

        <div className="setup-step-card">
          <h4>3. Translate Designer text</h4>
          <p>
            Open <strong>Static translations</strong> and select the target language you want to
            edit.
          </p>
          <p>The translation table displays:</p>
          <ul className="property-specs">
            <li>the screen containing the text;</li>
            <li>the component name and type;</li>
            <li>the translatable property;</li>
            <li>the original base text; and</li>
            <li>an editable field for the selected target language.</li>
          </ul>
          <p>
            Enter the translated value in the final column. When the field changes, the project
            translation file is scheduled for autosaving through App Inventor’s standard
            project-file lifecycle.
          </p>
          <p>
            Use the search field to filter entries by screen, component, property, base text, or
            translated text. Large projects are divided into pages of 20 entries.
          </p>
        </div>

        <div className="setup-step-card">
          <h4>4. Add dynamic messages when needed</h4>
          <p>
            Static translations represent eligible text discovered from Designer properties. Text
            created while the application is running can be defined under{" "}
            <strong>Dynamic translations</strong>.
          </p>
          <p>To create a dynamic translation:</p>
          <ol className="inner-steps">
            <li>
              Enter a stable key, such as <code>welcome_message</code>.
            </li>
            <li>
              Enter its base text, such as <code>Hello &#123;name&#125;</code>.
            </li>
            <li>
              List named placeholders as comma-separated values, such as <code>name</code>.
            </li>
            <li>
              Select <strong>Add Dynamic Key</strong>.
            </li>
            <li>Enter the translated value for each configured target language.</li>
          </ol>
          <p>
            Use the Screen component’s <code>Translate</code> function to look up a message without
            placeholders. Use <code>TranslateWithValues</code> with a dictionary to replace named
            placeholders. Named placeholders allow each language to arrange values in the order
            required by its grammar.
          </p>
        </div>
      </div>

      <h3>Preview and build</h3>
      <p>
        Return to the Designer to use the translation preview-language selector with a connected
        Companion. This allows configured translations to be reapplied while testing the project.
      </p>
      <p>
        When the project is ready, use the normal Android or iOS build workflow. The buildserver
        reads the shared project translation source and generates the runtime assets required by
        the selected platform.
      </p>
      <p>
        At runtime, the application reads the device language and attempts to load the corresponding
        available translation. If a translated value is unavailable, it falls back to the base text.
      </p>
      <p>The same editable translation source is used for both Android and iOS builds.</p>

      <h3>Automatic behavior</h3>
      <ul className="check-list">
        <li>
          <Icon name="check" />
          <span>Eligible Designer text is rediscovered when forms change.</span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            Component renames update source locations while preserving translation keys and values.
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>Entries belonging to permanently deleted components are removed.</span>
        </li>
        <li>
          <Icon name="check" />
          <span>Translation edits are autosaved with the project.</span>
        </li>
        <li>
          <Icon name="check" />
          <span>Search and pagination make larger translation sets manageable.</span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            <strong>Export JSON</strong> provides a copy of the current translation document for
            inspection; it is not a separate save operation.
          </span>
        </li>
      </ul>
    </section>
  );
}
