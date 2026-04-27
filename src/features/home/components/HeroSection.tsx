'use client'

import Link from 'next/link'
import type { HeroSectionContent } from '../types'
import { heroImage, heroQuote } from '../config/home-content'

interface HeroSectionProps extends HeroSectionContent { }

export function HeroSection({
  badge,
  titleLines,
  description,
  cta,
  stats,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0B281F] pb-5 pt-6 text-[#F4F3EF] h-screen md:pb-0 md:pt-0">
      <div className="hero-float pointer-events-none absolute -right-28 -top-44 h-130 w-130 rounded-full bg-[#006045]/30 blur-[110px]" />
      <div className="hero-float pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#F0B100]/16 blur-[90px] [animation-delay:900ms]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 md:h-full md:items-center md:px-10 md:py-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-10">
        <div className="max-w-155 pt-0 md:pt-1">
          <div className="hero-reveal inline-flex items-center rounded-full border border-[#006045] bg-[#004F3B]/55 px-3 py-1">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#FDC700]/70" />
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-[#A4F4CF] md:text-[10px]">
              {badge}
            </span>
          </div>

          <h1
            className="hero-reveal mt-3 max-w-132 text-[40px] font-bold leading-[1.02] tracking-[0.052em] md:text-[56px] lg:text-[64px] [animation-delay:120ms]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="block">{titleLines[0]}</span>
            <span className="relative mt-2 block text-[#00D492]">
              {titleLines[1]}
              <span className="absolute -bottom-1 left-[34%] h-0.75 w-[44%] rounded-full bg-[#F0B100] md:h-1" />
            </span>
            <span className="mt-2 block">{titleLines[2]}</span>
          </h1>

          <p className="hero-reveal mt-3 max-w-140 text-[14px] font-light leading-relaxed text-[#A4F4CF]/80 md:text-[18px] md:leading-[1.625] [animation-delay:220ms]">
            {description}
          </p>

          <div className="hero-reveal mt-4 flex flex-wrap items-center gap-2.5 [animation-delay:320ms]">
            {cta.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                className={
                  button.variant === 'primary'
                    ? 'inline-flex h-9 items-center rounded-full bg-[#F0B100] px-4.5 text-[12px] font-bold text-[#0B281F] shadow-[0_8px_12px_rgba(240,177,0,0.18),0_3px_5px_rgba(240,177,0,0.14)] transition-transform duration-300 hover:-translate-y-0.5 md:h-10 md:px-5 md:text-[13px]'
                    : 'inline-flex h-9 items-center rounded-full border border-[#007A55] px-4.5 text-[12px] font-medium text-[#F4F3EF] transition-colors duration-300 hover:bg-[#007A55]/25 md:h-10 md:px-5 md:text-[13px]'
                }
              >
                {button.label}
                {button.icon && <span className="ml-2">→</span>}
              </Link>
            ))}
          </div>

          <div className="hero-reveal mt-5 grid grid-cols-1 gap-2.5 border-t border-[#006045]/55 pt-3 [animation-delay:420ms] sm:grid-cols-3 sm:gap-3">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <p 
                  className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#00D492]/70 md:text-[11px]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {stat.label}
                </p>
                <p 
                  className="mt-1 text-[22px] leading-tight md:text-[24px]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-reveal relative mx-auto w-full max-w-sm pt-2 [animation-delay:180ms] lg:pt-0">
          <div className="absolute -right-2 top-4 h-full w-full rotate-2 rounded-4xl bg-[#006045]/30" />
          <div className="absolute -left-3 -top-2 h-full w-full -rotate-2 rounded-4xl border border-[#007A55]/70" />

          <div className="relative h-88 overflow-hidden rounded-4xl bg-linear-to-b from-[#006045] to-[#0B281F] shadow-[0_18px_36px_-12px_rgba(0,0,0,0.25)] md:h-112">
            <img
              src={heroImage}
              alt="Kepala Desa"
              className="hero-zoom h-full w-full object-cover"
              loading="eager"
            />

            <div className="hero-pulse absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-black/35 p-2.5 shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] backdrop-blur-[2px] md:bottom-4 md:left-4 md:right-4 md:p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[13px] font-bold leading-5 md:text-sm">{heroQuote.name}</p>
                  <p className="mt-1 text-[10px] text-[#A4F4CF] md:text-[11px]">{heroQuote.role}</p>
                </div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F0B100] text-xs font-bold text-[#0B281F]">
                  &quot;
                </span>
              </div>
              <p className="mt-1.5 text-[10px] italic leading-4 text-[#D0FAE5]/80">
                &quot;{heroQuote.text}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
