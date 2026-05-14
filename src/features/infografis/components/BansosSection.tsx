'use client'

import { useEffect, useState } from 'react'
import { BansosIndicatorCard } from './bansos/BansosIndicatorCard'
import { BansosAllocationCard } from './bansos/BansosAllocationCard'
import { BansosDistributionCard } from './bansos/BansosDistributionCard'
import { BansosBenefitTypeCard } from './bansos/BansosBenefitTypeCard'
import { CircleDollarSign, Loader2 } from 'lucide-react'
import { bansosApi, BansosStatistics } from '@/lib/api/bansos'

export function BansosSection() {
  const [data, setData] = useState<BansosStatistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const stats = await bansosApi.getPublicStatistics()
        setData(stats)
      } catch (error) {
        console.error('Failed to load bansos statistics', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (!data) return null

  const indicators = [
    {
      label: 'Total Penerima Bansos',
      value: data.total_penerima.toString(),
      description: 'Jumlah keseluruhan masyarakat yang menerima bantuan sosial di desa.',
      color: 'bg-neutral-900',
    },
    {
      label: 'Jenis Program Bantuan',
      value: data.total_program.toString(),
      description: 'Total program bantuan sosial yang dijalankan di desa.',
      color: 'bg-emerald-800',
    },
    {
      label: 'Total Realisasi Anggaran',
      value: `Rp ${(data.total_bantuan / 1000000).toFixed(1)}M`,
      description: 'Jumlah dana direalisasikan untuk program bantuan sosial.',
      color: 'bg-emerald-600',
    },
    {
      label: 'Program Terbesar',
      value: data.program_terbesar?.nama || '-',
      description: 'Program dengan alokasi realisasi bantuan terbesar.',
      color: 'bg-yellow-500',
    },
  ]

  const summaries = data.programs.map((prog, i) => {
    const colors = [
      'from-emerald-950 via-emerald-600 to-emerald-950',
      'bg-[#0B281F]',
      'bg-neutral-900',
      'bg-emerald-800',
    ]
    return {
      label: prog.nama,
      value: prog.total_penerima.toString(),
      unit: 'Orang/Keluarga',
      description: `Realisasi: Rp ${(prog.total_bantuan / 1000000).toFixed(1)} Juta`,
      color: colors[i % colors.length],
    }
  })

  // Jika tidak ada program
  if (summaries.length === 0) {
    summaries.push({
      label: 'Belum Ada Data',
      value: '0',
      unit: '',
      description: 'Tidak ada program bansos yang tercatat',
      color: 'bg-[#0B281F]'
    })
  }

  const distributions = data.distributions.map(dist => ({
    dusun: dist.nama,
    keluarga: dist.total,
    alokasi: `Jumlah penerima bantuan sosial di ${dist.nama}`
  }))

  const benefitTypes = data.programs.map((prog, i) => {
    const colors = ['bg-[#D9D9D9]', 'bg-[#F0B100]', 'bg-[#2D7A65]', 'bg-[#00945E]']
    return {
      name: prog.nama,
      count: prog.total_penerima.toString(),
      color: colors[i % colors.length]
    }
  })

  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 px-4 py-6 md:space-y-24 md:px-0 md:py-8">
      {/* 1. Ringkasan Bantuan Sosial */}
      <section className="space-y-10">
        <div className="relative flex flex-col gap-6 pr-14 md:flex-row md:items-center md:justify-between md:pr-16">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B281F] sm:text-3xl md:text-4xl">
              Ringkasan <br className="hidden md:block" /> Bantuan Sosial
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Ringkasan Bantuan Sosial Desa Pameutingan merupakan data jumlah dan jenis bantuan sosial yang diterima masyarakat sebagai gambaran kondisi kesejahteraan warga.
            </p>
            <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10 md:h-12 md:w-12">
              <CircleDollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {indicators.map((indicator, index) => (
            <BansosIndicatorCard key={index} indicator={indicator} />
          ))}
        </div>
      </section>

      {/* 2. Penerima Bantuan dan Alokasi */}
      <section className="space-y-10">
        <div className="relative flex flex-col gap-6 pr-14 md:flex-row md:items-center md:justify-between md:pr-16">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B281F] sm:text-3xl md:text-4xl">
              Penerima Bantuan <br className="hidden md:block" /> dan Alokasi
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Statistik bantuan sosial Desa Pameutingan merupakan data jumlah penerima dan alokasi bantuan per program yang disalurkan kepada masyarakat.
            </p>
            <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10 md:h-12 md:w-12">
              <CircleDollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {summaries.map((summary, index) => (
            <BansosAllocationCard key={index} summary={summary} />
          ))}
        </div>
      </section>

      {/* 3. Distribusi Bantuan per Dusun */}
      {distributions.length > 0 && (
        <section className="space-y-10">
          <div className="relative flex flex-col gap-6 pr-14 md:flex-row md:items-center md:justify-between md:pr-16">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold tracking-tight text-[#0B281F] sm:text-3xl md:text-4xl">
                Distribusi Bantuan <br className="hidden md:block" /> per Wilayah
              </h2>
            </div>
            <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
              <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
                Distribusi Bantuan per Wilayah adalah informasi mengenai penyebaran penerima bantuan sosial untuk mengetahui pemerataan bantuan di desa.
              </p>
              <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10 md:h-12 md:w-12">
                <CircleDollarSign size={24} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {distributions.map((dist, index) => (
              <BansosDistributionCard key={index} data={dist} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Penerima Bantuan per Jenis */}
      {benefitTypes.length > 0 && (
        <section className="space-y-10">
          <div className="relative flex flex-col gap-6 pr-14 md:flex-row md:items-center md:justify-between md:pr-16">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold tracking-tight text-[#0B281F] sm:text-3xl md:text-4xl">
                Penerima Bantuan <br className="hidden md:block" /> per Jenis
              </h2>
            </div>
            <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
              <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
                Penerima Bantuan per Jenis adalah informasi jumlah warga yang menerima bantuan berdasarkan jenis program bantuan yang tersedia.
              </p>
              <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10 md:h-12 md:w-12">
                <CircleDollarSign size={24} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {benefitTypes.map((type, index) => (
              <BansosBenefitTypeCard key={index} type={type} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
