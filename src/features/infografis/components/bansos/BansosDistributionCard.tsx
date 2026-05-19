import React from 'react'
import { User } from 'lucide-react'
import { BansosDistributionData } from '../../types/infografis'

interface BansosDistributionCardProps {
  data: BansosDistributionData
}

export function BansosDistributionCard({ data }: BansosDistributionCardProps) {
  return (
    <article
      className="hero-reveal group relative overflow-hidden rounded-[24px] border border-white/10 bg-linear-to-b from-[#0B281F] to-[#004F3B] p-5.5 text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(0,0,0,0.18)] flex flex-col justify-between h-56 w-[240px] xs:w-[260px] sm:w-full shrink-0 snap-center"
    >
      {/* Spotlight Effect */}
      <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/5 blur-xl transition-all duration-500 group-hover:bg-white/10 group-hover:scale-110" />

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/12 border border-white/15 text-white shadow-[0_4px_10px_rgba(0,0,0,0.04)] backdrop-blur-xs transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
            <User size={16} strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/50">Dusun</span>
            <span className="text-[14px] sm:text-[15px] font-bold leading-tight font-[Georgia,serif] text-white">
              {data.dusun}
            </span>
          </div>
        </div>

        <p className="text-[10px] leading-relaxed text-white/70 line-clamp-2">
          {data.alokasi}
        </p>
      </div>

      <div className="flex justify-between items-end mt-4">
        <span className="inline-flex items-center gap-1 rounded-full border border-[#F0B100]/25 bg-[#F0B100]/10 px-2 py-0.5 text-[9px] font-bold text-[#F0B100] tracking-wide uppercase transition-colors duration-300 group-hover:bg-[#F0B100]/15">
          Penerima
        </span>
        <div className="flex items-baseline gap-0.5">
          <span 
            className="text-[28px] sm:text-[32px] font-bold leading-none text-white" 
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {data.keluarga.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] font-bold text-white/70 font-[Georgia,serif] ml-0.5">Orang</span>
        </div>
      </div>
    </article>
  )
}
