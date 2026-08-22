import { Icon } from "../ui/Icon";
import { repository } from "../../data/constants";

export function LinksSection() {
  return (
    <section id="links" className="doc-section links-section">
      <h2>
        <a href="#links">#</a> Project links
      </h2>
      <a
        href="https://summerofcode.withgoogle.com/programs/2026/projects/HDaxXVBH"
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <strong>Official GSoC project</strong>
          <small>Program listing and project summary</small>
        </span>
        <Icon name="external" />
      </a>
      <a
        href="https://github.com/mit-cml/appinventor-sources/issues/3976"
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <strong>Tracking issue #3976</strong>
          <small>Internationalization support discussion</small>
        </span>
        <Icon name="external" />
      </a>
      <a
        href={`${repository}/pulls?q=is%3Apr+author%3AAkashgite1+i18n`}
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <strong>Pull request work</strong>
          <small>Public review history and stacked changes</small>
        </span>
        <Icon name="external" />
      </a>
      <a href={repository} target="_blank" rel="noreferrer">
        <span>
          <strong>Source repository</strong>
          <small>Branches, commits, and implementation source</small>
        </span>
        <Icon name="external" />
      </a>
    </section>
  );
}
