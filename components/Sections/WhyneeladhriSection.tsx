// "use client";

// import { useRef, useEffect } from "react";
// import Image from "next/image";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Typography from "@/lib/Typography";

// gsap.registerPlugin(ScrollTrigger);

// export default function WhyneeladhriSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const mainBgRef = useRef<HTMLDivElement>(null);
//   const nextBgRef = useRef<HTMLDivElement>(null);
//   const tilesWrapRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const mainBg = mainBgRef.current;
//     const nextBg = nextBgRef.current;
//     const tilesWrap = tilesWrapRef.current;
//     const content = contentRef.current;

//     if (!section || !mainBg || !nextBg || !tilesWrap || !content) return;

//     // Initial states
//     gsap.set(mainBg, { opacity: 1 });
//     gsap.set(nextBg, { yPercent: 100 });
//     gsap.set(tilesWrap, { x: -120, opacity: 0 });
//     gsap.set(content, { x: -120, opacity: 0 });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: section,
//         start: "top top",
//         end: "+=200%",
//         pin: true,
//         scrub: 0.25,
//         anticipatePin: 0,
//       },
//     });

//     // STEP 1 → background change
//     tl.to(mainBg, {
//       opacity: 0,
//       duration: 1,
//       ease: "power2.out",
//     }).to(
//       nextBg,
//       {
//         yPercent: 0,
//         duration: 1,
//         ease: "power2.out",
//       },
//       "<"
//     );

//     // STEP 2 → tiles + content
//     tl.to(
//       tilesWrap,
//       {
//         x: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//       }
//     ).to(
//       content,
//       {
//         x: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//       },
//       "<"
//     );

//     const refresh = () => ScrollTrigger.refresh();
//     window.addEventListener("resize", refresh);

//     setTimeout(() => ScrollTrigger.refresh(), 200);

//     return () => {
//       window.removeEventListener("resize", refresh);
//       tl.scrollTrigger?.kill();
//       tl.kill();
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full h-screen overflow-hidden bg-neutral-100"
//     >
//       {/* Initial Background */}
//       <div ref={mainBgRef} className="absolute inset-0 z-0">
//         <Image
//           src="/whyneeladrisection/mainbg.png"
//           alt=""
//           fill
//           className="object-cover"
//         />

//         <div className="absolute inset-0 bg-white/25" />

//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
//           <Typography
//             variant="display-2xl"
//             className="text-neutral-900 tracking-wide"
//           >
//             Why Neeladhri Ceramics
//           </Typography>

//           <Typography
//             variant="body-xl"
//             className="text-neutral-700 font-light mt-3 max-w-xl"
//           >
//             Your trusted partner for quality ceramic solutions
//           </Typography>
//         </div>
//       </div>

//       {/* Second Background */}
//       <div ref={nextBgRef} className="absolute inset-0 z-[1]">
//         <Image
//           src="/whyneeladrisection/mainbg1.png"
//           alt=""
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Tiles Section */}
//       <div
//         ref={tilesWrapRef}
//         className="absolute inset-0 z-[2] flex items-center justify-center"
//       >
//         <div className="absolute inset-0">
//           <Image
//             src="/whyneeladrisection/tiles.png"
//             alt=""
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-white/25" />
//         </div>

//         <div
//           ref={contentRef}
//           className="relative z-10 flex flex-col items-center text-center px-6"
//         >
//           <Typography
//             variant="display-2xl"
//             className="text-neutral-900 tracking-wide"
//           >
//             Certified Quality
//           </Typography>

//           <Typography
//             variant="body-xl"
//             className="text-neutral-700 font-light mt-3 max-w-xl"
//           >
//             All products tested and certified for durability and safety
//           </Typography>
//         </div>
//       </div>
//     </section>
//   );
// }