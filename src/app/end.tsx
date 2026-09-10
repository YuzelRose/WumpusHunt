import { Colors, GlobalStyles } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function End() {
  const router = useRouter();

  const onPress = () => {
    router.push("/credits");
  };

  return (
    <Pressable onPress={onPress} style={[GlobalStyles.backG, style.wrapper]}>
      <Text style={style.death}>Haz vengado a tu padre.</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  death: {
    color: Colors.text,
    textAlign: "center",
    fontSize: 50,
  },
});
