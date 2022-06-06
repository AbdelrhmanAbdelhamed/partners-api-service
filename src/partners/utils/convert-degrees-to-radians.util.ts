import { Point } from '../models/point.model';

function toRad(degree) {
  return (degree * Math.PI) / 180;
}

export function convertDegreesToRadians(pointInDegrees: Point): Point {
  return {
    lat: toRad(pointInDegrees.lat),
    lng: toRad(pointInDegrees.lng),
  };
}
