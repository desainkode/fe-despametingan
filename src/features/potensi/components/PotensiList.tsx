"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, X, Check } from "lucide-react";
import { mockPotensi } from "../config/mock-data";
import { PotensiCard } from "./PotensiCard";
import { PotensiStats } from "./PotensiStats";

const categories = [
  "Semua",
  "Sumber Daya Alam",
  "SDM",
  "Ekonomi & UMKM",
  "Wisata",
  "Peternakan & Perikanan",
  "Infrastruktur"
];

export function PotensiList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredItems = useMemo(() => {
    return mockPotensi.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div id="potensi-content" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Stats Summary */}
      <div className="mb-16 md:mb-24">
        <PotensiStats />
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-12 flex flex-col gap-4 md:mb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex-1 max-w-2xl">
          <div className="group relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0B281F]/30" size={18} />
            <input
              type="text"
              placeholder="Cari potensi desa..."
              className="h-14 w-full rounded-full border border-white bg-white pl-12 pr-6 text-[14px] font-medium shadow-[0_15px_40px_rgba(0,0,0,0.04)] outline-none focus:ring-4 focus:ring-[#0B281F]/5 sm:h-16 sm:pl-14 sm:pr-8 sm:text-[15px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[12px] font-bold transition-all sm:px-6 sm:py-3 sm:text-[13px] ${
                activeCategory === cat
                  ? "bg-[#0B281F] text-white shadow-lg"
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
        <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <PotensiCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-[#0B281F]/10 py-32 text-center">
          <Search size={48} className="mb-6 text-[#0B281F]/20" />
          <h3 className="text-xl font-bold text-[#0B281F]">Potensi Tidak Ditemukan</h3>
          <p className="mt-2 text-[#0B281F]/50">Coba gunakan kata kunci atau kategori lain.</p>
        </div>
      )}
    </div>
  );
}
