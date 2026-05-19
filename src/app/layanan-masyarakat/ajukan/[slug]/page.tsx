"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AjukanLayananPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();

  // Unwrap params using React.use() or a simple async/await approach in an effect
  useEffect(() => {
    params.then((p) => {
      router.replace(`/layanan-masyarakat?tab=surat&slug=${p.slug}`);
    });
  }, [params, router]);

  return (
    <div className="min-h-screen bg-[#0B281F] flex items-center justify-center">
      <div className="h-12 w-12 border-4 border-[#00E0A1] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
