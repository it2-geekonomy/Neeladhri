

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scaleOnScroll = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

  const duration = 1.4;

  return (
    <section
      ref={ref}
      className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-white"
    >
      {/* BACKGROUND IMAGE */}
      <motion.div
        style={{ y: bgY, scale: scaleOnScroll }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.15 }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/demo.avif')" }}
        />
      </motion.div>

      {/* WHITE CURTAIN PANELS */}

      {/* PANEL 1 */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{
          duration,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute left-0 bottom-0 h-full w-1/3 bg-white z-20"
      />

      {/* PANEL 2 (starts at 30% of panel 1) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{
          duration,
          delay: duration * 0.3, // 30%
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute left-1/3 bottom-0 h-full w-1/3 bg-white z-20"
      />

      {/* PANEL 3 (starts at 20% of panel 2) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{
          duration,
          delay: duration * 0.3 + duration * 0.2, // 30% + 20%
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute right-0 bottom-0 h-full w-1/3 bg-white z-20"
      />

      {/* HERO CONTENT */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-30 text-center px-6 max-w-3xl flex flex-col items-center justify-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: "-100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
          className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white"
        >
          Building Modern Digital Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          className="text-lg md:text-xl text-white/80 leading-relaxed"
        >
          We create scalable, high-performance digital solutions that
          elevate brands and drive meaningful growth.
        </motion.p>
      </motion.div>
    </section>
  );
}