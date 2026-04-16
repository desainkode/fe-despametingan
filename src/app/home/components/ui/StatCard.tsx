'use client'

import type { StatCardProps } from '../../types'

export function StatCard({
  angka,
  label,
  detail,
  delay = 0,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`hero-reveal min-w-0 rounded-xl bg-[#0B281F]/30 p-3 text-center sm:rounded-none sm:bg-transparent sm:p-0 sm:text-left ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-[30px] leading-none tracking-[0.01em] text-white md:text-[36px] md:leading-9">
        {angka}
      </p>
      <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#FFFFFF] md:text-xs">
        {label}
      </p>
      <p className="mt-1 text-[10px] leading-4 text-[#FFFFFF]/55 md:text-[11px]">
        {detail}
      </p>
    </div>
  )
}
