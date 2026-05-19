import React from 'react'
import { LucideIcon, HandHelping, Package, Banknote, HeartHandshake } from 'lucide-react'
import { BansosIndicator } from '../../types/infografis'

const iconMap: Record<string, LucideIcon> = {
  'Total Penerima Bansos': HandHelping,
  'Jenis Bantuan': Package,
  'Total Anggaran Tahunan': Banknote,
  'Jumlah Program Bantuan': HeartHandshake,
}

interface BansosIndicatorCardProps {
  indicator: BansosIndicator
}

export function BansosIndicatorCard({ indicator }: BansosIndicatorCardProps) {
  const Icon = iconMap[indicator.label] || HandHelping
  const value = indicator.value
  const unit = indicator.unit || ''

  return (
    <article
      className={`${indicator.color} hero-reveal group relative isolate overflow-hidden rounded-tl-[24px] rounded-br-[24px] p-5 text-[#F3F8F6] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:rounded-tl-[28px] sm:rounded-br-[28px] flex flex-col justify-between min-h-[260px] sm:min-h-[280px]`}
      style={{ animationDelay: '120ms' }}
    >
      {/* 45-degree angle cuts */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-right-14 sm:-top-14 sm:h-28 sm:w-28" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-bottom-14 sm:-left-14 sm:h-28 sm:w-28" />

      {/* Top row: Icon */}
      <div className="relative z-10">
        <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-[#0B281F]/48 text-[#EAF7F1] shadow-[0_6px_14px_rgba(11,40,31,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 sm:h-11 sm:w-11">
          <Icon size={16} strokeWidth={2.1} className="size-[16px] sm:size-[18px]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-5 flex flex-col justify-between flex-1">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-[#009966] px-1.5 py-0.5 sm:mb-2.5 sm:px-2 sm:py-0.5 text-white">
            <span className="h-1 w-1 rounded-full bg-[#F0B100] sm:h-1.5 sm:w-1.5" />
            <span className="text-[9px] leading-none sm:text-[11px]" style={{ fontFamily: 'Georgia, serif' }}>
              {unit || 'Bantuan'}
            </span>
          </div>

          <p
            className="text-[22px] xs:text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-bold leading-none tracking-tight text-white"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {value}
          </p>

          <h3 className="mt-3 font-[Georgia,serif] text-[15px] font-bold leading-[1.15] sm:text-[18px] md:text-[20px] text-white">
            {indicator.label}
          </h3>
        </div>

        <p className="mt-4 text-[10px] leading-relaxed text-[#EAF7F1]/75 max-w-none">
          {indicator.description}
        </p>
      </div>
    </article>
  )
}
