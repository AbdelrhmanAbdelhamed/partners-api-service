export class Point {
  lat: number;
  lng: number;

  static fromString(coordinatesStr: string): Point {
    const invalidCoordinatesErrorMessage = `Invalid coordinatesStr ${JSON.stringify(
      coordinatesStr,
    )}`;

    if (typeof coordinatesStr !== 'string')
      throw new Error(invalidCoordinatesErrorMessage);

    const coordinatesArr = coordinatesStr.split(',').map(Number);

    if (coordinatesArr.length !== 2)
      throw new Error(invalidCoordinatesErrorMessage);

    return { lat: coordinatesArr[0], lng: coordinatesArr[1] };
  }
}
