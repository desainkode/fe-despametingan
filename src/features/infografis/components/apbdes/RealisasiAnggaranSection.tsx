import { BarChart2 } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const chartData = [
  { bidang: 'Pemerintahan', anggaran: 300000000, realisasi: 280000000 },
  { bidang: 'Pembangunan', anggaran: 400000000, realisasi: 250000000 },
  { bidang: 'Pembinaan', anggaran: 100000000, realisasi: 85000000 },
  { bidang: 'Pemberdayaan', anggaran: 100000000, realisasi: 70000000 },
  { bidang: 'Bencana/Darurat', anggaran: 100000000, realisasi: 20000000 },
]

const chartConfig = {
  anggaran: {
    label: 'Anggaran',
    color: '#D4DFD9', // Light gray/greenish
  },
  realisasi: {
    label: 'Realisasi',
    color: '#00E0A1', // Emerald green
  },
} satisfies ChartConfig

export function RealisasiAnggaranSection() {
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
        <h2
          className="hero-reveal whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.08] tracking-[0.01em] text-[#0B0D10] md:text-[30px] lg:text-[38px]"
          style={{ animationDelay: '40ms' }}
        >
          Realisasi
          <br />
          Anggaran
        </h2>
        <p
          className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B0D10]/82 md:text-[13px] md:leading-7"
          style={{ animationDelay: '140ms' }}
        >
          Perbandingan proporsional antara total Anggaran yang direncanakan dengan Realisasi penyerapan dana pada setiap bidang, disajikan secara transparan.
        </p>
        <button
          type="button"
          aria-label="Informasi realisasi anggaran"
          className="hero-reveal inline-flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-[#022F25] text-[#F3F8F6] shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(0,0,0,0.2)] md:h-14 md:w-14"
          style={{ animationDelay: '220ms' }}
        >
          <BarChart2 size={20} strokeWidth={2.4} />
        </button>
      </div>

      <div
        className="hero-reveal relative overflow-hidden rounded-[20px] bg-linear-to-b from-[#FFFFFF] to-[#0B281F] p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(0,0,0,0.16)] sm:p-6 lg:p-8"
        style={{ animationDelay: '300ms' }}
      >
        <div className="absolute inset-4 sm:inset-5 rounded-2xl border border-white/10 bg-linear-to-b from-white/20 via-white/12 to-[#0B281F]/18 backdrop-blur-[2px]" />

        <div className="relative z-10">
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ top: 8, right: 16, bottom: 8, left: 10 }}
              barGap={4}
            >
              <defs>
                <linearGradient id="realisasi-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#009966" />
                  <stop offset="56%" stopColor="#8EA95A" />
                  <stop offset="100%" stopColor="#F0B100" />
                </linearGradient>
                <linearGradient id="anggaran-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#233525ff" />
                  <stop offset="100%" stopColor="#00E0A1" />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal={false} vertical={false} />
              <YAxis
                dataKey="bidang"
                type="category"
                tickLine={false}
                axisLine={false}
                width={120}
                tick={{ fill: '#000000', fontSize: 13, fontWeight: 700, fontFamily: 'Georgia, serif' }}
              />
              <XAxis type="number" hide />
              <ChartTooltip
                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value, name, item, index, payload) => {
                      const formattedValue = new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0,
                      }).format(value as number)

                      let percentageString = ''
                      if (name === 'realisasi' && item.payload && item.payload.anggaran) {
                        const pct = ((value as number) / item.payload.anggaran) * 100
                        percentageString = ` (${pct.toFixed(1)}%)`
                      }

                      return (
                        <div className="flex w-full justify-between gap-4">
                          <span className="font-medium text-muted-foreground capitalize">
                            {name}
                          </span>
                          <span className="font-bold text-foreground">
                            {formattedValue}
                            <span className="text-[10px] font-normal text-muted-foreground">
                              {percentageString}
                            </span>
                          </span>
                        </div>
                      )
                    }}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} className="pt-4 text-white" />
              <Bar
                dataKey="anggaran"
                fill="url(#anggaran-gradient)"
                radius={[0, 6, 6, 0]}
                barSize={20}
                isAnimationActive
                animationDuration={1100}
                animationBegin={120}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="realisasi"
                fill="url(#realisasi-gradient)"
                radius={[0, 6, 6, 0]}
                barSize={20}
                isAnimationActive
                animationDuration={1100}
                animationBegin={220}
                animationEasing="ease-out"
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  )
}
