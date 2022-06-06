import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, Min } from 'class-validator';

export class BaseQueryDto<T> {
  @ApiProperty({
    description: `Used to sort the data according to its value.`,
    example: 'organization',
    default: 'organization',
  })
  @IsString()
  sort = 'organization';

  @ApiProperty({
    description: `Used to sort the data in descending order if true, ascending if value`,
    example: false,
    default: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  desc = false;

  @ApiProperty({
    description: `Used to paginate the result`,
    example: 1,
    default: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page = 1;

  @ApiProperty({
    description: `Used to paginate and limit the number of items in the result (set it to 0 for all items)`,
    example: 10,
    default: 0,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  limit = 0;

  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
