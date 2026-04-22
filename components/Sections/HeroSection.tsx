// "use client";

// import { useEffect, useRef, useState } from "react";
// import Kitchen from "./Kitchen";

// export default function DoorEntryAnimation() {
//   const bgRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const roomSectionRef = useRef<HTMLDivElement>(null);
//   const [entered, setEntered] = useState(false);

//   useEffect(() => {
//     const bg = bgRef.current;
//     const content = contentRef.current;
//     const roomSection = roomSectionRef.current;
//     if (!bg || !content || !roomSection) return;

//     const onScroll = () => {
//       const scrollY = window.scrollY;
//       const maxScroll = window.innerHeight * 3;
//       const progress = Math.min(scrollY / maxScroll, 1);
      
//       // Zoom background from scale 1 to 4
//       const scale = 1 + progress * 3;
//       bg.style.transform = `scale(${scale})`;
      
//       // Fade out content
//       content.style.opacity = String(1 - progress * 2);

//       // Show room section after scroll completes
//       if (progress >= 0.95 && !entered) {
//         setEntered(true);
//       }
//       if (progress < 0.9 && entered) {
//         setEntered(false);
//       }

//       // Update room section visibility
//       if (entered) {
//         roomSection.style.display = "flex";
//         roomSection.style.opacity = String(Math.min(1, (progress - 0.9) * 10));
//       } else {
//         roomSection.style.display = "none";
//       }
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//     };
//   }, [entered]);

//   return (
//     <>
//       {/* Scroll spacer (drives zoom via scrollY) */}
//       <div className="h-[450vh] relative z-0" />

//       {/* Background image with zoom animation */}
//       <div 
//         ref={bgRef}
//         className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform ease-out origin-center"
//         style={{ backgroundImage: "url(/Ndoor.png)", transitionDuration: "0.1s", backgroundPosition: "center 40px" }}
//       />

//       {/* Content at bottom center */}
//       <div 
//         ref={contentRef}
//         className="fixed inset-0 z-10 flex flex-col items-center justify-end pointer-events-none transition-opacity duration-300"
//       >
//         <h1 className="text-center text-white font-bold leading-[1.1] tracking-[0.05em] mb-4 text-[clamp(2rem,6vw,4rem)]" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
//           PORTAL TO NEELADHRI CERAMICS
//         </h1>
//         <p className="text-center font-light leading-[1.1] tracking-[0.2em] uppercase text-white/90 text-[clamp(0.8rem,1.5vw,1rem)]" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
//           Scroll to Explore
//         </p>
//       </div>

//       {/* Room section that appears after scroll */}
//       <Kitchen ref={roomSectionRef} />
//     </>
// )}
"use client";
import { useEffect, useRef } from "react";
import Kitchen from "./Kitchen";
import LivingRoom from "./LivingRoom";
import Bathroom from "./Bathroom";
import DiningRoom from "./DiningRoom";
import TileAnimation from "./TileAnimation";

/**
 * HOW THIS WORKS — read before editing
 * ─────────────────────────────────────
 * The page layout in normal document flow is:
 *
 *   ┌─────────────────────────────┐  ← scrollY = 0
 *   │   400vh invisible spacer    │    (this is what the hero zoom "uses")
 *   ├─────────────────────────────┤  ← scrollY = 400vh
 *   │   Kitchen   (100vh)         │    normal section
 *   ├─────────────────────────────┤  ← scrollY = 500vh
 *   │   Living Room  (100vh)      │    normal section
 *   └─────────────────────────────┘
 *
 * On TOP of all of this (position:fixed, z-index:50) sits the hero overlay:
 *   • Hero background image — zooms from scale(1) → scale(5) as user scrolls
 *     through the 400vh spacer. At scroll end it has faded to opacity:0.
 *   • Hero text — fades out at the start of scrolling.
 *   • pointer-events:none so it never blocks the content underneath.
 *
 * When the user has scrolled 400vh, the hero overlay is fully transparent.
 * The Kitchen section is now naturally at the top of the viewport.
 * The user just keeps scrolling normally — Kitchen → Living Room.
 *
 * NO phase switching. NO scroll position jumping. NO hacks.
 * Reverse scroll works automatically (overlay fades back in).
 */

const ZOOM_SCROLL_VH = 400; // vh units of scroll that drive the hero zoom

function easeInOut(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c < 0.5 ? 2 * c * c : 1 - Math.pow(-2 * c + 2, 2) / 2;
}

export default function HeroSection() {
  const heroBgRef   = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zoomPx = (ZOOM_SCROLL_VH / 100) * window.innerHeight;

    const onScroll = () => {
      const raw = Math.min(Math.max(window.scrollY / zoomPx, 0), 1);
      const p   = easeInOut(raw); // smoothed progress 0 → 1

      // ── Hero background: zoom 1 → 5
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `scale(${1 + p * 4})`;
      }

      // ── Hero text: fade out in first 25% of scroll
      if (heroTextRef.current) {
        const textP = easeInOut(Math.min(raw / 0.25, 1));
        heroTextRef.current.style.opacity = `${1 - textP}`;
      }

      // ── Whole overlay: start fading at 70%, fully gone at 100%
      if (overlayRef.current) {
        const fadeP = easeInOut(Math.max(0, (raw - 0.7) / 0.3));
        overlayRef.current.style.opacity = `${1 - fadeP}`;
        // Once invisible, disable pointer-events (already none but be explicit)
        overlayRef.current.style.pointerEvents = fadeP >= 1 ? "none" : "none";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── 1. FIXED HERO OVERLAY (sits above everything, fades out) ─────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 50 }}
      >
        {/* Background image that zooms */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 bg-cover bg-no-repeat origin-center"
          style={{
            backgroundImage: "url(/Ndoor.png)",
            backgroundPosition: "center 40px",
            willChange: "transform",
          }}
        />

        {/* Hero text */}
        <div
          ref={heroTextRef}
          className="absolute inset-0 flex flex-col items-center justify-end"
        >
          <h1
            className="text-center text-white font-bold tracking-[0.06em] mb-3 text-[clamp(1.8rem,5.5vw,4rem)]"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}
          >
            PORTAL TO NEELADHRI CERAMICS
          </h1>
          <p
            className="text-center font-light tracking-[0.22em] uppercase text-white/75 text-[clamp(0.7rem,1.3vw,0.95rem)] mb-10"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            Scroll to Explore
          </p>
        </div>
      </div>

      {/* ── 2. SCROLL SPACER — gives the zoom animation its scroll distance ─ */}
      <div style={{ height: `${ZOOM_SCROLL_VH}vh` }} aria-hidden="true" />

      {/* ── TILE ANIMATION — premium tile that animates across sections ─ */}
      <TileAnimation />

      {/* ── 3. NORMAL SECTIONS — in document flow, scroll naturally ──────── */}

      {/* Kitchen */}
    <Kitchen />

    {/* Living Room */}
    <LivingRoom />

    {/* Bathroom */}
    <Bathroom />

    {/* Dining Room */}
    <DiningRoom />

     
    </>
  );
}