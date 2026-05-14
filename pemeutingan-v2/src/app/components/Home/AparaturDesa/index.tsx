"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/app/components/ui/AnimatedBeam";
import { Icon } from "@iconify/react";

import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; title?: string }
>(({ className, children, title }, ref) => {
  return (
    <div
      ref={ref}
      title={title}
      className={cn(
        "z-10 flex size-24 items-center justify-center rounded-full border-2 border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:border-slate-800 dark:bg-darklight",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const StaffMember = forwardRef<
  HTMLDivElement,
  { name: string; role: string; image: string; className?: string; isKades?: boolean }
>(({ name, role, image, className, isKades }, ref) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Circle ref={ref} className={cn("overflow-hidden p-0", isKades && "size-40 border-primary border-4 shadow-primary/20", className)} title={role}>
        <div className="relative size-full">
          <Image src={image} alt={name} fill className="size-full object-cover" />
          {isKades && (
            <div className="absolute bottom-0 left-0 right-0 bg-primary/80 py-1.5 text-center">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">KADES</span>
            </div>
          )}
        </div>
      </Circle>

      <div className="flex flex-col items-center min-w-[120px] group">
        {/* Top part: Name */}
        <div className={cn(
          "px-3 py-2 text-center w-full rounded-t-xl transition-colors duration-300",
          isKades ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-dark dark:text-white"
        )}>
          <div className={cn("text-[13px] font-bold leading-tight truncate px-1")}>
            {name}
          </div>
        </div>

        {/* Bottom part: Role */}
        <div className={cn(
          "px-3 py-1.5 text-center w-full rounded-b-xl border-x border-b transition-colors duration-300",
          isKades
            ? "bg-white dark:bg-darklight border-primary text-primary"
            : "bg-white dark:bg-darklight border-slate-200 dark:border-slate-800 text-black/60 dark:text-white/60"
        )}>
          <div className="text-[11px] font-semibold leading-tight uppercase tracking-tighter truncate">
            {role}
          </div>
        </div>
      </div>
    </div>
  );
});

StaffMember.displayName = "StaffMember";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StaffData = [
  { name: "Heri Setiawan", role: "Kaur Keuangan", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Mulyana", role: "Kaur Umum", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { name: "Sutisna, S.Sos", role: "Sekdes", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
  { name: "Siti Aminah", role: "Kasi Pem.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "Lilis Karlina", role: "Kasi Kesra", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
  { name: "Ratna Sari", role: "Kasi Pelayanan", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" },
  { name: "Asep Sunandar", role: "Staf Keuangan", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" },
  { name: "Dadang Hermawan", role: "Staf Umum", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" },
  { name: "Ujang Slamet", role: "Staf Perencanaan", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop" },
  { name: "Dewi Lestari", role: "Staf Pem.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
  { name: "Ani Wijaya", role: "Staf Kesra", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { name: "Indah Permata", role: "Staf Pelayanan", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
];

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const SampleNextArrow = (props: ArrowProps) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={cn(className, "before:content-none z-20 !flex items-center justify-center bg-white dark:bg-darklight rounded-full !w-10 !h-10 -right-2 md:-right-4 border border-slate-100 dark:border-white/10 hover:bg-slate-50 transition-all cursor-pointer")}
            style={{ ...style, display: "flex" }}
            onClick={onClick}
        >
            <Icon icon="solar:alt-arrow-right-bold" className="text-primary size-6" />
        </div>
    );
}

const SamplePrevArrow = (props: ArrowProps) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={cn(className, "before:content-none z-20 !flex items-center justify-center bg-white dark:bg-darklight rounded-full !w-10 !h-10 -left-2 md:-left-4 border border-slate-100 dark:border-white/10 hover:bg-slate-50 transition-all cursor-pointer")}
            style={{ ...style, display: "flex" }}
            onClick={onClick}
        >
            <Icon icon="solar:alt-arrow-left-bold" className="text-primary size-6" />
        </div>
    );
}

const AparaturDesa = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);
  const div10Ref = useRef<HTMLDivElement>(null);
  const div11Ref = useRef<HTMLDivElement>(null);
  const div12Ref = useRef<HTMLDivElement>(null);
  const div13Ref = useRef<HTMLDivElement>(null);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
        }
    ]
  };

  return (
    <section className="pt-12 lg:pt-16 pb-12 lg:pb-16 bg-white dark:bg-darkmode overflow-hidden">
      <div className="container mx-auto lg:max-w-7xl md:max-w-screen-md px-4">
        <div className="text-start mb-12">
          <p className="text-lg text-black/50 dark:text-white/50 mb-6">
            Struktur Organisasi
          </p>
          <h3 className="md:text-6xl sm:text-4xl text-3xl font-semibold text-dark dark:text-white">
            Aparatur Desa
            <br /> Pameutingan
          </h3>
        </div>

        <div className="flex justify-center mb-10">
          <p className="text-lg font-medium text-black/50 dark:text-white/50 text-center">
            Kami siap membantu warga
          </p>
        </div>

        {/* Mobile View: Slider */}
        <div className="block md:hidden mb-16 px-4">
            <div className="flex flex-col items-center mb-12">
                 <StaffMember isKades name="H. Ahmad Sobari" role="KADES" image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" />
            </div>
            <div className="px-6">
                <Slider {...sliderSettings}>
                    {StaffData.map((staff, index) => (
                        <div key={index} className="px-2">
                             <StaffMember name={staff.name} role={staff.role} image={staff.image} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>

        {/* Desktop View: Animated Beam */}
        <div
          className="relative hidden md:flex w-full items-center justify-center overflow-hidden p-10 md:p-20"
          ref={containerRef}
        >
          <div className="flex size-full flex-row items-stretch justify-between gap-8 md:gap-16 max-w-5xl">
            {/* Column 1 - Left Outer */}
            <div className="flex flex-col justify-between gap-8">
              <StaffMember ref={div8Ref} name="Asep Sunandar" role="Staf Keuangan" image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" />
              <StaffMember ref={div9Ref} name="Dadang Hermawan" role="Staf Umum" image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" />
              <StaffMember ref={div10Ref} name="Ujang Slamet" role="Staf Perencanaan" image="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop" />
            </div>

            {/* Column 2 - Left Inner */}
            <div className="flex flex-col justify-between gap-8">
              <StaffMember ref={div1Ref} name="Heri Setiawan" role="Kaur Keuangan" image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" />
              <StaffMember ref={div2Ref} name="Mulyana" role="Kaur Umum" image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" />
              <StaffMember ref={div3Ref} name="Sutisna, S.Sos" role="Sekdes" image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" />
            </div>

            {/* Column 3 - Center (KADES) */}
            <div className="flex flex-col justify-center">
              <StaffMember ref={div4Ref} isKades name="H. Ahmad Sobari" role="KADES" image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" />
            </div>

            {/* Column 4 - Right Inner */}
            <div className="flex flex-col justify-between gap-8">
              <StaffMember ref={div5Ref} name="Siti Aminah" role="Kasi Pem." image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" />
              <StaffMember ref={div6Ref} name="Lilis Karlina" role="Kasi Kesra" image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" />
              <StaffMember ref={div7Ref} name="Ratna Sari" role="Kasi Pelayanan" image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" />
            </div>

            {/* Column 5 - Right Outer */}
            <div className="flex flex-col justify-between gap-8">
              <StaffMember ref={div11Ref} name="Dewi Lestari" role="Staf Pem." image="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" />
              <StaffMember ref={div12Ref} name="Ani Wijaya" role="Staf Kesra" image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" />
              <StaffMember ref={div13Ref} name="Indah Permata" role="Staf Pelayanan" image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" />
            </div>
          </div>

          {/* Connections for Inner Columns */}
          <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div4Ref} curvature={-70} endYOffset={-10} />
          <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} />
          <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div4Ref} curvature={70} endYOffset={10} />
          <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div4Ref} curvature={-70} endYOffset={-10} reverse />
          <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} reverse />
          <AnimatedBeam containerRef={containerRef} fromRef={div7Ref} toRef={div4Ref} curvature={70} endYOffset={10} reverse />

          {/* Connections for Outer Columns */}
          <AnimatedBeam containerRef={containerRef} fromRef={div8Ref} toRef={div1Ref} curvature={-40} />
          <AnimatedBeam containerRef={containerRef} fromRef={div9Ref} toRef={div2Ref} />
          <AnimatedBeam containerRef={containerRef} fromRef={div10Ref} toRef={div3Ref} curvature={40} />
          <AnimatedBeam containerRef={containerRef} fromRef={div11Ref} toRef={div5Ref} curvature={-40} reverse />
          <AnimatedBeam containerRef={containerRef} fromRef={div12Ref} toRef={div6Ref} reverse />
          <AnimatedBeam containerRef={containerRef} fromRef={div13Ref} toRef={div7Ref} curvature={40} reverse />
        </div>

        <div className="mt-0 max-w-2xl mx-auto flex flex-col items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center w-full">
            <div className="p-4 rounded-2xl">
              <div className="text-primary font-bold text-xl">12</div>
              <div className="text-sm text-black/50 dark:text-white/50 leading-tight">Staf Desa</div>
            </div>
            <div className="p-4 rounded-2xl">
              <div className="text-primary font-bold text-xl">08</div>
              <div className="text-sm text-black/50 dark:text-white/50 leading-tight">Dusun</div>
            </div>
            <div className="p-4 rounded-2xl">
              <div className="text-primary font-bold text-xl">14</div>
              <div className="text-sm text-black/50 dark:text-white/50 leading-tight">RW</div>
            </div>
            <div className="p-4 rounded-2xl">
              <div className="text-primary font-bold text-xl">42</div>
              <div className="text-sm text-black/50 dark:text-white/50 leading-tight">RT</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AparaturDesa;
