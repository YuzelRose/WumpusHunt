import { enemyType, roomType } from "@/constants/configs"; // Asegúrate de importar roomType
import {
  cardinalDir,
  mapStorage,
  position,
} from "../directionalMap/directionalMapStorage";
import { wumpusStorage } from "./WumpusStorage";

function positionWumpusRoom(position: position): boolean {
  if (position.x < 0 || position.x > 6 || position.y < 0 || position.y > 6) {
    return false;
  }
  const room = mapStorage.map[position.y][position.x].place;
  return room === roomType.room || room === roomType.wumpusCove;
}

export function randWumpusMove() {
  const validMove = [...validWumpusDirections()];
  const pos = wumpusStorage.pos;
  while (validMove.length > 0) {
    const index = Math.floor(Math.random() * validMove.length);
    const dir = validMove[index];

    switch (dir) {
      case cardinalDir.norteS:
        if (positionWumpusRoom({ x: pos.x, y: pos.y - 1 })) {
          setWumpusDirSTR(cardinalDir.norteN);
          mapStorage.map[pos.y][pos.x].enemy = enemyType.none;
          mapStorage.map[pos.y - 1][pos.x].enemy = enemyType.wumpus;
          return;
        }
        break;
      case cardinalDir.oesteS:
        if (positionWumpusRoom({ x: pos.x - 1, y: pos.y })) {
          setWumpusDirSTR(cardinalDir.oesteN);
          mapStorage.map[pos.y][pos.x].enemy = enemyType.none;
          mapStorage.map[pos.y][pos.x - 1].enemy = enemyType.wumpus;
          return;
        }
        break;
      case cardinalDir.surS:
        if (positionWumpusRoom({ x: pos.x, y: pos.y + 1 })) {
          setWumpusDirSTR(cardinalDir.surN);
          mapStorage.map[pos.y][pos.x].enemy = enemyType.none;
          mapStorage.map[pos.y + 1][pos.x].enemy = enemyType.wumpus;
          return;
        }
        break;
      case cardinalDir.esteS:
        if (positionWumpusRoom({ x: pos.x + 1, y: pos.y })) {
          setWumpusDirSTR(cardinalDir.esteN);
          mapStorage.map[pos.y][pos.x].enemy = enemyType.none;
          mapStorage.map[pos.y][pos.x + 1].enemy = enemyType.wumpus;
          return;
        }
        break;
    }

    validMove.splice(index, 1);
  }

  return; // Si no hay direcciones válidas, no se mueve
}

function validWumpusDirections() {
  const room = getWumpusRoomData();
  const availableDirs: string[] = [];
  if (room.n) availableDirs.push(cardinalDir.norteS);
  if (room.s) availableDirs.push(cardinalDir.surS);
  if (room.e) availableDirs.push(cardinalDir.esteS);
  if (room.o) availableDirs.push(cardinalDir.oesteS);
  return availableDirs;
}

function getWumpusRoomData() {
  const pos = wumpusStorage.pos;
  if (pos.x < 0 || pos.x > 6 || pos.y < 0 || pos.y > 6)
    return { n: false, o: false, s: false, e: false, place: "R", enemy: "N" };
  const map = mapStorage.map;
  if (!map || map.length === 0 || !map[0])
    return { n: false, o: false, s: false, e: false, place: "R", enemy: "N" };
  return map[pos.y][pos.x];
}

function setWumpusDirSTR(newData: number) {
  let data = newData;
  const pos = wumpusStorage.pos;
  if (data > 4) data = 1;
  if (data < 1) data = 4;
  wumpusStorage.dir.roseWind = data;

  switch (data) {
    case cardinalDir.norteN:
      wumpusStorage.dir.direction = cardinalDir.norteS;
      setWumpusPosSTR({ x: pos.x, y: pos.y - 1 });
      break;
    case cardinalDir.oesteN:
      wumpusStorage.dir.direction = cardinalDir.oesteS;
      setWumpusPosSTR({ x: pos.x - 1, y: pos.y });
      break;
    case cardinalDir.surN:
      wumpusStorage.dir.direction = cardinalDir.surS;
      setWumpusPosSTR({ x: pos.x, y: pos.y + 1 });
      break;
    case cardinalDir.esteN:
      wumpusStorage.dir.direction = cardinalDir.esteS;
      setWumpusPosSTR({ x: pos.x + 1, y: pos.y });
      break;
  }
}

function setWumpusPosSTR(newData: position) {
  wumpusStorage.prev = wumpusStorage.pos;
  wumpusStorage.pos = newData;
}
