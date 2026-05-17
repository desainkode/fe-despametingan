'use client'

import { SectionHeader, MiniMetric } from './ui'
import { sectionCardClass } from '../constants/styles'
import { idmContent } from '../config/infografis-content'
import { useIdm } from '@/hooks/useKemendesa'

export function IdmSection() {
  const { data, loading } = useIdm()

  const displayIndicators = data?.mapData 
    ? [
        { label: 'Status Desa', value: data.mapData.SUMMARIES?.STATUS || 'N/A' },
        { label: 'Skor IDM', value: data.mapData.SUMMARIES?.SKOR_SAAT_INI?.toString() || '0' },
        { label: 'Target Status', value: data.mapData.SUMMARIES?.TARGET_STATUS || 'N/A' },
      ]
    : idmContent.indicators

  return (
    <div className={sectionCardClass + ' bg-white'}>
      <SectionHeader
        title={idmContent.title}
        description={idmContent.description}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-neutral-100" />
          ))
        ) : (
          displayIndicators.map((item) => (
            <MiniMetric key={item.label} label={item.label} value={item.value} />
          ))
        )}
      </div>
    </div>
  )
}
