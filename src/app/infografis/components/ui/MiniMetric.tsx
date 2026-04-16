'use client'

interface MiniMetricProps {
  label: string
  value: string
}

export function MiniMetric({ label, value }: MiniMetricProps) {
  return (
    <div className="rounded-2xl border border-[#0B281F]/10 bg-white px-4 py-4 shadow-[0_10px_24px_rgba(11,40,31,0.06)]">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#004F3B]/65">
        {label}
      </p>
      <p className="mt-2 text-[26px] font-bold leading-none text-[#0B281F] md:text-[28px]">
        {value}
      </p>
    </div>
  )
}
