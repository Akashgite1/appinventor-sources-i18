import { Icon } from "../ui/Icon";
import { Status } from "../ui/Status";
import { AppInventorLogo } from "../ui/AppInventorLogo";
import { repository } from "../../data/constants";

export function HeroSection() {
  return (
    <section id="overview" className="hero doc-section">
      <div className="eyebrow">
        <Status>Final work product</Status>
        <span>Last updated August 2026</span>
      </div>
      <h1>Internationalization support for applications built with MIT App Inventor</h1>
      <p className="lead">
        A project-level translation workflow spanning the Designer, Companion preview, Android
        builds, and iOS builds—without requiring creators to maintain separate interfaces for each
        platform.
      </p>
      <div className="hero-actions">
        <a className="button primary" href="#deliverables">
          Explore the work
        </a>
        <a
          className="button secondary"
          href="https://summerofcode.withgoogle.com/programs/2026/projects/HDaxXVBH"
          target="_blank"
          rel="noreferrer"
        >
          GSoC project <Icon name="external" />
        </a>
      </div>
      <div className="summary-grid">
        <div>
          <span>Organization</span>
          <strong style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <AppInventorLogo size={16} /> MIT App Inventor
          </strong>
        </div>
        <div>
          <span>Contributor</span>
          <strong>Akash Gite</strong>
        </div>
        <div>
          <span>Mentor</span>
          <strong>Evan Patton</strong>
        </div>
        <div>
          <span>Project size</span>
          <strong>Large · 12 weeks</strong>
        </div>
      </div>
    </section>
  );
}
