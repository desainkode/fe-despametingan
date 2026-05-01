'use client'

import { Info } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  description: string
  variant?: 'light' | 'dark'
}

export function SectionHeader({ title, description, variant = 'light' }: SectionHeaderProps) {
  const isDark = variant === 'dark'
  
  return (
    <div className={`relative mb-6 flex flex-col gap-4 border-b pb-6 pr-14 md:flex-row md:items-start md:gap-8 md:pr-16 ${
      isDark ? 'border-white/10' : 'border-[#0B281F]/10'
    }`}>
      <h2
        className={`text-[28px] font-bold leading-[1.08] tracking-[0.02em] md:text-[34px] ${
          isDark ? 'text-[#F4F3EF]' : 'text-[#0B281F]'
        }`}
        style={{ fontFamily: 'var(--font-upakarti)' }}
      >
        {title}
      </h2>

      <p className={`max-w-none pt-0.5 text-[13px] leading-6 md:text-[14px] md:leading-7 ${
        isDark ? 'text-[#F4F3EF]/78' : 'text-[#0B281F]/78'
      }`}>
        {description}
      </p>

      <button
        type="button"
        aria-label={`Informasi ${title}`}
        className={`absolute right-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:h-12 md:w-12 ${
          isDark ? 'bg-white/10 text-white backdrop-blur-sm' : 'bg-[#0B281F] text-[#F4F3EF]'
        }`}
      >
        <Info size={20} strokeWidth={2.5} />
      </button>
    </div>
  )
}
