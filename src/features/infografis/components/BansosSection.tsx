import { bansosContent } from '../config/infografis-content'
import { BansosIndicatorCard } from './bansos/BansosIndicatorCard'
import { BansosAllocationCard } from './bansos/BansosAllocationCard'
import { BansosDistributionCard } from './bansos/BansosDistributionCard'
import { BansosBenefitTypeCard } from './bansos/BansosBenefitTypeCard'
import { CircleDollarSign } from 'lucide-react'

export function BansosSection() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-24 py-8 px-4 md:px-0">
      {/* 1. Ringkasan Bantuan Sosial */}
      <section className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B281F] md:text-4xl">
              Ringkasan <br className="hidden md:block" /> Bantuan Sosial
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Ringkasan Bantuan Sosial Desa Pameutingan merupakan data jumlah dan jenis bantuan sosial yang diterima masyarakat sebagai gambaran kondisi kesejahteraan warga.
            </p>
            <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10">
              <CircleDollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bansosContent.indicators.map((indicator, index) => (
            <BansosIndicatorCard key={index} indicator={indicator} />
          ))}
        </div>
      </section>

      {/* 2. Penerima Bantuan dan Alokasi */}
      <section className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B281F] md:text-4xl">
              Penerima Bantuan <br className="hidden md:block" /> dan Alokasi
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Statistik bantuan sosial Desa Pameutingan merupakan data jumlah penerima dan alokasi bantuan yang disalurkan kepada masyarakat.
            </p>
            <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10">
              <CircleDollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bansosContent.summaries.map((summary, index) => (
            <BansosAllocationCard key={index} summary={summary} />
          ))}
        </div>
      </section>

      {/* 3. Distribusi Bantuan per Dusun */}
      <section className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B281F] md:text-4xl">
              Distribusi Bantuan <br className="hidden md:block" /> per Dusun
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Distribusi Bantuan per Dusun adalah informasi mengenai penyebaran penerima bantuan sosial di setiap dusun untuk mengetahui pemerataan bantuan.
            </p>
            <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10">
              <CircleDollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {bansosContent.distributions.map((dist, index) => (
            <BansosDistributionCard key={index} data={dist} />
          ))}
        </div>
      </section>

      {/* 4. Penerima Bantuan per Jenis */}
      <section className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B281F] md:text-4xl">
              Penerima Bantuan <br className="hidden md:block" /> per Jenis
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Penerima Bantuan per Jenis adalah informasi jumlah warga yang menerima bantuan berdasarkan jenis program bantuan yang tersedia.
            </p>
            <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10">
              <CircleDollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bansosContent.benefitTypes.map((type, index) => (
            <BansosBenefitTypeCard key={index} type={type} />
          ))}
        </div>
      </section>
    </div>
  )
}
