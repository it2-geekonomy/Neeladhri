"use client";

import Typography from "@/lib/Typography";
import Image from "next/image";

export default function InsightsHero() {
  return (
    <section className="w-full flex justify-center bg-white py-10">
      
      {/* Container to match centered boxed layout */}
      <div className="relative w-[95%] max-w-[1400px] aspect-[16/9] overflow-hidden">

        {/* Dummy Image (replace later) */}
        <Image
          src="/Blog/Blog_Banner.webp"
          alt="Interior Background"
          fill
          priority
          className="object-cover"
        />

        {/* Optional Soft Overlay */}
        <div className="absolute inset-0" />

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <Typography variant="display-2xl" className="text-[#2D200A] font-normal leading-snug max-w-[700px]">
            Latest Insights On Tiles,
            <br />
            Interiors And Design.
          </Typography>
        </div>
      </div>
    </section>
  );
}