"use client";

import React from "react";
import { HeartHandshake } from "lucide-react";
import { sectionCardClass } from "../section-ui";
import { STATUS_PERKAWINAN_IMAGE, STATUS_PERKAWINAN_CARDS } from "../../config/penduduk-data";
import { StatusPerkawinanStatCard } from "./StatusPerkawinanStatCard";

export function StatusPerkawinanSection() {
  return (
    <section className={sectionCardClass + " bg-[#ffffff]"}>
      <div className="flex flex-col gap-7">
        <div className="relative grid gap-4 border-b border-[#0B281F]/10 pb-6 pr-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] md:items-start md:gap-6 md:pr-16">
          <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
            Berdasarkan
            <br />
            Status Perkawinan
          </h2>

          <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
            Kelompok Berdasarkan Status Perkawinan merupakan penyajian data penduduk menurut status
            perkawinan, seperti belum kawin, kawin, cerai hidup, atau cerai mati, untuk memberikan
            gambaran kondisi sosial masyarakat di suatu wilayah.
          </p>

          <button
            type="button"
            aria-label="Informasi berdasarkan status perkawinan"
            className="hero-reveal absolute right-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5 md:h-14 md:w-14"
          >
            <HeartHandshake size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[24px] bg-linear-to-br from-[#0B281F] to-[#174738]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,0.88fr)_minmax(0,1.12fr)] lg:items-center">
            <div className="flex min-h-90 items-center justify-center border-b border-white/10 p-4 sm:p-6 lg:min-h-125 lg:border-b-0 lg:border-r lg:border-white/10 lg:p-8">
              <div className="hero-reveal relative aspect-4/5 w-full max-w-90 overflow-hidden rounded-[28px] border border-white/15 bg-black/20 shadow-[0_24px_50px_rgba(0,0,0,0.28)]" style={{ animationDelay: "160ms" }}>
                <img
                  src={STATUS_PERKAWINAN_IMAGE}
                  alt="Ilustrasi status perkawinan"
                  className="h-full w-full object-cover grayscale hero-zoom"
                />

                <div className="absolute inset-x-3 bottom-3 rounded-[14px] border border-white/20 bg-black/35 p-3 shadow-[0_8px_18px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <div>
                      <p className="font-bold text-[#F4F3EF] sm:text-[15px]">
                        Data Perkawinan <span className="text-[#F0B100]">Desa Pameutingan</span>
                      </p>
                      <p className="mt-1 text-[12px] text-[#A4F4CF]">Total presentase kawin dan belum kawin</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#00E397]/70 bg-[#009966] px-3 py-1 text-[12px] font-medium text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F0B100]" />
                      83%
                    </div>
                  </div>
                  <p className="mt-3 text-[10.5px] italic leading-[1.35] text-[#D0FAE5CC] sm:text-[11px]">
                    Data perkawinan Desa Pameutingan menampilkan persentase penduduk yang berstatus
                    kawin dan belum kawin sebagai gambaran kondisi sosial masyarakat.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex h-full items-center p-4 sm:p-6 md:p-8 lg:p-9">
              <div className="w-full space-y-4 sm:space-y-5">
                {STATUS_PERKAWINAN_CARDS.map((item, idx) => (
                  <StatusPerkawinanStatCard
                    key={`${item.title}-${idx}`}
                    title={item.title}
                    description={item.description}
                    jumlah={item.jumlah}
                    icon={item.icon}
                    delayMs={140 + idx * 80}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
