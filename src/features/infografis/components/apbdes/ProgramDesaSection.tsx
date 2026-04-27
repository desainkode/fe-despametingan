import { ReactNode } from 'react'
import { CheckCircle2, Hammer, TrendingUp, ClipboardList } from 'lucide-react'

interface ProgramCardProps {
  title: string
  description: string
  location: string
  status: string
  statusDot: string
  icon: ReactNode
  bgClass: string
  textClass: string
  pillBgClass: string
  iconBgClass: string
}

function ProgramCard({
  title,
  description,
  location,
  status,
  statusDot,
  icon,
  bgClass,
  textClass,
  pillBgClass,
  iconBgClass,
}: ProgramCardProps) {
  return (
    <div
      className={`hero-reveal relative flex h-full flex-col p-6 sm:p-8 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:drop-shadow-[0_16px_24px_rgba(0,0,0,0.15)] ${bgClass} ${textClass}`}
      style={{
        borderTopLeftRadius: '32px',
        borderBottomRightRadius: '32px',
        clipPath:
          'polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 44px 100%, 0 calc(100% - 44px))',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Icon Circle */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] ${iconBgClass}`}
        >
          {icon}
        </div>

        {/* Top Right Pill */}
        <div
          className={`inline-flex shrink-0 items-center gap-2 rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider ${pillBgClass}`}
        >
          <span className={`h-2 w-2 rounded-full ${statusDot}`} />
          {status}
        </div>
      </div>

      <div className="mt-8 flex-1">
        <h3 className="font-[Georgia,serif] text-[26px] font-bold leading-[1.1] tracking-tight sm:text-[32px]">
          {title}
        </h3>
        <p className="mt-3 max-w-[95%] text-[11px] leading-relaxed opacity-80 sm:text-[13px]">
          {description}
        </p>
      </div>

      <div className="mt-12 flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
            Lokasi
          </span>
          <span className="text-[12px] font-medium opacity-90">{location}</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] opacity-50 sm:text-[10px]">
            Program
            <br />
            APBDes
          </span>
        </div>
      </div>
    </div>
  )
}

export function ProgramDesaSection() {
  const programs = [
    {
      title: 'Pembangunan Irigasi',
      description: 'Meningkatkan produktivitas hasil panen petani dan sistem perairan.',
      location: 'Blok Sawah Lor, Dusun 1',
      status: 'Berjalan',
      statusDot: 'bg-[#F0B100]', // Yellow dot
      icon: <Hammer size={20} strokeWidth={2.5} />,
      bgClass: 'bg-[linear-gradient(135deg,#00C185_0%,#009A64_100%)]',
      textClass: 'text-white',
      pillBgClass: 'bg-[#111] text-white shadow-sm',
      iconBgClass: 'bg-[#111]/20 text-white',
    },
    {
      title: 'Rehabilitasi Balai Desa',
      description: 'Peningkatan fasilitas pelayanan publik terpadu untuk masyarakat.',
      location: 'Pusat Pemerintahan Desa',
      status: 'Selesai',
      statusDot: 'bg-[#00E0A1]', // Green dot
      icon: <CheckCircle2 size={20} strokeWidth={2.5} />,
      bgClass: 'bg-[#E8EAE9]', // Consistent light gray
      textClass: 'text-[#111]',
      pillBgClass: 'bg-[#111] text-white shadow-sm',
      iconBgClass: 'bg-[#111]/10 text-[#111]',
    },
    {
      title: 'Pelatihan UMKM Warga',
      description: 'Pemberdayaan ekonomi dan keterampilan warga untuk usaha mandiri.',
      location: 'Gedung Serbaguna',
      status: 'Direncanakan',
      statusDot: 'bg-[#F0B100]', // Yellow dot
      icon: <TrendingUp size={20} strokeWidth={2.5} />,
      bgClass: 'bg-[#0B281F]', // Dark Green
      textClass: 'text-white',
      pillBgClass: 'bg-white/10 text-white shadow-sm backdrop-blur-sm',
      iconBgClass: 'bg-[#00E0A1]/20 text-[#00E0A1]',
    },
  ]

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
        <h2
          className="hero-reveal whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.08] tracking-[0.01em] text-[#0B0D10] md:text-[30px] lg:text-[38px]"
          style={{ animationDelay: '40ms' }}
        >
          Program &
          <br />
          Kegiatan
        </h2>
        <p
          className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B0D10]/82 md:text-[13px] md:leading-7"
          style={{ animationDelay: '140ms' }}
        >
          Daftar program prioritas desa yang direncanakan dan dilaksanakan secara terbuka, serta didanai melalui Anggaran Pendapatan dan Belanja Desa (APBDes) dengan prinsip transparansi dan akuntabilitas kepada masyarakat.
        </p>
        <button
          type="button"
          aria-label="Informasi program desa"
          className="hero-reveal inline-flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-[#022F25] text-[#F3F8F6] shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(0,0,0,0.2)] md:h-14 md:w-14"
          style={{ animationDelay: '220ms' }}
        >
          <ClipboardList size={20} strokeWidth={2.4} />
        </button>
      </div>

      <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {programs.map((program, index) => (
          <div key={program.title} style={{ animationDelay: `${200 + index * 100}ms` }}>
            <ProgramCard {...program} />
          </div>
        ))}
      </div>
    </div>
  )
}
