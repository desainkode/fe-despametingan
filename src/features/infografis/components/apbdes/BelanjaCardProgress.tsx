import { ArrowUpRight, BarChart3, ChevronRight, Infinity } from 'lucide-react'

export function BelanjaCardProgress() {
  return (
    <article className="hero-reveal group relative flex h-full flex-col rounded-[28px] bg-[linear-gradient(160deg,rgba(0,43,34,0.98)_0%,rgba(0,61,48,0.96)_55%,rgba(0,29,23,0.99)_100%)] p-2 shadow-[0_20px_40px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.2)]" style={{ animationDelay: '100ms' }}>
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-[#00E0A1]/10 blur-3xl transition-all duration-500 group-hover:bg-[#00E0A1]/18" />

      {/* Top Section (Light) */}
      <div className="relative z-10 flex flex-col rounded-[22px] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4F8F6] text-[#0B281F]">
              <BarChart3 size={24} strokeWidth={2.4} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF7F1] px-2.5 py-1 text-[11px] font-bold text-[#00A170]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00E0A1]" />
                Progress
              </div>
              <h3 className="mt-1.5 font-[Georgia,serif] text-[20px] font-bold text-[#0B281F] sm:text-[22px]">
                Realisasi Belanja
              </h3>
            </div>
          </div>
          
          <button
            type="button"
            aria-label="Detail realisasi belanja"
            className="inline-flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-[#00E0A1] shadow-[0_4px_10px_rgba(11,40,31,0.3)] transition-transform duration-300 hover:scale-105"
          >
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Bottom Section (Dark) */}
      <div className="relative z-10 flex flex-1 flex-col gap-6 p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Progress Item 1 */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-white/90">Belanja Pegawai</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-white/50">Realisasi</span>
                <span className="text-[14px] font-bold text-white">50%</span>
              </div>
            </div>
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="absolute left-0 top-0 h-full w-[50%] rounded-full bg-[linear-gradient(90deg,#00E0A1_0%,#F0B100_100%)] shadow-[0_0_10px_rgba(240,177,0,0.5)]" />
            </div>
          </div>

          {/* Progress Item 2 */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-white/90">Belanja Barang dan Jasa</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-white/50">Realisasi</span>
                <span className="text-[14px] font-bold text-white">0%</span>
              </div>
            </div>
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="absolute left-0 top-0 h-full w-[0%] rounded-full bg-[linear-gradient(90deg,#00E0A1_0%,#F0B100_100%)]" />
            </div>
          </div>

          {/* Progress Item 3 */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-white/90">Belanja Modal</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-white/50">Realisasi</span>
                <span className="text-[14px] font-bold text-white">0%</span>
              </div>
            </div>
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="absolute left-0 top-0 h-full w-[0%] rounded-full bg-[linear-gradient(90deg,#00E0A1_0%,#F0B100_100%)]" />
            </div>
          </div>
        </div>

        <button className="group/btn mt-auto inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 pt-4 text-[12px] font-bold text-white transition-all hover:bg-white/10 hover:pr-3">
          Lihat selengkapnya
          <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </article>
  )
}
