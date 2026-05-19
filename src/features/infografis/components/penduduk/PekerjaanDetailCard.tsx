"use client";

import React from "react";

interface PekerjaanDetailCardProps {
  kode: string;
  nama: string;
  jumlah: string;
  persentase: number;
  bgColor: string;
  textColor: string;
  delayMs: number;
}

export function PekerjaanDetailCard({
  kode,
  nama,
  jumlah,
  persentase,
  bgColor,
  textColor,
  delayMs,
}: PekerjaanDetailCardProps) {
  return (
    <article
      className="hero-reveal group relative overflow-hidden rounded-[20px] border border-white/15 p-4.5 shadow-[0_12px_24px_rgba(0,0,0,0.1)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 w-[210px] xs:w-[230px] sm:w-full shrink-0 snap-center"
      style={{ backgroundColor: bgColor, animationDelay: `${delayMs}ms` }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-15 blur-xl transition-opacity group-hover:opacity-25"
        style={{ backgroundColor: textColor }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.75 bg-white/15" />

      <div className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-white/18">
              <span className="text-[17px] font-bold" style={{ fontFamily: "Georgia, serif" }}>
                {kode}
              </span>
            </div>
            <h3
              className="font-[Georgia,serif] text-[15px] font-bold leading-tight sm:text-[18px] truncate"
              style={{ color: textColor }}
            >
              {nama}
            </h3>
          </div>
          
          <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/15 bg-[#0B281F]/60 px-2.5 py-0.5 text-[9.5px] font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
            <span className="h-1 w-1 rounded-full bg-[#00E0A1] animate-pulse" />
            {persentase}%
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-3">
          <p className="text-[9.5px] uppercase tracking-[0.12em]" style={{ color: textColor, opacity: 0.65 }}>
            Terdata
          </p>
          <div className="flex items-baseline gap-1">
            <span
              className="text-[24px] font-bold leading-none sm:text-[30px]"
              style={{ color: textColor, fontFamily: "Georgia, serif" }}
            >
              {jumlah}
            </span>
            <span
              className="text-[11px] font-bold sm:text-[13px]"
              style={{ color: textColor, fontFamily: "Georgia, serif", opacity: 0.8 }}
            >
              Orang
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
