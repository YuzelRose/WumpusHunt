import { roomType, variables } from "../configs";
import {
  cardinalDir,
  directionStorage,
  mapCell,
  mapStorage,
  position,
  posStorage,
} from "./directionalMapStorage";

//dar nuevos valores a las variables invocables
export function setMapSTR(newData: mapCell[][]) {
  mapStorage.map = newData;
}

export function setMapNewRoomSTR(newData: string) {
  const pos = posStorage.pos;
  mapStorage.map[pos.y][pos.x].place = newData;
}

export function setMapNewEnemySTR(newData: string) {
  const pos = posStorage.pos;
  mapStorage.map[pos.y][pos.x].enemy = newData;
}

export function setPosSTR(newData: position) {
  posStorage.prev = posStorage.pos;
  posStorage.pos = newData;
}
// ir a la posicion previa
export function goBack(facing: number) {
  let back = facing - 2;
  if (back === 0) back = 4;
  if (back === -1) back = 3;
  directionStorage.dir.roseWind = back;
  directionStorage.dir.direction = facedDirection(back);
  const currentPos = posStorage.pos;
  const prevPos = posStorage.prev;
  posStorage.pos = { x: prevPos.x, y: prevPos.y };
  posStorage.prev = { x: currentPos.x, y: currentPos.y };
}
//establecer la direccion en la que se esta viendo el mapa
export function setDirSTR(newData: number) {
  let data = newData;
  const pos = posStorage.pos;
  if (data > 4) data = 1;
  if (data < 1) data = 4;
  directionStorage.dir.roseWind = data;
  switch (data) {
    case cardinalDir.norteN:
      directionStorage.dir.direction = cardinalDir.norteS;
      setPosSTR({ x: pos.x, y: pos.y - 1 }); // Norte: y - 1
      break;
    case cardinalDir.oesteN:
      directionStorage.dir.direction = cardinalDir.oesteS;
      setPosSTR({ x: pos.x - 1, y: pos.y }); // Oeste: x - 1
      break;
    case cardinalDir.surN:
      directionStorage.dir.direction = cardinalDir.surS;
      setPosSTR({ x: pos.x, y: pos.y + 1 }); // Sur: y + 1
      break;
    case cardinalDir.esteN:
      directionStorage.dir.direction = cardinalDir.esteS;
      setPosSTR({ x: pos.x + 1, y: pos.y }); // Este: x + 1
      break;
  }
}
//variables invocables no nulas
export function mapNotNull() {
  const map = mapStorage.map;
  if (!map || map.length === 0 || !map[0]) return false;
  return true;
}

export function posNotNull() {
  const pos = posStorage.pos;
  if (pos.x < 0 || pos.x > 6 || pos.y < 0 || pos.y > 6) return false;
  return true;
}

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
  const validDir = { n: room.n, o: room.o, s: room.s, e: room.e };
  switch (directionStorage.dir.roseWind) {
    case 1:
      return {
        front: validDir.n,
        back: validDir.s,
        left: validDir.o,
        right: validDir.e,
      };
    case 2:
      return {
        front: validDir.o,
        back: validDir.e,
        left: validDir.s,
        right: validDir.n,
      };
    case 3:
      return {
        front: validDir.s,
        back: validDir.n,
        left: validDir.e,
        right: validDir.o,
      };
    case 4:
      return {
        front: validDir.e,
        back: validDir.o,
        left: validDir.n,
        right: validDir.s,
      };
  }
  return {
    front: false,
    back: false,
    left: false,
    right: false,
  };
}
//Direccion a la que se esta viendo string
export function facedDirection(dir: number) {
  if (dir === cardinalDir.norteN) return cardinalDir.norteS;
  else if (dir === cardinalDir.oesteN) return cardinalDir.oesteS;
  else if (dir === cardinalDir.surN) return cardinalDir.surS;
  else return cardinalDir.esteS;
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

export function positionRoom(position: position) {
  const room = mapStorage.map[position.y][position.x].place;
  if (room === roomType.room) return true;
  return false;
}
