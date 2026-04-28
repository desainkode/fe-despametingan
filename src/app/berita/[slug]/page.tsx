import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Bookmark,
  Globe,
  Link as LinkIcon
} from "lucide-react";
import { mockNews } from "@/features/berita/config/mock-data";
import { CommentSection } from "@/features/berita/components/CommentSection";
import { NewsCard } from "@/features/berita/components/NewsCard";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = mockNews.find((item) => item.slug === slug);

  if (!news) {
    notFound();
  }

  const relatedNews = mockNews.filter((item) => item.id !== news.id).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#F6F8F7] pb-24">
      {/* Article Header & Hero */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden lg:h-[65vh]">
        <img 
          src={news.image} 
          alt={news.title} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B281F] via-[#0B281F]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B281F]/60 via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
            <Link
              href="/berita"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13px] font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <ArrowLeft size={16} />
              Kembali ke Berita
            </Link>
            
            <div className="mb-4 inline-flex rounded-full bg-[#009966] px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
              {news.category.name}
            </div>
            
            <h1 className="max-w-4xl font-[Georgia,serif] text-[32px] font-bold leading-tight text-white sm:text-[42px] lg:text-[56px]">
              {news.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:flex-row lg:px-8">
        {/* Main Content Area */}
        <div className="flex-1 lg:max-w-4xl">
          <article className="rounded-[40px] border border-[#0B281F]/5 bg-white p-8 shadow-2xl md:p-12 lg:p-16">
            {/* Meta Info */}
            <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-b border-[#0B281F]/5 pb-8">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-2xl border border-[#0B281F]/10">
                  <img src={news.author.avatar} alt={news.author.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0B281F]">{news.author.name}</p>
                  <p className="text-[12px] text-[#0B281F]/50">{news.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-[13px] text-[#0B281F]/60">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {news.publishedAt}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {news.readingTime}
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-lg max-w-none text-[17px] leading-relaxed text-[#0B281F]/80 prose-headings:font-[Georgia,serif] prose-headings:text-[#0B281F] prose-strong:text-[#0B281F]">
              <p className="text-xl font-medium leading-relaxed text-[#0B281F]">
                {news.excerpt}
              </p>
              
              {news.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mt-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags & Actions */}
            <div className="mt-16 flex flex-col gap-8 border-t border-[#0B281F]/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-[#0B281F]/40 uppercase tracking-widest">Bagikan:</span>
                <div className="flex gap-2">
                  {[Globe, Share2, LinkIcon].map((Icon, idx) => (
                    <button key={idx} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B281F]/5 text-[#0B281F] transition-all hover:bg-[#009966] hover:text-white">
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
              </div>
              
              <button className="flex items-center gap-2 rounded-full border border-[#0B281F]/10 px-6 py-2.5 text-[13px] font-bold text-[#0B281F] transition-all hover:bg-[#0B281F] hover:text-white">
                <Bookmark size={18} />
                Simpan Berita
              </button>
            </div>

            {/* Comments */}
            <CommentSection />
          </article>
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 space-y-10 lg:w-[400px]">
          {/* Related News */}
          <div className="sticky top-28">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#0B281F]">Berita Terkait</h3>
              <Link href="/berita" className="text-[13px] font-bold text-[#009966] hover:underline">Lihat Semua</Link>
            </div>
            
            <div className="flex flex-col gap-6">
              {relatedNews.map((item) => (
                <Link key={item.id} href={`/berita/${item.slug}`} className="group flex gap-4 rounded-3xl border border-white bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#009966]">{item.category.name}</span>
                    <h4 className="mt-1 line-clamp-2 text-[14px] font-bold leading-tight text-[#0B281F] group-hover:text-[#009966]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[11px] text-[#0B281F]/40">{item.publishedAt}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Newsletter Mini */}
            <div className="mt-10 overflow-hidden rounded-[32px] bg-[#0B281F] p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold">Tetap Terhubung</h3>
              <p className="mt-3 text-[13px] text-white/60 leading-relaxed">
                Dapatkan kabar terbaru Desa Pameutingan langsung di kotak masuk Anda.
              </p>
              <form className="mt-6 flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email Anda..."
                  className="h-12 rounded-xl bg-white/10 px-4 text-[14px] text-white outline-none focus:bg-white/20"
                />
                <button className="h-12 rounded-xl bg-[#009966] text-[14px] font-bold transition-all hover:bg-[#00B373]">
                  Langganan
                </button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
