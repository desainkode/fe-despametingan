import HeroSub from "@/app/components/SharedComponent/HeroSub";
import ContactForm from "@/app/components/Contact/Form";
import ContactInfo from "@/app/components/Contact/ContactInfo";
import Location from "@/app/components/Contact/OfficeLocation";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kontak | Desa Pameutingan",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Beranda" },
    { href: "/kontak", text: "Kontak" },
  ];
  return (
    <>
      <HeroSub
        title="Hubungi Kami"
        description="Kami siap melayani kebutuhan informasi dan layanan masyarakat Desa Pameutingan. Silakan hubungi kami melalui formulir atau kontak di bawah ini."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo />
      <ContactForm />
      <Location />
    </>
  );
};

export default page;
