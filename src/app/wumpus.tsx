import Interaction from "@/components/ui/Interaction";
import Inventory from "@/components/ui/Inventory";
import { Colors, GlobalStyles } from "@/constants/GlobalStyles";
import { mapStorage } from "@/constants/storage";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Wumpus() {
  const map = mapStorage.map;
  const [direction, setDirection] = useState<string>("");
  const [amo, setAmo] = useState<number>(6);
  const [sword, setSword] = useState<boolean>(false);
  const [candil, setCandil] = useState<boolean>(false);

  return (
    <View style={[GlobalStyles.backG, styles.container]}>
      <View style={styles.mainView}>
        <View style={styles.mainGame}></View>
        <View style={styles.downBar}></View>
      </View>
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
  container: {
    flexDirection: "row",
  },
  sideBar: {
    width: "35%",
    height: "100%",
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
  mainView: {
    width: "65%",
    height: "100%",
    borderColor: Colors.text,
  },
  mainGame: {
    width: "100%",
    height: "75%",
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: Colors.text,
  },
  downBar: {
    width: "100%",
    height: "25%",
    borderWidth: 3,
    borderColor: Colors.text,
  },
});
