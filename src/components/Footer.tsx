import Link from "next/link";
import {
  Globe,
  MessageCircle,
  Camera,
  Mail,
  MapPin,
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
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-[18px] font-semibold text-white" style={{ fontFamily: 'var(--font-timeless)' }}>
        {title}
      </h4>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="group inline-flex items-center gap-2.5 text-[14px] text-[#00D492]/70 transition-colors duration-300 hover:text-[#A4F4CF]"
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
    <footer className="w-full bg-white">
      <div className="rounded-t-[60px] bg-[#0B281F] text-[#F4F3EF] relative overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 pb-6 pt-12 md:px-10 md:pt-16 lg:px-12">
          <div className="grid gap-8 pb-10 md:grid-cols-2 lg:grid-cols-[1fr_0.7fr_0.7fr_1fr] lg:gap-10">
            {/* Column 1: Info */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <img
                  src={footerLogo}
                  alt="Logo Desa"
                  className="h-10 w-8 object-contain"
                />
                <p className="text-2xl font-bold leading-tight text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  Desa Pameutingan
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 shrink-0 text-[#00D492]" />
                  <p className="max-w-[260px] text-[13px] leading-5 text-[#00D492]/80">
                    Jl. Raya Cipatujah No.16, RT.01/RW.01, Kp. Ciceuri, Darawati, Kec. Cipatujah, Kabupaten Tasikmalaya, Jawa Barat 46189
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-[#00D492]" />
                  <span className="text-[13px] text-[#00D492]/80">08138944493</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-[#00D492]" />
                  <span className="text-[13px] text-[#00D492]/80">kantor@desapameutingan.go.id</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-1">
                {[Globe, MessageCircle, Camera].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#A4F4CF] transition-all duration-300 hover:bg-[#00D492] hover:text-[#0B281F]"
                  >
                    <Icon size={16} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Profil */}
            <FooterList title="Profil Desa" items={profilDesaLinks} />

            {/* Column 3: Layanan */}
            <FooterList title="Layanan Publik" items={layananPublikLinks} />

            {/* Column 4: Darurat */}
            <div className="flex flex-col gap-5">
              <h4 className="text-base font-semibold text-white" style={{ fontFamily: 'var(--font-timeless)' }}>
                Nomor Darurat
              </h4>

              <p className="max-w-[240px] text-[12px] leading-relaxed text-[#00D492]/60">
                Hubungi layanan darurat desa untuk situasi mendesak.
              </p>

              <div className="space-y-3 pt-1">
                <button className="flex h-11 w-full max-w-[260px] items-center justify-between rounded-lg bg-[#82181A]/20 border border-[#9F0712]/20 px-4 text-left transition-all duration-300 hover:bg-[#82181A]/40 group">
                  <span className="text-[14px] font-bold text-[#FFC9C9]" style={{ fontFamily: 'var(--font-timeless)' }}>Ambulans Desa</span>
                  <PhoneCall size={16} className="text-[#FFC9C9]" />
                </button>

                <button className="flex h-11 w-full max-w-[260px] items-center justify-between rounded-lg bg-[#004F3B]/20 border border-[#007A55]/20 px-4 text-left transition-all duration-300 hover:bg-[#004F3B]/40 group">
                  <span className="text-[14px] font-bold text-[#A4F4CF]" style={{ fontFamily: 'var(--font-timeless)' }}>Posko Keamanan</span>
                  <Shield size={16} className="text-[#A4F4CF]" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col gap-4 border-t border-white/5 pt-8 text-[12px] text-[#00D492]/40 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Pemerintah Desa Asri. Hak Cipta Dilindungi.</p>

            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-[#A4F4CF] transition-colors">Kebijakan Privasi</Link>
              <Link href="#" className="hover:text-[#A4F4CF] transition-colors">Syarat Penggunaan</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
