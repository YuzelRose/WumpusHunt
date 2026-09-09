import {
  passageMsg,
  placeLightMsg,
  placeMsg,
} from "@/constants/msg/msgStorage";
import { enemyType, roomType } from "../configs";
import { getRoom, getRooomEnemy } from "../directionalMap/directionUtils";
import { inventoryStorage } from "../inventory/inventoryStorage";

interface passagewayProps {
  setMsg: React.Dispatch<React.SetStateAction<string>>;
}
export function passagewayMSG({ setMsg }: passagewayProps) {
  const light = inventoryStorage.inv.light;
  const enemy = getRooomEnemy();
  if (enemy === enemyType.bats) {
    if (light) setMsg(passageMsg.PLV);
  } else {
    if (light) setMsg(passageMsg.PL);
  }
}

export function defaultMSG({ setMsg }: passagewayProps) {
  const light = inventoryStorage.inv.light;
  switch (getRoom()) {
    case roomType.armory:
      setMsg(placeMsg.A);
      break;
    case roomType.church:
      setMsg(placeMsg.C);
      break;
    case roomType.ghoulCove:
      setMsg(placeMsg.G);
      break;
    case roomType.hole:
      if (light) setMsg(placeLightMsg.H);
      else setMsg(placeMsg.def);
      break;
    case roomType.start:
      setMsg(placeMsg.S);
      break;
    case roomType.wumpusCove:
      setMsg(placeMsg.W);
      break;
    case roomType.wumpusMarks:
      setMsg(placeLightMsg.WM);
      break;
    default:
      setMsg(placeMsg.def);
      break;
  }
}
