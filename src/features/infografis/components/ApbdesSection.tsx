import { useMemo } from 'react'

import { ArrowUpRight, ChartNoAxesCombined, CircleDollarSign, Coins, Landmark, PiggyBank, Wallet, type LucideIcon } from 'lucide-react'
import { Cell, Label, Pie, PieChart } from 'recharts'

import { ChartContainer, ChartTooltip, type ChartConfig } from '@/components/ui/chart'

import { sectionCardClass } from '../constants/styles'

const apbdesCards = [
  {
    title: 'Total Pendapatan',
    description:
      'Total Pendapatan adalah jumlah seluruh penerimaan desa dalam satu tahun anggaran.',
    amount: '3,542',
    tone: 'emerald' as const,
  },
  {
    title: 'Total Belanja',
    description: 'Total Belanja adalah jumlah seluruh pengeluaran desa dalam satu tahun anggaran.',
    amount: '3,542',
    tone: 'dark' as const,
  },
  {
    title: 'Surplus/Defisit',
    description: 'Surplus/Defisit adalah selisih pendapatan dan belanja desa.',
    amount: '3,542',
    tone: 'dark' as const,
  },
  {
    title: 'Penerimaan Pembiayaan',
    description: 'Penerimaan Pembiayaan adalah dana masuk untuk pembiayaan desa.',
    amount: '3,542',
    tone: 'emerald' as const,
  },
  {
    title: 'Pengeluaran Pembiayaan',
    description: 'Pengeluaran Pembiayaan adalah dana keluar untuk pembiayaan desa.',
    amount: '3,542',
    tone: 'dark' as const,
  },
  {
    title: 'SiLPA',
    description: 'SiLPA adalah sisa lebih anggaran tahun sebelumnya yang digunakan pada tahun berjalan.',
    amount: '3,542',
    tone: 'dark' as const,
  },
]

const pendapatanCards = [
  {
    nama: 'Dana Desa',
    deskripsi:
      'Alokasi utama dari pemerintah pusat yang menjadi penopang program prioritas, pembangunan infrastruktur, dan pemberdayaan masyarakat.',
    nominal: 'Rp 1,60 M',
    persentase: 45,
    icon: Coins,
  },
  {
    nama: 'Alokasi Dana Desa',
    deskripsi:
      'Transfer dukungan dari pemerintah daerah untuk operasional desa, layanan publik, dan kegiatan administrasi pemerintahan.',
    nominal: 'Rp 1,00 M',
    persentase: 28,
    icon: Landmark,
  },
  {
    nama: 'Pendapatan Asli Desa',
    deskripsi:
      'Bersumber dari hasil usaha desa, aset yang dikelola, jasa layanan, dan potensi ekonomi lokal yang dikuatkan secara berkelanjutan.',
    nominal: 'Rp 610 Jt',
    persentase: 17,
    icon: Wallet,
  },
  {
    nama: 'Lain-lain Pendapatan',
    deskripsi:
      'Mencakup bantuan keuangan, hibah, dan pendapatan sah lain yang mendukung kebutuhan pembangunan desa.',
    nominal: 'Rp 360 Jt',
    persentase: 10,
    icon: PiggyBank,
  },
] as const

const pendapatanChartData = pendapatanCards.map((item) => ({
  source: item.nama,
  label: item.nama,
  value: item.persentase,
  nominal: item.nominal,
}))

const pendapatanChartGradientIds = Object.fromEntries(
  pendapatanChartData.map((item) => [item.source, `pendapatan-${item.source.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`]),
) as Record<(typeof pendapatanChartData)[number]['source'], string>

const pendapatanChartConfig = {
  'Dana Desa': { label: 'Dana Desa', color: '#00E0A1' },
  'Alokasi Dana Desa': { label: 'Alokasi Dana Desa', color: '#F0B100' },
  'Pendapatan Asli Desa': { label: 'Pendapatan Asli Desa', color: '#8FE8C8' },
  'Lain-lain Pendapatan': { label: 'Lain-lain Pendapatan', color: '#2DCB8C' },
} satisfies ChartConfig

function PendapatanChartTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{
    name?: string
    dataKey?: string
    value?: number | string
    color?: string
  }>
}) {
  if (!active || !payload?.length) {
    return null
  }

  const item = payload[0]
  const label = item.name ?? item.dataKey ?? 'Pendapatan'
  const value = typeof item.value === 'number' ? item.value : Number(item.value ?? 0)
  const color = item.color ?? '#00E0A1'

  return (
    <div className="rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(0,43,34,0.98)_0%,rgba(0,61,48,0.96)_55%,rgba(0,29,23,0.99)_100%)] px-4 py-3 shadow-[0_18px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[12px] font-semibold tracking-[0.02em] text-white/85">{label}</span>
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-[24px] font-bold leading-none text-white" style={{ fontFamily: 'var(--font-upakarti)' }}>
          {value}%
        </span>
        <span className="pb-1 text-[10px] uppercase tracking-[0.35em] text-white/45">kontribusi</span>
      </div>
    </div>
  )
}

