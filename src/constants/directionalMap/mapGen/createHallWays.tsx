import { enemyType, roomType, variables } from "@/constants/configs";
import { mapCell, position } from "../directionalMapStorage";
import { connect, getPos } from "../directionUtils";

// Valida en qué direcciones el vecino actual tiene una pared abierta hacia nuestra celda
function validDirections(map: mapCell[][], pos: position): string[] {
  const availableDirs: string[] = [];
  const { x, y } = pos;

  // Norte (y - 1): el vecino de arriba debe tener su pared Sur abierta hacia nosotros
  if (y > 0 && map[y - 1][x].s === true) {
    availableDirs.push("n");
    map[y - 1][x].s = false;
  }
  // Sur (y + 1): el vecino de abajo debe tener su pared Norte abierta hacia nosotros
  if (y < 6 && map[y + 1][x].n === true) {
    availableDirs.push("s");
    map[y + 1][x].n = false;
  }

  // Este (x + 1): el vecino de la derecha debe tener su pared Oeste abierta hacia nosotros
  if (x < 6 && map[y][x + 1].o === true) {
    availableDirs.push("e");
    map[y][x + 1].o = false;
  }

  // Oeste (x - 1): el vecino de la izquierda debe tener su pared Este abierta hacia nosotros
  if (x > 0 && map[y][x - 1].e === true) {
    availableDirs.push("o");
    map[y][x - 1].e = false;
  }

  return availableDirs;
}

export function createHallways(map: mapCell[][], chance: number) {
  let attempts = 0;

  while (attempts < variables.maxAttempts) {
    attempts++;

    // 1. Clonar el mapa para trabajar en una copia segura
    // (Si la operación se aborta en este intento, el mapa original no se contamina)
    const newMap: mapCell[][] = structuredClone(map);

    // 2. Obtener posición aleatoria sobre la copia
    const foundPos = getPos(newMap);
    if (!foundPos) continue;

    const { x, y } = foundPos;

    // 3. Obtener las direcciones válidas desde donde un vecino tiene entrada abierta
    const validDirs = validDirections(newMap, foundPos);
    if (validDirs.length === 0) continue; // Si no hay entradas válidas, intentar otra posición

    // 4. AISLAR LA CELDA (Cerrar puertas locales y prevenir noclip cerrando las de los vecinos)
    newMap[y][x].place = roomType.passageway;
    newMap[y][x].n = false;
    newMap[y][x].s = false;
    newMap[y][x].e = false;
    newMap[y][x].o = false;
    //agregar primer direccion
    const randomIndex1 = Math.floor(Math.random() * validDirs.length);
    const dir1 = validDirs[randomIndex1];
    connect(newMap, foundPos, dir1);
    //remover dirección usada
    validDirs.splice(randomIndex1, 1);
    //agregar segunda direccion
    if (validDirs.length > 0) {
      const randomIndex2 = Math.floor(Math.random() * validDirs.length);
      const dir2 = validDirs[randomIndex2];
      connect(newMap, foundPos, dir2);
    }
    if ((chance / variables.halls) * 100 <= Math.floor(Math.random() * 100))
      newMap[y][x].enemy = enemyType.bats;
    return newMap;
  }
  return map;
}
