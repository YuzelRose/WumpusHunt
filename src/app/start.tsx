import Button from "@/components/Button";
import { variables } from "@/constants/configs";
import { Colors, GlobalStyles } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Start() {
  const [dificulty, setDificulty] = useState(variables.dificulty);
  const router = useRouter();
  const Start = () => {
    variables.demoMode = false;
    router.replace("/createMap");
  };
  const Credits = () => {
    router.replace("/credits");
  };
  const Demo = () => {
    variables.demoMode = true;
    router.replace("/createMap");
  };
  const CDif = () => {
    variables.dificulty = !variables.dificulty;
    setDificulty(variables.dificulty);
  };

  return (
    <View style={GlobalStyles.backG}>
      <View style={[styles.container]}>
        <Text style={GlobalStyles.h1}>La caza del Wumpus</Text>
        <Button texto="Empezar" onPress={Start} />
        <Button texto="Modo de demostracion" onPress={Demo} />
        <Button texto="Créditos" onPress={Credits} />
        <View style={styles.version}>
          <Pressable onPress={CDif}>
            <Text style={styles.pressable}>
              Dificultad:
              {dificulty ? " Normal" : " Facil"}
            </Text>
          </Pressable>
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
  pressable: {
    color: Colors.text,
    cursor: "pointer",
  },
});
