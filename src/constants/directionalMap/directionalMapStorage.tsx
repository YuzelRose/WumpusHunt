//estructura de cada celda del mapa
export interface mapCell {
  n: boolean;
  o: boolean;
  s: boolean;
  e: boolean;
  place: string;
  enemy: string;
}
// Almacenamiento
export const mapStorage: { map: mapCell[][] } = {
  map: [],
};

//estructura de posicion
export interface position {
  x: number;
  y: number;
}
//almacenamiento
export const posStorage: { pos: position; prev: position } = {
  pos: { x: 3, y: 3 },
  prev: { x: 3, y: 4 },
};
//direccion cardinal
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
//direcciones cardinales
export interface direction {
  direction: string;
  roseWind: number;
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
//almacenamiento
export const directionStorage: { dir: direction } = {
  dir: { direction: cardinalDir.norteS, roseWind: cardinalDir.norteN },
};
