"use client";

import Typography from "@/lib/Typography";

const Placeholder = () => <div className="w-full h-full bg-neutral-200" />;

export default function FlooringIdeas() {
  return (
    <section className="w-full py-12 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-10 xl:gap-8 items-start">

        {/* ── LEFT: TEXT CONTENT ── */}
        <div className="w-full xl:w-[38%] flex flex-col gap-6 xl:pt-4">
          <Typography
            variant="display-xl"
            className="font-normal leading-tight text-center xl:text-left"
          >
            Flooring Ideas for
            <br />
            Contemporary Living Rooms
          </Typography>

          <div className="space-y-5 leading-relaxed text-justify">
            <Typography variant="body-lg">
              <Typography variant="body-lg" className="block mb-1">
                Importance of Choosing the Right Flooring
              </Typography>
              Choosing the right flooring for your living room is paramount as
              it significantly impacts the overall aesthetic and functionality
              of the space. The floor design dictates the mood and style,
              influencing everything from the furniture choices to the decor
              accents. The perfect living room flooring not only enhances the
              visual appeal but also contributes to the comfort and practicality
              of this central living area. It's an investment that can truly
              transform your space, making it either a cozy retreat or a sleek,
              modern hub.
            </Typography>

            <Typography variant="body-lg">
              <Typography variant="body-lg" className="block mb-1">
                Overview of Living Room Flooring Materials
              </Typography>
              There's a vast array of living room flooring materials available,
              each offering unique benefits and styles. Traditional options like
              wooden flooring, including hardwood and engineered wood, provide a
              classic, warm aesthetic. Tile flooring, encompassing ceramic,
              porcelain, and vitrified tiles, offers incredible durability and
              versatility in tile designs. For those seeking modern flooring
              solutions, luxury vinyl flooring, laminate flooring, and even
              polished concrete floor options present compelling alternatives.
            </Typography>
          </div>
        </div>

       
        <div
          className="w-full xl:w-[62%] grid grid-cols-3 grid-rows-12 gap-1.5 md:gap-2"
          style={{ height: "clamp(500px, 65vw, 860px)" }}
        >
          {/* A1 – tall top, READ ARTICLE */}
          <div className="relative col-start-1 row-start-1 row-span-4 overflow-hidden">
            <Placeholder />
            {/* swap ↑ for: <Image src="/Blog/Blog1.webp" alt="…" fill className="object-cover" /> */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-[9px] md:text-[11px] tracking-[0.18em] uppercase bg-black/35 px-2.5 py-1">
                Read Article
              </span>
            </div>
          </div>

          {/* A2 – medium middle */}
          <div className="relative col-start-1 row-start-5 row-span-3 overflow-hidden">
            <Placeholder />
          </div>

          {/* A3 – tall bottom */}
          <div className="relative col-start-1 row-start-8 row-span-5 overflow-hidden">
            <Placeholder />
          </div>

          {/* B1 – landscape top */}
          <div className="relative col-start-2 row-start-1 row-span-3 overflow-hidden">
            <Placeholder />
          </div>

          {/* B2 – landscape second */}
          <div className="relative col-start-2 row-start-4 row-span-3 overflow-hidden">
            <Placeholder />
          </div>

          {/* B3 – landscape third */}
          <div className="relative col-start-2 row-start-7 row-span-3 overflow-hidden">
            <Placeholder />
          </div>

          {/* B4 – landscape bottom */}
          <div className="relative col-start-2 row-start-10 row-span-3 overflow-hidden">
            <Placeholder />
          </div>

          {/* C1 – short top */}
          <div className="relative col-start-3 row-start-1 row-span-3 overflow-hidden">
            <Placeholder />
          </div>

          {/* C2 – medium middle */}
          <div className="relative col-start-3 row-start-4 row-span-3 overflow-hidden">
            <Placeholder />
          </div>

          {/* C3 – tall bottom */}
          <div className="relative col-start-3 row-start-7 row-span-6 overflow-hidden">
            <Placeholder />
          </div>
        </div>

      </div>
    </section>
  );
}