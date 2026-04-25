"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import FullscreenMenu from "./FullscreenMenu";

export default function ScrollTriggeredNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) return;
      const scrollThreshold = window.innerHeight * 4;
      setIsVisible(window.scrollY >= scrollThreshold);
    };

    if (!isHomePage) setIsVisible(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <>
      {/*
        ── WHY AnimatePresence is NOT inside this div ──────────────────────────
        This div has `translate-y-*` (a CSS transform). Any child with
        `position: fixed` gets clipped to this element instead of the viewport.
        FullscreenMenu uses `fixed inset-0` so it MUST live outside here.
        ────────────────────────────────────────────────────────────────────────
      */}
      <div
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        <Navbar menuOpen={menuOpen} onMenuToggle={setMenuOpen} />
      </div>

      {/* Spacer — only on non-home pages */}
      {!isHomePage && <div className="h-[80px]" />}

      {/*
        FullscreenMenu rendered here as a sibling — outside the transformed
        div above — so its `fixed inset-0` covers the true full viewport.
      */}
      <AnimatePresence>
        {menuOpen && <FullscreenMenu close={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}