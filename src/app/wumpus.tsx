import Interaction from "@/components/ui/Interaction";
import Inventory from "@/components/ui/Inventory";
import { Colors, GlobalStyles } from "@/constants/GlobalStyles";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Wumpus() {
  const [direction, setDirection] = useState<string>("");
  const [amo, setAmo] = useState<number>(0);
  const [sword, setSword] = useState<boolean>(true);
  const [candil, setCandil] = useState<boolean>(true);

  return (
    <View style={[GlobalStyles.backG]}>
      <View></View>
      <View style={styles.sideBar}>
        <View style={styles.inventory}>
          <Inventory amo={amo} sword={sword} candil={candil} />
        </View>
        <View style={styles.interaction}>
          <Interaction setDirection={setDirection} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sideBar: {
    width: "35%",
    height: "100%",
    borderLeftWidth: 3,
    borderColor: Colors.text,
  },
  interaction: {
    width: "100%",
    height: "50%",
  },
  inventory: {
    textAlign: "left",
    width: "100%",
    height: "50%",
  },
});
