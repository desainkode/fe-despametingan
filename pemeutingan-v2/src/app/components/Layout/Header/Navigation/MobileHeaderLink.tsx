import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };
  const path = usePathname();

  return (
    <div className="relative w-full">
      {item.submenu ? (
        <button
          onClick={handleToggle}
          className={cn(
            "flex items-center justify-between w-full py-4 text-lg font-medium transition-all",
            path === item.href || item.submenu?.some(sub => path === sub.href)
              ? "text-primary"
              : "text-black dark:text-white"
          )}
        >
          {item.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
            className={cn("transition-transform duration-300", submenuOpen && "rotate-180")}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 10l5 5l5-5"
            />
          </svg>
        </button>
      ) : (
        <Link
          href={item.href}
          className={cn(
            "block w-full py-4 text-lg font-medium transition-all",
            path === item.href ? "text-primary" : "text-black dark:text-white"
          )}
        >
          {item.label}
        </Link>
      )}

      {submenuOpen && item.submenu && (
        <div className="flex flex-col gap-1 border-l-2 border-gray-100 dark:border-white/10 ml-2 pl-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={cn(
                "block py-2 text-base font-normal transition-colors",
                path === subItem.href ? "text-primary" : "text-gray-500 dark:text-gray-400"
              )}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
