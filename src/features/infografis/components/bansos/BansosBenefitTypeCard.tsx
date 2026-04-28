import { Users } from 'lucide-react'
import { BansosBenefitType } from '../../types/infografis'

interface BansosBenefitTypeCardProps {
  type: BansosBenefitType
}

export function BansosBenefitTypeCard({ type }: BansosBenefitTypeCardProps) {
  const isDark = type.color.includes('emerald') || type.color.includes('teal') || type.color.includes('green') || type.color.includes('900') || type.color.includes('700') || type.color.includes('600')
  const textColor = isDark ? 'text-white' : 'text-black'
  const iconBg = isDark ? 'bg-white/10' : 'bg-black/5'

  return (
    <div className={`p-8 ${type.color} rounded-xl rounded-tr-[80px] rounded-bl-[80px] shadow-xl flex flex-col justify-between h-[360px] relative overflow-hidden group`}>
      <div className="flex flex-col gap-6 relative z-10">
        <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center`}>
          <Users size={20} className={textColor} />
        </div>

        <div className="flex flex-col items-start gap-4">
          <div className="px-3 py-1 bg-[#0B281F] rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FDC700] rounded-full" />
            <span className="text-[10px] font-medium text-white">Orang</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <span 
              className={`text-8xl font-normal leading-none ${textColor}`} 
              style={{ fontFamily: 'var(--font-upakarti)' }}
            >
              {type.count}
            </span>
            <h3 className={`text-3xl font-bold ${textColor}`} style={{ fontFamily: 'var(--font-timeless)' }}>
              {type.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-auto text-right relative z-10">
        <p className={`text-[10px] leading-tight font-medium opacity-60 ${textColor}`}>
          Terdata<br />oleh sistem
        </p>
      </div>
    </div>
  )
}
