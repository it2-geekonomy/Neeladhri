"use client";

import Image from "next/image";
import Typography from "@/lib/Typography";
import { BrandData } from "@/data/brands";

interface BrandPageProps {
  brand: BrandData;
}

export default function BrandPage({ brand }: BrandPageProps) {
  return (
    <>
      <style jsx>{`
        @keyframes popUp {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .pop-up {
          animation: popUp 0.5s ease-out;
        }
      `}</style>
      <div className="bg-white flex flex-col items-center justify-center px-4 md:px-8 mt-10 mb-12 pop-up">
        <div
          className="w-full rounded-[4.5rem] p-6 md:p-10"
          style={{ border: "4px solid #7E7669" }}
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <Typography variant="display-2xl" className="font-semibold mb-6 text-center tracking-wide" style={{ color: "#F79440" }}>
              {brand.name}
            </Typography>
            <Typography variant="display-xl" className="font-normal mb-8 text-center" style={{ color: "#7E7669" }}>
              {brand.tagline}
            </Typography>
            <Typography variant="h1" className="font-light text-center mb-16 leading-relaxed" style={{ color: "#7E7669" }}>
              {brand.description}
            </Typography>
          </div>

          {/* Images Row — responsive: stack on small, row on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full mb-6">
            {brand.images.map((src, index) => (
              <div
                key={index}
                className="w-full overflow-hidden"
                style={{ borderRadius: "1.25rem" }}
              >
                <Image
                  src={src}
                  alt={`${brand.name} ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                  style={{ borderRadius: "1.25rem" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
