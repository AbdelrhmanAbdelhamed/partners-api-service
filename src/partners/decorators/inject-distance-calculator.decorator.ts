import { Inject } from '@nestjs/common';

import { getDistanceCalculatorToken } from '../utils';

export const InjectDistanceCalculatorToken = () => {
  return Inject(getDistanceCalculatorToken());
};
