import { PendudukSection } from "@/features/infografis/components/PendudukSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Penduduk | Desa Pameutingan",
  description: "Statistik dan demografi penduduk Desa Pameutingan.",
};

export default function PendudukPage() {
  return <PendudukSection />;
}
