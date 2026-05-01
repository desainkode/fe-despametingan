"use client";

import React from "react";
import { DemografiSection } from "./penduduk/DemografiSection";
import { JumlahPendudukSection } from "./penduduk/JumlahPendudukSection";
import { KelompokUmurSection } from "./penduduk/KelompokUmurSection";
import { DusunSection } from "./penduduk/DusunSection";
import { PendidikanSection } from "./penduduk/PendidikanSection";
import { PekerjaanSection } from "./penduduk/PekerjaanSection";
import { StatusPerkawinanSection } from "./penduduk/StatusPerkawinanSection";
import { AgamaSection } from "./penduduk/AgamaSection";

/**
 * PendudukSection - Orchestrator for all demographic data sections
 * This component aggregates multiple modular sections related to population data.
 */
export function PendudukSection() {
  return (
    <div className="space-y-6 md:space-y-8" id="penduduk">
      {/* 1. Overview & Basic Demographics */}
      <DemografiSection />

      {/* 2. Population Count Details */}
      <JumlahPendudukSection />

      {/* 3. Age Groups Visualization */}
      <KelompokUmurSection />

      {/* 4. Geographic Distribution (Dusun) */}
      <DusunSection />

      {/* 5. Educational Background */}
      <PendidikanSection />

      {/* 6. Employment & Occupation */}
      <PekerjaanSection />

      {/* 7. Marital Status */}
      <StatusPerkawinanSection />

      {/* 8. Religious Distribution */}
      <AgamaSection />
    </div>
  );
}
