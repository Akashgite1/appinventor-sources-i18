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
        for Android and iOS build targets.
      </p>

      {/* Hero Architecture Callout Banner */}
      <div className="outcomes-banner">
        <div className="outcomes-banner-icon">
          <Icon name="check" />
        </div>
        <div className="outcomes-banner-body">
          <div className="outcomes-banner-header">
            <h3>Shared UI, shared project format</h3>
            <span className="outcomes-badge">Cross-Platform Standard</span>
          </div>
          <p>
            Android and iOS use the same translation editor and the same project data. Only
            packaging and runtime application are platform-specific.
          </p>
          <div className="outcomes-tags">
            <span className="outcomes-tag">
              <Icon name="sparkles" /> Single source of truth
            </span>
            <span className="outcomes-tag">
              <Icon name="code" /> Generated per-language assets
            </span>
            <span className="outcomes-tag">
              <Icon name="globe" /> Runtime translation APIs
            </span>
          </div>
        </div>
      </div>

      {/* 3-Column Pillar Feature Grid */}
      <div className="outcomes-grid">
        <article className="outcome-card">
          <div className="outcome-card-header">
            <div className="outcome-number-badge">01</div>
            <div className="outcome-icon-wrap" style={{ color: "#d2a8ff" }}>
              <Icon name="sparkles" />
            </div>
          </div>
          <h3 className="outcome-card-title">Editor workflow</h3>
          <p className="outcome-card-description">
            Central language management, static and dynamic entries, search, pagination, and
            automatic persistence.
          </p>
          <ul className="outcome-card-highlights">
            <li>Designer property discovery</li>
            <li>Autosave & dirty-state tracking</li>
            <li>Workspace search & pagination</li>
          </ul>
        </article>

        <article className="outcome-card">
          <div className="outcome-card-header">
            <div className="outcome-number-badge">02</div>
            <div className="outcome-icon-wrap" style={{ color: "#79c0ff" }}>
              <Icon name="layers" />
            </div>
          </div>
          <h3 className="outcome-card-title">Stable translation model</h3>
          <p className="outcome-card-description">
            Source locators map to stable keys so component renames preserve existing work.
          </p>
          <ul className="outcome-card-highlights">
            <li>Component rename safety</li>
            <li>Orphaned entry cleanup</li>
            <li>Supported language-tag forms</li>
          </ul>
        </article>

        <article className="outcome-card">
          <div className="outcome-card-header">
            <div className="outcome-number-badge">03</div>
            <div className="outcome-icon-wrap" style={{ color: "#7ee787" }}>
              <Icon name="cpu" />
            </div>
          </div>
          <h3 className="outcome-card-title">Cross-platform delivery</h3>
          <p className="outcome-card-description">
            One manifest and per-language JSON files feed Android and iOS runtime loaders.
          </p>
          <ul className="outcome-card-highlights">
            <li>Versioned manifest contract</li>
            <li>Per-locale payload splitting</li>
            <li>Locale fallback & dynamic formatting</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
