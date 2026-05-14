import React from "react";
import { Metadata } from "next";
import Hero from "@/app/components/Home/Hero";
import Services from "@/app/components/Home/Services";
import Features from "@/app/components/Home/Features";
import PotensiDesa from "@/app/components/Home/PotensiDesa";
import APBDes from "@/app/components/Home/APBDes";
import AparaturDesa from "@/app/components/Home/AparaturDesa";
import InformasiTerkini from "@/app/components/Home/InformasiTerkini";
import FAQ from "@/app/components/Home/FAQ";

export const metadata: Metadata = {
  title: "Desa Pameutingan",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Features />
      <PotensiDesa />
      <APBDes />
      <AparaturDesa />
      <InformasiTerkini />
      <FAQ />
    </main>
  );
}
