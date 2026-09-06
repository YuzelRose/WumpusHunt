import Map from "@/components/Map";
import { mapCell, variables } from "@/constants/constants";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { mapStorage } from "@/constants/storage";
import { createNewMap } from "@/utils/createNewMap";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function createMap() {
  const router = useRouter();
  const [state, setState] = useState("");
  const [map, setMap] = useState<mapCell[][]>([]);
  const [pregress, setPregress] = useState(0);

  useEffect(() => {
    (async () => {
      const newMap = await createNewMap(setState, setPregress);
      mapStorage.map = newMap;
      setMap(newMap);
    })();
  }, []);

  return (
    <Pressable
      onPress={pregress === 100 ? () => router.push("/wumpus") : undefined}
      style={[GlobalStyles.backG, style.wrapper]}
    >
      <View>
        <Text style={GlobalStyles.text}>{state}</Text>
        {pregress === 100 ? (
          <Text style={[GlobalStyles.h6, style.state]}>
            Pulse para continuar.
          </Text>
        ) : null}
      </View>

      {variables.debug && map.length > 0 && <Map map={map} />}
    </Pressable>
  );
}
const style = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  state: {
    paddingTop: 10,
  },
});
