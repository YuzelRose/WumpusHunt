import {
  actions,
  cardinalDir,
  mapCell,
  position,
  roomType,
  variables,
} from "@/constants/constants";
import {
  directionStorage,
  goBack,
  inventoryStorage,
  mapStorage,
  posStorage,
  setDirSTR,
  setPosSTR,
} from "@/constants/storage";

//espera artificial
export const wait = () => new Promise((resolve) => setTimeout(resolve, 1600));
export const midWait = 1600;

//generacion del mapa no tocar
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
//conecta habitaciones
export function connect(map: mapCell[][], pos: position, dir: string) {
  const { x, y } = pos;
  switch (dir) {
    case cardinalDir.norteS: // Conecta al Norte (arriba, y - 1)
      if (y > 0) {
        map[y][x].n = true;
        map[y - 1][x].s = true;
      }
      break;
    case cardinalDir.surS: // Conecta al Sur (abajo, y + 1)
      if (y < 6) {
        map[y][x].s = true;
        map[y + 1][x].n = true;
      }
      break;
    case cardinalDir.oesteS: // Conecta al Oeste (izquierda, x - 1)
      if (x > 0) {
        map[y][x].o = true;
        map[y][x - 1].e = true;
      }
      break;
    case cardinalDir.esteS: // Conecta al Este (derecha, x + 1)
      if (x < 6) {
        map[y][x].e = true;
        map[y][x + 1].o = true;
      }
      break;
  }
  return map;
}
//da el tipo de habitacion
export function getRoom() {
  const pos = posStorage.pos;
  if (pos.x < 0 || pos.x > 6 || pos.y < 0 || pos.y > 6)
    return "Error de posición.";
  const map = mapStorage.map;
  if (!map || map.length === 0 || !map[0]) return "Error de mapa.";
  return map[pos.y][pos.x].place;
}
//da enemigo de la habitacion
export function getRooomEnemy() {
  const pos = posStorage.pos;
  if (pos.x < 0 || pos.x > 6 || pos.y < 0 || pos.y > 6)
    return "Error de posición.";
  const map = mapStorage.map;
  if (!map || map.length === 0 || !map[0]) return "Error de mapa.";
  return map[pos.y][pos.x].enemy;
}
//da una instancia del objeto en las posiciones dadas
export function getRoomData() {
  const pos = posStorage.pos;
  if (pos.x < 0 || pos.x > 6 || pos.y < 0 || pos.y > 6)
    return { n: false, o: false, s: false, e: false, place: "R", enemy: "N" };
  const map = mapStorage.map;
  if (!map || map.length === 0 || !map[0])
    return { n: false, o: false, s: false, e: false, place: "R", enemy: "N" };
  return map[pos.y][pos.x];
}
//Salidas validas de la habitacion
export function validDirections() {
  const room = getRoomData();
  const availableDirs: string[] = [];
  if (room.n) availableDirs.push(cardinalDir.norteS);
  if (room.s) availableDirs.push(cardinalDir.surS);
  if (room.e) availableDirs.push(cardinalDir.esteS);
  if (room.o) availableDirs.push(cardinalDir.oesteS);
  return availableDirs;
}
//Salidas validas de la habitacion
export function validDirectionsBool() {
  const room = getRoomData();

  return { n: room.n, o: room.o, s: room.s, e: room.e };
}

export function facedDirection(dir: number) {
  if (dir === cardinalDir.norteN) return cardinalDir.norteS;
  else if (dir === cardinalDir.oesteN) return cardinalDir.oesteS;
  else if (dir === cardinalDir.surN) return cardinalDir.surS;
  else return cardinalDir.esteS;
}

export function managgeAction(action: string) {
  const dir = directionStorage.dir;
  const amo = inventoryStorage.inv.amo;
  const valid = validDirections();
  switch (action) {
    case actions.intereact:
      break;
    case actions.shoot:
      if (amo > 0) inventoryStorage.inv.amo = amo - 1;
      break;
    case actions.front:
      if (valid.includes(facedDirection(dir.roseWind))) {
        const x = posStorage.pos.x;
        const y = posStorage.pos.y;
        const newX = x - posStorage.prev.x;
        const newY = y - posStorage.prev.y;
        setPosSTR({ x: x + newX, y: y + newY });
      }
      break;
    case actions.back:
      goBack(dir.roseWind);
      break;
    case actions.left:
      const leftDir = dir.roseWind + 1 > 4 ? 1 : dir.roseWind + 1;
      if (valid.includes(facedDirection(leftDir))) setDirSTR(leftDir);

      break;
    case actions.right:
      const rightDir = dir.roseWind - 1 < 1 ? 4 : dir.roseWind - 1;
      if (valid.includes(facedDirection(rightDir))) setDirSTR(rightDir);
      break;
  }
}

export function relativeDir() {
  switch (directionStorage.dir.roseWind) {
    case 1:
      return {
        front: cardinalDir.norteS,
        back: cardinalDir.surS,
        left: cardinalDir.oesteS,
        right: cardinalDir.esteS,
      };
    case 2:
      return {
        front: cardinalDir.oesteS,
        back: cardinalDir.esteS,
        left: cardinalDir.surS,
        right: cardinalDir.norteS,
      };
    case 3:
      return {
        front: cardinalDir.surS,
        back: cardinalDir.norteS,
        left: cardinalDir.esteS,
        right: cardinalDir.oesteS,
      };
    case 4:
      return {
        front: cardinalDir.esteS,
        back: cardinalDir.oesteS,
        left: cardinalDir.norteS,
        right: cardinalDir.surS,
      };
  }
}
