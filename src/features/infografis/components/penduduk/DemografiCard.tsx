"use client";

import React from "react";

interface DemografiCardProps {
  label: string;
  angka: string;
  bgColor: string;
  textColor: string;
  labelColor: string;
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  delayMs: number;
}

export function DemografiCard({
  label,
  angka,
  bgColor,
  textColor,
  labelColor,
  icon: Icon,
  delayMs,
}: DemografiCardProps) {
  return (
    <article
      className="hero-reveal group relative aspect-[288/347] w-full shrink-0 transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(0,0,0,0.18)]"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <svg
        viewBox="0 0 288 347"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path
          d="M0 17C0 7.61117 7.61116 0 17 0H182.991C196.74 0 206.049 17.9028 206.049 31.652C206.049 59.4921 228.588 82.0608 256.39 82.0608C270.113 82.0608 288 91.3484 288 105.071V330C288 339.389 280.389 347 271 347H17C7.61116 347 0 339.389 0 330V17Z"
          fill={bgColor}
        />
      </svg>

      <div className="absolute left-[8%] top-[8.6%] h-[84.4%] w-[84.7%] rounded-[10px] border border-white/20 bg-linear-to-br from-white/24 via-white/13 to-white/8 backdrop-blur-[2px] shadow-[inset_0_10px_20px_rgba(255,255,255,0.16),inset_0_-10px_18px_rgba(0,0,0,0.14)] sm:rounded-[14px]" />
      <div className="pointer-events-none absolute left-[13%] top-[13%] h-[21%] w-[60%] rounded-xl bg-linear-to-b from-white/26 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute bottom-[11%] right-[8%] h-[22%] w-[34%] rounded-full bg-[#6FF2C9]/12 blur-[14px]" />

      <div className="absolute left-[17%] top-[20.5%] w-[70%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
        <div className="flex flex-col items-start justify-center gap-4 sm:gap-8" style={{ color: textColor }}>
          <h3
            className="whitespace-pre-line font-[Georgia,serif] text-[13px] font-bold leading-[1.2] sm:text-[19px]"
            style={{ color: labelColor }}
          >
            {label}
          </h3>

          <p
            className="text-[40px] leading-[0.9] sm:text-[60px]"
            style={{ fontFamily: "var(--font-upakarti)" }}
          >
            {angka}
          </p>
        </div>
      </div>

      <div className="absolute left-[72%] top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-rotate-3 sm:h-14.5 sm:w-14.5">
        <Icon size={16} strokeWidth={2.2} className="sm:size-21" />
      </div>
    </article>
  );
}
