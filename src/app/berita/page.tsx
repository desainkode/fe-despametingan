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
        <div className="relative overflow-hidden rounded-[32px] bg-[#0B281F] p-6 text-white shadow-2xl sm:rounded-[48px] sm:p-12 md:p-16 lg:p-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#009966]/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="max-w-3xl font-[Georgia,serif] text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Jangan Lewatkan Informasi <span className="text-[#F0B100]">Penting</span> Dari Desa Kita
            </h2>
            <p className="mt-4 max-w-xl text-[14px] text-white/70 sm:mt-6 sm:text-[16px]">
              Daftarkan email Anda untuk berlangganan nawala mingguan dan dapatkan update langsung di kotak masuk Anda.
            </p>
            
            <div className="mt-8 flex w-full max-w-2xl flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Alamat email Anda..."
                className="h-16 w-full flex-1 rounded-full border border-white/30 bg-white/10 px-8 text-[16px] font-medium text-white placeholder:text-white/40 outline-none backdrop-blur-md focus:border-white/60 focus:bg-white/20 sm:text-[17px]"
              />
              <button 
                className="h-16 w-full rounded-full bg-[#009966] px-10 text-[16px] font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#00B373] active:translate-y-0 sm:w-auto sm:text-[17px]"
              >
                Berlangganan
              </button>
            </div>
            
            <p className="mt-4 text-[11px] text-white/40 sm:mt-6 sm:text-[12px]">
              Kami menghargai privasi Anda. Batalkan langganan kapan saja.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
