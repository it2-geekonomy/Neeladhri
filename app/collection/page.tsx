import AlliedAccessories from "@/components/collections/alliedAccessories";
import Bathroom from "@/components/collections/bathroom";
import CollectionsSection from "@/components/collections/CollectionsSection";
import Dining from "@/components/collections/dining";
import Kitchen from "@/components/collections/kitchen";
import LivingRoom from "@/components/collections/livingroom";

export default function CollectionsPage() {
  return (
    <>
      <CollectionsSection />
      <LivingRoom />
      <Bathroom />
      <Dining />
      <Kitchen />
      <AlliedAccessories />
    </>
  );
}
