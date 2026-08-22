import { Icon } from "../ui/Icon";
import { Status } from "../ui/Status";
import { milestones, repository } from "../../data/constants";

export function DeliverablesSection() {
  return (
    <section id="deliverables" className="doc-section">
      <h2>
        <a href="#deliverables">#</a> Deliverables
      </h2>
      <p>
        Development was intentionally split into reviewable branches. Each milestone below is linked
        to its public source branch.
      </p>
      <div className="milestone-list">
        {milestones.map((milestone, index) => (
          <article key={milestone.branch}>
            <div className="milestone-number">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <h3>{milestone.title}</h3>
              <p>{milestone.summary}</p>
              <a
                href={`${repository}/tree/${milestone.branch}`}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="branch" />
                {milestone.branch}
                <Icon name="external" />
              </a>
            </div>
            <Status tone="purple">Review stack</Status>
          </article>
        ))}
      </div>
    </section>
  );
}
