import { BansosSection } from "@/features/infografis/components/BansosSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Bansos | Desa Pameutingan",
  description: "Informasi alokasi dan distribusi bantuan sosial di Desa Pameutingan.",
};

export default function BansosPage() {
  return <BansosSection />;
}
