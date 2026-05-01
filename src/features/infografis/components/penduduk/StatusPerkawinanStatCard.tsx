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
      className="hero-reveal group relative overflow-hidden rounded-[20px] border border-[#00E0A1]/35 bg-[rgba(217,217,217,0.10)] px-5 py-5 shadow-[inset_26px_-26px_26px_rgba(165,165,165,0.08),inset_-26px_26px_26px_rgba(255,255,255,0.08),0_18px_38px_rgba(0,0,0,0.12)] backdrop-blur-[14px] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#00E0A1]/55 hover:shadow-[inset_26px_-26px_26px_rgba(165,165,165,0.08),inset_-26px_26px_26px_rgba(255,255,255,0.08),0_24px_48px_rgba(0,0,0,0.16)] sm:px-6 sm:py-6"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="grid min-h-44 gap-4 md:min-h-48 md:grid-cols-[minmax(0,1fr)_auto] md:gap-6">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0B100] text-white shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out group-hover:scale-105 sm:h-13 sm:w-13">
            {icon === "kawin" ? (
              <CheckCircle2 size={22} strokeWidth={2.2} />
            ) : (
              <CircleOff size={22} strokeWidth={2.2} />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.02] text-white sm:text-[30px]">
              {title}
            </h3>
            <p className="mt-2 max-w-[42ch] text-[12px] leading-[1.38] text-[#ECFDF5] sm:text-[13px]">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-end text-right md:items-start md:pt-1">
          <div>
            <p
              className="text-[42px] leading-[0.9] text-white sm:text-[48px]"
              style={{ fontFamily: "var(--font-upakarti)" }}
            >
              {jumlah}
            </p>
            <p className="font-[Georgia,serif] text-[17px] font-bold leading-none text-white sm:text-[20px]">
              Orang
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/75">
              Tercatat
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
