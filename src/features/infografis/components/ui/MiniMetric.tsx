'use client'

import {
  Activity,
  ArrowDownRight,
  Target,
  UserRound,
  type LucideIcon,
} from 'lucide-react'

interface MiniMetricProps {
  label: string
  value: string
  description?: string
  index?: number
}

const cardBackgrounds = [
  'bg-[linear-gradient(240.32deg,#081713_2.66%,#165D4A_49.79%,#081713_97.84%)]',
  'bg-[#006045]',
  'bg-[#009966]',
  'bg-[#F0B100]',
]

function getIconByLabel(label: string): LucideIcon {
  const keyword = label.toLowerCase()

  if (keyword.includes('risiko') || keyword.includes('stunting')) {
    return ArrowDownRight
  }

  if (keyword.includes('intervensi') || keyword.includes('target')) {
    return Target
  }

  if (keyword.includes('prevalensi')) {
    return Activity
  }

  return UserRound
}

export function MiniMetric({ label, description, value, index = 0 }: MiniMetricProps) {
  const Icon = getIconByLabel(label)
  const cardBg = cardBackgrounds[index] ?? cardBackgrounds[0]

  return (
    <div className={`${cardBg} min-h-34.5 rounded-[20px] px-5.5 py-5.5 text-white`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-7.5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[24px] border border-white/15 bg-white/10 shadow-[inset_3.2px_-3.2px_3.2px_rgba(165,165,165,0.1),inset_-3.2px_3.2px_3.2px_rgba(255,255,255,0.1)] backdrop-blur-[3.2px]">
              <Icon className="h-6 w-6" strokeWidth={2} />
            </div>

            <p
              className="font-timeless text-[20px] leading-[1.12] text-[#FEFEFE]"
              style={{ fontFamily: 'Timeless, var(--font-upakarti), Georgia, serif' }}
            >
              {label}
            </p>
          </div>

          <p className="max-w-39.5 text-[12px] leading-normal text-white">
            {description}
          </p>
        </div>

        <p
          className="shrink-0 text-right text-[44px] leading-none text-[#FEFEFE] md:text-[55px]"
          style={{ fontFamily: 'var(--font-upakarti)' }}
        >
          {value}
        </p>
      </div>
    </div>
  )
}
