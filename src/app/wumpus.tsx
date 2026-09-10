import Map from "@/components/Map";
import Bar from "@/components/ui/bar";
import Interaction from "@/components/ui/Interaction";
import Inventory from "@/components/ui/Inventory";
import { Colors, GlobalStyles } from "@/constants/GlobalStyles";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Wumpus() {
  const [flag, setFlag] = useState<boolean>(false);

  return (
    <View style={[GlobalStyles.backG, styles.container]}>
      <View style={styles.mainView}>
        <View style={styles.mainGame}>
          <Map flag={flag} />
        </View>
        <View style={styles.downBar}>
          <Bar flag={flag} />
        </View>
      </View>
      <View style={styles.sideBar}>
        <View style={styles.inventory}>
          <Inventory flag={flag} />
        </View>
        <View style={styles.interaction}>
          <Interaction setFlag={setFlag} flag={flag} />
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
    height: "40%",
  },
  inventory: {
    textAlign: "left",
    width: "100%",
    height: "60%",
  },
  mainView: {
    width: "65%",
    height: "100%",
    borderColor: Colors.text,
  },
  mainGame: {
    width: "100%",
    height: "60%",
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: Colors.text,
  },
  downBar: {
    width: "100%",
    height: "40%",
    borderWidth: 3,
    borderColor: Colors.text,
  },
});
