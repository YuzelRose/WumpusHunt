import { passFlag } from "@/constants/configs";
import {
  mapCell,
  mapStorage,
  posStorage,
} from "@/constants/directionalMap/directionalMapStorage";
import { wumpusStorage } from "@/constants/wumpus/WumpusStorage";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";

export default function Map({ flag }: passFlag) {
  const [map, setMap] = useState<mapCell[][]>([]);
  const [playerPos, setPlayerPos] = useState(posStorage.pos);
  const [wumpusPos, setWumpusPos] = useState(wumpusStorage.pos);
  const [cellSize, setCellSize] = useState(40); // Tamaño por defecto

  useEffect(() => {
    setMap([...mapStorage.map]);
    setPlayerPos({ ...posStorage.pos });
    setWumpusPos({ ...wumpusStorage.pos });
  }, [flag]);

  // Medir el contenedor padre y ajustar el tamaño de las celdas
  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    // El mapa es 7x7, así que dividimos el mínimo entre 7
    // Restamos un pequeño margen para el padding
    const minSize = Math.min(width, height) - 20; // 20px de padding
    const calculatedCellSize = Math.floor(minSize / 7);
    setCellSize(calculatedCellSize);
  };

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
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <View style={{ marginTop: 20, padding: 10 }}>
        {map.map((row, y) => (
          <View key={y} style={{ flexDirection: "row" }}>
            {row.map((cell, x) => {
              const isPlayer = playerPos.x === x && playerPos.y === y;
              const isWumpus = wumpusPos.x === x && wumpusPos.y === y;

              let borderColor = "gray";
              if (isPlayer) borderColor = "lime";
              if (isWumpus) borderColor = "red";

              let backgroundColor = "#222";
              if (isPlayer) backgroundColor = "rgba(0, 255, 0, 0.2)";
              if (isWumpus) backgroundColor = "rgba(255, 0, 0, 0.2)";

              return (
                <View
                  key={x}
                  style={{
                    width: cellSize, // 👈 Dinámico
                    height: cellSize, // 👈 Dinámico
                    borderWidth: 2,
                    borderColor: borderColor,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: backgroundColor,
                  }}
                >
                  <Text style={{ fontSize: cellSize * 0.5 }}>
                    {" "}
                    {/* 👈 Fuente proporcional */}
                    {getCellSymbol(cell)}
                  </Text>

                  {/* Indicadores de paredes */}
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
                          fontSize: cellSize * 0.2,
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
                          fontSize: cellSize * 0.2,
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
                          fontSize: cellSize * 0.2,
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
                          fontSize: cellSize * 0.2,
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
                        top: -cellSize * 0.2,
                        left: "50%",
                        transform: [{ translateX: -cellSize * 0.2 }],
                      }}
                    >
                      <Text style={{ fontSize: cellSize * 0.3, color: "lime" }}>
                        👇
                      </Text>
                    </View>
                  )}

                  {/* Indicador del Wumpus */}
                  {isWumpus && (
                    <View
                      style={{
                        position: "absolute",
                        top: -cellSize * 0.2,
                        left: "50%",
                        transform: [{ translateX: -cellSize * 0.2 }],
                      }}
                    >
                      <Text style={{ fontSize: cellSize * 0.3, color: "red" }}>
                        💀
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
