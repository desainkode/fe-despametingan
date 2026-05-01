'use client'

import { Info } from 'lucide-react'

interface SectionHeaderProps {
  title: string | string[]
  description: string
  showInfoButton?: boolean
  delay?: number
}

export function SectionHeader({
  title,
  description,
  showInfoButton = false,
  delay = 0,
}: SectionHeaderProps) {
  const titleLines = Array.isArray(title) ? title : [title]

  return (
    <div
      className="mb-6 border-b border-[#0B281F]/10 pb-6 md:mb-8 md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4 md:contents">
        <h2 className="hero-reveal font-upakarti text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        {showInfoButton && (
          <button
            type="button"
            aria-label="Informasi"
            className="hero-reveal inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-[#F4F3EF] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg [animation-delay:180ms] md:order-last md:h-12 md:w-12"
          >
            <Info size={20} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <p className="hero-reveal mt-4 max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:mt-0 md:text-[13px] md:leading-7 [animation-delay:120ms]">
        {description}
      </p>
    </div>
  )
}
