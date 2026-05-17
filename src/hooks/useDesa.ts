"use client";

import { useEffect, useState } from "react";
import { getPublicDesaProfile } from "@/lib/api/desa";
import { Desa } from "@/types";

export function useDesa(kode?: string) {
  const [desa, setDesa] = useState<Desa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getPublicDesaProfile(kode);
        setDesa(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [kode]);

  return { desa, loading, error };
}
