import { StuntingSection } from "@/features/infografis/components/StuntingSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Stunting | Desa Pameutingan",
  description: "Statistik prevalensi dan program penanganan stunting di Desa Pameutingan.",
};

export default function StuntingPage() {
  return <StuntingSection />;
}
