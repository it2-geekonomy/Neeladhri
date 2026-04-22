"use client";

import { forwardRef } from "react";

const DiningRoom = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/sections/di.png)" }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-screen">
        <h1
          className="text-center font-light leading-[1.1] tracking-[-0.02em] text-white text-[clamp(2.5rem,6vw,5rem)]"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
        >
          Dining Room
        </h1>
      </div>
    </div>
  );
});

DiningRoom.displayName = "DiningRoom";

export default DiningRoom;
