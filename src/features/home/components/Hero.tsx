"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B281F] pb-5 pt-6 text-[#F4F3EF] h-[100svh] min-h-[600px] md:pb-0 md:pt-0">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-35"
        >
          <source src="/video/thumbnail.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-[#0B281F]/40 via-[#0B281F]/20 to-[#0B281F]" />
      </div>

      <div className="hero-float pointer-events-none absolute -right-28 -top-44 z-0 h-130 w-130 rounded-full bg-[#006045]/40 blur-[110px]" />
      <div className="hero-float pointer-events-none absolute -bottom-28 -left-24 z-0 h-72 w-72 rounded-full bg-[#F0B100]/20 blur-[90px] [animation-delay:900ms]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 md:h-full md:items-center md:px-10 md:py-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-10">
        <div className="max-w-155 pt-0 md:pt-1">
          <div className="hero-reveal inline-flex items-center rounded-full border border-[#006045] bg-[#004F3B]/55 px-3 py-1">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#FDC700]/70" />
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-[#A4F4CF] md:text-[10px]">
              Website Resmi Pemerintah Desa
            </span>
          </div>

          <h1
            className="hero-reveal font-upakarti mt-3 max-w-132 text-[40px] font-bold leading-[1.02] tracking-[0.052em] md:text-[56px] lg:text-[64px] [animation-delay:120ms]"
          >
            <span className="block">Membangun Desa,</span>
            <span className="relative mt-2 block text-[#00D492]">
              Mensejahterakan
              <span className="absolute -bottom-1 left-[34%] h-0.75 w-[44%] rounded-full bg-[#F0B100] md:h-1" />
            </span>
            <span className="mt-2 block">Warga</span>
          </h1>

          <p className="hero-reveal mt-3 max-w-140 text-[11px] font-light leading-5 text-[#A4F4CF]/80 md:text-[13px] md:leading-6 [animation-delay:220ms]">
            Selamat datang di portal informasi digital Desa Pameutingan. Kami
            berkomitmen memberikan pelayanan publik yang transparan, cepat,
            dan mudah diakses bagi seluruh masyarakat.
          </p>

          <div className="hero-reveal mt-4 flex flex-wrap items-center gap-2.5 [animation-delay:320ms]">
            <Link
              href="/layanan-masyarakat"
              className="inline-flex h-9 items-center rounded-full bg-[#F0B100] px-4.5 text-[12px] font-bold text-[#0B281F] shadow-[0_8px_12px_rgba(240,177,0,0.18),0_3px_5px_rgba(240,177,0,0.14)] transition-transform duration-300 hover:-translate-y-0.5 md:h-10 md:px-5 md:text-[13px]"
            >
              Layanan Mandiri <span className="ml-2">→</span>
            </Link>
            <Link
              href="/profil"
              className="inline-flex h-9 items-center rounded-full border border-[#007A55] px-4.5 text-[12px] font-medium text-[#F4F3EF] transition-colors duration-300 hover:bg-[#007A55]/25 md:h-10 md:px-5 md:text-[13px]"
            >
              Profil Desa
            </Link>
          </div>

          <div className="hero-reveal mt-5 grid grid-cols-1 gap-2.5 border-t border-[#006045]/55 pt-3 [animation-delay:420ms] sm:grid-cols-3 sm:gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#00D492]/70 md:text-[11px]">
                Luas Wilayah
              </p>
              <p className="mt-1 font-[Georgia,serif] text-[22px] leading-tight md:text-[24px]">
                12.5 km²
              </p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#00D492]/70 md:text-[11px]">
                Batas Wilayah
              </p>
              <p className="mt-1 font-[Georgia,serif] text-[22px] leading-tight md:text-[24px]">
                4 Desa
              </p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#00D492]/70 md:text-[11px]">
                Jumlah Penduduk
              </p>
              <p className="mt-1 font-[Georgia,serif] text-[22px] leading-tight md:text-[24px]">
                3.500+
              </p>
            </div>
          </div>
        </div>

        <div className="hero-reveal relative mx-auto w-full max-w-sm pt-2 [animation-delay:180ms] lg:pt-0">
          <div className="hero-float absolute -right-2 top-4 h-full w-full rotate-2 rounded-4xl bg-[#006045]/30 [animation-delay:300ms]" />
          <div className="hero-float absolute -left-3 -top-2 h-full w-full -rotate-2 rounded-4xl border border-[#007A55]/70 [animation-delay:600ms]" />

          <div className="hero-float group relative h-88 overflow-hidden rounded-4xl bg-linear-to-b from-[#006045] to-[#0B281F] shadow-[0_18px_36px_-12px_rgba(0,0,0,0.25)] [animation-delay:0ms] md:h-112">
            <Image
              src="/img/hero-kepala-desa.png"
              alt="Kepala Desa Pameutingan"
              fill
              className="hero-zoom object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              priority
            />

            <div className="hero-float absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-black/40 p-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.2)] backdrop-blur-[4px] transition-transform duration-500 hover:-translate-y-1 [animation-delay:900ms] md:bottom-4 md:left-4 md:right-4 md:p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[13px] font-bold leading-5 md:text-sm">Majang Dudi Budiana</p>
                  <p className="mt-1 text-[10px] text-[#A4F4CF] md:text-[11px]">Kepala Desa Pameutingan</p>
                </div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F0B100] text-xs font-bold text-[#0B281F]">
                  &quot;
                </span>
              </div>
              <p className="mt-1.5 text-[10px] italic leading-4 text-[#D0FAE5]/80">
                &quot;Melayani dengan hati, membangun dengan inovasi untuk
                kemajuan bersama.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
