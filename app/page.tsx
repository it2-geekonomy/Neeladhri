import HeroSection from "@/components/Sections/HeroSection";
import CollectionSection from "@/components/Sections/CollectionsSection";
import BlogsSections from "@/components/Sections/BlogsSection";
import BrandsSection from "@/components/Sections/BrandsSection";
import ContactSection from "@/components/Sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CollectionSection />
      <BlogsSections />
      <BrandsSection />
      <ContactSection />
    </>
  );
}