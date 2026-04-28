"use client";

import React from "react";
import { ShieldCheck, ArrowRight, ChevronDown } from "lucide-react";

export function LayananHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B281F] text-white shadow-2xl flex items-center">
      {/* Decorative Background Elements with Yellow Accents */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full bg-[#00E0A1]/15 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-[400px] w-[400px] rounded-full bg-[#F0B100]/10 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/4 right-1/3 h-64 w-64 rounded-full bg-[#F0B100]/5 blur-[100px]" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          <div className="hero-reveal mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#00E0A1] backdrop-blur-md">
            <ShieldCheck size={14} />
            Layanan Terintegrasi & Aman
          </div>

          <h1 
            className="hero-reveal max-w-4xl font-bold leading-[1.1] tracking-tight text-[40px] sm:text-[56px] lg:text-[72px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Pelayanan Masyarakat <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0A1] to-[#F0B100]">Desa Pameutingan</span>
          </h1>

          <p className="hero-reveal mt-10 max-w-2xl text-[16px] leading-relaxed text-white/60 sm:text-[18px]">
            Kemudahan pengurusan dokumen administrasi desa secara online, cepat, dan transparan dari genggaman tangan Anda.
          </p>
        </div>
      </div>

      {/* Bottom Gradient Fade - Matching Hero Theme */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0B281F] via-[#0B281F]/40 to-transparent z-10" />
    </section>
  );
}
