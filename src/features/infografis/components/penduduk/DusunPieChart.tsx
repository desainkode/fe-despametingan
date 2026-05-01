"use client";

import React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DUSUN_CHART_DATA } from "../../config/penduduk-data";

export function DusunPieChart({ delayMs }: { delayMs: number }) {
  const chartConfig = {
    dusun1: { label: "Dusun Pameutingan", color: "#00E0A1" },
    dusun2: { label: "Dusun Citalem", color: "#F0B100" },
    dusun3: { label: "Dusun Pencut", color: "#FFFFFF" },
    dusun4: { label: "Dusun Mekarjaya", color: "#34D399" },
  };

  const totalValue = React.useMemo(() => {
    return DUSUN_CHART_DATA.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <article className="hero-reveal flex w-full flex-col items-center justify-center" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="relative aspect-square w-full max-w-60 sm:max-w-70">
        <div className="absolute inset-0 rounded-full bg-[#00E0A1]/5 blur-3xl" />
        <ChartContainer config={chartConfig as ChartConfig} className="mx-auto h-full w-full">
          <PieChart>
            <defs>
              {DUSUN_CHART_DATA.map((item) => (
                <linearGradient key={`grad-${item.dusun}`} id={`grad-${item.dusun}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={chartConfig[item.dusun as keyof typeof chartConfig]?.color} stopOpacity={1} />
                  <stop offset="100%" stopColor={chartConfig[item.dusun as keyof typeof chartConfig]?.color} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="rounded-xl border-white/20 bg-black/90 backdrop-blur-xl" />}
            />
            <Pie
              data={DUSUN_CHART_DATA}
              dataKey="value"
              nameKey="dusun"
              innerRadius={75}
              outerRadius={110}
              strokeWidth={4}
              stroke="rgba(255,255,255,0.05)"
              paddingAngle={8}
              cornerRadius={6}
            >
              {DUSUN_CHART_DATA.map((entry) => (
                <Cell key={entry.dusun} fill={`url(#grad-${entry.dusun})`} className="transition-all duration-500 hover:opacity-80" />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-white text-4xl font-bold" style={{ fontFamily: "var(--font-upakarti)" }}>
                          {totalValue}%
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 22} className="fill-white/40 text-[9px] font-bold uppercase tracking-[0.4em]">
                          DATA
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      <div className="mt-8 flex w-full flex-wrap justify-center gap-x-4 gap-y-3">
        {DUSUN_CHART_DATA.map((item) => (
          <div key={item.dusun} className="flex items-center gap-2 rounded-full border border-white/5 bg-white/3 py-1.5 pl-2.5 pr-3.5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="h-2 w-2 shrink-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]" style={{ backgroundColor: chartConfig[item.dusun as keyof typeof chartConfig]?.color }} />
            <div className="flex items-baseline gap-2">
              <span className="text-[12px] font-medium text-white/70" style={{ fontFamily: "var(--font-upakarti)" }}>
                {item.label.replace("Dusun ", "")}
              </span>
              <span className="text-[13px] font-bold text-[#00E0A1]">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
