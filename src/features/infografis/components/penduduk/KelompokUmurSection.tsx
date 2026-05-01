"use client";

import React from "react";
import { ChartNoAxesCombined } from "lucide-react";
import { sectionCardClass } from "../section-ui";
import { DIAGRAM_KELOMPOK_UMUR } from "../../config/penduduk-data";
import { KelompokUmurChart } from "./KelompokUmurChart";

export function KelompokUmurSection() {
  return (
    <section className={sectionCardClass + " bg-[#ffffff]"}>
      <div className="flex flex-col gap-7">
        <div className="relative grid gap-4 border-b border-[#0B281F]/10 pb-6 pr-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] md:items-start md:gap-6 md:pr-16">
          <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]" style={{ animationDelay: "40ms" }}>
            Berdasarkan
            <br />
            Kelompok Umur
          </h2>

          <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7" style={{ animationDelay: "140ms" }}>
            Kelompok Umur merupakan penyajian data penduduk berdasarkan
            rentang usia tertentu yang ditampilkan secara transparan, akurat,
            and terintegrasi guna mendukung proses perencanaan pembangunan,
            pengambilan kebijakan, serta evaluasi program secara tepat
            sasaran.
          </p>

          <button
            type="button"
            aria-label="Informasi kelompok umur"
            className="hero-reveal absolute right-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5 md:h-14 md:w-14"
            style={{ animationDelay: "220ms" }}
          >
            <ChartNoAxesCombined size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div className="hero-reveal grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5" style={{ animationDelay: "180ms" }}>
          {DIAGRAM_KELOMPOK_UMUR.map((item, idx) => (
            <KelompokUmurChart
              key={`${item.title}-${idx}`}
              title={item.title}
              icon={item.icon}
              bars={item.bars}
              delayMs={120 + idx * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
