import { Point, Unit } from '.';

export abstract class DistanceCalculator {
  abstract calculate({ point1, point2, unit }: calculateDistanceParams): number;
}

export type calculateDistanceParams = {
  point1: Point;
  point2: Point;
  unit: Unit;
};
