import { Injectable } from '@nestjs/common';
import { PartnersRepository } from '../repositories';
import { DistanceCalculator, Filter, Point } from '../models';
import { InjectDistanceCalculatorToken } from '../decorators';
import { PartnersQueryDto } from '../dtos';
import { isLessThan } from '../../utils';
import { Partner } from '../schemas';

@Injectable()
export class PartnersService {
  constructor(
    private readonly partnersRepository: PartnersRepository,
    @InjectDistanceCalculatorToken()
    private readonly distanceCalculator: DistanceCalculator,
  ) {}

  async read(partnersQueryDto: PartnersQueryDto): Promise<Partner[]> {
    const partners = await this.partnersRepository.findAll();

    const filteredPartners = Filter.applyAll<Partner>(
      [new RangeFilter(partnersQueryDto, this.distanceCalculator)],
      partners,
    );

    return filteredPartners;
  }
}

class RangeFilter extends Filter<Partner> {
  partnersQueryDto: PartnersQueryDto;
  distanceCalculator: DistanceCalculator;

  constructor(
    partnersQueryDto: PartnersQueryDto,
    distanceCalculator: DistanceCalculator,
  ) {
    super();
    this.partnersQueryDto = partnersQueryDto;
    this.distanceCalculator = distanceCalculator;
  }
  apply(data: Partner[]) {
    if (this.partnersQueryDto.range == null) return data;

    return data.filter((partner) => {
      partner.offices = partner.offices.filter((office) =>
        isLessThan(
          this.partnersQueryDto.range,
          this.distanceCalculator.calculate({
            point1: Point.fromString(this.partnersQueryDto.reference),
            point2: office.coordinates,
            unit: this.partnersQueryDto.unit,
          }),
        ),
      );
      return partner.offices.length > 0;
    });
  }
}
