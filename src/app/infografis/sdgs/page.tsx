import { SdgsSection } from "@/features/infografis/components/SdgsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SDGs Desa | Desa Pameutingan",
  description: "Capaian Sustainable Development Goals (SDGs) Desa Pameutingan.",
};

export default function SdgsPage() {
  return <SdgsSection />;
}
