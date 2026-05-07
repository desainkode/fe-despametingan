import { ShoppingBag, Landmark, HardHat, Users, Sprout, ShieldAlert } from 'lucide-react'
import { BelanjaCardPrimary } from './BelanjaCardPrimary'
import { BelanjaCardSecondary } from './BelanjaCardSecondary'
import { ApbdesItem } from '@/lib/api/apbdes'

const iconMap: Record<string, any> = {
  '5.1': Landmark,
  '5.2': HardHat,
  '5.3': Users,
  '5.4': Sprout,
  '5.5': ShieldAlert
}

export function BelanjaDesaSection({ rincian }: { rincian?: ApbdesItem[] }) {
  const totalAnggaran = rincian?.reduce((acc, item) => acc + Number(item.anggaran), 0) || 1;
  const totalRealisasi = rincian?.reduce((acc, item) => acc + Number(item.realisasi), 0) || 0;

  const percentage = Math.round((totalRealisasi / totalAnggaran) * 100);

  const displayCards = rincian && rincian.length > 0 ? rincian.map((item) => {
    const nominalNum = Number(item.anggaran);
    const nominalStr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(nominalNum);
    return {
      title: item.uraian,
      value: nominalStr,
      description: `Rincian anggaran untuk ${item.uraian.toLowerCase()}.`,
      percentage: Math.round((nominalNum / totalAnggaran) * 100),
      icon: iconMap[item.kode_rekening.substring(0, 3)] || ShoppingBag,
    };
  }) : [
    { title: "Pemerintahan", value: "Rp. 300.000", description: "Penyelenggaraan tata praja", percentage: 30, icon: Landmark },
    { title: "Pembangunan", value: "Rp. 400.000", description: "Infrastruktur", percentage: 40, icon: HardHat },
    { title: "Pembinaan", value: "Rp. 100.000", description: "Kesenian olahraga", percentage: 10, icon: Users },
    { title: "Pemberdayaan", value: "Rp. 100.000", description: "Ekonomi produktif", percentage: 10, icon: Sprout },
    { title: "Bencana/Darurat", value: "Rp. 100.000", description: "Bencana mendesak", percentage: 10, icon: ShieldAlert },
  ];
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
        <h2 className="hero-reveal whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.08] tracking-[0.01em] text-[#0B0D10] md:text-[30px] lg:text-[38px]" style={{ animationDelay: '40ms' }}>
          Belanja
          <br />
          Desa
        </h2>

        <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B0D10]/82 md:text-[13px] md:leading-7" style={{ animationDelay: '140ms' }}>
          Belanja desa merupakan rincian pengeluaran dana yang dialokasikan untuk membiayai berbagai program prioritas, termasuk pembangunan infrastruktur, pelayanan publik, dan pemberdayaan masyarakat guna mewujudkan kemajuan desa.
        </p>

        <button
          type="button"
          aria-label="Informasi belanja desa"
          className="hero-reveal inline-flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-[#022F25] text-[#F3F8F6] shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(0,0,0,0.2)] md:h-14 md:w-14"
          style={{ animationDelay: '220ms' }}
        >
          <ShoppingBag size={20} strokeWidth={2.4} />
        </button>
      </div>

      <div className="relative mt-4 grid items-stretch gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#00E0A1]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#00B179]/10 blur-[110px]" />

        {/* Card 1: Primary (Green) */}
        <div className="hero-reveal relative z-10" style={{ animationDelay: '300ms' }}>
          <BelanjaCardPrimary totalBelanja={totalAnggaran} percentage={percentage} />
        </div>

        {/* Dynamic Cards */}
        {displayCards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div key={card.title} className="hero-reveal relative z-10" style={{ animationDelay: `${380 + idx * 80}ms` }}>
              <BelanjaCardSecondary
                title={card.title}
                value={card.value}
                description={card.description}
                percentage={card.percentage}
                icon={typeof IconComponent === 'function' || typeof IconComponent === 'object' ? <IconComponent size={20} /> : <ShoppingBag size={20} />}
              />
            </div>
          );
        })}
      </div>
    </div>
  )
}
