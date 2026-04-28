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

      <div className="overflow-hidden rounded-[40px] border border-white bg-white shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0B281F]/5">
                <th className="px-8 py-6 text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/40">Nama Fasilitas</th>
                <th className="px-8 py-6 text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/40">Kategori</th>
                <th className="px-8 py-6 text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/40">Lokasi</th>
                <th className="px-8 py-6 text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/40">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B281F]/5">
              {facilities.map((f, i) => (
                <tr key={i} className="hover:bg-[#F6F8F7] transition-colors">
                  <td className="px-8 py-6 font-bold text-[#0B281F]">{f.name}</td>
                  <td className="px-8 py-6">
                    <span className="inline-flex rounded-full bg-[#0B281F]/5 px-3 py-1 text-[12px] font-bold text-[#0B281F]">
                      {f.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[14px] text-[#0B281F]/60">
                      <MapPin size={14} className="text-[#009966]" />
                      {f.location}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[14px] text-[#0B281F]/50">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
