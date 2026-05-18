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
      <div className="absolute -left-1.5 -top-3 z-20 inline-flex h-8 w-10 items-center justify-center rounded-md bg-[#F0B100] shadow-[0_6px_12px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 sm:-left-3 sm:-top-5 sm:h-17 sm:w-19 sm:rounded-xl sm:items-start sm:justify-start sm:px-2.5 sm:pt-1">
        <span className="text-[18px] font-bold leading-none text-white sm:text-[38px]" style={{ fontFamily: "Georgia, serif" }}>
          {kode}
        </span>
      </div>

      <span className="absolute right-1 top-0.5 z-30 inline-flex items-center gap-0.5 rounded-full bg-[#00E0A1] px-1.5 py-0.5 text-[8px] font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] border border-white/20 sm:gap-1.5 sm:px-3 sm:py-1 sm:text-[13px]">
        <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
        {persentase}%
      </span>

      <div className="relative z-10 min-h-[110px] overflow-hidden rounded-[16px] border border-white/10 bg-linear-to-br from-white/15 via-white/5 to-transparent px-3 pb-3 pt-5 shadow-[0_20px_40px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10 sm:min-h-38 sm:rounded-[24px] sm:px-5 sm:pb-5 sm:pt-7">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00E0A1]/15 blur-2xl transition-all duration-500 group-hover:bg-[#00E0A1]/25" />

        <div className="relative">
          <h3 className="font-[Georgia,serif] text-[15px] font-bold leading-[1.1] text-white sm:text-[34px]">
            <span className="block text-[14px] font-normal opacity-70 sm:text-[38px]">Dusun</span>
            <span className="mt-0.5 block tracking-tight">{nama.replace("Dusun ", "")}</span>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[9.5px] leading-normal text-white/60 sm:mt-3 sm:line-clamp-none sm:text-[13px]">{deskripsi}</p>
        </div>
      </div>
    </article>
  );
}
