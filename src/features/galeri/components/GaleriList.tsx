"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, Calendar as CalendarIcon, Grid, LayoutGrid } from "lucide-react";
import { galleryCategories, mockGallery } from "../config/mock-data";
import { GaleriCard } from "./GaleriCard";

export function GaleriList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [displayCount, setDisplayCount] = useState(6);

  const filteredItems = useMemo(() => {
    return mockGallery.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div id="gallery-content" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Search & Filter Bar */}
      <div className="mb-12 flex flex-col gap-4 md:mb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex-1 max-w-2xl">
          <div className="group relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0B281F]/30" size={18} />
            <input
              type="text"
              placeholder="Cari dokumentasi kegiatan..."
              className="h-14 w-full rounded-full border border-white bg-white pl-12 pr-6 text-[14px] font-medium shadow-[0_15px_40px_rgba(0,0,0,0.04)] outline-none focus:ring-4 focus:ring-[#0B281F]/5 transition-all sm:h-16 sm:pl-14 sm:pr-8 sm:text-[15px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide sm:gap-3">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[12px] font-bold transition-all sm:px-6 sm:py-3 sm:text-[13px] ${
                activeCategory === cat
                  ? "bg-[#0B281F] text-white shadow-lg shadow-[#0B281F]/20"
                  : "bg-white text-[#0B281F] border border-[#0B281F]/5 hover:bg-[#F6F8F7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.slice(0, displayCount).map((item) => (
              <GaleriCard key={item.id} item={item} />
            ))}
          </div>
          
          {displayCount < filteredItems.length && (
            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => setDisplayCount(prev => prev + 6)}
                className="group flex items-center gap-3 rounded-full border border-[#0B281F]/10 bg-white px-10 py-5 text-[14px] font-bold text-[#0B281F] transition-all hover:bg-[#0B281F] hover:text-white"
              >
                Muat Lebih Banyak
                <div className="h-2 w-2 rounded-full bg-[#009966] group-hover:bg-white" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-[#0B281F]/10 py-32 text-center">
          <Search size={48} className="mb-6 text-[#0B281F]/20" />
          <h3 className="text-xl font-bold text-[#0B281F]">Dokumentasi Tidak Ditemukan</h3>
          <p className="mt-2 text-[#0B281F]/50">Maaf, kami tidak dapat menemukan momen yang Anda cari.</p>
        </div>
      )}
    </div>
  );
}
