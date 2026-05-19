import React from "react";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { NewsItem } from "../types";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[32px] border border-[#0B281F]/5 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(11,40,31,0.08)] sm:rounded-[40px]">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden sm:h-56">
        <img
          src={news.image}
          alt={news.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-[#0B281F] backdrop-blur-md shadow-sm sm:px-4 sm:py-1.5 sm:text-[11px]">
            {news.category.name}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-4 text-[11px] text-[#0B281F]/50 sm:mb-4 sm:gap-4 sm:text-[12px]">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar size={13} className="text-[#009966] w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {news.publishedAt}
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock size={13} className="text-[#009966] w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {news.readingTime}
          </div>
        </div>

        <h3 className="mb-3 font-[Georgia,serif] text-lg font-bold leading-snug text-[#0B281F] transition-colors group-hover:text-[#009966] sm:mb-4 sm:text-xl">
          <Link href={`/berita/${news.slug}`}>
            {news.title}
          </Link>
        </h3>

        <p className="mb-5 line-clamp-2 text-[12.5px] leading-relaxed text-[#0B281F]/60 sm:mb-6 sm:line-clamp-3 sm:text-[13px]">
          {news.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[#0B281F]/5 pt-4 sm:pt-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-full border border-[#0B281F]/10 bg-[#F6F8F7] sm:h-10 sm:w-10">
              <img src={news.author.avatar} alt={news.author.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#0B281F] sm:text-[12px] leading-tight">{news.author.name}</p>
              <p className="text-[9px] text-[#0B281F]/50 sm:text-[10px] mt-0.5">{news.author.role}</p>
            </div>
          </div>

          <Link
            href={`/berita/${news.slug}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B281F]/5 text-[#0B281F] transition-all duration-300 group-hover:bg-[#009966] group-hover:text-white sm:h-10 sm:w-10"
          >
            <ArrowRight size={16} className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
