import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Play, Image as ImageIcon } from "lucide-react";
import { GaleriItem } from "../types";

interface GaleriCardProps {
  item: GaleriItem;
}

export function GaleriCard({ item }: GaleriCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white bg-white shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(11,40,31,0.1)] sm:rounded-[40px]">
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden sm:h-56">
        <img 
          src={item.image} 
          alt={item.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B281F]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-[#0B281F] backdrop-blur-md shadow-sm sm:px-4 sm:py-1.5 sm:text-[10px]">
            {item.category}
          </span>
        </div>

        {/* Media Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-100 sm:h-12 sm:w-12">
            {item.videoUrl ? <Play size={18} className="w-4 h-4 sm:w-5 sm:h-5" /> : <ImageIcon size={18} className="w-4 h-4 sm:w-5 sm:h-5" />}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-[#0B281F]/40 sm:mb-4 sm:gap-3 sm:text-[11px]">
          <Calendar size={13} className="text-[#009966] w-3 h-3 sm:w-3.5 sm:h-3.5" />
          {item.date}
        </div>

        <h3 className="mb-2 font-[Georgia,serif] text-lg font-bold leading-tight text-[#0B281F] transition-colors group-hover:text-[#009966] sm:mb-4 sm:text-lg">
          <Link href={`/galeri/${item.slug}`}>
            {item.title}
          </Link>
        </h3>

        <p className="mb-4 line-clamp-2 text-[12.5px] leading-relaxed text-[#0B281F]/60 sm:mb-6 sm:text-[13px]">
          {item.shortDesc}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[#0B281F]/5 pt-4 sm:pt-6">
          <Link 
            href={`/galeri/${item.slug}`}
            className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#0B281F] transition-all hover:text-[#009966] sm:gap-2 sm:text-[12px]"
          >
            <span>Detail Momen</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          
          <span className="text-[9.5px] font-bold uppercase tracking-widest text-[#0B281F]/20 sm:text-[10px]">
            {item.photos.length} Foto
          </span>
        </div>
      </div>
    </article>
  );
}
