'use client'

import type { DemografiSectionContent } from '../types'
import { demografiImage, demografiIcon } from '../config/home-content'
import { StatCard } from './ui/StatCard'

interface DemografiSectionProps extends DemografiSectionContent { }

export function DemografiSection({
  heading,
  description,
  stats,
}: DemografiSectionProps) {
  return (
    <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
      <div className="relative mx-auto h-80 w-full max-w-7xl overflow-hidden rounded-4xl border border-[#007A55]/40 md:h-96 lg:h-105">
        <img
          src={demografiImage}
          alt="Latar demografi"
          className="animate-demografi-wave h-full w-full object-cover"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/45 via-transparent to-black/25" />

        <div className="absolute inset-0 flex flex-col justify-center gap-5 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-8">
          <div className="hero-reveal w-full max-w-76 rounded-3xl border border-[#007A55]/35 bg-[#0B281F]/92 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)] [animation-delay:120ms] md:p-5 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="hero-float inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0B100] [animation-duration:6s]">
                <img
                  src={demografiIcon}
                  alt="Ikon data"
                  className="h-6 w-6 object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#A4F4CF] md:text-xs">
                Data Terkini 2024
              </p>
            </div>

            <h2
              className="mt-3 text-[24px] font-bold leading-[1.03] tracking-[0.01em] text-white md:text-[28px]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {heading}
              <br />
            </h2>

            <p className="mt-2.5 max-w-56 text-[11px] leading-5 text-[#A4F4CF]/75 md:text-[13px] md:leading-6">
              {description}
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-5 lg:max-w-132 lg:gap-7">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                {...stat}
                delay={260 + index * 120}
                className={
                  index > 0 ? 'sm:border-l sm:border-[#5EE9B5]/20 sm:pl-4 lg:pl-5' : ''
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
