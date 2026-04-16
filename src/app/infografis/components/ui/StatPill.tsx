'use client'

interface StatPillProps {
  label: string
  value: string
}

export function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="rounded-3xl border border-white/18 bg-white/15 px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/76">
        {label}
      </p>
      <p className="mt-2 text-[30px] font-bold leading-none text-white md:text-[34px]">
        {value}
      </p>
    </div>
  )
}
