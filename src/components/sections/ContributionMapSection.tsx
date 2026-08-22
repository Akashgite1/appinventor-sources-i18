import { useMemo } from "react";
import type { ContributionLayer, FileChange } from "../../data/constants";
import {
  contributionLayers,
  shortFileName,
  snapshotTotals,
  snapshotMeta,
} from "../../data/constants";

interface LayerStat {
  id: ContributionLayer;
  label: string;
  role: string;
  connection: string;
  files: FileChange[];
  additions: number;
  deletions: number;
}

interface ContributionMapSectionProps {
  activeLayer: ContributionLayer | "all";
  setActiveLayer: (layer: ContributionLayer | "all") => void;
  layerStats: LayerStat[];
  visibleChanges: FileChange[];
  visibleAdditions: number;
  visibleDeletions: number;
}

export function ContributionMapSection({
  activeLayer,
  setActiveLayer,
  layerStats,
  visibleChanges,
  visibleAdditions,
  visibleDeletions,
}: ContributionMapSectionProps) {
  const selectedLayer = contributionLayers.find((l) => l.id === activeLayer);

  const formattedDate = useMemo(() => {
    try {
      const d = new Date(snapshotMeta.generatedAt);
      return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
    } catch {
      return snapshotMeta.generatedAt;
    }
  }, []);

  return (
    <section id="contribution-map" className="doc-section">
      <div className="section-header-wrap">
        <h2>
          <a href="#contribution-map">#</a> Contribution map
        </h2>
        <div className="sync-freshness-bar" aria-label="GitHub data sync status">
          <span
            className={`sync-status-dot ${snapshotMeta.stale ? "stale" : "live"}`}
            aria-hidden="true"
          />
          <span className="sync-status-text">
            {snapshotMeta.stale
              ? "Using cached GitHub snapshot"
              : `Last synchronized from GitHub: ${formattedDate}`}
          </span>
        </div>
      </div>

      <p>
        This interactive tree is generated from public GitHub data across the tracked i18n
        pull-request stack. Select a branch to inspect every file in that functional layer and see
        whether it was created or modified.
      </p>

      {/* Impact summary bar */}
      <div className="impact-summary" aria-label="Git contribution totals">
        <div>
          <span>Unique commits</span>
          <strong>{snapshotTotals.uniqueCommits}</strong>
        </div>
        <div>
          <span>Files touched</span>
          <strong>{snapshotTotals.filesTouched}</strong>
        </div>
        <div>
          <span>Lines added</span>
          <strong className="metric-add">
            +{snapshotTotals.linesAdded.toLocaleString()}
          </strong>
        </div>
        <div>
          <span>Lines deleted</span>
          <strong className="metric-delete">
            −{snapshotTotals.linesDeleted.toLocaleString()}
          </strong>
        </div>
        <div>
          <span>New files</span>
          <strong>{snapshotTotals.newFiles}</strong>
        </div>
      </div>

      {/* Interactive tree */}
      <div className="impact-tree" aria-label="Functional contribution tree">
        <button
          className={`tree-root${activeLayer === "all" ? " active" : ""}`}
          onClick={() => setActiveLayer("all")}
        >
          <span>Project root</span>
          <strong>App Inventor i18n</strong>
          <small>One source · two runtimes</small>
        </button>
        <div className="tree-trunk" aria-hidden="true" />
        <div className="tree-branches">
          {layerStats.map((layer) => (
            <button
              key={layer.id}
              className={`tree-node tree-${layer.id}${activeLayer === layer.id ? " active" : ""}`}
              onClick={() => setActiveLayer(layer.id)}
            >
              <span>{layer.role}</span>
              <strong>{layer.label}</strong>
              <small>
                {layer.files.length} files{" "}
                <b>+{layer.additions.toLocaleString()}</b>{" "}
                <em>−{layer.deletions.toLocaleString()}</em>
              </small>
            </button>
          ))}
        </div>
      </div>

      {/* Connection story */}
      <div className="connection-story" aria-label="How the implementation layers connect">
        <div>
          <span>1 · Author</span>
          <strong>Editor writes</strong>
          <code>translations.json</code>
        </div>
        <i aria-hidden="true">→</i>
        <div>
          <span>2 · Compile</span>
          <strong>Buildserver generates</strong>
          <code>manifest + language files</code>
        </div>
        <i aria-hidden="true">→</i>
        <div className="runtime-targets">
          <div>
            <span>3A · Consume</span>
            <strong>Android runtime</strong>
          </div>
          <div>
            <span>3B · Consume</span>
            <strong>iOS runtime</strong>
          </div>
        </div>
      </div>

      {/* File impact panel */}
      <div className="file-impact-panel">
        <div className="file-impact-heading">
          <div>
            <span>
              {activeLayer === "all" ? "All implementation layers" : selectedLayer?.role}
            </span>
            <h3>{activeLayer === "all" ? "Every changed file" : selectedLayer?.label}</h3>
            <p>
              {activeLayer === "all"
                ? "Select a branch above to focus the tree."
                : selectedLayer?.connection}
            </p>
          </div>
          <div className="selection-totals">
            <span>{visibleChanges.length} files</span>
            <b>+{visibleAdditions.toLocaleString()}</b>
            <em>−{visibleDeletions.toLocaleString()}</em>
          </div>
        </div>
        <div className="file-impact-list">
          {visibleChanges.map(([path, additions, deletions, kind]) => (
            <article key={path} className="file-impact-row">
              <div className="file-identity">
                <span className={`change-kind ${kind}`}>{kind}</span>
                <div>
                  <strong>{shortFileName(path)}</strong>
                  <code>{path}</code>
                </div>
              </div>
              <div className="line-delta">
                <b>+{additions}</b>
                <em>−{deletions}</em>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="history-note">
        Source: generated from public GitHub REST data across the tracked PR stack (MIT App Inventor
        #3976 + contributor PRs #2–#11).
      </p>
    </section>
  );
}
