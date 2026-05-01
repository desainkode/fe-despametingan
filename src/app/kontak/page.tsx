"use client";

import React from "react";
import { User, Phone, Mail, ArrowRight, MessageSquare } from "lucide-react";

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Consistency with Infografis */}
      <section className="relative w-full bg-linear-to-b from-[#004F3B] via-[#004F3B] to-[#0B281F] pt-24 pb-32 overflow-hidden text-[#F4F3EF]">
        <div className="hero-float pointer-events-none absolute -right-28 -top-44 h-130 w-130 rounded-full bg-[#006045]/30 blur-[110px]" />
        <div className="hero-float pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#F0B100]/16 blur-[90px] [animation-delay:900ms]" />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 md:px-12 lg:px-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 items-center z-10">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center rounded-full border border-[#006045] bg-[#004F3B]/55 px-3 py-1 w-fit">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#FDC700]/70" />
              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-[#A4F4CF] md:text-[10px]">
                Hubungi Kami
              </span>
            </div>
            
            <h1 className="max-w-xl text-[36px] md:text-[72px] font-bold lowercase leading-[1.02] tracking-[0.052em]" style={{ fontFamily: 'var(--font-heading)' }}>
              Sampaikan <br /> <span className="text-[#00D492]">aspirasi</span> anda
            </h1>
            
            <p className="mt-4 max-w-lg text-[13px] font-light leading-6 text-[#A4F4CF]/80 md:text-[15px]">
              Kami siap mendengarkan setiap aspirasi, pertanyaan, maupun masukan Anda demi kemajuan Desa Pameutingan yang lebih baik.
            </p>
          </div>

          {/* Overlapping Images Style from Infografis */}
          <div className="relative h-48 sm:h-64 md:h-96 w-full lg:h-[450px]">
            <div className="absolute -right-2 top-0 h-4/5 w-4/5 overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:rounded-3xl">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" className="h-full w-full object-cover opacity-60" alt="" />
            </div>
            <div className="absolute -left-2 bottom-2 h-4/5 w-4/5 overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:rounded-3xl">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" className="h-full w-full object-cover opacity-80" alt="" />
            </div>
            <div className="absolute left-2 top-4 h-[85%] w-[85%] overflow-hidden rounded-2xl border-2 border-[#006045] shadow-2xl sm:rounded-3xl sm:border-4">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" className="h-full w-full object-cover" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section: Form & Image */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-12 md:py-20 lg:px-16 -mt-12 md:-mt-16 relative z-20">
        <div className="bg-white rounded-[32px] shadow-2xl shadow-black/5 p-6 md:rounded-[40px] md:p-12 lg:p-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          {/* Form Side */}
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-2 mb-2 md:mb-4">
              <h2 className="text-xl font-bold text-[#0B281F] md:text-2xl">Formulir Kontak</h2>
              <div className="h-1 w-10 bg-emerald-500 rounded-full md:w-12" />
            </div>

            <form className="flex flex-col gap-4 md:gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap"
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl py-3.5 px-5 text-neutral-900 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none md:rounded-2xl md:py-4 md:text-base"
                  />
                </div>
                <div className="relative group">
                  <input 
                    type="tel" 
                    placeholder="Nomor Telepon"
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl py-3.5 px-5 text-neutral-900 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none md:rounded-2xl md:py-4 md:text-base"
                  />
                </div>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Alamat Email"
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-xl py-3.5 px-5 text-neutral-900 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none md:rounded-2xl md:py-4 md:text-base"
                />
              </div>

              <div className="relative group">
                <textarea 
                  placeholder="Pesan atau aspirasi Anda..."
                  rows={4}
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-xl py-4 px-5 text-neutral-900 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none resize-none md:rounded-2xl md:py-5 md:text-base md:rows-6"
                ></textarea>
              </div>

              <button className="group mt-2 flex items-center justify-between bg-[#0B281F] hover:bg-emerald-600 rounded-xl p-1 pr-1.5 transition-all duration-300 w-full md:rounded-2xl md:p-1.5 md:w-fit md:gap-8">
                <span className="pl-4 font-bold text-white text-sm transition-colors md:pl-6 md:text-base">Kirim Aspirasi Sekarang</span>
                <div className="h-9 w-9 bg-white/10 rounded-lg flex items-center justify-center text-white transition-all group-hover:bg-white/20 md:h-10 md:w-10 md:rounded-xl">
                  <ArrowRight size={18} className="md:size-20" />
                </div>
              </button>
            </form>
          </div>

          {/* Image Side - Better Tablet handling */}
          <div className="relative block lg:block">
            <div className="aspect-video sm:aspect-square md:aspect-[4/5] rounded-[24px] md:rounded-[30px] overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
                alt="Desa Pameutingan View"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0B281F]/40 to-transparent" />
            </div>
            
            {/* Contact quick info overlay */}
            <div className="absolute -bottom-4 -right-4 bg-emerald-600 p-6 rounded-[24px] text-white shadow-xl max-w-[200px] sm:-bottom-6 sm:-right-6 sm:p-8 sm:rounded-[30px] sm:max-w-xs">
              <h3 className="text-base font-bold mb-2 sm:text-lg sm:mb-4">Butuh Bantuan?</h3>
              <p className="text-[11px] text-white/80 mb-4 leading-relaxed sm:text-sm sm:mb-6">
                Tim administrasi kami siap membantu Anda selama jam kerja.
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center sm:h-8 sm:w-8">
                  <Phone size={12} className="sm:size-14" />
                </div>
                <span className="text-xs font-bold sm:text-base">08138944493</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
   