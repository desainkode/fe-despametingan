import { User } from 'lucide-react'
import { BansosDistributionData } from '../../types/infografis'

interface BansosDistributionCardProps {
  data: BansosDistributionData
}

export function BansosDistributionCard({ data }: BansosDistributionCardProps) {
  return (
    <div className="p-4 bg-linear-to-bl from-neutral-900 via-[#004D40] to-neutral-900 rounded-xl shadow-xl text-white flex flex-col gap-3 relative overflow-hidden group h-full">
      <div className="flex items-center gap-3 relative z-10">
        <div className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/5">
          <User size={18} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-normal opacity-60" style={{ fontFamily: 'var(--font-timeless)' }}>Dusun</span>
          <span className="text-base font-bold leading-tight" style={{ fontFamily: 'var(--font-timeless)' }}>{data.dusun}</span>
        </div>
      </div>

      <p className="text-[9px] font-normal opacity-70 leading-relaxed z-10 line-clamp-2">
        {data.description}
      </p>

      <div className="flex justify-between items-end mt-auto relative z-10">
        <span className="text-amber-400 text-[10px] font-medium uppercase tracking-wider mb-1">Penerima</span>
        <div className="flex flex-col items-end">
          <span 
            className="text-4xl font-normal leading-none" 
            style={{ fontFamily: 'var(--font-upakarti)' }}
          >
            {data.count}
          </span>
          <span className="text-amber-400 text-[9px] font-medium">Orang</span>
        </div>
      </div>

      {/* Subtle spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  )
}
