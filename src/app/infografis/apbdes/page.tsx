"use client";

import * as React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  CircleDollarSign, 
  CheckCircle2, 
  TrendingUp, 
  Wallet, 
  BarChart3, 
  Info,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Camera
} from "lucide-react";

const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

type ProgressItem = {
  image: string;
  keterangan: string;
  persentase: number;
};

type TableItem = {
  kode: string;
  uraian: string;
  anggaran: number;
  realisasi: number;
  level: 1 | 2 | 3;
  isTotal?: boolean;
  progres?: ProgressItem[];
};

const pendapatanData: TableItem[] = [
  { 
    kode: "1", uraian: "PENDAPATAN DESA", anggaran: 1625000000, realisasi: 1250000000, level: 1,
    progres: [
      { image: "https://images.unsplash.com/photo-1554224155-1696413575b3?q=80&w=400&auto=format&fit=crop", keterangan: "Penerimaan Dana Desa Tahap 1 & 2", persentase: 70 },
      { image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400&auto=format&fit=crop", keterangan: "Penerimaan Alokasi Dana Desa (ADD)", persentase: 80 }
    ]
  },
  { kode: "1.1", uraian: "Pendapatan Asli Desa (PADes)", anggaran: 115000000, realisasi: 85000000, level: 2 },
  { kode: "1.1.1", uraian: "Hasil Usaha Desa (BUMDes)", anggaran: 75000000, realisasi: 50000000, level: 3 },
  { kode: "1.1.2", uraian: "Swadaya, Partisipasi dan Gotong Royong", anggaran: 25000000, realisasi: 20000000, level: 3 },
  { kode: "1.1.3", uraian: "Lain-lain Pendapatan Asli Desa yang Sah", anggaran: 15000000, realisasi: 15000000, level: 3 },
  { kode: "1.2", uraian: "Pendapatan Transfer", anggaran: 1500000000, realisasi: 1155000000, level: 2 },
  { kode: "1.2.1", uraian: "Dana Desa (DD)", anggaran: 950000000, realisasi: 665000000, level: 3 },
  { kode: "1.2.2", uraian: "Alokasi Dana Desa (ADD)", anggaran: 450000000, realisasi: 390000000, level: 3 },
  { kode: "1.2.3", uraian: "Bantuan Keuangan Provinsi", anggaran: 60000000, realisasi: 60000000, level: 3 },
  { kode: "1.2.4", uraian: "Bantuan Keuangan Kabupaten", anggaran: 40000000, realisasi: 40000000, level: 3 },
  { kode: "1.3", uraian: "Pendapatan Lain-lain", anggaran: 10000000, realisasi: 10000000, level: 2 },
  { kode: "1.3.1", uraian: "Penerimaan dari Hasil Pajak/Retribusi Daerah", anggaran: 10000000, realisasi: 10000000, level: 3 },
  { kode: "", uraian: "TOTAL PENDAPATAN", anggaran: 1625000000, realisasi: 1250000000, level: 1, isTotal: true },
];

const belanjaData: TableItem[] = [
  { 
    kode: "2", uraian: "BELANJA DESA", anggaran: 1645000000, realisasi: 985000000, level: 1,
    progres: [
      { image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=400&auto=format&fit=crop", keterangan: "Pembangunan Jalan Desa Pameutingan", persentase: 60 },
      { image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop", keterangan: "Renovasi Gedung Serbaguna", persentase: 45 }
    ]
  },
  { kode: "2.1", uraian: "Bidang Penyelenggaraan Pemerintahan Desa", anggaran: 450000000, realisasi: 380000000, level: 2 },
  { kode: "2.1.1", uraian: "Penghasilan Tetap & Tunjangan Perangkat", anggaran: 350000000, realisasi: 310000000, level: 3 },
  { kode: "2.1.2", uraian: "Operasional Kantor Desa", anggaran: 85000000, realisasi: 60000000, level: 3 },
  { kode: "2.1.3", uraian: "Penyelenggaraan Musyawarah Desa", anggaran: 15000000, realisasi: 10000000, level: 3 },
  { 
    kode: "2.2", uraian: "Bidang Pelaksanaan Pembangunan Desa", anggaran: 750000000, realisasi: 420000000, level: 2,
    progres: [
      { image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=400&auto=format&fit=crop", keterangan: "Landscaping Jalan Utama", persentase: 80 },
      { image: "https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=400&auto=format&fit=crop", keterangan: "Pondasi Jembatan Desa", persentase: 30 }
    ]
  },
  { kode: "2.2.1", uraian: "Pembangunan Jalan Lingkungan Desa", anggaran: 450000000, realisasi: 280000000, level: 3 },
  { kode: "2.2.2", uraian: "Pembangunan Saluran Irigasi Tersier", anggaran: 120000000, realisasi: 40000000, level: 3 },
  { kode: "2.2.3", uraian: "Renovasi Gedung Serbaguna Desa", anggaran: 180000000, realisasi: 100000000, level: 3 },
  { kode: "2.3", uraian: "Bidang Pembinaan Kemasyarakatan", anggaran: 70000000, realisasi: 45000000, level: 2 },
  { kode: "2.3.1", uraian: "Pembinaan Lembaga Kemasyarakatan (RT/RW)", anggaran: 45000000, realisasi: 35000000, level: 3 },
  { kode: "2.3.2", uraian: "Pembinaan Karang Taruna & Olahraga", anggaran: 25000000, realisasi: 10000000, level: 3 },
  { kode: "2.4", uraian: "Bidang Pemberdayaan Masyarakat", anggaran: 225000000, realisasi: 90000000, level: 2 },
  { kode: "2.4.1", uraian: "Pelatihan Kelompok Tani & Ternak", anggaran: 75000000, realisasi: 40000000, level: 3 },
  { kode: "2.4.2", uraian: "Dukungan Permodalan BUMDes", anggaran: 150000000, realisasi: 50000000, level: 3 },
  { kode: "2.5", uraian: "Bidang Penanggulangan Bencana & Darurat", anggaran: 150000000, realisasi: 50000000, level: 2 },
  { kode: "2.5.1", uraian: "Penanggulangan Bencana Alam", anggaran: 50000000, realisasi: 10000000, level: 3 },
  { kode: "2.5.2", uraian: "Bantuan Langsung Tunai (Mendesak)", anggaran: 100000000, realisasi: 40000000, level: 3 },
  { kode: "", uraian: "TOTAL BELANJA", anggaran: 1645000000, realisasi: 985000000, level: 1, isTotal: true },
];

const pembiayaanData: TableItem[] = [
  { kode: "3", uraian: "PEMBIAYAAN DESA", anggaran: 20000000, realisasi: 20000000, level: 1 },
  { kode: "3.1", uraian: "Penerimaan Pembiayaan", anggaran: 35000000, realisasi: 35000000, level: 2 },
  { kode: "3.1.1", uraian: "SILPA Tahun Sebelumnya", anggaran: 35000000, realisasi: 35000000, level: 3 },
  { kode: "3.2", uraian: "Pengeluaran Pembiayaan", anggaran: 15000000, realisasi: 15000000, level: 2 },
  { kode: "3.2.1", uraian: "Penyertaan Modal Desa (Investasi)", anggaran: 15000000, realisasi: 15000000, level: 3 },
  { kode: "", uraian: "PEMBIAYAAN NETTO", anggaran: 20000000, realisasi: 20000000, level: 1, isTotal: true },
];

function TableRow({ item }: { item: TableItem }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const percentage = Math.round((item.realisasi / item.anggaran) * 100);

  return (
    <>
      <tr 
        className={`transition-colors hover:bg-[#F6F8F7] ${
          item.isTotal ? "bg-[#F0B100]/5 font-bold" : 
          item.level === 1 ? "font-bold text-[#0B281F]" :
          item.level === 2 ? "bg-[#F6F8F7]/30 font-semibold" : ""
        }`}
      >
        <td className={`px-4 py-4 text-[12px] md:px-6 ${item.level === 3 ? "pl-10 opacity-60" : ""}`}>
          {item.kode}
        </td>
        <td className={`px-4 py-4 text-[13px] md:px-6 ${
          item.level === 2 ? "pl-8" : 
          item.level === 3 ? "pl-10 text-[#0B281F]/70" : ""
        }`}>
          {item.uraian}
        </td>
        <td className="px-4 py-4 text-right font-mono text-[13px] md:px-6">
          {formatIDR(item.anggaran)}
        </td>
        <td className="px-4 py-4 text-right md:px-6">
          <div className="flex flex-col items-end">
            <span className="font-mono text-[13px] font-bold text-[#009966]">
              {formatIDR(item.realisasi)}
            </span>
            <span className="text-[11px] font-bold text-[#009966]/70">
              ({percentage}%)
            </span>
          </div>
        </td>
        <td className="px-4 py-4 text-center md:px-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex h-8 w-8 mx-auto items-center justify-center rounded-full transition-all ${
              isExpanded ? "bg-[#0B281F] text-white shadow-md" : "bg-[#0B281F]/5 text-[#0B281F] hover:bg-[#0B281F]/10"
            }`}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>
      </tr>
      
      {isExpanded && (
        <tr>
          <td colSpan={5} className="bg-[#F6F8F7]/50 p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 text-[#0B281F]/60">
                <Camera size={14} />
                <span className="text-[11px] font-bold uppercase tracking-widest">Dokumentasi & Progres Realisasi</span>
              </div>
              
              {item.progres && item.progres.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {item.progres.map((prog, pIdx) => (
                    <div key={pIdx} className="group overflow-hidden rounded-2xl border border-white bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1">
                      <div className="relative h-40 w-full overflow-hidden">
                        <img src={prog.image} alt={prog.keterangan} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                          {prog.persentase}%
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-[13px] font-semibold text-[#0B281F] leading-relaxed">{prog.keterangan}</p>
                        <div className="mt-3 h-1.5 w-full rounded-full bg-[#F6F8F7]">
                          <div 
                            className="h-full rounded-full bg-[#009966] transition-all duration-1000" 
                            style={{ width: `${prog.persentase}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0B281F]/10 py-12 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B281F]/5 text-[#0B281F]/30">
                    <ImageIcon size={24} />
                  </div>
                  <p className="text-[14px] font-medium text-[#0B281F]/40">Belum ada dokumentasi progres visual</p>
                  <p className="mt-1 text-[12px] text-[#0B281F]/30">Data sedang diperbarui oleh petugas terkait</p>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function APBDesTable({ title, data, icon: Icon, themeColor }: { title: string, data: TableItem[], icon: any, themeColor: string }) {
  return (
    <section className="overflow-hidden rounded-[32px] border border-[#0B281F]/10 bg-white shadow-[0_20px_50px_rgba(11,40,31,0.06)]">
      <div className="relative flex items-center gap-4 p-6 md:p-8 bg-gradient-to-r from-[#0B281F] to-[#004F3B] text-white">
        {/* Decorative Glow */}
        <div className="absolute right-0 top-0 h-full w-32 bg-white/5 blur-2xl" />
        
        <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg backdrop-blur-md border border-white/20`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="relative z-10">
          <h2 className="font-[Georgia,serif] text-xl font-bold md:text-2xl">{title}</h2>
          <p className="text-[12px] text-white/70 font-medium tracking-wide">Laporan Realisasi Tahun Anggaran 2026</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F6F8F7] text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/50">
              <th className="px-4 py-5 md:px-6">Kode</th>
              <th className="px-4 py-5 md:px-6">Uraian / Bidang</th>
              <th className="px-4 py-5 text-right md:px-6">Anggaran (Rp)</th>
              <th className="px-4 py-5 text-right md:px-6">Realisasi (Rp)</th>
              <th className="px-4 py-5 text-center md:px-6">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0B281F]/5">
            {data.map((item, idx) => (
              <TableRow key={`${item.kode}-${idx}`} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function ApbdesDetailPage() {
  return (
    <main className="min-h-screen bg-[#F6F8F7] pb-24">
      {/* Full Width Hero Section */}
      <section className="relative overflow-hidden bg-[#0B281F] pt-28 pb-16 text-white shadow-2xl sm:pt-32 md:pt-36 lg:pt-40 lg:pb-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#00E0A1]/12 blur-[100px]" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-[#F0B100]/10 blur-[110px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00E0A1] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E0A1] animate-pulse" />
              Laporan Realisasi & Akuntabilitas Desa
            </div>

            <h1 className="max-w-4xl font-[Georgia,serif] text-[40px] font-bold leading-[1.05] tracking-tight sm:text-[52px] lg:text-[64px]">
              Realisasi <span className="text-[#F0B100]">APB Desa</span>
              <br />
              Pameutingan 2026
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-[17px]">
              Transparansi penuh progres pembangunan desa. Pantau setiap rupiah yang direalisasikan lengkap dengan dokumentasi visual dari lapangan.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* Navigation & Info */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/infografis"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#0B281F]/10 bg-white px-5 py-2.5 text-[13px] font-bold text-[#0B281F] shadow-[0_10px_24px_rgba(11,40,31,0.08)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            Kembali ke Infografis
          </Link>

          <div className="flex items-center gap-3 rounded-2xl bg-[#009966]/10 px-4 py-2 text-[#009966]">
            <CheckCircle2 size={18} />
            <span className="text-[13px] font-bold uppercase tracking-wider">Status Realisasi: Berjalan (On-Going)</span>
          </div>
        </div>

        {/* Ringkasan Section */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Pendapatan", value: 1250000000, target: 1625000000, icon: TrendingUp, color: "bg-emerald-500" },
            { label: "Total Belanja", value: 985000000, target: 1645000000, icon: Wallet, color: "bg-red-500" },
            { label: "Persentase Belanja", value: 60, isPercent: true, icon: BarChart3, color: "bg-amber-500" },
            { label: "SiLPA Berjalan", value: 300000000, target: 0, icon: CircleDollarSign, color: "bg-blue-500" },
          ].map((item, idx) => (
            <article key={idx} className="rounded-3xl border border-[#0B281F]/5 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.color} text-white shadow-lg`}>
                <item.icon size={20} />
              </div>
              <p className="text-[12px] font-medium uppercase tracking-widest text-[#0B281F]/40">{item.label}</p>
              <div className="mt-1 flex flex-col">
                <p className="font-[Georgia,serif] text-xl font-bold text-[#0B281F] sm:text-2xl">
                  {item.isPercent ? `${item.value}%` : formatIDR(item.value)}
                </p>
                {item.target && item.target > 0 && (
                  <p className="text-[11px] text-[#0B281F]/50">Target: {formatIDR(item.target)}</p>
                )}
              </div>
            </article>
          ))}
        </section>

        {/* Detailed Tables */}
        <div className="space-y-12">
          <APBDesTable 
            title="1. Pendapatan Desa" 
            data={pendapatanData} 
            icon={TrendingUp} 
            themeColor="bg-[#009966]" 
          />
          
          <APBDesTable 
            title="2. Belanja Desa" 
            data={belanjaData} 
            icon={Wallet} 
            themeColor="bg-[#D94F4F]" 
          />
          
          <APBDesTable 
            title="3. Pembiayaan Desa" 
            data={pembiayaanData} 
            icon={CircleDollarSign} 
            themeColor="bg-[#F0B100]" 
          />
        </div>

        {/* Final Summary Card */}
        <section className="relative overflow-hidden rounded-[40px] bg-[#0B281F] p-8 text-white shadow-2xl md:p-12 lg:p-16">
          {/* Decorative Background Elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00E0A1]/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#F0B100]/5 blur-[80px]" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto]">
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00E0A1] backdrop-blur-sm">
                <CheckCircle2 size={14} />
                Kesimpulan Laporan
              </div>
              
              <h2 className="max-w-2xl font-[Georgia,serif] text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Laporan Realisasi <span className="text-[#00E0A1]">Berjalan</span>
              </h2>
              
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-[16px]">
                Pemerintah Desa Pameutingan berkomitmen untuk selalu memperbarui data realisasi ini secara berkala melalui sistem <strong>Siskeudes</strong>. Hal ini dilakukan agar masyarakat dapat terus memantau perkembangan pembangunan secara langsung dan transparan.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <div className="rounded-2xl bg-white/5 p-4 backdrop-blur-md border border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Total Anggaran</p>
                  <p className="mt-1 text-xl font-bold text-[#F0B100]">{formatIDR(1625000000)}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 backdrop-blur-md border border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Total Realisasi</p>
                  <p className="mt-1 text-xl font-bold text-[#00E0A1]">{formatIDR(1250000000)}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center lg:items-end">
              <div className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
                {/* SVG Progress Circle */}
                <svg className="h-full w-full -rotate-90 transform">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="fill-none stroke-white/10"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="fill-none stroke-[#00E0A1]"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="65"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center text-center">
                  <span className="text-4xl font-bold sm:text-5xl">77%</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">Capaian</span>
                </div>
              </div>
              
              <div className="mt-8 grid w-full max-w-[340px] grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-5 backdrop-blur-md border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Sisa Anggaran</p>
                  <p className="mt-2 font-mono text-[15px] font-bold text-white">{formatIDR(375000000)}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5 backdrop-blur-md border border-white/10 flex flex-col justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Status Target</p>
                  <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#00E0A1]/20 px-3 py-1 text-[10px] font-bold text-[#00E0A1]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00E0A1] animate-pulse" />
                    ON TRACK
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex items-center gap-3 rounded-2xl bg-white/5 p-5 text-[12px] text-white/40 border border-white/5">
            <Info size={18} className="shrink-0 text-[#F0B100]" />
            <p>Data ini merupakan ringkasan eksekutif dari realisasi APBDes Pameutingan. Untuk rincian per kegiatan secara lebih mendalam, silakan klik dropdown pada tabel di atas.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
