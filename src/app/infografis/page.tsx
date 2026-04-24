import type { Metadata } from "next";

import InfografisTabs from "@/features/infografis/components/InfografisTabs";

export const metadata: Metadata = {
  title: "Infografis | Desa Pameutingan",
  description:
    "Pusat infografis data desa untuk penduduk, APBDes, stunting, bansos, IDM, dan SDGs.",
};

export default function InfografisPage() {
  return <InfografisTabs />;
}