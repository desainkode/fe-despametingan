import { Briefcase, Check } from 'lucide-react'

export function BelanjaCardPrimary() {
  return (
    <div className="relative flex h-full flex-col rounded-[32px] bg-[linear-gradient(135deg,#00C185_0%,#009A64_100%)] p-6 pt-10 text-white transition-transform duration-300 hover:-translate-y-1 sm:p-8 sm:pt-12">
      {/* Glass Shine */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[linear-gradient(105deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_45%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[32px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]" />

      {/* Top Left Overlapping Badge */}
      <div className="absolute -left-3 -top-3 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#111111] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.3)]">
        <Briefcase size={20} />
      </div>

      <div className="relative z-10 flex-1 pr-10 sm:pr-14">
        <h3 className="font-[Georgia,serif] text-[20px] font-bold leading-tight sm:text-[24px]">
          Rincian Belanja
          <br />
          Desa
        </h3>

        <div className="mt-4 flex items-end gap-2">
          <span className="font-timeless text-[34px] font-bold leading-none tracking-tight sm:text-[40px]">
            Rp. 1.000.000
          </span>
        </div>

        <p className="mt-4 max-w-[90%] text-[12px] leading-relaxed text-white/90 sm:text-[14px]">
          Dibagi per bidang agar transparan:
        </p>
      </div>

      <div className="relative z-10 mt-10 flex items-end justify-between pr-[80px]">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#111] px-4 py-1.5 text-[12px] font-bold tracking-widest text-white shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          50%
        </div>
      </div>

      {/* Bottom Right Cutout Illusion */}
      <div className="absolute -bottom-1 -right-1 z-10 h-[92px] w-[92px] rounded-tl-[36px] bg-white shadow-[inset_2px_2px_10px_rgba(0,0,0,0.05)]" />

      {/* Yellow Circle Button */}
      <div className="absolute bottom-3 right-3 z-20 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#F0B100] text-white shadow-[0_8px_16px_rgba(240,177,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] transition-transform duration-300 hover:scale-105 hover:bg-[#F2C233]">
        <Check size={28} strokeWidth={3} />
      </div>
    </div>
  )
}