function PendapatanInfoCard({
  nama,
  deskripsi,
  nominal,
  persentase,
  icon: Icon,
  delayMs,
}: {
  nama: string
  deskripsi: string
  nominal: string
  persentase: number
  icon: LucideIcon
  delayMs: number
}) {
  return (
    <article className="hero-reveal group relative h-full" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="relative h-full overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(160deg,rgba(0,43,34,0.98)_0%,rgba(0,61,48,0.96)_55%,rgba(0,29,23,0.99)_100%)] px-5 pb-5 pt-5 shadow-[0_20px_40px_rgba(0,0,0,0.14)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/18">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#00E0A1]/10 blur-3xl transition-all duration-500 group-hover:bg-[#00E0A1]/18" />

        <div className="relative flex h-full flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0B100] shadow-[0_10px_16px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
              <Icon size={24} strokeWidth={2.4} className="text-white" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#00E0A1]/25 bg-[#00E0A1]/12 px-3 py-1.5 text-[12px] font-bold text-[#B7FFEA] shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B7FFEA]" />
              {persentase}% kontribusi
            </div>
          </div>

          <div className="flex-1">
            <h3 className="max-w-[12ch] font-[Georgia,serif] text-[24px] leading-[1.02] text-white sm:text-[26px]">
              {nama}
            </h3>
            <p className="mt-3 text-[12px] leading-relaxed text-white/70 sm:text-[13px]">{deskripsi}</p>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Nominal</p>
              <p className="mt-1 text-[18px] font-bold text-white sm:text-[20px]" style={{ fontFamily: 'var(--font-upakarti)' }}>
                {nominal}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-[#00E0A1] sm:text-[12px]">
              <ChartNoAxesCombined size={14} strokeWidth={2.2} />
              stabil
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function PendapatanChart({ delayMs }: { delayMs: number }) {
  const totalValue = useMemo(() => {
    return pendapatanChartData.reduce((accumulator, current) => accumulator + current.value, 0)
  }, [])

  return (
    <article className="hero-reveal flex w-full flex-col items-center justify-center" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="relative aspect-square w-full max-w-60 sm:max-w-72">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,224,161,0.16)_0%,rgba(0,43,34,0.06)_55%,transparent_75%)] blur-3xl" />

        <ChartContainer config={pendapatanChartConfig} className="mx-auto h-full w-full">
          <PieChart>
            <defs>
              {pendapatanChartData.map((item) => (
                <linearGradient key={pendapatanChartGradientIds[item.source]} id={pendapatanChartGradientIds[item.source]} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={pendapatanChartConfig[item.source as keyof typeof pendapatanChartConfig]?.color} stopOpacity={1} />
                  <stop offset="100%" stopColor={pendapatanChartConfig[item.source as keyof typeof pendapatanChartConfig]?.color} stopOpacity={0.75} />
                </linearGradient>
              ))}
            </defs>

            <ChartTooltip
              cursor={false}
              content={<PendapatanChartTooltip />}
            />

            <Pie
              data={pendapatanChartData}
              dataKey="value"
              nameKey="source"
              innerRadius={75}
              outerRadius={110}
              strokeWidth={3}
              stroke="rgba(255,255,255,0.16)"
              paddingAngle={8}
              cornerRadius={6}
              isAnimationActive
              animationBegin={120}
              animationDuration={1100}
              animationEasing="ease-out"
            >
              {pendapatanChartData.map((entry) => (
                <Cell
                  key={entry.source}
                  fill={`url(#${pendapatanChartGradientIds[entry.source]})`}
                  className="transition-all duration-500 hover:opacity-90"
                />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold"
                          style={{ fontFamily: 'var(--font-upakarti)' }}
                        >
                          {totalValue}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
                          className="fill-white/55 text-[9px] font-bold uppercase tracking-[0.42em]"
                        >
                          Pendapatan
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </article>
  )
}

function PendapatanDesaSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
        <h2 className="hero-reveal whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.08] tracking-[0.01em] text-[#0B0D10] md:text-[30px] lg:text-[38px]" style={{ animationDelay: '40ms' }}>
          Pendapatan
          <br />
          Desa
        </h2>

        <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B0D10]/82 md:text-[13px] md:leading-7" style={{ animationDelay: '140ms' }}>
          Pendapatan desa merupakan rangkuman sumber penerimaan yang digunakan untuk membiayai penyelenggaraan pemerintahan,
          pembangunan, pembinaan masyarakat, dan pemberdayaan warga secara berkelanjutan.
        </p>

        <button
          type="button"
          aria-label="Informasi pendapatan desa"
          className="hero-reveal inline-flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-[#022F25] text-[#F3F8F6] shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(0,0,0,0.2)] md:h-14 md:w-14"
          style={{ animationDelay: '220ms' }}
        >
          <Landmark size={20} strokeWidth={2.4} />
        </button>
      </div>

      <div className="relative grid items-stretch gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] xl:gap-12">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#00E0A1]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#00B179]/10 blur-[110px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,224,161,0.05)_0%,transparent_70%)]" />

        <div className="relative z-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {pendapatanCards.map((item, idx) => (
            <PendapatanInfoCard
              key={item.nama}
              nama={item.nama}
              deskripsi={item.deskripsi}
              nominal={item.nominal}
              persentase={item.persentase}
              icon={item.icon}
              delayMs={120 + idx * 70}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(0,43,34,0.98)_0%,rgba(0,61,48,0.96)_55%,rgba(0,29,23,0.99)_100%)] p-6 shadow-[0_14px_28px_rgba(0,0,0,0.14)] backdrop-blur-md sm:p-8">
          <PendapatanChart delayMs={220} />
        </div>
      </div>
    </div>
  )
}

