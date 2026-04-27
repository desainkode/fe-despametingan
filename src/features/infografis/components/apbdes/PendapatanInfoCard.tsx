import { ChartNoAxesCombined, type LucideIcon } from 'lucide-react'

export interface PendapatanInfoCardProps {
  nama: string
  deskripsi: string
  nominal: string
  persentase: number
  icon: LucideIcon
  delayMs: number
}

export function PendapatanInfoCard({
  nama,
  deskripsi,
  nominal,
  persentase,
  icon: Icon,
  delayMs,
}: PendapatanInfoCardProps) {
  return (
    <article className="hero-reveal group relative h-full" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="relative h-full overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(160deg,rgba(0,43,34,0.98)_0%,rgba(0,61,48,0.96)_55%,rgba(0,29,23,0.99)_100%)] px-5 pb-5 pt-5 shadow-[0_20px_40px_rgba(0,0,0,0.14)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/18">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#00E0A1]/10 blur-3xl transition-all duration-500 group-hover:bg-[#00E0A1]/18" />

        <div className="relative flex h-full flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0B100] shadow-[0_10px_16px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
              <Icon size={24} strokeWidth={2.4} className="text-white" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#00E0A1]/25 bg-[#00E0A1]/12 px-3 py-1.5 text-[12px] font-bold text-[#B7FFEA] shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B7FFEA]" />
              {persentase}% kontribusi
            </div>
          </div>

          <div className="flex-1">
            <h3 className="max-w-[12ch] font-[Georgia,serif] text-[24px] leading-[1.02] text-white sm:text-[26px]">
              {nama}
            </h3>
            <p className="mt-3 text-[12px] leading-relaxed text-white/70 sm:text-[13px]">{deskripsi}</p>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Nominal</p>
              <p className="mt-1 text-[18px] font-bold text-white sm:text-[20px]" style={{ fontFamily: 'var(--font-upakarti)' }}>
                {nominal}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-[#00E0A1] sm:text-[12px]">
              <ChartNoAxesCombined size={14} strokeWidth={2.2} />
              stabil
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
