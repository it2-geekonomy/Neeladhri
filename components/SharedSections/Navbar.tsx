"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import FullscreenMenu from "./FullscreenMenu";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();

  // Convert pathname to display text
  const getPageName = () => {
    if (pathname === "/") return "Home";

    return pathname
      .replace("/", "")
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full flex items-center justify-between px-18 py-4 z-[9999] bg-white"
      >
        {/* LEFT SIDE - LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={90}
            height={30}
            priority
          />
        </Link>

        {/* RIGHT SIDE - Dynamic Page Name + Hamburger */}
        <div className="flex items-center gap-22 text-black">
          <span className="text-lg tracking-wide">
            {getPageName()}
          </span>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-3xl pointer-events-auto"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <FullscreenMenu close={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}