import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  TrendingUp, 
  Download, 
  Share2, 
  Info,
  ChevronRight,
  Globe
} from "lucide-react";
import { mockPotensi } from "@/features/potensi/config/mock-data";

export default async function PotensiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = mockPotensi.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F6F8F7] pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B281F] via-[#0B281F]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B281F]/60 via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <Link
              href="/potensi"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13px] font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <ArrowLeft size={16} />
              Kembali ke Potensi
            </Link>
            
            <div className="mb-4 inline-flex rounded-full bg-[#009966] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg">
              {item.category}
            </div>
            
            <h1 className="max-w-4xl font-[Georgia,serif] text-[40px] font-bold leading-tight text-white sm:text-[52px] lg:text-[64px]">
              {item.name}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description Card */}
            <div className="rounded-[40px] border border-white bg-white p-8 shadow-xl md:p-12">
              <h2 className="mb-6 text-2xl font-bold text-[#0B281F]">Deskripsi Potensi</h2>
              <div className="prose prose-lg max-w-none text-[17px] leading-relaxed text-[#0B281F]/70">
                <p>{item.longDesc}</p>
              </div>
            </div>

            {/* Detailed Table */}
            <div className="rounded-[40px] border border-white bg-white p-8 shadow-xl md:p-12 overflow-hidden">
              <h2 className="mb-8 text-2xl font-bold text-[#0B281F]">Data Rinci Potensi</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#0B281F]/5">
                      <th className="pb-4 text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/30">Sub Kategori</th>
                      <th className="pb-4 text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/30">Luas / Jumlah</th>
                      <th className="pb-4 text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/30">Hasil</th>
                      <th className="pb-4 text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/30">Lokasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0B281F]/5">
                    {item.details.map((detail, idx) => (
                      <tr key={idx} className="group transition-colors hover:bg-[#F6F8F7]">
                        <td className="py-6 font-bold text-[#0B281F]">{detail.subCategory}</td>
                        <td className="py-6 text-[15px] text-[#0B281F]/70">{detail.amount}</td>
                        <td className="py-6 text-[15px] text-[#0B281F]/70">{detail.production}</td>
                        <td className="py-6">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B281F]/5 px-3 py-1 text-[13px] font-medium text-[#0B281F]">
                            <MapPin size={14} />
                            {detail.location}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gallery */}
            <div className="rounded-[40px] border border-white bg-white p-8 shadow-xl md:p-12">
              <h2 className="mb-8 text-2xl font-bold text-[#0B281F]">Galeri Foto</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {item.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-video overflow-hidden rounded-3xl">
                    <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Investment Info */}
            <div className="rounded-[40px] bg-[#009966] p-10 text-white shadow-2xl">
              <TrendingUp size={32} className="mb-6 text-[#F0B100]" />
              <h3 className="mb-4 text-xl font-bold">Peluang Investasi</h3>
              <p className="mb-8 text-[15px] leading-relaxed text-white/80">
                {item.investmentInfo}
              </p>
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B281F] py-4 text-[14px] font-bold shadow-xl transition-all hover:-translate-y-1 hover:bg-black/20">
                Dapatkan Proposal
                <Download size={18} />
              </button>
            </div>

            {/* Access Info */}
            <div className="rounded-[40px] border border-white bg-white p-10 shadow-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B281F]/5 text-[#0B281F]">
                <Globe size={24} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0B281F]">Aksesibilitas</h3>
              <p className="text-[15px] leading-relaxed text-[#0B281F]/60">
                {item.accessInfo}
              </p>
            </div>

            {/* Support Info */}
            <div className="rounded-[40px] border border-white bg-white p-10 shadow-xl">
              <Info size={24} className="mb-6 text-[#F0B100]" />
              <h3 className="mb-4 text-xl font-bold text-[#0B281F]">Informasi Tambahan</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[14px] text-[#0B281F]/60">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#009966]" />
                  Dikelola oleh BUMDes
                </li>
                <li className="flex items-center gap-3 text-[14px] text-[#0B281F]/60">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#009966]" />
                  Potensi Sertifikasi Halal
                </li>
                <li className="flex items-center gap-3 text-[14px] text-[#0B281F]/60">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#009966]" />
                  Dukungan Dana Desa 2026
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
