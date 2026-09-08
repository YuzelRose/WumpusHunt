import { SvgProps } from "react-native-svg";

//configuraciones
export const variables = {
  debug: true,
  halls: 12,
  holes: 4,
  maxAttempts: 50,
  version: "0.1.0",
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
//Enemigos
export const enemyType = {
  wumpus: "W",
  him: "H",
  bats: "B",
  ghoul: "G",
  none: "N",
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
//direcciones cardinales
export interface direction {
  direction: string;
  roseWind: number;
}
export const cardinalDir = {
  norteS: "n",
  norteN: 1,
  oesteS: "o",
  oesteN: 2,
  surS: "s",
  surN: 3,
  esteS: "e",
  esteN: 4,
};

//textos
export const msg = {
  a: "Creando mapa.",
  b: "¿Tienes Quiroptofobia?",
  c: "¿Acrofobia acaso?",
  d: "Construyendo portales ominosos.",
  e: "¿Tu padre te espera?",
  f: "¿Sabes que huele tu miedo?",
  g: "Ármate... encuentra su luz.",
  h: "Las criaturas te esperan.",
};
//mensajes de muerte
export const deathMsg = {};
//mensajes por lugar
export const placeMsg = {
  def: "Escuchas un sonido en la lejania algo podria estar cercas.",
  S: "Haz caido por un agujero, la luz se filtra suavemente por la cueva iluminando suavemente tu entorno.",
  HL: "Logras ver un agujero frente a ti seguir adelante seria riesgoso.",
  C: "Entras a uan iglesia un altar suavemene iluminado atrae tu vista.\nPodrias descanzar aqui.",
  R: "Entras a una habitación.",
  W: "El aire se vuelve denso y pesado. Algo te observa desde las sombras...",
  NG: "Un hedor putrefacto invade tus fosas nasales.",
  G: "Mientras te submerjes en la oscuridad los sonidos guturales de una bestia rompen el silencio, preparate.",
  A: "Encuentras una armería abandonada. Quizá haya algo útil aquí.",
  wM: "Ves marcas de garras en las paredes. El Wumpus estuvo aquí.",
};
//mensajes por posicion
export const passageMsg = {
  P: "Entras en la oscura y angosta brecha.\n¿Sigues adelante?",
  PG: "El cañón de tu arma humea.",
  PGV: "Mientras el cañón de tu arma humea, escuchas a los habitantes salir del otro lado. Ahora debería ser seguro.",
  PL: "Tu candil ilumina la brecha.",
  PLV: "Una nube de vampiros oscurece tu visión por un momento. Ahora debería ser seguro.",
  PO: "Sales del otro lado de la brecha.",
  POV: "Los habitantes de la cueva te perciben mientras sales, haciendo que te pierdas en la oscuridad.",
};
//estructura de cada celda del mapa
export interface mapCell {
  n: boolean;
  o: boolean;
  s: boolean;
  e: boolean;
  place: string;
  enemy: string;
}
//estructura de posicion
export interface position {
  x: number;
  y: number;
}
//estructura de salidas valdias
export interface outs {
  n: boolean;
  o: boolean;
  s: boolean;
  e: boolean;
}

export interface validOuts {
  dir: string[];
  map: mapCell[][];
}

//inventario:
export interface inventory {
  amo: number;
  light: boolean;
  sword: boolean;
}

export interface IconProps extends SvgProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  rotation?: number;
}
//bandera para detectar cambios
export interface flag {
  flag: boolean;
}
