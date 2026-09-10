import { Colors, GlobalStyles } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Credits() {
  const router = useRouter();

  const onPress = () => {
    router.push("/start");
  };

  return (
    <Pressable onPress={onPress} style={[GlobalStyles.backG, style.wrapper]}>
      <Text style={style.dev}>Desarrollo logico: YuzelRose.</Text>
      <Text style={style.dev}>Desarrollo visual: callerosedgar125-lab.</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  dev: {
    color: Colors.text,
    textAlign: "center",
    fontSize: 30,
    margin: 10,
  },
});
