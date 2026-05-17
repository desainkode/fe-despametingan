import { IdmSection } from "@/features/infografis/components/IdmSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indeks Desa Membangun (IDM) | Desa Pameutingan",
  description: "Status dan indikator Indeks Desa Membangun Desa Pameutingan.",
};

export default function IdmPage() {
  return <IdmSection />;
}
