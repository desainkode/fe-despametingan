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
            
            <h1 className="max-w-xl text-[48px] md:text-[72px] font-bold lowercase leading-[1.02] tracking-[0.052em]" style={{ fontFamily: 'var(--font-heading)' }}>
              Sampaikan <br /> <span className="text-[#00D492]">aspirasi</span> anda
            </h1>
            
            <p className="mt-4 max-w-lg text-[13px] font-light leading-6 text-[#A4F4CF]/80 md:text-[15px]">
              Kami siap mendengarkan setiap aspirasi, pertanyaan, maupun masukan Anda demi kemajuan Desa Pameutingan yang lebih baik.
            </p>
          </div>

          {/* Overlapping Images Style from Infografis */}
          <div className="relative h-64 md:h-96 w-full lg:h-[450px]">
            <div className="absolute -right-4 top-0 h-4/5 w-4/5 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" className="h-full w-full object-cover opacity-60" alt="" />
            </div>
            <div className="absolute -left-6 bottom-4 h-4/5 w-4/5 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" className="h-full w-full object-cover opacity-80" alt="" />
            </div>
            <div className="absolute left-4 top-12 h-[85%] w-[85%] overflow-hidden rounded-3xl border-4 border-[#006045] shadow-2xl">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" className="h-full w-full object-cover" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section: Form & Image */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 lg:px-16 -mt-16 relative z-20">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-black/5 p-8 md:p-12 lg:p-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          {/* Form Side */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-2xl font-bold text-[#0B281F]">Formulir Kontak</h2>
              <div className="h-1 w-12 bg-emerald-500 rounded-full" />
            </div>

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap"
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl py-4 px-5 text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none"
                  />
                </div>
                <div className="relative group">
                  <input 
                    type="tel" 
                    placeholder="Nomor Telepon"
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl py-4 px-5 text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Alamat Email"
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl py-4 px-5 text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="relative group">
                <textarea 
                  placeholder="Pesan atau aspirasi Anda..."
                  rows={6}
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl py-5 px-5 text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none resize-none"
                ></textarea>
              </div>

              <button className="group mt-2 flex items-center justify-between bg-[#0B281F] hover:bg-emerald-600 rounded-2xl p-1.5 pr-1.5 transition-all duration-300 w-fit gap-8">
                <span className="pl-6 font-bold text-white transition-colors">Kirim Aspirasi Sekarang</span>
                <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-white transition-all group-hover:bg-white/20">
                  <ArrowRight size={20} />
                </div>
              </button>
            </form>
          </div>

          {/* Image Side */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] rounded-[30px] overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
                alt="Desa Pameutingan View"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0B281F]/40 to-transparent" />
            </div>
            
            {/* Contact quick info overlay */}
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 p-8 rounded-[30px] text-white shadow-xl max-w-xs">
              <h3 className="text-lg font-bold mb-4">Butuh Bantuan?</h3>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                Tim administrasi kami siap membantu Anda selama jam kerja.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone size={14} />
                </div>
                <span className="font-bold">08138944493</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
   