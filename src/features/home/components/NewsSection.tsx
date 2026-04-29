"use client";

import { ArrowRight, Leaf } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import Image from "next/image";
import { INFORMASI_TERKINI } from "../config/home-data";

export default function NewsSection() {
  return (
    <section className="bg-[#FFFFFF] px-4 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:gap-10">
        <SectionHeader 
          title={["Informasi Terkini", "Desa Pameutingan"]}
          description="Menyajikan ringkasan kabar terbaru desa secara transparan, akurat, dan mudah diakses agar warga dapat mengikuti aktivitas, program, serta perkembangan desa secara cepat."
          showInfoButton
        />

        <div className="grid justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-8">
          {INFORMASI_TERKINI.map((item, index) => (
            <button
              key={index}
              type="button"
              className="hero-reveal group relative flex h-93.25 w-full max-w-72 flex-col items-start gap-3 rounded-[17px] bg-[#D9D9D9] px-5.75 py-5.5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: `${220 + index * 70}ms` }}
            >
              <div className="flex w-full items-start justify-between gap-4">
                <h3 className="font-timeless max-w-43 text-[20px] font-bold leading-[1.28] text-[#004F3B]">
                  {item.title}
                </h3>
                <span className="inline-flex h-11.25 w-11.25 shrink-0 items-center justify-center rounded-full border border-[#004F3B]/80 text-[#004F3B] group-hover:bg-[#004F3B] group-hover:text-white transition-colors duration-300">
                  <ArrowRight size={20} strokeWidth={2} />
                </span>
              </div>

              <p className="max-w-52.5 text-[14px] leading-5 text-[#0B281F]">
                {item.description}
              </p>

              <div className="relative mt-auto h-43.5 w-full overflow-hidden rounded-[7px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-5 left-5 inline-flex h-11.25 w-11.25 items-center justify-center rounded-full bg-[#004F3B] text-white shadow-lg">
                  <Leaf size={16} strokeWidth={2.2} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
