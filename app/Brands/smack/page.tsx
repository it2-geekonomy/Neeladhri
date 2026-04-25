import BrandPage from "@/components/Brands/BrandPage";
import { brandsData } from "@/lib/constants/brands";

export default function SmackPage() {
  return <BrandPage brand={brandsData.smack} />;
}
