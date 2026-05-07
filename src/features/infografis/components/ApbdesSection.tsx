import { useState, useEffect } from 'react'
import { CircleDollarSign, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { sectionCardClass } from '../constants/styles'
import { apbdesCards as staticApbdesCards } from '../config/apbdes-data'
import { ApbdesCard } from './apbdes/ApbdesCard'
import { PendapatanDesaSection } from './apbdes/PendapatanDesaSection'
import { BelanjaDesaSection } from './apbdes/BelanjaDesaSection'
import { ProgramDesaSection } from './apbdes/ProgramDesaSection'
import { RealisasiAnggaranSection } from './apbdes/RealisasiAnggaranSection'
import { GrafikVisualisasiSection } from './apbdes/GrafikVisualisasiSection'
import { apbdesService, ApbdesPublicSummary } from '@/lib/api/apbdes'

export function ApbdesSection() {
  const [data, setData] = useState<ApbdesPublicSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apbdesService.getPublicSummary()
      .then(res => {
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  // Override static cards with dynamic data if available
  const displayCards = [...staticApbdesCards];
  if (data) {
    if (data.ringkasan.pendapatan) {
      displayCards[0] = { ...displayCards[0], amount: Number(data.ringkasan.pendapatan.anggaran).toLocaleString('id-ID') };
    }
    if (data.ringkasan.belanja) {
      displayCards[1] = { ...displayCards[1], amount: Number(data.ringkasan.belanja.anggaran).toLocaleString('id-ID') };
    }
    if (data.ringkasan.pembiayaan) {
      displayCards[2] = { ...displayCards[2], amount: Number(data.ringkasan.pembiayaan.anggaran).toLocaleString('id-ID') };
    }
  }

  return (
    <section
      className={
        sectionCardClass +
        ' overflow-hidden relative min-h-[400px]'
      }
    >
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0B281F] border-t-transparent"></div>
        </div>
      )}

      <div className="hero-reveal mb-4 flex justify-end">
        <Link
          href="/infografis/apbdes"
          className="inline-flex items-center gap-2 rounded-full border border-[#0B281F]/10 bg-white px-4 py-2 text-[11px] font-bold text-[#0B281F] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          Lihat Semua Detail <ArrowRight size={14} />
        </Link>
      </div>
      <div className="relative mb-6 border-b border-[#0B281F]/10 pb-6 pr-14 md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] md:items-start md:gap-6 md:pr-16">
        <h2 className="hero-reveal whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.08] tracking-[0.01em] text-[#0B0D10] md:text-[30px] lg:text-[38px]">
          APB Desa{`\n`}Pameutingan
        </h2>

        <p className="hero-reveal mt-4 max-w-none pt-0.5 text-[12px] leading-6 text-[#0B0D10]/82 md:mt-0 md:text-[13px] md:leading-7">
          APBDes Pameutingan merupakan informasi mengenai anggaran pendapatan dan belanja desa yang mencakup rincian pendapatan,
          belanja, dan pembiayaan sebagai dasar transparansi serta perencanaan pembangunan desa.
        </p>

        <div className="hero-reveal absolute right-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-[#F3F8F6] shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(0,0,0,0.2)] md:h-14 md:w-14">
          <CircleDollarSign size={20} strokeWidth={2.4} />
        </div>
      </div>

      <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
        {displayCards.map((card, index) => (
          <ApbdesCard key={card.title} card={card} index={index} />
        ))}
      </div>

      <div className="mt-20 md:mt-24">
        <PendapatanDesaSection rincian={data?.rincian_pendapatan} />
      </div>

      <div className="mt-20 md:mt-24">
        <BelanjaDesaSection rincian={data?.rincian_belanja} />
      </div>

      <div className="mt-20 md:mt-24">
        <ProgramDesaSection dokumentasi={data?.dokumentasi} />
      </div>

      <div className="mt-40 md:mt-24">
        <RealisasiAnggaranSection rincian={data?.rincian_belanja} />
      </div>

      <div className="mt-40 md:mt-24">
        <GrafikVisualisasiSection />
      </div>
    </section>
  )
}
