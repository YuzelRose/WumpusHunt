import { createNewMap } from "@/constants/directionalMap/mapGen/createNewMap";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CreateMap() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    (async () => {
      setFlag(await createNewMap(setMsg));
    })();
  }, []);

  return (
    <Pressable
      onPress={flag ? () => router.push("/wumpus") : undefined}
      style={[GlobalStyles.backG, style.wrapper]}
    >
      <View>
        <Text style={GlobalStyles.text}>{msg}</Text>
        {flag ? (
          <Text style={[GlobalStyles.h6, style.state]}>
            Pulse para continuar.
          </Text>
        ) : null}
      </View>
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
