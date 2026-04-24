"use client";

import Image from "next/image";
import Typography from "@/lib/Typography";
import { useRef, useState, useEffect } from "react";

const IMAGES = [
  "/collections/allied1.png",
  "/collections/allied2.png",
  "/collections/allied3.png",
  "/collections/allied1.png",
  "/collections/allied2.png",
  "/collections/allied3.png",
  "/collections/allied1.png",
];

const GAP = 12;
// Layout: side=20%, center=60% (sides are narrower, center is wider)
const SIDE_RATIO = 0.20;
const CENTER_RATIO = 0.60;

export default function AlliedAccessories() {
  const [index, setIndex] = useState(0);
  const dragStart = useRef<number | null>(null);
  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setCw(el.offsetWidth);
    const ro = new ResizeObserver(() => setCw(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // sideW + GAP + centerW + GAP + sideW = cw
  // 2*sideW + centerW + 2*GAP = cw
  const sideW = cw > 0 ? (cw - 2 * GAP) * SIDE_RATIO : 0;
  const centerW = cw > 0 ? (cw - 2 * GAP) * CENTER_RATIO : 0;

  const getW = (i: number) => (i === index + 1 ? centerW : sideW);

  const getTranslateX = () => {
    let left = 0;
    for (let i = 0; i < index + 1; i++) {
      left += getW(i) + GAP;
    }
    return -(left) + sideW + GAP;
  };

  const translateX = cw > 0 ? getTranslateX() : 0;

  const goTo = (next: number) => {
    if (isAnimating.current) return;
    const clamped = Math.max(0, Math.min(IMAGES.length - 3, next));
    setIndex(clamped);
    isAnimating.current = true;
    setTimeout(() => { isAnimating.current = false; }, 300);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const delta = dragStart.current - e.clientX;
    if (delta > 40) goTo(index + 1);
    else if (delta < -40) goTo(index - 1);
    dragStart.current = null;
  };

  return (
    <div className="mt-2 pb-14 select-none">
      <Typography
        variant="display-3xl"
        className="text-[#F79440] font-normal mb-4 text-center"
      >
        Allied Accessories
      </Typography>

      {/* Viewport */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: "75vh" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {cw > 0 && (
          <div
            className="flex h-full items-stretch"
            style={{
              gap: GAP,
              transform: `translateX(${translateX}px)`,
              transition: "transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {IMAGES.map((src, i) => {
              const w = getW(i);
              return (
                <div
                  key={i}
                  className="relative flex-shrink-0 h-full"
                  style={{
                    width: w,
                    transition: "width 0s",
                    border: "2px solid #A98F76",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Allied Accessories ${i + 1}`}
                    fill
                    draggable={false}
                    style={{
                      objectFit: i === index + 1 ? "fill" : "cover",
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}