"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sprout } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { POTENSI_PREVIEW } from "../config/home-data";

export default function PotensiSection() {
  return (
    <section className="bg-[#FFFFFF] px-4 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:gap-10">
        <SectionHeader 
          title={["Potensi Desa", "Pameutingan"]}
          description="Menampilkan sebagian potensi desa seperti pertanian, UMKM, dan daya tarik alam sebagai preview sebelum melihat detail lengkap di halaman potensi."
          showInfoButton
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {POTENSI_PREVIEW.map((item, index) => (
            <article 
              key={item.title} 
              className="hero-reveal group relative flex h-full min-h-[360px] w-full flex-col items-start gap-3 rounded-[20px] border border-[#0B281F]/5 bg-[#F4F3EF] p-5 text-left shadow-md transition-all duration-400 hover:-translate-y-1.5 md:gap-4 md:p-6"
              style={{ animationDelay: `${240 + index * 80}ms` }}
            >
              <div className="flex w-full items-start justify-between gap-4">
                <h3 className="font-timeless max-w-[200px] text-[20px] font-bold leading-[1.28] text-[#004F3B] md:text-[22px]">
                  {item.title}
                </h3>
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#004F3B]/5 text-[#004F3B] transition-all duration-300 group-hover:bg-[#004F3B] group-hover:text-white">
                  <ArrowRight size={20} strokeWidth={2.2} />
                </span>
              </div>

              <p className="max-w-[260px] text-[13.5px] leading-relaxed text-[#0B281F]/80">
                {item.description}
              </p>

              <div className="relative mt-auto h-[170px] w-full overflow-hidden rounded-[14px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className="absolute bottom-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#0B281F] shadow-lg"
                  style={{ backgroundColor: item.accent }}
                >
                  <item.icon size={20} strokeWidth={2.2} />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-start pt-1">
          <Link
            href="/potensi"
            className="hero-reveal inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[#F0B100] px-5 py-2.5 text-[13px] font-bold text-[#0B281F] shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            Lihat Selengkapnya
            <ArrowRight size={17} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
