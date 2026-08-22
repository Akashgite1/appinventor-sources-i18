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
          <strong>Official GSoC 2026 Project</strong>
          <small>Google Summer of Code program listing and project deliverables summary</small>
        </span>
        <Icon name="external" />
      </a>
      <a
        href="https://github.com/mit-cml/appinventor-sources/pull/3976#commits-pushed-93913c8"
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <strong>Upstream Pull Request #3976 (mit-cml/appinventor-sources)</strong>
          <small>Foundational MIT App Inventor core PR: feature-i18n-mvp-implementation</small>
        </span>
        <Icon name="external" />
      </a>
      <a
        href={`${repository}/pulls`}
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <strong>Contributor Pull Request Stack (Akashgite1)</strong>
          <small>All 10 stacked review branches and public review history</small>
        </span>
        <Icon name="external" />
      </a>
      <a href={repository} target="_blank" rel="noreferrer">
        <span>
          <strong>Contributor Source Repository</strong>
          <small>Forked development repository, review branches, and commits</small>
        </span>
        <Icon name="external" />
      </a>
      <a href="https://github.com/mit-cml/appinventor-sources" target="_blank" rel="noreferrer">
        <span>
          <strong>Upstream MIT App Inventor Repository</strong>
          <small>mit-cml/appinventor-sources master repository</small>
        </span>
        <Icon name="external" />
      </a>
    </section>
  );
}

