"use client";

import { BarChart3, TrendingUp, Users2, Map as MapIcon } from "lucide-react";
import { STATISTIK_DEMOGRAFI } from "../config/home-data";

export default function StatsSection() {
  return (
    <section className="bg-white px-6 py-8 md:px-10 md:py-12 lg:px-12">
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

        <div className="relative z-10 flex h-full flex-col items-center gap-6 px-6 py-8 md:px-12 lg:flex-row lg:justify-between lg:gap-16 lg:py-16">
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
          <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:max-w-xl lg:flex-nowrap lg:gap-0">
            {STATISTIK_DEMOGRAFI.map((item, index) => {
              const icons = [Users2, MapIcon, TrendingUp];
              const Icon = icons[index % icons.length];
              
              return (
                <div
                  key={item.label}
                  className={`hero-reveal group relative flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:z-20 hover:-translate-y-2 sm:h-44 sm:w-44 lg:h-52 lg:w-52 ${index > 0 ? "lg:-ml-12" : ""}`}
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#00D492] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                  
                  <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-[#00D492] sm:mb-3 sm:h-10 sm:w-10 sm:rounded-xl">
                    <Icon className="size-4 sm:size-5" />
                  </div>
                  
                  <div className="flex items-baseline gap-0.5 sm:gap-1">
                    <span className="text-[22px] font-black leading-none tracking-tighter text-white sm:text-[36px] md:text-[42px] lg:text-[48px]">
                      {item.angka}
                    </span>
                  </div>
                  
                  <p className="mt-1 px-2 text-center text-[8px] font-bold uppercase tracking-widest text-white/90 sm:mt-2 sm:text-[11px]">
                    {item.label}
                  </p>
                  
                  <div className="mt-1 flex items-center gap-1.5 rounded-full bg-black/20 px-2 py-0.5 border border-white/5 sm:mt-3 sm:px-3 sm:py-1">
                    <div className="h-0.5 w-0.5 rounded-full bg-[#00D492] animate-pulse sm:h-1 sm:w-1" />
                    <span className="text-[7px] font-medium text-white/40 sm:text-[10px]">
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
