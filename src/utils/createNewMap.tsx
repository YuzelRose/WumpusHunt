import {
  enemyType,
  mapCell,
  midWait,
  msg,
  roomType,
  variables,
  wait,
} from "@/constants/constants";
import { Dispatch, SetStateAction } from "react";
import { createHallways } from "./createHallWays";
import { getPos } from "./utils";
//inicializar mapa
function newMap() {
  const initialMap: mapCell[][] = Array.from({ length: 7 }, () =>
    Array.from({ length: 7 }, () => ({
      n: true,
      o: true,
      s: true,
      e: true,
      place: roomType.room,
      enemy: enemyType.none,
    })),
  );
  initialMap[3][3].place = roomType.start;
  return initialMap;
}
//generar limites del mapa
function dropSides(map: mapCell[][]) {
  let newMap = map;
  for (let i = 0; i < 7; i++) {
    newMap[0][i].n = false;
    newMap[6][i].s = false;
    newMap[i][0].o = false;
    newMap[i][6].e = false;
  }
  return newMap;
}
//crear cuartos
function createRoom(map: mapCell[][], createdRoom: string) {
  let newMap = map;
  const pos = getPos(newMap);
  if (!pos) return map;
  newMap[pos.y][pos.x].place = createdRoom;
  if (createdRoom === roomType.ghoulCove)
    newMap[pos.y][pos.x].enemy = enemyType.ghoul;
  if (createdRoom === roomType.wumpusCove)
    newMap[pos.y][pos.x].enemy = enemyType.wumpus;
  return newMap;
}
//crear mapa
export async function createNewMap(
  out: Dispatch<SetStateAction<string>>,
  progress: Dispatch<SetStateAction<number>>,
) {
  progress(0);
  out(msg.a);
  let Map = newMap();
  Map = dropSides(Map);
  await wait(midWait);
  progress(12.5);
  out(msg.b);
  for (let i = 0; i < variables.halls; i++) Map = createHallways(Map, i);
  await wait(midWait);
  progress(25);
  out(msg.c);
  for (let i = 0; i < variables.holes; i++)
    Map = createRoom(Map, roomType.hole);
  await wait(midWait);
  progress(37.5);
  out(msg.d);
  Map = createRoom(Map, roomType.church);
  await wait(midWait);
  progress(50);
  out(msg.e);
  Map = createRoom(Map, roomType.wumpusCove);
  await wait(midWait);
  progress(62.5);
  out(msg.f);
  Map = createRoom(Map, roomType.ghoulCove);
  await wait(midWait);
  progress(75);
  out(msg.g);
  for (let i = 0; i < 2; i++) Map = createRoom(Map, roomType.armory);
  await wait(midWait);
  progress(87.5);
  out(msg.h);
  await wait(midWait);
  progress(100);
  return Map;
}
