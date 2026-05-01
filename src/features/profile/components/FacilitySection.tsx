import React from "react";
import { Building2, MapPin } from "lucide-react";
import { Facility } from "../types";

export function FacilitySection({ facilities }: { facilities: Facility[] }) {
  return (
    <section className="space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#0B281F]/5 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#0B281F]">
          <Building2 size={16} />
          Fasilitas Umum
        </div>
        <h2 className="font-[Georgia,serif] text-[32px] font-bold text-[#0B281F] md:text-[42px]">Sarana & Prasarana Desa</h2>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-white bg-white shadow-xl sm:rounded-[40px]">
        <div className="relative overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Scroll Hint */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
          
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0B281F]/5">
                <th className="whitespace-nowrap px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/40 sm:px-8 sm:py-6 sm:text-[13px]">Nama Fasilitas</th>
                <th className="whitespace-nowrap px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/40 sm:px-8 sm:py-6 sm:text-[13px]">Kategori</th>
                <th className="whitespace-nowrap px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/40 sm:px-8 sm:py-6 sm:text-[13px]">Lokasi</th>
                <th className="whitespace-nowrap px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/40 sm:px-8 sm:py-6 sm:text-[13px]">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B281F]/5">
              {facilities.map((f, i) => (
                <tr key={i} className="hover:bg-[#F6F8F7] transition-colors">
                  <td className="whitespace-nowrap px-6 py-5 font-bold text-[#0B281F] sm:px-8 sm:py-6">{f.name}</td>
                  <td className="whitespace-nowrap px-6 py-5 sm:px-8 sm:py-6">
                    <span className="inline-flex rounded-full bg-[#0B281F]/5 px-3 py-1 text-[11px] font-bold text-[#0B281F] sm:text-[12px]">
                      {f.type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 sm:px-8 sm:py-6">
                    <div className="flex items-center gap-2 text-[13px] text-[#0B281F]/60 sm:text-[14px]">
                      <MapPin size={14} className="text-[#009966]" />
                      {f.location}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[13px] text-[#0B281F]/50 sm:px-8 sm:py-6 sm:text-[14px]">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
