import { enemyType, passFlag, roomType } from "@/constants/configs";
import {
  getRoom,
  getRooomEnemy,
} from "@/constants/directionalMap/directionUtils";
import { inventoryStorage } from "@/constants/inventory/inventoryStorage";
import Door1SVG from "@/media/doors/Door1SVG";
import Door2SVG from "@/media/doors/Door2SVG";
import WumpusSVG from "@/media/enemys/WumpusSVG";
import BackGroundSVG from "@/media/map/BackGroundSVG";
import HoleSVG from "@/media/map/HoleSVG";
import ArmortSVG from "@/media/objects/ArmortSVG";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function MainVisual({ flag }: passFlag) {
  const [wumpus, setWumpus] = useState(false);
  const [armory, setArmory] = useState(false);
  const [room, setRoom] = useState(true);
  const [hole, setHole] = useState(false);
  const [passageway, setPassageway] = useState(false);

  useEffect(() => {
    const currentRoom = getRoom();
    const currentEnemy = getRooomEnemy();
    const hasLight = inventoryStorage.inv.light;

    setRoom(currentRoom !== roomType.passageway);
    setHole(currentRoom === roomType.hole && hasLight);
    setPassageway(currentRoom === roomType.passageway);
    setArmory(currentRoom === roomType.armory);
    setWumpus(currentEnemy === enemyType.wumpus);
  }, [flag]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.background}>
        {room ? <BackGroundSVG /> : null}
        {hole ? <HoleSVG /> : null}
        {passageway ? <Door1SVG /> : null}
      </View>
      <View style={styles.enemy}>{wumpus ? <WumpusSVG /> : null}</View>

      <View style={styles.content}>
        <View style={styles.left}>{room ? <Door2SVG /> : null}</View>
        <View style={styles.centerColumb}>
          <View style={styles.top}>{}</View>
          <View style={styles.center}>{room ? <Door1SVG /> : null}</View>
          <View style={styles.bottom}>
            {armory ? <ArmortSVG /> : null}
            {hole ? <HoleSVG /> : null}
          </View>
        </View>
        <View style={styles.right}>{room ? <Door2SVG /> : null}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  enemy: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1, // Encima del fondo
    flexDirection: "row",
  },
  top: {
    flex: 1, // Ocupa 1/3 del alto (si el resto también es flex 1)
    alignItems: "center",
    justifyContent: "center",
  },
  centerColumb: {
    flex: 1, // Ocupa 1/3 del alto
    flexDirection: "column",
  },
  left: {
    flex: 1, // Ocupa 1/3 del ancho de la fila
    height: "50%",
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    flex: 1,
    height: "50%",
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  bottom: {
    flex: 1, // Ocupa 1/3 del alto
    alignItems: "center",
    justifyContent: "center",
  },
});
