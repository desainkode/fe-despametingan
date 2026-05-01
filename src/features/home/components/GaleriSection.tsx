"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, Maximize2 } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { GALERI_PREVIEW } from "../config/home-data";

export default function GaleriSection() {
  return (
    <section className="bg-white px-6 py-8 md:px-10 md:py-12 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:gap-8">
        <div className="flex items-end justify-between">
          <SectionHeader 
            title={["Galeri Desa", "Pameutingan"]}
            description="Menampilkan sebagian dokumentasi kegiatan desa, suasana layanan, dan momen kebersamaan warga sebagai preview sebelum melihat galeri lengkap."
            showInfoButton
          />
        </div>


        <div className="relative -mx-6 overflow-hidden px-6 lg:mx-0 lg:px-0">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 lg:pt-0">
            {GALERI_PREVIEW.map((item, index) => (
              <article 
                key={item.title} 
                className="hero-reveal group relative flex h-full w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[32px] bg-[#F4F3EF] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:w-[340px] lg:w-full"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#052119]/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                {/* Floating Badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-white backdrop-blur-md border border-white/10">
                  <Camera size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.tag}</span>
                </div>

                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0B100] text-[#052119] shadow-2xl scale-50 group-hover:scale-100 transition-transform">
                    <Maximize2 size={24} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Info Body */}
              <div className="flex flex-col p-6">
                <h3 className="font-upakarti text-[22px] font-bold leading-tight text-[#052119]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#052119]/60">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
          
          {/* Extra Spacer for mobile scroll-end */}
          <div className="w-12 shrink-0 lg:hidden" />
        </div>
      </div>

        <div className="flex justify-center pt-4">
          <Link
            href="/galeri"
            className="group inline-flex items-center gap-4 rounded-2xl bg-[#052119] px-10 py-4 text-[15px] font-black text-[#00D492] shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95"
          >
            Lihat Galeri Lengkap
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
