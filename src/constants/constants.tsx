//configuraciones
export const variables = {
  halls: 12,
  holes: 4,
  debug: false,
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

export interface mapCell {
  n: boolean;
  o: boolean;
  s: boolean;
  e: boolean;
  place: string;
  enemy: string;
}
export interface position {
  x: number;
  y: number;
}

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

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export const midWait = 1600;
