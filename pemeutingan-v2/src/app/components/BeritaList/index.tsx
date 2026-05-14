import { Berita } from "@/app/types/berita";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const BeritaList = ({ blog }: { blog: Berita }) => {
  const { title, coverImage, excerpt, date, slug } = blog;

  return (
    <div
      className="group mb-10 relative"
    >
      <div className="mb-8 overflow-hidden rounded">
        <Link href={`/berita/${slug}`} aria-label="blog cover" className="block h-72">
          <Image
            src={coverImage!}
            alt="image"
            className="w-full transition group-hover:scale-125 h-full object-cover"
            width={408}
            height={272}
            style={{ width: '100%', height: 'auto' }}
            quality={100}
          />
        </Link>
      </div>
      <div>
        <h3>
          <Link
            href={`/berita/${slug}`}
            className="mb-4 inline-block font-semibold text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary text-xl"
          >
            {title}
          </Link>
        </h3>
        <span className="text-xs font-semibold leading-loose text-black/50 dark:text-white/50">
          {format(new Date(date), "dd MMM yyyy")}
        </span>
      </div>
    </div>
  );
};
export default BeritaList;
