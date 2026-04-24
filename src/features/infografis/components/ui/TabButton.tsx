'use client'

import type { TabButtonProps } from '../../types/infografis'

export function TabButton({ item, active, onClick }: TabButtonProps) {
  const dropShadow = active
    ? "drop-shadow-[0_-4px_10px_rgba(255,255,255,0.4)]"
    : "drop-shadow-[0_-2px_6px_rgba(0,0,0,0.15)]";

  const bgClass = active ? "bg-[#FFFFFF]" : "bg-[#F0B100] group-hover:bg-[#FFC814]";
  const zIndex = active ? "z-10" : "z-0";
  const heightClass = active ? "h-11 md:h-13" : "h-9 md:h-11";
  const hoverAnim = "";

  return (
    <button
      type="button"
      onClick={() => onClick(item.key)}
      aria-pressed={active}
      className={`group relative flex items-center justify-center focus:outline-none transition-all duration-300 ${zIndex} ${dropShadow} ${heightClass} ${hoverAnim}`}
    >
      <div className="absolute inset-0 flex transition-transform duration-300">
        <div className={`w-8 h-full origin-bottom skew-x-[-24deg] rounded-tl-[6px] transition-colors duration-300 ${bgClass}`} />
        <div className={`flex-1 h-full rounded-tr-[8px] rounded-tl-[6px] transition-colors duration-300 ${bgClass}`} />
      </div>

      <span className={`relative z-10 pl-8 pr-6 md:pl-10 md:pr-8 text-[13px] md:text-[14.5px] font-bold tracking-wide transition-colors duration-300 ${active ? 'text-[#0B281F]' : 'text-[#0B281F]/90'}`}>
        {item.label}
      </span>
    </button>
  )
}
