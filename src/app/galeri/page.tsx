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
        <div className="relative overflow-hidden rounded-[48px] bg-[#009966] p-8 text-white shadow-2xl md:p-16 lg:p-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-black/10 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="max-w-3xl font-[Georgia,serif] text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Punya Dokumentasi Kegiatan <span className="text-[#F0B100]">Desa?</span>
            </h2>
            <p className="mt-6 max-w-xl text-[16px] text-white/80 leading-relaxed">
              Jika Anda memiliki foto atau video kegiatan positif di Desa Pameutingan, bagikan kepada kami untuk dipublikasikan di Galeri Desa.
            </p>
            <button className="mt-10 h-16 rounded-full bg-[#0B281F] px-10 text-[15px] font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
              Kirim Dokumentasi
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
