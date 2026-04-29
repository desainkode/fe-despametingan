"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Map, Users, LayoutGrid } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0B281F] text-[#F4F3EF]">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-30 brightness-[0.7] contrast-[1.1]"
        >
          <source src="/video/thumbnail.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-[#0B281F]/60 via-[#0B281F]/40 to-[#0B281F]" />
        
        {/* Subtle Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Decorative Blobs */}
      <div className="hero-float pointer-events-none absolute -right-20 -top-20 z-0 h-80 w-80 rounded-full bg-[#00D492]/20 blur-[100px] md:h-130 md:w-130 md:blur-[120px]" />
      <div className="hero-float pointer-events-none absolute -bottom-20 -left-20 z-0 h-60 w-60 rounded-full bg-[#F0B100]/10 blur-[80px] [animation-delay:1.5s] md:h-100 md:w-100 md:blur-[100px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pt-24 pb-12 md:px-10 lg:flex-row lg:items-center lg:gap-16 lg:pt-32">
        {/* Content Column */}
        <div className="flex flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
          <div className="hero-reveal inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="mr-2.5 h-2 w-2 animate-pulse rounded-full bg-[#F0B100]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00D492] md:text-[11px]">
              Website Resmi Pemerintah Desa
            </span>
          </div>

          <h1 className="hero-reveal mt-6 font-upakarti text-[42px] font-bold leading-[1.05] tracking-tight sm:text-[56px] md:text-[68px] lg:text-[76px] [animation-delay:150ms]">
            <span className="block opacity-90">Membangun Desa,</span>
            <span className="relative mt-2 block text-transparent bg-clip-text bg-linear-to-r from-[#00D492] to-[#A4F4CF]">
              Mensejahterakan
              <span className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-[#F0B100] lg:left-0 lg:translate-x-0" />
            </span>
            <span className="mt-3 block opacity-90">Warga</span>
          </h1>

          <p className="hero-reveal mt-8 max-w-xl text-[14px] font-medium leading-relaxed text-[#D0FAE5]/70 sm:text-[16px] [animation-delay:250ms]">
            Selamat datang di portal digital Desa Pameutingan. Transformasi tata kelola desa yang transparan, modern, dan melayani sepenuh hati.
          </p>

          <div className="hero-reveal mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5 [animation-delay:350ms] lg:items-start">
            <Link
              href="/layanan-masyarakat"
              className="group relative flex h-13 items-center justify-center overflow-hidden rounded-2xl bg-[#F0B100] px-8 text-[15px] font-black text-[#0B281F] shadow-[0_20px_40px_rgba(240,177,0,0.25)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(240,177,0,0.35)] active:scale-95 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                Layanan Mandiri <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/profil"
              className="flex h-13 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 text-[15px] font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 w-full sm:w-auto"
            >
              Jelajahi Profil
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="hero-reveal mt-14 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:max-w-xl [animation-delay:450ms]">
            {[
              { label: "Luas Wilayah", value: "12.5", unit: "km²", icon: Map },
              { label: "Total Penduduk", value: "3.5k", unit: "+", icon: Users },
              { label: "Potensi Desa", value: "8", unit: "Sektor", icon: LayoutGrid },
            ].map((stat, i) => (
              <div key={i} className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/2 px-4 py-5 backdrop-blur-sm transition-all hover:bg-white/5 lg:items-start">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#00D492]/10 text-[#00D492] transition-colors group-hover:bg-[#00D492] group-hover:text-[#0B281F]">
                  <stat.icon size={16} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">{stat.value}</span>
                  <span className="text-[10px] font-bold text-[#00D492]/60 uppercase tracking-tighter">{stat.unit}</span>
                </div>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/30">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image / Card Column */}
        <div className="hero-reveal relative mx-auto w-full max-w-sm [animation-delay:200ms] lg:max-w-md">
          {/* Decorative Frames */}
          <div className="hero-float absolute -right-4 top-6 h-full w-full rotate-3 rounded-[40px] bg-emerald-500/10 backdrop-blur-3xl [animation-delay:0.5s]" />
          <div className="hero-float absolute -left-4 -top-4 h-full w-full -rotate-2 rounded-[40px] border border-white/5 [animation-delay:1s]" />

          <div className="hero-float group relative aspect-[4/5] overflow-hidden rounded-[40px] bg-linear-to-b from-emerald-900 to-[#0B281F] shadow-2xl [animation-delay:0s]">
            <Image
              src="/img/hero-kepala-desa.png"
              alt="Kepala Desa Pameutingan"
              fill
              className="hero-zoom object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              priority
            />

            {/* Floating Info Badge */}
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-black/40 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-black leading-tight text-white">Majang Dudi B.</h3>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-[#00D492]">Kepala Desa</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F0B100] text-xl font-black text-[#0B281F]">
                  &quot;
                </div>
              </div>
              <p className="mt-4 text-[12px] italic leading-relaxed text-[#D0FAE5]/80">
                &quot;Melayani dengan hati, membangun dengan inovasi untuk kemajuan bersama.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
