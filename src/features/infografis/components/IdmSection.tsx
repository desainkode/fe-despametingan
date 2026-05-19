'use client'

import React, { useState } from 'react'
import { 
  Award, 
  MapPin, 
  Calendar, 
  Download, 
  ArrowUpRight, 
  Heart, 
  DollarSign, 
  Leaf, 
  Search,
  BookOpen,
  ShieldCheck,
  TrendingUp,
  Activity,
  Info
} from 'lucide-react'
import { sectionCardClass, SectionHeader } from './section-ui'

export function IdmSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'iks' | 'ike' | 'ikl'>('all')

  // 3 Pillars Data
  const pillars = [
    {
      id: 'iks',
      name: 'Indeks Ketahanan Sosial (IKS)',
      score: '0,912',
      percentage: 91.2,
      max: '1.0',
      description: 'Mengukur kualitas kehidupan sosial masyarakat desa meliputi pendidikan, kesehatan, modal sosial, dan pemukiman.',
      icon: Heart,
      color: '#009966',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20 text-[#009966]',
    },
    {
      id: 'ike',
      name: 'Indeks Ketahanan Ekonomi (IKE)',
      score: '0,845',
      percentage: 84.5,
      max: '1.0',
      description: 'Mengukur kekuatan ekonomi desa melalui akses modal, kelembagaan ekonomi, keterbukaan wilayah, dan lapangan usaha.',
      icon: DollarSign,
      color: '#F0B100',
      bgColor: 'bg-amber-500/10 border-amber-500/20 text-[#F0B100]',
    },
    {
      id: 'ikl',
      name: 'Indeks Ketahanan Lingkungan (IKL)',
      score: '0,820',
      percentage: 82.0,
      max: '1.0',
      description: 'Mengukur daya dukung ekologi desa mencakup kualitas lingkungan hidup, potensi bencana, dan tanggap bencana.',
      icon: Leaf,
      color: '#008F5D',
      bgColor: 'bg-teal-500/10 border-teal-500/20 text-[#008F5D]',
    }
  ]

  // Historical Trends (2022 - 2026)
  const trends = [
    { year: 2022, score: 0.7510, label: '0,7510', status: 'Maju' },
    { year: 2023, score: 0.7820, label: '0,7820', status: 'Maju' },
    { year: 2024, score: 0.8150, label: '0,8150', status: 'Maju' },
    { year: 2025, score: 0.8540, label: '0,8540', status: 'Mandiri' },
    { year: 2026, score: 0.8924, label: '0,8924', status: 'Mandiri' }
  ]

  // Sub-indicators for "Detail Indikator Penyusun"
  const subIndicators = [
    // Sosial (IKS)
    { no: 1, pilar: 'iks', pilarName: 'Sosial', indikator: 'Fasilitas Kesehatan Dasar', skor: 5, keterangan: 'Tersedianya Poskesdes/Polindes dan Posyandu aktif di seluruh wilayah desa.' },
    { no: 2, pilar: 'iks', pilarName: 'Sosial', indikator: 'Akses Pendidikan Dasar & Menengah', skor: 5, keterangan: 'Akses ke Sekolah Dasar (SD) dan Sekolah Menengah Pertama (SMP) dalam jangkauan dekat.' },
    { no: 3, pilar: 'iks', pilarName: 'Sosial', indikator: 'Akses Air Bersih & Sanitasi Layak', skor: 4, keterangan: 'Lebih dari 90% warga telah menggunakan air bersih dan memiliki akses jamban keluarga.' },
    { no: 4, pilar: 'iks', pilarName: 'Sosial', indikator: 'Modal Sosial & Gotong Royong', skor: 5, keterangan: 'Keberadaan lembaga kemasyarakatan aktif dan kegiatan gotong royong warga terpelihara.' },
    { no: 5, pilar: 'iks', pilarName: 'Sosial', indikator: 'Keamanan Lingkungan', skor: 5, keterangan: 'Adanya Pos Ronda/Siskamling aktif dan nihil konflik sosial yang terjadi di masyarakat.' },
    
    // Ekonomi (IKE)
    { no: 6, pilar: 'ike', pilarName: 'Ekonomi', indikator: 'Pusat Kelembagaan Ekonomi', skor: 4, keterangan: 'Adanya BUMDes Pameutingan yang aktif mengelola potensi usaha desa dan UMKM.' },
    { no: 7, pilar: 'ike', pilarName: 'Ekonomi', indikator: 'Akses Perbankan & Lembaga Keuangan', skor: 4, keterangan: 'Kemudahan akses warga ke bank pemerintah/swasta, agen laku pandai, atau koperasi.' },
    { no: 8, pilar: 'ike', pilarName: 'Ekonomi', indikator: 'Keterbukaan Wilayah / Akses Transportasi', skor: 5, keterangan: 'Akses jalan utama beraspal dan dapat dilalui kendaraan roda empat sepanjang tahun.' },
    { no: 9, pilar: 'ike', pilarName: 'Ekonomi', indikator: 'Ketersediaan Lapangan Usaha Baru', skor: 4, keterangan: 'Adanya diversifikasi lapangan usaha di luar sektor pertanian tradisional.' },
    
    // Lingkungan (IKL)
    { no: 10, pilar: 'ikl', pilarName: 'Ekologi', indikator: 'Kesiapsiagaan Bencana Alam', skor: 4, keterangan: 'Telah terbentuk tim relawan tanggap bencana desa dan penyusunan jalur evakuasi.' },
    { no: 11, pilar: 'ikl', pilarName: 'Ekologi', indikator: 'Kualitas Sanitasi Lingkungan & Sampah', skor: 4, keterangan: 'Pengelolaan sampah mandiri desa dan terpeliharanya kebersihan saluran air desa.' },
    { no: 12, pilar: 'ikl', pilarName: 'Ekologi', indikator: 'Bebas dari Pencemaran Lingkungan', skor: 5, keterangan: 'Tidak terdeteksi adanya pencemaran tanah, air, maupun udara dari aktivitas industri.' }
  ]

  const filteredIndicators = subIndicators.filter(item => {
    const matchesSearch = item.indikator.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'all' || item.pilar === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6 md:space-y-8" id="idm">
      {/* 1. Overview & Main Score Widget */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Indeks Desa<br />Membangun</>} 
          description="Indeks Desa Membangun (IDM) adalah indeks komposit yang dibentuk dari Indeks Ketahanan Sosial, Indeks Ketahanan Ekonomi, dan Indeks Ketahanan Ekologi Desa. IDM digunakan untuk menetapkan status kemajuan dan kemandirian desa." 
        />

        {/* Location Metadata Capsule Bar */}
        <div className="flex flex-wrap items-center justify-start gap-3 rounded-[24px] bg-[#0b281f]/[0.02] border border-[#0B281F]/8 p-4 text-[#0B281F] shadow-[0_4px_12px_rgba(0,0,0,0.01)] mb-6.5">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#0B281F]/5 text-[11.5px] sm:text-[12px] font-semibold">
            <MapPin size={13} className="text-[#009966]" />
            <span>Kabupaten Tasikmalaya</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#0B281F]/5 text-[11.5px] sm:text-[12px] font-semibold">
            <MapPin size={13} className="text-[#009966]" />
            <span>Kecamatan Cipatujah</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#0B281F]/5 text-[11.5px] sm:text-[12px] font-semibold">
            <MapPin size={13} className="text-[#009966]" />
            <span>Desa Pameutingan</span>
          </div>
          <div className="sm:ml-auto flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B281F] text-white text-[11.5px] sm:text-[12px] font-bold">
            <Calendar size={13} className="text-[#F0B100]" />
            <span>Tahun Data: 2026</span>
          </div>
        </div>

        {/* Skor IDM Hero Box */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Score Card */}
          <div className="hero-reveal lg:col-span-1 relative overflow-hidden rounded-tl-[24px] rounded-br-[24px] p-6 text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:rounded-tl-[28px] sm:rounded-br-[28px] bg-linear-to-br from-[#0B281F] via-[#004F3B] to-[#003828] flex flex-col justify-between min-h-[240px] isolate">
            {/* 45-degree angle cuts */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-right-14 sm:-top-14 sm:h-28 sm:w-28" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-bottom-14 sm:-left-14 sm:h-28 sm:w-28" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#EAF7F1]/60">KEMENDESA PDTT</span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#009966] px-2 py-0.5 text-[9px] sm:text-[11px] text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  <span className="h-1 w-1 rounded-full bg-[#F0B100]" />
                  Mandiri
                </span>
              </div>
              <h3 className="font-[Georgia,serif] text-[18px] font-bold leading-tight text-white mb-2">
                SKOR IDM DESA
              </h3>
              <p className="text-[10px] leading-relaxed text-[#EAF7F1]/75 pr-6">
                Status kemandirian desa berdasarkan klasifikasi Kemendesa PDTT
              </p>
            </div>

            <div className="relative z-10 flex items-baseline gap-1 mt-6">
              <span 
                className="text-[44px] sm:text-[52px] font-bold leading-none tracking-tight text-white" 
                style={{ fontFamily: 'Georgia, serif' }}
              >
                0,8924
              </span>
              <span className="text-[11px] font-mono text-[#EAF7F1]/55">/ 1.0 MAX</span>
            </div>
          </div>

          {/* Pillars List Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pillars.map((p, idx) => {
              const Icon = p.icon
              return (
                <div 
                  key={p.id}
                  className="hero-reveal group relative isolate overflow-hidden rounded-tl-[24px] rounded-br-[24px] p-5.5 border border-[#0B281F]/8 bg-[#0b281f]/[0.02] shadow-[0_12px_24px_rgba(0,0,0,0.01)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#009966]/25 hover:bg-[#0b281f]/[0.04] flex flex-col justify-between min-h-[240px]"
                >
                  {/* 45-degree angle cuts */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-right-14 sm:-top-14 sm:h-28 sm:w-28" />
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-bottom-14 sm:-left-14 sm:h-28 sm:w-28" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-[0_6px_14px_rgba(11,40,31,0.12)] border-[#0B281F]/8 bg-white/42 text-[#0B281F] transition-transform duration-500 group-hover:scale-105 sm:h-10 sm:w-10`}>
                        <Icon size={16} strokeWidth={2.4} />
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-md bg-[#0b281f]/5 px-2 py-0.5 text-neutral-400">
                        <span className="text-[9.5px] font-bold font-mono">1.0 MAX</span>
                      </div>
                    </div>

                    <h4 className="font-[Georgia,serif] text-[14px] sm:text-[15px] font-bold leading-snug text-[#0B281F] mb-1.5 transition-colors duration-300 group-hover:text-[#009966]">
                      {p.name}
                    </h4>
                    <p className="text-[10px] leading-relaxed text-[#0B281F]/60 line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-4 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-[0.05em] text-[#0B281F]/40">Skor Dimensi</span>
                      <span className="text-[20px] font-bold text-[#0B281F] font-[Georgia,serif] leading-none">{p.score}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-[#0b281f]/5 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000" 
                        style={{ 
                          width: `${p.percentage}%`,
                          backgroundColor: p.color
                        }} 
                      />
                    </div>
                    <div className="flex justify-end">
                      <span className="text-[9px] font-bold font-mono" style={{ color: p.color }}>{p.percentage}% Capaian</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 2. Visual Charts Section (Analisis Dimensi & Tren Kemajuan) */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Visualisasi &<br />Analisis IDM</>} 
          description="Grafik komparatif pilar Indeks Desa Membangun dan rekam jejak pertumbuhan skor kemandirian Desa Pameutingan secara berkala." 
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card A: Analisis Dimensi */}
          <div className="hero-reveal rounded-[24px] border border-[#0B281F]/8 bg-[#0b281f]/[0.01] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#009966]/20 bg-[#009966]/5 px-2.5 py-0.5 text-[9px] font-bold text-[#009966] tracking-wide uppercase">
                Perbandingan Pilar
              </span>
              <h3 className="font-[Georgia,serif] text-[18px] sm:text-[20px] font-bold text-[#0B281F] mt-2 mb-1">
                Analisis Dimensi
              </h3>
              <p className="text-[11px] text-[#0B281F]/60">
                Perbandingan skor antar 3 pilar utama IDM
              </p>
            </div>

            {/* Custom High-Fidelity Pilar Chart */}
            <div className="flex h-56 items-end justify-around gap-4 rounded-[20px] bg-neutral-50/50 p-6 border border-neutral-100 relative mt-4">
              {/* Grid Backlines */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
                <div className="w-full border-t border-neutral-200/40 text-[8.5px] text-neutral-400 font-mono text-right">1.0 MAX</div>
                <div className="w-full border-t border-neutral-200/40 text-[8.5px] text-neutral-400 font-mono text-right">0.75</div>
                <div className="w-full border-t border-neutral-200/40 text-[8.5px] text-neutral-400 font-mono text-right">0.50</div>
                <div className="w-full border-t border-neutral-200/40 text-[8.5px] text-neutral-400 font-mono text-right">0.25</div>
                <div className="w-full border-t border-neutral-200/40 text-[8.5px] text-neutral-400 font-mono text-right">0.00</div>
              </div>
              
              {/* IKS Pillar */}
              <div className="flex flex-col items-center gap-2 group relative z-10 w-14 xs:w-16">
                <span className="text-[10px] font-bold text-[#0B281F] font-mono bg-white border border-[#0B281F]/8 px-1.5 py-0.5 rounded-md shadow-xs">0,912</span>
                <div className="w-8 bg-neutral-200/40 rounded-full h-32 overflow-hidden flex items-end">
                  <div className="w-full bg-gradient-to-t from-[#0B281F] to-[#009966] rounded-full transition-all duration-1000 ease-out group-hover:brightness-105" style={{ height: '91.2%' }} />
                </div>
                <span className="text-[9.5px] font-bold text-neutral-600 uppercase tracking-wider">IKS (91%)</span>
              </div>

              {/* IKE Pillar */}
              <div className="flex flex-col items-center gap-2 group relative z-10 w-14 xs:w-16">
                <span className="text-[10px] font-bold text-[#0B281F] font-mono bg-white border border-[#0B281F]/8 px-1.5 py-0.5 rounded-md shadow-xs">0,845</span>
                <div className="w-8 bg-neutral-200/40 rounded-full h-32 overflow-hidden flex items-end">
                  <div className="w-full bg-gradient-to-t from-[#0B281F] to-[#F0B100] rounded-full transition-all duration-1000 ease-out group-hover:brightness-105" style={{ height: '84.5%' }} />
                </div>
                <span className="text-[9.5px] font-bold text-neutral-600 uppercase tracking-wider">IKE (84%)</span>
              </div>

              {/* IKL Pillar */}
              <div className="flex flex-col items-center gap-2 group relative z-10 w-14 xs:w-16">
                <span className="text-[10px] font-bold text-[#0B281F] font-mono bg-white border border-[#0B281F]/8 px-1.5 py-0.5 rounded-md shadow-xs">0,820</span>
                <div className="w-8 bg-neutral-200/40 rounded-full h-32 overflow-hidden flex items-end">
                  <div className="w-full bg-gradient-to-t from-[#0B281F] to-[#008F5D] rounded-full transition-all duration-1000 ease-out group-hover:brightness-105" style={{ height: '82.0%' }} />
                </div>
                <span className="text-[9.5px] font-bold text-neutral-600 uppercase tracking-wider">IKL (82%)</span>
              </div>
            </div>
          </div>

          {/* Card B: Tren Kemajuan */}
          <div className="hero-reveal rounded-[24px] border border-[#0B281F]/8 bg-[#0b281f]/[0.01] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#009966]/20 bg-[#009966]/5 px-2.5 py-0.5 text-[9px] font-bold text-[#009966] tracking-wide uppercase">
                Grafik Pertumbuhan
              </span>
              <h3 className="font-[Georgia,serif] text-[18px] sm:text-[20px] font-bold text-[#0B281F] mt-2 mb-1">
                Tren Kemajuan
              </h3>
              <p className="text-[11px] text-[#0B281F]/60">
                Perkembangan skor IDM dari tahun ke tahun
              </p>
            </div>

            {/* Custom High-Fidelity SVG Line Chart */}
            <div className="flex h-56 items-center justify-center rounded-[20px] bg-neutral-50/50 p-6 border border-neutral-100 relative mt-4">
              {/* Grid lines in background */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
                <div className="w-full border-t border-neutral-200/40 text-[8.5px] text-neutral-400 font-mono text-right">1.0 MAX</div>
                <div className="w-full border-t border-neutral-200/40 text-[8.5px] text-neutral-400 font-mono text-right">0.75</div>
                <div className="w-full border-t border-neutral-200/40 text-[8.5px] text-neutral-400 font-mono text-right">0.50</div>
                <div className="w-full border-t border-neutral-200/40 text-[8.5px] text-neutral-400 font-mono text-right">0.25</div>
                <div className="w-full border-t border-neutral-200/40 text-[8.5px] text-neutral-400 font-mono text-right">0.00</div>
              </div>

              {/* SVG Path drawing */}
              <svg className="w-full h-full max-h-40 overflow-visible relative z-10 px-4" viewBox="0 0 500 120">
                {/* Glow path */}
                <path 
                  d="M 20,95 L 130,83 L 240,71 L 350,57 L 460,43" 
                  fill="none" 
                  stroke="rgba(0,153,102,0.12)" 
                  strokeWidth="12" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Main Path */}
                <path 
                  d="M 20,95 L 130,83 L 240,71 L 350,57 L 460,43" 
                  fill="none" 
                  stroke="#009966" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                
                {/* 2022 Dot */}
                <g className="group cursor-pointer">
                  <circle cx="20" cy="95" r="5.5" fill="#0B281F" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="20" y="114" textAnchor="middle" className="text-[9.5px] font-bold fill-neutral-600">2022</text>
                  <text x="20" y="80" textAnchor="middle" className="text-[8.5px] font-bold fill-[#0B281F] font-mono">0,751</text>
                </g>

                {/* 2023 Dot */}
                <g className="group cursor-pointer">
                  <circle cx="130" cy="83" r="5.5" fill="#0B281F" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="130" y="114" textAnchor="middle" className="text-[9.5px] font-bold fill-neutral-600">2023</text>
                  <text x="130" y="68" textAnchor="middle" className="text-[8.5px] font-bold fill-[#0B281F] font-mono">0,782</text>
                </g>

                {/* 2024 Dot */}
                <g className="group cursor-pointer">
                  <circle cx="240" cy="71" r="5.5" fill="#0B281F" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="240" y="114" textAnchor="middle" className="text-[9.5px] font-bold fill-neutral-600">2024</text>
                  <text x="240" y="56" textAnchor="middle" className="text-[8.5px] font-bold fill-[#0B281F] font-mono">0,815</text>
                </g>

                {/* 2025 Dot */}
                <g className="group cursor-pointer">
                  <circle cx="350" cy="57" r="5.5" fill="#009966" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="350" y="114" textAnchor="middle" className="text-[9.5px] font-bold fill-neutral-600">2025</text>
                  <text x="350" y="42" textAnchor="middle" className="text-[8.5px] font-bold fill-[#009966] font-mono">0,854</text>
                </g>

                {/* 2026 Dot */}
                <g className="group cursor-pointer">
                  <circle cx="460" cy="43" r="7" fill="#F0B100" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="460" y="114" textAnchor="middle" className="text-[9.5px] font-bold fill-[#0B281F] font-bold">2026</text>
                  <text x="460" y="28" textAnchor="middle" className="text-[9.5px] font-bold fill-[#F0B100] font-mono">0,892</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Analisis Strategis Card Section */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Analisis<br />Strategis</>} 
          description="Penilaian taktis keberlanjutan status kemandirian desa serta akses berkas laporan resmi penilaian IDM." 
        />

        <div className="hero-reveal grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Text Statement Block */}
          <div className="lg:col-span-2 border border-[#0B281F]/8 bg-[#0b281f]/[0.02] rounded-[24px] p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-[#009966]/5 rounded-bl-[80px]" />
            <span className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-[#0B281F]/40 mb-2 block">STATUS CAPAIAN DESA</span>
            <p className="font-[Georgia,serif] text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed text-[#0B281F] italic">
              "Desa Pameutingan di Kecamatan Cipatujah saat ini menyandang status Desa Mandiri dengan skor IDM 0.8924. Capaian ini menunjukkan bahwa desa telah memiliki kemampuan melaksanakan pembangunan desa untuk peningkatan kualitas hidup dan sebesar-besarnya kesejahteraan masyarakat desa dengan ketahanan sosial, ketahanan ekonomi, dan ketahanan ekologi secara berkelanjutan."
            </p>
          </div>

          {/* Action Download Block */}
          <div className="lg:col-span-1 flex flex-col justify-center items-center lg:items-start p-4 text-center lg:text-left gap-4">
            <h4 className="font-[Georgia,serif] text-[16px] font-bold text-[#0B281F]">
              Dokumen Laporan IDM
            </h4>
            <p className="text-[10px] text-[#0B281F]/60 max-w-[240px]">
              Dapatkan berkas penilaian resmi lengkap yang diterbitkan oleh Kementerian Desa PDTT.
            </p>
            
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                alert('Mengunduh Laporan Lengkap IDM Desa Pameutingan 2026...')
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#009966] hover:bg-[#008055] px-6 py-3 text-white text-[12px] font-bold transition-all duration-300 hover:scale-103 shadow-[0_8px_16px_rgba(0,153,102,0.15)] group"
            >
              <Download size={15} strokeWidth={2.4} className="transition-transform group-hover:-translate-y-0.5" />
              <span>Download Laporan Lengkap</span>
            </a>

            <span className="text-[9px] text-neutral-400 font-mono mt-2">
              Sumber: Kemendesa PDTT (Tahun Data 2026)
            </span>
          </div>
        </div>
      </section>

      {/* 4. Detail Indikator Penyusun Section */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Detail Indikator<br />Penyusun</>} 
          description="Variabel penilaian mendalam yang membangun three pilar indeks utama IDM Desa Pameutingan."  
        />

        {/* Filters and Search Bar */}
        <div className="hero-reveal mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-[#0B281F]/10 pb-5">
          {/* Tab filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full sm:w-auto sm:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`shrink-0 snap-start px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 ${
                activeTab === 'all' 
                  ? 'bg-[#0B281F] text-white shadow-xs' 
                  : 'bg-[#0b281f]/5 text-[#0B281F]/70 hover:bg-[#0b281f]/8'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveTab('iks')}
              className={`shrink-0 snap-start px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 ${
                activeTab === 'iks' 
                  ? 'bg-[#009966] text-white shadow-xs' 
                  : 'bg-[#0b281f]/5 text-[#0B281F]/70 hover:bg-[#0b281f]/8'
              }`}
            >
              Ketahanan Sosial
            </button>
            <button
              onClick={() => setActiveTab('ike')}
              className={`shrink-0 snap-start px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 ${
                activeTab === 'ike' 
                  ? 'bg-[#F0B100] text-white shadow-xs' 
                  : 'bg-[#0b281f]/5 text-[#0B281F]/70 hover:bg-[#0b281f]/8'
              }`}
            >
              Ketahanan Ekonomi
            </button>
            <button
              onClick={() => setActiveTab('ikl')}
              className={`shrink-0 snap-start px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 ${
                activeTab === 'ikl' 
                  ? 'bg-[#008F5D] text-white shadow-xs' 
                  : 'bg-[#0b281f]/5 text-[#0B281F]/70 hover:bg-[#0b281f]/8'
              }`}
            >
              Ketahanan Ekologi
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-60">
            <span className="absolute inset-y-0 left-3.5 flex items-center text-neutral-400">
              <Search size={14} />
            </span>
            <input 
              type="text" 
              placeholder="Cari indikator IDM..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b281f]/5 border-none rounded-full py-1.5 pl-10 pr-4 text-[11.5px] text-[#0B281F] placeholder-[#0B281F]/40 focus:bg-[#0b281f]/8 focus:ring-1 focus:ring-[#009966] transition-all"
            />
          </div>
        </div>

        {/* Table Display */}
        <div className="hero-reveal mt-6 overflow-hidden rounded-[24px] border border-[#0B281F]/8 shadow-[0_4px_16px_rgba(0,0,0,0.015)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="bg-[#0b281f]/[0.03] border-b border-[#0B281F]/8">
                  <th className="w-16 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50 text-center">No</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50">Indikator Penilaian</th>
                  <th className="w-32 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50 text-center">Pilar</th>
                  <th className="w-24 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50 text-center">Skor</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50">Deskripsi Keadaan / Rekomendasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B281F]/6">
                {filteredIndicators.length > 0 ? (
                  filteredIndicators.map((row, index) => {
                    const pillBg = row.pilar === 'iks' ? 'bg-[#009966]/10 text-[#009966] border-[#009966]/20' :
                                   row.pilar === 'ike' ? 'bg-[#F0B100]/10 text-[#F0B100] border-[#F0B100]/20' :
                                   'bg-[#008F5D]/10 text-[#008F5D] border-[#008F5D]/20'
                    return (
                      <tr key={row.no} className="hover:bg-[#0b281f]/[0.01] transition-all">
                        <td className="px-6 py-4.5 text-center text-[12px] font-medium text-[#0B281F]/50">{row.no}</td>
                        <td className="px-6 py-4.5">
                          <p className="text-[12.5px] font-bold text-[#0B281F]">{row.indikator}</p>
                          <p className="text-[9px] text-[#0B281F]/40 uppercase tracking-wide mt-0.5">TERDATA OLEH KEMENDESA</p>
                        </td>
                        <td className="px-6 py-4.5 text-center">
                          <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[9.5px] font-bold tracking-wide uppercase ${pillBg}`}>
                            {row.pilarName}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-center">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#009966]/10 font-mono text-[12px] font-bold text-[#009966] border border-[#009966]/15 shadow-xs">
                            {row.skor}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-[11.5px] leading-relaxed text-[#0B281F]/70 italic">
                          {row.keterangan}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[12px] text-neutral-400 italic">
                      Tidak ada indikator IDM yang cocok dengan pencarian Anda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
