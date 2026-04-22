"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import FullscreenMenu from "./FullscreenMenu";
import Image from "next/image";
import Link from "next/link";

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

  const getPageName = () => {
    if (pathname === "/") return "Home";
    return pathname
      .replace("/", "")
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 z-[9999] bg-white"
      >
        {/* Left: Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            priority
            className="w-24 h-8 sm:w-28 sm:h-9 md:w-32 md:h-10 lg:w-[120px] lg:h-[40px] object-contain"
          />
        </Link>

        {/* Right: Page name + Hamburger */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 text-black">
          <span className="text-sm sm:text-base md:text-lg tracking-wide truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">
            {getPageName()}
          </span>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-2xl sm:text-3xl pointer-events-auto touch-manipulation"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.div>

      {open && <FullscreenMenu close={() => setOpen(false)} />}
    </div>
  );
}


// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { usePathname } from "next/navigation";
// import FullscreenMenu from "./FullscreenMenu";
// import Image from "next/image";
// import Link from "next/link";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const pathname = usePathname();

//   // Suppress removeChild/insertBefore errors (GSAP pin + React unmount on navigation)
//   useEffect(() => {
//     const isDomNodeError = (msg: string | undefined) =>
//       typeof msg === "string" &&
//       (msg.includes("removeChild") || msg.includes("insertBefore")) &&
//       msg.includes("not a child");

//     const handleErrorEvent = (e: ErrorEvent | Event) => {
//       const msg: string | undefined = e instanceof ErrorEvent ? e.message : undefined;
//       if (isDomNodeError(msg)) {
//         e.preventDefault();
//         e.stopImmediatePropagation();
//         return true;
//       }
//     };

//     const prevOnError = window.onerror;
//     window.onerror = (message, ...rest) => {
//       if (isDomNodeError(typeof message === "string" ? message : undefined)) return true;
//       return prevOnError ? (prevOnError as (...a: unknown[]) => boolean)(message, ...rest) : false;
//     };

//     window.addEventListener("error", handleErrorEvent, true);
//     return () => {
//       window.onerror = prevOnError;
//       window.removeEventListener("error", handleErrorEvent, true);
//     };
//   }, []);

//   // Show navbar during hero scroll animation (0-400vh), hide after zoom
//   useEffect(() => {
//     const HERO_SCROLL_VH = 400;
    
//     const onScroll = () => {
//       const scrollY = window.scrollY;
//       const heroScrollPx = (HERO_SCROLL_VH / 100) * window.innerHeight;
      
//       // Show navbar during hero scroll, hide after
//       if (scrollY < heroScrollPx) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll(); // Check initial state

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//     };
//   }, []);

//   const getPageName = () => {
//     if (pathname === "/") return "Home";
//     return pathname
//       .replace("/", "")
//       .replace("-", " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   return (
//     <div>
//       <AnimatePresence>
//         {isVisible && (
//           <motion.div
//             initial={{ y: -100 }}
//             animate={{ y: 0 }}
//             exit={{ y: -100 }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 z-[9999] bg-white"
//           >
//             {/* Left: Logo */}
//             <Link href="/" className="flex items-center shrink-0">
//               <Image
//                 src="/logo.png"
//                 alt="Logo"
//                 width={120}
//                 height={40}
//                 priority
//                 className="w-24 h-8 sm:w-28 sm:h-9 md:w-32 md:h-10 lg:w-[120px] lg:h-[40px] object-contain"
//               />
//             </Link>

//             {/* Right: Page name + Hamburger */}
//             <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 text-black">
//               <span className="text-sm sm:text-base md:text-lg tracking-wide truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">
//                 {getPageName()}
//               </span>
//               <button
//                 type="button"
//                 aria-label={open ? "Close menu" : "Open menu"}
//                 onClick={() => setOpen((prev) => !prev)}
//                 className="min-w-[44px] min-h-[44px] flex items-center justify-center text-2xl sm:text-3xl pointer-events-auto touch-manipulation"
//               >
//                 {open ? "✕" : "☰"}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {open && <FullscreenMenu close={() => setOpen(false)} />}
//     </div>
//   );
// }