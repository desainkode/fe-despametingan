'use client'

import type { TabButtonProps } from '../../types/infografis'

export function TabButton({ item, active, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(item.key)}
      aria-pressed={active}
      className={`inline-flex h-11 shrink-0 items-center justify-center rounded-2xl border px-5 text-[13px] font-semibold tracking-[0.01em] transform-gpu transition-[transform,box-shadow,border-color,background-color,color] duration-350 ease-[cubic-bezier(0.22,0.61,0.36,1)] md:h-12 md:px-6 md:text-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${active
          ? 'border-[#E7A900] bg-[#F0B100] text-[#0B281F] shadow-[0_10px_20px_rgba(240,177,0,0.3)] focus-visible:ring-[#F0B100]/60 focus-visible:ring-offset-transparent'
          : 'border-white/18 bg-white/10 text-[#E4F8EE] hover:-translate-y-0.5 hover:border-[#A4F4CF]/55 hover:bg-white/15 hover:text-white hover:shadow-[0_10px_18px_rgba(0,125,90,0.24)] focus-visible:-translate-y-0.5 focus-visible:border-[#A4F4CF]/55 focus-visible:bg-white/15 focus-visible:text-white focus-visible:shadow-[0_10px_18px_rgba(0,125,90,0.24)] focus-visible:ring-[#A4F4CF]/50 focus-visible:ring-offset-[#0B281F]'
        }`}
    >
      {item.label}
    </button>
  )
}
