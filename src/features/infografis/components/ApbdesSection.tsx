import { CircleDollarSign, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { sectionCardClass } from '../constants/styles'
import { apbdesCards } from '../config/apbdes-data'
import { ApbdesCard } from './apbdes/ApbdesCard'
import { PendapatanDesaSection } from './apbdes/PendapatanDesaSection'
import { BelanjaDesaSection } from './apbdes/BelanjaDesaSection'
import { ProgramDesaSection } from './apbdes/ProgramDesaSection'
import { RealisasiAnggaranSection } from './apbdes/RealisasiAnggaranSection'
import { GrafikVisualisasiSection } from './apbdes/GrafikVisualisasiSection'

export function ApbdesSection() {
  return (
    <section
      className={
        sectionCardClass +
        ' overflow-hidden'
      }
    >

      <div className="hero-reveal mb-4 flex justify-end">
        <Link
          href="/infografis/apbdes"
          className="inline-flex items-center gap-2 rounded-full border border-[#0B281F]/10 bg-white px-4 py-2 text-[11px] font-bold text-[#0B281F] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          Lihat Semua Detail <ArrowRight size={14} />
        </Link>
      </div>
      <div className="mb-6 grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
        <h2 className="hero-reveal whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.08] tracking-[0.01em] text-[#0B0D10] md:text-[30px] lg:text-[38px]">
          APB Desa{`\n`}Pameutingan
        </h2>

        <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B0D10]/82 md:text-[13px] md:leading-7">
          APBDes Pameutingan merupakan informasi mengenai anggaran pendapatan dan belanja desa yang mencakup rincian pendapatan,
          belanja, dan pembiayaan sebagai dasar transparansi serta perencanaan pembangunan desa.
        </p>

        <div className="hero-reveal inline-flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-[#022F25] text-[#F3F8F6] shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(0,0,0,0.2)] md:h-14 md:w-14">
          <CircleDollarSign size={20} strokeWidth={2.4} />
        </div>
      </div>

      <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
        {apbdesCards.map((card, index) => (
          <ApbdesCard key={card.title} card={card} index={index} />
        ))}
      </div>

      <div className="mt-20 md:mt-24">
        <PendapatanDesaSection />
      </div>

      <div className="mt-20 md:mt-24">
        <BelanjaDesaSection />
      </div>

      <div className="mt-20 md:mt-24">
        <ProgramDesaSection />
      </div>

      <div className="mt-40 md:mt-24">
        <RealisasiAnggaranSection />
      </div>

      <div className="mt-40 md:mt-24">
        <GrafikVisualisasiSection />
      </div>
    </section>
  )
}
