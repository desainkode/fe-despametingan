"use client";

import { BarChart3, TrendingUp, Users2, Map as MapIcon } from "lucide-react";
import { STATISTIK_DEMOGRAFI } from "../config/home-data";

export default function StatsSection() {
  return (
    <section className="bg-white px-6 py-12 md:px-10 md:py-16 lg:px-12">
      <div className="relative mx-auto min-h-[480px] w-full max-w-7xl overflow-hidden rounded-[32px] border border-[#007A55]/20 bg-[#005E45] shadow-2xl md:min-h-[400px] lg:min-h-[420px]">
        {/* Background Gradient & Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-[#005E45] via-[#004D39] to-[#003B2C]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:24px_24px]" />
        
        {/* Animated Data Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block h-32 w-[200%] animate-ocean-wave md:h-40 lg:h-48"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L48,64C96,64,192,64,288,74.7C384,85,480,107,576,106.7C672,107,768,85,864,69.3C960,53,1056,43,1152,48L1200,53.3L1200,120L1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="#004D39"
              fillOpacity="0.6"
            ></path>
          </svg>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center gap-10 px-6 py-12 md:px-12 lg:flex-row lg:justify-between lg:gap-16 lg:py-16">
          {/* Header Card */}
          <div className="hero-reveal w-full max-w-sm rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl lg:max-w-md lg:p-8">
            <div className="flex items-center gap-4">
              <div className="hero-float flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0B100] text-[#0B281F] shadow-[0_10px_20px_rgba(240,177,0,0.3)]">
                <BarChart3 size={28} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00D492]">
                  Data Terkini 2024
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-white/40">
                  <TrendingUp size={12} className="text-[#00D492]" /> Terverifikasi
                </span>
              </div>
            </div>

            <h2 className="font-upakarti mt-6 text-[32px] font-bold leading-[1.1] tracking-tight text-white md:text-[38px] lg:text-[44px]">
              Demografi & <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/60">Statistik Desa</span>
            </h2>

            <p className="mt-5 text-[14px] leading-relaxed text-[#D0FAE5]/60 md:text-[15px]">
              Menyajikan data kependudukan yang transparan, akurat, dan terintegrasi untuk mendukung perencanaan pembangunan Desa Pameutingan.
            </p>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="h-0.5 w-12 rounded-full bg-[#F0B100]/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F0B100]">Visi Digital 2024</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 lg:max-w-xl">
            {STATISTIK_DEMOGRAFI.map((item, index) => {
              const icons = [Users2, MapIcon, TrendingUp];
              const Icon = icons[index % icons.length];
              
              return (
                <div
                  key={item.label}
                  className="hero-reveal group flex flex-col items-center text-center sm:items-start sm:text-left"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#00D492] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00D492] group-hover:text-[#0B281F]">
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[42px] font-black leading-none tracking-tighter text-white md:text-[48px]">
                      {item.angka}
                    </span>
                    <span className="text-[14px] font-bold text-[#F0B100] group-hover:animate-pulse">
                      {index === 2 ? "" : ""}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.15em] text-white/90">
                    {item.label}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 border border-white/5">
                    <div className="h-1 w-1 rounded-full bg-[#00D492] animate-pulse" />
                    <span className="text-[10px] font-medium text-white/40">
                      {item.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
