import { actions, enemyType, roomType, variables } from "@/constants/configs";
import {
  directionStorage,
  posStorage,
} from "@/constants/directionalMap/directionalMapStorage";
import {
  facedDirection,
  getRoom,
  getRooomEnemy,
  goBack,
  setDirSTR,
  setMapNewEnemySTR,
  setMapNewRoomSTR,
  setPosSTR,
  validDirections,
} from "@/constants/directionalMap/directionUtils";
import {
  baseInventory,
  inventoryStorage,
} from "@/constants/inventory/inventoryStorage";
import { useRouter } from "expo-router";
import { prevRoomEvent } from "./directionalMap/mapGen/mapInteractions";
import { wumpusStorage } from "./wumpus/WumpusStorage";
import { randWumpusMove } from "./wumpus/WunpusUtils";

//espera artificial
export const wait = () => new Promise((resolve) => setTimeout(resolve, 1600));
export const midWait = 1600;

export function manageAction(
  action: string,
  router: ReturnType<typeof useRouter>,
  counter: number,
) {
  const dir = directionStorage.dir;
  const amo = inventoryStorage.inv.amo;
  const valid = validDirections();
  switch (action) {
    case actions.intereact:
      if (getRoom() === roomType.armory) {
        inventoryStorage.inv.sword = true;
        inventoryStorage.inv.amo = amo + baseInventory.extraAmoPerArmory;
        setMapNewRoomSTR(roomType.room);
      }
      break;
    case actions.shoot:
      switch (getRoom()) {
        case roomType.ghoulCove:
          if (inventoryStorage.inv.sword) {
            setMapNewEnemySTR(enemyType.none);
            inventoryStorage.inv.light = true;
          }
          break;
        case roomType.passageway:
          if (amo > 0 && getRoom()) {
            inventoryStorage.inv.amo = amo - 1;
            setMapNewEnemySTR(enemyType.none);
          }
          break;
      }
      if (getRooomEnemy() === enemyType.wumpus) {
        const amo = inventoryStorage.inv.amo;
        const life = wumpusStorage.life - amo;
        if (life <= 0) router.push("/end");
        else {
          for (let i = 0; i < variables.randWumpusMoves; i++) randWumpusMove();
          inventoryStorage.inv.amo = 0;
          wumpusStorage.life = life;
        }
      }
      break;
    case actions.front:
      if (valid.includes(facedDirection(dir.roseWind))) {
        prevRoomEvent(actions.front, router);
        const x = posStorage.pos.x;
        const y = posStorage.pos.y;
        const newX = x - posStorage.prev.x;
        const newY = y - posStorage.prev.y;
        setPosSTR({ x: x + newX, y: y + newY });
        if (counter % 5 === 0)
          for (let i = 0; i < variables.randWumpusMoves; i++) randWumpusMove();
      }
      break;
    case actions.back:
      goBack(dir.roseWind);
      break;
    case actions.left:
      const leftDir = dir.roseWind + 1 > 4 ? 1 : dir.roseWind + 1;
      if (valid.includes(facedDirection(leftDir))) {
        prevRoomEvent(actions.left, router);
        setDirSTR(leftDir);
        if (counter % 5 === 0)
          for (let i = 0; i < variables.randWumpusMoves; i++) randWumpusMove();
      }
      break;
    case actions.right:
      const rightDir = dir.roseWind - 1 < 1 ? 4 : dir.roseWind - 1;
      if (valid.includes(facedDirection(rightDir))) {
        prevRoomEvent(actions.right, router);
        setDirSTR(rightDir);
        if (counter % 5 === 0)
          for (let i = 0; i < variables.randWumpusMoves; i++) randWumpusMove();
      }
      break;
  }
}
