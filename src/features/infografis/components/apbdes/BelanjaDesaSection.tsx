import { ShoppingBag, Landmark, HardHat, Users, Sprout, ShieldAlert } from 'lucide-react'
import { BelanjaCardPrimary } from './BelanjaCardPrimary'
import { BelanjaCardSecondary } from './BelanjaCardSecondary'

export function BelanjaDesaSection() {
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
          <BelanjaCardPrimary />
        </div>

        {/* Card 2: Pemerintahan Desa */}
        <div className="hero-reveal relative z-10" style={{ animationDelay: '380ms' }}>
          <BelanjaCardSecondary
            title="Pemerintahan"
            value="Rp. 300.000"
            description="Penyelenggaraan tata praja pemerintahan, operasional, dan pelayanan administrasi publik desa."
            percentage={30}
            icon={<Landmark size={20} />}
          />
        </div>

        {/* Card 3: Pembangunan Desa */}
        <div className="hero-reveal relative z-10" style={{ animationDelay: '460ms' }}>
          <BelanjaCardSecondary
            title="Pembangunan"
            value="Rp. 400.000"
            description="Pengadaan infrastruktur dan fasilitas fisik berkelanjutan untuk kemajuan wilayah."
            percentage={40}
            icon={<HardHat size={20} />}
          />
        </div>

        {/* Card 4: Pembinaan Kemasyarakatan */}
        <div className="hero-reveal relative z-10" style={{ animationDelay: '540ms' }}>
          <BelanjaCardSecondary
            title="Pembinaan"
            value="Rp. 100.000"
            description="Pembinaan pemuda, kesenian, olahraga, dan kegiatan sosial untuk kerukunan warga."
            percentage={10}
            icon={<Users size={20} />}
          />
        </div>

        {/* Card 5: Pemberdayaan Masyarakat */}
        <div className="hero-reveal relative z-10" style={{ animationDelay: '620ms' }}>
          <BelanjaCardSecondary
            title="Pemberdayaan"
            value="Rp. 100.000"
            description="Peningkatan kapasitas keterampilan dan dukungan ekonomi produktif masyarakat."
            percentage={10}
            icon={<Sprout size={20} />}
          />
        </div>

        {/* Card 6: Penanggulangan Bencana */}
        <div className="hero-reveal relative z-10" style={{ animationDelay: '700ms' }}>
          <BelanjaCardSecondary
            title="Bencana/Darurat"
            value="Rp. 100.000"
            description="Dana cadangan untuk penanggulangan keadaan darurat dan bencana mendesak di desa."
            percentage={10}
            icon={<ShieldAlert size={20} />}
          />
        </div>
      </div>
    </div>
  )
}
