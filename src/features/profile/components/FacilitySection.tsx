import React from "react";
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  Heart, 
  Sparkles 
} from "lucide-react";
import { Facility } from "../types";

export function FacilitySection({ facilities }: { facilities: Facility[] }) {
  const getFacilityStyle = (type: string) => {
    const normalized = type.toLowerCase();
    if (normalized.includes("pendidikan")) {
      return {
        icon: GraduationCap,
        color: "text-blue-600 bg-blue-50 border-blue-100",
        accent: "from-blue-500/10 to-blue-500/0",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-100"
      };
    }
    if (normalized.includes("kesehatan")) {
      return {
        icon: Heart,
        color: "text-emerald-600 bg-emerald-50 border-emerald-100",
        accent: "from-emerald-500/10 to-emerald-500/0",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100"
      };
    }
    if (normalized.includes("religi") || normalized.includes("agama")) {
      return {
        icon: Sparkles,
        color: "text-amber-600 bg-amber-50 border-amber-100",
        accent: "from-amber-500/10 to-amber-500/0",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-100"
      };
    }
    return {
      icon: Building2,
      color: "text-teal-600 bg-teal-50 border-teal-100",
      accent: "from-teal-500/10 to-teal-500/0",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-100"
    };
  };

  return (
    <section className="space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#0B281F]/5 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#0B281F]">
          <Building2 size={16} />
          Fasilitas Umum
        </div>
        <h2 className="font-[Georgia,serif] text-[22px] font-bold text-[#0B281F] md:text-[28px] lg:text-[32px] xl:text-[36px]">Sarana & Prasarana Desa</h2>
        <p className="max-w-2xl text-[13px] text-[#0B281F]/50 md:text-[14px]">Daftar sarana publik, sarana ibadah, pendidikan, serta kesehatan yang tersedia di Desa Pameutingan.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {facilities.map((f, i) => {
          const style = getFacilityStyle(f.type);
          const IconComponent = style.icon;

          return (
            <div 
              key={i}
              className="group relative overflow-hidden rounded-[32px] border border-white bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(11,40,31,0.08)] flex flex-col justify-between"
            >
              {/* Corner Ambient Light Accent */}
              <div className={`absolute -right-16 -top-16 h-36 w-36 rounded-full bg-linear-to-br ${style.accent} blur-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100`} />

              <div className="relative z-10 space-y-4">
                {/* Header: Icon & Category Badge */}
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${style.color} transition-all duration-500 group-hover:scale-110`}>
                    <IconComponent size={22} />
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${style.badgeColor}`}>
                    {f.type}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 
                    className="text-[16px] font-bold text-[#0B281F] leading-snug group-hover:text-[#009966] transition-colors"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {f.name}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-[#0B281F]/60 line-clamp-3">
                    {f.description}
                  </p>
                </div>
              </div>

              {/* Location Footer */}
              <div className="relative z-10 mt-6 flex items-center gap-2 border-t border-[#0B281F]/5 pt-4 text-[12px] font-bold text-[#0B281F]/50">
                <MapPin size={14} className="text-[#009966]" />
                <span className="truncate">{f.location}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
