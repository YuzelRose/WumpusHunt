import InventorySlot from "@/components/InventorySlot";
import { flag } from "@/constants/constants";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { directionStorage, inventoryStorage } from "@/constants/storage";
import AmoSVG from "@/media/AmoSVG";
import CandilSVG from "@/media/CandilSVG";
import SwordSVG from "@/media/SwordSVG";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function Inventory({ flag }: flag) {
  const [ivntry, setIvntry] = useState(inventoryStorage.inv);
  const [face, setFace] = useState(directionStorage.dir.direction);

  useEffect(() => {
    setIvntry(inventoryStorage.inv);
    setFace(directionStorage.dir.direction);
  }, [flag]);

  return (
    <>
      <Text style={GlobalStyles.h4}>Inventario</Text>
      <InventorySlot item="Brujula:" face={face} />
      <InventorySlot item="Munición:" quantity={ivntry.amo} svg={<AmoSVG />} />
      {ivntry.sword ? (
        <InventorySlot item="Espada de plata" svg={<SwordSVG />} />
      ) : null}
      {ivntry.light ? (
        <InventorySlot item="Candil" svg={<CandilSVG />} />
      ) : null}
    </>
  );
}
