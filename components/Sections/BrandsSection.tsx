
"use client";

import { useRef, useEffect, useState } from "react";

export default function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [activeImage, setActiveImage] = useState<number | null>(null);

  const images = Array(12).fill("/demo.jpg");

  const GAP = 32;

  const isDragging = useRef(false);
  const lastX = useRef(0);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const isDesktop = window.innerWidth >= 1024;

    const imageWidth = isDesktop
      ? (el.clientWidth - GAP * 2) / 3
      : el.clientWidth;

    el.scrollBy({
      left:
        direction === "left"
          ? -(imageWidth + GAP)
          : imageWidth + GAP,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;

      const delta = e.clientX - lastX.current;
      scrollRef.current.scrollLeft -= delta;
      lastX.current = e.clientX;
      updateScrollState();
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "auto";
    };

    const el = scrollRef.current;
    el?.addEventListener("scroll", updateScrollState);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    updateScrollState();

    return () => {
      el?.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <section className="w-full bg-[#0d0d0d] py-20 border-t border-white/10 px-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-6">

          {/* LEFT ARROW */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`bg-[#090d12] text-2xl tracking-wide text-white rounded-full w-12 h-12 flex items-center justify-center transition ${
              !canScrollLeft
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white hover:text-black"
            }`}
          >
            &lt;
          </button>

          {/* CURVED GALLERY */}
          <div className="flex-1 overflow-hidden relative">

            <svg width="0" height="0">
              <defs>
                <clipPath id="galleryCurve" clipPathUnits="objectBoundingBox">
                  <path
                    d="
                      M0,0
                      Q0.5,0.08 1,0
                      L1,1
                      Q0.5,0.92 0,1
                      Z
                    "
                  />
                </clipPath>
              </defs>
            </svg>

            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              className="
                flex gap-8
                overflow-x-auto
                snap-x snap-mandatory
                no-scrollbar
                h-[300px] sm:h-[400px]
              "
              style={{
                clipPath: "url(#galleryCurve)",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  draggable={false}
                  alt={`Gallery ${index}`}
                  onClick={() => setActiveImage(index)}
                  className="
                    flex-shrink-0
                    snap-center
                    w-full
                    lg:w-[calc((100%-64px)/3)]
                    h-full
                    object-cover
                    select-none
                    cursor-pointer
                  "
                />
              ))}
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`bg-[#090d12] text-2xl tracking-wide text-white rounded-full w-12 h-12 flex items-center justify-center transition ${
              !canScrollRight
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white hover:text-black"
            }`}
          >
            &gt;
          </button>

        </div>
      </div>

      {/* POPUP */}
      {activeImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="w-full max-w-[900px] h-[500px]"
            style={{ clipPath: "url(#galleryCurve)" }}
          >
            <img
              src={images[activeImage]}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}