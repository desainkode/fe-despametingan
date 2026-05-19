import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Layers } from "lucide-react";
import { PotensiItem } from "../types";

interface PotensiCardProps {
  item: PotensiItem;
}

export function PotensiCard({ item }: PotensiCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[32px] border border-white bg-white shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(11,40,31,0.1)] sm:rounded-[40px]">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden sm:h-60">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B281F]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#0B281F] backdrop-blur-md shadow-sm sm:px-4 sm:py-1.5 sm:text-[10px]">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <h3 className="mb-2 font-[Georgia,serif] text-lg font-bold leading-tight text-[#0B281F] transition-colors group-hover:text-[#009966] sm:mb-4 sm:text-xl">
          {item.name}
        </h3>
        
        <p className="mb-5 line-clamp-2 text-[12.5px] leading-relaxed text-[#0B281F]/60 sm:mb-6 sm:line-clamp-3 sm:text-[13px]">
          {item.shortDesc}
        </p>

        {/* Highlights */}
        <div className="mb-5 grid grid-cols-2 gap-3 rounded-2xl bg-[#F6F8F7] p-3.5 sm:mb-6 sm:gap-3 sm:rounded-[24px] sm:p-4">
          {item.highlights.map((hl, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#0B281F]/30 sm:text-[10px]">{hl.label}</span>
              <span className="text-[12px] font-bold text-[#0B281F] sm:text-[14px]">{hl.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#0B281F]/5 pt-4 sm:pt-6">
          <Link 
            href={`/potensi/${item.slug}`}
            className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#0B281F] transition-colors hover:text-[#009966] sm:gap-2 sm:text-[13px]"
          >
            <span>Lihat Detail Potensi</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
          
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B281F] text-white shadow-lg shadow-[#0B281F]/20 transition-all group-hover:rotate-12 group-hover:bg-[#009966] sm:h-10 sm:w-10">
            <Layers size={16} className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      </div>
    </article>
  );
}
