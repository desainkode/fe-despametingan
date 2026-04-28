import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Target,
  Info,
  Play,
  Image as ImageIcon,
  Share2
} from "lucide-react";
import { mockGallery } from "@/features/galeri/config/mock-data";

export default async function GaleriDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = mockGallery.find((g) => g.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F6F8F7] pb-24">
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B281F] via-[#0B281F]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B281F]/60 via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <Link
              href="/galeri"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13px] font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <ArrowLeft size={16} />
              Kembali ke Galeri
            </Link>
            
            <div className="mb-4 inline-flex rounded-full bg-[#009966] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg">
              {item.category}
            </div>
            
            <h1 className="max-w-4xl font-[Georgia,serif] text-[40px] font-bold leading-tight text-white sm:text-[52px] lg:text-[64px]">
              {item.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Story Card */}
            <div className="rounded-[40px] border border-white bg-white p-8 shadow-xl md:p-12">
              <div className="mb-10 flex flex-wrap gap-6 border-b border-[#0B281F]/5 pb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B281F]/5 text-[#0B281F]">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/30">Tanggal</p>
                    <p className="text-[15px] font-bold text-[#0B281F]">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B281F]/5 text-[#0B281F]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/30">Lokasi</p>
                    <p className="text-[15px] font-bold text-[#0B281F]">{item.location}</p>
                  </div>
                </div>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-[#0B281F]">Tentang Kegiatan</h2>
              <div className="prose prose-lg max-w-none text-[17px] leading-relaxed text-[#0B281F]/70">
                <p>{item.longDesc}</p>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="rounded-[40px] border border-white bg-white p-8 shadow-xl md:p-12">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#0B281F]">Koleksi Foto</h2>
                <span className="text-[13px] font-bold text-[#0B281F]/30 uppercase tracking-widest">{item.photos.length} Momen</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {item.photos.map((img, idx) => (
                  <div key={idx} className="aspect-video overflow-hidden rounded-3xl">
                    <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Highlights Card */}
            <div className="rounded-[40px] bg-[#0B281F] p-10 text-white shadow-2xl">
              <h3 className="mb-8 text-xl font-bold">Informasi Detil</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#009966]">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-widest text-white/40 mb-1">Peserta</p>
                    <p className="text-[15px] font-medium leading-relaxed">{item.participants}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#F0B100]">
                    <Target size={20} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-widest text-white/40 mb-1">Tujuan</p>
                    <p className="text-[15px] font-medium leading-relaxed">{item.objective}</p>
                  </div>
                </div>
              </div>

              <button className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#009966] py-5 text-[14px] font-bold shadow-xl transition-all hover:-translate-y-1 hover:bg-[#00B373]">
                <Share2 size={18} />
                Bagikan Momen
              </button>
            </div>

            {/* Help Widget */}
            <div className="rounded-[40px] border border-white bg-white p-10 shadow-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B281F]/5 text-[#0B281F]">
                <Info size={24} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0B281F]">Bantuan & Layanan</h3>
              <p className="text-[14px] leading-relaxed text-[#0B281F]/60">
                Butuh dokumentasi kegiatan ini dalam resolusi tinggi untuk keperluan publikasi? Hubungi sekretariat desa.
              </p>
              <Link href="/kontak" className="mt-6 inline-block text-[14px] font-bold text-[#009966] hover:underline">
                Hubungi Kami &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
