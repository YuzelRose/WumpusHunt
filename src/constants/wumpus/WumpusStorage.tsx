import { variables } from "../configs";
import {
  cardinalDir,
  direction,
  position,
} from "../directionalMap/directionalMapStorage";

export const wumpusStorage: {
  pos: position;
  prev: position;
  dir: direction;
  life: number;
} = {
  pos: { x: 0, y: 0 },
  prev: { x: 0, y: 0 },
  dir: { direction: cardinalDir.norteS, roseWind: cardinalDir.norteN },
  life: variables.wumpusLife,
};
