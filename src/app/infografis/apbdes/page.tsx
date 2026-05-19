
import { ApbdesSection } from "@/features/infografis/components/ApbdesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Apbdes | Desa Pameutingan",
  description: "Informasi alokasi dan distribusi APBDes di Desa Pameutingan.",
};

export default function ApbdesPage() {
  return <ApbdesSection />;
}