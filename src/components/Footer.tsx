"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Globe,
  MessageCircle,
  Camera,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  Shield,
  ChevronDown,
} from "lucide-react";

const footerLogo = "/img/image.png";

const profilDesaLinks = [
  "Sejarah",
  "Visi & Misi",
  "Struktur Organisasi",
  "Lembaga Desa",
  "Peta Wilayah",
];

const layananPublikLinks = [
  "Administrasi Kependudukan",
  "Surat Keterangan",
  "Lapor Desa",
  "Transparansi Anggaran",
  "Jadwal Kegiatan",
];

function FooterList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col border-b border-white/5 pb-4 md:border-none md:pb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-left md:pointer-events-none md:py-0 md:mb-6"
      >
        <h4 className="text-[17px] font-bold tracking-wide text-white md:text-[18px]" style={{ fontFamily: 'var(--font-sans)' }}>
          {title}
        </h4>
        <ChevronDown 
          size={20} 
          className={`text-[#00D492] transition-transform duration-300 md:hidden ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <div className={`grid transition-all duration-300 ease-in-out md:block ${isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 md:opacity-100"}`}>
        <ul className="overflow-hidden space-y-3.5">
          {items.map((item) => (
            <li key={item}>
              <Link
                href="#"
                className="group inline-flex items-center gap-3 text-[14px] text-[#D0FAE5]/60 transition-all duration-300 hover:translate-x-1 hover:text-white"
              >
                <span className="h-1 w-1 rounded-full bg-[#00D492]/40 transition-all group-hover:bg-[#00D492] group-hover:scale-125" />
                <span>{item}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="relative overflow-hidden rounded-t-[40px] bg-[#052119] text-[#F4F3EF] md:rounded-t-[80px]">
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[#00D492]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-emerald-900/10 blur-[100px]" />

        <div className="mx-auto w-full max-w-7xl px-6 pb-8 pt-16 md:px-10 md:pt-20 lg:px-12">
          <div className="grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr] lg:gap-12">
            {/* Column 1: Info */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 p-2 shadow-inner backdrop-blur-sm">
                  <img
                    src={footerLogo}
                    alt="Logo Desa"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-black leading-none text-white tracking-tight md:text-2xl" style={{ fontFamily: 'var(--font-sans)' }}>
                    Desa Pameutingan
                  </p>
                  <span className="mt-1 text-[0.65rem] font-bold tracking-[0.15em] text-[#00D492]/60 uppercase">
                    KAB. TASIKMALAYA
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-950/50 border border-emerald-900/30">
                    <MapPin size={14} className="text-[#00D492]" />
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-[#D0FAE5]/70 lg:max-w-[300px]">
                    Jl. Raya Cipatujah No.16, Kp. Ciceuri, Darawati, Kec. Cipatujah, Kabupaten Tasikmalaya, Jawa Barat 46189
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-950/50 border border-emerald-900/30">
                    <Phone size={14} className="text-[#00D492]" />
                  </div>
                  <span className="text-[13.5px] text-[#D0FAE5]/70">0813-8944-4933</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-950/50 border border-emerald-900/30">
                    <Mail size={14} className="text-[#00D492]" />
                  </div>
                  <span className="text-[13.5px] text-[#D0FAE5]/70">kontak@desapameutingan.go.id</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {[Globe, MessageCircle, Camera].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#00D492] transition-all duration-300 hover:-translate-y-1 hover:bg-[#00D492] hover:text-[#052119] hover:shadow-[0_0_20px_rgba(0,212,146,0.3)]"
                  >
                    <Icon size={18} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Profil */}
            <FooterList title="Profil Desa" items={profilDesaLinks} />

            {/* Column 3: Layanan */}
            <FooterList title="Layanan Publik" items={layananPublikLinks} />

            {/* Column 4: Darurat */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[17px] font-bold tracking-wide text-white md:text-[18px]" style={{ fontFamily: 'var(--font-sans)' }}>
                Layanan Darurat
              </h4>

              <p className="text-[13px] leading-relaxed text-[#D0FAE5]/50">
                Layanan bantuan cepat 24 jam untuk warga Desa Pameutingan.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <button className="group relative flex h-14 items-center justify-between overflow-hidden rounded-2xl bg-red-950/20 border border-red-900/30 px-5 transition-all duration-300 hover:bg-red-900/30 active:scale-[0.98]">
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400/60">Darurat</span>
                    <span className="text-[14px] font-bold text-red-200">Ambulans Desa</span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-400 transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white">
                    <PhoneCall size={16} />
                  </div>
                </button>

                <button className="group relative flex h-14 items-center justify-between overflow-hidden rounded-2xl bg-emerald-950/20 border border-emerald-900/30 px-5 transition-all duration-300 hover:bg-emerald-900/30 active:scale-[0.98]">
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/60">Keamanan</span>
                    <span className="text-[14px] font-bold text-emerald-200">Posko Mandiri</span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white">
                    <Shield size={16} />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 flex flex-col gap-6 border-t border-white/5 pt-10 text-[12.5px] md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1.5 opacity-40">
              <p>© 2026 Pemerintah Desa Pameutingan.</p>
              <p className="text-[11px] uppercase tracking-widest font-medium">Built for Excellence • Cipatujah, Tasikmalaya</p>
            </div>

            <div className="flex items-center gap-8 font-medium">
              <Link href="#" className="text-[#D0FAE5]/40 transition-colors hover:text-[#00D492]">Kebijakan Privasi</Link>
              <Link href="#" className="text-[#D0FAE5]/40 transition-colors hover:text-[#00D492]">Syarat & Ketentuan</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
