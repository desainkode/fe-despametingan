"use client";

import React from "react";
import { Info } from "lucide-react";
import { sectionCardClass } from "../section-ui";
import { KARTU_DEMOGRAFI } from "../../config/penduduk-data";
import { DemografiCard } from "./DemografiCard";

export function DemografiSection() {
  return (
    <div className={sectionCardClass + " bg-white"}>
      <div className="relative grid gap-4 border-b border-[#0B281F]/10 pb-6 pr-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] md:items-start md:gap-6 md:pr-16">
        <h2
          className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]"
          style={{ animationDelay: "40ms" }}
        >
          Demografi
          <br />
          Penduduk
        </h2>

        <p
          className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7"
          style={{ animationDelay: "140ms" }}
        >
          Demografi Penduduk merupakan penyajian data kependudukan yang
          transparan, akurat, and terintegrasi guna mendukung proses
          perencanaan pembangunan, pengambilan kebijakan, serta evaluasi
          program secara tepat sasaran.
        </p>

        <button
          type="button"
          aria-label="Informasi demografi penduduk"
          className="hero-reveal absolute right-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5 md:h-14 md:w-14"
          style={{ animationDelay: "220ms" }}
        >
          <Info size={22} strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-8 px-2">
        <div
          className="hero-reveal grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4 xl:gap-16"
          style={{ animationDelay: "300ms" }}
        >
          {KARTU_DEMOGRAFI.map((item, idx) => (
            <DemografiCard
              key={`${item.label}-${idx}`}
              label={item.label}
              angka={item.angka}
              bgColor={item.bgColor}
              textColor={item.textColor}
              labelColor={item.labelColor}
              icon={item.icon}
              delayMs={300 + idx * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
