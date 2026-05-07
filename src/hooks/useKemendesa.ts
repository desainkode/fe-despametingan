"use client";

import { useEffect, useState } from "react";
import { getIdmData, getSdgsData } from "@/lib/api/kemendesa";

export function useIdm(tahun?: number, kode?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getIdmData(tahun, kode);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [tahun, kode]);

  return { data, loading, error };
}

export function useSdgs(kode?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getSdgsData(kode);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [kode]);

  return { data, loading, error };
}
