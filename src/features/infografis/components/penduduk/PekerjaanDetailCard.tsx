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
      className="hero-reveal group relative overflow-hidden rounded-[22px] border border-white/15 p-5 shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:p-6"
      style={{ backgroundColor: bgColor, animationDelay: `${delayMs}ms` }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-18 blur-xl transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: textColor }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-white/15" />

      <div className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 sm:h-17 sm:w-17">
              <div className="text-center leading-none">
                <span
                  className="block text-[21px] font-bold sm:text-[24px]"
                  style={{ fontFamily: "var(--font-upakarti)" }}
                >
                  {kode}
                </span>
              </div>
            </div>
            <div className="min-w-0">
              <h3
                className="font-[Georgia,serif] text-[18px] font-bold leading-[1.12] sm:text-[19px]"
                style={{ color: textColor }}
              >
                {nama}
              </h3>
              <p
                className="mt-1.5 max-w-[34ch] text-[12px] leading-5"
                style={{ color: textColor, opacity: 0.74 }}
              >
                Data kategori ini ditampilkan sebagai ringkasan pekerjaan utama penduduk.
              </p>
            </div>
          </div>
          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-[#0B281F] px-3.5 py-1.5 text-[11px] font-bold text-white/92 backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E0A1]" />
            {persentase}%
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-white/12 pt-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: textColor, opacity: 0.62 }}>
              Jumlah penduduk
            </p>
            <p
              className="mt-1 text-[32px] font-bold leading-none sm:text-[36px]"
              style={{ color: textColor, fontFamily: "var(--font-upakarti)" }}
            >
              {jumlah}
            </p>
          </div>
          <div className="rounded-full border border-white/15 bg-black/16 px-3 py-2 text-[11px] font-semibold text-white/85">
            Detail kategori
          </div>
        </div>
      </div>
    </article>
  );
}
