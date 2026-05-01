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
      className="hero-reveal group relative h-69 w-78 shrink-0 snap-start overflow-hidden rounded-[41px] text-white transition-transform duration-500 ease-out hover:-translate-y-1"
      style={{
        animationDelay: `${delayMs}ms`,
        backgroundImage: isYellow
          ? "linear-gradient(180deg, #F0B100 0%, #D9A000 100%)"
          : "linear-gradient(180deg, #00A56A 0%, #009966 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-2.75 rounded-[33px] border border-white/12 bg-white/5 shadow-[inset_4px_-4px_18px_rgba(255,255,255,0.08),inset_-4px_4px_18px_rgba(0,0,0,0.08)] backdrop-blur-xs" />
      <div className="pointer-events-none absolute -right-12 top-7 h-28 w-28 rounded-full bg-black/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

      <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex h-17 w-17 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-[0_10px_18px_rgba(0,0,0,0.18),inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-105">
            <Icon size={28} strokeWidth={2.2} />
          </div>

          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#00E397] bg-[#0B281F] px-3 py-1 text-white shadow-[0_8px_16px_rgba(0,0,0,0.18)]">
            <span className="size-2 rounded-full bg-[#FD0000]/70" />
            <span className="text-[12px] font-medium uppercase tracking-[0.6px]">{persentase}%</span>
          </div>
        </div>

        <div className="mt-2.5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-upakarti text-[52px] leading-[0.82] text-white sm:text-[58px]">
              {jumlah}
            </p>
            <p className="mt-0.5 font-timeless text-[14px] leading-none text-white sm:text-[16px]">
              Orang
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 pt-0">
          <h3 className="font-timeless text-[20px] leading-[1.05] text-white sm:text-[22px]">
            {nama}
          </h3>
          <p className="max-w-56 text-[11px] leading-[1.3] text-[#ECFDF5] sm:text-[12px]">
            {deskripsi}
          </p>
        </div>
      </div>
    </article>
  );
}
