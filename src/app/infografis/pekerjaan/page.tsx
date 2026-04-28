import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react";

type JobItem = {
  kode: string;
  nama: string;
  jumlah: string;
  persentase: number;
};

const pekerjaanPertanian: JobItem[] = [
  { kode: "01", nama: "Tidak/Belum Bekerja", jumlah: "512", persentase: 14.5 },
  { kode: "02", nama: "Petani", jumlah: "448", persentase: 12.7 },
  { kode: "03", nama: "Buruh Tani", jumlah: "376", persentase: 10.6 },
  { kode: "04", nama: "Peternak", jumlah: "218", persentase: 6.2 },
  { kode: "05", nama: "Pedagang Hasil Tani", jumlah: "164", persentase: 4.6 },
  { kode: "06", nama: "Pekebun", jumlah: "233", persentase: 6.6 },
  { kode: "07", nama: "Nelayan", jumlah: "79", persentase: 2.2 },
  { kode: "08", nama: "Buruh Harian Lepas", jumlah: "286", persentase: 8.1 },
  { kode: "09", nama: "Pengrajin", jumlah: "132", persentase: 3.7 },
  { kode: "10", nama: "Wiraswasta Mikro", jumlah: "194", persentase: 5.5 },
  { kode: "11", nama: "Sopir/Angkutan", jumlah: "107", persentase: 3.0 },
  { kode: "12", nama: "Pekerja Musiman", jumlah: "141", persentase: 4.0 },
];

const pekerjaanProfesional: JobItem[] = [
  { kode: "01", nama: "Karyawan Swasta", jumlah: "302", persentase: 8.5 },
  { kode: "02", nama: "PNS", jumlah: "126", persentase: 3.6 },
  { kode: "03", nama: "TNI/Polri", jumlah: "64", persentase: 1.8 },
  { kode: "04", nama: "Guru/Dosen", jumlah: "98", persentase: 2.8 },
  { kode: "05", nama: "Tenaga Kesehatan", jumlah: "72", persentase: 2.0 },
  { kode: "06", nama: "Perangkat Desa", jumlah: "41", persentase: 1.2 },
  { kode: "07", nama: "Wirausaha Menengah", jumlah: "96", persentase: 2.7 },
  { kode: "08", nama: "Teknisi", jumlah: "87", persentase: 2.5 },
  { kode: "09", nama: "Jasa Konstruksi", jumlah: "176", persentase: 5.0 },
  { kode: "10", nama: "Admin Perkantoran", jumlah: "83", persentase: 2.3 },
  { kode: "11", nama: "Pelaku UMKM Digital", jumlah: "59", persentase: 1.7 },
  { kode: "12", nama: "Lainnya Jasa Profesional", jumlah: "156", persentase: 4.4 },
];

export const metadata: Metadata = {
  title: "Detail Pekerjaan | Infografis Desa Pameutingan",
  description: "Rangkuman lengkap data pekerjaan penduduk Desa Pameutingan.",
};

