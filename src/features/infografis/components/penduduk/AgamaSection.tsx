"use client";

import React from "react";
import { Paperclip } from "lucide-react";
import { sectionCardClass } from "../section-ui";
import { AGAMA_CARDS } from "../../config/penduduk-data";
import { AgamaStatCard } from "./AgamaStatCard";

export function AgamaSection() {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const paginationRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const updateActiveIndex = React.useCallback((scrollLeft: number, scrollWidth: number, clientWidth: number) => {
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }

    const progress = scrollLeft / maxScroll;
    const nextIndex = Math.round(progress * (AGAMA_CARDS.length - 1));

    setActiveIndex(nextIndex);

    const pagination = paginationRef.current;

    if (pagination) {
      pagination.dataset.activeIndex = String(nextIndex);
      Array.from(pagination.querySelectorAll<HTMLSpanElement>("span")).forEach((dot, index) => {
        const isActive = index === nextIndex;

        dot.className = isActive
          ? "h-2 rounded-full transition-all duration-300 ease-out w-8 bg-[#0B281F] shadow-[0_0_0_4px_rgba(11,40,31,0.08)]"
          : "h-2 rounded-full transition-all duration-300 ease-out w-2.5 bg-[#0B281F]/20";
      });
    }
  }, []);

  return (
    <section className={sectionCardClass + " bg-[#ffffff]"}>
      <div className="flex flex-col gap-7">
        <div className="relative grid gap-4 border-b border-[#0B281F]/10 pb-6 pr-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] md:items-start md:gap-6 md:pr-16">
          <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
            Berdasarkan
            <br />
            Agama
          </h2>

          <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
            Kelompok Berdasarkan Agama merupakan penyajian data penduduk menurut agama yang dianut,
            guna memberikan gambaran komposisi keagamaan masyarakat di suatu wilayah.
          </p>

          <button
            type="button"
            aria-label="Informasi berdasarkan agama"
            className="hero-reveal absolute right-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5 md:h-14 md:w-14"
          >
            <Paperclip size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={(event) => {
            const element = event.currentTarget;
            updateActiveIndex(element.scrollLeft, element.scrollWidth, element.clientWidth);
          }}
          className="overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max min-w-full snap-x snap-mandatory gap-4 pr-1 sm:gap-4.25">
            {AGAMA_CARDS.map((item, idx) => (
              <AgamaStatCard
                key={`${item.nama}-${idx}`}
                nama={item.nama}
                deskripsi={item.deskripsi}
                jumlah={item.jumlah}
                persentase={item.persentase}
                tema={item.tema}
                icon={item.icon}
                delayMs={120 + idx * 70}
              />
            ))}
          </div>
        </div>

        <div ref={paginationRef} className="flex items-center justify-center gap-2 pt-1" data-active-index={activeIndex}>
          {AGAMA_CARDS.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <span
                key={`agama-pagination-${item.nama}`}
                className={`h-2 rounded-full transition-all duration-300 ease-out ${isActive
                  ? "w-8 bg-[#0B281F] shadow-[0_0_0_4px_rgba(11,40,31,0.08)]"
                  : "w-2.5 bg-[#0B281F]/20"
                  }`}
                aria-hidden="true"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
