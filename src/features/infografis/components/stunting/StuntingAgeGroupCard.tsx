import React from 'react'
import { User } from 'lucide-react'
import { StuntingPrevalenceData } from '../../types/infografis'

interface StuntingAgeGroupCardProps {
  data: StuntingPrevalenceData
}

export function StuntingAgeGroupCard({ data }: StuntingAgeGroupCardProps) {
  return (
    <article
      className="hero-reveal group relative overflow-hidden rounded-[24px] border border-white/10 bg-linear-to-b from-[#0B281F] to-[#004F3B] p-5.5 text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(0,0,0,0.18)] flex flex-col justify-between"
    >
      {/* Decorative hover glow */}
      <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/5 blur-xl transition-all duration-500 group-hover:bg-white/10 group-hover:scale-110" />

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/12 border border-white/15 text-white shadow-[0_4px_10px_rgba(0,0,0,0.04)] backdrop-blur-xs transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
            <User size={16} strokeWidth={2.2} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/85 truncate">
            {data.ageGroup}
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <span
            className="text-[26px] xs:text-[30px] sm:text-[36px] md:text-[40px] font-bold leading-none tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {data.count}
          </span>
          <p className="text-[10px] leading-relaxed text-white/60 max-w-[110px] text-right">
            {data.description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-linear-to-r from-[#00E0A1] to-[#00A371] rounded-full transition-all duration-500 group-hover:opacity-90"
            style={{ width: `${data.percentage ?? 75}%` }}
          />
        </div>
        
        <div className="flex items-center justify-start mt-0.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-[#F0B100]/25 bg-[#F0B100]/10 px-2.5 py-0.5 text-[9.5px] font-bold text-[#F0B100] tracking-wide uppercase transition-colors duration-300 group-hover:bg-[#F0B100]/15">
            Target : {data.targetPercentage}
          </span>
        </div>
      </div>
    </article>
  )
}
