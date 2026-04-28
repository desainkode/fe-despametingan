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

  return (
    <div
      className={`${indicator.color} relative overflow-hidden rounded-xl p-5 text-white shadow-lg h-full flex flex-col`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
            <Icon size={20} />
          </div>
          <span className="text-sm font-semibold opacity-90">{indicator.label}</span>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div className="w-full">
          <div className="flex items-baseline justify-between">
             <span
              className="text-4xl font-bold leading-none tracking-tight"
              style={{ fontFamily: 'var(--font-upakarti)' }}
            >
              {indicator.value}
            </span>
          </div>
          <p className="mt-4 text-[10px] leading-relaxed opacity-70">
            {indicator.description}
          </p>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
    </div>
  )
}
