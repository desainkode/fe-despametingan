'use client'

import { SectionHeader, StatPill } from './ui'
import { sectionCardClass } from '../constants/styles'
import { sdgsContent } from '../config/infografis-content'
import { useSdgs } from '@/hooks/useKemendesa'

export function SdgsSection() {
  const { data, loading } = useSdgs()

  // Common mapping for SDGs data
  const displayIndicators = data?.data
    ? [
        { label: 'Indikator Dipantau', value: '17' },
        { label: 'Skor Rata-rata', value: data.average?.toString() || '0' },
        { label: 'Status SDGs', value: 'Aktif' },
      ]
    : sdgsContent.indicators

  return (
    <div className={sectionCardClass + ' bg-[#006548] text-[#F4F3EF] shadow-[0_14px_28px_rgba(0,0,0,0.18)]'}>
      <SectionHeader
        title={sdgsContent.title}
        description={sdgsContent.description}
        variant="dark"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm md:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A4F4CF]">
            Fokus Target
          </p>
          <p className="mt-3 text-[28px] font-bold leading-tight md:text-[30px]">
            17 Tujuan Pembangunan
          </p>
          <p className="mt-3 text-[13px] leading-6 text-[#D0FAE5]/80 md:text-[14px]">
            {data?.data 
              ? 'Data capaian SDGs Desa berhasil dimuat dari sistem Kemendesa secara real-time.' 
              : 'Panel ini siap diisi grafik, capaian, dan indikator prioritas agar evaluasi program pembangunan lebih mudah dilakukan.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-white/10" />
            ))
          ) : (
            displayIndicators.map((item) => (
              <StatPill key={item.label} label={item.label} value={item.value} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
