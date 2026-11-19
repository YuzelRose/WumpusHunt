// src/components/ui/DemoController.tsx
import { wumpusAgent } from "@/constants/ai/wumpusAgent";
import { flag, variables } from "@/constants/configs";
import { Colors } from "@/constants/GlobalStyles";
import { manageAction } from "@/constants/utils";
import { wumpusStorage } from "@/constants/wumpus/WumpusStorage";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DemoController({ flag, setFlag }: flag) {
  const router = useRouter();
  const [paused, setPaused] = useState(false);
  const [speedMs, setSpeedMs] = useState(700);
  const [turn, setTurn] = useState(1);
  const [thought, setThought] = useState("Iniciando agente autónomo...");

  const turnRef = useRef(turn);
  turnRef.current = turn;

  const flagRef = useRef(flag);
  flagRef.current = flag;

  useEffect(() => {
    wumpusAgent.reset();
  }, []);

  useEffect(() => {
    if (paused || !variables.demoMode) return;

    const timer = setInterval(() => {
      if (!variables.demoMode || wumpusStorage.life <= 0) {
        clearInterval(timer);
        return;
      }
      const decision = wumpusAgent.decideNextAction();
      setThought(decision.reason);
      manageAction(decision.action, router, turnRef.current);
      setFlag(!flagRef.current);
      setTurn((t) => t + 1);
    }, speedMs);

    return () => clearInterval(timer);
  }, [paused, speedMs, router, setFlag]);

  const exitDemo = () => {
    variables.demoMode = false;
    router.replace("/start");
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.badge}>MODO DEMOSTRACIÓN (IA)</Text>

      <View style={styles.thoughtBox}>
        <Text style={styles.turnText}>Turno #{turn}</Text>
        <Text style={styles.thoughtText} numberOfLines={3}>
          {thought}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => setPaused((p) => !p)}
          style={styles.btn}
        >
          <Text style={styles.btnText}>
            {paused ? "▶ Reanudar" : "⏸ Pausar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSpeedMs((s) => (s === 700 ? 250 : 700))}
          style={styles.btn}
        >
          <Text style={styles.btnText}>{speedMs === 700 ? "1x" : "3x"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={exitDemo} style={styles.btn}>
          <Text style={styles.btnText}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    color: "#10b981",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 1,
  },
  thoughtBox: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 6,
    gap: 4,
  },
  turnText: {
    color: Colors.unactive,
    fontSize: 10,
    fontWeight: "bold",
  },
  thoughtText: {
    color: Colors.text,
    fontSize: 11,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    gap: 6,
  },
  btn: {
    borderColor: Colors.unactive,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  btnText: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 11,
  },
});
