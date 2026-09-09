import { passFlag } from "@/constants/configs";
import {
  mapCell,
  mapStorage,
  posStorage,
} from "@/constants/directionalMap/directionalMapStorage"; // Importa stores
import { useEffect, useState } from "react"; // Importa hooks
import { Text, View } from "react-native";

export default function Map({ flag }: passFlag) {
  // Estado local para forzar re-render y copiar el mapa
  const [map, setMap] = useState<mapCell[][]>([]);
  const [playerPos, setPlayerPos] = useState(posStorage.pos);

  // Actualizar mapa y posición cuando cambie la flag
  useEffect(() => {
    // Copia superficial del mapa (para que React detecte el cambio)
    setMap([...mapStorage.map]);
    // Copia la posición
    setPlayerPos({ ...posStorage.pos });
  }, [flag]); // 👈 Depende de la flag

  const getCellSymbol = (cell: any) => {
    if (!cell) return "?";

    // Mostrar el enemigo si hay uno (prioridad alta)
    if (cell.enemy === "W") return "👹"; // Wumpus
    if (cell.enemy === "G") return "🧟"; // Ghoul
    if (cell.enemy === "B") return "🦇"; // Murciélagos

    // Mostrar el lugar si no hay enemigo
    switch (cell.place) {
      case "S":
        return "🚪"; // Start
      case "P":
        return "⬜"; // Pasillo
      case "H":
        return "🕳️"; // Hoyo
      case "C":
        return "⛪"; // Iglesia
      case "W":
        return "🏚️"; // Guarida de Wumpus (lugar)
      case "G":
        return "🧟♂️"; // Guarida de Ghoul (lugar)
      case "A":
        return "⚔️"; // Armería
      case "M":
        return "🐾"; // Marcas de Wumpus
      default:
        return "⬛"; // Habitación normal
    }
  };

  return (
    <View style={{ marginTop: 20, padding: 10 }}>
      <Text style={{ color: "white", fontWeight: "bold", marginBottom: 10 }}>
        MAPA GENERADO:
      </Text>

      {/* Grid 7x7 */}
      {map.map((row, y) => (
        <View key={y} style={{ flexDirection: "row" }}>
          {row.map((cell, x) => {
            // Verificar si esta celda es la posición del jugador
            const isPlayer = playerPos.x === x && playerPos.y === y;

            return (
              <View
                key={x}
                style={{
                  width: 40,
                  height: 40,
                  borderWidth: 2,
                  borderColor: isPlayer ? "lime" : "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isPlayer ? "rgba(0, 255, 0, 0.2)" : "#222",
                }}
              >
                {/* Símbolo principal de la celda */}
                <Text style={{ fontSize: 18 }}>{getCellSymbol(cell)}</Text>

                {/* Indicadores de paredes abiertas (flechas) */}
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

                {/* Si es la posición del jugador, mostrar un indicador extra */}
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
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
