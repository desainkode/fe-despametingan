"use client"
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

const Footer: FC = () => {
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/service')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setServices(data.ServicesData || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <footer className="bg-[#121212] bg-[url('/images/plan/price-plan-background-icons.svg')] bg-cover bg-center bg-no-repeat py-17 pb-6 overflow-hidden relative">
      {/* Overlay to ensure text readability if the pattern is too bright */}
      <div className="absolute inset-0 bg-[#121212]/80 z-0"></div>
      <div className="container mx-auto lg:max-w-xl md:max-w-screen-md px-4 relative z-10">
        <div className="grid grid-cols-12 sm:gap-1.875 gap-y-10">
          {/* Column 1: Branding & About */}
          <div className="lg:col-span-4 col-span-12">
            <div className="md:pe-7.5">
              <Link href="/" className="flex items-center gap-3 mb-8">
                <div className="relative h-10 w-10 flex-shrink-0">
                  <Image
                    src="/images/logo/logo-desa.svg"
                    alt="Logo Desa Pameutingan"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-medium tracking-tight text-white">
                    Desa Pameutingan
                  </span>
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary">
                    Tasikmalaya
                  </span>
                </div>
              </Link>
              <p className="mb-8 font-normal text-lg text-white/50 leading-relaxed">
                Portal Informasi Resmi Pemerintah Desa Pameutingan. Mewujudkan pelayanan publik yang prima, transparan, dan akuntabel bagi seluruh warga.
              </p>
              <div className="flex gap-6 items-center">
                <Link href="#" className="text-white/60 hover:text-primary transition-all duration-300">
                    <Icon icon="lucide:facebook" width="22" />
                </Link>
                <Link href="#" className="text-white/60 hover:text-primary transition-all duration-300">
                    <Icon icon="lucide:instagram" width="22" />
                </Link>
                <Link href="#" className="text-white/60 hover:text-primary transition-all duration-300">
                    <Icon icon="lucide:youtube" width="22" />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation (Cerminan Header) */}
          <div className="lg:col-span-2 sm:col-span-6 col-span-12 lg:ps-4">
            <h4 className="text-lg text-white font-semibold mb-8 flex items-center gap-2">
              Navigasi
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" className="text-white/60 hover:text-primary transition-colors text-lg">Beranda</Link>
              </li>
              <li>
                <Link href="/profil" className="text-white/60 hover:text-primary transition-colors text-lg">Profil Desa</Link>
              </li>
              <li>
                <Link href="/potensi" className="text-white/60 hover:text-primary transition-colors text-lg">Potensi Desa</Link>
              </li>
              <li>
                <Link href="/berita" className="text-white/60 hover:text-primary transition-colors text-lg">Berita Terbaru</Link>
              </li>
              <li>
                <Link href="/infografis" className="text-white/60 hover:text-primary transition-colors text-lg">Infografis</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Layanan Populer */}
          <div className="lg:col-span-3 sm:col-span-6 col-span-12 lg:ps-4">
            <h4 className="text-lg text-white font-semibold mb-8 flex items-center gap-2">
              Layanan Populer
            </h4>
            <ul className="flex flex-col gap-4">
              {services.slice(0, 5).map((item, index) => (
                <li key={index}>
                  <Link href={`/services/${item.slug}`} className="text-white/60 hover:text-primary transition-colors text-lg line-clamp-1">
                    {item.title}
                  </Link>
                </li>
              ))}
              {services.length === 0 && (
                <>
                  <li><Link href="/layanan" className="text-white/60 hover:text-primary transition-colors text-lg">Administrasi</Link></li>
                  <li><Link href="/layanan" className="text-white/60 hover:text-primary transition-colors text-lg">Kesehatan</Link></li>
                  <li><Link href="/layanan" className="text-white/60 hover:text-primary transition-colors text-lg">Kependudukan</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Column 4: Kontak & Lokasi */}
          <div className="lg:col-span-3 col-span-12 lg:ps-4">
            <h4 className="text-lg text-white font-semibold mb-8 flex items-center gap-2">
              Kontak & Lokasi
            </h4>
            <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white/60">
                        <Icon icon="solar:map-point-bold" width="20" />
                    </div>
                    <p className="text-white/60 text-lg leading-relaxed">
                        Jl. Desa Pameutingan No. 01, Kec. Cipatujah, Kab. Tasikmalaya, Jawa Barat 46189
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white/60">
                        <Icon icon="solar:phone-bold" width="20" />
                    </div>
                    <div>
                        <p className="text-white/60 text-sm mb-1">Telepon Pelayanan:</p>
                        <Link href="tel:08123456789" className="text-white hover:text-primary transition-colors text-lg font-medium">
                            +62 812-3456-789
                        </Link>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white/60">
                        <Icon icon="solar:letter-bold" width="20" />
                    </div>
                    <div>
                        <p className="text-white/60 text-sm mb-1">Email Resmi:</p>
                        <Link href="mailto:desa@pameutingan.id" className="text-white hover:text-primary transition-colors text-lg font-medium">
                            desa@pameutingan.id
                        </Link>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-17 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
          <p className="text-base font-normal text-white/40 text-center md:text-left">
            &copy; {new Date().getFullYear()} - Pemerintah Desa Pameutingan. Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-8 items-center">
            <Link href="/privacy" className="text-sm text-white/40 hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="text-sm text-white/40 hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
