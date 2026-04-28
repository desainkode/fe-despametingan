import { ArrowUpRight } from 'lucide-react'
import { BansosAllocation } from '../../types/infografis'

interface BansosAllocationCardProps {
  summary: BansosAllocation
}

export function BansosAllocationCard({ summary }: BansosAllocationCardProps) {
  const isGradient = summary.color.includes('via')

  return (
    <div className={`p-4 h-56 rounded-xl shadow-xl text-white flex gap-4 relative overflow-hidden group ${isGradient ? `bg-linear-to-bl ${summary.color}` : summary.color}`}>
      {/* Left Content */}
      <div className="flex flex-col justify-between flex-1 relative z-10">
        <div className="space-y-3">
          <h3 className="text-3xl font-bold leading-tight" style={{ fontFamily: 'var(--font-timeless)' }}>
            {summary.label}
          </h3>
          <p className="text-[10px] font-normal opacity-80 leading-relaxed max-w-[140px]">
            {summary.description}
          </p>
        </div>
        
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <ArrowUpRight size={16} className="text-white" />
        </div>
      </div>

      {/* Right Content (Number Box) */}
      <div className="w-1/2 h-full bg-black/30 rounded-xl flex flex-col items-center justify-center backdrop-blur-md border border-white/5 relative z-10 p-4">
        <div className="flex flex-col items-start w-full">
          {summary.unit === 'RP.' && (
            <span className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-timeless)' }}>RP.</span>
          )}
          <span 
            className="text-6xl font-normal leading-none" 
            style={{ fontFamily: 'var(--font-upakarti)' }}
          >
            {summary.value}
          </span>
          {summary.unit === 'Orang' && (
            <span className="text-sm font-bold mt-2" style={{ fontFamily: 'var(--font-timeless)' }}>Orang</span>
          )}
        </div>
      </div>

      {/* Subtle spotlight for gradient cards */}
      {isGradient && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(255,255,255,0.15)_0%,_transparent_60%)] pointer-events-none" />
      )}
    </div>
  )
}
