import { NextResponse } from 'next/server'

const Technologies = [
    {
        base: "devicon:angular",
        styling: "devicon:tailwindcss",
    },
    {
        base: "devicon:html5",
        styling: "devicon:bootstrap",
    },
    {
        base: "devicon:react",
        styling: "devicon:materialui",
    },
    {
        base: "devicon:html5",
        styling: "devicon:tailwindcss",
    },
    {
        base: "devicon:react",
        styling: "devicon:tailwindcss",
    },
    {
        base: "devicon:nextjs",
        styling: "devicon:materialui",
    },
    {
        base: "devicon:react",
        styling: "devicon:bootstrap",
    },
    {
        base: "devicon:nextjs",
        styling: "devicon:tailwindcss",
    },
    {
        base: "devicon:angular",
        styling: "devicon:materialui",
    },
    {
        base: "devicon:nextjs",
        styling: "devicon:bootstrap",
    },
    {
        base: "devicon:angular",
        styling: "devicon:bootstrap",
    },
];

const DocText = [
    {
        icon: "lucide:sprout",
        title: "Pertanian Unggul",
        text: "Lahan produktif mendukung hasil tani, hortikultura, dan penguatan ketahanan pangan warga.",
    },
    {
        icon: "lucide:store",
        title: "UMKM & Produk Lokal",
        text: "Kerajinan, olahan pangan, dan usaha rumahan tumbuh sebagai penggerak ekonomi desa.",
    },
    {
        icon: "lucide:mountain",
        title: "Alam & Wisata Local",
        text: "Pesona alam dan udara sejuk pegunungan yang menjadi daya tarik utama Desa Pameutingan.",
    },
];

const Portfolio = [
    {
        image: "/images/potensi/potensi-1.jpg",
    },
    {
        image: "/images/potensi/potensi-2.jpg",
    },
];

const MonthlyPlans = [
    {
        type: "Pendapatan Desa",
        price: "3.542.873.000",
        text: "Total pendapatan desa dari berbagai sumber (DDS, ADD, PBP, DLL).",
        benefits: [
            "Dana Desa (DDS)",
            "Alokasi Dana Desa (ADD)",
            "Bagi Hasil Pajak (PBP)",
            "Pendapatan Asli Desa (PADes)",
        ],
    },
    {
        type: "Belanja Desa",
        price: "3.124.500.000",
        text: "Total realisasi belanja desa untuk pembangunan dan operasional.",
        benefits: [
            "Penyelenggaraan Pemerintahan",
            "Pelaksanaan Pembangunan",
            "Pembinaan Kemasyarakatan",
            "Pemberdayaan Masyarakat",
        ],
    },
    {
        type: "Surplus / Sisa",
        price: "418.373.000",
        text: "Sisa Lebih Perhitungan Anggaran (SiLPA) tahun berjalan.",
        benefits: [
            "Efisiensi Anggaran",
            "Cadangan Pembangunan",
            "Dana Darurat",
        ],
    },
];

const yearlyPlans = [
    {
        type: "Pendapatan Desa",
        price: "3.421.150.000",
        text: "Total pendapatan desa tahun 2025.",
        benefits: [
            "Dana Desa (DDS)",
            "Alokasi Dana Desa (ADD)",
            "Bagi Hasil Pajak (PBP)",
            "Pendapatan Asli Desa (PADes)",
        ],
    },
    {
        type: "Belanja Desa",
        price: "3.052.400.000",
        text: "Total realisasi belanja desa tahun 2025.",
        benefits: [
            "Penyelenggaraan Pemerintahan",
            "Pelaksanaan Pembangunan",
            "Pembinaan Kemasyarakatan",
            "Pemberdayaan Masyarakat",
        ],
    },
    {
        type: "Surplus / Sisa",
        price: "368.750.000",
        text: "SiLPA tahun 2025.",
        benefits: [
            "Efisiensi Anggaran",
            "Cadangan Pembangunan",
            "Dana Darurat",
        ],
    },
];

const Questions = [
    {
        question: "Bagaimana cara mengurus KTP/KK di Desa Pameutingan?",
        answer:
            "Warga dapat datang langsung ke Kantor Desa dengan membawa surat pengantar dari RT/RW serta dokumen pendukung. Petugas pelayanan kami siap membantu proses administrasi Anda pada jam kerja.",
    },
    {
        question: "Apa syarat untuk mendapatkan surat keterangan tidak mampu (SKTM)?",
        answer:
            "Syarat utamanya adalah membawa fotokopi KK, KTP, dan surat pernyataan penghasilan yang diketahui oleh Ketua RT dan RW setempat sebagai dasar verifikasi data kependudukan.",
    },
    {
        question: "Di mana lokasi kantor Desa Pameutingan?",
        answer:
            "Kantor Desa Pameutingan berlokasi di pusat administrasi desa yang strategis. Anda dapat melihat detail peta lokasi dan alamat lengkap pada bagian bawah halaman kontak kami.",
    },
    {
        question: "Bagaimana cara menyampaikan keluhan atau aspirasi warga?",
        answer:
            "Aspirasi dapat disampaikan melalui kotak saran di kantor desa, pesan WhatsApp resmi desa di halaman kontak, atau melalui forum musyawarah pembangunan desa (Musrenbangdes).",
    },
    {
        question: "Apakah data kependudukan di website ini selalu diperbarui?",
        answer:
            "Benar, kami berkomitmen untuk memperbarui data statistik kependudukan dan laporan anggaran secara berkala (per semester) guna menjaga transparansi informasi publik.",
    },
    {
        question: "Bagaimana cara mendaftarkan UMKM lokal untuk dipromosikan?",
        answer:
            "Pelaku usaha di Desa Pameutingan dapat menghubungi Kaur Ekonomi dan Pembangunan di Kantor Desa dengan membawa contoh produk atau profil usaha untuk didata ke dalam database potensi desa.",
    },
];

const Testimonial = [
    {
        review:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece",
        name: "Merky Lester",
        post: "Manager",
        Image: "/images/profile.png",
    },
    {
        review:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece",
        name: "Merky Lester",
        post: "Manager",
        Image: "/images/profile.png",
    },
    {
        review:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece",
        name: "Merky Lester",
        post: "Manager",
        Image: "/images/profile.png",
    },
];

const partners = [
    {
        image: "/images/info/amazon.svg",
    },
    {
        image: "/images/info/microsoft.svg",
    },
    {
        image: "/images/info/google.svg",
    },
    {
        image: "/images/info/unique.svg",
    },
];

export const GET = () => {
    return NextResponse.json({
        Technologies,
        DocText,
        Portfolio,
        MonthlyPlans,
        yearlyPlans,
        Questions,
        Testimonial,
        partners,
    })
}