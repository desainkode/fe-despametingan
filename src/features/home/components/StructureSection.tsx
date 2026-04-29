"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { STRUKTUR_TATA_KELOLA } from "../config/home-data";
import { useStrukturPagination } from "../hooks/useStrukturPagination";

export default function StructureSection() {
  const { 
    strukturSliderRef, 
    handleStrukturScroll 
  } = useStrukturPagination();

  return (
    <section className="bg-white px-6 py-12 md:px-10 md:py-16 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          {/* Text Content */}
          <div className="hero-reveal flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00D492]/10 px-4 py-1.5 border border-[#00D492]/20 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00D492]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00D492]">Perangkat Desa</span>
              </div>
              
              <h2 className="hero-reveal text-[38px] font-bold leading-[1.1] tracking-tight text-[#052119] md:text-[52px]">
                Struktur <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00D492] to-[#004D39]">Tata Kelola Desa</span>
              </h2>
              
              <p className="hero-reveal text-[15px] leading-relaxed text-[#052119]/70 md:text-[16px]">
                Sinergi kepemimpinan Desa Pameutingan yang berdedikasi tinggi dalam melayani masyarakat dengan integritas dan inovasi.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/struktur"
                className="group inline-flex items-center gap-3 rounded-2xl bg-[#052119] px-8 py-4 text-[15px] font-black text-[#00D492] shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95"
              >
                Seluruh Staf
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <div className="flex flex-col items-start lg:hidden">
                <span className="flex items-center gap-1 text-[11px] font-bold text-[#052119]/40 uppercase tracking-widest">
                  Geser <ChevronRight size={14} className="animate-bounce-x" />
                </span>
              </div>
            </div>
          </div>

          {/* Slider Content */}
          <div className="relative -mx-6 overflow-hidden px-6 lg:mx-0 lg:px-0">
            <div
              ref={strukturSliderRef}
              onScroll={handleStrukturScroll}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-10 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {STRUKTUR_TATA_KELOLA.map((item, index) => (
                <div
                  key={item.nama}
                  className="hero-reveal shrink-0 snap-start"
                  style={{ animationDelay: `${item.delay}ms` }}
                >
                  <div className="group relative h-[420px] w-[280px] overflow-hidden rounded-[32px] bg-[#052119] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:h-[480px] md:w-[320px]">
                    <Image
                      src={item.image}
                      alt={item.nama}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#052119] via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                    
                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex flex-col">
                        <span className="mb-2 w-fit rounded-lg bg-[#00D492]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#00D492] backdrop-blur-md">
                          {item.jabatan}
                        </span>
                        <h4 className="font-upakarti text-[24px] font-bold text-white md:text-[28px]">{item.nama}</h4>
                        <div className="mt-4 h-1 w-0 bg-[#F0B100] transition-all duration-500 group-hover:w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Extra Spacer for mobile scroll-end */}
              <div className="w-12 shrink-0 sm:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
