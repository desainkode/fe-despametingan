"use client";

import React from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { sectionCardClass } from "../section-ui";
import { 
  PEKERJAAN_TOP_CARDS, 
  PEKERJAAN_KIRI_BAHASAN, 
  PEKERJAAN_KANAN_BAHASAN 
} from "../../config/penduduk-data";
import { PekerjaanTopCard } from "./PekerjaanTopCard";
import { PekerjaanDetailCard } from "./PekerjaanDetailCard";

export function PekerjaanSection() {
  return (
    <section className={sectionCardClass + " bg-[#ffffff]"}>
      <div className="flex flex-col gap-7">
        <div className="relative grid gap-4 border-b border-[#0B281F]/10 pb-6 pr-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] md:items-start md:gap-6 md:pr-16">
          <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]" style={{ animationDelay: "40ms" }}>
            Berdasarkan
            <br />
            Pekerjaan
          </h2>

          <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7" style={{ animationDelay: "140ms" }}>
            Kelompok Berdasarkan Pekerjaan merupakan penyajian data penduduk
            menurut jenis atau bidang pekerjaan yang disajikan secara
            transparan and akurat untuk mendukung perencanaan serta
            pengambilan kebijakan secara tepat sasaran.
          </p>

          <button
            type="button"
            aria-label="Informasi berdasarkan pekerjaan"
            className="hero-reveal absolute right-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5 md:h-14 md:w-14"
            style={{ animationDelay: "220ms" }}
          >
            <Briefcase size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div className="hero-reveal grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5" style={{ animationDelay: "180ms" }}>
          {PEKERJAAN_TOP_CARDS.map((item, idx) => (
            <PekerjaanTopCard
              key={`${item.nama}-${idx}`}
              nama={item.nama}
              jumlah={item.jumlah}
              rank={item.rank}
              icon={item.icon}
              delayMs={120 + idx * 80}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="hero-reveal relative overflow-hidden rounded-[24px] bg-linear-to-br from-[#F0B100] to-[#D4940A] p-6 sm:p-8 md:p-10" style={{ animationDelay: "260ms" }}>
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-black/5 blur-2xl" />

            <div className="relative z-10">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-[Georgia,serif] text-[28px] font-bold leading-[1.2] text-white md:text-[32px]">
                  Jenis
                  <br />
                  Pekerjaan
                </h3>
                <Link
                  href="/infografis/pekerjaan?section=pertanian"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-[12px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  View All <span>→</span>
                </Link>
              </div>

              <div className="space-y-3">
                {PEKERJAAN_KIRI_BAHASAN.map((item, idx) => (
                  <PekerjaanDetailCard
                    key={`kiri-${item.kode}-${idx}`}
                    kode={item.kode}
                    nama={item.nama}
                    jumlah={item.jumlah}
                    persentase={item.persentase}
                    bgColor="rgba(255, 255, 255, 0.15)"
                    textColor="#FEFEFE"
                    delayMs={200 + idx * 60}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="hero-reveal relative overflow-hidden rounded-[24px] bg-linear-to-br from-[#009966] to-[#005239] p-6 sm:p-8 md:p-10" style={{ animationDelay: "340ms" }}>
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

            <div className="relative z-10">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-[Georgia,serif] text-[28px] font-bold leading-[1.2] text-white md:text-[32px]">
                  Jenis
                  <br />
                  Pekerjaan
                </h3>
                <Link
                  href="/infografis/pekerjaan?section=profesional"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-[12px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  View All <span>→</span>
                </Link>
              </div>

              <div className="space-y-3">
                {PEKERJAAN_KANAN_BAHASAN.map((item, idx) => (
                  <PekerjaanDetailCard
                    key={`kanan-${item.kode}-${idx}`}
                    kode={item.kode}
                    nama={item.nama}
                    jumlah={item.jumlah}
                    persentase={item.persentase}
                    bgColor="rgba(255, 255, 255, 0.12)"
                    textColor="#FEFEFE"
                    delayMs={200 + idx * 60}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
