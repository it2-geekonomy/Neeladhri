"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/lib/Typography";

const BRAND_IMAGES = [
  "/Brands/main111.png",
  "/Brands/main12.png",
  "/Brands/main13.png",
  "/Brands/main14.png",
  "/Brands/main15.png",
  "/Brands/main16.png",
  "/Brands/main17.png",
  "/Brands/main18.png",
  "/Brands/main19.png",
  "/Brands/main20.png",
  "/Brands/main21.png",
];

const BRAND_NAMES = [
  "AUGA", "Simpolo", "Bellissimo", "Roca", "Hansgrohe",
  "Carysil", "Smack", "IFB", "Häfele", "3M Water Purifiers", "Wesmarc",
];

const BRAND_ROUTES = [
  "/brands/auga", "/brands/simpolo", "/brands/bellissimo", "/brands/roca",
  "/brands/hansgrohe", "/brands/carysil", "/brands/smack", "/brands/ifb",
  "/brands/hafele", "/brands/3m-water-purifiers", "/brands/wesmarc",
];

export default function BrandsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId: number;
    const animate = () => {
      if (!isHoveredRef.current && !isDraggingRef.current) {
        const maxScroll = el.scrollWidth / 2;
        posRef.current += 1;
        if (posRef.current >= maxScroll) posRef.current = 0;
        el.scrollLeft = posRef.current;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Sync scroll position with animation position
  const syncScrollPosition = () => {
    if (scrollRef.current) {
      posRef.current = scrollRef.current.scrollLeft;
    }
  };

  // Update hover handlers to immediately sync position
  const handleMouseEnter = () => {
    syncScrollPosition();
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    syncScrollPosition();
    isHoveredRef.current = false;
  };

  // Drag on the container (empty space between cards)
  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const delta = dragStartXRef.current - e.clientX;
    if (Math.abs(delta) > 3) hasDraggedRef.current = true;
    const newScroll = dragStartScrollRef.current + delta;
    scrollRef.current.scrollLeft = newScroll;
    posRef.current = newScroll;
  };

  const onMouseUp = () => { isDraggingRef.current = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartScrollRef.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const delta = dragStartXRef.current - e.touches[0].clientX;
    if (Math.abs(delta) > 3) hasDraggedRef.current = true;
    const newScroll = dragStartScrollRef.current + delta;
    scrollRef.current.scrollLeft = newScroll;
    posRef.current = newScroll;
  };

  const onTouchEnd = () => { isDraggingRef.current = false; };

  const allImages = [...BRAND_IMAGES, ...BRAND_IMAGES];

  return (
    <section className="relative w-full mt-2 h-screen">
      <div className="absolute inset-0 z-0">
        <Image src="/Brands/brandbg1.png" alt="Background" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div
        ref={scrollRef}
        className="relative z-10 w-full h-full flex items-center overflow-x-auto cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", userSelect: "none" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
          {allImages.map((src, index) => (
            <Link
              key={`brand-${index}`}
              href={BRAND_ROUTES[index % BRAND_ROUTES.length]}
              draggable={false}
              onClick={(e) => { if (hasDraggedRef.current) e.preventDefault(); }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="flex-shrink-0 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] relative border-2 border-white rounded-4xl overflow-hidden"
            >
              <Image
                src={src}
                alt={`Brand ${(index % BRAND_IMAGES.length) + 1}`}
                fill
                draggable={false}
                className="object-contain"
              />
              <div className="absolute inset-0 bg-black/40 z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Typography variant="display-xl" className="text-white text-xl font-light text-center px-2">
                  {BRAND_NAMES[index % BRAND_NAMES.length]}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}