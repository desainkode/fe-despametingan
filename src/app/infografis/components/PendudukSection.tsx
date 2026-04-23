"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpenText, Info, X } from "lucide-react";
import {
  Building2,
  CheckCircle2,
  ChartNoAxesCombined,
  Church,
  CircleOff,
  Cross,
  Flower2,
  GraduationCap,
  HeartHandshake,
  House,
  Mars,
  MoonStar,
  MapPinned,
  Paperclip,
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
import { Briefcase } from "lucide-react";

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

const pekerjaanTopCards: Array<{
  nama: string;
  jumlah: string;
  rank: "TOP 1" | "TOP 2" | "TOP 3";
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
}> = [
  {
    nama: "Belum Bekerja",
    jumlah: "3.542",
    rank: "TOP 1",
    icon: Users,
  },
  {
    nama: "Petani",
    jumlah: "3.542",
    rank: "TOP 2",
    icon: Users,
  },
  {
    nama: "Buruh",
    jumlah: "3.542",
    rank: "TOP 3",
    icon: Users,
  },
];

const pekerjaanKiriBahasan: Array<{
  kode: string;
  nama: string;
  jumlah: string;
  persentase: number;
}> = [
  {
    kode: "01",
    nama: "Tidak/Belum Bekerja",
    jumlah: "3.542",
    persentase: 88,
  },
  {
    kode: "02",
    nama: "Petani",
    jumlah: "3.542",
    persentase: 77,
  },
  {
    kode: "03",
    nama: "Buruh Tani",
    jumlah: "3.542",
    persentase: 89,
  },
  {
    kode: "04",
    nama: "Peternak",
    jumlah: "3.542",
    persentase: 85,
  },
  {
    kode: "05",
    nama: "Pedagang",
    jumlah: "3.542",
    persentase: 80,
  },
];

const pekerjaanKananBahasan: Array<{
  kode: string;
  nama: string;
  jumlah: string;
  persentase: number;
}> = [
  {
    kode: "01",
    nama: "Karyawan Swasta",
    jumlah: "3.542",
    persentase: 48,
  },
  {
    kode: "02",
    nama: "PNS",
    jumlah: "3.542",
    persentase: 40,
  },
  {
    kode: "03",
    nama: "TNI/Polri",
    jumlah: "3.542",
    persentase: 36,
  },
  {
    kode: "04",
    nama: "Guru/Dosen",
    jumlah: "3.542",
    persentase: 32,
  },
  {
    kode: "05",
    nama: "Tenaga Kesehatan",
    jumlah: "3.542",
    persentase: 24,
  },
];

const statusPerkawinanImage =
  "https://www.figma.com/api/mcp/asset/051b391e-0d2e-4961-9454-313757f454b0";

const statusPerkawinanCards: Array<{
  title: string;
  description: string;
  jumlah: string;
  icon: "kawin" | "belum";
}> = [
  {
    title: "Data Sudah\nKawin",
    description:
    "Data sudah kawin merupakan jumlah keseluruhan penduduk yang tercatat berstatus kawin berdasarkan data administrasi kependudukan di wilayah desa.",
    jumlah: "3.542",
    icon: "kawin",
  },
  {
    title: "Data Belum\nKawin",
    description:
    "Data belum kawin merupakan jumlah keseluruhan penduduk yang tercatat belum menikah berdasarkan data administrasi kependudukan di wilayah desa.",
    jumlah: "3.542",
    icon: "belum",
  },
];

const agamaCards: Array<{
  nama: string;
  deskripsi: string;
  jumlah: string;
  persentase: number;
  tema: "yellow" | "green";
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
}> = [
  {
    nama: "Islam",
    deskripsi: "Penduduk beragama Islam adalah jumlah warga yang menganut agama Islam di suatu wilayah.",
    jumlah: "3.542",
    persentase: 89,
    tema: "yellow",
    icon: MoonStar,
  },
  {
    nama: "Kristen",
    deskripsi: "Penduduk beragama Kristen adalah jumlah warga yang menganut agama Kristen di suatu wilayah.",
    jumlah: "3.542",
    persentase: 5,
    tema: "green",
    icon: Cross,
  },
  {
    nama: "Katolik",
    deskripsi: "Penduduk beragama Katolik adalah jumlah warga yang menganut agama Katolik di suatu wilayah.",
    jumlah: "3.542",
    persentase: 2,
    tema: "yellow",
    icon: Church,
  },
  {
    nama: "Hindu",
    deskripsi: "Penduduk beragama Hindu adalah jumlah warga yang menganut agama Hindu di suatu wilayah.",
    jumlah: "3.542",
    persentase: 2,
    tema: "green",
    icon: Flower2,
  },
  {
    nama: "Konghucu",
    deskripsi: "Penduduk beragama Konghucu adalah jumlah warga yang menganut agama Konghucu di suatu wilayah.",
    jumlah: "3.542",
    persentase: 1,
    tema: "yellow",
    icon: BookOpenText,
  },
  {
    nama: "Budha",
    deskripsi: "Penduduk beragama Budha adalah jumlah warga yang menganut agama Budha di suatu wilayah.",
    jumlah: "3.542",
    persentase: 1,
    tema: "green",
    icon: Flower2,
  },
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
      className="hero-reveal group relative h-75.5 w-62.5 shrink-0 transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(0,0,0,0.18)]"
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

      <div className="absolute left-[17%] top-[20.5%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
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

      <div className="absolute left-[76.5%] top-0 z-10 flex h-14.5 w-14.5 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-rotate-3">
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
      className={`hero-reveal group relative isolate h-67.5 overflow-hidden rounded-tl-[28px] rounded-br-[28px] p-6 text-[#F3F8F6] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.18)] sm:h-75 md:h-80 ${isDark
        ? "bg-linear-to-br from-[#001F18] via-[#003326] to-[#005239] text-[#F3F8F6]"
        : "bg-[#D9D9D9] text-[#070C10]"
        }`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-28 w-28 rotate-45 bg-[#FFFFFF]" />
      <div className="pointer-events-none absolute -bottom-14 -left-14 h-28 w-28 rotate-45 bg-[#FFFFFF]" />

      <div
        className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_6px_14px_rgba(11,40,31,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${isDark
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

      <div className="relative z-10 min-h-38 overflow-hidden rounded-[24px] border border-white/10 bg-linear-to-br from-white/15 via-white/5 to-transparent px-5 pb-5 pt-7 shadow-[0_20px_40px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10">
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
      <div className="relative aspect-square w-full max-w-60 sm:max-w-70">
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

function PendidikanChart({ delayMs }: { delayMs: number }) {
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
              data={pendidikanChartData}
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

function StatusPerkawinanStatCard({
  title,
  description,
  jumlah,
  icon,
  delayMs,
}: {
  title: string;
  description: string;
  jumlah: string;
  icon: "kawin" | "belum";
  delayMs: number;
}) {
  return (
    <article
      className="hero-reveal group relative overflow-hidden rounded-[20px] border border-[#00E0A1]/35 bg-[rgba(217,217,217,0.10)] px-5 py-5 shadow-[inset_26px_-26px_26px_rgba(165,165,165,0.08),inset_-26px_26px_26px_rgba(255,255,255,0.08),0_18px_38px_rgba(0,0,0,0.12)] backdrop-blur-[14px] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#00E0A1]/55 hover:shadow-[inset_26px_-26px_26px_rgba(165,165,165,0.08),inset_-26px_26px_26px_rgba(255,255,255,0.08),0_24px_48px_rgba(0,0,0,0.16)] sm:px-6 sm:py-6"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="grid min-h-44 gap-4 md:min-h-48 md:grid-cols-[minmax(0,1fr)_auto] md:gap-6">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0B100] text-white shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out group-hover:scale-105 sm:h-13 sm:w-13">
            {icon === "kawin" ? (
              <CheckCircle2 size={22} strokeWidth={2.2} />
            ) : (
              <CircleOff size={22} strokeWidth={2.2} />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="whitespace-pre-line font-[Georgia,serif] text-[26px] font-bold leading-[1.02] text-white sm:text-[30px]">
              {title}
            </h3>
            <p className="mt-2 max-w-[42ch] text-[12px] leading-[1.38] text-[#ECFDF5] sm:text-[13px]">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-end text-right md:items-start md:pt-1">
          <div>
            <p
              className="text-[42px] leading-[0.9] text-white sm:text-[48px]"
              style={{ fontFamily: "var(--font-upakarti)" }}
            >
              {jumlah}
            </p>
            <p className="font-[Georgia,serif] text-[17px] font-bold leading-none text-white sm:text-[20px]">
              Orang
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/75">
              Tercatat
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function StatusPerkawinanSection() {
  return (
    <section className={sectionCardClass + " bg-[#ffffff]"}>
      <div className="flex flex-col gap-7">
        <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
          <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
            Berdasarkan
            <br />
            Status Perkawinan
          </h2>

          <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
            Kelompok Berdasarkan Status Perkawinan merupakan penyajian data penduduk menurut status
            perkawinan, seperti belum kawin, kawin, cerai hidup, atau cerai mati, untuk memberikan
            gambaran kondisi sosial masyarakat di suatu wilayah.
          </p>

          <button
            type="button"
            aria-label="Informasi berdasarkan status perkawinan"
            className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            <HeartHandshake size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[24px] bg-linear-to-br from-[#0B281F] to-[#174738]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,0.88fr)_minmax(0,1.12fr)] lg:items-center">
            <div className="flex min-h-90 items-center justify-center border-b border-white/10 p-4 sm:p-6 lg:min-h-125 lg:border-b-0 lg:border-r lg:border-white/10 lg:p-8">
              <div className="hero-reveal relative aspect-4/5 w-full max-w-90 overflow-hidden rounded-[28px] border border-white/15 bg-black/20 shadow-[0_24px_50px_rgba(0,0,0,0.28)]" style={{ animationDelay: "160ms" }}>
                <img
                  src={statusPerkawinanImage}
                  alt="Ilustrasi status perkawinan"
                  className="h-full w-full object-cover grayscale hero-zoom"
                />

                <div className="absolute inset-x-3 bottom-3 rounded-[14px] border border-white/20 bg-black/35 p-3 shadow-[0_8px_18px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <div>
                      <p className="font-bold text-[#F4F3EF] sm:text-[15px]">
                        Data Perkawinan <span className="text-[#F0B100]">Desa Pameutingan</span>
                      </p>
                      <p className="mt-1 text-[12px] text-[#A4F4CF]">Total presentase kawin dan belum kawin</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#00E397]/70 bg-[#009966] px-3 py-1 text-[12px] font-medium text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F0B100]" />
                      83%
                    </div>
                  </div>
                  <p className="mt-3 text-[10.5px] italic leading-[1.35] text-[#D0FAE5CC] sm:text-[11px]">
                    Data perkawinan Desa Pameutingan menampilkan persentase penduduk yang berstatus
                    kawin dan belum kawin sebagai gambaran kondisi sosial masyarakat.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex h-full items-center p-4 sm:p-6 md:p-8 lg:p-9">
              <div className="w-full space-y-4 sm:space-y-5">
                {statusPerkawinanCards.map((item, idx) => (
                  <StatusPerkawinanStatCard
                    key={`${item.title}-${idx}`}
                    title={item.title}
                    description={item.description}
                    jumlah={item.jumlah}
                    icon={item.icon}
                    delayMs={140 + idx * 80}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type AgamaStatCardProps = {
  nama: string;
  deskripsi: string;
  jumlah: string;
  persentase: number;
  tema: "yellow" | "green";
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  delayMs: number;
};

function AgamaStatCard({
  nama,
  deskripsi,
  jumlah,
  persentase,
  tema,
  icon: Icon,
  delayMs,
}: AgamaStatCardProps) {
  const isYellow = tema === "yellow";

  return (
    <article
      className="hero-reveal group relative h-69 w-78 shrink-0 snap-start overflow-hidden rounded-[41px] text-white transition-transform duration-500 ease-out hover:-translate-y-1"
      style={{
        animationDelay: `${delayMs}ms`,
        backgroundImage: isYellow
          ? "linear-gradient(180deg, #F0B100 0%, #D9A000 100%)"
          : "linear-gradient(180deg, #00A56A 0%, #009966 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-2.75 rounded-[33px] border border-white/12 bg-white/5 shadow-[inset_4px_-4px_18px_rgba(255,255,255,0.08),inset_-4px_4px_18px_rgba(0,0,0,0.08)] backdrop-blur-xs" />
      <div className="pointer-events-none absolute -right-12 top-7 h-28 w-28 rounded-full bg-black/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

      <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex h-17 w-17 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-[0_10px_18px_rgba(0,0,0,0.18),inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-105">
            <Icon size={28} strokeWidth={2.2} />
          </div>

          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#00E397] bg-[#0B281F] px-3 py-1 text-white shadow-[0_8px_16px_rgba(0,0,0,0.18)]">
            <span className="size-2 rounded-full bg-[#FD0000]/70" />
            <span className="text-[12px] font-medium uppercase tracking-[0.6px]">{persentase}%</span>
          </div>
        </div>

        <div className="mt-2.5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-upakarti text-[52px] leading-[0.82] text-white sm:text-[58px]">
              {jumlah}
            </p>
            <p className="mt-0.5 font-timeless text-[14px] leading-none text-white sm:text-[16px]">
              Orang
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 pt-0">
          <h3 className="font-timeless text-[20px] leading-[1.05] text-white sm:text-[22px]">
            {nama}
          </h3>
          <p className="max-w-56 text-[11px] leading-[1.3] text-[#ECFDF5] sm:text-[12px]">
            {deskripsi}
          </p>
        </div>
      </div>
    </article>
  );
}

function AgamaSection() {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const paginationRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const updateActiveIndex = React.useCallback((scrollLeft: number, scrollWidth: number, clientWidth: number) => {
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }

    const progress = scrollLeft / maxScroll;
    const nextIndex = Math.round(progress * (agamaCards.length - 1));

    setActiveIndex(nextIndex);

    const pagination = paginationRef.current;

    if (pagination) {
      pagination.dataset.activeIndex = String(nextIndex);
      Array.from(pagination.querySelectorAll<HTMLSpanElement>("span")).forEach((dot, index) => {
        const isActive = index === nextIndex;

        dot.className = isActive
          ? "h-2 rounded-full transition-all duration-300 ease-out w-8 bg-[#0B281F] shadow-[0_0_0_4px_rgba(11,40,31,0.08)]"
          : "h-2 rounded-full transition-all duration-300 ease-out w-2.5 bg-[#0B281F]/20";
      });
    }
  }, []);

  return (
    <section className={sectionCardClass + " bg-[#ffffff]"}>
      <div className="flex flex-col gap-7">
        <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
          <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
            Berdasarkan
            <br />
            Agama
          </h2>

          <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
            Kelompok Berdasarkan Agama merupakan penyajian data penduduk menurut agama yang dianut,
            guna memberikan gambaran komposisi keagamaan masyarakat di suatu wilayah.
          </p>

          <button
            type="button"
            aria-label="Informasi berdasarkan agama"
            className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Paperclip size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={(event) => {
            const element = event.currentTarget;
            updateActiveIndex(element.scrollLeft, element.scrollWidth, element.clientWidth);
          }}
          className="overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max min-w-full snap-x snap-mandatory gap-4 pr-1 sm:gap-4.25">
            {agamaCards.map((item, idx) => (
              <AgamaStatCard
                key={`${item.nama}-${idx}`}
                nama={item.nama}
                deskripsi={item.deskripsi}
                jumlah={item.jumlah}
                persentase={item.persentase}
                tema={item.tema}
                icon={item.icon}
                delayMs={120 + idx * 70}
              />
            ))}
          </div>
        </div>

        <div ref={paginationRef} className="flex items-center justify-center gap-2 pt-1" data-active-index={activeIndex}>
          {agamaCards.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <span
                key={`agama-pagination-${item.nama}`}
                className={`h-2 rounded-full transition-all duration-300 ease-out ${isActive
                  ? "w-8 bg-[#0B281F] shadow-[0_0_0_4px_rgba(11,40,31,0.08)]"
                  : "w-2.5 bg-[#0B281F]/20"
                  }`}
                aria-hidden="true"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PekerjaanTopCard({
  nama,
  jumlah,
  rank,
  icon: Icon,
  delayMs,
}: {
  nama: string;
  jumlah: string;
  rank: "TOP 1" | "TOP 2" | "TOP 3";
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  delayMs: number;
}) {
  return (
    <article
      className="hero-reveal group relative isolate h-67.5 overflow-hidden rounded-tl-[28px] rounded-br-[28px] bg-linear-to-br from-[#001F18] via-[#003326] to-[#005239] p-6 text-[#F3F8F6] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.18)] sm:h-75 md:h-80"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-28 w-28 rotate-45 bg-[#FFFFFF]" />
      <div className="pointer-events-none absolute -bottom-14 -left-14 h-28 w-28 rotate-45 bg-[#FFFFFF]" />

      <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-[#0B281F]/48 text-[#EAF7F1] shadow-[0_6px_14px_rgba(11,40,31,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:-rotate-3">
        <Icon size={18} strokeWidth={2.1} />
      </div>

      <div className="relative mt-6 flex h-[calc(100%-4.75rem)] flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-[#00E0A1] px-3 py-1 text-[11px] leading-none font-bold text-[#0B281F] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0B281F]" />
            {rank}
          </div>

          <p
            className="text-[54px] font-bold leading-[0.9] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:text-[58px]"
            style={{ fontFamily: "var(--font-upakarti)" }}
          >
            {jumlah}
          </p>

          <h3 className="mt-3 font-[Georgia,serif] text-[19px] font-bold leading-[1.15] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:text-[21px] md:text-[23px]">
            {nama}
          </h3>
        </div>

        <p className="self-end text-right text-[12px] leading-tight text-[#F5F7F6]/85">
          Terdata
          <br />
          oleh sistem
        </p>
      </div>
    </article>
  );
}

function PekerjaanDetailCard({
  kode,
  nama,
  jumlah,
  persentase,
  bgColor,
  textColor,
  delayMs,
}: {
  kode: string;
  nama: string;
  jumlah: string;
  persentase: number;
  bgColor: string;
  textColor: string;
  delayMs: number;
}) {
  return (
    <article
      className="hero-reveal group relative overflow-hidden rounded-[22px] border border-white/15 p-5 shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.16)] sm:p-6"
      style={{ backgroundColor: bgColor, animationDelay: `${delayMs}ms` }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-18 blur-xl transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: textColor }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-white/15" />

      <div className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 sm:h-17 sm:w-17">
              <div className="text-center leading-none">
                <span
                  className="block text-[21px] font-bold sm:text-[24px]"
                  style={{ fontFamily: "var(--font-upakarti)" }}
                >
                  {kode}
                </span>
              </div>
            </div>
            <div className="min-w-0">
              <h3
                className="font-[Georgia,serif] text-[18px] font-bold leading-[1.12] sm:text-[19px]"
                style={{ color: textColor }}
              >
                {nama}
              </h3>
              <p
                className="mt-1.5 max-w-[34ch] text-[12px] leading-5"
                style={{ color: textColor, opacity: 0.74 }}
              >
                Data kategori ini ditampilkan sebagai ringkasan pekerjaan utama penduduk.
              </p>
            </div>
          </div>
          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-[#0B281F] px-3.5 py-1.5 text-[11px] font-bold text-white/92 backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E0A1]" />
            {persentase}%
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-white/12 pt-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: textColor, opacity: 0.62 }}>
              Jumlah penduduk
            </p>
            <p
              className="mt-1 text-[32px] font-bold leading-none sm:text-[36px]"
              style={{ color: textColor, fontFamily: "var(--font-upakarti)" }}
            >
              {jumlah}
            </p>
          </div>
          <div className="rounded-full border border-white/15 bg-black/16 px-3 py-2 text-[11px] font-semibold text-white/85">
            Detail kategori
          </div>
        </div>
      </div>
    </article>
  );
}

function PekerjaanViewAllModal({
  isOpen,
  onClose,
  title,
  data,
  bgColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Array<{
    kode: string;
    nama: string;
    jumlah: string;
    persentase: number;
  }>;
  bgColor: "yellow" | "green";
}) {
  const gradients = {
    yellow: "from-[#F0B100] via-[#D4940A] to-[#B8860B]",
    green: "from-[#009966] via-[#005239] to-[#003d2e]",
  };

  const accentColors = {
    yellow: "#F0B100",
    green: "#00E0A1",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{
          animation: "fadeIn 0.3s ease-out",
        }}
      />

      {/* Modal */}
      <div
        className={`relative bg-linear-to-br ${gradients[bgColor]} rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] w-full max-w-2xl`}
        style={{
          animation: "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute -right-24 -top-24 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-white/5 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="font-[Georgia,serif] text-[36px] sm:text-[42px] font-bold leading-[1.1] text-white">
                {title}
              </h2>
              <p className="mt-2 text-[14px] sm:text-[15px] text-white/80">
                Daftar lengkap jenis pekerjaan penduduk di desa
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 ml-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              <X size={24} strokeWidth={2.2} />
            </button>
          </div>

          {/* Grid of items */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.map((item, idx) => (
                <div
                  key={`modal-${item.kode}-${idx}`}
                  className="group relative overflow-hidden rounded-[20px] bg-white/15 backdrop-blur-md border border-white/20 p-6 hover:bg-white/20 transition-all duration-300"
                  style={{
                    animation: `slideInUp 0.5s ease-out ${idx * 50}ms both`,
                  }}
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all" />

                  <div className="relative z-10">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="inline-flex items-center justify-center h-10 w-10 rounded-full font-bold text-[12px]"
                          style={{
                            backgroundColor: `rgba(255, 255, 255, 0.2)`,
                            color: "#FFFFFF",
                            fontFamily: "var(--font-upakarti)",
                          }}
                        >
                          {item.kode}
                        </div>
                        <div>
                          <h3 className="font-[Georgia,serif] text-[16px] sm:text-[17px] font-bold text-white leading-tight">
                            {item.nama}
                          </h3>
                          <p className="mt-1 text-[12px] text-white/70">
                            {item.persentase}% dari total
                          </p>
                        </div>
                      </div>

                      <div
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-bold text-white border border-white/30"
                        style={{ backgroundColor: `rgba(255, 255, 255, 0.15)` }}
                      >
                        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: accentColors[bgColor] }} />
                        {item.persentase}%
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[11px] text-white/70 mb-1">Jumlah</p>
                        <p
                          className="text-[28px] sm:text-[32px] font-bold text-white"
                          style={{ fontFamily: "var(--font-upakarti)" }}
                        >
                          {item.jumlah}
                        </p>
                      </div>
                      <div className="text-[11px] text-white/70 text-right">
                        <p>Orang</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
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
              className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Info size={22} strokeWidth={2.2} />
            </button>
          </div>

          <div className="hero-reveal grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3" style={{ animationDelay: "180ms" }}>
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
            <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]" style={{ animationDelay: "40ms" }}>
              Berdasarkan
              <br />
              Kelompok Umur
            </h2>

            <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7" style={{ animationDelay: "140ms" }}>
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
              style={{ animationDelay: "220ms" }}
            >
              <ChartNoAxesCombined size={22} strokeWidth={2.2} />
            </button>
          </div>

          <div className="hero-reveal grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5" style={{ animationDelay: "180ms" }}>
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

              <div className="flex flex-col items-center justify-center rounded-[28px] border border-white/5 bg-white/2 p-8 shadow-3xl backdrop-blur-md">
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

      <section className={sectionCardClass + " bg-[#ffffff]"}>
        <div className="flex flex-col gap-7">
          <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
            <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]" style={{ animationDelay: "40ms" }}>
              Berdasarkan
              <br />
              Pekerjaan
            </h2>

            <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7" style={{ animationDelay: "140ms" }}>
              Kelompok Berdasarkan Pekerjaan merupakan penyajian data penduduk
              menurut jenis atau bidang pekerjaan yang disajikan secara
              transparan dan akurat untuk mendukung perencanaan serta
              pengambilan kebijakan secara tepat sasaran.
            </p>

            <button
              type="button"
              aria-label="Informasi berdasarkan pekerjaan"
              className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ animationDelay: "220ms" }}
            >
              <Briefcase size={22} strokeWidth={2.2} />
            </button>
          </div>

          <div className="hero-reveal grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5" style={{ animationDelay: "180ms" }}>
            {pekerjaanTopCards.map((item, idx) => (
              <PekerjaanTopCard
                key={`${item.nama}-${idx}`}
                nama={item.nama}
                jumlah={item.jumlah}
                rank={item.rank}
                icon={item.icon}
                delayMs={120 + idx * 80}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="hero-reveal relative overflow-hidden rounded-[24px] bg-linear-to-br from-[#F0B100] to-[#D4940A] p-6 sm:p-8 md:p-10" style={{ animationDelay: "260ms" }}>
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-black/5 blur-2xl" />

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="font-[Georgia,serif] text-[28px] font-bold leading-[1.2] text-white md:text-[32px]">
                    Jenis
                    <br />
                    Pekerjaan
                  </h3>
                  <Link
                    href="/infografis/pekerjaan?section=pertanian"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-[12px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    View All <span>→</span>
                  </Link>
                </div>

                <div className="space-y-3">
                  {pekerjaanKiriBahasan.map((item, idx) => (
                    <PekerjaanDetailCard
                      key={`kiri-${item.kode}-${idx}`}
                      kode={item.kode}
                      nama={item.nama}
                      jumlah={item.jumlah}
                      persentase={item.persentase}
                      bgColor="rgba(255, 255, 255, 0.15)"
                      textColor="#FEFEFE"
                      delayMs={200 + idx * 60}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-reveal relative overflow-hidden rounded-[24px] bg-linear-to-br from-[#009966] to-[#005239] p-6 sm:p-8 md:p-10" style={{ animationDelay: "340ms" }}>
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="font-[Georgia,serif] text-[28px] font-bold leading-[1.2] text-white md:text-[32px]">
                    Jenis
                    <br />
                    Pekerjaan
                  </h3>
                  <Link
                    href="/infografis/pekerjaan?section=profesional"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-[12px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    View All <span>→</span>
                  </Link>
                </div>

                <div className="space-y-3">
                  {pekerjaanKananBahasan.map((item, idx) => (
                    <PekerjaanDetailCard
                      key={`kanan-${item.kode}-${idx}`}
                      kode={item.kode}
                      nama={item.nama}
                      jumlah={item.jumlah}
                      persentase={item.persentase}
                      bgColor="rgba(255, 255, 255, 0.12)"
                      textColor="#FEFEFE"
                      delayMs={200 + idx * 60}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <StatusPerkawinanSection />

      <AgamaSection />
    </div>
  );
}
