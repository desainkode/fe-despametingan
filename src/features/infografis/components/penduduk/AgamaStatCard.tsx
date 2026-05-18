"use client";

import React from "react";

interface AgamaStatCardProps {
  nama: string;
  deskripsi: string;
  jumlah: string;
  persentase: number;
  tema: "yellow" | "green";
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  delayMs: number;
}

export function AgamaStatCard({
  nama,
  deskripsi,
  jumlah,
  persentase,
  tema,
  icon: Icon,
  delayMs,
}: AgamaStatCardProps) {
  const isYellow = tema === "yellow";

  return (
    <article
      className="hero-reveal group relative h-64 w-[240px] xs:w-[260px] sm:h-69 sm:w-72 shrink-0 snap-start overflow-hidden rounded-[24px] text-white transition-transform duration-500 ease-out hover:-translate-y-1"
      style={{
        animationDelay: `${delayMs}ms`,
        backgroundImage: isYellow
          ? "linear-gradient(180deg, #F0B100 0%, #D9A000 100%)"
          : "linear-gradient(180deg, #00A56A 0%, #009966 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-2.5 rounded-[18px] border border-white/12 bg-white/5 shadow-[inset_4px_-4px_18px_rgba(255,255,255,0.08),inset_-4px_4px_18px_rgba(0,0,0,0.08)] backdrop-blur-xs" />
      <div className="pointer-events-none absolute -right-12 top-7 h-28 w-28 rounded-full bg-black/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

      <div className="relative z-10 flex h-full flex-col px-4.5 pb-4.5 pt-4.5 sm:px-6 sm:pb-6 sm:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex h-12 w-12 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-[0_8px_16px_rgba(0,0,0,0.18),inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-105">
            <Icon size={20} className="size-[20px] sm:size-[24px]" strokeWidth={2.2} />
          </div>

          <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#00E397]/50 bg-[#0B281F]/70 px-2.5 py-0.5 text-white shadow-[0_8px_16px_rgba(0,0,0,0.18)] sm:gap-1.5 sm:px-3 sm:py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E0A1] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.6px] sm:text-[12px]">{persentase}%</span>
          </div>
        </div>

        <div className="mt-2.5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[42px] font-bold leading-none text-white sm:text-[52px]" style={{ fontFamily: "Georgia, serif" }}>
              {jumlah}
            </p>
            <p className="mt-1 text-[12px] opacity-80 sm:text-[14px]" style={{ fontFamily: "Georgia, serif" }}>
              Orang
            </p>
          </div>
        </div>

        <div className="mt-3.5 grid gap-1.5 pt-0">
          <h3 className="text-[17px] font-bold leading-tight text-white sm:text-[20px]" style={{ fontFamily: "Georgia, serif" }}>
            {nama}
          </h3>
          <p className="max-w-52 text-[10px] leading-relaxed text-[#ECFDF5]/80 sm:text-[12px]">
            {deskripsi}
          </p>
        </div>
      </div>
    </article>
  );
}
