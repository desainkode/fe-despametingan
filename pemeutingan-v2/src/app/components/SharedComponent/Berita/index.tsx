import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BeritaCard from "./BeritaCard";
import { getAllPosts } from "@/utils/markdown";

const Berita: React.FC = () => {
  const posts = getAllPosts([
    "title",
    "date",
    "excerpt",
    "coverImage",
    "slug",
  ]).slice(0, 3);

  return (
    <section
      className="flex flex-wrap justify-center dark:bg-darkmode"
      id="berita"
    >
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <div className="flex items-baseline justify-between flex-wrap">
          <h2
            className="sm:mb-11 mb-3 text-4xl font-bold text-midnight_text dark:text-white"
          >
            Berita & Artikel Terbaru
          </h2>
          <Link
            href="/berita"
            className="flex items-center gap-3 text-base text-midnight_text dark:text-white hover:dark:text-primary font-medium hover:text-primary sm:pb-0 pb-3"
          >
            Lihat Semua Berita
            <span>
              <Icon icon="solar:arrow-right-outline" width="30" height="30" />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-7">
          {posts.map((blog, i) => (
            <div
              key={i}
              className="w-full md:col-span-4 sm:col-span-6 col-span-12"
            >
              <BeritaCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Berita;
