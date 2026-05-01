import { SectionHeader, MiniMetric } from './ui'
import { sectionCardClass } from '../constants/styles'
import { idmContent } from '../config/infografis-content'

export function IdmSection() {
  return (
    <div className={sectionCardClass + ' bg-white'}>
      <SectionHeader
        title={idmContent.title}
        description={idmContent.description}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {idmContent.indicators.map((item) => (
          <MiniMetric key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  )
}
