"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PENDIDIKAN_CHART_DATA } from "../../config/penduduk-data";

export function PendidikanChart({ delayMs }: { delayMs: number }) {
  const chartConfig = {
    jumlah: {
      label: "Jumlah",
    },
  } satisfies ChartConfig;

  return (
    <article className="hero-reveal w-full pt-4" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="relative overflow-hidden rounded-[20px] bg-linear-to-b from-[#FFFFFF] to-[#0B281F] p-4 sm:p-5 md:p-6">
        <div className="absolute inset-5 rounded-2xl border border-white/10 bg-linear-to-b from-white/20 via-white/12 to-[#0B281F]/18 backdrop-blur-[2px]" />

        <div className="relative z-10">
          <ChartContainer
            config={chartConfig}
            className="h-80 w-full max-w-none aspect-auto!"
          >
            <BarChart
              accessibilityLayer
              data={PENDIDIKAN_CHART_DATA}
              margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
              barSize={32}
            >
              <defs>
                <linearGradient id="pendidikan-total" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#009966" />
                  <stop offset="56%" stopColor="#8EA95A" />
                  <stop offset="100%" stopColor="#F0B100" />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis
                dataKey="tingkat"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#000000",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "Georgia, serif",
                }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#000000",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "Georgia, serif",
                }}
                ticks={[0, 100, 200, 300, 400, 500]}
                domain={[0, 520]}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    formatter={(_, __, item) => {
                      return (
                        <div className="flex w-full items-center justify-between gap-3">
                          <span className="text-[#111316]">Jumlah</span>
                          <span className="font-semibold text-[#111316]">
                            {item?.payload?.jumlah}
                          </span>
                        </div>
                      );
                    }}
                    labelFormatter={(label) => `${label}`}
                  />
                }
              />
              <Bar
                dataKey="jumlah"
                fill="url(#pendidikan-total)"
                radius={[6, 6, 0, 0]}
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
  );
}
