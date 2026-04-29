"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { STRUKTUR_TATA_KELOLA } from "../config/home-data";
import { useStrukturPagination } from "../hooks/useStrukturPagination";

export default function StructureSection() {
  const { 
    strukturSliderRef, 
    handleStrukturScroll 
  } = useStrukturPagination();

  return (
    <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-12">
          <div className="hero-reveal flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="hero-reveal text-[32px] font-bold leading-tight text-[#0B281F] md:text-[42px]">
                <span className="block">Struktur</span>
                <span className="block">Tata Kelola</span>
                <span className="block">Desa</span>
              </h2>
              <p className="hero-reveal text-[13px] leading-6 text-[#0B281F]/80 md:text-[14px]">
                Struktur kepemimpinan Desa Pameutingan yang melayani warga dengan dedikasi tinggi.
              </p>
            </div>
            <Link
              href="/struktur"
              className="hero-reveal inline-flex w-fit items-center gap-2 rounded-full bg-[#F0B100] px-6 py-2.5 text-[12px] font-bold text-[#0B281F] shadow-md transition-all duration-300 hover:-translate-y-0.5 md:text-[13px]"
            >
              Lihat Selengkapnya
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="flex flex-col">
            <div
              ref={strukturSliderRef}
              onScroll={handleStrukturScroll}
              className="hero-reveal relative -mb-2 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overflow-y-visible px-4 pb-10 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
            >
              {STRUKTUR_TATA_KELOLA.map((item) => (
                <div
                  key={item.nama}
                  className="hero-reveal flex shrink-0 snap-start flex-col items-center"
                  style={{ animationDelay: `${item.delay}ms` }}
                >
                  <div
                    className={`group relative h-72 ${item.widthClass} ${item.hoverWidthClass} origin-center overflow-visible rounded-3xl transition-[width,transform] duration-400 will-change-transform sm:h-80 md:h-90`}
                  >
                    <div className="absolute inset-0 rounded-3xl border border-[#D4FBEA]/25 bg-linear-to-b from-[#004F3B] to-[#006548] shadow-lg transition-shadow duration-500 group-hover:shadow-2xl" />
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="absolute inset-0 z-10 rounded-3xl object-cover transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 z-20 rounded-3xl bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 z-30 flex min-h-18 w-full flex-col items-center justify-end px-3 pb-4 text-center text-white">
                      <p className="font-[Georgia,serif] text-xl font-bold md:text-2xl">{item.jabatan}</p>
                      <p className="text-sm font-medium text-[#D4FBEA] md:text-base">{item.nama}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
