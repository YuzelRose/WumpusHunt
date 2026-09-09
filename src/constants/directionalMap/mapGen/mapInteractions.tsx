import { actions, enemyType, roomType, variables } from "@/constants/configs";
import { inventoryStorage } from "@/constants/inventory/inventoryStorage";
import { useRouter } from "expo-router";
import { cardinalDir, mapStorage, posStorage } from "../directionalMapStorage";
import {
    positionRoom,
    setDirSTR,
    setMapNewEnemySTR,
    validDirections,
} from "../directionUtils";

export function prevRoomEvent(
  action: string,
  router: ReturnType<typeof useRouter>,
) {
  const lastRoom = posStorage.pos;
  const lastRoomType = mapStorage.map[lastRoom.y][lastRoom.x].place;
  const lastRoomEnemy = mapStorage.map[lastRoom.y][lastRoom.x].enemy;
  const light = inventoryStorage.inv.light;
  switch (lastRoomType) {
    case roomType.hole:
      if (action !== actions.back) router.push("/gameOver");
      break;
    case roomType.passageway:
      setMapNewEnemySTR(enemyType.none);
      if (lastRoomEnemy === enemyType.bats && !light) {
        for (let i = 0; i < variables.randMoves; i++) randMove();
      } else {
        //mensaje
      }
      break;
  }
}

export function randMove() {
  const validMove = [...validDirections()];
  const pos = posStorage.pos;
  while (validMove.length > 0) {
    let index = Math.floor(Math.random() * validMove.length);
    let dir = validMove[index];
    switch (dir) {
      case cardinalDir.norteS:
        if (positionRoom({ x: pos.x, y: pos.y - 1 })) {
          setDirSTR(cardinalDir.norteN);
          console.log(dir);
          return;
        }
        break;
      case cardinalDir.oesteS:
        if (positionRoom({ x: pos.x - 1, y: pos.y })) {
          setDirSTR(cardinalDir.oesteN);
          console.log(dir);
          return;
        }
        break;
      case cardinalDir.surS:
        if (positionRoom({ x: pos.x, y: pos.y + 1 })) {
          setDirSTR(cardinalDir.surN);
          console.log(dir);
          return;
        }
        break;
      case cardinalDir.esteS:
        if (positionRoom({ x: pos.x + 1, y: pos.y })) {
          setDirSTR(cardinalDir.esteN);
          console.log(dir);
          return;
        }
        break;
    }
    validMove.splice(index, 1);
  }
  return;
}
