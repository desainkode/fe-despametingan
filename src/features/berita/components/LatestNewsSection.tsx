import React from "react";
import Link from "next/link";
import { Calendar, ArrowUpRight, Clock } from "lucide-react";
import { mockNews } from "../config/mock-data";

export function LatestNewsSection() {
  const latestNews = mockNews.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestNews.map((news, idx) => (
          <article 
            key={news.id} 
            className={`group relative overflow-hidden rounded-[32px] border border-white bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(11,40,31,0.1)] ${
              idx === 0 ? "lg:col-span-1" : ""
            }`}
          >
            {/* Image Overlay Header */}
            <div className="relative h-60 w-full overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B281F]/60 via-transparent to-transparent" />
              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/20">
                  {news.category.name}
                </span>
              </div>
              
              <div className="absolute bottom-4 left-5 flex items-center gap-4 text-[11px] font-bold text-white/90">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {news.publishedAt}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {news.readingTime}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8">
              <h3 className="mb-4 line-clamp-2 font-[Georgia,serif] text-xl font-bold leading-tight text-[#0B281F] transition-colors group-hover:text-[#009966] md:text-2xl">
                <Link href={`/berita/${news.slug}`}>
                  {news.title}
                </Link>
              </h3>
              
              <p className="mb-8 line-clamp-2 text-[14px] leading-relaxed text-[#0B281F]/50">
                {news.excerpt}
              </p>

              <div className="flex items-center justify-between border-t border-[#0B281F]/5 pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 overflow-hidden rounded-full border border-[#0B281F]/10">
                    <img src={news.author.avatar} alt="" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-[13px] font-bold text-[#0B281F]">{news.author.name}</span>
                </div>
                
                <Link 
                  href={`/berita/${news.slug}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B281F]/5 text-[#0B281F] transition-all group-hover:bg-[#009966] group-hover:text-white"
                >
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
