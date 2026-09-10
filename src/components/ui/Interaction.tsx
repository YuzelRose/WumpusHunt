import { actions, enemyType, flag, roomType } from "@/constants/configs";
import {
  getRoom,
  getRooomEnemy,
  validDirectionsBool,
} from "@/constants/directionalMap/directionUtils";
import { Colors } from "@/constants/GlobalStyles";
import { inventoryStorage } from "@/constants/inventory/inventoryStorage";
import { manageAction } from "@/constants/utils";
import ArrowSVG from "@/media/ArrowSVG";
import ShootSVG from "@/media/ShootSVG";
import SpyGlass from "@/media/SpyGlass";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../Button";

export default function Interaction({ flag, setFlag }: flag) {
  const router = useRouter();
  const [valDir, setValDir] = useState(validDirectionsBool());
  const [shoot, setShoot] = useState(getRoom() === roomType.passageway);
  const [light, setLight] = useState(inventoryStorage.inv.light);
  const [room, setRoom] = useState(getRoom());
  const [counter, setCounter] = useState(1);

  const managePress = (action: string) => {
    manageAction(action, router, counter);
    setValDir(validDirectionsBool());
    setShoot(
      getRoom() === roomType.passageway ||
        getRoom() === roomType.ghoulCove ||
        getRooomEnemy() === enemyType.wumpus,
    );
    setLight(inventoryStorage.inv.light);
    setRoom(getRoom());
    setFlag(!flag);
    setCounter(counter + 1);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.line}>
        {room === roomType.armory ? (
          <Button
            onPress={() => managePress(actions.intereact)}
            svg={<SpyGlass />}
          />
        ) : (
          <View style={styles.unActiveButton}>
            <SpyGlass color={Colors.unactive} />
          </View>
        )}
        {valDir.front ? (
          <Button
            onPress={() => managePress(actions.front)}
            svg={<ArrowSVG rotation={90} />}
          />
        ) : (
          <View style={styles.unActiveButton}>
            <ArrowSVG rotation={90} color={Colors.unactive} />
          </View>
        )}
        {shoot ? (
          <Button
            onPress={() => managePress(actions.shoot)}
            svg={<ShootSVG />}
          />
        ) : (
          <View style={styles.unActiveButton}>
            <ShootSVG color={Colors.unactive} />
          </View>
        )}
      </View>
      <View style={styles.line}>
        {valDir.left ? (
          <Button
            onPress={() => managePress(actions.left)}
            svg={<ArrowSVG rotation={0} />}
          />
        ) : (
          <View style={styles.unActiveButton}>
            <ArrowSVG rotation={0} color={Colors.unactive} />
          </View>
        )}
        {valDir.back ? (
          <Button
            onPress={() => managePress(actions.back)}
            svg={<ArrowSVG rotation={270} />}
          />
        ) : (
          <View style={styles.unActiveButton}>
            <ArrowSVG rotation={270} color={Colors.unactive} />
          </View>
        )}
        {valDir.right ? (
          <Button
            onPress={() => managePress(actions.right)}
            svg={<ArrowSVG rotation={180} />}
          />
        ) : (
          <View style={styles.unActiveButton}>
            <ArrowSVG rotation={180} color={Colors.unactive} />
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
  unActiveButton: {
    borderColor: Colors.unactive,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
});
