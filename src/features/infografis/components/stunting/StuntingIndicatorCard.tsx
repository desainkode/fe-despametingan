import { LucideIcon, User, TrendingDown, Activity, Target } from 'lucide-react'
import { StuntingIndicator } from '../../types/infografis'

const iconMap: Record<string, LucideIcon> = {
  User: User,
  TrendingDown: TrendingDown,
  Activity: Activity,
  Target: Target,
}

interface StuntingIndicatorCardProps {
  indicator: StuntingIndicator
}

export function StuntingIndicatorCard({ indicator }: StuntingIndicatorCardProps) {
  const Icon = indicator.icon ? iconMap[indicator.icon] : Activity
  const isYellow = (indicator.color || '').includes('yellow') || (indicator.color || '').includes('F0B100')
  const value = indicator.value

  // Map label to unit dynamically
  let unit = 'Jiwa'
  if (indicator.label.includes('Prevalensi') || indicator.label.includes('Target')) {
    unit = '%'
  } else if (indicator.label.includes('Anak')) {
    unit = 'Anak'
  }

  return (
    <article
      className={`${indicator.color || 'bg-linear-to-br from-[#0B281F] to-[#006045]'} hero-reveal group relative isolate overflow-hidden rounded-tl-[24px] rounded-br-[24px] p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:rounded-tl-[28px] sm:rounded-br-[28px] flex flex-col justify-between min-h-[260px] sm:min-h-[280px]`}
      style={{ animationDelay: '100ms' }}
    >
      {/* 45-degree angle cuts */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-right-14 sm:-top-14 sm:h-28 sm:w-28" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-bottom-14 sm:-left-14 sm:h-28 sm:w-28" />

      {/* Top row: Icon */}
      <div className="relative z-10">
        <div
          className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-[0_6px_14px_rgba(11,40,31,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 sm:h-11 sm:w-11 ${
            isYellow
              ? 'border-[#0B281F]/8 bg-white/42 text-[#0B281F]'
              : 'border-white/18 bg-[#0B281F]/48 text-[#EAF7F1]'
          }`}
        >
          <Icon size={16} strokeWidth={2.1} className="size-[16px] sm:size-[18px]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-5 flex flex-col justify-between flex-1">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-[#009966] px-1.5 py-0.5 sm:mb-2.5 sm:px-2 sm:py-0.5 text-white">
            <span className="h-1 w-1 rounded-full bg-[#F0B100] sm:h-1.5 sm:w-1.5" />
            <span className="text-[9px] leading-none sm:text-[11px]" style={{ fontFamily: 'Georgia, serif' }}>
              {unit}
            </span>
          </div>

          <p
            className={`text-[28px] font-bold leading-none tracking-tight sm:text-[34px] md:text-[38px] ${
              isYellow ? 'text-[#0B281F]' : 'text-white'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {value}
          </p>

          <h3
            className={`mt-3 font-[Georgia,serif] text-[15px] font-bold leading-[1.15] sm:text-[18px] md:text-[20px] ${
              isYellow ? 'text-[#0B281F]' : 'text-white'
            }`}
          >
            {indicator.label}
          </h3>
        </div>

        <p
          className={`mt-4 text-[10px] leading-relaxed max-w-none ${
            isYellow ? 'text-[#0B281F]/75' : 'text-[#EAF7F1]/75'
          }`}
        >
          {indicator.description}
        </p>
      </div>
    </article>
  )
}
