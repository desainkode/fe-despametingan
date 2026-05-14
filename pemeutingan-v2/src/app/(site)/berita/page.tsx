import BeritaList from "@/app/components/BeritaList";
import HeroSub from "@/app/components/SharedComponent/HeroSub";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Berita Desa | Desa Pameutingan",
};

const Berita = () => {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  const breadcrumbLinks = [
    { href: "/", text: "Beranda" },
    { href: "/berita", text: "Berita" },
  ];
  return (
    <>
      <HeroSub
        title="Berita Desa"
        description="Dapatkan informasi terbaru mengenai kegiatan, pengumuman, dan berita seputar Desa Pameutingan."
        breadcrumbLinks={breadcrumbLinks}
      />
      <section className="flex flex-wrap justify-center dark:bg-darkmode">
        <div className="container px-4">
          <div className="grid grid-cols-12 lg:px-4 px-0 gap-7">
            {posts.map((blog, i) => (
              <div key={i} className="w-full lg:col-span-4 md:col-span-6 col-span-12">
                <BeritaList blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Berita;
