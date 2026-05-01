"use client";

import React from "react";

interface PekerjaanTopCardProps {
  nama: string;
  jumlah: string;
  rank: "TOP 1" | "TOP 2" | "TOP 3";
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  delayMs: number;
}

export function PekerjaanTopCard({
  nama,
  jumlah,
  rank,
  icon: Icon,
  delayMs,
}: PekerjaanTopCardProps) {
  return (
    <article
      className="hero-reveal group relative isolate h-56 overflow-hidden rounded-tl-[24px] rounded-br-[24px] bg-linear-to-br from-[#001F18] via-[#003326] to-[#005239] p-4 text-[#F3F8F6] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:h-75 md:h-80 sm:p-6 sm:rounded-tl-[28px] sm:rounded-br-[28px]"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-right-14 sm:-top-14 sm:h-28 sm:w-28" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-bottom-14 sm:-left-14 sm:h-28 sm:w-28" />

      <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-[#0B281F]/48 text-[#EAF7F1] shadow-[0_6px_14px_rgba(11,40,31,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:-rotate-3 sm:h-11 sm:w-11">
        <Icon size={16} strokeWidth={2.1} className="sm:size-18" />
      </div>

      <div className="relative mt-4 flex h-[calc(100%-3.5rem)] flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 sm:mt-6 sm:h-[calc(100%-4.75rem)]">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-[#00E0A1] px-2 py-0.5 text-[9px] leading-none font-bold text-[#0B281F] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] sm:mb-3 sm:gap-2 sm:px-3 sm:py-1 sm:text-[11px]">
            <span className="inline-block h-1 w-1 rounded-full bg-[#0B281F] sm:h-1.5 sm:w-1.5" />
            {rank}
          </div>

          <p
            className="text-[36px] font-bold leading-[0.9] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:text-[58px]"
            style={{ fontFamily: "var(--font-upakarti)" }}
          >
            {jumlah}
          </p>

          <h3 className="mt-2 font-[Georgia,serif] text-[15px] font-bold leading-[1.15] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:mt-3 sm:text-[21px] md:text-[23px]">
            {nama}
          </h3>
        </div>

        <p className="self-end text-right text-[10px] leading-tight text-[#F5F7F6]/85 sm:text-[12px]">
          Terdata
          <br />
          oleh sistem
        </p>
      </div>
    </article>
  );
}
