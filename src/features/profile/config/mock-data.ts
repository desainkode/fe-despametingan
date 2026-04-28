import { VillageProfile } from "../types";

export const mockProfile: VillageProfile = {
  name: "Desa Pameutingan",
  slogan: "Pameutingan Bangkit, Mandiri, dan Berbudaya",
  establishedYear: "1901",
  vision: "Terwujudnya Desa Pameutingan yang mandiri, sejahtera, dan religius melalui tata kelola pemerintahan yang transparan dan inovasi ekonomi berbasis potensi lokal pada tahun 2030.",
  mission: [
    "Meningkatkan kualitas pelayanan publik melalui sistem birokrasi yang cepat, tepat, dan transparan.",
    "Mengoptimalkan potensi sumber daya alam dan UMKM untuk meningkatkan taraf ekonomi masyarakat.",
    "Membangun infrastruktur desa yang merata, berkualitas, dan berkelanjutan.",
    "Membina kerukunan umat beragama dan melestarikan nilai-nilai budaya lokal.",
    "Meningkatkan kualitas pendidikan dan kesehatan masyarakat melalui program pemberdayaan."
  ],
  history: "Desa Pameutingan berdiri pada awal abad ke-20, bermula dari pemukiman kecil di lereng bukit yang subur. Nama 'Pameutingan' berasal dari kata dalam bahasa lokal yang berarti 'tempat bermalam' atau 'persinggahan', karena wilayah ini dahulu merupakan jalur utama perlintasan pedagang antar wilayah yang sering singgah untuk beristirahat. Seiring berjalannya waktu, wilayah ini berkembang menjadi pusat pertanian yang produktif dan secara resmi diakui sebagai desa mandiri pada tahun 1901.",
  governance: [
    { name: "H. Ahmad Sodikun", position: "Kepala Desa", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=kades" },
    { name: "Siti Rahmawati, S.E.", position: "Sekretaris Desa", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=sekdes" },
    { name: "Mulyadi", position: "Kaur Keuangan", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=kaur1" },
    { name: "Indra Gunawan", position: "Kaur Perencanaan", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=kaur2" },
    { name: "Lani Marlina", position: "Kasi Pelayanan", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=kasi1" },
    { name: "Dedi Suhendar", position: "Ketua BPD", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=bpd" },
  ],
  facilities: [
    { name: "SDN Pameutingan 01", type: "Pendidikan", location: "Dusun Darmacaang", description: "Sekolah dasar negeri dengan akreditasi A." },
    { name: "Puskesmas Pembantu", type: "Kesehatan", location: "Pusat Desa", description: "Layanan kesehatan tingkat pertama untuk warga." },
    { name: "Masjid Agung Jami", type: "Religi", location: "Dusun Mekarsari", description: "Masjid utama desa untuk kegiatan keagamaan." },
    { name: "Balai Desa Pameutingan", type: "Pemerintahan", location: "Jl. Raya Desa No. 1", description: "Pusat administrasi dan pertemuan warga." },
  ]
};
