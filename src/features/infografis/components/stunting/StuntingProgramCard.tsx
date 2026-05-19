import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { StuntingProgramData } from '../../types/infografis'

interface StuntingProgramCardProps {
  program: StuntingProgramData
}

export function StuntingProgramCard({ program }: StuntingProgramCardProps) {
  return (
    <article
      className="hero-reveal group relative overflow-hidden rounded-[24px] border border-[#0B281F]/8 bg-[#0b281f]/[0.02] p-5.5 shadow-[0_12px_24px_rgba(0,0,0,0.03)] backdrop-blur-xs transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#009966]/25 hover:bg-[#0b281f]/[0.04] hover:shadow-[0_20px_38px_rgba(11,40,31,0.06)] flex flex-col justify-between h-full"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-[Georgia,serif] text-[17px] font-bold leading-tight text-[#0B281F] sm:text-[19px] max-w-[170px]">
          {program.name}
        </h3>
        <div className="inline-flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-[#009966]/10 text-[#009966] transition-transform duration-500 group-hover:scale-105">
          <CheckCircle2 size={18} strokeWidth={2.4} />
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <p className="text-[11.5px] leading-relaxed text-[#0B281F]/70 max-w-[150px]">
          {program.description}
        </p>
        <div className="text-right shrink-0">
          <div className="flex items-baseline justify-end">
            <span 
              className="text-[32px] font-bold text-[#0B281F] sm:text-[38px] md:text-[42px] leading-none" 
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {program.coverage}
            </span>
            <span className="text-[16px] font-bold text-[#0B281F] sm:text-[20px] ml-0.5">%</span>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/40 mt-1">
            Cakupan
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-2.5">
        <p className="text-[10px] font-bold text-[#004F3B]/80">
          {program.target}
        </p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0B281F]/8">
          <div
            className="h-full bg-linear-to-r from-[#00D492] to-[#00A371] rounded-full transition-all duration-500 group-hover:opacity-90"
            style={{ width: `${program.coverage}%` }}
          />
        </div>
      </div>
    </article>
  )
}
