import React from "react";
import { Target, CheckCircle2 } from "lucide-react";

export function VisionMissionSection({ vision, mission }: { vision: string, mission: string[] }) {
  return (
    <section className="relative overflow-hidden rounded-[48px] bg-[#0B281F] p-8 text-white shadow-2xl md:p-16 lg:p-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#009966]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
      
      <div className="relative z-10 grid gap-16 lg:grid-cols-2">
        {/* Vision */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-2 text-[13px] font-bold uppercase tracking-widest text-[#00E0A1] backdrop-blur-md">
            <Target size={18} />
            Visi Desa
          </div>
          <blockquote className="font-[Georgia,serif] text-xl font-bold italic leading-relaxed sm:text-2xl md:text-3xl">
            "{vision}"
          </blockquote>
        </div>

        {/* Mission */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-2 text-[13px] font-bold uppercase tracking-widest text-[#F0B100] backdrop-blur-md">
            <CheckCircle2 size={18} />
            Misi Desa
          </div>
          <div className="space-y-6">
            {mission.map((item, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#009966] text-white text-[11px] font-bold">
                  {idx + 1}
                </div>
                <p className="text-[15px] leading-relaxed text-white/70 group-hover:text-white transition-colors">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
