"use client";

import { useMemo, useState } from "react";

// Data
import {
  navigation,
  fileChanges,
  contributionLayers,
  type ContributionLayer,
  repository,
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
import { ContributionMapSection } from "./components/sections/ContributionMapSection";
import { TestingSection } from "./components/sections/TestingSection";
import { ContributorGuideSection } from "./components/sections/ContributorGuideSection";
import { FutureWorkSection } from "./components/sections/FutureWorkSection";
import { AcknowledgementsSection } from "./components/sections/AcknowledgementsSection";

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

  // Consume pre-computed layer statistics directly from snapshot
  const layerStats = contributionLayers;

  const visibleChanges = useMemo(() => {
    if (activeLayer === "all") return fileChanges;
    const selected = contributionLayers.find((layer) => layer.id === activeLayer);
    return selected ? selected.files : [];
  }, [activeLayer]);

  const visibleAdditions = useMemo(
    () => visibleChanges.reduce((sum, [, additions]) => sum + additions, 0),
    [visibleChanges]
  );
  const visibleDeletions = useMemo(
    () => visibleChanges.reduce((sum, [, , deletions]) => sum + deletions, 0),
    [visibleChanges]
  );

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
        <ContributionMapSection
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
          layerStats={layerStats}
          visibleChanges={visibleChanges}
          visibleAdditions={visibleAdditions}
          visibleDeletions={visibleDeletions}
        />
        <TestingSection />
        <ContributorGuideSection />
        <FutureWorkSection />
        <AcknowledgementsSection />
      </main>
    </div>
  );
}
