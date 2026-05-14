import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative h-10 w-10 flex-shrink-0">
        <Image
          src="/images/logo/logo-desa.svg"
          alt="Logo Desa Pameutingan"
          fill
          className="object-contain"
          quality={100}
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-medium tracking-tight text-black dark:text-white">
          Pameutingan
        </span>
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary">
          Tasikmalaya
        </span>
      </div>
    </Link>
  );
};

export default Logo;
