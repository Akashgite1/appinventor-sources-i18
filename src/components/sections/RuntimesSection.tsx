import { Status } from "../ui/Status";

export function RuntimesSection() {
  return (
    <section id="runtimes" className="doc-section">
      <h2>
        <a href="#runtimes">#</a> Android and iOS runtimes
      </h2>
      <div className="platform-grid">
        <article>
          <div className="platform-title">
            <span>A</span>
            <div>
              <h3>Android</h3>
              <Status>Package verified</Status>
            </div>
          </div>
          <p>
            Loads generated assets, selects the best supported locale, applies translated
            properties, exposes dynamic lookup APIs, and supports Companion preview switching.
          </p>
          <ul>
            <li>Manifest and per-language payloads</li>
            <li>Base-language and locale fallback</li>
            <li>Pre-initialize property application</li>
            <li>Dynamic placeholder formatting</li>
          </ul>
        </article>
        <article>
          <div className="platform-title">
            <span>i</span>
            <div>
              <h3>iOS</h3>
              <Status tone="purple">Unit covered</Status>
            </div>
          </div>
          <p>
            Uses the shared asset contract with Swift-specific loading and application logic. No
            separate iOS translation editor or project storage is required.
          </p>
          <ul>
            <li>iOS buildserver packaging task</li>
            <li>Swift loader and formatter</li>
            <li>Pre-initialize property application</li>
            <li>Dynamic APIs and Companion preview</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
