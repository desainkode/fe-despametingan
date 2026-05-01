import React from "react";
import { Info, ShieldCheck, Zap } from "lucide-react";

export function AboutSection() {
  return (
    <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6 md:space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#0B281F]/5 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#0B281F]">
          <Info size={14} />
          Sekilas Desa
        </div>
        <h2 className="font-[Georgia,serif] text-[28px] font-bold leading-tight text-[#0B281F] sm:text-[32px] md:text-[42px]">
          Harmoni dalam Keberagaman <br className="hidden sm:block" />
          & <span className="text-[#009966]">Kemandirian</span>
        </h2>
        <p className="text-[15px] leading-relaxed text-[#0B281F]/70 md:text-[17px]">
          Desa Pameutingan adalah wilayah agraris yang berkembang menjadi pusat inovasi ekonomi lokal. Terletak di kawasan strategis, desa ini menggabungkan kearifan lokal dengan tata kelola modern untuk menciptakan lingkungan yang sejahtera bagi seluruh warganya.
        </p>
        
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
          <div className="rounded-3xl border border-[#0B281F]/5 bg-white p-5 md:p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B281F]/5 text-[#0B281F]">
              <ShieldCheck size={20} />
            </div>
            <h4 className="mb-2 font-bold text-[#0B281F]">Keamanan Terpadu</h4>
            <p className="text-[13px] text-[#0B281F]/50 md:text-[14px]">Lingkungan yang aman dan kondusif bagi pertumbuhan keluarga.</p>
          </div>
          <div className="rounded-3xl border border-[#0B281F]/5 bg-white p-5 md:p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#009966]/10 text-[#009966]">
              <Zap size={20} />
            </div>
            <h4 className="mb-2 font-bold text-[#0B281F]">Inovasi Desa</h4>
            <p className="text-[13px] text-[#0B281F]/50 md:text-[14px]">Mendorong digitalisasi layanan dan pemberdayaan ekonomi kreatif.</p>
          </div>
        </div>
      </div>

      <div className="relative mt-8 lg:mt-0">
        <div className="aspect-square overflow-hidden rounded-[32px] shadow-2xl sm:aspect-[4/5] md:rounded-[48px]">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop" 
            alt="Pemandangan Desa" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 rounded-[24px] bg-[#F0B100] p-5 text-white shadow-xl max-w-[180px] sm:-bottom-6 sm:-left-6 sm:max-w-[240px] sm:rounded-[32px] sm:p-8">
          <p className="text-3xl font-bold sm:text-4xl">25+</p>
          <p className="text-[11px] font-medium opacity-80 uppercase tracking-widest sm:text-[13px]">Penghargaan Desa Berprestasi</p>
        </div>
      </div>
    </section>
  );
}
