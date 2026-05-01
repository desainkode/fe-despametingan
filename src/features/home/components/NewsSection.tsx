"use client";

import { ArrowRight, Leaf, Calendar } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import Image from "next/image";
import { INFORMASI_TERKINI } from "../config/home-data";

export default function NewsSection() {
  return (
    <section className="bg-white px-6 py-8 md:px-10 md:py-12 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:gap-8">
        <div className="flex items-end justify-between">
          <SectionHeader 
            title={["Informasi Terkini", "Desa Pameutingan"]}
            description="Menyajikan ringkasan kabar terbaru desa secara transparan, akurat, dan mudah diakses agar warga dapat mengikuti perkembangan desa secara cepat."
            showInfoButton
          />
          <div className="mb-8 hidden items-center gap-2 lg:flex">
            {/* Optional scroll buttons could go here */}
          </div>
        </div>


        <div className="relative -mx-6 overflow-hidden px-6 lg:mx-0 lg:px-0">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:overflow-visible lg:pb-0 lg:pt-0">
            {INFORMASI_TERKINI.map((item, index) => (
              <button
                key={index}
                type="button"
                className="hero-reveal group relative flex h-full w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[32px] bg-[#F4F3EF] border border-[#0B281F]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl text-left md:w-[340px] lg:w-full"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
              {/* Image Header */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#052119]/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#F0B100] px-3 py-1.5 text-[10px] font-black text-[#052119] shadow-lg">
                  <Leaf size={12} strokeWidth={3} />
                  BERITA TERBARU
                </span>
              </div>

              {/* Content Body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex items-center gap-2 text-[11px] font-bold text-[#052119]/40 uppercase tracking-widest">
                  <Calendar size={14} />
                  <span>Januari 2024</span>
                </div>
                
                <h3 className="font-upakarti text-[20px] font-bold leading-tight text-[#052119] group-hover:text-[#00D492] transition-colors">
                  {item.title}
                </h3>
                
                <p className="mt-4 text-[13px] leading-relaxed text-[#052119]/60 line-clamp-3">
                  {item.description}
                </p>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-[12px] font-black text-[#052119] uppercase tracking-tighter">Selengkapnya</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#052119] text-[#00D492] transition-all group-hover:translate-x-1">
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </button>
          ))}
          
          {/* Extra Spacer for mobile scroll-end */}
          <div className="w-12 shrink-0 lg:hidden" />
        </div>
      </div>
      </div>
    </section>
  );
}
