import { NextResponse } from 'next/server'

const ServicesData = [
    {
        icon: "solar:documents-linear",
        title: "Administrasi Kependudukan",
        slug: "administrasi",
        image: "/images/hero/hero-desa.png",
        description:
            "Layanan pengurusan dokumen penting seperti KTP, Kartu Keluarga, Akta Kelahiran, dan Surat Keterangan lainnya.",
        detail:
            "Pemerintah Desa Pameutingan berkomitmen memberikan kemudahan dalam pengurusan dokumen kependudukan. Warga dapat mengajukan permohonan berbagai surat keterangan secara langsung maupun melalui portal mandiri untuk mempercepat proses birokrasi.",
        features: [
            {
                title: "Pengurusan KTP & KK",
                description: "Pendampingan pembuatan dan pembaruan data identitas warga.",
            },
            {
                title: "Akta Kelahiran & Kematian",
                description: "Layanan pencatatan sipil untuk warga desa.",
            },
            {
                title: "Surat Keterangan Desa",
                description: "Pembuatan surat pengantar dan keterangan untuk berbagai keperluan.",
            },
        ],
    },
    {
        icon: "solar:health-linear",
        title: "Layanan Kesehatan",
        slug: "kesehatan",
        image: "/images/hero/hero-desa.png",
        description:
            "Program kesehatan masyarakat meliputi Posyandu, pelayanan Ambulans Desa, dan pendampingan bidan desa.",
        detail:
            "Kesehatan warga adalah prioritas kami. Melalui program Posyandu rutin dan ketersediaan Ambulans Desa 24 jam, kami berupaya memastikan setiap warga mendapatkan akses layanan kesehatan dasar yang layak dan cepat.",
        features: [
            {
                title: "Posyandu Rutin",
                description: "Pemeriksaan kesehatan ibu, anak, dan lansia secara berkala.",
            },
            {
                title: "Ambulans Desa 24 Jam",
                description: "Layanan transportasi darurat untuk warga yang membutuhkan.",
            },
            {
                title: "Pendampingan Gizi",
                description: "Program pencegahan stunting dan edukasi pola hidup sehat.",
            },
        ],
    },
    {
        icon: "solar:hand-money-linear",
        title: "Bantuan Sosial",
        slug: "bantuan-sosial",
        image: "/images/hero/hero-desa.png",
        description:
            "Pengelolaan dan penyaluran bantuan sosial tepat sasaran bagi warga yang membutuhkan sesuai kriteria pemerintah.",
        detail:
            "Transparansi dalam penyaluran bantuan sosial seperti BLT, PKH, dan bantuan pangan lainnya guna memastikan kesejahteraan warga Pameutingan yang kurang mampu tetap terjaga.",
        features: [
            {
                title: "Penyaluran BLT-DD",
                description: "Pembagian Bantuan Langsung Tunai Dana Desa secara transparan.",
            },
            {
                title: "Pendataan DTKS",
                description: "Pembaruan data terpadu kesejahteraan sosial secara berkala.",
            },
            {
                title: "Program PKH & BPNT",
                description: "Fasilitasi bantuan dari pemerintah pusat dan daerah.",
            },
        ],
    },
    {
        icon: "solar:shop-linear",
        title: "UMKM & Ekonomi",
        slug: "umkm-ekonomi",
        image: "/images/hero/hero-desa.png",
        description:
            "Pembinaan bagi pelaku usaha lokal untuk meningkatkan kualitas produk dan jangkauan pemasaran produk unggulan desa.",
        detail:
            "Kami mendukung pertumbuhan ekonomi lokal melalui pembinaan UMKM, pelatihan keterampilan, dan promosi produk unggulan Desa Pameutingan agar mampu bersaing di pasar yang lebih luas.",
        features: [
            {
                title: "Pelatihan Wirausaha",
                description: "Program peningkatan skill bagi para pelaku usaha kecil.",
            },
            {
                title: "Pemasaran Produk Lokal",
                description: "Fasilitasi promosi melalui website desa dan pameran.",
            },
            {
                title: "Bantuan Modal",
                description: "Informasi dan akses ke program bantuan modal usaha.",
            },
        ],
    },
    {
        icon: "solar:map-point-linear",
        title: "Wisata & Budaya",
        slug: "wisata-budaya",
        image: "/images/hero/hero-desa.png",
        description:
            "Pengembangan potensi wisata alam dan pelestarian seni budaya tradisional yang ada di wilayah Pameutingan.",
        detail:
            "Desa Pameutingan memiliki kekayaan alam dan budaya yang luar biasa. Kami mengajak seluruh pihak untuk menjaga dan mempromosikan potensi ini sebagai identitas desa sekaligus sumber pendapatan warga.",
        features: [
            {
                title: "Destinasi Wisata Alam",
                description: "Pengembangan spot wisata yang ramah lingkungan.",
            },
            {
                title: "Kelompok Sadar Wisata",
                description: "Pembinaan warga dalam mengelola potensi wisata lokal.",
            },
            {
                title: "Event Budaya Tahunan",
                description: "Penyelenggaraan festival seni dan budaya tradisional.",
            },
        ],
    },
    {
        icon: "solar:library-linear",
        title: "Pendidikan & Informasi",
        slug: "pendidikan-informasi",
        image: "/images/hero/hero-desa.png",
        description:
            "Layanan informasi publik, perpustakaan desa, dan dukungan bagi institusi pendidikan di lingkungan desa.",
        detail:
            "Menciptakan masyarakat desa yang cerdas melalui akses informasi yang terbuka, pengelolaan perpustakaan desa yang aktif, serta dukungan penuh terhadap kegiatan pendidikan formal maupun non-formal.",
        features: [
            {
                title: "Perpustakaan Desa",
                description: "Akses buku dan ruang baca yang nyaman bagi warga.",
            },
            {
                title: "Informasi Publik",
                description: "Transparansi data desa dan pengumuman penting bagi warga.",
            },
            {
                title: "Dukungan Sekolah",
                description: "Kolaborasi dengan sekolah-sekolah di wilayah desa.",
            },
        ],
    },
];

export const GET = () => {
    return NextResponse.json({
        ServicesData,
    })
}