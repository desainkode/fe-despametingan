"use client";

import React from "react";
import { ProfileHero } from "@/features/profile/components/ProfileHero";
import { AboutSection } from "@/features/profile/components/AboutSection";
import { VisionMissionSection } from "@/features/profile/components/VisionMissionSection";
import { GovernmentSection } from "@/features/profile/components/GovernmentSection";
import { HistorySection } from "@/features/profile/components/HistorySection";
import { FacilitySection } from "@/features/profile/components/FacilitySection";
import { mockProfile } from "@/features/profile/config/mock-data";
import { useDesa } from "@/hooks/useDesa";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { desa, loading } = useDesa();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8F7]">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  const profileData = {
    ...mockProfile,
    name: desa?.nama_desa || mockProfile.name,
    vision: desa?.visi || mockProfile.vision,
    mission: desa?.misi ? desa.misi.split("\n").filter(line => line.trim() !== "") : mockProfile.mission,
    history: desa?.sejarah || mockProfile.history,
  };

  return (
    <main className="min-h-screen bg-[#F6F8F7] overflow-x-hidden">
      <ProfileHero name={profileData.name} slogan={profileData.slogan} />
      
      <div id="profile-content" className="relative z-20 py-12 space-y-12 md:py-20 md:space-y-24 pb-24 md:pb-32">
        {/* Overview Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AboutSection />
        </div>

        {/* Vision & Mission */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <VisionMissionSection vision={profileData.vision} mission={profileData.mission} />
        </div>

        {/* History */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HistorySection history={profileData.history} establishedYear={profileData.establishedYear} />
        </div>

        {/* Government */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GovernmentSection members={mockProfile.governance} />
        </div>

        {/* Facilities */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FacilitySection facilities={mockProfile.facilities} />
        </div>

        {/* CTA / Footer Promo */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[48px] bg-[#009966] p-12 text-center text-white shadow-2xl">
             <h3 className="text-3xl font-bold mb-6">Membangun Bersama {profileData.name}</h3>
             <p className="max-w-2xl mx-auto text-white/70 mb-10">
               Mari berkontribusi dalam mewujudkan visi desa yang mandiri dan berbudaya. Hubungi kami untuk informasi lebih lanjut mengenai program desa.
             </p>
             <button className="bg-[#0B281F] px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform">
               Hubungi Kami Sekarang
             </button>
          </div>
        </div>
      </div>
    </main>
  );
}
