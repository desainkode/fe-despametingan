import HeroSub from "@/app/components/SharedComponent/HeroSub";
import APBDes from "@/app/components/Home/APBDes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparansi Anggaran | Desa Pameutingan",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Beranda" },
    { href: "/pricing", text: "Anggaran" },
  ];
  return (
    <>
      <HeroSub
        title="Transparansi Anggaran"
        description="Laporan Pendapatan dan Belanja Desa (APBDes) Pameutingan sebagai bentuk keterbukaan informasi publik."
        breadcrumbLinks={breadcrumbLinks}
      />
      <APBDes />
    </>
  );
};

export default page;
