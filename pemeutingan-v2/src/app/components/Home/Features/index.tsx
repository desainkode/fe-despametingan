"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MapComponent from "./MapComponent";

const Features = () => {
  const leftAnimation = {
    initial: { x: -40, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: "easeOut" },
  };
  const rightAnimation = {
    initial: { x: 40, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
  };
  return (
    <section className="bg-grey dark:bg-darklight overflow-x-hidden">
      <div
        className="container mx-auto lg:max-w-xl md:max-w-screen-md px-4"
      >
        <div className="grid grid-cols-12 xl:gap-24 gap-6 gap-y-11 items-center">
          <div className="lg:col-span-6 col-span-12 px-3">
            <motion.div {...leftAnimation}>
              <MapComponent />
            </motion.div>
          </div>
          <div className="lg:col-span-6 col-span-12 px-3">
            <motion.div {...rightAnimation}>
              <p className="dark:text-white/50 text-black/50 text-lg pb-8 mb-0">
                Statistik & Wilayah
              </p>
              <h3 className="md:text-6xl sm:text-40 text-3xl font-semibold text-dark dark:text-white pb-8">
                Demografi & <br /> Statistik Desa
              </h3>
              <ul>
                <li className="flex gap-2 items-center pb-6">
                  <span>
                    <Icon
                      icon="tabler:circle-check"
                      width="25"
                      height="25"
                      className="font-semibold text-primary"
                    />
                  </span>
                  <p className="text-lg text-black/50 dark:text-white/50">
                    3.542 Total Penduduk (Tersebar di 4 Dusun)
                  </p>
                </li>
                <li className="flex gap-2 items-center pb-6">
                  <span>
                    <Icon
                      icon="tabler:circle-check"
                      width="25"
                      height="25"
                      className="font-semibold text-primary"
                    />
                  </span>
                  <p className="text-lg dark:text-white/50 text-black/50 ">
                    1.087 Kepala Keluarga (Pembaruan Semester I)
                  </p>
                </li>
                <li className="flex gap-2 items-center pb-6">
                  <span>
                    <Icon
                      icon="tabler:circle-check"
                      width="25"
                      height="25"
                      className="font-semibold text-primary"
                    />
                  </span>
                  <p className="text-lg dark:text-white/50 text-black/50 ">
                    68% Usia Produktif (Rentang 18-55 Tahun)
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <span>
                    <Icon
                      icon="tabler:circle-check"
                      width="25"
                      height="25"
                      className="font-semibold text-primary"
                    />
                  </span>
                  <p className="text-lg dark:text-white/50 text-black/50 ">
                    Data Kependudukan Akurat dan Terintegrasi
                  </p>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/infografis"
                  className="py-1.125 px-2.188 bg-primary rounded-xl hover:bg-primary-hover duration-300 text-white font-semibold block w-fit"
                >
                  Lihat Statistik Lengkap
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
