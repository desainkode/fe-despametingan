'use client'

import { Info } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  description: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6 grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
      <h2
        className="text-[28px] font-bold leading-[1.08] tracking-[0.02em] text-[#0B281F] md:text-[34px]"
        style={{ fontFamily: 'var(--font-upakarti)' }}
      >
        {title}
      </h2>

      <p className="max-w-none pt-0.5 text-[13px] leading-6 text-[#0B281F]/78 md:text-[14px] md:leading-7">
        {description}
      </p>

      <button
        type="button"
        aria-label={`Informasi ${title}`}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full bg-[#004F3B] text-[#F4F3EF] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:h-12 md:w-12"
      >
        <Info size={20} strokeWidth={2.5} />
      </button>
    </div>
  )
}
