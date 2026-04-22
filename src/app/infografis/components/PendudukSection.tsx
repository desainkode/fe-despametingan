"use client";

import * as React from "react";
import { Info } from "lucide-react";
import {
  Building2,
  ChartNoAxesCombined,
  GraduationCap,
  House,
  Mars,
  MapPinned,
  Users,
  Venus,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Label, Pie, PieChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { sectionCardClass } from "./section-ui";

const kartuDemografi: Array<{
  label: string;
  angka: string;
  bgColor: string;
  textColor: string;
  labelColor: string;
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
}> = [
    {
      label: "Total\nPenduduk",
      angka: "3.542",
      bgColor: "#D9D9D9",
      textColor: "#070C10",
      labelColor: "#070C10",
      icon: Users,
    },
    {
      label: "Total\nDusun",
      angka: "4",
      bgColor: "#F0B100",
      textColor: "#FEFEFE",
      labelColor: "#FEFEFE",
      icon: House,
    },
    {
      label: "Total\nKepala Keluarga",
      angka: "1.087",
      bgColor: "#009966",
      textColor: "#FEFEFE",
      labelColor: "#FEFEFE",
      icon: Building2,
    },
    {
      label: "Total\nWilayah RT/RW",
      angka: "12/5",
      bgColor: "#006045",
      textColor: "#FEFEFE",
      labelColor: "#FEFEFE",
      icon: MapPinned,
    },
  ];

const kartuJumlahPenduduk: Array<{
  label: string;
  angka: string;
  tone: "light" | "dark";
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
}> = [
    {
      label: "Total Penduduk",
      angka: "3.542",
      tone: "light",
      icon: Users,
    },
    {
      label: "Laki-laki",
      angka: "3.542",
      tone: "light",
      icon: House,
    },
    {
      label: "Perempuan",
      angka: "3.542",
      tone: "dark",
      icon: Building2,
    },
    {
      label: "Kepala Keluarga",
      angka: "3.542",
      tone: "light",
      icon: House,
    },
    {
      label: "Mutasi Penduduk",
      angka: "3.542",
      tone: "light",
      icon: MapPinned,
    },
    {
      label: "Penduduk Sementara",
      angka: "3.542",
      tone: "dark",
      icon: Users,
    },
  ];

const kelompokUmurLabels = [
  "80-84",
  "70-74",
  "60-64",
  "50-54",
  "40-44",
  "30-34",
  "20-24",
  "10-14",
  "0-4",
];

const diagramKelompokUmur: Array<{
  title: string;
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  bars: number[];
}> = [
    {
      title: "Diagram Umur\nLaki - Laki",
      icon: Mars,
      bars: [100, 50, 83, 94, 67, 90, 97, 46, 64],
    },
    {
      title: "Diagram Umur\nPerempuan",
      icon: Venus,
      bars: [97, 48, 81, 91, 65, 87, 100, 45, 62],
    },
  ];

const berdasarkanDusunCards: Array<{
  kode: string;
  nama: string;
  deskripsi: string;
  persentase: number;
}> = [
    {
      kode: "01",
      nama: "Dusun Pameutingan",
      deskripsi: "Sebaran umur warga untuk mendukung program desa.",
      persentase: 30,
    },
    {
      kode: "02",
      nama: "Dusun Citalem",
      deskripsi: "Jumlah warga berdasarkan usia untuk perencanaan dusun.",
      persentase: 18,
    },
    {
      kode: "03",
      nama: "Dusun Pencut",
      deskripsi: "Data usia warga untuk melihat kebutuhan masyarakat.",
      persentase: 24,
    },
    {
      kode: "04",
      nama: "Dusun Mekarjaya",
      deskripsi: "Kelompok usia warga sebagai dasar pembangunan dusun.",
      persentase: 28,
    },
  ];

const dusunChartData = [
  { dusun: "dusun1", label: "Dusun Pameutingan", value: 30, fill: "var(--color-dusun1)" },
  { dusun: "dusun2", label: "Dusun Citalem", value: 18, fill: "var(--color-dusun2)" },
  { dusun: "dusun4", label: "Dusun Mekarjaya", value: 28, fill: "var(--color-dusun4)" },
];

const pendidikanChartData = [
  { tingkat: "Tidak Sekolah", jumlah: 120 },
  { tingkat: "SD/MI", jumlah: 450 },
  { tingkat: "SMP/MTS", jumlah: 380 },
  { tingkat: "SMA/SMK/MA", jumlah: 520 },
  { tingkat: "D1", jumlah: 40 },
  { tingkat: "D2", jumlah: 35 },
  { tingkat: "D3", jumlah: 150 },
  { tingkat: "S1/D4", jumlah: 310 },
  { tingkat: "S2", jumlah: 45 },
  { tingkat: "S3", jumlah: 10 },
];

function DemografiCard({
  label,
  angka,
  bgColor,
  textColor,
  labelColor,
  icon: Icon,
  delayMs,
}: {
  label: string;
  angka: string;
  bgColor: string;
  textColor: string;
  labelColor: string;
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  delayMs: number;
}) {
  return (
    <article
      className="hero-reveal relative h-75.5 w-62.5 shrink-0 transform-gpu transition-transform duration-300 ease-out hover:-translate-y-1"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <svg
        viewBox="0 0 288 347"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 17C0 7.61117 7.61116 0 17 0H182.991C196.74 0 206.049 17.9028 206.049 31.652C206.049 59.4921 228.588 82.0608 256.39 82.0608C270.113 82.0608 288 91.3484 288 105.071V330C288 339.389 280.389 347 271 347H17C7.61116 347 0 339.389 0 330V17Z"
          fill={bgColor}
        />
      </svg>

      <div className="absolute left-[8%] top-[8.6%] h-[84.4%] w-[84.7%] rounded-[14px] border border-white/20 bg-linear-to-br from-white/24 via-white/13 to-white/8 backdrop-blur-[2px] shadow-[inset_0_10px_20px_rgba(255,255,255,0.16),inset_0_-10px_18px_rgba(0,0,0,0.14)]" />
      <div className="pointer-events-none absolute left-[13%] top-[13%] h-[21%] w-[60%] rounded-xl bg-linear-to-b from-white/26 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute bottom-[11%] right-[8%] h-[22%] w-[34%] rounded-full bg-[#6FF2C9]/12 blur-[14px]" />

      <div className="absolute left-[17%] top-[20.5%]">
        <div className="flex flex-col items-start justify-center gap-8" style={{ color: textColor }}>
          <h3
            className="whitespace-pre-line font-[Georgia,serif] text-[19px] font-bold leading-[1.2]"
            style={{ color: labelColor }}
          >
            {label}
          </h3>

          <p
            className="text-[60px] leading-[0.9]"
            style={{ fontFamily: "var(--font-upakarti)" }}
          >
            {angka}
          </p>
        </div>
      </div>

      <div className="absolute left-[76.5%] top-0 z-10 flex h-14.5 w-14.5 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.22)]">
        <Icon size={21} strokeWidth={2.2} />
      </div>
    </article>
  );
}

function JumlahPendudukCard({
  label,
  angka,
  tone,
  icon: Icon,
  delayMs,
}: {
  label: string;
  angka: string;
  tone: "light" | "dark";
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  delayMs: number;
}) {
  const isDark = tone === "dark";

  return (
    <article
      className={`hero-reveal relative isolate h-67.5 overflow-hidden rounded-tl-[28px] rounded-br-[28px]  p-6 sm:h-75 md:h-80 ${isDark
        ? "bg-linear-to-br from-[#001F18] via-[#003326] to-[#005239] text-[#F3F8F6]"
        : "bg-[#D9D9D9] text-[#070C10]"
        }`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-28 w-28 rotate-45 bg-[#FFFFFF]" />
      <div className="pointer-events-none absolute -bottom-14 -left-14 h-28 w-28 rotate-45 bg-[#FFFFFF]" />

      <div
        className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_6px_14px_rgba(11,40,31,0.12)] ${isDark
          ? "border-white/18 bg-[#0B281F]/48 text-[#EAF7F1]"
          : "border-[#0B281F]/8 bg-white/42 text-[#0B281F]"
          }`}
      >
        <Icon size={18} strokeWidth={2.1} />
      </div>

      <div className="relative mt-6 flex h-[calc(100%-4.75rem)] flex-col justify-between">
        <div>
          <div className={`mb-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 ${isDark ? "bg-[#009966] text-white" : "bg-[#0B281F] text-white"}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#F0B100]" />
            <span className="text-[11px] leading-none" style={{ fontFamily: "var(--font-upakarti)" }}>
              Jiwa
            </span>
          </div>

          <p
            className="text-[54px] leading-[0.9] sm:text-[58px]"
            style={{ fontFamily: "var(--font-upakarti)" }}
          >
            {angka}
          </p>

          <h3 className="mt-3 font-[Georgia,serif] text-[19px] font-bold leading-[1.15] sm:text-[21px] md:text-[23px]">
            {label}
          </h3>
        </div>

        <p className={`self-end text-right text-[12px] leading-tight ${isDark ? "text-[#F5F7F6]/85" : "text-[#070C10]/72"}`}>
          Terdata
          <br />
          oleh sistem
        </p>
      </div>
    </article>
  );
}

function KelompokUmurChart({
  title,
  icon: Icon,
  bars,
  delayMs,
}: {
  title: string;
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  bars: number[];
  delayMs: number;
}) {
  const chartData = kelompokUmurLabels.map((label, index) => {
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
    <article className="hero-reveal" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="mb-3.5 flex items-center gap-4 sm:mb-4 sm:gap-5">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.22)] sm:h-18.5 sm:w-18.5">
          <div className="absolute inset-0.75 rounded-full border border-white/8" />
          <Icon size={24} strokeWidth={2.2} className="relative z-10" />
        </div>

        <h3 className="whitespace-pre-line font-[Georgia,serif] text-[31px] font-bold leading-[1.05] text-[#0B0D10]">
          {title}
        </h3>
      </div>

      <div className="relative overflow-hidden rounded-[20px] bg-linear-to-b from-[#FFFFFF] to-[#0B281F] p-4 sm:p-5 md:p-6">
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

function DusunInfoCard({
  kode,
  nama,
  deskripsi,
  persentase,
  delayMs,
}: {
  kode: string;
  nama: string;
  deskripsi: string;
  persentase: number;
  delayMs: number;
}) {
  return (
    <article className="hero-reveal group relative pt-4" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="absolute -left-3 -top-5 z-20 inline-flex h-17 w-19 items-start justify-start rounded-xl bg-[#F0B100] px-2.5 pt-1 shadow-[0_10px_16px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
        <span className="text-[38px] leading-none text-white" style={{ fontFamily: "var(--font-upakarti)" }}>
          {kode}
        </span>
      </div>

      <span className="absolute right-2 top-1 z-30 inline-flex items-center gap-1.5 rounded-full bg-[#00E0A1] px-3 py-1 text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-white/20">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        {persentase}%
      </span>

      <div className="relative z-10 min-h-38 overflow-hidden rounded-[24px] border border-white/10 bg-linear-to-br from-white/15 via-white/5 to-transparent px-5 pb-5 pt-7 shadow-[0_20px_40px_rgba(0,0,0,0.15)] backdrop-blur-[8px] transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00E0A1]/15 blur-2xl transition-all duration-500 group-hover:bg-[#00E0A1]/25" />

        <div className="relative">
          <h3 className="font-[Georgia,serif] text-[34px] leading-[0.85] text-white">
            <span className="block text-[38px] opacity-70">Dusun</span>
            <span className="mt-1 block font-bold tracking-tight">{nama.replace("Dusun ", "")}</span>
          </h3>
          <p className="mt-3 text-[13px] leading-relaxed text-white/70">{deskripsi}</p>
        </div>
      </div>
    </article>
  );
}

function DusunPieChart({ delayMs }: { delayMs: number }) {
  const chartConfig = {
    dusun1: { label: "Dusun Pameutingan", color: "#00E0A1" },
    dusun2: { label: "Dusun Citalem", color: "#F0B100" },
    dusun3: { label: "Dusun Pencut", color: "#FFFFFF" },
    dusun4: { label: "Dusun Mekarjaya", color: "#34D399" },
  };

  const totalValue = React.useMemo(() => {
    return dusunChartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <article className="hero-reveal flex w-full flex-col items-center justify-center" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="relative aspect-square w-full max-w-[240px] sm:max-w-[280px]">
        <div className="absolute inset-0 rounded-full bg-[#00E0A1]/5 blur-3xl" />
        <ChartContainer config={chartConfig as ChartConfig} className="mx-auto h-full w-full">
          <PieChart>
            <defs>
              {dusunChartData.map((item) => (
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
              data={dusunChartData}
              dataKey="value"
              nameKey="dusun"
              innerRadius={75}
              outerRadius={110}
              strokeWidth={4}
              stroke="rgba(255,255,255,0.05)"
              paddingAngle={8}
              cornerRadius={6}
            >
              {dusunChartData.map((entry) => (
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
        {dusunChartData.map((item) => (
          <div key={item.dusun} className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] py-1.5 pl-2.5 pr-3.5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
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

function PendidikanChart({ delayMs }: { delayMs: number }) {
  const chartConfig = {
    jumlah: {
      label: "Jumlah",
    },
  };

  return (
    <article className="hero-reveal w-full pt-4" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-[#002B22] via-[#004234] to-[#001A14] p-6 sm:p-8 md:p-10">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#00E0A1]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#F0B100]/10 blur-[110px]" />
        
        <div className="relative z-10">
          <div className="mb-10 text-center md:text-left md:flex md:items-center md:justify-between">
            <div>
              <h3 className="font-[Georgia,serif] text-[28px] leading-[1.2] text-white md:text-[32px]">
                Statistik Pendidikan
              </h3>
              <p className="mt-2 text-[13px] text-white/60 max-w-lg">
                Sebaran tingkat pendidikan warga sebagai dasar perencanaan program peningkatan SDM dan kesejahteraan desa.
              </p>
            </div>
            <div className="hidden md:flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#00E0A1]/10 backdrop-blur-md">
              <GraduationCap className="text-[#00E0A1]" size={32} />
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ChartContainer config={chartConfig as ChartConfig} className="h-full w-full">
              <BarChart
                data={pendidikanChartData}
                margin={{ top: 20, right: 0, left: -20, bottom: 20 }}
                barSize={32}
              >
                <defs>
                  <linearGradient id="pendidikanGrad" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#00E0A1" />
                    <stop offset="100%" stopColor="#F0B100" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="tingkat" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "var(--font-upakarti)" }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  content={<ChartTooltipContent className="rounded-xl border-white/20 bg-black/90 backdrop-blur-xl" />}
                />
                <Bar 
                  dataKey="jumlah" 
                  fill="url(#pendidikanGrad)" 
                  radius={[6, 6, 0, 0]} 
                  className="transition-all duration-500 hover:opacity-80"
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PendudukSection() {
  return (
    <div className="space-y-8" id="penduduk">
      <div className={sectionCardClass + " bg-white"}>
        <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
          <h2
            className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]"
            style={{ animationDelay: "40ms" }}
          >
            Demografi
            <br />
            Penduduk
          </h2>

          <p
            className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7"
            style={{ animationDelay: "140ms" }}
          >
            Demografi Penduduk merupakan penyajian data kependudukan yang
            transparan, akurat, dan terintegrasi guna mendukung proses
            perencanaan pembangunan, pengambilan kebijakan, serta evaluasi
            program secara tepat sasaran.
          </p>

          <button
            type="button"
            aria-label="Informasi demografi penduduk"
            className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5"
            style={{ animationDelay: "220ms" }}
          >
            <Info size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-7 overflow-x-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            className="mx-auto flex w-max min-w-full items-start justify-start xl:justify-center"
            style={{
              maxWidth: 1120,
              minHeight: 308,
              paddingTop: 4,
              paddingBottom: 4,
              gap: 65,
            }}
          >
            {kartuDemografi.map((item, idx) => (
              <DemografiCard
                key={`${item.label}-${idx}`}
                label={item.label}
                angka={item.angka}
                bgColor={item.bgColor}
                textColor={item.textColor}
                labelColor={item.labelColor}
                icon={item.icon}
                delayMs={300 + idx * 100}
              />
            ))}
          </div>
        </div>
      </div>

      <section className={sectionCardClass + " bg-[#FFFFFF]"}>
        <div className="flex flex-col gap-7">
          <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
            <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
              Jumlah
              <br />
              Penduduk
            </h2>

            <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
              Jumlah Penduduk merupakan penyajian data mengenai total populasi
              yang ditampilkan secara transparan, akurat, dan terintegrasi guna
              mendukung proses perencanaan pembangunan, pengambilan kebijakan,
              serta evaluasi program secara tepat sasaran.
            </p>

            <button
              type="button"
              aria-label="Informasi jumlah penduduk"
              className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Info size={22} strokeWidth={2.2} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {kartuJumlahPenduduk.map((item, idx) => (
              <JumlahPendudukCard
                key={`${item.label}-${idx}`}
                label={item.label}
                angka={item.angka}
                tone={item.tone}
                icon={item.icon}
                delayMs={120 + idx * 80}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={sectionCardClass + " bg-[#ffffff]"}>
        <div className="flex flex-col gap-7">
          <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
            <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
              Berdasarkan
              <br />
              Kelompok Umur
            </h2>

            <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
              Kelompok Umur merupakan penyajian data penduduk berdasarkan
              rentang usia tertentu yang ditampilkan secara transparan, akurat,
              dan terintegrasi guna mendukung proses perencanaan pembangunan,
              pengambilan kebijakan, serta evaluasi program secara tepat
              sasaran.
            </p>

            <button
              type="button"
              aria-label="Informasi kelompok umur"
              className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <ChartNoAxesCombined size={22} strokeWidth={2.2} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5">
            {diagramKelompokUmur.map((item, idx) => (
              <KelompokUmurChart
                key={`${item.title}-${idx}`}
                title={item.title}
                icon={item.icon}
                bars={item.bars}
                delayMs={120 + idx * 80}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={sectionCardClass + " bg-[#ffffff]"}>
        <div className="flex flex-col gap-7">
          <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
            <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
              Berdasarkan
              <br />
              Dusun
            </h2>

            <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
              Berdasarkan Dusun merupakan penyajian data penduduk menurut
              rentang usia di setiap dusun yang disajikan secara transparan dan
              akurat untuk mendukung perencanaan dan pengambilan kebijakan
              secara tepat sasaran.
            </p>

            <button
              type="button"
              aria-label="Informasi berdasarkan dusun"
              className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <ChartNoAxesCombined size={22} strokeWidth={2.2} />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-[#002B22] via-[#004234] to-[#001A14] px-6 py-10 sm:px-10 sm:py-14 md:px-12 md:py-16">
            <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#00E0A1]/10 blur-[100px]" />
            <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#00B179]/10 blur-[110px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,224,161,0.05)_0%,transparent_70%)]" />

            <div className="relative z-10 grid items-stretch gap-10 xl:grid-cols-[1fr_minmax(280px,0.6fr)] xl:gap-16">
              <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                {berdasarkanDusunCards.map((item, idx) => (
                  <DusunInfoCard
                    key={`${item.kode}-${item.nama}`}
                    kode={item.kode}
                    nama={item.nama}
                    deskripsi={item.deskripsi}
                    persentase={item.persentase}
                    delayMs={120 + idx * 70}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center justify-center rounded-[28px] border border-white/5 bg-white/[0.02] p-8 shadow-3xl backdrop-blur-md">
                <DusunPieChart delayMs={220} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionCardClass + " bg-[#ffffff]"}>
        <div className="flex flex-col gap-7">
          <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
            <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
              Berdasarkan
              <br />
              Pendidikan
            </h2>

            <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
              Berdasarkan Pendidikan merupakan penyajian data penduduk menurut
              tingkat pendidikan terakhir yang disajikan secara transparan dan
              akurat untuk mendukung perencanaan pembangunan desa.
            </p>

            <button
              type="button"
              aria-label="Informasi berdasarkan pendidikan"
              className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <GraduationCap size={22} strokeWidth={2.2} />
            </button>
          </div>

          <PendidikanChart delayMs={120} />
        </div>
      </section>
    </div>
  );
}
