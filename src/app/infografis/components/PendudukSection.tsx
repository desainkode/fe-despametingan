'use client'

import { sectionCardClass } from '../constants/styles'
import { SectionHeader } from './ui'
import { pendudukContent } from '../config/infografis-content'

// Icon components mapping
const iconMap: Record<string, React.ReactNode> = {}

interface DemografiCardData {
  label: string
  value: string
  unit: string
  icon: string
}

function DemografiCard({
  label,
  value,
  unit,
  delayMs,
}: DemografiCardData & { delayMs: number }) {
  return (
    <article
      className="hero-reveal relative h-75.5 w-62.5 shrink-0 transform-gpu transition-transform duration-300 ease-out hover:-translate-y-1"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <svg
        viewBox="0 0 288 347"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 17C0 7.61117 7.61116 0 17 0H182.991C196.74 0 206.049 17.9028 206.049 31.652C206.049 59.4921 228.588 82.0608 256.39 82.0608C270.113 82.0608 288 91.3484 288 105.071V330C288 339.389 280.389 347 271 347H17C7.61116 347 0 339.389 0 330V17Z"
          fill="#D9D9D9"
        />
      </svg>

      <div className="absolute left-[8%] top-[8.6%] h-[84.4%] w-[84.7%] rounded-[14px] border border-white/20 bg-linear-to-br from-white/24 via-white/13 to-white/8 backdrop-blur-[2px] shadow-[inset_0_10px_20px_rgba(255,255,255,0.16),inset_0_-10px_18px_rgba(0,0,0,0.14)]" />
      <div className="pointer-events-none absolute left-[13%] top-[13%] h-[21%] w-[60%] rounded-xl bg-linear-to-b from-white/26 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute bottom-[11%] right-[8%] h-[22%] w-[34%] rounded-full bg-[#6FF2C9]/12 blur-[14px]" />

      <div className="absolute left-[17%] top-[20.5%]">
        <div className="flex flex-col items-start justify-center gap-8" style={{ color: '#070C10' }}>
          <h3
            className="whitespace-pre-line text-[27px] font-bold leading-[1.12]"
            style={{ fontFamily: 'var(--font-upakarti)' }}
          >
            {label}
          </h3>

          <p
            className="text-[60px] leading-[0.9]"
            style={{ fontFamily: 'var(--font-upakarti)' }}
          >
            {value}
          </p>

          <p className="text-[13px] font-medium leading-tight text-[#0B281F]">
            {unit}
          </p>
        </div>
      </div>
    </article>
  )
}

export function PendudukSection() {
  return (
    <div className={sectionCardClass + ' bg-white'} id="penduduk">
      <SectionHeader
        title={pendudukContent.title}
        description={pendudukContent.description}
      />

      <div className="mt-7 overflow-x-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          className="mx-auto flex w-max min-w-full items-start justify-start xl:justify-center"
          style={{
            maxWidth: 1120,
            minHeight: 308,
            paddingTop: 4,
            paddingBottom: 4,
            gap: 65,
          }}
        >
          {pendudukContent.cards.map((item, idx) => (
            <DemografiCard
              key={`${item.label}-${idx}`}
              {...item}
              delayMs={300 + idx * 100}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
