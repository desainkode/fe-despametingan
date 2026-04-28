import { LucideIcon, HandHelping, Package, Banknote, HeartHandshake } from 'lucide-react'
import { BansosIndicator } from '../../types/infografis'

const iconMap: Record<string, LucideIcon> = {
  'Total Penerima Bansos': HandHelping,
  'Jenis Bantuan': Package,
  'Total Anggaran Tahunan': Banknote,
  'Jumlah Program Bantuan': HeartHandshake,
}

interface BansosIndicatorCardProps {
  indicator: BansosIndicator
}

export function BansosIndicatorCard({ indicator }: BansosIndicatorCardProps) {
  const Icon = iconMap[indicator.label] || HandHelping

  return (
    <div className={`p-8 ${indicator.color} rounded-xl shadow-lg text-white flex flex-col justify-between h-full group hover:scale-[1.02] transition-transform duration-300`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 p-3 bg-white/10 rounded-xl shadow-inner backdrop-blur-md flex items-center justify-center">
              <Icon size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold leading-tight max-w-[140px]" style={{ fontFamily: 'var(--font-timeless)' }}>
              {indicator.label}
            </h3>
          </div>
          <p className="text-xs font-normal opacity-70 leading-relaxed max-w-[160px]">
            {indicator.description}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <span 
            className="text-6xl font-normal leading-none" 
            style={{ fontFamily: 'var(--font-upakarti)' }}
          >
            {indicator.value}
          </span>
        </div>
      </div>
    </div>
  )
}
