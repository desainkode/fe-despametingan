"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StatusPengajuanPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/layanan-masyarakat?tab=monitoring");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0B281F] flex items-center justify-center">
      <div className="h-12 w-12 border-4 border-[#00E0A1] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
