"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderItem } from "../../../../types/menu";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  const path = usePathname();

  return (
    <li
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`text-base flex items-center gap-1.5 font-normal transition-all duration-300 ${
          item.href === path || item.submenu?.some(sub => path === sub.href)
            ? "text-primary" 
            : "text-black dark:text-white hover:text-primary dark:hover:text-primary"
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
            className={`transition-transform duration-300 ${submenuOpen ? "rotate-180" : ""}`}
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
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <ul className="absolute left-0 top-full mt-2 w-60 origin-top-left rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black/5 dark:bg-darklight dark:ring-white/5 animate-in fade-in zoom-in-95 duration-200 before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']">
          {item.submenu.map((subItem, index) => (
            <li key={index}>
              <Link
                href={subItem.href}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  path === subItem.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-primary"
                }`}
              >
                {subItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default HeaderLink;
