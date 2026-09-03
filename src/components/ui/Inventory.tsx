import InventorySlot from "@/components/InventorySlot";
import { GlobalStyles } from "@/constants/GlobalStyles";
import AmoSVG from "@/media/AmoSVG";
import CandilSVG from "@/media/CandilSVG";
import SwordSVG from "@/media/SwordSVG";
import { Text } from "react-native";

interface InventoryProps {
  amo: number;
  sword: boolean;
  candil: boolean;
}

export default function Inventory({
  amo,
  sword = false,
  candil = false,
}: InventoryProps) {
  return (
    <>
      <Text style={GlobalStyles.h4}>Inventario</Text>
      <InventorySlot item="Munición:" quantity={amo} svg={<AmoSVG />} />
      {sword ? (
        <InventorySlot item="Espada de plata" svg={<SwordSVG />} />
      ) : null}
      {candil ? <InventorySlot item="Candil" svg={<CandilSVG />} /> : null}
    </>
  );
}