export function ApbdesSection() {
  return (
    <section
      className={
        sectionCardClass +
        ' rounded-[30px] border border-[#0B281F]/8 bg-[#E7E7E7] text-[#0B0D10] shadow-[0_14px_28px_rgba(11,40,31,0.1)]'
      }
    >
      <div className="mb-6 grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
        <h2 className="hero-reveal whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.08] tracking-[0.01em] text-[#0B0D10] md:text-[30px] lg:text-[38px]">
          APB Desa{`\n`}Pameutingan
        </h2>

        <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B0D10]/82 md:text-[13px] md:leading-7">
          APBDes Pameutingan merupakan informasi mengenai anggaran pendapatan dan belanja desa yang mencakup rincian pendapatan,
          belanja, dan pembiayaan sebagai dasar transparansi serta perencanaan pembangunan desa.
        </p>

        <div className="hero-reveal inline-flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-[#022F25] text-[#F3F8F6] shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(0,0,0,0.2)] md:h-14 md:w-14">
          <CircleDollarSign size={20} strokeWidth={2.4} />
        </div>
      </div>

      <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
        {apbdesCards.map((card, index) => {
          const isEmerald = card.tone === 'emerald'

          return (
            <article
              key={card.title}
              className={`hero-reveal group relative h-full overflow-hidden rounded-[20px] border border-white/12 p-4 text-[#F4F8F6] shadow-[0_14px_26px_rgba(0,0,0,0.16)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(0,0,0,0.22)] sm:p-5 md:min-h-62 ${
                isEmerald
                  ? 'bg-linear-to-br from-[#009E70] via-[#00885F] to-[#055E45]'
                  : 'bg-linear-to-br from-[#00170F] via-[#01241A] to-[#00110A]'
              }`}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <button
                type="button"
                aria-label={`Detail ${card.title.replace(/\n/g, ' ')}`}
                className="absolute right-4 top-4 z-10 inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-black/88 text-white shadow-[0_10px_18px_rgba(0,0,0,0.24)] transition-transform duration-300 ease-out hover:scale-105"
              >
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </button>

              <div className="pointer-events-none absolute -left-8 top-8 h-28 w-28 rounded-full bg-white/8 blur-2xl" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#00E0A1]/10 blur-3xl transition-all duration-500 group-hover:bg-[#00E0A1]/20" />

              <div className="relative flex h-full flex-col pt-2">
                <div className="flex-1">
                  <h3 className="max-w-[12ch] font-[Georgia,serif] text-[24px] font-bold leading-[1.02] tracking-[-0.01em] text-[#F3F8F6] sm:text-[26px] md:text-[27px] lg:text-[29px]">
                    {card.title}
                  </h3>

                  <p className="mt-3 max-w-none text-[11px] leading-normal text-[#EAF7F1]/85 sm:text-[12px] lg:text-[12px]">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-4">
                  <div
                    className={`relative overflow-hidden rounded-[14px] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 ${
                      isEmerald
                        ? 'bg-[radial-gradient(circle_at_28%_24%,rgba(0,224,161,0.42),rgba(0,106,75,0.86)_60%,rgba(2,52,38,0.98)_100%)]'
                        : 'bg-[radial-gradient(circle_at_28%_24%,rgba(0,132,94,0.2),rgba(1,46,33,0.9)_62%,rgba(1,24,17,0.98)_100%)]'
                    }`}
                  >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-22 w-22 rounded-full bg-white/10 blur-2xl" />
                    <p className="relative text-[14px] font-bold uppercase tracking-[0.04em] text-[#E8F7F1]/88 sm:text-[15px]" style={{ fontFamily: 'var(--font-upakarti)' }}>
                      RP.
                    </p>
                    <p className="relative mt-1 text-[28px] font-bold leading-[0.92] tracking-[-0.02em] text-[#F2FAF7] sm:text-[30px] lg:text-[34px]" style={{ fontFamily: 'var(--font-upakarti)' }}>
                      {card.amount}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-20 md:mt-24">
        <PendapatanDesaSection />
      </div>
    </section>
  )
}
