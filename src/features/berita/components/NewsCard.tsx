import React from "react";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { NewsItem } from "../types";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[32px] border border-[#0B281F]/5 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(11,40,31,0.08)]">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0B281F] backdrop-blur-md shadow-sm">
            {news.category.name}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-4 flex items-center gap-4 text-[12px] text-[#0B281F]/50">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            {news.publishedAt}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            {news.readingTime}
          </div>
        </div>

        <h3 className="mb-4 font-[Georgia,serif] text-xl font-bold leading-snug text-[#0B281F] transition-colors group-hover:text-[#009966] md:text-2xl">
          <Link href={`/berita/${news.slug}`}>
            {news.title}
          </Link>
        </h3>

        <p className="mb-8 line-clamp-3 text-[14px] leading-relaxed text-[#0B281F]/60">
          {news.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[#0B281F]/5 pt-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-[#0B281F]/10 bg-[#F6F8F7]">
              <img src={news.author.avatar} alt={news.author.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0B281F]">{news.author.name}</p>
              <p className="text-[11px] text-[#0B281F]/50">{news.author.role}</p>
            </div>
          </div>

          <Link
            href={`/berita/${news.slug}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B281F]/5 text-[#0B281F] transition-all duration-300 group-hover:bg-[#009966] group-hover:text-white"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
}
