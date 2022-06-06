import { Unit } from '../models';

const unitRadiusMap = {
  km: 6371,
  meter: 6371000,
  mile: 3960,
};

/**
 *
 * @param unit to return with
 * @returns The mean radius of the earth
 */
export function getEarthMeanRadius(unit: Unit): number {
  return unitRadiusMap[unit];
}
