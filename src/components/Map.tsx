import { passFlag } from "@/constants/configs";
import {
  mapCell,
  mapStorage,
  posStorage,
} from "@/constants/directionalMap/directionalMapStorage";
import { wumpusStorage } from "@/constants/wumpus/WumpusStorage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Map({ flag }: passFlag) {
  const [map, setMap] = useState<mapCell[][]>([]);
  const [playerPos, setPlayerPos] = useState(posStorage.pos);
  const [wumpusPos, setWumpusPos] = useState(wumpusStorage.pos); // 👈 Estado para Wumpus

  useEffect(() => {
    setMap([...mapStorage.map]);
    setPlayerPos({ ...posStorage.pos });
    setWumpusPos({ ...wumpusStorage.pos }); // 👈 Actualizar Wumpus
  }, [flag]);

  const getCellSymbol = (cell: any) => {
    if (!cell) return "?";

    if (cell.enemy === "W") return "👹";
    if (cell.enemy === "G") return "🧟";
    if (cell.enemy === "B") return "🦇";

    switch (cell.place) {
      case "S":
        return "🚪";
      case "P":
        return "⬜";
      case "H":
        return "🕳️";
      case "C":
        return "⛪";
      case "W":
        return "🏚️";
      case "G":
        return "🧟♂️";
      case "A":
        return "⚔️";
      case "M":
        return "🐾";
      default:
        return "⬛";
    }
  };

  return (
    <View style={{ marginTop: 20, padding: 10 }}>
      <Text style={{ color: "white", fontWeight: "bold", marginBottom: 10 }}>
        MAPA GENERADO:
      </Text>

      {map.map((row, y) => (
        <View key={y} style={{ flexDirection: "row" }}>
          {row.map((cell, x) => {
            const isPlayer = playerPos.x === x && playerPos.y === y;
            const isWumpus = wumpusPos.x === x && wumpusPos.y === y; // 👈 Verificar Wumpus

            // Color del borde según quién está en la celda
            let borderColor = "gray";
            if (isPlayer) borderColor = "lime";
            if (isWumpus) borderColor = "red"; // 👈 Rojo para el Wumpus

            // Color de fondo
            let backgroundColor = "#222";
            if (isPlayer) backgroundColor = "rgba(0, 255, 0, 0.2)";
            if (isWumpus) backgroundColor = "rgba(255, 0, 0, 0.2)"; // 👈 Fondo rojo translúcido

            return (
              <View
                key={x}
                style={{
                  width: 40,
                  height: 40,
                  borderWidth: 2,
                  borderColor: borderColor,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: backgroundColor,
                }}
              >
                <Text style={{ fontSize: 18 }}>{getCellSymbol(cell)}</Text>

                {/* Indicadores de paredes abiertas */}
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  {cell.n && (
                    <Text
                      style={{
                        position: "absolute",
                        top: -2,
                        left: "45%",
                        fontSize: 8,
                        color: "cyan",
                      }}
                    >
                      ↑
                    </Text>
                  )}
                  {cell.s && (
                    <Text
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: "45%",
                        fontSize: 8,
                        color: "cyan",
                      }}
                    >
                      ↓
                    </Text>
                  )}
                  {cell.o && (
                    <Text
                      style={{
                        position: "absolute",
                        left: -2,
                        top: "45%",
                        fontSize: 8,
                        color: "cyan",
                      }}
                    >
                      ←
                    </Text>
                  )}
                  {cell.e && (
                    <Text
                      style={{
                        position: "absolute",
                        right: -2,
                        top: "45%",
                        fontSize: 8,
                        color: "cyan",
                      }}
                    >
                      →
                    </Text>
                  )}
                </View>

                {/* Indicador del jugador */}
                {isPlayer && (
                  <View
                    style={{
                      position: "absolute",
                      top: -8,
                      left: "50%",
                      transform: [{ translateX: -8 }],
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "lime" }}>👇</Text>
                  </View>
                )}

                {/* 👇 Indicador del Wumpus */}
                {isWumpus && (
                  <View
                    style={{
                      position: "absolute",
                      top: -8,
                      left: "50%",
                      transform: [{ translateX: -8 }],
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "red" }}>💀</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
