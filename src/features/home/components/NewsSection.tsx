'use client'

import type { NewsSectionContent } from '../types'
import { NewsCard } from './ui/NewsCard'

interface NewsSectionProps extends NewsSectionContent { }

export function NewsSection({
  heading,
  description,
  cards,
}: NewsSectionProps) {
  return (
    <section className="bg-[#FFFFFF] px-4 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 ">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:gap-10 ">
        <div className="mb-8 flex flex-col gap-6 border-b border-[#0B281F]/10 pb-8 md:mb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <h2
            className="hero-reveal max-w-99 text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px] [animation-delay:80ms]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="block">{heading.split(' ').slice(0, 2).join(' ')}</span>
            <span className="block">{heading.split(' ').slice(2).join(' ')}</span>
          </h2>

          <p className="hero-reveal max-w-147 pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7 lg:pt-1 [animation-delay:150ms]">
            {description}
          </p>

          <button
            type="button"
            aria-label="Lihat informasi terkini"
            className="hero-reveal inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-[#F4F3EF] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg [animation-delay:180ms] md:h-12 md:w-12"
          >
            →
          </button>
        </div>

        <div className="grid justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-8">
          {cards.map((card, i) => (
            <div
              key={`${card.title}-${i}`}
              className="hero-reveal w-full max-w-[288px]"
              style={{ animationDelay: `${220 + i * 70}ms` }}
            >
              <NewsCard {...card} delay={0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
