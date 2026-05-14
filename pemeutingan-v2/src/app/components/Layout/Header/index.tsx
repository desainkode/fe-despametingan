"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { headerData } from "./Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeaderLink from "./Navigation/MobileHeaderLink";
import Signin from "@/app/components/Auth/SignIn";

import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { signOut, useSession } from 'next-auth/react'
import Image from "next/image";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  }, [navbarOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
    setUser(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (isSignInOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, navbarOpen]);

  return (
    <header
      className={`fixed top-0 py-1 z-50 w-full bg-transparent transition-all ${sticky ? "shadow-lg bg-white dark:bg-darklight" : "shadow-none"
        }`}
    >
      <div
        className={`container mx-auto lg:max-w-xl md:max-w-screen-md flex items-center justify-between  xl:gap-15 gap-10 duration-300 px-4 ${sticky ? "py-3" : "py-6"
          }`}
      >
        <Logo />
        <ul className="hidden xl:flex flex-grow items-center justify-start gap-10 ">
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </ul>
        <div className="flex items-center gap-4">
          {/* Theme Toggler */}
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center text-body-color duration-300 hover:cursor-pointer hover:text-primary dark:text-white bg-gray-100 dark:bg-darklight p-2.5 rounded-xl outline-none active:scale-95"
          >
            <Icon
              icon="solar:sun-2-bold"
              width="22"
              height="22"
              className="hidden dark:block"
            />
            <Icon
              icon="solar:moon-bold"
              width="22"
              height="22"
              className="dark:hidden block"
            />
          </button>

          <Link
            href={session?.user || user?.user ? "/layanan" : "/layanan-masyarakat/signin"}
            className="hidden xl:flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-hover border border-primary transition-all duration-300 shadow-lg shadow-primary/20 text-sm font-medium active:scale-95"
          >
            Layanan
            <span className="flex items-center justify-center w-[18px] h-[18px]">
                <Icon icon="solar:arrow-right-up-bold" width="18" height="18" />
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex xl:hidden h-11 w-11 items-center justify-center rounded-xl bg-gray-100 dark:bg-darklight text-primary transition-all active:scale-95"
            aria-label="Toggle mobile menu"
          >
            {navbarOpen ? (
              <Icon icon="ph:x-bold" width="24" height="24" />
            ) : (
              <Icon icon="ph:list-bold" width="24" height="24" />
            )}
          </button>
        </div>
      </div>
      {navbarOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40" />
      )}
      <div
        ref={mobileMenuRef}
        className={`xl:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-darklight shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <Logo />
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label="Close mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="dark:text-midnight_text"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-start p-4">
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
          <div className="mt-6 w-full px-2">
            <Link
              href={session?.user || user?.user ? "/layanan" : "/layanan-masyarakat/signin"}
              className="flex h-12 w-full items-center justify-center bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95"
              onClick={() => {
                setNavbarOpen(false);
              }}
            >
              Layanan Masyarakat
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
