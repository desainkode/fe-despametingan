"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Images, Camera } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { GALERI_PREVIEW } from "../config/home-data";

export default function GaleriSection() {
  return (
    <section className="bg-[#FFFFFF] px-4 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:gap-10">
        <SectionHeader 
          title={["Galeri Desa", "Pameutingan"]}
          description="Menampilkan sebagian dokumentasi kegiatan desa, suasana layanan, dan momen kebersamaan warga sebagai preview sebelum melihat galeri lengkap."
          showInfoButton
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {GALERI_PREVIEW.map((item, index) => (
            <article 
              key={item.title} 
              className="hero-reveal group relative flex h-full min-h-[360px] w-full flex-col rounded-[24px] border border-[#0B281F]/5 bg-[#F4F3EF] p-5 text-left shadow-md transition-all duration-400 hover:-translate-y-1.5 md:p-6"
              style={{ animationDelay: `${220 + index * 80}ms` }}
            >
              <div className="mb-3 flex w-full items-start justify-between gap-4">
                <h3 className="font-timeless text-[20px] font-bold leading-[1.28] text-[#004F3B] md:text-[22px]">
                  {item.title}
                </h3>
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#004F3B]/5 text-[#004F3B] transition-all duration-300 group-hover:bg-[#004F3B] group-hover:text-white">
                  <ArrowRight size={20} strokeWidth={2.2} />
                </span>
              </div>

              <p className="mb-4 text-[13.5px] leading-relaxed text-[#0B281F]/80">
                {item.description}
              </p>

              <div className="relative mt-auto min-h-[140px] w-full flex-1 overflow-hidden rounded-[16px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span 
                  className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-white shadow-lg backdrop-blur-md"
                  style={{ backgroundColor: `${item.accent}E6` }}
                >
                  <Camera size={16} strokeWidth={2.2} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{item.tag}</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-start pt-2">
          <Link
            href="/galeri"
            className="hero-reveal inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[#0B281F] px-5 py-2.5 text-[13px] font-bold text-[#F4F3EF] shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            Lihat Selengkapnya
            <ArrowRight size={17} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
