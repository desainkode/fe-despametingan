"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import { sectionCardClass } from "../section-ui";
import { PendidikanChart } from "./PendidikanChart";

export function PendidikanSection() {
  return (
    <section className={sectionCardClass + " bg-[#ffffff]"}>
      <div className="flex flex-col gap-7">
        <div className="relative grid gap-4 border-b border-[#0B281F]/10 pb-6 pr-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] md:items-start md:gap-6 md:pr-16">
          <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
            Berdasarkan
            <br />
            Pendidikan
          </h2>

          <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
            Berdasarkan Pendidikan merupakan penyajian data penduduk menurut
            tingkat pendidikan terakhir yang disajikan secara transparan and
            akurat untuk mendukung perencanaan pembangunan desa.
          </p>

          <button
            type="button"
            aria-label="Informasi berdasarkan pendidikan"
            className="hero-reveal absolute right-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5 md:h-14 md:w-14"
          >
            <GraduationCap size={22} strokeWidth={2.2} />
          </button>
        </div>

        <PendidikanChart delayMs={120} />
      </div>
    </section>
  );
}
