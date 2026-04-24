'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { StrukturSectionContent } from '../types'
import { useStrukturPagination } from '../hooks/useStrukturPagination'

interface StrukturSectionProps extends StrukturSectionContent { }

export function StrukturSection({
  heading,
  description,
  ctaLink,
  ctaLabel,
  positions,
}: StrukturSectionProps) {
  const {
    strukturSliderRef,
    activeStrukturPage,
    strukturTotalPages,
    handleStrukturScroll,
    goToPrevStrukturPage,
    goToNextStrukturPage,
  } = useStrukturPagination()

  return (
    <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-12">
          <div className="hero-reveal flex flex-col gap-8 [animation-delay:220ms]">
            <div className="flex flex-col gap-4">
              <h2
                className="hero-reveal text-[32px] font-bold leading-tight text-[#0B281F] md:text-[42px] [animation-delay:240ms]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="block">{heading}</span>
              </h2>
              <p className="hero-reveal text-[13px] leading-6 text-[#0B281F]/80 md:text-[14px] [animation-delay:280ms]">
                {description}
              </p>
            </div>
            <Link
              href={ctaLink}
              className="hero-reveal inline-flex w-fit items-center gap-2 rounded-full bg-[#F0B100] px-6 py-2.5 text-[12px] font-bold text-[#0B281F] shadow-[0_10px_15px_rgba(240,177,0,0.2),0_4px_6px_rgba(240,177,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_24px_rgba(240,177,0,0.5)] [animation-delay:320ms] md:text-[13px]"
            >
              {ctaLabel}
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="flex flex-col">
            <div
              ref={strukturSliderRef}
              onScroll={handleStrukturScroll}
              className="hero-reveal relative -mb-2 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overflow-y-visible px-4 pb-10 pt-6 [animation-delay:300ms] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
            >
              {positions.map((item) => (
                <div
                  key={item.nama}
                  className="hero-reveal flex shrink-0 snap-start flex-col items-center"
                  style={{ animationDelay: `${item.delay}ms` }}
                >
                  <div
                    className={`group relative h-72 ${item.widthClass} ${item.hoverWidthClass} origin-center overflow-visible rounded-3xl transition-[width,transform] duration-400 will-change-transform sm:h-80 md:h-90 lg:h-90`}
                  >
                    <div className="absolute inset-0 rounded-3xl border border-[#D4FBEA]/25 bg-linear-to-b from-[#004F3B] to-[#006548] shadow-lg transition-shadow duration-500 ease-out group-hover:shadow-2xl" />
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="absolute inset-0 z-10 h-full w-full rounded-3xl object-cover transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 z-20 rounded-3xl bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 z-30 flex min-h-18 w-full flex-col items-center justify-end px-3 pb-4 text-center text-white">
                      <p
                        className="text-xl font-bold md:text-2xl"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {item.jabatan}
                      </p>
                      <p className="text-sm font-medium text-[#D4FBEA] md:text-base">
                        {item.nama}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {strukturTotalPages > 1 && (
              <div className="flex items-center justify-between px-4">
                <button
                  type="button"
                  onClick={goToPrevStrukturPage}
                  disabled={activeStrukturPage === 0}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0B281F]/20 bg-[#0B281F]/5 text-[#0B281F] transition-all duration-300 disabled:opacity-50 hover:enabled:bg-[#0B281F]/10"
                  aria-label="Previous slide"
                >
                  ←
                </button>

                <div className="flex gap-1.5">
                  {Array.from({ length: strukturTotalPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        const page = i
                        const slider = strukturSliderRef.current
                        if (slider) {
                          const maxScroll =
                            slider.scrollWidth - slider.clientWidth
                          const divisor = Math.max(
                            1,
                            strukturTotalPages - 1,
                          )
                          const targetLeft = (page / divisor) * maxScroll
                          slider.scrollTo({
                            left: targetLeft,
                            behavior: 'smooth',
                          })
                        }
                      }}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${i === activeStrukturPage
                          ? 'w-8 bg-[#0B281F]'
                          : 'bg-[#0B281F]/30 hover:bg-[#0B281F]/50'
                        }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goToNextStrukturPage}
                  disabled={activeStrukturPage === strukturTotalPages - 1}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0B281F]/20 bg-[#0B281F]/5 text-[#0B281F] transition-all duration-300 disabled:opacity-50 hover:enabled:bg-[#0B281F]/10"
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
