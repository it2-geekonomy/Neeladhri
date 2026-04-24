"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import FullscreenMenu from "./FullscreenMenu";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/lib/Typography";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Suppress removeChild/insertBefore errors (GSAP pin + React unmount on navigation)
  useEffect(() => {
    const isDomNodeError = (msg: string | undefined) =>
      typeof msg === "string" &&
      (msg.includes("removeChild") || msg.includes("insertBefore")) &&
      msg.includes("not a child");

    const handleErrorEvent = (e: ErrorEvent | Event) => {
      const msg: string | undefined = e instanceof ErrorEvent ? e.message : undefined;
      if (isDomNodeError(msg)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return true;
      }
    };

    const prevOnError = window.onerror;
    window.onerror = (message, ...rest) => {
      if (isDomNodeError(typeof message === "string" ? message : undefined)) return true;
      return prevOnError ? (prevOnError as (...a: unknown[]) => boolean)(message, ...rest) : false;
    };

    window.addEventListener("error", handleErrorEvent, true);
    return () => {
      window.onerror = prevOnError;
      window.removeEventListener("error", handleErrorEvent, true);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Collection", href: "/collection" },
    { name: "Brands", href: "/brands" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full flex items-center justify-between pl-2 pr-2 sm:pl-3 sm:pr-3 md:pl-4 md:pr-4 lg:pl-4 lg:pr-4 xl:pl-6 xl:pr-6 z-[10000] bg-white"
      >
        {/* Left: Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            priority
            className="w-24 h-12 sm:w-28 sm:h-14 md:w-32 md:h-16 lg:w-40 lg:h-20 xl:w-48 xl:h-24 object-contain"
          />
        </Link>

        {/* Right: Navlinks (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-4 gap-6 md:gap-6 lg:gap-8 text-black">
          {/* Luxury Button - shown on all pages */}
          <Link
            href={pathname === "/luxury" ? "/" : "/luxury"}
            className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-4xl text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#190B0BCC" }}
          >
            <Typography variant="h3" className="font-light text-white">
              {pathname === "/luxury" ? "Premium" : "Luxury"}
            </Typography>
          </Link>

          {/* Desktop Navlinks - hidden below 1024px */}
          <nav className="hidden lg:flex items-center gap-6 md:gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors"
              >
                <Typography variant="h3" className="tracking-wide font-normal hover:text-[#F79440]">
                  {link.name}
                </Typography>
              </Link>
            ))}
          </nav>

          {/* Hamburger - visible below 1024px */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-2xl sm:text-3xl pointer-events-auto touch-manipulation"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <FullscreenMenu close={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}