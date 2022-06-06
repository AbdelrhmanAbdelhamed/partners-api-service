import { Test } from '@nestjs/testing';
import { CACHE_MANAGER, INestApplication } from '@nestjs/common';

import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { PartnersModule } from './../src/partners/partners.module';

describe('PartnersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PartnersModule],
    })
      .overrideProvider(CACHE_MANAGER)
      .useValue({
        get: () => undefined,
        set: () => jest.fn(),
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/partners (GET)`, () => {
    return request(app.getHttpServer())
      .get(
        '/partners?reference=51.5144636,-0.142571&range=5.13&unit=km&page=1&limit=2&sort=organization&desc=true',
      )
      .expect({
        code: 'SUCCESS',
        response: [
          {
            id: 13,
            urlName: 'gallus-consulting',
            organization: 'Gallus Consulting',
            customerLocations: 'across the UK',
            willWorkRemotely: true,
            website: 'http://www.gallusconsulting.com/',
            services:
              "We're strategy consultants with a difference - we work with organisations and their leaders to take them from strategy to reality. In our work with leaders we often use 360-degree feedback to identify capability gaps, improve self-awareness, and develop strategic and cultural alignment. Our aim is for believe-able leaders to emerge with the drive, capability and cultural fit to take strategy to reality.",
            offices: [
              {
                location: 'London',
                address: 'No1 Royal Exchange, London, EC3V 3DG',
                coordinates: '51.5136102,-0.08757919999993646',
              },
            ],
          },
          {
            id: 4,
            urlName: 'blue-square-360',
            organization: 'Blue Square 360',
            customerLocations: 'globally',
            willWorkRemotely: true,
            website: 'http://www.bluesquare360.com/',
            services:
              "Blue Square 360 provides a professionally managed service covering all areas of a 360Â° Feedback initiative. We're experienced in supporting projects of all sizes, and always deliver a personal service that provides the level of support you need to ensure your 360 initiative delivers results for the business.",
            offices: [
              {
                location: 'London, UK',
                address: 'St Saviours Wharf, London SE1 2BE',
                coordinates: '51.5014767,-0.0713608999999451',
              },
            ],
          },
        ],
        page: 1,
        limit: 2,
        pages: 1,
        total: 2,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
