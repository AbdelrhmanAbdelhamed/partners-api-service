import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PartnersQueryDto } from '../dtos';
import { Partner } from '../schemas';
import { PartnersService } from '../services';

@ApiTags('Partners')
@Controller({
  path: 'partners',
  version: '1',
})
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @ApiOperation({
    summary: `Read a list of partners within a given optional range of a reference point`,
  })
  @ApiOkResponse({
    description: `List of partners within a given optional range of a reference point`,
  })
  @Get('/')
  async read(@Query() partnersQuery: PartnersQueryDto): Promise<Partner[]> {
    return this.partnersService.read(partnersQuery);
  }
}
