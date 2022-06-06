import {
  getDistanceCalculatorToken,
  SphericalLawOfCosinesDistanceCalculator,
} from '../utils';

export const DistanceCalculatorProvider = {
  provide: getDistanceCalculatorToken(),
  useClass: SphericalLawOfCosinesDistanceCalculator,
};
