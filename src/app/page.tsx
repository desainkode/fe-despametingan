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
import { useDesa } from "@/hooks/useDesa";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { desa, loading } = useDesa();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B281F]">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Hero desa={desa} />

      {/* Statistics Section */}
      <StatsSection />

      {/* Map & Boundaries Section */}
      <MapSection />

      {/* APBDes Section */}
      <ApbdesSection />

      {/* Main Profile Section (Kepala Desa) */}
      <ProfileSection desa={desa} />

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
