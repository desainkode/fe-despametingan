import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Layers } from "lucide-react";
import { PotensiItem } from "../types";

interface PotensiCardProps {
  item: PotensiItem;
}

export function PotensiCard({ item }: PotensiCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[24px] border border-white bg-white shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(11,40,31,0.1)] sm:rounded-[40px]">
      {/* Image Section */}
      <div className="relative h-40 w-full overflow-hidden sm:h-72">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B281F]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="absolute left-3 top-3 sm:left-6 sm:top-6">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#0B281F] backdrop-blur-md shadow-sm sm:px-4 sm:py-1.5 sm:text-[10px]">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4 sm:p-8 lg:p-10">
        <h3 className="mb-2 font-[Georgia,serif] text-lg font-bold leading-tight text-[#0B281F] transition-colors group-hover:text-[#009966] sm:mb-4 sm:text-2xl">
          {item.name}
        </h3>
        
        <p className="mb-4 line-clamp-2 text-[12px] leading-relaxed text-[#0B281F]/60 sm:mb-8 sm:line-clamp-3 sm:text-[15px]">
          {item.shortDesc}
        </p>

        {/* Highlights */}
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#F6F8F7] p-3 sm:mb-10 sm:gap-4 sm:rounded-3xl sm:p-5">
          {item.highlights.map((hl, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#0B281F]/30 sm:text-[11px]">{hl.label}</span>
              <span className="text-[12px] font-bold text-[#0B281F] sm:text-[16px]">{hl.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#0B281F]/5 pt-4 sm:pt-8">
          <Link 
            href={`/potensi/${item.slug}`}
            className="flex items-center gap-1 text-[11px] font-bold text-[#0B281F] transition-colors hover:text-[#009966] sm:gap-2 sm:text-[14px]"
          >
            <span className="hidden sm:inline">Lihat Detail Potensi</span>
            <span className="sm:hidden">Detail</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-18" />
          </Link>
          
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0B281F] text-white shadow-lg shadow-[#0B281F]/20 transition-all group-hover:rotate-12 group-hover:bg-[#009966] sm:h-12 sm:w-12 sm:rounded-2xl">
            <Layers size={14} className="sm:size-20" />
          </div>
        </div>
      </div>
    </article>
  );
}
