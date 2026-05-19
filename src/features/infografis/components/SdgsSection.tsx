'use client'

import React, { useState } from 'react'
import { 
  MapPin, 
  Calendar, 
  Search, 
  TrendingUp, 
  Target, 
  CheckCircle,
  HelpCircle,
  ArrowUpRight,
  Sparkles,
  Zap,
  Droplet,
  AlertTriangle,
  Award,
  Clock,
  Compass,
  Smile,
  ShieldAlert,
  FlameKindling
} from 'lucide-react'
import { sectionCardClass, SectionHeader } from './section-ui'

export function SdgsSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<'all' | 'tercapai' | 'proses' | 'belum'>('all')

  // 18 SDGs Goals Data
  const sdgsGoals = [
    { no: 1, title: 'Desa Tanpa Kemiskinan', score: 85.4, status: 'Tercapai', category: 'tercapai', description: 'Menghapus kemiskinan ekstrem di seluruh wilayah desa Pameutingan.' },
    { no: 2, title: 'Desa Tanpa Kelaparan', score: 78.2, status: 'Berkembang', category: 'proses', description: 'Menjamin ketersediaan pangan bergizi dan pertanian berkelanjutan.' },
    { no: 3, title: 'Desa Sehat dan Sejahtera', score: 92.1, status: 'Tercapai', category: 'tercapai', description: 'Menjamin kehidupan yang sehat dan meningkatkan kesejahteraan warga.' },
    { no: 4, title: 'Pendidikan Desa Berkualitas', score: 65.8, status: 'Berkembang', category: 'proses', description: 'Menjamin kualitas pendidikan yang inklusif dan merata bagi warga.' },
    { no: 5, title: 'Keterlibatan Perempuan Desa', score: 88.5, status: 'Tercapai', category: 'tercapai', description: 'Mencapai kesetaraan gender dan memberdayakan peran perempuan desa.' },
    { no: 6, title: 'Desa Layak Air Bersih dan Sanitasi', score: 42.3, status: 'Belum Tercapai', category: 'belum', description: 'Menjamin ketersediaan dan pengelolaan air bersih serta sanitasi layak.' },
    { no: 7, title: 'Desa Berenergi Bersih dan Terbarukan', score: 15.0, status: 'Belum Tercapai', category: 'belum', description: 'Menjamin akses energi yang terjangkau, andal, dan ramah lingkungan.' },
    { no: 8, title: 'Pertumbuhan Ekonomi Desa Merata', score: 72.4, status: 'Berkembang', category: 'proses', description: 'Meningkatkan pertumbuhan ekonomi desa yang inklusif dan berkelanjutan.' },
    { no: 9, title: 'Infrastruktur dan Inovasi Desa', score: 81.0, status: 'Tercapai', category: 'tercapai', description: 'Membangun infrastruktur tangguh dan mendukung inovasi lokal.' },
    { no: 10, title: 'Desa Tanpa Kesenjangan', score: 77.2, status: 'Berkembang', category: 'proses', description: 'Mengurangi kesenjangan pendapatan dan akses fasilitas di desa.' },
    { no: 11, title: 'Kawasan Pemukiman Desa Aman', score: 95.4, status: 'Tercapai', category: 'tercapai', description: 'Menjadikan pemukiman desa aman, tangguh, dan berkelanjutan.' },
    { no: 12, title: 'Konsumsi dan Produksi Sadar Lingkungan', score: 55.0, status: 'Berkembang', category: 'proses', description: 'Menjamin pola konsumsi dan produksi yang bertanggung jawab.' },
    { no: 13, title: 'Desa Tanggap Perubahan Iklim', score: 62.1, status: 'Berkembang', category: 'proses', description: 'Mengambil tindakan cepat untuk mengatasi dampak perubahan iklim.' },
    { no: 14, title: 'Desa Peduli Lingkungan Laut', score: 98.0, status: 'Tercapai', category: 'tercapai', description: 'Melestarikan potensi maritim dan ekosistem perairan pantai desa.' },
    { no: 15, title: 'Desa Peduli Lingkungan Darat', score: 84.3, status: 'Tercapai', category: 'tercapai', description: 'Melindungi dan memulihkan pemanfaatan berkelanjutan ekosistem darat.' },
    { no: 16, title: 'Desa Damai Berkeadilan', score: 100.0, status: 'Tercapai', category: 'tercapai', description: 'Mendukung masyarakat yang damai, adil, dan kelembagaan yang tangguh.' },
    { no: 17, title: 'Kemitraan untuk Pembangunan Desa', score: 75.6, status: 'Berkembang', category: 'proses', description: 'Memperkuat kemitraan pembangunan desa dengan pihak ketiga/akademisi.' },
    { no: 18, title: 'Kelembagaan Desa Dinamis', score: 88.9, status: 'Tercapai', category: 'tercapai', description: 'Melestarikan adat budaya lokal serta menjaga dinamika lembaga desa.' }
  ]

  // Sectors Data (4 Pilar)
  const sectors = [
    { name: 'Sosial', score: 88.5, color: '#009966', icon: Smile },
    { name: 'Ekonomi', score: 76.5, color: '#F0B100', icon: TrendingUp },
    { name: 'Lingkungan', score: 67.2, color: '#008F5D', icon: Compass },
    { name: 'Tata Kelola', score: 82.0, color: '#0B281F', icon: Award }
  ]

  // Programs Data
  const programs = [
    { name: 'Pembangunan Sumur Bor Komunal', target: 'SDGs Tujuan 6', status: 'Berjalan', badge: 'bg-amber-500/10 text-amber-700 border-amber-500/20', icon: Droplet },
    { name: 'Program Desa Terang Solar Cell', target: 'SDGs Tujuan 7', status: 'Direncanakan', badge: 'bg-sky-500/10 text-sky-700 border-sky-500/20', icon: Zap },
    { name: 'Pelatihan Digital Marketing UMKM', target: 'SDGs Tujuan 8', status: 'Selesai', badge: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20', icon: TrendingUp },
    { name: 'Restorasi Terumbu Karang', target: 'SDGs Tujuan 14', status: 'Selesai', badge: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20', icon: Compass }
  ]

  const filteredGoals = sdgsGoals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          goal.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activeFilter === 'all' || goal.category === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 md:space-y-8" id="sdgs">
      {/* 1. Overview & Highlights Section */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>SDGs Desa<br />Pameutingan</>} 
          description="SDGs Desa adalah upaya terpadu mewujudkan Desa tanpa kemiskinan dan kelaparan, Desa ekonomi tumbuh merata, Desa peduli kesehatan, Desa peduli lingkungan, Desa peduli pendidikan, Desa ramah perempuan, Desa berjejaring, dan Desa tanggap budaya." 
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
            <span>Dashboard SDGs Desa Pameutingan</span>
          </div>
          <div className="sm:ml-auto flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B281F] text-white text-[11.5px] sm:text-[12px] font-bold">
            <Calendar size={13} className="text-[#F0B100]" />
            <span>Data Tahun 2025</span>
          </div>
        </div>

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Indeks SDGs */}
          <div className="hero-reveal relative overflow-hidden rounded-tl-[24px] rounded-br-[24px] p-5 text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:rounded-tl-[28px] sm:rounded-br-[28px] bg-linear-to-br from-[#0B281F] via-[#004F3B] to-[#003828] flex flex-col justify-between min-h-[170px] isolate shadow-[0_12px_24px_rgba(0,0,0,0.04)]">
            {/* 45-degree angle cuts */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-right-14 sm:-top-14 sm:h-28 sm:w-28" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-bottom-14 sm:-left-14 sm:h-28 sm:w-28" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/18 bg-[#0B281F]/48 text-[#00D492] shadow-[0_4px_10px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:scale-105">
                <TrendingUp size={15} />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#009966] px-2 py-0.5 text-[9px] text-white" style={{ fontFamily: 'Georgia, serif' }}>
                <span className="h-1 w-1 rounded-full bg-[#F0B100]" />
                SKOR GENERAL
              </span>
            </div>

            <div className="relative z-10 mt-4">
              <p className="text-[10px] text-[#EAF7F1]/60 uppercase font-bold tracking-wider">Indeks SDGs</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[34px] sm:text-[40px] font-bold leading-none text-[#F0B100]" style={{ fontFamily: 'Georgia, serif' }}>
                  74,5
                </span>
                <span className="text-[10px] text-[#EAF7F1]/55 font-mono">/ 100 PTS</span>
              </div>
            </div>
          </div>

          {/* Card 2: Tujuan Tercapai */}
          <div className="hero-reveal group relative isolate overflow-hidden rounded-tl-[24px] rounded-br-[24px] p-5 border border-[#0B281F]/8 bg-[#0b281f]/[0.02] shadow-[0_12px_24px_rgba(0,0,0,0.01)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#009966]/25 hover:bg-[#0b281f]/[0.04] flex flex-col justify-between min-h-[170px]">
            {/* 45-degree angle cuts */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-right-14 sm:-top-14 sm:h-28 sm:w-28" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-bottom-14 sm:-left-14 sm:h-28 sm:w-28" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#0B281F]/8 bg-white/42 text-[#009966] shadow-[0_4px_10px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:scale-105">
                <CheckCircle size={15} />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0b281f]/5 px-2 py-0.5 text-[9px] text-[#0B281F]/60 uppercase font-bold tracking-wider">
                KATEGORI A
              </span>
            </div>

            <div className="relative z-10 mt-4">
              <p className="text-[10px] text-[#0B281F]/60 uppercase font-bold tracking-wider">Tujuan Tercapai</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[34px] sm:text-[40px] font-bold leading-none text-[#009966]" style={{ fontFamily: 'Georgia, serif' }}>
                  9
                </span>
                <span className="text-[10px] text-[#0B281F]/50 font-bold uppercase" style={{ fontFamily: 'Georgia, serif' }}>Tujuan</span>
              </div>
            </div>
          </div>

          {/* Card 3: Dalam Proses */}
          <div className="hero-reveal group relative isolate overflow-hidden rounded-tl-[24px] rounded-br-[24px] p-5 border border-[#0B281F]/8 bg-[#0b281f]/[0.02] shadow-[0_12px_24px_rgba(0,0,0,0.01)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#009966]/25 hover:bg-[#0b281f]/[0.04] flex flex-col justify-between min-h-[170px]">
            {/* 45-degree angle cuts */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-right-14 sm:-top-14 sm:h-28 sm:w-28" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-bottom-14 sm:-left-14 sm:h-28 sm:w-28" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#0B281F]/8 bg-white/42 text-[#F0B100] shadow-[0_4px_10px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:scale-105">
                <Clock size={15} />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0b281f]/5 px-2 py-0.5 text-[9px] text-[#0B281F]/60 uppercase font-bold tracking-wider">
                KATEGORI B
              </span>
            </div>

            <div className="relative z-10 mt-4">
              <p className="text-[10px] text-[#0B281F]/60 uppercase font-bold tracking-wider">Dalam Proses</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[34px] sm:text-[40px] font-bold leading-none text-[#F0B100]" style={{ fontFamily: 'Georgia, serif' }}>
                  7
                </span>
                <span className="text-[10px] text-[#0B281F]/50 font-bold uppercase" style={{ fontFamily: 'Georgia, serif' }}>Tujuan</span>
              </div>
            </div>
          </div>

          {/* Card 4: Belum Tercapai */}
          <div className="hero-reveal group relative isolate overflow-hidden rounded-tl-[24px] rounded-br-[24px] p-5 border border-[#0B281F]/8 bg-[#0b281f]/[0.02] shadow-[0_12px_24px_rgba(0,0,0,0.01)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#009966]/25 hover:bg-[#0b281f]/[0.04] flex flex-col justify-between min-h-[170px]">
            {/* 45-degree angle cuts */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-right-14 sm:-top-14 sm:h-28 sm:w-28" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rotate-45 bg-[#FFFFFF] sm:-bottom-14 sm:-left-14 sm:h-28 sm:w-28" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#0B281F]/8 bg-white/42 text-[#FF4D4D] shadow-[0_4px_10px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:scale-105">
                <AlertTriangle size={15} />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0b281f]/5 px-2 py-0.5 text-[9px] text-[#0B281F]/60 uppercase font-bold tracking-wider">
                KATEGORI C
              </span>
            </div>

            <div className="relative z-10 mt-4">
              <p className="text-[10px] text-[#0B281F]/60 uppercase font-bold tracking-wider">Belum Tercapai</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[34px] sm:text-[40px] font-bold leading-none text-[#FF4D4D]" style={{ fontFamily: 'Georgia, serif' }}>
                  2
                </span>
                <span className="text-[10px] text-[#0B281F]/50 font-bold uppercase" style={{ fontFamily: 'Georgia, serif' }}>Tujuan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visualisasi Capaian SDGs (Custom Interactive Charts) */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Visualisasi<br />Capaian SDGs</>} 
          description="Penyajian data capaian SDGs Desa dalam bentuk grafik untuk memudahkan pemantauan dan evaluasi progres pembangunan berkelanjutan di tingkat desa." 
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card A: Perbandingan Sektor */}
          <div className="hero-reveal rounded-[24px] border border-[#0B281F]/8 bg-[#0b281f]/[0.01] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#009966]/20 bg-[#009966]/5 px-2.5 py-0.5 text-[9px] font-bold text-[#009966] tracking-wide uppercase">
                Perbandingan Sektor
              </span>
              <h3 className="font-[Georgia,serif] text-[18px] sm:text-[20px] font-bold text-[#0B281F] mt-2 mb-1">
                4 Pilar Utama
              </h3>
              <p className="text-[11px] text-[#0B281F]/60">
                Rata-rata capaian berdasarkan 4 pilar utama pembangunan
              </p>
            </div>

            {/* Horizontal Sectors List */}
            <div className="space-y-4 mt-4">
              {sectors.map((sec) => {
                const Icon = sec.icon
                return (
                  <div key={sec.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-[#0B281F]">
                        <div className="h-6 w-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                          <Icon size={12} />
                        </div>
                        <span>Pilar {sec.name}</span>
                      </div>
                      <span className="font-bold font-mono" style={{ color: sec.color }}>{sec.score}%</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full bg-[#0b281f]/5 rounded-full h-2 overflow-hidden border border-neutral-100">
                      <div 
                        className="h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${sec.score}%`, backgroundColor: sec.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Card B: Capaian Tiap Tujuan */}
          <div className="hero-reveal rounded-[24px] border border-[#0B281F]/8 bg-[#0b281f]/[0.01] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#009966]/20 bg-[#009966]/5 px-2.5 py-0.5 text-[9px] font-bold text-[#009966] tracking-wide uppercase">
                Grafik Batang Capaian
              </span>
              <h3 className="font-[Georgia,serif] text-[18px] sm:text-[20px] font-bold text-[#0B281F] mt-2 mb-1">
                Capaian Tiap Tujuan
              </h3>
              <p className="text-[11px] text-[#0B281F]/60">
                Persentase keberhasilan 18 indikator SDGs Desa
              </p>
            </div>

            {/* Custom High-Fidelity SVG Bar Chart */}
            <div className="flex h-56 items-end justify-center rounded-[20px] bg-neutral-50/50 p-4 border border-neutral-100 relative mt-4">
              {/* Grid backlines */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                <div className="w-full border-t border-neutral-200/40 text-[8px] text-neutral-400 font-mono text-right">100%</div>
                <div className="w-full border-t border-neutral-200/40 text-[8px] text-neutral-400 font-mono text-right">75%</div>
                <div className="w-full border-t border-neutral-200/40 text-[8px] text-neutral-400 font-mono text-right">50%</div>
                <div className="w-full border-t border-neutral-200/40 text-[8px] text-neutral-400 font-mono text-right">25%</div>
                <div className="w-full border-t border-neutral-200/40 text-[8px] text-neutral-400 font-mono text-right">0%</div>
              </div>

              {/* Chart Bars */}
              <div className="w-full h-full max-h-36 flex items-end justify-around relative z-10 px-2">
                {[
                  { label: 'T1', score: 85.4, color: '#009966' },
                  { label: 'T3', score: 92.1, color: '#009966' },
                  { label: 'T5', score: 88.5, color: '#009966' },
                  { label: 'T7', score: 15.0, color: '#D9383A' },
                  { label: 'T9', score: 81.0, color: '#009966' },
                  { label: 'T11', score: 95.4, color: '#009966' },
                  { label: 'T13', score: 62.1, color: '#F0B100' },
                  { label: 'T15', score: 84.3, color: '#009966' },
                  { label: 'T17', score: 75.6, color: '#F0B100' }
                ].map((bar, idx) => (
                  <div key={bar.label} className="flex flex-col items-center gap-1 group w-5 xs:w-7">
                    <span className="text-[7.5px] font-bold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-600 bg-white border border-neutral-100 rounded px-0.5 py-0.2 shadow-xs absolute -translate-y-8 z-20">
                      {bar.score}%
                    </span>
                    <div className="w-2 xs:w-3 sm:w-4 bg-neutral-200/40 rounded-t-md h-24 sm:h-28 overflow-hidden flex items-end">
                      <div 
                        className="w-full rounded-t-md transition-all duration-1000 ease-out group-hover:brightness-105" 
                        style={{ height: `${bar.score}%`, backgroundColor: bar.color }} 
                      />
                    </div>
                    <span className="text-[8px] xs:text-[9px] font-bold text-neutral-500 font-mono mt-0.5">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ringkasan Insight Strategis Section */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Ringkasan<br />Insight Strategis</>} 
          description="Analisis singkat mengenai kekuatan dan tantangan utama desa dalam mencapai tujuan pembangunan berkelanjutan berdasarkan data indikator SDGs." 
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
          {/* Kekuatan Utama (Hijau) */}
          <div className="hero-reveal rounded-[24px] border border-[#009966]/20 bg-[#009966]/[0.01] p-6 shadow-[0_4px_16px_rgba(0,153,102,0.01)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 h-16 w-16 bg-[#009966]/5 rounded-bl-[80px]" />
            <div>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#009966]/20 bg-[#009966]/5 px-2.5 py-0.5 text-[9px] font-bold text-[#009966] tracking-wide uppercase">
                Pilar Kekuatan
              </span>
              <h3 className="font-[Georgia,serif] text-[18px] sm:text-[20px] font-bold text-[#0B281F] mt-2.5 mb-1.5">
                Kekuatan Utama
              </h3>
              <p className="text-[11px] text-[#0B281F]/50 border-b border-neutral-100 pb-3">
                Aspek keberlanjutan yang telah sukses berjalan optimal di desa Pameutingan.
              </p>
            </div>

            <ul className="space-y-3 mt-4 text-xs font-semibold text-[#0B281F]/80">
              <li className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-[#009966] shrink-0 mt-0.5" />
                <span>Kesehatan masyarakat terjamin dengan akses Posyandu 100%</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-[#009966] shrink-0 mt-0.5" />
                <span>Keamanan dan ketertiban desa sangat terjaga (Zero Crime)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-[#009966] shrink-0 mt-0.5" />
                <span>Kelestarian lingkungan darat dan laut menjadi prioritas utama</span>
              </li>
            </ul>
          </div>

          {/* Tantangan Utama (Rose) */}
          <div className="hero-reveal rounded-[24px] border border-rose-500/20 bg-rose-500/[0.01] p-6 shadow-[0_4px_16px_rgba(220,38,38,0.01)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 h-16 w-16 bg-rose-500/5 rounded-bl-[80px]" />
            <div>
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/20 bg-rose-500/5 px-2.5 py-0.5 text-[9px] font-bold text-rose-600 tracking-wide uppercase">
                Pilar Tantangan
              </span>
              <h3 className="font-[Georgia,serif] text-[18px] sm:text-[20px] font-bold text-[#0B281F] mt-2.5 mb-1.5">
                Tantangan Utama
              </h3>
              <p className="text-[11px] text-[#0B281F]/50 border-b border-neutral-100 pb-3">
                Aspek prioritas yang membutuhkan intervensi program pembangunan ke depan.
              </p>
            </div>

            <ul className="space-y-3 mt-4 text-xs font-semibold text-[#0B281F]/80">
              <li className="flex items-start gap-2.5">
                <AlertTriangle size={15} className="text-rose-500 shrink-0 mt-0.5" />
                <span>Akses air bersih dan sanitasi layak masih perlu ditingkatkan</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangle size={15} className="text-rose-500 shrink-0 mt-0.5" />
                <span>Pemanfaatan energi terbarukan masih sangat rendah</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangle size={15} className="text-rose-500 shrink-0 mt-0.5" />
                <span>Rata-rata lama sekolah perlu ditingkatkan melalui program kejar paket</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Program Desa Pendukung SDGs */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Program Desa<br />Pendukung SDGs</>} 
          description="Daftar program dan kegiatan pemerintah desa yang berkontribusi langsung terhadap pencapaian target-target SDGs Desa Pameutingan." 
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          {programs.map((prog) => {
            const Icon = prog.icon
            return (
              <div 
                key={prog.name}
                className="hero-reveal group rounded-[20px] border border-[#0B281F]/8 bg-[#0b281f]/[0.02] p-5 hover:bg-[#0b281f]/[0.03] hover:border-[#009966]/20 transition-all duration-300 flex flex-col justify-between min-h-[140px]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-8 w-8 rounded-full bg-[#009966]/10 border border-[#009966]/25 flex items-center justify-center text-[#009966]">
                    <Icon size={14} />
                  </div>
                  <span className={`inline-flex px-2 py-0.5 rounded-full border text-[8.5px] font-bold uppercase ${prog.badge}`}>
                    {prog.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-[12.5px] text-[#0B281F] leading-snug group-hover:text-[#009966] transition-colors duration-200">
                    {prog.name}
                  </h4>
                  <p className="text-[9px] font-bold text-neutral-400 font-mono mt-1">
                    {prog.target}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. Complete 18 SDGs Goals Explorer Table */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Daftar Capaian<br />18 Tujuan SDGs</>} 
          description="Status keberlanjutan dan nilai indikator untuk masing-masing dari 18 pilar pembangunan berkelanjutan Desa Pameutingan." 
        />

        {/* Filters and Search Bar */}
        <div className="hero-reveal mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-[#0B281F]/10 pb-5">
          {/* Tab filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full sm:w-auto sm:pb-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`shrink-0 snap-start px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all duration-300 ${
                activeFilter === 'all' 
                  ? 'bg-[#0B281F] text-white shadow-xs' 
                  : 'bg-[#0b281f]/5 text-[#0B281F]/70 hover:bg-[#0b281f]/8'
              }`}
            >
              Semua (18)
            </button>
            <button
              onClick={() => setActiveFilter('tercapai')}
              className={`shrink-0 snap-start px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all duration-300 ${
                activeFilter === 'tercapai' 
                  ? 'bg-[#009966] text-white shadow-xs' 
                  : 'bg-[#0b281f]/5 text-[#0B281F]/70 hover:bg-[#0b281f]/8'
              }`}
            >
              Tercapai (9)
            </button>
            <button
              onClick={() => setActiveFilter('proses')}
              className={`shrink-0 snap-start px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all duration-300 ${
                activeFilter === 'proses' 
                  ? 'bg-[#F0B100] text-white shadow-xs' 
                  : 'bg-[#0b281f]/5 text-[#0B281F]/70 hover:bg-[#0b281f]/8'
              }`}
            >
              Berkembang (7)
            </button>
            <button
              onClick={() => setActiveFilter('belum')}
              className={`shrink-0 snap-start px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all duration-300 ${
                activeFilter === 'belum' 
                  ? 'bg-rose-600 text-white shadow-xs' 
                  : 'bg-[#0b281f]/5 text-[#0B281F]/70 hover:bg-[#0b281f]/8'
              }`}
            >
              Belum Tercapai (2)
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-60">
            <span className="absolute inset-y-0 left-3.5 flex items-center text-neutral-400">
              <Search size={14} />
            </span>
            <input 
              type="text" 
              placeholder="Cari SDGs Desa..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b281f]/5 border-none rounded-full py-1.5 pl-10 pr-4 text-[11.5px] text-[#0B281F] placeholder-[#0B281F]/40 focus:bg-[#0b281f]/8 focus:ring-1 focus:ring-[#009966] transition-all"
            />
          </div>
        </div>

        {/* Index Table */}
        <div className="hero-reveal mt-6 overflow-hidden rounded-[24px] border border-[#0B281F]/8 shadow-[0_4px_16px_rgba(0,0,0,0.015)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] border-collapse text-left">
              <thead>
                <tr className="bg-[#0b281f]/[0.03] border-b border-[#0B281F]/8">
                  <th className="w-20 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50 text-center">Tujuan</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50">Tujuan SDGs Desa</th>
                  <th className="w-24 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50 text-center">Skor</th>
                  <th className="w-32 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50 text-center">Status</th>
                  <th className="w-48 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50">Progress</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F]/50">Deskripsi Sasaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B281F]/6">
                {filteredGoals.length > 0 ? (
                  filteredGoals.map((goal) => {
                    const barColor = goal.category === 'tercapai' ? '#009966' :
                                     goal.category === 'proses' ? '#F0B100' : '#D9383A'
                    const statusBadge = goal.category === 'tercapai' ? 'bg-[#009966]/10 text-[#009966] border-[#009966]/20' :
                                        goal.category === 'proses' ? 'bg-[#F0B100]/10 text-[#F0B100] border-[#F0B100]/20' :
                                        'bg-rose-500/10 text-rose-600 border-rose-500/20'
                    return (
                      <tr key={goal.no} className="hover:bg-[#0b281f]/[0.01] transition-all">
                        <td className="px-6 py-4.5 text-center">
                          <div className="h-8.5 w-8.5 rounded-lg bg-[#0B281F] text-white flex items-center justify-center font-bold font-mono text-[12px] mx-auto shadow-xs">
                            {goal.no}
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <p className="text-[12.5px] font-bold text-[#0B281F]">{goal.title}</p>
                          <p className="text-[8.5px] text-neutral-400 font-mono tracking-wider mt-0.5">SUSTAINABLE DEVELOPMENT GOALS</p>
                        </td>
                        <td className="px-6 py-4.5 text-center font-mono font-bold text-[12.5px] text-[#0B281F]">
                          {goal.score.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4.5 text-center">
                          <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[9.5px] font-bold tracking-wide uppercase ${statusBadge}`}>
                            {goal.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5">
                          <div className="space-y-1">
                            <div className="w-full bg-[#0b281f]/5 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-1000" 
                                style={{ 
                                  width: `${goal.score}%`,
                                  backgroundColor: barColor
                                }} 
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4.5 text-[11.5px] leading-relaxed text-[#0B281F]/70 italic">
                          {goal.description}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[12px] text-neutral-400 italic">
                      Tidak ada Tujuan SDGs yang cocok dengan kriteria pencarian Anda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Citation Footer Link */}
      <div className="flex items-center justify-between p-5 bg-[#0b281f]/[0.02] border border-dashed border-[#0B281F]/15 rounded-[24px]">
        <div className="flex items-center gap-2 text-[10.5px] text-[#0B281F]/60">
          <CheckCircle size={14} className="text-[#009966]" />
          <span>Status API Kemendesa: <span className="text-[#009966] font-bold">Terhubung Aktif</span></span>
        </div>
        <a 
          href="https://sid.kemendesa.go.id" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10.5px] text-[#009966] font-bold hover:underline inline-flex items-center gap-1 group"
        >
          <span>Buka Portal Resmi Kemendesa</span>
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  )
}
