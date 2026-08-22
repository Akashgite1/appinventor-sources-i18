"use client";

import { useMemo, useState } from "react";

// Data
import {
  navigation,
  fileChanges,
  contributionLayers,
  getContributionLayer,
  type ContributionLayer,
} from "./data/constants";

// Layout
import { Topbar } from "./components/layout/Topbar";
import { Sidebar } from "./components/layout/Sidebar";

// Sections
import { HeroSection } from "./components/sections/HeroSection";
import { OutcomesSection } from "./components/sections/OutcomesSection";
import { DeliverablesSection } from "./components/sections/DeliverablesSection";
import { ArchitectureSection } from "./components/sections/ArchitectureSection";
import { ProjectFormatSection } from "./components/sections/ProjectFormatSection";
import { EditorSection } from "./components/sections/EditorSection";
import { BuildPipelineSection } from "./components/sections/BuildPipelineSection";
import { RuntimesSection } from "./components/sections/RuntimesSection";
import { ContributionMapSection } from "./components/sections/ContributionMapSection";
import { TestingSection } from "./components/sections/TestingSection";
import { ReviewSection } from "./components/sections/ReviewSection";
import { ContributorGuideSection } from "./components/sections/ContributorGuideSection";
import { FutureWorkSection } from "./components/sections/FutureWorkSection";
import { LinksSection } from "./components/sections/LinksSection";

import { repository } from "./data/constants";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeLayer, setActiveLayer] = useState<ContributionLayer | "all">("all");

  // Search results
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    return navigation
      .flatMap((section) => section.items)
      .filter((item) => `${item.label} ${item.id}`.toLowerCase().includes(value))
      .slice(0, 6);
  }, [query]);

  // Layer stats for the contribution tree
  const layerStats = useMemo(
    () =>
      contributionLayers.map((layer) => {
        const files = fileChanges.filter(([path]) => getContributionLayer(path) === layer.id);
        return {
          ...layer,
          files,
          additions: files.reduce((sum, [, additions]) => sum + additions, 0),
          deletions: files.reduce((sum, [, , deletions]) => sum + deletions, 0),
        };
      }),
    [],
  );

  const visibleChanges =
    activeLayer === "all"
      ? fileChanges
      : fileChanges.filter(([path]) => getContributionLayer(path) === activeLayer);

  const visibleAdditions = visibleChanges.reduce((sum, [, additions]) => sum + additions, 0);
  const visibleDeletions = visibleChanges.reduce((sum, [, , deletions]) => sum + deletions, 0);

  return (
    <div className="site-shell">
      <Topbar query={query} setQuery={setQuery} results={results} />
      <Sidebar />

      <main className="content">
        <div className="breadcrumbs">
          <a href={repository}>appinventor-sources</a>
          <span>/</span>
          <span>docs</span>
          <span>/</span>
          <strong>i18n</strong>
        </div>

        <HeroSection />
        <OutcomesSection />
        <DeliverablesSection />
        <ArchitectureSection />
        <ProjectFormatSection />
        <EditorSection />
        <BuildPipelineSection />
        <RuntimesSection />
        <ContributionMapSection
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
          layerStats={layerStats}
          visibleChanges={visibleChanges}
          visibleAdditions={visibleAdditions}
          visibleDeletions={visibleDeletions}
        />
        <TestingSection />
        <ReviewSection />
        <ContributorGuideSection />
        <FutureWorkSection />
        <LinksSection />

        <footer>
          <p>Built as the final work product and technical handoff for Google Summer of Code 2026.</p>
          <p>MIT App Inventor · Akash Gite · Mentor: Evan Patton</p>
        </footer>
      </main>
    </div>
  );
}
