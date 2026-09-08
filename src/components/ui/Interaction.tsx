import { actions, outs } from "@/constants/constants";
import { Colors } from "@/constants/GlobalStyles";
import ArrowSVG from "@/media/ArrowSVG";
import ShootSVG from "@/media/ShootSVG";
import SpyGlass from "@/media/SpyGlass";
import { managgeAction, validDirectionsBool } from "@/utils/utils";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../Button";

interface directionProps {
  setAction: React.Dispatch<React.SetStateAction<string>>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  flag: boolean;
}

export default function Interaction({
  setAction,
  flag,
  setFlag,
}: directionProps) {
  const [outs, setOuts] = useState<outs>(validDirectionsBool());
  const [valDir, setValDir] = useState({
    front: true,
    back: true,
    left: true,
    right: true,
  });

  const managePress = (action: string) => {
    setAction(action);
    managgeAction(action);
    setOuts(validDirectionsBool());
    setFlag(!flag);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.line}>
        <Button
          onPress={() => managePress(actions.intereact)}
          svg={<SpyGlass />}
        />
        {valDir.front ? (
          <Button
            onPress={() => managePress(actions.front)}
            svg={<ArrowSVG rotation={90} />}
          />
        ) : (
          <View style={styles.button}>
            <ArrowSVG rotation={90} />
          </View>
        )}
        <Button onPress={() => managePress(actions.shoot)} svg={<ShootSVG />} />
      </View>
      <View style={styles.line}>
        {valDir.left ? (
          <Button
            onPress={() => managePress(actions.left)}
            svg={<ArrowSVG rotation={0} />}
          />
        ) : (
          <View style={styles.button}>
            <ArrowSVG rotation={0} />
          </View>
        )}
        {valDir.back ? (
          <Button
            onPress={() => managePress(actions.back)}
            svg={<ArrowSVG rotation={270} />}
          />
        ) : (
          <View style={styles.button}>
            <ArrowSVG rotation={270} />
          </View>
        )}
        {valDir.right ? (
          <Button
            onPress={() => managePress(actions.right)}
            svg={<ArrowSVG rotation={180} />}
          />
        ) : (
          <View style={styles.button}>
            <ArrowSVG rotation={180} />
          </View>
        )}
      </View>
    </View>
  );
}

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
  button: {
    borderColor: Colors.text,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
});
