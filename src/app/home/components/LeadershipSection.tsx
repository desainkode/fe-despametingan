'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LeadershipSectionContent } from '../types'
import { leadershipImage } from '../config/home-content'
import { SectionHeader } from './ui/SectionHeader'

interface LeadershipSectionProps extends LeadershipSectionContent { }

export function LeadershipSection({
  heading,
  description,
  name,
  bio,
  ctaLink,
  ctaLabel,
}: LeadershipSectionProps) {
  return (
    <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          title={heading.split(' ')}
          description={description}
          showInfoButton
        />

        <div className="hero-reveal relative overflow-visible rounded-3xl bg-[#006548] px-6 py-7 text-[#F4F3EF] shadow-[0_14px_28px_rgba(0,0,0,0.18)] [animation-delay:220ms] sm:px-7 sm:py-8 md:px-8 lg:px-8 lg:py-0">
          <div className="grid items-end gap-6 lg:min-h-90 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8">
            <div className="hero-reveal max-w-xl pb-0 [animation-delay:300ms] lg:pb-10">
              <p className="hero-reveal text-[14px] font-semibold text-[#D4FBEA] [animation-delay:320ms]">
                Kepala Desa
              </p>
              <h3
                className="hero-reveal mt-2 text-[42px] font-bold leading-[1.08] tracking-[0.052em] md:text-[56px] lg:text-[66px] [animation-delay:360ms]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {name}
              </h3>
              <p className="hero-reveal mt-4 text-[13px] leading-7 text-[#F4F3EF]/92 [animation-delay:400ms]">
                {bio}
              </p>

              <Link
                href={ctaLink}
                className="hero-reveal mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#F0B100] px-6 py-2.5 text-[13px] font-bold text-[#0B281F] shadow-[0_10px_20px_rgba(240,177,0,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_24px_rgba(240,177,0,0.5)] [animation-delay:460ms]"
              >
                {ctaLabel}
                <ArrowRight size={17} strokeWidth={2.5} />
              </Link>
            </div>

            <div className="hero-reveal relative mx-auto h-72 w-full max-w-xs transition-all duration-300 hover:-translate-y-3 hover:scale-105 [animation-delay:300ms] sm:h-80 sm:max-w-sm md:h-90 md:max-w-md lg:h-full lg:max-w-none">
              <img
                src={leadershipImage}
                alt="Foto Kepala Desa"
                className="absolute -bottom-8 -right-6 z-10 h-[116%] w-auto max-w-none object-contain sm:-right-4 lg:-right-12 lg:-top-12 lg:bottom-auto lg:h-[114%]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
