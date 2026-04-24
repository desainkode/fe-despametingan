'use client'

import { SectionHeader, MiniMetric } from './ui'
import { sectionCardClass } from '../constants/styles'
import { stuntingContent } from '../config/infografis-content'

export function StuntingSection() {
  return (
    <div className={sectionCardClass + ' bg-white'}>
      <SectionHeader
        title={stuntingContent.title}
        description={stuntingContent.description}
      />

      <div className="grid gap-3 md:grid-cols-3">
        {stuntingContent.indicators.map((item, index) => (
          <MiniMetric
            key={item.label}
            label={item.label}
            value={item.value}
            description={item.description}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
