import { SvgProps } from "react-native-svg";

//configuraciones
export const variables = {
  debug: true,
  halls: 12,
  holes: 4,
  randMoves: 4,
  randWumpusMoves: 5,
  wumpusLife: 4,
  maxAttempts: 50,
  version: "0.3.0",
};
//Enemigos
export const enemyType = {
  wumpus: "W",
  him: "H",
  bats: "B",
  ghoul: "G",
  none: "N",
};
//Habitaciones
export const roomType = {
  hole: "H", //listo
  start: "S", //listo
  room: "R", //listo
  passageway: "P", //listo
  church: "C", //listo
  wumpusCove: "W", //listo
  ghoulCove: "G", //listo
  armory: "A", //listo
  wumpusMarks: "M",
};
//Acciones
export const actions = {
  intereact: "I",
  shoot: "S",
  left: "L",
  front: "F",
  right: "R",
  back: "B",
};

export interface IconProps extends SvgProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  rotation?: number;
}
//bandera para detectar cambios
export interface flag {
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  flag: boolean;
}
export interface passFlag {
  flag: boolean;
}
