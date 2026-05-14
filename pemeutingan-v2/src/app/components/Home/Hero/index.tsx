"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  const leftAnimation = {
    initial: { x: -40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
  };
  const rightAnimation = {
    initial: { x: 40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
  };

  return (
    <section className="overflow-x-hidden before:content-[''] before:absolute lg:before:h-full sm:before:h-2/3 before:h-3/5 before:bg-no-repeat before:bg-[url('/images/hero/right-background.svg')] before:bg-cover before:right-0 lg:before:top-0 before:bottom-0 lg:before:w-40% before:w-full lg:before:z-0 before:z-1 sm:before:block before:hidden after:content-[''] after:absolute after:bg-grey dark:after:bg-darklight after:h-full lg:after:w-60% after:w-full after:left-0 after:top-0 relative h-full lg:py-9.375! pt-24! pb-0!">
      <div className="container mx-auto lg:max-w-xl md:max-w-screen-md">
        <div className="grid-cols-12 grid z-1 items-center relative">
          <div className="lg:col-span-6 col-span-12 px-4">
            <motion.div
              {...leftAnimation}
              className="relative before:content-[''] before:absolute before:h-full before:w-full before:bg-[url('/images/hero/leftside-backlayer-icons.svg')] before:-left-9.375 before:bg-contain before:bg-no-repeat before:-z-1"
            >
              <h1 className="text-dark dark:text-white mb-0 md:text-65 sm:text-4xl text-3xl font-medium">
                Portal Resmi Desa Pameutingan
              </h1>
              <p className="text-lg font-normal text-black/50 dark:text-white/50 sm:py-1.875 py-5 leading-relaxed">
                Mewujudkan tata kelola desa yang transparan, akuntabel, dan melayani warga dengan sepenuh hati demi kemajuan bersama.
              </p>
              <Link href="/profil" className="sm:px-2.188 px-6 sm:py-1.125 py-3 rounded-xl text-base hover:cursor-pointer font-medium bg-primary text-white hover:bg-primary-hover duration-500 inline-block shadow-lg shadow-primary/20 sm:mb-0 mb-4 transition-all active:scale-95">
                Jelajahi Desa Kami
              </Link>
            </motion.div>
          </div>
          <div className="lg:col-span-6 col-span-12 sm:bg-none bg-[url('/images/hero/right-background.svg')] px-4">
            <motion.div {...rightAnimation} className="relative">
              <Image
                src="/images/hero/hero-desa.png"
                alt="Kepala Desa Pameutingan"
                width={700}
                height={700}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
