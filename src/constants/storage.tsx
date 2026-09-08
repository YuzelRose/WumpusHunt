import {
  cardinalDir,
  direction,
  inventory,
  mapCell,
  position,
} from "@/constants/constants";
import { facedDirection } from "@/utils/utils";
// Almacenamiento variables invocables
export const mapStorage: { map: mapCell[][] } = {
  map: [],
};

export const posStorage: { pos: position; prev: position } = {
  pos: { x: 3, y: 3 },
  prev: { x: 3, y: 4 },
};

export const directionStorage: { dir: direction } = {
  dir: { direction: cardinalDir.norteS, roseWind: cardinalDir.norteN },
};

export const inventoryStorage: { inv: inventory } = {
  inv: {
    amo: 6,
    light: false,
    sword: false,
  },
};
//dar nuevos valores a las variables invocables
export function setMapSTR(newData: mapCell[][]) {
  mapStorage.map = newData;
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
//establecer la direccion en la que seesta viendo el mapa
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
