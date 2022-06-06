import { Test, TestingModule } from '@nestjs/testing';
import { DistanceCalculator, Point, Unit } from '../models';
import { SphericalLawOfCosinesDistanceCalculator } from '.';

describe('SphericalLawOfCosinesDistanceCalculator', () => {
  let sphericalLawOfCosinesDistanceCalculator: DistanceCalculator;
  let point1: Point;
  let point2: Point;
  let unit: Unit;

  beforeEach(async () => {
    point1 = { lat: 51.5014767, lng: -0.0713608999999451 };
    point2 = { lat: 51.5144636, lng: -0.142571 };
    unit = 'km';

    const module: TestingModule = await Test.createTestingModule({
      providers: [SphericalLawOfCosinesDistanceCalculator],
    }).compile();

    sphericalLawOfCosinesDistanceCalculator = module.get(
      SphericalLawOfCosinesDistanceCalculator,
    );
  });

  it('should be defined', async () => {
    expect(sphericalLawOfCosinesDistanceCalculator).toBeDefined();
  });

  it('should be calculate the distance between two points correctly', async () => {
    const distance = sphericalLawOfCosinesDistanceCalculator.calculate({
      point1,
      point2,
      unit,
    });
    expect(5.13 - distance).toBeLessThan(0.01);
  });
});
