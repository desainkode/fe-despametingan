"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, Check, Loader2 } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  sublabel?: string;
}

interface SearchableSelectProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  onSearchAsync?: (query: string) => Promise<Option[]>;
  staticOptions?: Option[];
  disabled?: boolean;
  className?: string;
}

export function SearchableSelect({
  value,
  onChange,
  placeholder = "Pilih data...",
  searchPlaceholder = "Cari data...",
  onSearchAsync,
  staticOptions = [],
  disabled = false,
  className
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<Option[]>(staticOptions);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Find currently selected label
  const selectedOption = options.find((opt) => opt.value === value) || 
    (value ? { value, label: value } : null);

  // Debounced search logic for async mode
  useEffect(() => {
    if (!onSearchAsync) {
      // Local filter mode
      if (search.trim() === "") {
        setOptions(staticOptions);
      } else {
        const filtered = staticOptions.filter((opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase()) ||
          (opt.sublabel && opt.sublabel.toLowerCase().includes(search.toLowerCase()))
        );
        setOptions(filtered);
      }
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const results = await onSearchAsync(search);
        setOptions(results);
      } catch (error) {
        console.error("Gagal memuat opsi pencarian:", error);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounce);
  }, [search, onSearchAsync, staticOptions]);

  // Load initial options if async
  useEffect(() => {
    if (onSearchAsync && isOpen && search === "") {
      const loadInitial = async () => {
        try {
          setLoading(true);
          const results = await onSearchAsync("");
          setOptions(results);
        } catch (error) {
          console.error("Gagal memuat opsi awal:", error);
        } finally {
          setLoading(false);
        }
      };
      loadInitial();
    }
  }, [isOpen, onSearchAsync]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSearch("");
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 cursor-pointer",
          disabled && "pointer-events-none opacity-50 bg-slate-100"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={cn("truncate font-medium", !value && "text-slate-400 font-normal")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <div className="flex items-center gap-1.5">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <span className="text-slate-400">▼</span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1.5 max-h-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-1 duration-150 flex flex-col">
          <div className="flex items-center border-b border-slate-100 p-2 gap-2 bg-slate-50/30">
            <Search size={16} className="text-slate-400 ml-2 shrink-0" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-8 border-none bg-transparent shadow-none focus-visible:ring-0 px-1 py-0 w-full"
              autoFocus
            />
          </div>
          
          <div className="overflow-y-auto max-h-56 p-1 custom-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center p-6 text-sm text-slate-400 gap-2 font-medium">
                <Loader2 size={16} className="animate-spin text-emerald-600" />
                Mencari data...
              </div>
            ) : options.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-400 font-medium">
                Data tidak ditemukan
              </div>
            ) : (
              options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-all hover:bg-slate-50 font-medium text-slate-700",
                      isSelected && "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                    )}
                  >
                    <div className="flex flex-col">
                      <span>{opt.label}</span>
                      {opt.sublabel && (
                        <span className="text-[10px] text-slate-400 font-mono tracking-tight mt-0.5">
                          {opt.sublabel}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check size={16} className="text-emerald-600 shrink-0" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
