'use client'

import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import type { APBDesSectionContent } from '../types'
import { useAPBDesYear } from '../hooks/useAPBDesYear'
import { SectionHeader } from './ui/SectionHeader'

interface APBDesSectionProps extends APBDesSectionContent { }

export function APBDesSection({
  heading,
  description,
  years,
  statistics,
}: APBDesSectionProps) {
  const { selectedYear, setSelectedYear } = useAPBDesYear()

  return (
    <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          title={heading.split(' Dan ')}
          description={description}
          showInfoButton
        />

        <div className="hero-reveal rounded-3xl bg-[#006548] p-6 text-[#F4F3EF] shadow-[0_14px_28px_rgba(0,0,0,0.18)] [animation-delay:200ms] sm:p-7 md:p-8 lg:p-9">
          {/* Title & Year Selector */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-6">
            <h3
              className="hero-reveal text-[28px] font-bold leading-tight [animation-delay:260ms] md:text-[34px]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              APBDes Tahun {selectedYear}
            </h3>

            <label className="hero-reveal relative inline-flex items-center [animation-delay:320ms]">
              <span className="sr-only">Pilih tahun APBDes</span>
              <select
                aria-label="Pilih tahun APBDes"
                value={selectedYear}
                onChange={(event) => setSelectedYear(Number(event.target.value))}
                className="min-w-39 appearance-none rounded-full bg-[#E8ECE9] px-5 py-2.5 pr-11 text-[12px] font-semibold text-[#20332F] shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_11px_20px_rgba(0,0,0,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4F4CF] md:text-[13px]"
              >
                {years.map((year) => (
                  <option key={year.year} value={year.year}>
                    Tahun {year.year}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                strokeWidth={2.5}
                className="pointer-events-none absolute right-4 text-[#20332F]"
              />
            </label>
          </div>

          {/* Content */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)] lg:items-center lg:gap-8">
            {/* Glass Statistics */}
            <div className="relative">
              <div className="pointer-events-none absolute left-8 right-8 top-1/2 hidden h-10 -translate-y-1/2 rounded-full bg-white/10 blur-xl md:block" />

              <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                {statistics.map((item, index) => (
                  <div
                    key={item.label}
                    className={`hero-reveal relative flex h-40 flex-1 flex-col items-center justify-center rounded-full border border-white/22 bg-white/20 px-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_24px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-all duration-300 will-change-transform hover:z-20 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_18px_30px_rgba(0,0,0,0.24)] md:h-44 ${index > 0 ? 'md:-ml-5' : ''
                      }`}
                    style={{ animationDelay: `${420 + index * 120}ms` }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#F4F3EF]/82">
                      Rp.
                    </p>
                    <p className="mt-1 text-[38px] font-bold leading-none md:text-[42px]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-[13px] font-semibold leading-[1.2] text-[#F4F3EF]/95 md:text-[14px]">
                      {item.label.replace('Total ', '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description & Button */}
            <div className="flex flex-col items-start gap-5 lg:pl-2">
              <p className="hero-reveal max-w-80 text-[12px] leading-6 text-[#F4F3EF]/92 [animation-delay:560ms] md:text-[13px] md:leading-7">
                Pencatatan dan pengelolaan Anggaran Pendapatan dan Belanja
                Desa (APBDes) untuk periode Januari {selectedYear}
                hingga Desember {selectedYear}, desa selama satu tahun
                anggaran berjalan.
              </p>

              <Link
                href="/apbdes"
                className="hero-reveal inline-flex w-fit items-center gap-2 rounded-full bg-[#F0B100] px-6 py-2.5 text-[12px] font-bold text-[#0B281F] shadow-[0_10px_20px_rgba(240,177,0,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_24px_rgba(240,177,0,0.5)] [animation-delay:660ms] md:px-7 md:py-3 md:text-[13px]"
              >
                Lihat Selengkapnya
                <ArrowRight size={17} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
