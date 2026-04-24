import { SectionHeader } from './ui'
import { sectionCardClass } from '../constants/styles'
import { bansosContent } from '../config/infografis-content'

export function BansosSection() {
  return (
    <div className={sectionCardClass + ' bg-white'}>
      <SectionHeader
        title={bansosContent.title}
        description={bansosContent.description}
      />

      <div className="grid gap-3 md:grid-cols-3">
        {bansosContent.statuses.map((item) => (
          <div key={item.label} className="rounded-3xl border border-[#F0B100]/20 bg-[#F5F7F6] p-5 md:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#004F3B]/65">
              {item.label}
            </p>
            <p className="mt-3 text-[28px] font-bold leading-none text-[#0B281F] md:text-[30px]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
