import { Landmark } from 'lucide-react'
import { PendapatanInfoCard } from './PendapatanInfoCard'
import { PendapatanChart } from './PendapatanChart'
import { pendapatanCards } from '../../config/apbdes-data'

export function PendapatanDesaSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
        <h2 className="hero-reveal whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.08] tracking-[0.01em] text-[#0B0D10] md:text-[30px] lg:text-[38px]" style={{ animationDelay: '40ms' }}>
          Pendapatan
          <br />
          Desa
        </h2>

        <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B0D10]/82 md:text-[13px] md:leading-7" style={{ animationDelay: '140ms' }}>
          Pendapatan desa merupakan rangkuman sumber penerimaan yang digunakan untuk membiayai penyelenggaraan pemerintahan,
          pembangunan, pembinaan masyarakat, dan pemberdayaan warga secara berkelanjutan.
        </p>

        <button
          type="button"
          aria-label="Informasi pendapatan desa"
          className="hero-reveal inline-flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-[#022F25] text-[#F3F8F6] shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(0,0,0,0.2)] md:h-14 md:w-14"
          style={{ animationDelay: '220ms' }}
        >
          <Landmark size={20} strokeWidth={2.4} />
        </button>
      </div>

      <div className="relative grid items-stretch gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] xl:gap-12">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#00E0A1]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#00B179]/10 blur-[110px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,224,161,0.05)_0%,transparent_70%)]" />

        <div className="relative z-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {pendapatanCards.map((item, idx) => (
            <PendapatanInfoCard
              key={item.nama}
              nama={item.nama}
              deskripsi={item.deskripsi}
              nominal={item.nominal}
              persentase={item.persentase}
              icon={item.icon}
              delayMs={120 + idx * 70}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(0,43,34,0.98)_0%,rgba(0,61,48,0.96)_55%,rgba(0,29,23,0.99)_100%)] p-6 shadow-[0_14px_28px_rgba(0,0,0,0.14)] backdrop-blur-md sm:p-8">
          <PendapatanChart delayMs={220} />
        </div>
      </div>
    </div>
  )
}
