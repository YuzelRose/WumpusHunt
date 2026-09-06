import { mapCell, position, roomType, variables } from "@/constants/constants";

export function getPos(map: mapCell[][]) {
  let genPos: position = { x: 0, y: 0 },
    attempts = 0;
  while (attempts < variables.maxAttempts) {
    genPos.x = Math.floor(Math.random() * 7);
    genPos.y = Math.floor(Math.random() * 7);
    if (map[genPos.y][genPos.x].place === roomType.room) {
      return genPos;
    }
    attempts++;
  }
  return null;
}

export function connect(map: mapCell[][], pos: position, dir: string) {
  const { x, y } = pos;
  switch (dir) {
    case "n": // Conecta al Norte (arriba, y - 1)
      if (y > 0) {
        map[y][x].n = true;
        map[y - 1][x].s = true;
      }
      break;
    case "s": // Conecta al Sur (abajo, y + 1)
      if (y < 6) {
        map[y][x].s = true;
        map[y + 1][x].n = true;
      }
      break;
    case "o": // Conecta al Oeste (izquierda, x - 1)
      if (x > 0) {
        map[y][x].o = true;
        map[y][x - 1].e = true;
      }
      break;
    case "e": // Conecta al Este (derecha, x + 1)
      if (x < 6) {
        map[y][x].e = true;
        map[y][x + 1].o = true;
      }
      break;
  }
  return map;
}
