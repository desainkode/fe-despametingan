"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
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
  const filterRef = useRef<HTMLDivElement>(null);

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

      {/* Sticky Filter & Search Bar Container (Matches News Page Style) */}
      <div className="sticky top-28 z-40 mb-12 md:mb-20 flex justify-center">
        <div className="relative flex w-full max-w-3xl items-center gap-1.5 rounded-full border border-white/40 bg-white/70 p-1.5 shadow-[0_20px_50px_rgba(11,40,31,0.1)] backdrop-blur-2xl transition-all focus-within:bg-white focus-within:shadow-[0_25px_60px_rgba(11,40,31,0.15)] sm:gap-2 sm:p-2">
          {/* Search Icon Badge */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B281F] text-white sm:h-12 sm:w-12">
            <Search size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          
          {/* Input field */}
          <input
            type="text"
            placeholder="Cari potensi desa..."
            className="flex-1 bg-transparent px-2 text-[13px] font-medium text-[#0B281F] outline-none placeholder:text-[#0B281F]/30 sm:text-[14px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Separator line */}
          <div className="h-6 w-px bg-[#0B281F]/10 mx-1 sm:h-8" />
          
          {/* Filter dropdown */}
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[11.5px] font-bold transition-all sm:px-5 sm:py-3 sm:text-[12.5px] ${
                isFilterOpen || activeCategory !== "Semua"
                  ? "bg-[#0B281F] text-white shadow-lg"
                  : "bg-transparent text-[#0B281F] hover:bg-[#0B281F]/5"
              }`}
            >
              <Filter size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">
                {activeCategory === "Semua" ? "Filter" : activeCategory}
              </span>
            </button>

            {/* Dropdown Popup */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-4 w-60 overflow-hidden rounded-[24px] border border-[#0B281F]/5 bg-white p-2 shadow-[0_25px_70px_rgba(0,0,0,0.15)] animate-in zoom-in-95 fade-in duration-200 origin-top-right sm:rounded-[32px] z-50">
                <div className="flex flex-col">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-2xl px-5 py-3.5 text-left text-[12px] transition-all ${
                        activeCategory === cat
                          ? "bg-[#0B281F]/5 font-bold text-[#0B281F]"
                          : "text-[#0B281F]/60 hover:bg-[#F6F8F7] hover:text-[#0B281F]"
                      }`}
                    >
                      {cat}
                      {activeCategory === cat && <Check size={14} className="text-[#009966]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <PotensiCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-[#0B281F]/10 py-32 text-center">
          <Search size={48} className="mb-6 text-[#0B281F]/20" />
          <h3 className="text-lg font-bold text-[#0B281F]">Potensi Tidak Ditemukan</h3>
          <p className="mt-2 text-[#0B281F]/50">Coba gunakan kata kunci atau kategori lain.</p>
        </div>
      )}
    </div>
  );
}
