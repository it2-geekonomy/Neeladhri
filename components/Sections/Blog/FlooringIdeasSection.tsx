"use client";

import Typography from "@/lib/Typography";
import Image from "next/image";

export default function FlooringIdeasSection() {
  return (
    <section className="w-full py-8 lg:py-16 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">

        {/* LEFT IMAGE */}
        <div className="relative mx-auto size-72 md:size-80
                        xl:size-auto xl:w-full xl:h-[clamp(24rem,58vw,54rem)]
                        2xl:h-[clamp(28rem,42vw,43rem)]">
          <Image
            src="/Blog/Blog1.webp"
            alt="Flooring Living Room"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-6">

          {/* Heading */}
          <Typography variant="display-xl" className="font-normal leading-tight text-center">
            Flooring Ideas for
            <br />
            Contemporary Living Rooms
          </Typography>

          {/* Paragraphs */}
          <div className="space-y-5 leading-relaxed">
            <Typography variant="body-lg">
              Transforming your living room into a contemporary haven often
              begins from the ground up, with the right flooring setting the
              stage for the entire interior design. This article explores a
              myriad of flooring ideas to help you create an elegant living
              room that reflects modern aesthetics and functional needs.
            </Typography>

            <Typography variant="body-lg">
              Importance of Choosing the Right Flooring
              <br />
              Choosing the right flooring for your living room is paramount
              as it significantly impacts the overall aesthetic and
              functionality of the space. The floor design dictates the mood
              and style, influencing everything from furniture choices to
              decor accents. The perfect living room flooring not only
              enhances visual appeal but also contributes to the comfort and
              practicality of this central living area.
            </Typography>
          </div>

          {/* BOTTOM RIGHT IMAGE */}
          <div className="relative w-full aspect-video mt-4
                xl:aspect-auto xl:h-[clamp(20rem,20vw,20rem)]
                2xl:h-[clamp(16rem,16vw,16rem)]">
            <Image
              src="/Blog/Blog2.webp"
              alt="Modern Living Interior"
              fill
              className="object-contain xl:object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}