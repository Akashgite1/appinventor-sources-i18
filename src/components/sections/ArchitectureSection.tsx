import { Status } from "../ui/Status";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="doc-section">
      <h2>
        <a href="#architecture">#</a> Architecture
      </h2>
      <p>
        The editable project source and compiled runtime assets intentionally use different formats.
        Creators maintain one platform-neutral translation document, while the buildserver converts
        it into versioned, language-oriented assets consumed by Android and iOS.
      </p>

      <h3>Data flow</h3>
      <div
        className="flow"
        role="img"
        aria-label="Translation data flow from editor to buildserver to Android and iOS runtimes"
      >
        <div>
          <small>Authoring</small>
          <strong>Translation editor</strong>
          <code>youngandroidproject/translations.json</code>
          <p>
            Discovers translatable Designer content and stores languages, source locators,
            translation keys, and translated values.
          </p>
        </div>
        <span>→</span>
        <div>
          <small>Build</small>
          <strong>Shared buildserver generator</strong>
          <code>manifest.json + languages/*.json</code>
          <p>
            Validates the translation source and generates one manifest plus a separate payload
            for each configured language.
          </p>
        </div>
        <span>→</span>
        <div>
          <small>Runtime</small>
          <strong>Android and iOS</strong>
          <code>locale selection + fallback</code>
          <p>
            Platform-specific loaders select the best supported language, resolve fallback values,
            format dynamic placeholders, and apply translated properties.
          </p>
        </div>
      </div>

      <h3>Shared contract, separate implementations</h3>
      <p>
        Both platforms consume the same generated manifest and language-file contract. Asset
        generation is shared in the buildserver, while packaging and runtime application are
        implemented separately for Android and iOS.
      </p>

      <h3>Separation of responsibilities</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Layer</th>
              <th>Responsibility</th>
              <th>Implementation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Project editor</td>
              <td>Discover, edit, and autosave the shared translation source</td>
              <td>
                <Status tone="green">Shared</Status>
              </td>
            </tr>
            <tr>
              <td>Buildserver generator</td>
              <td>Validate source data and generate manifest/language assets</td>
              <td>
                <Status tone="green">Shared</Status>
              </td>
            </tr>
            <tr>
              <td>Packaging</td>
              <td>Place generated assets into the platform application bundle</td>
              <td>
                <Status tone="purple">Platform-specific</Status>
              </td>
            </tr>
            <tr>
              <td>Runtime</td>
              <td>Select language, resolve fallback, format values, and apply properties</td>
              <td>
                <Status tone="purple">Platform-specific</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
