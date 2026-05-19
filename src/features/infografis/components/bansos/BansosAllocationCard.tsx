import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { BansosAllocation } from '../../types/infografis'

interface BansosAllocationCardProps {
  summary: BansosAllocation
}

export function BansosAllocationCard({ summary }: BansosAllocationCardProps) {
  return (
    <article
      className="hero-reveal group relative isolate overflow-hidden rounded-tl-[24px] rounded-br-[24px] p-5 text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:rounded-tl-[28px] sm:rounded-br-[28px] flex flex-col sm:flex-row gap-4 h-auto min-h-[260px] sm:h-52 bg-linear-to-br from-[#0B281F] via-[#004F3B] to-[#003828]"
    >
      {/* 45-degree angle cuts */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-right-14 sm:-top-14 sm:h-28 sm:w-28" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-bottom-14 sm:-left-14 sm:h-28 sm:w-28" />

      {/* Left Content */}
      <div className="flex flex-col justify-between flex-1 relative z-10">
        <div className="space-y-1.5 pt-1">
          <h3 className="font-[Georgia,serif] text-[14px] font-bold leading-snug sm:text-[17px] text-white">
            {summary.label}
          </h3>
          <p className="text-[9.5px] leading-relaxed text-[#EAF7F1]/75 max-w-none sm:max-w-[200px]">
            {summary.description}
          </p>
        </div>
        
        <div className="inline-flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white shadow-[0_4px_10px_rgba(0,0,0,0.04)] backdrop-blur-xs transition-all duration-500 group-hover:scale-105 group-hover:rotate-45 mt-4 sm:mt-0">
          <ArrowUpRight size={16} strokeWidth={2.4} />
        </div>
      </div>

      {/* Right Content (Number Box) */}
      <div className="w-full sm:w-1/2 h-28 sm:h-full bg-black/25 rounded-tl-[18px] rounded-br-[18px] flex flex-col items-center justify-center backdrop-blur-md border border-white/8 relative z-10 p-3">
        <div className="flex flex-col items-center justify-center text-center w-full">
          <div className="mb-2 inline-flex items-center gap-1 rounded-md bg-[#009966] px-1.5 py-0.5 text-white">
            <span className="h-1 w-1 rounded-full bg-[#F0B100]" />
            <span className="text-[9px] leading-none uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              {summary.unit || 'INFO'}
            </span>
          </div>
          <span 
            className="text-[26px] sm:text-[30px] md:text-[34px] font-bold leading-none tracking-tight text-white mt-1" 
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {summary.value}
          </span>
        </div>
      </div>
    </article>
  )
}
