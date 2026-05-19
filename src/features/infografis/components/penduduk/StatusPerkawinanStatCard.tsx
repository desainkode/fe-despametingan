"use client";

import React from "react";
import { CheckCircle2, CircleOff } from "lucide-react";

interface StatusPerkawinanStatCardProps {
  title: string;
  description: string;
  jumlah: string;
  icon: "kawin" | "belum";
  delayMs: number;
}

export function StatusPerkawinanStatCard({
  title,
  description,
  jumlah,
  icon,
  delayMs,
}: StatusPerkawinanStatCardProps) {
  return (
    <article
      className="hero-reveal group relative overflow-hidden rounded-[20px] border border-[#00E0A1]/25 bg-white/5 px-5 py-5 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#00E0A1]/45 hover:bg-white/10 sm:px-6 sm:py-6"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#00E0A1]/10 blur-2xl transition-all duration-500 group-hover:bg-[#00E0A1]/20" />

      <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-6">
        <div className="flex min-w-0 items-start gap-3.5">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0B100] text-white shadow-[0_6px_14px_rgba(240,177,0,0.3)] transition-transform duration-500 ease-out group-hover:scale-105 sm:h-13 sm:w-13">
            {icon === "kawin" ? (
              <CheckCircle2 size={20} strokeWidth={2.2} className="size-[20px] sm:size-[22px]" />
            ) : (
              <CircleOff size={20} strokeWidth={2.2} className="size-[20px] sm:size-[22px]" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="whitespace-pre-line font-[Georgia,serif] text-[20px] font-bold leading-[1.1] text-white sm:text-[24px] md:text-[28px]">
              {title}
            </h3>
            <p className="mt-2 max-w-[42ch] text-[11.5px] leading-relaxed text-emerald-50/80 sm:text-[13px]">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start text-left md:items-end md:justify-end md:text-right md:pt-1">
          <div className="flex items-baseline gap-1.5 justify-start md:justify-end">
            <span className="font-[Georgia,serif] text-[36px] font-bold leading-none text-white sm:text-[44px] md:text-[48px]">
              {jumlah}
            </span>
            <span className="font-[Georgia,serif] text-[14px] font-bold text-white/70 sm:text-[17px] md:text-[18px]">
              Orang
            </span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/60">
            Tercatat
          </div>
        </div>
      </div>
    </article>
  );
}
