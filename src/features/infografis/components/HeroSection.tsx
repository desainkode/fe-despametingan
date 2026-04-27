'use client'

import type { InfografisKey } from '../types/infografis'
import { heroContentByFeature, infografisTabs } from '../config/infografis-content'
import { TabButton } from './ui/TabButton'

const kepalaDesaImage =
  'img/unsplash_tB5ZZtHZ_tI.png'

interface HeroSectionProps {
  activeTab: InfografisKey
  onChangeTab: (key: InfografisKey) => void
}

export function HeroSection({ activeTab, onChangeTab }: HeroSectionProps) {
  const hero = heroContentByFeature[activeTab]

  return (
    <section className="relative overflow-hidden bg-transparent pt-6 text-[#F4F3EF] md:pt-14">
      <div className="hero-float pointer-events-none absolute -right-28 -top-44 h-130 w-130 rounded-full bg-[#006045]/30 blur-[110px]" />
      <div className="hero-float pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#F0B100]/16 blur-[90px] [animation-delay:900ms]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 md:h-full md:items-center md:px-10 md:py-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-10">
        <div className="max-w-155 pt-0 md:pt-1">
          <div className="hero-reveal inline-flex items-center rounded-full border border-[#006045] bg-[#004F3B]/55 px-3 py-1">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#FDC700]/70" />
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-[#A4F4CF] md:text-[10px]">
              {hero.eyebrow}
            </span>
          </div>

          <h1
            className="hero-reveal mt-3 max-w-132 text-[40px] font-bold leading-[1.02] tracking-[0.052em] md:text-[56px] lg:text-[64px] [animation-delay:120ms]"
            style={{ fontFamily: 'var(--font-upakarti)' }}
          >
            <span className="block">{hero.titleLines[0]}</span>
            <span className="relative mt-2 block text-[#00D492]">
              {hero.titleLines[1]}
              <span className="absolute -bottom-1 left-[34%] h-0.75 w-[44%] rounded-full bg-[#F0B100] md:h-1" />
            </span>
            <span className="mt-2 block">{hero.titleLines[2]}</span>
          </h1>

          <p className="hero-reveal mt-3 max-w-140 text-[11px] font-light leading-5 text-[#A4F4CF]/80 md:text-[13px] md:leading-6 [animation-delay:220ms]">
            {hero.description}
          </p>
        </div>

        <div className="hero-reveal relative mx-auto w-full max-w-sm pt-2 [animation-delay:180ms] lg:pt-0">
          <div className="absolute -right-2 top-4 h-full w-full rotate-2 rounded-4xl bg-[#006045]/30" />
          <div className="absolute -left-3 -top-2 h-full w-full -rotate-2 rounded-4xl border border-[#007A55]/70" />

          <div className="relative h-88 overflow-hidden rounded-4xl bg-linear-to-b from-[#006045] to-[#0B281F] shadow-[0_18px_36px_-12px_rgba(0,0,0,0.25)] md:h-112">
            <img
              src={kepalaDesaImage}
              alt="Kepala Desa"
              className="hero-zoom h-full w-full object-cover"
              loading="eager"
            />

            <div className="hero-pulse absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-black/35 p-2.5 shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] backdrop-blur-[2px] md:bottom-4 md:left-4 md:right-4 md:p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[13px] font-bold leading-5 md:text-sm">
                    {hero.quoteName}
                  </p>
                  <p className="mt-1 text-[10px] text-[#A4F4CF] md:text-[11px]">
                    {hero.quoteRole}
                  </p>
                </div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F0B100] text-xs font-bold text-[#0B281F]">
                  &quot;
                </span>
              </div>
              <p className="mt-1.5 text-[10px] italic leading-4 text-[#D0FAE5]/80">
                &quot;{hero.quoteText}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="feature-tabs"
        className="relative mx-auto mt-8 w-full max-w-7xl px-4 md:mt-12 md:px-10 lg:px-12"
      >
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max min-w-full items-end justify-center gap-1 md:gap-2 transition-all duration-300">
            {infografisTabs.map((item) => (
              <TabButton
                key={item.key}
                item={item}
                active={activeTab === item.key}
                onClick={onChangeTab}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
