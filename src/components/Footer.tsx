import Link from "next/link";
import {
  Camera,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  Shield,
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
  delayStart = 220,
}: {
  title: string;
  items: string[];
  delayStart?: number;
}) {
  return (
    <div
      className="hero-reveal flex flex-col gap-6"
      style={{ animationDelay: `${delayStart}ms` }}
    >
      <h4 className="font-timeless text-[20px] font-semibold text-white md:text-[22px]">
        {title}
      </h4>

      <ul className="space-y-3.5">
        {items.map((item, index) => (
          <li
            key={item}
            className="hero-reveal"
            style={{ animationDelay: `${delayStart + 60 + index * 55}ms` }}
          >
            <Link
              href="#"
              className="group inline-flex items-center gap-2.5 text-[14px] text-[#00D492]/72 transition-colors duration-300 hover:text-[#A4F4CF]"
            >
              <span className="h-1 w-1 rounded-full bg-[#009966]" />
              <span>{item}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-8 md:mt-12 w-full">
      <div className="border-t border-[#006045] bg-[#0B281F] text-[#F4F3EF]">
        <div className="mx-auto w-full max-w-7xl px-4 pb-5 pt-10 md:px-8 md:pt-12 lg:px-10">
          <div className="grid gap-8 border-b border-[#006045]/50 pb-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-12 lg:pb-10">
            <div className="hero-reveal flex flex-col gap-5 [animation-delay:120ms]">
              <div className="flex items-center gap-3">
                <img
                  src={footerLogo}
                  alt="Logo Desa Pameutingan"
                  className="h-10 w-9 object-contain"
                  loading="lazy"
                />
                <p className="font-[Georgia,serif] text-[30px] font-bold leading-none text-white md:text-[34px]">
                  Desa Pameutingan
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 shrink-0 text-[#00D492]" aria-hidden="true" />
                  <p className="max-w-65 text-[14px] leading-6 text-[#00D492]/80">
                    Jl. Raya Cipatujah No.16, RT.01/RW.01, Kp. Pameutingan,
                    Desa Pameutingan, Kec. Cipatujah, Kabupaten Tasikmalaya, Jawa Barat
                    46189
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-[#00D492]" aria-hidden="true" />
                  <a
                    href="tel:08138944493"
                    className="text-[14px] text-[#00D492]/80 transition-colors duration-300 hover:text-[#A4F4CF]"
                  >
                    08138944493
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-[#00D492]" aria-hidden="true" />
                  <a
                    href="mailto:kantor@desaasri.go.id"
                    className="text-[14px] text-[#00D492]/80 transition-colors duration-300 hover:text-[#A4F4CF]"
                  >
                    kantor@desapameutingan.go.id
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#006045]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#006045]/50"
                >
                  <Globe size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#006045]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#006045]/50"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#006045]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#006045]/50"
                >
                  <Camera size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <FooterList title="Profil Desa" items={profilDesaLinks} delayStart={200} />

            <FooterList title="Layanan Publik" items={layananPublikLinks} delayStart={280} />

            <div className="hero-reveal flex flex-col gap-4 [animation-delay:360ms]">
              <h4 className="font-timeless text-[20px] font-semibold text-white md:text-[22px]">
                Nomor Darurat
              </h4>

              <p className="max-w-60 text-[12px] leading-4 text-[#00D492]/60">
                Hubungi layanan darurat desa untuk situasi mendesak.
              </p>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  className="flex h-11.5 w-full max-w-65 items-center justify-between rounded-[10px] border border-[#9F0712]/50 bg-[#82181A]/40 px-4 text-left transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-[14px] font-medium text-[#FFC9C9]">
                    Ambulans Desa
                  </span>
                  <PhoneCall size={16} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="flex h-11.5 w-full max-w-65 items-center justify-between rounded-[10px] border border-[#007A55]/50 bg-[#006045]/40 px-4 text-left transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-[14px] font-medium text-[#A4F4CF]">
                    Posko Keamanan
                  </span>
                  <Shield size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="hero-reveal flex flex-col gap-2.5 border-t border-[#004F3B]/30 pt-3 text-[12px] leading-4 text-[#00D492]/40 [animation-delay:520ms] md:flex-row md:items-center md:justify-between">
            <p>© 2026 Pemerintah Desa Asri. Hak Cipta Dilindungi.</p>

            <div className="flex items-center gap-8">
              <Link
                href="#"
                className="transition-colors duration-300 hover:text-[#A4F4CF]/70"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="#"
                className="transition-colors duration-300 hover:text-[#A4F4CF]/70"
              >
                Syarat Penggunaan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}