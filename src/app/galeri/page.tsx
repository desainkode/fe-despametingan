import React from "react";
import { GaleriHero } from "@/features/galeri/components/GaleriHero";
import { GaleriList } from "@/features/galeri/components/GaleriList";

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-[#F6F8F7]">
      <GaleriHero />
      
      <div className="relative z-20 py-12">
        <GaleriList />
      </div>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0B281F] p-6 text-white shadow-2xl sm:rounded-[48px] sm:p-12 md:p-16 lg:p-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#009966]/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="max-w-3xl font-[Georgia,serif] text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Punya Dokumentasi Kegiatan <span className="text-[#F0B100]">Desa?</span>
            </h2>
            <p className="mt-4 max-w-xl text-[14px] text-white/70 leading-relaxed sm:mt-6 sm:text-[16px]">
              Jika Anda memiliki foto atau video kegiatan positif di Desa Pameutingan, bagikan kepada kami untuk dipublikasikan di Galeri Desa.
            </p>
            <button className="mt-8 h-14 rounded-full bg-[#009966] px-8 text-[14px] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#00B373] active:translate-y-0 sm:mt-10 sm:h-16 sm:px-10 sm:text-[15px]">
              Kirim Dokumentasi
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
