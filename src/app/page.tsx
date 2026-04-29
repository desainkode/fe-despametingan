"use client";

import Hero from "@/features/home/components/Hero";
import StatsSection from "@/features/home/components/StatsSection";
import MapSection from "@/features/home/components/MapSection";
import ApbdesSection from "@/features/home/components/ApbdesSection";
import ProfileSection from "@/features/home/components/ProfileSection";
import StructureSection from "@/features/home/components/StructureSection";
import NewsSection from "@/features/home/components/NewsSection";
import PotensiSection from "@/features/home/components/PotensiSection";
import GaleriSection from "@/features/home/components/GaleriSection";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Statistics Section */}
      <StatsSection />

      {/* Map & Boundaries Section */}
      <MapSection />

      {/* APBDes Section */}
      <ApbdesSection />

      {/* Main Profile Section (Kepala Desa) */}
      <ProfileSection />

      {/* Village Structure Section */}
      <StructureSection />

      {/* Latest Information Section */}
      <NewsSection />

      {/* Local Potential Section */}
      <PotensiSection />

      {/* Gallery Section */}
      <GaleriSection />
    </>
  );
}
