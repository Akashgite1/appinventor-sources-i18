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
          <h4>4. Add runtime-dependent messages</h4>
          <p>
            Dynamic translations are useful when the application knows the message it wants to
            display, but part of that message is only available while the application is running.
            Runtime values may come from user input, application state, calculated results, sensor
            readings, or data returned by another component.
          </p>
          <p>
            The Translation editor translates the message template. Named placeholders mark where
            runtime values will be inserted. The runtime values themselves are preserved rather than
            automatically translated.
          </p>

          <h5 className="example-subheading">Example: display a personalized Notifier message</h5>
          <p>
            Suppose an application asks the user to enter their name in <code>TextBox1</code> and then
            displays a welcome message using <code>Notifier1</code>.
          </p>
          <p>Create the following dynamic translation:</p>
          <ul className="property-specs">
            <li>
              <strong>Key:</strong> <code>welcome_message</code>
            </li>
            <li>
              <strong>Base text:</strong> <code>Hello &#123;name&#125;!</code>
            </li>
            <li>
              <strong>Placeholder:</strong> <code>name</code>
            </li>
          </ul>

          <p>Add translations for the configured languages:</p>
          <div className="table-wrap compact-table">
            <table>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Message template</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>English</td>
                  <td>
                    <code>Hello &#123;name&#125;!</code>
                  </td>
                </tr>
                <tr>
                  <td>Hindi</td>
                  <td>
                    <code>नमस्ते &#123;name&#125;!</code>
                  </td>
                </tr>
                <tr>
                  <td>French</td>
                  <td>
                    <code>Bonjour &#123;name&#125; !</code>
                  </td>
                </tr>
                <tr>
                  <td>German</td>
                  <td>
                    <code>Hallo &#123;name&#125;!</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>To create this entry:</p>
          <ol className="inner-steps">
            <li>
              Open <strong>Dynamic translations</strong>.
            </li>
            <li>
              Enter <code>welcome_message</code> as the key.
            </li>
            <li>
              Enter <code>Hello &#123;name&#125;!</code> as the base text.
            </li>
            <li>
              Enter <code>name</code> in the placeholders field.
            </li>
            <li>
              Select <strong>Add Dynamic Key</strong>.
            </li>
            <li>Enter the translated template for each configured target language.</li>
          </ol>

          <p>
            When the user enters <code>Akash</code> in <code>TextBox1</code>, create a dictionary
            that maps <code>name</code> to <code>TextBox1.Text</code>. Pass that dictionary and the{" "}
            <code>welcome_message</code> key to the Screen component’s{" "}
            <code>TranslateWithValues</code> function.
          </p>
          <p>
            The returned result can then be passed to <code>Notifier1.ShowAlert</code>.
          </p>
          <p>For example:</p>
          <ul className="property-specs">
            <li>
              English produces <code>Hello Akash!</code>
            </li>
            <li>
              Hindi produces <code>नमस्ते Akash!</code>
            </li>
            <li>
              French produces <code>Bonjour Akash !</code>
            </li>
            <li>
              German produces <code>Hallo Akash!</code>
            </li>
          </ul>

          <p>
            The message template changes according to the active application language, while{" "}
            <code>Akash</code> comes from the user’s current input.
          </p>
          <p>
            Use the Screen component’s <code>Translate</code> function when a dynamic message does
            not contain placeholders. Use <code>TranslateWithValues</code> when the message
            contains values that must be supplied while the application is running.
          </p>
          <p>
            Other possible uses include displaying an item count, a player’s score, a network error
            containing a resource name, an order status, or any message whose values depend on
            application logic.
          </p>
        </div>
      </div>

      <h3>Preview and build</h3>
      <p>
        Return to the Designer and, while a Companion is connected, choose a language from the i18n
        preview selector. The selected language and current translation data are sent to the
        Companion and reapplied for testing.
      </p>
      <p>
        When the project is ready, use the normal Android or iOS build workflow. The buildserver
        reads the shared translation source, generates the manifest and language assets, and passes
        them to the platform-specific packaging pipeline.
      </p>
      <p>
        At runtime, the platform loader derives the language from the device locale. It tries the
        exact locale first and then a language-only match when available. If an entry has no
        translation, the application uses its base text.
      </p>
      <p>The same editable translation source is used for both Android and iOS builds.</p>

      <h3>Automatic behavior</h3>
      <ul className="check-list">
        <li>
          <Icon name="check" />
          <span>
            Eligible translatable Designer properties are rediscovered when Designer content changes.
          </span>
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
