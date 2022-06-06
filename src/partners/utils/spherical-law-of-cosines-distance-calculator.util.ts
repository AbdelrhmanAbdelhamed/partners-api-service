import { Injectable } from '@nestjs/common';
import {
  calculateDistanceParams,
  DistanceCalculator,
} from '../models/distance-calculator.model';

import { convertDegreesToRadians, getEarthMeanRadius } from '.';

@Injectable()
export class SphericalLawOfCosinesDistanceCalculator extends DistanceCalculator {
  calculate({ point1, point2, unit }: calculateDistanceParams): number {
    const point1InRad = convertDegreesToRadians(point1);
    const point2InRad = convertDegreesToRadians(point2);

    // https://en.wikipedia.org/wiki/Great-circle_distance
    const theCentralAngle = Math.acos(
      Math.sin(point1InRad.lat) * Math.sin(point2InRad.lat) +
        Math.cos(point1InRad.lat) *
          Math.cos(point2InRad.lat) *
          Math.cos(point2InRad.lng - point1InRad.lng),
    );

    return theCentralAngle * getEarthMeanRadius(unit);
  }
}
