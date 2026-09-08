import {
    enemyType,
    passageMsg,
    placeMsg,
    roomType,
} from "@/constants/constants";
import { inventoryStorage } from "@/constants/storage";
import { getRoom, getRooomEnemy } from "./utils";

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
  const room = getRoom();
  switch (room) {
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
      if (light) setMsg(placeMsg.HL);
      else setMsg(placeMsg.def);
      break;
    case roomType.passageway:
      setMsg(passageMsg.P);
      break;
    case roomType.start:
      setMsg(placeMsg.S);
      break;
    case roomType.wumpusCove:
      setMsg(placeMsg.W);
      break;
    case roomType.wumpusMarks:
      setMsg(placeMsg.wM);
      break;
    case roomType.room:
      setMsg(placeMsg.def);
      break;
  }
}
