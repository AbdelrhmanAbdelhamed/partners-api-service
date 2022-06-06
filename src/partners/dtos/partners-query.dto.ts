import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString, Min, IsEnum } from 'class-validator';
import { Units, Unit } from '../models';
import { BaseQueryDto } from '../../dtos';

export const STARBUCKS_CAFE_CENTRAL_LONDON_COORDINATES = '51.5144636,-0.142571';

export class PartnersQueryDto extends BaseQueryDto<PartnersQueryDto> {
  @ApiProperty({
    description: `Comma separated lat and lng, used to filter the partners/offices around it.`,
    example: STARBUCKS_CAFE_CENTRAL_LONDON_COORDINATES,
    default: STARBUCKS_CAFE_CENTRAL_LONDON_COORDINATES,
  })
  @IsString()
  reference = STARBUCKS_CAFE_CENTRAL_LONDON_COORDINATES;

  @ApiProperty({
    description: `Used to filter the partners/offices within the given range of the reference coordinates.`,
    example: 5.13,
  })
  @IsNumber()
  @Min(0.01)
  @IsOptional()
  @Type(() => Number)
  range;

  @ApiProperty({
    description: `Used to decide the distance unit. (default = 'km')`,
    example: 'km',
    default: 'km',
  })
  @IsOptional()
  @IsEnum(Units)
  unit: Unit = 'km';
}
