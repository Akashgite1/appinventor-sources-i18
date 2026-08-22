import { Status } from "../ui/Status";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="doc-section">
      <h2>
        <a href="#architecture">#</a> Architecture
      </h2>
      <p>
        The editable project data and compiled application data have intentionally different shapes.
        This keeps authoring convenient while keeping application payloads small and
        language-oriented.
      </p>
      <div
        className="flow"
        role="img"
        aria-label="Translation data flow from editor to Android and iOS runtimes"
      >
        <div>
          <small>Authoring</small>
          <strong>Translation editor</strong>
          <code>translations.json</code>
        </div>
        <span>→</span>
        <div>
          <small>Build</small>
          <strong>Shared generator</strong>
          <code>manifest + languages</code>
        </div>
        <span>→</span>
        <div>
          <small>Runtime</small>
          <strong>Android / iOS</strong>
          <code>locale + fallback</code>
        </div>
      </div>
      <h3>Separation of responsibilities</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Layer</th>
              <th>Responsibility</th>
              <th>Shared?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Project editor</td>
              <td>Discover, edit, validate, and autosave translation source data</td>
              <td>
                <Status>Yes</Status>
              </td>
            </tr>
            <tr>
              <td>Buildserver</td>
              <td>Validate language tags and generate manifest/language assets</td>
              <td>
                <Status>Yes</Status>
              </td>
            </tr>
            <tr>
              <td>Packaging</td>
              <td>Place generated assets into the application bundle</td>
              <td>
                <Status tone="purple">Platform task</Status>
              </td>
            </tr>
            <tr>
              <td>Runtime</td>
              <td>Select language, resolve fallback, format values, and apply properties</td>
              <td>
                <Status tone="purple">Platform code</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
