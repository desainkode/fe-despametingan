"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PotensiCard from "./PotensiCard";

import { motion } from "framer-motion";

const PotensiDesa = () => {
  const [DocText, setDocText] = useState<any[]>([])
  const [Portfolio, setPortfolio] = useState<any[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setDocText(data.DocText || [])
        setPortfolio(data.Portfolio || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchData()
  }, [])

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 100,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hr-background.png"
          alt="Potensi Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto lg:max-w-xl md:max-w-screen-md px-4 relative z-10">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
        >
          <p className="text-lg text-white/60 sm:text-start text-center">Potensi Desa</p>
          <div className="flex sm:flex-row flex-col sm:gap-0 gap-6 justify-between items-center mt-1.875">
            <h3 className="text-white md:text-6xl sm:text-40 text-3xl font-semibold">
              Mengembangkan
              <br />
              Potensi Lokal.
            </h3>
            <Link
              href="/potensi"
              className="px-2.188 py-1.125 bg-primary rounded-xl text-white text-lg font-semibold hover:bg-primary-hover duration-500"
            >
              Lihat Potensi
            </Link>
          </div>
        </motion.div>
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
            className="grid grid-cols-12 pt-17 gap-x-6 gap-y-8 lg:pb-20 pb-10"
        >
          {DocText.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="xl:col-span-4 md:col-span-6 col-span-12">
                <PotensiCard icon={item.icon} title={item.title} text={item.text} />
            </motion.div>
          ))}
        </motion.div>
        <Slider {...settings}>
          {Portfolio.map((item, index) => (
            <div key={index} className="px-3">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt="potensi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PotensiDesa;
