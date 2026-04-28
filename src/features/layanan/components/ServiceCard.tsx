import React from "react";
import Link from "next/link";
import { Home, Briefcase, HandHelping, IdCard, Baby, FileText, ArrowRight, Info, Users, Heart, MessageCircle, FileSearch, ShieldCheck } from "lucide-react";
import { ServiceItem } from "../types";

const iconMap: Record<string, any> = {
  Home,
  Briefcase,
  HandHelping,
  IdCard,
  Baby,
  FileText,
  Users,
  Heart,
  MessageCircle,
  FileSearch,
  ShieldCheck,
};

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || FileText;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[40px] border border-white bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(11,40,31,0.08)]">
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B281F]/5 text-[#0B281F] transition-all duration-500 group-hover:bg-[#009966] group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
        <Icon size={32} />
      </div>

      <h3 
        className="mb-4 text-2xl font-bold text-[#0B281F] transition-colors group-hover:text-[#009966]"
        style={{ fontFamily: 'var(--font-timeless)' }}
      >
        {service.name}
      </h3>
      
      <p className="mb-10 flex-1 text-[14px] leading-relaxed text-[#0B281F]/50">
        {service.description}
      </p>

      <div className="flex flex-col gap-3">
        <Link 
          href={`/layanan-masyarakat/ajukan/${service.slug}`}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#0B281F] text-[14px] font-bold text-white shadow-lg transition-all hover:bg-[#004F3B]"
        >
          Ajukan Sekarang
          <ArrowRight size={18} />
        </Link>
        <Link 
          href={`/layanan-masyarakat/detail/${service.slug}`}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[#0B281F]/5 bg-[#F6F8F7] text-[14px] font-bold text-[#0B281F] transition-all hover:bg-[#0B281F]/5"
        >
          Lihat Persyaratan
          <Info size={18} />
        </Link>
      </div>
    </article>
  );
}
