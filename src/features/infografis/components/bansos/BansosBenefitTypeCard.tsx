import React from 'react'
import { Users } from 'lucide-react'
import { BansosBenefitType } from '../../types/infografis'

interface BansosBenefitTypeCardProps {
  type: BansosBenefitType
}

export function BansosBenefitTypeCard({ type }: BansosBenefitTypeCardProps) {
  return (
    <article
      className="hero-reveal group relative overflow-hidden rounded-[24px] border border-[#0B281F]/8 bg-[#0b281f]/[0.02] p-5.5 shadow-[0_12px_24px_rgba(0,0,0,0.03)] backdrop-blur-xs transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#009966]/25 hover:bg-[#0b281f]/[0.04] hover:shadow-[0_20px_38px_rgba(11,40,31,0.06)] flex flex-col justify-between h-56"
    >
      {/* Soft Hover Spotlight */}
      <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[#009966]/5 blur-xl transition-all duration-500 group-hover:bg-[#009966]/10 group-hover:scale-110" />

      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#009966]/10 text-[#009966] transition-transform duration-500 group-hover:scale-105">
            <Users size={16} strokeWidth={2.2} />
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#009966]/20 bg-[#009966]/5 px-2.5 py-0.5 text-[9.5px] font-bold text-[#009966] tracking-wide uppercase">
            Orang
          </span>
        </div>

        <h3 className="font-[Georgia,serif] text-[18px] font-bold leading-tight text-[#0B281F] sm:text-[20px] transition-colors duration-300 group-hover:text-[#009966]">
          {type.name}
        </h3>
      </div>

      <div className="flex flex-col gap-1 mt-auto">
        <span 
          className="text-[32px] sm:text-[38px] font-bold text-[#0B281F] font-[Georgia,serif] leading-none"
        >
          {type.count}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/40">
          TOTAL PENERIMA
        </span>
      </div>
    </article>
  )
}
