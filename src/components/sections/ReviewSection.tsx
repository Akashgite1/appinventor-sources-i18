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
          <Icon name="branch" />
          <div>
            <strong>Store i18n translations in a project file</strong>
            <code>ab7a1bcdb</code>
          </div>
          <a href={`${repository}/commit/ab7a1bcdb`} target="_blank" rel="noreferrer">
            View commit <Icon name="external" />
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
