"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function TileAnimation() {
  const tileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;

    const HERO_SCROLL_VH = 400;
    const SECTION_HEIGHT_VH = 100;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through Kitchen, LivingRoom, Bathroom sections
      const heroScrollPx = (HERO_SCROLL_VH / 100) * windowHeight;
      const kitchenStart = heroScrollPx;
      const kitchenEnd = kitchenStart + windowHeight;
      const livingRoomEnd = kitchenEnd + windowHeight;
      const bathroomEnd = livingRoomEnd + windowHeight;

      let transform = "";
      let opacity = "0";

      if (scrollY < kitchenStart) {
        // Before Kitchen section - hide tile
        opacity = "0";
        transform = "translate(-50%, -50%) scale(0.5) rotate(0deg)";
      } else if (scrollY >= kitchenStart && scrollY < kitchenEnd) {
        // Kitchen section - tile enters from left
        const progress = (scrollY - kitchenStart) / (kitchenEnd - kitchenStart);
        const easedProgress = easeOutCubic(progress);
        opacity = String(easedProgress);
        const x = -50 + easedProgress * 50; // from -50% to 0%
        const rotation = easedProgress * 360;
        const scale = 0.5 + easedProgress * 0.5;
        transform = `translate(calc(-50% + ${x}vw), -50%) scale(${scale}) rotate(${rotation}deg)`;
      } else if (scrollY >= kitchenEnd && scrollY < livingRoomEnd) {
        // LivingRoom section - tile moves left to right
        const progress = (scrollY - kitchenEnd) / (livingRoomEnd - kitchenEnd);
        opacity = "1";
        const x = progress * 100; // from 0% to 100%
        const rotation = 360 + progress * 360;
        const scale = 1 + progress * 0.2;
        transform = `translate(calc(-50% + ${x}vw), -50%) scale(${scale}) rotate(${rotation}deg)`;
      } else if (scrollY >= livingRoomEnd && scrollY < bathroomEnd) {
        // Bathroom section - tile flips and moves up
        const progress = (scrollY - livingRoomEnd) / (bathroomEnd - livingRoomEnd);
        const easedProgress = easeInOutElastic(progress);
        opacity = String(1 - progress * 0.5);
        const x = 100 - progress * 100; // back to center
        const y = -progress * 50; // move up
        const rotationY = progress * 180;
        const rotationX = progress * 180;
        const scale = 1.2 - progress * 0.4;
        transform = `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh)) scale(${scale}) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
      } else {
        // After Bathroom section - hide
        opacity = "0";
        transform = "translate(-50%, -50%) scale(0.8) rotateY(180deg) rotateX(180deg)";
      }

      tile.style.opacity = opacity;
      tile.style.transform = transform;
    };

    // Easing functions
    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function easeInOutElastic(t: number): number {
      const c = Math.max(0, Math.min(1, t));
      if (c === 0 || c === 1) return c;
      return c < 0.5
        ? -(Math.pow(2, 8 * c - 1) * Math.sin((4 * c - 1) * Math.PI / 4.5)) / 2
        : (Math.pow(2, -8 * c + 1) * Math.sin((4 * c - 1) * Math.PI / 4.5)) / 2 + 1;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="relative pointer-events-none">
      <div
        ref={tileRef}
        className="fixed top-1/2 left-1/2 z-[100] transition-transform will-change-transform"
        style={{ width: "200px", height: "200px", opacity: 0 }}
      >
        <Image
          src="/sections/tile.png"
          alt="Premium Tile"
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          style={{
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
          }}
        />
      </div>
    </div>
  );
}

