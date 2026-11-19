import Button from "@/components/Button";
import { variables } from "@/constants/configs";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Start() {
  const router = useRouter();
  const Start = () => {
    variables.demoMode = false;
    router.push("/createMap");
  };
  const Credits = () => {
    router.push("/credits");
  };
  const Demo = () => {
    variables.demoMode = true;
    router.push("/createMap");
  };

  return (
    <View style={GlobalStyles.backG}>
      <View style={[styles.container]}>
        <Text style={GlobalStyles.h1}>La caza del Wumpus</Text>
        <Button texto="Empezar" onPress={Start} />
        <Button texto="Modo de demostracion" onPress={Demo} />
        <Button texto="Créditos" onPress={Credits} />
        <View style={styles.version}>
          <Text style={GlobalStyles.h6}>versión {variables.version}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  version: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 15,
  },
});
