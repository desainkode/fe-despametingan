'use client'

import React, { useState, useEffect } from 'react'
import { BansosIndicatorCard } from './bansos/BansosIndicatorCard'
import { BansosAllocationCard } from './bansos/BansosAllocationCard'
import { BansosDistributionCard } from './bansos/BansosDistributionCard'
import { BansosBenefitTypeCard } from './bansos/BansosBenefitTypeCard'
import { sectionCardClass, SectionHeader } from './section-ui'
import { bansosApi, BansosStatistics } from '@/lib/api/bansos'

export function BansosSection() {
  const [data, setData] = useState<BansosStatistics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bansosApi.getPublicStatistics()
      .then(res => {
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const indicators = [
    {
      label: 'Total Penerima Bansos',
      value: data ? data.total_penerima.toLocaleString('id-ID') : '458',
      unit: 'Jiwa',
      description: 'Jumlah keseluruhan masyarakat yang menerima bantuan sosial di desa.',
      color: 'bg-linear-to-br from-[#0B281F] to-[#006045]',
    },
    {
      label: 'Jenis Bantuan',
      value: data ? data.total_program.toString() : '4',
      unit: 'Program',
      description: 'Total program bantuan sosial yang dijalankan di desa.',
      color: 'bg-linear-to-br from-[#0B281F] to-[#008F5D]',
    },
    {
      label: 'Total Anggaran Tahunan',
      value: data ? (data.total_bantuan >= 1000000000 ? (data.total_bantuan / 1000000000).toFixed(1) : (data.total_bantuan / 1000000).toFixed(0)) : '1.25',
      unit: data ? (data.total_bantuan >= 1000000000 ? 'Miliar' : 'Juta') : 'Miliar',
      description: 'Jumlah dana dialokasikan untuk program bantuan sosial selama satu tahun.',
      color: 'bg-linear-to-br from-[#008F5D] to-[#00C48C]',
    },
    {
      label: 'Jumlah Program Bantuan',
      value: data ? data.total_program.toString() : '4',
      unit: 'Program',
      description: 'Jumlah keseluruhan program bantuan sosial aktif di desa Pameutingan.',
      color: 'bg-linear-to-br from-[#006045] to-[#004F3B]',
    },
  ]

  const summaries = [
    {
      label: 'Penerima Aktif',
      value: data ? data.total_penerima.toLocaleString('id-ID') : '458',
      unit: 'JIWA',
      description: 'Jumlah warga yang masih terdaftar sebagai penerima bantuan sosial.',
      color: 'bg-[#0B281F]',
    },
    {
      label: 'Program Terbesar',
      value: data && data.program_terbesar ? (data.program_terbesar.jumlah >= 1000000000 ? (data.program_terbesar.jumlah / 1000000000).toFixed(1) + ' M' : (data.program_terbesar.jumlah / 1000000).toFixed(0) + ' Jt') : '450 Jt',
      unit: 'ALOKASI',
      description: data && data.program_terbesar ? `Program anggaran terbesar: ${data.program_terbesar.nama}` : 'Program Keluarga Harapan (PKH)',
      color: 'bg-[#0B281F]',
    },
    {
      label: 'Alokasi Bantuan',
      value: data ? (data.total_bantuan >= 1000000000 ? (data.total_bantuan / 1000000000).toFixed(2) + ' M' : (data.total_bantuan / 1000000).toFixed(0) + ' Jt') : '1.25 M',
      unit: 'RUPIAH',
      description: 'Jumlah anggaran bantuan yang dialokasikan untuk masyarakat.',
      color: 'bg-[#0B281F]',
    },
  ]

  const distributions = data
    ? data.distributions.map(d => ({
        dusun: d.nama,
        keluarga: d.total,
        alokasi: `Menampilkan jumlah penerima bantuan sosial yang berada di ${d.nama}`,
      }))
    : [
        {
          dusun: 'Dusun Darmacaang',
          keluarga: 124,
          alokasi: 'Menampilkan jumlah penerima bantuan sosial yang berada di Dusun Darmacaang',
        },
        {
          dusun: 'Dusun Mekarsari',
          keluarga: 108,
          alokasi: 'Menampilkan jumlah penerima bantuan sosial yang berada di Dusun Mekarsari',
        },
        {
          dusun: 'Dusun Cibiru',
          keluarga: 135,
          alokasi: 'Menampilkan jumlah penerima bantuan sosial yang berada di Dusun Cibiru',
        },
        {
          dusun: 'Dusun Sukamaju',
          keluarga: 91,
          alokasi: 'Menampilkan jumlah penerima bantuan sosial yang berada di Dusun Sukamaju',
        },
      ]

  const benefitTypes = data
    ? data.programs.map((p, idx) => ({
        name: p.nama,
        count: p.total_penerima.toString(),
        color: idx % 3 === 0 ? 'bg-[#D9D9D9]' : idx % 3 === 1 ? 'bg-[#F0B100]' : 'bg-[#2D7A65]',
      }))
    : [
        { name: 'PKH', count: '128', color: 'bg-[#D9D9D9]' },
        { name: 'BPMT', count: '110', color: 'bg-[#F0B100]' },
        { name: 'BLT', count: '150', color: 'bg-[#D9D9D9]' },
        { name: 'Sembako', count: '70', color: 'bg-[#2D7A65]' },
      ]

  return (
    <div className="space-y-6 md:space-y-8 relative" id="bansos">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-xs min-h-[400px] rounded-4xl">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0B281F] border-t-transparent"></div>
        </div>
      )}

      {/* 1. Ringkasan Bantuan Sosial */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader
          title={<>Ringkasan<br />Bantuan Sosial</>}
          description="Ringkasan Bantuan Sosial Desa Pameutingan merupakan data jumlah dan jenis bantuan sosial yang diterima masyarakat sebagai gambaran kondisi kesejahteraan warga."
        />

        <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          {indicators.map((indicator, index) => (
            <div key={index} className="w-full">
              <BansosIndicatorCard indicator={indicator} />
            </div>
          ))}
        </div>
      </section>

      {/* 2. Penerima Bantuan dan Alokasi */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader
          title={<>Penerima Bantuan<br />dan Alokasi</>}
          description="Statistik bantuan sosial Desa Pameutingan merupakan data jumlah penerima dan alokasi bantuan yang disalurkan kepada masyarakat."
        />

        <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {summaries.map((summary, index) => (
            <div key={index} className="w-full">
              <BansosAllocationCard summary={summary} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Distribusi Bantuan per Dusun */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader
          title={<>Distribusi Bantuan<br />per Dusun</>}
          description="Distribusi Bantuan per Dusun adalah informasi mengenai penyebaran penerima bantuan sosial di setiap dusun untuk mengetahui pemerataan bantuan."
        />

        {/* Swipe Swiper container for mobile, standard grid for larger screens */}
        <div className="mt-8 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 sm:pt-0 sm:overflow-visible">
          <div className="flex snap-x snap-mandatory gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-5 md:gap-6">
            {distributions.map((dist, index) => (
              <div key={index} className="w-[240px] xs:w-[260px] sm:w-full shrink-0 snap-start">
                <BansosDistributionCard data={dist} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Penerima Bantuan per Jenis */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader
          title={<>Penerima Bantuan<br />per Jenis</>}
          description="Penerima Bantuan per Jenis adalah informasi jumlah warga yang menerima bantuan berdasarkan jenis program bantuan yang tersedia."
        />

        <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefitTypes.map((type, index) => (
            <div key={index} className="w-full">
              <BansosBenefitTypeCard type={type} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
