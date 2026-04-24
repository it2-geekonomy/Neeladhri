import CollectionsSection from "@/components/collections/CollectionsSection";
import LivingRoom from "@/components/collections/livingroom";
import Bathroom from "@/components/collections/bathroom";
import Dining  from "@/components/collections/dining";
import Kitchen from "@/components/collections/kitchen";
import AlliedAccessories from "@/components/collections/alliedAccessories";
export default function CollectionPage() {
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