import { ReactNode } from 'react'

export interface BelanjaCardSecondaryProps {
  title: string
  value: string
  description: string
  percentage: number
  icon: ReactNode
}

export function BelanjaCardSecondary({
  title,
  value,
  description,
  percentage,
  icon,
}: BelanjaCardSecondaryProps) {
  return (
    <div className="relative flex h-full flex-col rounded-[32px] bg-[#E8EAE9] p-6 pt-10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 sm:p-8 sm:pt-12">
      {/* Top Left Overlapping Badge */}
      <div className="absolute -left-3 -top-3 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#111111] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.2)]">
        {icon}
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="font-[Georgia,serif] text-[20px] font-bold leading-tight text-[#111] sm:text-[24px]">
          <span className="block text-[14px] font-medium text-[#111]/70">Belanja</span>
          {title}
        </h3>

        <div className="mt-4 flex items-end gap-2">
          <span className="font-[Georgia,serif] text-[34px] font-bold leading-none tracking-tight text-[#111] sm:text-[40px]">
            {value}
          </span>
        </div>

        <p className="mt-4 max-w-[95%] text-[11px] leading-relaxed text-[#111]/80 sm:text-[13px]">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-10 flex items-end justify-end">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#111] px-4 py-1.5 text-[12px] font-bold tracking-widest text-white shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          {percentage}%
        </div>
      </div>
    </div>
  )
}
