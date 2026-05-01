"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { POTENSI_PREVIEW } from "../config/home-data";

export default function PotensiSection() {
  return (
    <section className="bg-white px-6 py-8 md:px-10 md:py-12 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:gap-8">
        <div className="flex items-end justify-between">
          <SectionHeader 
            title={["Potensi Desa", "Pameutingan"]}
            description="Menampilkan sebagian potensi desa seperti pertanian, UMKM, dan daya tarik alam sebagai preview sebelum melihat detail lengkap."
            showInfoButton
          />
        </div>


        <div className="relative -mx-6 overflow-hidden px-6 lg:mx-0 lg:px-0">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 lg:pt-0">
            {POTENSI_PREVIEW.map((item, index) => (
              <article 
                key={item.title} 
                className="hero-reveal group relative flex h-full w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[40px] bg-[#052119] p-6 text-left shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:w-[340px] lg:w-full"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
              {/* Background Accent */}
              <div 
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10 blur-[80px] transition-opacity group-hover:opacity-20"
                style={{ backgroundColor: item.accent }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white/80 transition-all group-hover:bg-white/10 group-hover:text-[#00D492]">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <Sparkles size={20} className="text-[#F0B100] opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <h3 className="font-upakarti mt-6 text-[28px] font-bold leading-tight text-white md:text-[32px]">
                  {item.title}
                </h3>

                <p className="mt-4 text-[14px] leading-relaxed text-[#D0FAE5]/50">
                  {item.description}
                </p>

                <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-3xl border border-white/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#052119] via-transparent to-transparent opacity-60" />
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[12px] font-black uppercase tracking-widest text-[#00D492]">Eksplorasi</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0B100] text-[#052119] transition-all group-hover:rotate-45">
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </article>
          ))}
          
          {/* Extra Spacer for mobile scroll-end */}
          <div className="w-12 shrink-0 lg:hidden" />
        </div>
      </div>

        <div className="flex justify-center pt-2">
          <Link
            href="/potensi"
            className="group inline-flex items-center gap-3 rounded-2xl border border-[#052119]/10 bg-[#F4F3EF] px-10 py-4 text-[15px] font-black text-[#052119] transition-all hover:bg-[#052119] hover:text-[#00D492] hover:shadow-xl active:scale-95"
          >
            Lihat Potensi Lainnya
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
