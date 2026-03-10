import ButtonShowcase from "@/components/ButtonShowcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Button Collection - Neeladhri",
  description:
    "Explore our collection of 10 award-winning button components inspired by Awwwards-winning websites. Premium, reusable, and fully animated button designs.",
  keywords: [
    "premium buttons",
    "animated buttons",
    "UI components",
    "button designs",
    "Awwwards buttons",
  ],
};

export default function ButtonsPage() {
  return <ButtonShowcase />;
}
