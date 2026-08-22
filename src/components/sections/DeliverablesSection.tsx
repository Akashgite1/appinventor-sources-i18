import { useState, useMemo } from "react";
import { Icon } from "../ui/Icon";
import { Status } from "../ui/Status";
import { pullRequests, upstreamPr, repository, type PullRequestItem } from "../../data/constants";

type FilterStatus = "all" | "upstream" | "merged" | "ready" | "in-review";
type ViewMode = "cards" | "stack";

export function DeliverablesSection() {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [selectedPrId, setSelectedPrId] = useState<string | null>(null);

  const filteredPrs = useMemo(() => {
    if (filter === "all") return pullRequests;
    return pullRequests.filter((pr) => pr.status === filter);
  }, [filter]);

  const counts = useMemo(() => {
    return {
      all: pullRequests.length,
      upstream: pullRequests.filter((p) => p.status === "upstream").length,
      merged: pullRequests.filter((p) => p.status === "merged").length,
      ready: pullRequests.filter((p) => p.status === "ready").length,
      inReview: pullRequests.filter((p) => p.status === "in-review").length,
    };
  }, []);

  return (
    <section id="deliverables" className="doc-section deliverables-section">
      <div className="section-header-wrap">
        <div>
          <h2>
            <a href="#deliverables">#</a> Deliverables &amp; PR Stack
          </h2>
          <p className="section-subtitle">
            Development was structured as a clean, incremental stack of reviewable pull requests anchored on the upstream MIT App Inventor repository. Every PR below links directly to its live pull request on GitHub.
          </p>
        </div>
      </div>

      {/* Upstream PR Spotlight Banner */}
      <div className="upstream-spotlight">
        <div className="upstream-spotlight-badge-row">
          <div className="upstream-org-badge">
            <span className="org-icon">🏛️</span>
            <strong>mit-cml / appinventor-sources</strong>
          </div>
          <Status tone="purple">Upstream PR #{upstreamPr.number}</Status>
        </div>
        <div className="upstream-content">
          <div className="upstream-text">
            <h3>{upstreamPr.title}</h3>
            <p>{upstreamPr.summary}</p>
            <div className="upstream-branch-meta">
              <span className="branch-pill">
                <Icon name="branch" />
                <code>{upstreamPr.branch}</code>
              </span>
              <span className="branch-target">
                <Icon name="arrow-right" /> targeting <code>master</code>
              </span>
            </div>
          </div>
          <div className="upstream-action-wrap">
            <a
              href={upstreamPr.prUrl}
              target="_blank"
              rel="noreferrer"
              className="button primary upstream-pr-button"
            >
              <Icon name="pr" />
              View Upstream PR #{upstreamPr.number}
              <Icon name="external" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="pr-controls-bar">
        <div className="pr-filter-tabs">
          <button
            type="button"
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All PRs <span className="count-pill">{counts.all}</span>
          </button>
          <button
            type="button"
            className={`filter-tab ${filter === "upstream" ? "active" : ""}`}
            onClick={() => setFilter("upstream")}
          >
            Upstream <span className="count-pill">{counts.upstream}</span>
          </button>
          <button
            type="button"
            className={`filter-tab ${filter === "merged" ? "active" : ""}`}
            onClick={() => setFilter("merged")}
          >
            Merged <span className="count-pill">{counts.merged}</span>
          </button>
          <button
            type="button"
            className={`filter-tab ${filter === "ready" ? "active" : ""}`}
            onClick={() => setFilter("ready")}
          >
            Ready <span className="count-pill">{counts.ready}</span>
          </button>
          <button
            type="button"
            className={`filter-tab ${filter === "in-review" ? "active" : ""}`}
            onClick={() => setFilter("in-review")}
          >
            In Review <span className="count-pill">{counts.inReview}</span>
          </button>
        </div>

        <div className="pr-view-toggle">
          <button
            type="button"
            className={`view-btn ${viewMode === "cards" ? "active" : ""}`}
            onClick={() => setViewMode("cards")}
            title="Card View"
          >
            <Icon name="layers" /> Cards
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === "stack" ? "active" : ""}`}
            onClick={() => setViewMode("stack")}
            title="Stack Tree View"
          >
            <Icon name="stack" /> Stack Visualizer
          </button>
        </div>
      </div>

      {/* Stack Visualizer View */}
      {viewMode === "stack" && (
        <div className="stack-graph-container">
          <div className="stack-graph-header">
            <div>
              <span className="stack-kicker">PR Dependency Hierarchy</span>
              <h4>Linear Stacked Pull Request Workflow</h4>
            </div>
            <span className="stack-legend">
              <span className="legend-dot merged" /> Merged
              <span className="legend-dot ready" /> Ready
              <span className="legend-dot in-review" /> In Review
            </span>
          </div>

          <div className="stack-tree-flow">
            {pullRequests.map((pr, index) => {
              const isSelected = selectedPrId === pr.id;
              const isUpstream = pr.isUpstream;

              return (
                <div
                  key={pr.id}
                  className={`stack-node ${pr.status} ${isSelected ? "selected" : ""} ${isUpstream ? "is-upstream" : ""}`}
                  onClick={() => setSelectedPrId(isSelected ? null : pr.id)}
                >
                  <div className="stack-node-rail">
                    <div className={`stack-dot ${pr.status}`}>
                      {pr.status === "merged" ? (
                        <Icon name="merge" />
                      ) : pr.status === "ready" ? (
                        <Icon name="check" />
                      ) : isUpstream ? (
                        <Icon name="pr" />
                      ) : (
                        <span className="status-bullet" />
                      )}
                    </div>
                    {index < pullRequests.length - 1 && <div className="stack-connector" />}
                  </div>

                  <div className="stack-node-card">
                    <div className="stack-node-top">
                      <div className="stack-node-meta">
                        <span className="pr-badge-number">
                          <Icon name="pr" /> #{pr.number}
                        </span>
                        <Status tone={pr.statusTone}>{pr.statusLabel}</Status>
                      </div>
                      <a
                        href={pr.prUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="stack-direct-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open PR <Icon name="external" />
                      </a>
                    </div>

                    <h5 className="stack-node-title">{pr.title}</h5>

                    <div className="stack-branch-route">
                      <code>{pr.branch}</code>
                      <Icon name="arrow-right" />
                      <span className="base-label">into</span>
                      <code>{pr.baseBranch}</code>
                    </div>

                    <p className="stack-node-summary">{pr.summary}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PR Cards View */}
      {viewMode === "cards" && (
        <div className="pr-cards-grid">
          {filteredPrs.map((pr) => (
            <article key={pr.id} className={`pr-card status-${pr.status} ${pr.isUpstream ? "pr-card-upstream" : ""}`}>
              <div className="pr-card-header">
                <div className="pr-card-header-left">
                  <span className="pr-tag">
                    <Icon name={pr.status === "merged" ? "merge" : "pr"} />
                    <strong>PR #{pr.number}</strong>
                  </span>
                  <Status tone={pr.statusTone}>{pr.statusLabel}</Status>
                  {pr.isUpstream && <span className="upstream-pill">Upstream MIT</span>}
                </div>
                <div className="pr-card-order-badge">
                  {pr.order === 0 ? "Base MVP" : `Stack #${pr.order}`}
                </div>
              </div>

              <div className="pr-card-body">
                <h3 className="pr-card-title">{pr.title}</h3>
                <p className="pr-card-summary">{pr.summary}</p>

                <div className="pr-branch-box">
                  <div className="branch-line">
                    <span className="branch-marker">Head:</span>
                    <a
                      href={
                        pr.isUpstream
                          ? `https://github.com/mit-cml/appinventor-sources/tree/${pr.branch}`
                          : `${repository}/tree/${pr.branch}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="branch-link"
                    >
                      <Icon name="branch" />
                      {pr.branch}
                    </a>
                  </div>
                  <div className="branch-line base-line">
                    <span className="branch-marker">Base:</span>
                    <code>{pr.baseBranch}</code>
                  </div>
                </div>

                {pr.highlights && pr.highlights.length > 0 && (
                  <div className="pr-highlights">
                    <span className="highlights-heading">Key Accomplishments</span>
                    <ul>
                      {pr.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pr-card-footer">
                <a
                  href={pr.prUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button primary pr-link-btn"
                >
                  <Icon name="pr" />
                  View Pull Request #{pr.number}
                  <Icon name="external" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
