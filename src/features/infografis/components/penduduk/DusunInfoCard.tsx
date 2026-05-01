"use client";

import React from "react";

interface DusunInfoCardProps {
  kode: string;
  nama: string;
  deskripsi: string;
  persentase: number;
  delayMs: number;
}

export function DusunInfoCard({
  kode,
  nama,
  deskripsi,
  persentase,
  delayMs,
}: DusunInfoCardProps) {
  return (
    <article className="hero-reveal group relative pt-4" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="absolute -left-2 -top-4 z-20 inline-flex h-12 w-14 items-start justify-start rounded-lg bg-[#F0B100] px-2 pt-0.5 shadow-[0_10px_16px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 sm:-left-3 sm:-top-5 sm:h-17 sm:w-19 sm:rounded-xl sm:px-2.5 sm:pt-1">
        <span className="text-[28px] leading-none text-white sm:text-[38px]" style={{ fontFamily: "var(--font-upakarti)" }}>
          {kode}
        </span>
      </div>

      <span className="absolute right-2 top-1 z-30 inline-flex items-center gap-1 rounded-full bg-[#00E0A1] px-2 py-0.5 text-[10px] font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-white/20 sm:gap-1.5 sm:px-3 sm:py-1 sm:text-[13px]">
        <span className="h-1 w-1 rounded-full bg-white animate-pulse sm:h-1.5 sm:w-1.5" />
        {persentase}%
      </span>

      <div className="relative z-10 min-h-32 overflow-hidden rounded-[20px] border border-white/10 bg-linear-to-br from-white/15 via-white/5 to-transparent px-4 pb-4 pt-6 shadow-[0_20px_40px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10 sm:min-h-38 sm:rounded-[24px] sm:px-5 sm:pb-5 sm:pt-7">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00E0A1]/15 blur-2xl transition-all duration-500 group-hover:bg-[#00E0A1]/25" />

        <div className="relative">
          <h3 className="font-[Georgia,serif] text-[24px] leading-[0.85] text-white sm:text-[34px]">
            <span className="block text-[28px] opacity-70 sm:text-[38px]">Dusun</span>
            <span className="mt-1 block font-bold tracking-tight">{nama.replace("Dusun ", "")}</span>
          </h3>
          <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-white/70 sm:mt-3 sm:line-clamp-none sm:text-[13px]">{deskripsi}</p>
        </div>
      </div>
    </article>
  );
}