function SummaryTile({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-[20px] border border-[#0B281F]/10 bg-white p-5 shadow-[0_10px_24px_rgba(11,40,31,0.05)]">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#0B281F]/60">{label}</p>
      <p className="mt-2 font-[Georgia,serif] text-[32px] font-bold leading-none text-[#0B281F]">{value}</p>
      <p className="mt-2 text-[12px] leading-5 text-[#0B281F]/70">{note}</p>
    </article>
  );
}

function JobCard({
  item,
  accent,
}: {
  item: JobItem;
  accent: "gold" | "green";
}) {
  const glowClass = accent === "gold" ? "from-[#F0B100] to-[#D4940A]" : "from-[#009966] to-[#005239]";

  return (
    <article className="relative overflow-hidden rounded-[20px] border border-white/12 bg-white/12 p-5 shadow-[0_12px_28px_rgba(0,0,0,0.10)] backdrop-blur-sm sm:p-6">
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r ${glowClass}`} />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-black text-white shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
            <span className="text-[17px] font-bold" style={{ fontFamily: "var(--font-upakarti)" }}>
              {item.kode}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="font-[Georgia,serif] text-[17px] font-bold leading-[1.15] text-white sm:text-[18px]">
              {item.nama}
            </h3>
            <p className="mt-1 text-[12px] leading-5 text-white/75">
              Ringkasan bidang pekerjaan penduduk desa.
            </p>
          </div>
        </div>

        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-[#0B281F] px-3 py-1.5 text-[11px] font-bold text-white/92">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00E0A1]" />
          {item.persentase}%
        </div>
      </div>

      <div className="relative z-10 mt-4 border-t border-white/10 pt-3.5">
        <p className="text-[11px] uppercase tracking-[0.14em] text-white/62">Jumlah penduduk</p>
        <p className="mt-1 text-[30px] font-bold leading-none text-white" style={{ fontFamily: "var(--font-upakarti)" }}>
          {item.jumlah}
        </p>
      </div>
    </article>
  );
}

function JobSection({
  id,
  title,
  description,
  items,
  accent,
  active,
}: {
  id: string;
  title: string;
  description: string;
  items: JobItem[];
  accent: "gold" | "green";
  active: boolean;
}) {
  const wrapperClass = accent === "gold"
    ? "from-[#F0B100] to-[#D4940A]"
    : "from-[#009966] to-[#005239]";

  return (
    <section id={id} className="scroll-mt-8">
      <div className={`relative overflow-hidden rounded-[24px] bg-linear-to-br ${wrapperClass} p-6 sm:p-8 md:p-10 ${active ? "ring-2 ring-[#0B281F]/14" : ""}`}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

        <div className="relative z-10">
          <div className="mb-7 flex flex-col gap-4 border-b border-white/20 pb-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="font-[Georgia,serif] text-[28px] font-bold leading-[1.08] text-white sm:text-[34px]">
                {title}
              </h2>
              <p className="mt-3 text-[13px] leading-6 text-white/82 sm:text-[14px] sm:leading-7">
                {description}
              </p>
            </div>

            <div className="inline-flex self-start rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[12px] font-bold text-white">
              {items.length} bidang pekerjaan
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <JobCard key={`${id}-${item.kode}-${item.nama}`} item={item} accent={accent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function PekerjaanPage({
  searchParams,
}: {
  searchParams?: Promise<{ section?: string }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const activeSection = resolvedSearchParams.section === "profesional" ? "profesional" : "pertanian";

  const sections = activeSection === "pertanian"
    ? [
      {
        id: "pertanian",
        title: "Jenis Pekerjaan Pertanian",
        description:
          "Kategori ini memuat pekerjaan berbasis lahan, hasil tani, peternakan, serta aktivitas ekonomi lokal yang paling banyak ditemui di desa.",
        items: pekerjaanPertanian,
        accent: "gold" as const,
      },
      {
        id: "profesional",
        title: "Jenis Pekerjaan Profesional",
        description:
          "Kategori ini memuat pekerjaan formal dan profesional seperti sektor jasa, pemerintahan, pendidikan, kesehatan, dan usaha menengah.",
        items: pekerjaanProfesional,
        accent: "green" as const,
      },
    ]
    : [
      {
        id: "profesional",
        title: "Jenis Pekerjaan Profesional",
        description:
          "Kategori ini memuat pekerjaan formal dan profesional seperti sektor jasa, pemerintahan, pendidikan, kesehatan, dan usaha menengah.",
        items: pekerjaanProfesional,
        accent: "green" as const,
      },
      {
        id: "pertanian",
        title: "Jenis Pekerjaan Pertanian",
        description:
          "Kategori ini memuat pekerjaan berbasis lahan, hasil tani, peternakan, serta aktivitas ekonomi lokal yang paling banyak ditemui di desa.",
        items: pekerjaanPertanian,
        accent: "gold" as const,
      },
    ];

  return (
    <main className="min-h-screen bg-[#F6F8F7] pb-12">
      {/* Full Width Hero Section */}
      <section className="relative overflow-hidden bg-[#0B281F] pt-28 pb-16 text-white shadow-2xl sm:pt-32 md:pt-36 lg:pt-40 lg:pb-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#00E0A1]/12 blur-[100px]" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-[#F0B100]/10 blur-[110px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00E0A1] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E0A1] animate-pulse" />
              Detail Infografis Desa
            </div>

            <h1 className="max-w-4xl font-[Georgia,serif] text-[40px] font-bold leading-[1.05] tracking-tight sm:text-[52px] lg:text-[64px]">
              Eksplorasi <span className="text-[#00E0A1]">Jenis Pekerjaan</span>
              <br />
              Warga Pameutingan
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-[17px]">
              Data komprehensif mengenai sebaran mata pencaharian penduduk yang mencerminkan dinamika ekonomi dan potensi sumber daya manusia di desa kami.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/infografis"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#0B281F]/10 bg-white px-4 py-2 text-[13px] font-semibold text-[#0B281F] shadow-[0_10px_24px_rgba(11,40,31,0.08)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            Kembali ke Infografis
          </Link>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#0B281F]/10 bg-white px-4 py-2 text-[12px] font-semibold text-[#0B281F]/70 shadow-[0_10px_24px_rgba(11,40,31,0.06)]">
            <Briefcase size={14} />
            Halaman detail pekerjaan
          </div>
        </div>


        <section className="rounded-[30px] bg-white px-5 py-6 shadow-[0_18px_50px_rgba(11,40,31,0.08)] sm:px-6 md:px-7 md:py-7 lg:px-8 lg:py-8">
          <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
            <h2 className="font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
              Ringkasan
              <br />
              Statistik
            </h2>

            <p className="max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
              Menampilkan data View All pekerjaan dengan cakupan lebih lengkap agar mudah dibaca, lebih rapi, dan konsisten dengan desain infografis lainnya.
            </p>

            <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white">
              <Briefcase size={22} strokeWidth={2.2} />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryTile
              label="Total Bidang"
              value={`${pekerjaanPertanian.length + pekerjaanProfesional.length}`}
              note="Jumlah keseluruhan bidang pekerjaan yang ditampilkan di halaman detail."
            />
            <SummaryTile
              label="Pertanian"
              value={`${pekerjaanPertanian.length}`}
              note="Bidang pekerjaan berbasis sektor pertanian dan aktivitas lokal."
            />
            <SummaryTile
              label="Profesional"
              value={`${pekerjaanProfesional.length}`}
              note="Bidang pekerjaan formal dan profesional penduduk desa."
            />
            <SummaryTile
              label="Fokus Aktif"
              value={activeSection === "pertanian" ? "Pertanian" : "Profesional"}
              note="Section ini ditampilkan lebih dulu sesuai tombol View All yang dipilih."
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="#pertanian"
              className={`inline-flex items-center rounded-full border px-4 py-2 text-[12px] font-bold transition-all duration-300 hover:-translate-y-0.5 ${activeSection === "pertanian" ? "border-[#F0B100]/20 bg-[#FFF7DD] text-[#8A6200]" : "border-[#0B281F]/10 bg-white text-[#0B281F]/75"}`}
            >
              Pertanian
            </a>
            <a
              href="#profesional"
              className={`inline-flex items-center rounded-full border px-4 py-2 text-[12px] font-bold transition-all duration-300 hover:-translate-y-0.5 ${activeSection === "profesional" ? "border-[#009966]/20 bg-[#EDF9F4] text-[#005239]" : "border-[#0B281F]/10 bg-white text-[#0B281F]/75"}`}
            >
              Profesional
            </a>
          </div>
        </section>

        <div className="space-y-6">
          {sections.map((section) => (
            <JobSection
              key={section.id}
              id={section.id}
              title={section.title}
              description={section.description}
              items={section.items}
              accent={section.accent}
              active={activeSection === section.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
