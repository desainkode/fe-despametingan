"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { KELOMPOK_UMUR_LABELS } from "../../config/penduduk-data";

interface KelompokUmurChartProps {
  title: string;
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  bars: number[];
  delayMs: number;
}

export function KelompokUmurChart({
  title,
  icon: Icon,
  bars,
  delayMs,
}: KelompokUmurChartProps) {
  const chartData = KELOMPOK_UMUR_LABELS.map((label, index) => {
    return {
      kelompok: label,
      total: bars[index] ?? 0,
    };
  });

  const chartConfig = {
    total: {
      label: "Jumlah",
      color: "#F0B100",
    },
  } satisfies ChartConfig;

  const gradientKey = title.includes("Laki") ? "umur-laki" : "umur-perempuan";

  return (
    <article className="hero-reveal group" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="mb-3.5 flex items-center gap-4 sm:mb-4 sm:gap-5">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 sm:h-18.5 sm:w-18.5">
          <div className="absolute inset-0.75 rounded-full border border-white/8" />
          <Icon size={24} strokeWidth={2.2} className="relative z-10" />
        </div>

        <h3 className="whitespace-pre-line font-[Georgia,serif] text-[31px] font-bold leading-[1.05] text-[#0B0D10] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
          {title}
        </h3>
      </div>

      <div className="relative overflow-hidden rounded-[20px] bg-linear-to-b from-[#FFFFFF] to-[#0B281F] p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-[0_18px_34px_rgba(0,0,0,0.16)] sm:p-5 md:p-6">
        <div className="absolute inset-5 rounded-2xl border border-white/10 bg-linear-to-b from-white/20 via-white/12 to-[#0B281F]/18 backdrop-blur-[2px]" />

        <div className="relative z-10">
          <ChartContainer
            config={chartConfig}
            className="h-90 w-full max-w-none aspect-auto!"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ top: 8, right: 16, left: 8, bottom: 16 }}
              barGap={2}
              barCategoryGap={10}
            >
              <defs>
                <linearGradient id={`${gradientKey}-total`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#009966" />
                  <stop offset="56%" stopColor="#8EA95A" />
                  <stop offset="100%" stopColor="#F0B100" />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal={false} vertical={false} />
              <YAxis
                dataKey="kelompok"
                type="category"
                tickLine={false}
                axisLine={false}
                width={64}
                tickMargin={8}
                tick={{
                  fill: "#000000",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "Georgia, serif",
                }}
              />
              <XAxis
                type="number"
                ticks={[0, 50, 100]}
                domain={[0, 100]}
                padding={{ left: 6, right: 10 }}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{
                  fill: "#000000",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "Georgia, serif",
                }}
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
                            {item?.payload?.total}
                          </span>
                        </div>
                      );
                    }}
                    labelFormatter={(label) => `Usia ${label}`}
                  />
                }
              />
              <Bar
                dataKey="total"
                fill={`url(#${gradientKey}-total)`}
                radius={[0, 6, 6, 0]}
                barSize={22}
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
