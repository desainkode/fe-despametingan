import { StuntingSection } from "@/features/infografis/components/StuntingSection";
import { Metadata } from "next";
import { getPublicStuntingData } from "@/lib/api/stunting";

export const metadata: Metadata = {
  title: "Data Stunting | Desa Pameutingan",
  description: "Statistik prevalensi dan program penanganan stunting di Desa Pameutingan.",
};

export default async function StuntingPage() {
  const data = await getPublicStuntingData();
  return <StuntingSection data={data} />;
}
