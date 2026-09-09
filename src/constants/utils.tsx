import { actions, enemyType, roomType } from "@/constants/configs";
import {
  directionStorage,
  posStorage,
} from "@/constants/directionalMap/directionalMapStorage";
import {
  facedDirection,
  getRoom,
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

//espera artificial
export const wait = () => new Promise((resolve) => setTimeout(resolve, 1600));
export const midWait = 1600;

export function manageAction(
  action: string,
  router: ReturnType<typeof useRouter>,
) {
  const dir = directionStorage.dir;
  const amo = inventoryStorage.inv.amo;
  const valid = validDirections();
  switch (action) {
    case actions.intereact:
      if (roomType.armory) {
        inventoryStorage.inv.sword = true;
        inventoryStorage.inv.amo = amo + baseInventory.extraAmoPerArmory;
        setMapNewRoomSTR(roomType.room);
      }
      break;
    case actions.shoot:
      if (amo > 0 && getRoom() === roomType.passageway) {
        inventoryStorage.inv.amo = amo - 1;
        setMapNewEnemySTR(enemyType.none);
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
      }
      break;
    case actions.right:
      const rightDir = dir.roseWind - 1 < 1 ? 4 : dir.roseWind - 1;
      if (valid.includes(facedDirection(rightDir))) {
        prevRoomEvent(actions.right, router);
        setDirSTR(rightDir);
      }
      break;
  }
}
