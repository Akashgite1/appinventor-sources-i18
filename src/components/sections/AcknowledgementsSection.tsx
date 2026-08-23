import { Icon } from "../ui/Icon";

export function AcknowledgementsSection() {
  return (
    <section id="acknowledgements" className="doc-section acknowledgements-section">
      <div id="links" style={{ display: "none" }} aria-hidden="true" />

      {/* Centered Section Header */}
      <div className="section-header-center">
        <h2>
          <a href="#acknowledgements">#</a> Acknowledgements
        </h2>
        <p className="section-subtitle">
          Gratitude to mentors, collaborators, and the global open-source community.
        </p>
      </div>

      {/* ── Single Unified Modern Card (Stretched & Centered) ── */}
      <article className="unified-acknowledgement-card">
        {/* Card Intro Header */}
        <div className="ack-card-intro">
          <div className="ack-kicker-row">
            <span className="ack-kicker-badge">
              <Icon name="sparkles" /> GSoC 2026 Mentorship & Community
            </span>
          </div>
          <p className="ack-lead-text">
            This project would not have been possible without the guidance, patience, and support of
            my mentors and the wider App Inventor community. I am deeply grateful to everyone who
            gave me the opportunity to contribute and helped me grow throughout GSoC 2026.
          </p>
        </div>

        <div className="ack-card-content">
          {/* ── Block 1: Evan Patton ── */}
          <div className="ack-block mentor-focus">
            <div className="ack-block-header">
              <div className="mentor-avatar-badge evan-avatar">EP</div>
              <div className="mentor-info">
                <h3>Evan Patton</h3>
                <span className="mentor-role-tag">Primary Mentor · MIT App Inventor Lead</span>
              </div>
            </div>

            <div className="ack-block-body">
              <p>
                I would first like to express my heartfelt gratitude to my mentor,{" "}
                <strong>Evan Patton</strong>.
              </p>
              <p>
                Whenever I was stuck, Evan patiently helped me find the right direction. He taught me
                how to organize my code more clearly, break large changes into reviewable pull
                requests, and make design decisions that align with the broader App Inventor
                platform.
              </p>
              <p>
                Many of my early ideas and pull requests were ambitious and sometimes messy. Evan
                took the time to review them carefully, explain the underlying problems, and guide me
                toward solutions that were maintainable and appropriate for the project. His feedback
                did more than improve the implementation—it shaped how I approach software
                architecture, collaboration, and open-source engineering.
              </p>
              <p>
                I owe a significant part of this project’s progress, as well as my personal growth as
                an engineer, to his mentorship. Evan is not only an exceptional engineer and mentor,
                but also a genuinely kind and supportive person.
              </p>

              <div className="ack-quote-box">
                <Icon name="sparkles" />
                <p>
                  <strong>
                    Thank you, Evan, for your patience, guidance, trust, and everything you taught me
                    throughout this journey.
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <div className="ack-section-divider" />

          {/* ── Block 2: José Dominguez and Susan Lati ── */}
          <div className="ack-block">
            <div className="ack-block-header">
              <div className="mentor-avatars-cluster">
                <span className="mentor-avatar-badge sub-avatar">JD</span>
                <span className="mentor-avatar-badge sub-avatar">SL</span>
              </div>
              <div className="mentor-info">
                <h3>José Dominguez and Susan Lati</h3>
                <span className="mentor-role-tag">Mentorship & Review Support</span>
              </div>
            </div>

            <div className="ack-block-body">
              <p>
                I would also like to express my sincere gratitude to{" "}
                <strong>José Dominguez</strong> and <strong>Susan Lati</strong> for their support
                throughout the program.
              </p>
              <p>
                Their active participation in our group meetings, willingness to offer help, and
                thoughtful opinions on different design approaches helped me understand the App
                Inventor codebase and its development practices more clearly. Their feedback was
                especially valuable while evaluating implementation choices and preparing the
                project’s final submission.
              </p>
              <p>
                Thank you both for sharing your experience, answering questions, and contributing to
                a welcoming and collaborative mentoring environment.
              </p>
            </div>
          </div>

          <div className="ack-section-divider" />

          {/* ── Block 3: App Inventor Community & GSoC ── */}
          <div className="ack-block">
            <div className="ack-block-header">
              <div className="mentor-avatar-badge community-avatar">
                <Icon name="globe" />
              </div>
              <div className="mentor-info">
                <h3>App Inventor community</h3>
                <span className="mentor-role-tag">
                  Community, Maintainers & Google Summer of Code
                </span>
              </div>
            </div>

            <div className="ack-block-body">
              <p>
                I am grateful to the{" "}
                <strong>
                  MIT App Inventor team, the App Inventor Foundation, fellow contributors, and
                  reviewers
                </strong>{" "}
                for welcoming me into the community and giving me the opportunity to contribute to
                such an impactful open-source platform.
              </p>
              <p>
                Working on App Inventor allowed me to contribute to software used by creators,
                students, educators, and developers around the world. The discussions, code reviews,
                and contributions from the community continually helped improve both the project and
                my understanding of collaborative software development.
              </p>
              <p>
                Finally, I would like to thank <strong>Google Summer of Code</strong> for making this
                experience possible. GSoC gave me the opportunity to work closely with experienced
                open-source developers, contribute a meaningful feature, and grow significantly as an
                engineer.
              </p>
              <p className="ack-closing-line">
                I will always be grateful for this opportunity and for everyone who became part of
                this journey.
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
