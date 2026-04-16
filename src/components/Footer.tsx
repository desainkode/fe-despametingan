import Link from "next/link";

const footerLogo =
  "https://www.figma.com/api/mcp/asset/27d73b78-2be8-4fb9-8da3-0a5a9d1bab1f";
const iconMapPin =
  "https://www.figma.com/api/mcp/asset/55c452a2-66b8-4b09-8e4c-e8b726d6bf8f";
const iconPhone =
  "https://www.figma.com/api/mcp/asset/b0ddbade-026b-489b-8482-f507e5a5c1c3";
const iconMail =
  "https://www.figma.com/api/mcp/asset/d6028988-159a-4aa2-b955-a6085d2c8482";
const iconFacebook =
  "https://www.figma.com/api/mcp/asset/ea70c302-4494-4f7b-975c-4faa9ced6ac8";
const iconTwitter =
  "https://www.figma.com/api/mcp/asset/c3a3a68b-9412-4979-b81f-9b36491f5fd7";
const iconInstagram =
  "https://www.figma.com/api/mcp/asset/d9451fda-347d-4f2a-bfb3-0ad2ed4aa20d";
const iconCallEmergency =
  "https://www.figma.com/api/mcp/asset/bb61bfac-019c-4c5d-a5d1-aae4a35a11c7";
const iconCallSecurity =
  "https://www.figma.com/api/mcp/asset/40920825-2833-400c-9fe0-0e737950dc0e";

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
      <h4 className="text-[20px] font-semibold text-white md:text-[22px]" style={{ fontFamily: 'var(--font-heading)' }}>
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
    <footer className="mt-8 px-4 md:mt-12 md:px-10 lg:px-12">
      <div className="overflow-hidden rounded-t-[48px] border border-[#006045] border-b-0 bg-[#0B281F] text-[#F4F3EF]">
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
                <p className="text-[30px] font-bold leading-none text-white md:text-[34px]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Desa Pameutingan
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <img
                    src={iconMapPin}
                    alt="Alamat"
                    className="mt-1 h-5 w-5 shrink-0"
                    loading="lazy"
                  />
                  <p className="max-w-65 text-[14px] leading-6 text-[#00D492]/80">
                    Jl. Raya Cipatujah No.16, RT.01/RW.01, Kp. Pameutingan,
                    Desa Pameutingan, Kec. Cipatujah, Kabupaten Tasikmalaya, Jawa Barat
                    46189
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={iconPhone}
                    alt="Telepon"
                    className="h-4 w-4 shrink-0"
                    loading="lazy"
                  />
                  <a
                    href="tel:08138944493"
                    className="text-[14px] text-[#00D492]/80 transition-colors duration-300 hover:text-[#A4F4CF]"
                  >
                    08138944493
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={iconMail}
                    alt="Email"
                    className="h-4 w-4 shrink-0"
                    loading="lazy"
                  />
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
                  <img
                    src={iconFacebook}
                    alt=""
                    className="h-4.5 w-4.5"
                    loading="lazy"
                  />
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#006045]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#006045]/50"
                >
                  <img
                    src={iconTwitter}
                    alt=""
                    className="h-4.5 w-4.5"
                    loading="lazy"
                  />
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#006045]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#006045]/50"
                >
                  <img
                    src={iconInstagram}
                    alt=""
                    className="h-4.5 w-4.5"
                    loading="lazy"
                  />
                </Link>
              </div>
            </div>

            <FooterList title="Profil Desa" items={profilDesaLinks} delayStart={200} />

            <FooterList title="Layanan Publik" items={layananPublikLinks} delayStart={280} />

            <div className="hero-reveal flex flex-col gap-4 [animation-delay:360ms]">
              <h4 className="text-[20px] font-semibold text-white md:text-[22px]" style={{ fontFamily: 'var(--font-heading)' }}>
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
                  <img
                    src={iconCallEmergency}
                    alt="Telepon Ambulans"
                    className="h-4 w-4"
                    loading="lazy"
                  />
                </button>

                <button
                  type="button"
                  className="flex h-11.5 w-full max-w-65 items-center justify-between rounded-[10px] border border-[#007A55]/50 bg-[#006045]/40 px-4 text-left transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-[14px] font-medium text-[#A4F4CF]">
                    Posko Keamanan
                  </span>
                  <img
                    src={iconCallSecurity}
                    alt="Telepon Posko"
                    className="h-4 w-4"
                    loading="lazy"
                  />
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