// "use client";



// import Image from "next/image";

// import Typography from "@/lib/Typography";



// const GAP = 8;

// const ROW1 = 440;

// const ROW2 = 600;

// const TOTAL = ROW1 + GAP + ROW2;



// function Cell({

//   src,

//   label,

//   height,

//   sizes = "30vw",

// }: {

//   src: string;

//   label: string;

//   height: number;

//   sizes?: string;

// }) {

//   return (

//     <div

//       className="group relative overflow-hidden flex-shrink-0"

//       style={{ height, border: "4px solid #A98F76" }}

//     >

//       <Image

//         src={src}

//         alt={label}

//         fill

//         sizes={sizes}

//         className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"

//       />



//       {label && (

//         <Typography

//           variant="display-xl"

//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-light whitespace-nowrap w-full text-center"

//           style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}

//         >

//           {label}

//         </Typography>

//       )}

//     </div>

//   );

// }



// export default function CollectionsSection() {

//   const bathroomH = ROW1 + GAP + Math.round(ROW2 * 0.42);

//   const loungeH = Math.round(ROW2 * 0.58) - GAP + 120;



//   return (

//     <section className="w-full bg-white pt-28 pb-16 px-4">

//       <div

//         className="flex w-full justify-center"

//         style={{ gap: GAP, height: TOTAL }}

//       >

//         {/* LEFT (WIDER) */}

//         <div

//           className="flex flex-col flex-shrink-0"

//           style={{ gap: GAP, width: "33%" }}

//         >

//           <Cell

//             src="/collections/collection11.png"

//             label="Living"

//             height={loungeH}

//             sizes="33vw"

//           />

//           <Cell

//             src="/collections/collection14.png"

//             label="Allied Accessories"

//             height={bathroomH}

//             sizes="33vw"

//           />

//         </div>



//         {/* CENTER (Bathroom on TOP) */}

//         <div

//           className="flex flex-col flex-shrink-0"

//           style={{ gap: GAP, width: "34%" }}

//         >

//           {/* MOVED TO TOP */}

//           <Cell

//             src="/collections/collection12.png"

//             label="Bathroom"

//             height={bathroomH}

//             sizes="34vw"

//           />



//           <Cell

//             src="/collections/collection15.png"

//             label=""

//             height={loungeH}

//             sizes="34vw"

//           />

//         </div>



//         {/* RIGHT (WIDER) */}

//         <div

//           className="flex flex-col flex-shrink-0"

//           style={{ gap: GAP, width: "33%" }}

//         >

//           <Cell

//             src="/collections/collection13.png"

//             label="Dining"

//             height={loungeH}

//             sizes="33vw"

//           />

//           <Cell

//             src="/collections/collection16.png"

//             label="Kitchen"

//             height={bathroomH}

//             sizes="33vw"

//           />

//         </div>

//       </div>



//       {/* MOBILE */}

//       <div className="flex flex-col gap-4 mt-10 md:hidden">

//         <Cell src="/collections/collection2.png" label="Bathroom" height={300} />

//         <Cell src="/collections/collection1.png" label="Living" height={250} />

//         <Cell src="/collections/collection3.png" label="Dining" height={250} />

//         <Cell src="/collections/collection4.png" label="Accessories" height={300} />

//         <Cell src="/collections/collection5.png" label="" height={250} />

//         <Cell src="/collections/collection6.png" label="Kitchen" height={300} />

//       </div>

//     </section>

//   );

// }

"use client";

import Image from "next/image";
import Typography from "@/lib/Typography";

const GAP = 8;
const ROW1 = 440;
const ROW2 = 600;
const TOTAL = ROW1 + GAP + ROW2;

function Cell({
  src,
  label,
  height,
  sizes = "30vw",
}: {
  src: string;
  label: string;
  height: number;
  sizes?: string;
}) {
  return (
    <div
      className="group relative overflow-hidden flex-shrink-0"
      style={{ height, border: "4px solid #A98F76" }}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes={sizes}
        className="object-fill transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {label && (
        <Typography
          variant="display-xl"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-light whitespace-nowrap w-full text-center"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
        >
          {label}
        </Typography>
      )}
    </div>
  );
}

export default function CollectionsSection() {
  const bathroomH = ROW1 + GAP + Math.round(ROW2 * 0.42);
  const loungeH = Math.round(ROW2 * 0.58) - GAP + 120;

  return (
    <section className="w-full bg-white pt-6 pb-2 md:pb-16 px-4">
      <div
        className="hidden md:flex w-full justify-center"
        style={{ gap: GAP, height: TOTAL }}
      >
        {/* LEFT */}
        <div className="flex flex-col flex-shrink-0" style={{ gap: GAP, width: "33%" }}>
          <Cell src="/collections/collection11.png" label="Living" height={loungeH} sizes="33vw" />
          <Cell src="/collections/collection14.png" label="Allied Accessories" height={bathroomH} sizes="33vw" />
        </div>

        {/* CENTER */}
        <div className="flex flex-col flex-shrink-0" style={{ gap: GAP, width: "34%" }}>
          <Cell src="/collections/collection12.png" label="Bathroom" height={bathroomH} sizes="34vw" />
          <Cell src="/collections/collection15.png" label="" height={loungeH} sizes="34vw" />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col flex-shrink-0" style={{ gap: GAP, width: "33%" }}>
          <Cell src="/collections/collection13.png" label="Dining" height={loungeH} sizes="33vw" />
          <Cell src="/collections/collection16.png" label="Kitchen" height={bathroomH} sizes="33vw" />
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex flex-col gap-4 mt-10 md:hidden">
        <Cell src="/collections/collection12.png" label="Bathroom" height={300} />
        <Cell src="/collections/collection11.png" label="Living" height={250} />
        <Cell src="/collections/collection13.png" label="Dining" height={250} />
        <Cell src="/collections/collection14.png" label="Allied Accessories" height={300} />
        <Cell src="/collections/collection15.png" label="" height={250} />
        <Cell src="/collections/collection16.png" label="Kitchen" height={300} />
      </div>
    </section>
  );
}