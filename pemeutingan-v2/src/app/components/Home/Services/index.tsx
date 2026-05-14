"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SingleService, { ServiceType } from "./SingleService";

const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([])

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  console.log("Services data:", services);

  return (
    <section className="dark:bg-darkmode bg-[url('/images/plan/price-plan-background-icons.svg')] bg-cover bg-center bg-no-repeat overflow-hidden min-h-[400px]">
      <div
        className="container mx-auto lg:max-w-xl md:max-w-screen-md px-4"
      >
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-17"
        >
          <p className="text-black/50 dark:text-white/50 text-lg lg:text-start text-center">
            Layanan Desa
          </p>
          <div className="flex lg:flex-row flex-col lg:gap-0 gap-10 justify-between items-center mt-5">
            <h2 className="font-medium md:text-6xl sm:text-40 text-3xl text-black dark:text-white lg:text-start text-center">
              Layanan Unggulan <br /> Desa Pameutingan
            </h2>
            <Link
              href="/layanan"
              className="py-1.125 px-2.188 bg-primary rounded-xl hover:bg-primary-hover duration-300 text-white font-medium shadow-lg shadow-primary/20"
            >
              Semua Layanan
            </Link>
          </div>
        </motion.div>
        <motion.div 
            initial="hidden"
            animate={services.length > 0 ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-12 gap-6"
        >
          {services.slice(0, 3).map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="xl:col-span-4 md:col-span-6 col-span-12">
                <SingleService service={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
