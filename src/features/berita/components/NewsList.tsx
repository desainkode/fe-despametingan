"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, Filter, X, ChevronRight, LayoutGrid, Check } from "lucide-react";
import { newsCategories, mockNews } from "../config/mock-data";
import { NewsCard } from "./NewsCard";

export function NewsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const filteredNews = useMemo(() => {
    return mockNews.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const isTerbaru = activeCategory === "terbaru" ? (item.publishedAt.includes("2026-04")) : true;
      const matchesCategory = activeCategory === "semua" || activeCategory === "terbaru" || item.category.slug === activeCategory;
      return matchesSearch && matchesCategory && isTerbaru;
    });
  }, [searchQuery, activeCategory]);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section id="news-list" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 relative pt-20">
      {/* Search & Filter Integrated Bar */}
      <div className="sticky top-28 z-40 mb-20 flex justify-center">
        <div className="relative flex w-full max-w-3xl items-center gap-2 rounded-full border border-white/40 bg-white/70 p-2 shadow-[0_20px_50px_rgba(11,40,31,0.1)] backdrop-blur-2xl transition-all focus-within:bg-white focus-within:shadow-[0_25px_60px_rgba(11,40,31,0.15)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B281F] text-white">
            <Search size={20} />
          </div>
          
          <input
            type="text"
            placeholder="Cari kabar desa..."
            className="flex-1 bg-transparent px-2 text-[15px] font-medium text-[#0B281F] outline-none placeholder:text-[#0B281F]/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="h-8 w-px bg-[#0B281F]/10 mx-1" />
          
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-bold transition-all ${
                isFilterOpen || activeCategory !== "semua"
                  ? "bg-[#0B281F] text-white shadow-lg"
                  : "bg-transparent text-[#0B281F] hover:bg-[#0B281F]/5"
              }`}
            >
              <Filter size={16} />
              <span className="hidden sm:inline">
                {activeCategory === "semua" ? "Filter" : newsCategories.find(c => c.slug === activeCategory)?.name}
              </span>
            </button>

            {/* Minimalist Dropdown Popup */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-4 w-64 overflow-hidden rounded-[32px] border border-[#0B281F]/5 bg-white p-2 shadow-[0_25px_70px_rgba(0,0,0,0.15)] animate-in zoom-in-95 fade-in duration-200 origin-top-right">
                <div className="flex flex-col">
                  {newsCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.slug);
                        setIsFilterOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-2xl px-5 py-3.5 text-left text-[14px] transition-all ${
                        activeCategory === category.slug
                          ? "bg-[#0B281F]/5 font-bold text-[#0B281F]"
                          : "text-[#0B281F]/60 hover:bg-[#F6F8F7] hover:text-[#0B281F]"
                      }`}
                    >
                      {category.name}
                      {activeCategory === category.slug && <Check size={14} className="text-[#009966]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-[#0B281F]/10 py-24 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#0B281F]/5 text-[#0B281F]/20">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-bold text-[#0B281F]">Berita Tidak Ditemukan</h3>
          <p className="mt-2 max-w-xs text-[14px] text-[#0B281F]/50">
            Maaf, kami tidak dapat menemukan berita yang Anda cari. Coba gunakan kata kunci lain.
          </p>
        </div>
      )}
    </section>
  );
}
