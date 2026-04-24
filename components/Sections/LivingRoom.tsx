// "use client";

// import { forwardRef } from "react";

// const LivingRoom = forwardRef<HTMLDivElement>((_, ref) => {
//   return (
//     <div 
//       ref={ref}
//       className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
//       style={{ backgroundImage: "url(/sections/ki.png)" }}
//     >
//       <div className="relative z-10 flex flex-col items-center justify-center h-screen">
//         <h1 className="text-center font-light leading-[1.1] tracking-[-0.02em] text-white text-[clamp(2.5rem,6vw,5rem)]" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
//           Living Room
//         </h1>
//       </div>
//     </div>
//   );
// });

// LivingRoom.displayName = "LivingRoom";

// export default LivingRoom;
"use client";

import { forwardRef } from "react";
import Typography from "@/lib/Typography";

const LivingRoom = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/sections/ki.png)" }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-screen">
        <Typography
          variant="display-xl"
          className="text-center font-light tracking-[-0.02em] text-white"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)", fontSize: "clamp(2.5rem,6vw,5rem)" }}
        >
          Living Room
        </Typography>
      </div>
    </div>
  );
});

LivingRoom.displayName = "LivingRoom";

export default LivingRoom;