"use client";
import React, { useRef } from 'react';
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const InformasiTerkini = () => {
    const sliderRef = useRef<Slider | null>(null);

    const news = [
        {
            title: "Pembangunan Jalan Desa Tahap I",
            category: "Infrastruktur",
            image: "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=800&auto=format&fit=crop",
            date: "14 Mei 2026"
        },
        {
            title: "Penyaluran Bantuan Langsung Tunai (BLT)",
            category: "Kesejahteraan",
            image: "https://images.unsplash.com/photo-1591522810850-58128c5fb089?q=80&w=800&auto=format&fit=crop",
            date: "12 Mei 2026"
        },
        {
            title: "Pelatihan UMKM Kerajinan Bambu",
            category: "Ekonomi",
            image: "https://images.unsplash.com/photo-1606059841778-430260486ca9?q=80&w=800&auto=format&fit=crop",
            date: "10 Mei 2026"
        },
        {
            title: "Rapat Koordinasi Karang Taruna",
            category: "Kepemudaan",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
            date: "08 Mei 2026"
        },
        {
            title: "Posyandu Serentak di RW 04",
            category: "Kesehatan",
            image: "https://images.unsplash.com/photo-1584362946045-121f839ad791?q=80&w=800&auto=format&fit=crop",
            date: "05 Mei 2026"
        },
        {
            title: "Gotong Royong Kebersihan Lingkungan",
            category: "Lingkungan",
            image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=800&auto=format&fit=crop",
            date: "01 Mei 2026"
        }
    ];

    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 800,
        cssEase: "ease-in-out",
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <section className="pt-12 lg:pt-16 relative pb-12 lg:pb-16 bg-white dark:bg-darkmode">
            <div className="container mx-auto lg:max-w-xl md:max-w-screen-md px-4">
                <div className="text-start">
                    <p className="text-lg text-black/50 dark:text-white/50 mb-6">
                        Berita Terkini
                    </p>
                    <h3 className="md:text-6xl sm:text-4xl text-3xl font-semibold text-dark dark:text-white">
                        Kabar Terbaru
                        <br /> Desa Pameutingan
                    </h3>
                    {/* <p className="mt-4 text-lg text-black/50 dark:text-white/50 sm:w-1/2 lg:w-2/5">
                        Ikuti perkembangan terbaru mengenai pembangunan dan kegiatan desa kami.
                    </p> */}
                </div>

                <div className="mt-4 border-b border-b-neutral-100 dark:border-b-white/10 lg:mt-10"></div>
                
                <div className="relative mt-10">
                    <Slider ref={sliderRef} {...settings}>
                        {news.map((item, index) => (
                            <div key={index} className="px-3">
                                <article className="flex flex-col group">
                                    <figure
                                        className="w-full relative h-40 lg:h-64 rounded-2xl lg:rounded-3xl shadow-card-shadow overflow-hidden"
                                    >
                                        <Image
                                            className="size-full object-cover duration-500 group-hover:scale-110"
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                        />
                                    </figure>
                                    <div className="flex flex-col items-start p-3 lg:p-4">
                                        <div className="text-primary text-xs font-bold uppercase tracking-wider mb-1">
                                            {item.category}
                                        </div>
                                        <div className="font-semibold text-dark dark:text-white md:text-lg lg:text-xl line-clamp-2">
                                            {item.title}
                                        </div>
                                        <p
                                            className="mt-0.5 text-sm font-medium text-black/50 dark:text-white/50 lg:mt-1 lg:text-base"
                                        >
                                            {item.date}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </Slider>

                    {/* Custom Smooth Navigation Button */}
                    <button
                        type="button"
                        onClick={() => sliderRef.current?.slickNext()}
                        aria-label="Slide Berikutnya"
                        className="rounded-full cursor-pointer flex items-center justify-center bg-slate-900 text-white hover:bg-slate-800 shadow-xl w-10 h-10 md:w-12 md:h-12 absolute -right-2 md:-right-6 top-1/2 z-10 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                    >
                        <svg
                            className="h-6 w-6 shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InformasiTerkini;
