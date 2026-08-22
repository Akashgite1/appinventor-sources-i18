import { Icon } from "../ui/Icon";

export function OutcomesSection() {
  return (
    <section id="outcomes" className="doc-section">
      <h2>
        <a href="#outcomes">#</a> Outcomes
      </h2>
      <p>
        The project establishes one translation source of truth in each App Inventor project. The
        editor discovers translatable Designer content, creators add languages and translations in a
        dedicated workspace, and the build pipeline converts that source into compact runtime assets
        for both platforms.
      </p>
      <div className="callout success">
        <Icon name="check" />
        <div>
          <strong>Shared UI, shared project format</strong>
          <p>
            Android and iOS use the same translation editor and the same project data. Only
            packaging and runtime application are platform-specific.
          </p>
        </div>
      </div>
      <div className="feature-grid">
        <article>
          <span>01</span>
          <h3>Editor workflow</h3>
          <p>
            Central language management, static and dynamic entries, search, pagination, and
            automatic persistence.
          </p>
        </article>
        <article>
          <span>02</span>
          <h3>Stable translation model</h3>
          <p>
            Source locators map to stable keys so component renames preserve existing work.
          </p>
        </article>
        <article>
          <span>03</span>
          <h3>Cross-platform delivery</h3>
          <p>One manifest and per-language JSON files feed Android and iOS runtime loaders.</p>
        </article>
      </div>
    </section>
  );
}
