"use client";

import React, { useEffect } from "react";
import { CitizenDashboard } from "@/features/layanan/components/CitizenDashboard";
import { useAuth } from "@/features/layanan/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LayananPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, redirect to login immediately
    if (!isAuthenticated) {
      router.replace("/layanan-masyarakat/login");
    }
  }, [isAuthenticated, router]);

  // If not authenticated, show nothing to prevent "flashing" the page content
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B281F] flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-[#00E0A1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <CitizenDashboard />;
}
