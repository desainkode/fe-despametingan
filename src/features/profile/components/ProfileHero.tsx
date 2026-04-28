"use client";

import React from "react";
import { ChevronDown, MapPin } from "lucide-react";

export function ProfileHero({ name, slogan }: { name: string, slogan: string }) {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#0B281F] text-white shadow-2xl flex items-center">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full bg-[#00E0A1]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-[400px] w-[400px] rounded-full bg-[#F0B100]/5 blur-[120px]" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          <div className="hero-reveal mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#00E0A1] backdrop-blur-md">
            <MapPin size={14} />
            Mengenal Lebih Dekat
          </div>

          <h1 className="hero-reveal max-w-5xl font-[Georgia,serif] text-[48px] font-bold leading-[1.05] tracking-tight sm:text-[68px] lg:text-[86px]">
            Profil <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0A1] to-[#F0B100]">{name}</span>
          </h1>

          <p className="hero-reveal mt-10 max-w-2xl text-[18px] font-medium text-[#F0B100] italic sm:text-[22px]">
            "{slogan}"
          </p>

          <p className="hero-reveal mt-8 max-w-2xl text-[16px] leading-relaxed text-white/60 sm:text-[18px]">
            Menelusuri sejarah panjang, visi masa depan, dan struktur kepemimpinan yang membangun harmoni di Desa Pameutingan.
          </p>
          
          <div className="hero-reveal mt-12">
            <button 
              onClick={() => {
                const element = document.getElementById('profile-content');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="group flex flex-col items-center gap-4 text-white/40 transition-colors hover:text-[#00E0A1]"
            >
              <span className="text-[13px] font-bold uppercase tracking-widest">Eksplorasi Profil</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-[#00E0A1]/50 group-hover:translate-y-2">
                <ChevronDown size={24} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade - Emerald transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0B281F] via-[#0B281F]/40 to-transparent z-10" />
    </section>
  );
}
