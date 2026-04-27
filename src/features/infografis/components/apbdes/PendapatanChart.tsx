import { useMemo } from 'react'
import { Cell, Label, Pie, PieChart } from 'recharts'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import {
  pendapatanChartData,
  pendapatanChartGradientIds,
  pendapatanChartConfig,
} from '../../config/apbdes-data'

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

export function PendapatanChart({ delayMs }: { delayMs: number }) {
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
