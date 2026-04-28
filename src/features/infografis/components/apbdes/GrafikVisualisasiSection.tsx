import * as React from 'react'
import { PieChartIcon, ArrowUpRight, BarChart3 } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

// Data Simulasi Pendapatan
const pendapatanData = [
  { sumber: 'dd', label: 'Dana Desa', value: 45 },
  { sumber: 'add', label: 'Alokasi Dana Desa', value: 30 },
  { sumber: 'pad', label: 'Pendapatan Asli Desa', value: 15 },
  { sumber: 'banprov', label: 'Bantuan Provinsi', value: 10 },
]

const pieConfig = {
  dd: { label: 'Dana Desa', color: '#00E0A1' },
  add: { label: 'Alokasi Dana Desa', color: '#F0B100' },
  pad: { label: 'Pendapatan Asli', color: '#FFFFFF' },
  banprov: { label: 'Bantuan Provinsi', color: '#34D399' },
} satisfies ChartConfig

// Data Simulasi Belanja
const belanjaData = [
  { bidang: 'Pembangunan', total: 400000000 },
  { bidang: 'Pemerintahan', total: 300000000 },
  { bidang: 'Pembinaan', total: 100000000 },
  { bidang: 'Pemberdayaan', total: 100000000 },
  { bidang: 'Bencana', total: 100000000 },
]

const barConfig = {
  total: { label: 'Belanja', color: '#00E0A1' },
} satisfies ChartConfig

export function GrafikVisualisasiSection() {
  const totalPieValue = React.useMemo(() => {
    return pendapatanData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      {/* Header Section */}
      <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
        <h2
          className="hero-reveal whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.08] tracking-[0.01em] text-[#0B0D10] md:text-[30px] lg:text-[38px]"
          style={{ animationDelay: '40ms' }}
        >
          Grafik &
          <br />
          Visualisasi
        </h2>
        <p
          className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B0D10]/82 md:text-[13px] md:leading-7"
          style={{ animationDelay: '140ms' }}
        >
          Diagram interaktif yang menyajikan porsi sumber pendapatan dan alokasi
          belanja desa agar ringkasan APBDes lebih mudah dipahami oleh seluruh
          warga masyarakat.
        </p>
        <button
          type="button"
          aria-label="Informasi grafik dan visualisasi"
          className="hero-reveal inline-flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-[#022F25] text-[#F3F8F6] shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(0,0,0,0.2)] md:h-14 md:w-14"
          style={{ animationDelay: '220ms' }}
        >
          <PieChartIcon size={20} strokeWidth={2.4} />
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        
        {/* PIE CHART (PENDAPATAN) */}
        <article
          className="hero-reveal group relative overflow-hidden rounded-[24px] border border-[#0B281F]/10 bg-linear-to-br from-[#0B281F] to-[#174738] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.2)] sm:p-8"
          style={{ animationDelay: '300ms' }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-[Georgia,serif] text-[20px] font-bold text-white sm:text-[24px]">
              Pendapatan Desa
            </h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm">
              <ArrowUpRight size={20} />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[280px] aspect-square">
            <div className="absolute inset-0 rounded-full bg-[#00E0A1]/10 blur-3xl" />
            <ChartContainer config={pieConfig} className="mx-auto h-full w-full">
              <PieChart>
                <defs>
                  {pendapatanData.map((item) => (
                    <linearGradient
                      key={`grad-${item.sumber}`}
                      id={`grad-${item.sumber}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={
                          pieConfig[item.sumber as keyof typeof pieConfig]?.color
                        }
                        stopOpacity={1}
                      />
                      <stop
                        offset="100%"
                        stopColor={
                          pieConfig[item.sumber as keyof typeof pieConfig]?.color
                        }
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  ))}
                </defs>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      className="rounded-xl border-white/20 bg-black/90 text-white backdrop-blur-xl"
                    />
                  }
                />
                <Pie
                  data={pendapatanData}
                  dataKey="value"
                  nameKey="sumber"
                  innerRadius="65%"
                  outerRadius="90%"
                  strokeWidth={4}
                  stroke="rgba(255,255,255,0.05)"
                  paddingAngle={6}
                  cornerRadius={6}
                >
                  {pendapatanData.map((entry) => (
                    <Cell
                      key={entry.sumber}
                      fill={`url(#grad-${entry.sumber})`}
                      className="transition-all duration-500 hover:opacity-80"
                    />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-white text-4xl font-bold"
                              style={{ fontFamily: 'var(--font-upakarti)' }}
                            >
                              {totalPieValue}%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-white/50 text-[10px] font-bold uppercase tracking-[0.3em]"
                            >
                              TOTAL
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

          <div className="mt-8 flex w-full flex-wrap justify-center gap-x-3 gap-y-3">
            {pendapatanData.map((item) => (
              <div
                key={item.sumber}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-3 pr-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
              >
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                  style={{
                    backgroundColor:
                      pieConfig[item.sumber as keyof typeof pieConfig]?.color,
                  }}
                />
                <div className="flex items-baseline gap-2">
                  <span className="text-[12px] font-medium text-white/80">
                    {item.label}
                  </span>
                  <span className="text-[13px] font-bold text-[#00E0A1]">
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* BAR CHART (BELANJA) */}
        <article
          className="hero-reveal group relative flex flex-col overflow-hidden rounded-[24px] bg-linear-to-b from-[#FFFFFF] to-[#0B281F] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.1)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.15)] sm:p-6 lg:p-8"
          style={{ animationDelay: '400ms' }}
        >
          <div className="absolute inset-4 sm:inset-5 rounded-2xl border border-white/10 bg-linear-to-b from-white/30 via-white/15 to-[#0B281F]/20 backdrop-blur-[2px]" />

          <div className="relative z-10 flex-1 flex flex-col">
            <div className="mb-4 flex items-center justify-between sm:mb-6">
              <h3 className="font-[Georgia,serif] text-[20px] font-bold text-[#0B0D10] sm:text-[24px]">
                Belanja Desa
              </h3>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[#0B0D10] backdrop-blur-sm">
                <BarChart3 size={20} />
              </div>
            </div>

            <div className="flex-1 min-h-[300px]">
              <ChartContainer
                config={barConfig}
                className="h-[300px] w-full max-w-none !aspect-auto"
              >
                <BarChart
                  accessibilityLayer
                  data={belanjaData}
                  layout="vertical"
                  margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
                  barGap={2}
                  barCategoryGap={16}
                >
                  <defs>
                    <linearGradient id="belanja-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#009966" />
                      <stop offset="56%" stopColor="#8EA95A" />
                      <stop offset="100%" stopColor="#F0B100" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid horizontal={false} vertical={false} />
                  <YAxis
                    dataKey="bidang"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={95}
                    tickMargin={8}
                    tick={{
                      fill: '#000000',
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily: 'Georgia, serif',
                    }}
                  />
                  <XAxis type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        formatter={(value) => {
                          const formattedValue = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            maximumFractionDigits: 0,
                          }).format(value as number)
                          return (
                            <div className="flex w-full items-center justify-between gap-4">
                              <span className="text-[#111316]">Jumlah</span>
                              <span className="font-semibold text-[#111316]">
                                {formattedValue}
                              </span>
                            </div>
                          )
                        }}
                      />
                    }
                  />
                  <Bar
                    dataKey="total"
                    fill="url(#belanja-gradient)"
                    radius={[0, 6, 6, 0]}
                    barSize={24}
                    isAnimationActive
                    animationDuration={1100}
                    animationBegin={120}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
