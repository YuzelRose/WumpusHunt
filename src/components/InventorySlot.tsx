import { Colors, GlobalStyles } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

interface InventorySlotProps {
  item: string;
  quantity?: number;
  svg?: React.ReactNode;
  face?: string;
}

export default function InventorySlot({
  item,
  quantity = -1,
  svg,
  face,
}: InventorySlotProps) {
  return (
    <View style={styles.slot}>
      {svg && <View>{svg}</View>}
      <Text style={GlobalStyles.text}>{item}</Text>
      {quantity > -1 ? <Text style={GlobalStyles.text}>{quantity}</Text> : null}
      {face ? <Text style={GlobalStyles.text}>{face}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: Colors.text,
  },
});
