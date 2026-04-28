"use client";

import React, { useState } from "react";
import { Users2, Award, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import { GovernmentMember } from "../types";

export function GovernmentSection({ members }: { members: GovernmentMember[] }) {
  const [showOrgChart, setShowOrgChart] = useState(false);

  return (
    <section className="space-y-16">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#0B281F]/5 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#0B281F]">
          <Users2 size={16} />
          Struktur Pemerintahan
        </div>
        <h2 className="font-[Georgia,serif] text-[32px] font-bold text-[#0B281F] md:text-[42px]">Perangkat Desa Pameutingan</h2>
        <p className="max-w-2xl text-[15px] text-[#0B281F]/50">Melayani dengan integritas, transparansi, dan dedikasi untuk kemajuan bersama.</p>
      </div>

      {/* Apparatus Grid - Matching Home Page Style */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member, idx) => (
          <div 
            key={idx}
            className="group relative h-[400px] overflow-hidden rounded-[32px] bg-[#0B281F] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(11,40,31,0.2)]"
          >
            {/* Base Image */}
            <img 
              src={member.photo} 
              alt={member.name} 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 border border-white/10 rounded-[32px] pointer-events-none" />

            {/* Content at Bottom */}
            <div className="absolute bottom-0 w-full p-6 text-center">
              <p 
                className="text-xl font-bold text-white md:text-2xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {member.position}
              </p>
              <p className="mt-1 text-sm font-medium text-[#D4FBEA]">
                {member.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Org Chart Section */}
      <div className="flex flex-col items-center gap-8 border-t border-[#0B281F]/5 pt-16">
        <button 
          onClick={() => setShowOrgChart(!showOrgChart)}
          className="flex items-center gap-3 rounded-full bg-[#F0B100] px-10 py-5 text-[14px] font-bold text-[#0B281F] shadow-xl transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(240,177,0,0.3)]"
        >
          <ImageIcon size={20} />
          {showOrgChart ? "Sembunyikan Bagan" : "Lihat Bagan Struktur Organisasi Lengkap"}
          {showOrgChart ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showOrgChart && (
          <div className="w-full max-w-5xl overflow-hidden rounded-[48px] border-8 border-white bg-white shadow-2xl animate-in fade-in zoom-in duration-500">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
              alt="Bagan Struktur Organisasi" 
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
}

