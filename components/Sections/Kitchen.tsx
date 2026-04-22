// "use client";

// import { forwardRef } from "react";
// import LivingRoom from "./LivingRoom";

// const Kitchen = forwardRef<HTMLDivElement>((_, ref) => {
//   return (
//     <div 
//       ref={ref}
//       className="fixed inset-0 z-20 hidden flex-col bg-cover bg-center bg-no-repeat overflow-y-auto"
//       style={{ backgroundImage: "url(/sections/li.png)" }}
//     >
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
//         <h1 className="text-center font-light leading-[1.1] tracking-[-0.02em] text-white text-[clamp(2.5rem,6vw,5rem)]" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
//           Kitchen
//         </h1>
//         <p className="text-white text-center mt-4 text-lg">Scroll down to explore Living Room</p>
//       </div>
      
//       {/* LivingRoom section for normal scrolling */}
//       <LivingRoom />
//     </div>
//   );
// });

// Kitchen.displayName = "Kitchen";

// export default Kitchen;


"use client";

import { forwardRef } from "react";

const Kitchen = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/sections/li.png)" }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-screen">
        <h1
          className="text-center font-light leading-[1.1] tracking-[-0.02em] text-white text-[clamp(2.5rem,6vw,5rem)]"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
        >
          Kitchen
        </h1>
        <p className="text-white text-center mt-4 text-lg opacity-80">
          Scroll down to explore Living Room
        </p>
      </div>
    </div>
  );
});

Kitchen.displayName = "Kitchen";

export default Kitchen;