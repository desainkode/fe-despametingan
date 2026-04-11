import { SectionHeader, MiniMetric, sectionCardClass } from "./section-ui";

const idmIndicators = [
  { label: "Status Desa", value: "Maju" },
  { label: "Skor IDM", value: "0,792" },
  { label: "Ruang Perbaikan", value: "Layanan" },
];

export function IdmSection() {
  return (
    <div className={sectionCardClass + " bg-white"}>
      <SectionHeader
        title="Indeks Desa Membangun"
        description="Ringkasan status perkembangan desa berdasarkan skor IDM, kategori kemajuan, dan ruang perbaikan utama yang perlu ditindaklanjuti."
      />

      <div className="grid gap-3 md:grid-cols-3">
        {idmIndicators.map((item) => (
          <MiniMetric key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}
