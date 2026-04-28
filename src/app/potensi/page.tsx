import React from "react";
import { PotensiHero } from "@/features/potensi/components/PotensiHero";
import { PotensiList } from "@/features/potensi/components/PotensiList";

export default function PotensiPage() {
  return (
    <main className="min-h-screen bg-[#F6F8F7]">
      <PotensiHero />
      
      <div className="relative z-20 py-12">
        <PotensiList />
      </div>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[48px] bg-[#0B281F] p-8 text-white shadow-2xl md:p-16 lg:p-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#009966]/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="max-w-3xl font-[Georgia,serif] text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Tertarik Berkolaborasi Mengembangkan <span className="text-[#F0B100]">Potensi Desa?</span>
            </h2>
            <p className="mt-6 max-w-xl text-[16px] text-white/60">
              Pemerintah Desa Pameutingan membuka peluang kemitraan dan investasi bagi siapa saja yang ingin berkontribusi dalam memajukan ekonomi lokal.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="h-16 rounded-full bg-[#009966] px-10 text-[15px] font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-[#00B373]">
                Hubungi Kami
              </button>
              <button className="h-16 rounded-full border border-white/20 bg-white/5 px-10 text-[15px] font-bold text-white backdrop-blur-md transition-all hover:bg-white/10">
                Unduh Profil Potensi (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
