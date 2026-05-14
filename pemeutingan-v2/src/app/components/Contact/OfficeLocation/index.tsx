import React from "react";
import Link from "next/link";
import Image from "next/image";

const Location = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hr-background.png"
          alt="Office Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px]"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-24 gap-4 border-b border-solid border-white/20 pb-11">
          <div>
            <h2 className="text-white text-4xl leading-tight font-bold">
              Kantor Kepala Desa
            </h2>
          </div>
          <div>
            <p className="text-lg font-normal leading-relaxed text-white/60">
              Jl. Desa Pameutingan, Kec. Cipatujah, Kab. Tasikmalaya, Jawa Barat 46189
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="mailto:kontak@pameutingan.desa.id"
              className="text-lg text-primary font-medium hover:text-primary-hover transition-colors"
            >
              kontak@pameutingan.desa.id
            </Link>
            <Link
              href="tel:08123456789"
              className="text-lg text-white/80 flex items-center gap-2 hover:text-white transition-colors w-fit"
            >
              <span className="text-white/40">Telp:</span>+62 812-3456-789
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-24 gap-4 pt-12">
          <div>
            <h2 className="text-white text-3xl leading-tight font-bold">
              Jam Operasional
            </h2>
          </div>
          <div>
            <p className="text-lg text-white/60 font-normal leading-relaxed">
              Senin - Jumat: 08.00 - 15.30 WIB <br />
              Sabtu - Minggu: Tutup
            </p>
          </div>
          <div>
            <p className="text-lg text-white/60 font-normal leading-relaxed">
              Kami melayani berbagai pengurusan administrasi kependudukan dan layanan publik lainnya sesuai jam kerja.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
