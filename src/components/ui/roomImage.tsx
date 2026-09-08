import { roomType } from "@/constants/constants";
import { getRoom } from "@/utils/utils";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function roomImage() {
  const [room, setRoom] = useState(getRoom());
  const [asset, setAsset] = useState(getRoom());

  useEffect(() => {
    setRoom(getRoom());
    slectAsset(getRoom());
  }, []);

  const slectAsset = (room: string) => {
    switch (room) {
      //Habitaciones
      case roomType.armory:
        setAsset(roomType.armory);
        break;
      case roomType.church:
        setAsset(roomType.church);
        break;
      case roomType.ghoulCove:
        setAsset(roomType.ghoulCove);
        break;
      case roomType.passageway:
        setAsset(roomType.armory);
        break;
      case roomType.room:
        setAsset(roomType.armory);
        break;
      case roomType.wumpusCove:
        setAsset(roomType.armory);
        break;
      //Piso
      case roomType.wumpusMarks:
        setAsset(roomType.armory);
        break;
      case roomType.hole:
        setAsset(roomType.hole);
        break;
      //techo
      case roomType.start:
        setAsset(roomType.armory);
        break;
    }
  };

  return (
    <View>
      <View></View>
      <View style={style.main}></View>
      <View></View>
    </View>
  );
}

const style = StyleSheet.create({
  top: {},
  main: {
    flex: 1,
    position: "absolute",
  },
  floor: {},
});
