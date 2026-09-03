import { GlobalStyles } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/start");
  };

  return (
    <Pressable onPress={handlePress} style={GlobalStyles.backG}>
      <View style={[GlobalStyles.center, { flex: 1 }]}>
        <Text style={[GlobalStyles.text, styles.info]}>
          Este juego fue desarrollado mediante React Native por{" "}
          <Text style={[GlobalStyles.brightText, styles.info]}>YuzelRose</Text>{" "}
          y <Text style={[GlobalStyles.brightText, styles.info]}>Edgar</Text>.
          {"\n\n"}
          Este proyecto tiene fines exclusivamente educativos y de
          entretenimiento. No está afiliado, patrocinado ni respaldado por
          ninguna empresa o entidad externa.
          {"\n\n"}
          El código fuente está diseñado para ser una base de aprendizaje para
          la comunidad de desarrollo móvil, por lo que se permite su uso,
          modificación y distribución siempre que se mantenga el crédito a los
          desarrolladores originales.
          {"\n\n"}
          <Text style={[GlobalStyles.brightText, styles.info]}>
            Advertencia de salud:
          </Text>{" "}
          Juega en un lugar bien iluminado y mantén una distancia segura de la
          pantalla. Evita jugar si te sientes fatigado, estresado o con sueño, y
          descansa cada 20-30 minutos para evitar fatiga visual.
          {"\n\n"}
          Agradecemos el interés en "La caza del Wumpus" y esperamos que
          disfrutes la experiencia.
        </Text>
        <Text style={[GlobalStyles.brightText, styles.start]}>
          Pulse para Continuar.
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  info: {
    textAlign: "justify",
    fontSize: 12,
    width: "75%",
  },
  start: {
    paddingTop: 20,
  },
});
