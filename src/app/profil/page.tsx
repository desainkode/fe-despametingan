import React from "react";
import { ProfileHero } from "@/features/profile/components/ProfileHero";
import { AboutSection } from "@/features/profile/components/AboutSection";
import { VisionMissionSection } from "@/features/profile/components/VisionMissionSection";
import { GovernmentSection } from "@/features/profile/components/GovernmentSection";
import { HistorySection } from "@/features/profile/components/HistorySection";
import { FacilitySection } from "@/features/profile/components/FacilitySection";
import { mockProfile } from "@/features/profile/config/mock-data";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#F6F8F7] overflow-x-hidden">
      <ProfileHero name={mockProfile.name} slogan={mockProfile.slogan} />
      
      <div id="profile-content" className="relative z-20 py-12 space-y-12 md:py-20 md:space-y-24 pb-24 md:pb-32">
        {/* Overview Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AboutSection />
        </div>

        {/* Vision & Mission */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <VisionMissionSection vision={mockProfile.vision} mission={mockProfile.mission} />
        </div>

        {/* History */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HistorySection history={mockProfile.history} establishedYear={mockProfile.establishedYear} />
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
             <h3 className="text-3xl font-bold mb-6">Membangun Bersama Pameutingan</h3>
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
