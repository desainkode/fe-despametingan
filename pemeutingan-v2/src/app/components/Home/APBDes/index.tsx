"use client";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { Icon } from "@iconify/react";
import Logo from "@/app/components/Layout/Header/Logo";
import APBDesCard, { APBDesItem } from "./APBDesCard";

import { motion } from "framer-motion";

const APBDes = () => {
  const [enabled, setEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<APBDesItem | null>(null);
  const [apbdes2026, setApbdes2026] = useState<APBDesItem[]>([])
  const [apbdes2025, setApbdes2025] = useState<APBDesItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setApbdes2026(data.MonthlyPlans || [])
        setApbdes2025(data.yearlyPlans || [])
      } catch (error) {
        console.error('Error fetching APBDes data:', error)
      }
    }

    fetchData()
  }, [])

  const currentData = enabled ? apbdes2025 : apbdes2026;

  const openModal = (item: APBDesItem) => {
    setSelectedData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

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

  return (
    <section className="relative bg-contain bg-no-repeat bg-[url('/images/plan/price-plan-background-icons.svg')] bg-center dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-xl md:max-w-screen-md px-4">
        <div className="text-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <p className="text-lg text-black/50 dark:text-white/50 mb-6">
                Transparansi Anggaran
            </p>
            <h3 className="md:text-6xl sm:text-4xl text-3xl font-semibold text-dark dark:text-white">
                Laporan Pendapatan
                <br /> & Belanja Desa
            </h3>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="mt-8 mb-8"
          >
            <div className="flex justify-center items-center gap-4">
              <label
                htmlFor="switch"
                className="text-lg font-semibold text-black dark:text-white"
              >
                2026
              </label>
              <Switch
                checked={enabled}
                id="switch"
                onChange={setEnabled}
                className="group inline-flex h-6 w-12 items-center rounded-full border border-black dark:border-white/25 transition data-[checked]:bg-lightyellow data-[checked]:border-transparent"
              >
                <span className="size-4 translate-x-1 rounded-full bg-black dark:bg-white/25 transition group-data-[checked]:translate-x-7 group-data-[checked]:bg-white" />
              </Switch>
              <label
                htmlFor="switch"
                className="text-lg font-semibold text-black dark:text-white"
              >
                2025
              </label>
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
            className="grid grid-cols-12 mt-10 sm:gap-1.875 gap-y-1.875"
          >
            {currentData.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="xl:col-span-4 md:col-span-6 col-span-12">
                <APBDesCard data={item} onViewDetail={openModal} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {isModalOpen && selectedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
          <div className="bg-white dark:bg-darkmode p-8 rounded-2xl h-auto max-w-lg w-full relative shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <div className="max-w-32">
                    <Logo />
                </div>
                <button
                    onClick={closeModal}
                    className="text-black/50 dark:text-white/50 hover:text-primary duration-300"
                    aria-label="Close Modal"
                >
                    <Icon icon="ph:x-circle" width="32" height="32" />
                </button>
            </div>

            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-dark dark:text-white mb-2">Rincian Transparansi</h4>
              <p className="text-black/50 dark:text-white/50">{selectedData.type}</p>
            </div>

            <div className="bg-grey dark:bg-darklight p-6 rounded-xl mb-8">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5 dark:border-white/5">
                    <span className="text-black/60 dark:text-white/60">Kategori:</span>
                    <span className="font-bold text-dark dark:text-white">{selectedData.type}</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5 dark:border-white/5">
                    <span className="text-black/60 dark:text-white/60">Nilai Anggaran:</span>
                    <span className="font-bold text-primary text-xl">
                        Rp {typeof selectedData.price === 'number' 
                            ? selectedData.price.toLocaleString('id-ID') 
                            : !isNaN(Number(selectedData.price)) 
                                ? Number(selectedData.price).toLocaleString('id-ID') 
                                : selectedData.price}
                    </span>
                </div>
                <div className="mt-4">
                    <p className="text-sm font-semibold text-black/60 dark:text-white/60 mb-2">Deskripsi:</p>
                    <p className="text-dark dark:text-white">{selectedData.text}</p>
                </div>
            </div>

            <div className="mb-8">
                <p className="text-sm font-semibold text-black/60 dark:text-white/60 mb-4">Rincian Alokasi:</p>
                <ul className="grid grid-cols-1 gap-3">
                    {selectedData.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3 text-dark dark:text-white">
                            <Icon icon="tabler:circle-check" className="text-primary" width="20" />
                            {benefit}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={closeModal}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover duration-300 shadow-lg"
            >
                Tutup Detail
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default APBDes;
