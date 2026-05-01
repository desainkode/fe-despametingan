"use client";

import React from "react";
import { ChartNoAxesCombined } from "lucide-react";
import { sectionCardClass } from "../section-ui";
import { BERDASARKAN_DUSUN_CARDS } from "../../config/penduduk-data";
import { DusunInfoCard } from "./DusunInfoCard";
import { DusunPieChart } from "./DusunPieChart";

export function DusunSection() {
  return (
    <section className={sectionCardClass + " bg-[#ffffff]"}>
      <div className="flex flex-col gap-7">
        <div className="relative grid gap-4 border-b border-[#0B281F]/10 pb-6 pr-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] md:items-start md:gap-6 md:pr-16">
          <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
            Berdasarkan
            <br />
            Dusun
          </h2>

          <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
            Berdasarkan Dusun merupakan penyajian data penduduk menurut
            rentang usia di setiap dusun yang disajikan secara transparan and
            akurat untuk mendukung perencanaan and pengambilan kebijakan
            secara tepat sasaran.
          </p>

          <button
            type="button"
            aria-label="Informasi berdasarkan dusun"
            className="hero-reveal absolute right-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5 md:h-14 md:w-14"
          >
            <ChartNoAxesCombined size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-[#002B22] via-[#004234] to-[#001A14] px-6 py-10 sm:px-10 sm:py-14 md:px-12 md:py-16">
          <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#00E0A1]/10 blur-[100px]" />
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#00B179]/10 blur-[110px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,224,161,0.05)_0%,transparent_70%)]" />

          <div className="relative z-10 grid items-stretch gap-10 xl:grid-cols-[1fr_minmax(280px,0.6fr)] xl:gap-16">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
              {BERDASARKAN_DUSUN_CARDS.map((item, idx) => (
                <DusunInfoCard
                  key={`${item.kode}-${item.nama}`}
                  kode={item.kode}
                  nama={item.nama}
                  deskripsi={item.deskripsi}
                  persentase={item.persentase}
                  delayMs={120 + idx * 70}
                />
              ))}
            </div>

            <div className="flex flex-col items-center justify-center rounded-[28px] border border-white/5 bg-white/2 p-6 shadow-3xl backdrop-blur-md sm:p-8">
              <DusunPieChart delayMs={220} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
