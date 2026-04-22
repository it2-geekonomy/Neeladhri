"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface HoverFillTextProps {
  text: string;
  href: string;
  closeMenu: () => void;
  exitDuration?: number;
}

export default function HoverFillText({
  text,
  href,
  closeMenu,
}: HoverFillTextProps) {
  const [hovered, setHovered] = useState(false);
  const fillDuration = 0.4;

  const handleClick = () => {
    setHovered(true);
    closeMenu();
    // Full-page navigation so redirect always completes (avoids removeChild blocking SPA transition)
    requestAnimationFrame(() => {
      if (window.location.pathname === href) {
        window.location.reload();
      } else {
        window.location.href = href;
      }
    });
  };

  return (
    <button
      type="button"
      className="relative inline-block cursor-pointer text-left bg-transparent border-none p-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Outline Text */}
      <span
        className="text-4xl md:text-[80px] font-bold tracking-tight text-transparent select-none"
        style={{ WebkitTextStroke: "1px white" }}
      >
        {text}
      </span>

      {/* Fill Layer */}
      <motion.span
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: hovered ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: fillDuration, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 text-white pointer-events-none"
      >
        <span className="text-4xl md:text-[80px] font-bold tracking-tight block">
          {text}
        </span>
      </motion.span>
    </button>
  );
}