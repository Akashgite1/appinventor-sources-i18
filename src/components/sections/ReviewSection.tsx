import { Icon } from "../ui/Icon";
import { reviewChanges, repository } from "../../data/constants";

export function ReviewSection() {
  return (
    <section id="review" className="doc-section">
      <h2>
        <a href="#review">#</a> Review-driven iterations
      </h2>
      <p>
        Maintainer review materially shaped the storage and autosave design. The final approach
        follows existing App Inventor editor conventions instead of introducing parallel
        infrastructure.
      </p>
      <div className="commit-card">
        <div>
          <Icon name="pr" />
          <div>
            <strong>Store and autosave i18n translations in a project file</strong>
            <code>PR #7 · feature-i18n-translation-autosave</code>
          </div>
          <a href="https://github.com/Akashgite1/appinventor-sources/pull/7" target="_blank" rel="noreferrer">
            View PR #7 <Icon name="external" />
          </a>
        </div>
        <ul>
          {reviewChanges.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
