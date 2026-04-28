import { NewsHero } from "@/features/berita/components/NewsHero";
import { NewsList } from "@/features/berita/components/NewsList";

export default function BeritaPage() {
  return (
    <main className="min-h-screen bg-[#F6F8F7]">
      <NewsHero />
      <div className="relative z-20">
        <NewsList />
      </div>
      
      {/* Newsletter / CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[48px] bg-[#009966] p-8 text-white shadow-2xl md:p-16 lg:p-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-black/10 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="max-w-3xl font-[Georgia,serif] text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Jangan Lewatkan Informasi <span className="text-[#F0B100]">Penting</span> Dari Desa Kita
            </h2>
            <p className="mt-6 max-w-xl text-[16px] text-white/80">
              Daftarkan email Anda untuk berlangganan nawala mingguan dan dapatkan update langsung di kotak masuk Anda.
            </p>
            
            <form className="mt-10 flex w-full max-w-lg flex-col gap-4 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Alamat email Anda..."
                className="h-16 flex-1 rounded-full border border-white/20 bg-white/10 px-8 text-[15px] text-white placeholder:text-white/40 outline-none backdrop-blur-md focus:bg-white/20"
              />
              <button className="h-16 rounded-full bg-[#0B281F] px-10 text-[15px] font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
                Berlangganan
              </button>
            </form>
            
            <p className="mt-6 text-[12px] text-white/50">
              Kami menghargai privasi Anda. Batalkan langganan kapan saja.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
