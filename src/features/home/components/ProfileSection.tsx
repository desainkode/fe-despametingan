"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "./ui/SectionHeader";
import { ArrowRight, Quote } from "lucide-react";

export default function ProfileSection() {
  return (
    <section className="bg-white px-6 py-12 md:px-10 md:py-16 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader 
          title={["Mengenal Lebih", "Dekat Kepala Desa"]}
          description="Menyajikan profil singkat pimpinan desa sebagai sumber informasi publik yang transparan, akurat, dan terintegrasi untuk mendukung perencanaan pembangunan Desa Pameutingan."
          showInfoButton
        />

        <div className="hero-reveal relative overflow-hidden rounded-[40px] bg-[#052119] px-6 py-10 text-[#F4F3EF] shadow-2xl transition-all duration-500 md:px-10 md:py-12 lg:rounded-[60px] lg:px-16 lg:py-0">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#00D492]/10 blur-[80px]" />
          
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
            <div className="hero-reveal flex flex-col items-center text-center lg:items-start lg:py-20 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00D492]/10 px-4 py-1.5 border border-[#00D492]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00D492] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00D492]">Profil Pimpinan</span>
              </div>
              
              <h3 className="font-upakarti mt-6 text-[38px] font-bold leading-[1.1] tracking-tight md:text-[52px] lg:text-[64px]">
                Majang Budi Budiana
              </h3>
              
              <div className="relative mt-8 max-w-xl">
                <Quote size={40} className="absolute -left-6 -top-6 opacity-10 text-[#00D492] hidden lg:block" />
                <p className="text-[15px] leading-relaxed text-[#D0FAE5]/70 md:text-[17px]">
                  &quot;Berkomitmen untuk memajukan Desa Pameutingan melalui transparansi, 
                  inovasi layanan digital, dan pemberdayaan potensi lokal guna 
                  meningkatkan kesejahteraan seluruh lapisan masyarakat.&quot;
                </p>
              </div>

              <Link
                href="/profil"
                className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-[#F0B100] px-8 py-4 text-[15px] font-black text-[#052119] shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95"
              >
                Profil Lengkap
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="hero-reveal relative mx-auto aspect-[4/5] w-full max-w-xs transition-transform duration-700 hover:scale-105 sm:max-w-sm lg:aspect-square lg:h-[120%] lg:max-w-none">
              {/* Image Frame Decor */}
              <div className="absolute inset-0 -rotate-3 rounded-[40px] border border-white/5 bg-white/2" />
              <div className="absolute inset-4 rotate-2 rounded-[40px] border border-[#00D492]/20" />
              
              <Image
                src="/img/unsplash_jiOJQF5xEdw.png"
                alt="Foto Kepala Desa"
                fill
                className="absolute inset-0 z-10 object-contain drop-shadow-2xl lg:object-bottom lg:scale-110"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
