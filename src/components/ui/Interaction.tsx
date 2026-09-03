import ArrowSVG from "@/media/ArrowSVG";
import { View } from "react-native";
import Button from "../Button";

interface directionProps {
  setDirection: React.Dispatch<React.SetStateAction<string>>;
}

export default function Interaction({ setDirection }: directionProps) {
  return (
    <View style={styles.wrapper}>
      <Button
        onPress={() => setDirection && setDirection("F")}
        svg={<ArrowSVG rotation={90} />}
      />
      <View style={styles.line}>
        <Button
          onPress={() => setDirection && setDirection("L")}
          svg={<ArrowSVG rotation={0} />}
        />
        <Button
          onPress={() => setDirection && setDirection("B")}
          svg={<ArrowSVG rotation={270} />}
        />
        <Button
          onPress={() => setDirection && setDirection("R")}
          svg={<ArrowSVG rotation={180} />}
        />
      </View>
      <View style={styles.line}>
        <Button
          onPress={() => setDirection && setDirection("F")}
          svg={<SpyGlass />}
        />
        <Button
          onPress={() => setDirection && setDirection("F")}
          texto="Interactuar"
        />
      </View>
    </View>
  );
}

import SpyGlass from "@/media/SpyGlass";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
