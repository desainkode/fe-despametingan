import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Layers } from "lucide-react";
import { PotensiItem } from "../types";

interface PotensiCardProps {
  item: PotensiItem;
}

export function PotensiCard({ item }: PotensiCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[40px] border border-white bg-white shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(11,40,31,0.1)]">
      {/* Image Section */}
      <div className="relative h-72 w-full overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B281F]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="absolute left-6 top-6">
          <span className="rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0B281F] backdrop-blur-md shadow-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-8 lg:p-10">
        <h3 className="mb-4 font-[Georgia,serif] text-2xl font-bold leading-tight text-[#0B281F] transition-colors group-hover:text-[#009966]">
          {item.name}
        </h3>
        
        <p className="mb-8 line-clamp-3 text-[15px] leading-relaxed text-[#0B281F]/60">
          {item.shortDesc}
        </p>

        {/* Highlights */}
        <div className="mb-10 grid grid-cols-2 gap-4 rounded-3xl bg-[#F6F8F7] p-5">
          {item.highlights.map((hl, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/30">{hl.label}</span>
              <span className="text-[16px] font-bold text-[#0B281F]">{hl.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#0B281F]/5 pt-8">
          <Link 
            href={`/potensi/${item.slug}`}
            className="flex items-center gap-2 text-[14px] font-bold text-[#0B281F] transition-colors hover:text-[#009966]"
          >
            Lihat Detail Potensi
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B281F] text-white shadow-lg shadow-[#0B281F]/20 transition-all group-hover:rotate-12 group-hover:bg-[#009966]">
            <Layers size={20} />
          </div>
        </div>
      </div>
    </article>
  );
}
