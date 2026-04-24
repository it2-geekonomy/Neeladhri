"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Typography from "@/lib/Typography";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Collection", href: "/collection" },
  { name: "Brands", href: "/brands" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function FullscreenMenu({ close }: { close: () => void }) {
  return (
    <div className="fixed inset-0 z-[10001] overflow-hidden">
      {/* Left Curtain — slides in from left */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
        style={{ originX: 0 }}
        className="absolute top-0 left-0 h-full w-1/2 bg-white z-10"
      />

      {/* Right Curtain — slides in from right */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
        style={{ originX: 1 }}
        className="absolute top-0 right-0 h-full w-1/2 bg-white z-10"
      />

      {/* Nav Links Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.4,
            duration: 0.3,
          },
        }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-20"
      >
        {navLinks.map((link, index) => (
          <motion.div
            key={link.name}
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.5 + index * 0.1,
                duration: 0.5,
                ease: [0.77, 0, 0.175, 1],
              },
            }}
            exit={{ y: 100, opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <Link
              href={link.href}
              onClick={close}
              className="transition-colors"
            >
              <Typography variant="display-xl" className="font-semibold text-[#F79440] hover:text-orange-500">
                {link.name}
              </Typography>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.8 }}
        onClick={close}
        className="absolute top-6 right-6 z-30 text-4xl text-black hover:text-gray-600 transition-colors"
        aria-label="Close menu"
      >
        ✕
      </motion.button>
    </div>
  );
}