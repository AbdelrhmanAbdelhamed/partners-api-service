import { Transform, Type } from 'class-transformer';
import { Point } from '../models';
import { BaseSchema } from '../../schemas';

export class Partner extends BaseSchema<Partner> {
  id: string;
  urlName: string;
  organization: string;
  customerLocations: string;
  willWorkRemotely: boolean;
  website: string;
  services: string;
  @Type(() => Office)
  offices: Office[];
}

export class Office extends BaseSchema<Office> {
  location: string;
  address: string;

  @Transform(({ value }) => transformToClassCoordinates(value), {
    toClassOnly: true,
  })
  @Transform(({ value }) => transformToPlainCoordinates(value), {
    toPlainOnly: true,
  })
  coordinates: Point;
}

function transformToClassCoordinates(coordinates: any) {
  const latLng =
    typeof coordinates === 'string'
      ? coordinates.split(',').map(Number)
      : coordinates instanceof Point ||
        ('lat' in coordinates && 'lng' in coordinates)
      ? [coordinates.lat, coordinates.lng]
      : null;

  if (!latLng || latLng.length < 2) {
    throw new Error(`Invalid coordinates: ${JSON.stringify(coordinates)}`);
  }

  return { lat: latLng[0], lng: latLng[1] };
}

function transformToPlainCoordinates(coordinates: Point) {
  return `${coordinates.lat},${coordinates.lng}`;
}
