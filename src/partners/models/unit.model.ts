export enum Units {
  km,
  meter,
  mile,
}

export type Unit = keyof typeof Units;
