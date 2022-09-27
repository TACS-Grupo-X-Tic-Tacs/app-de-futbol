import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EstadisticasModule } from '../src/endpoints/estadisticas/estadisticas.module';

describe('EstadisticasController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EstadisticasModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/estadisticas (GET) devuelve 200 + las cantidades de jugadores y partidos en las ultimas horas', () => {
    return request(app.getHttpServer())
      .get('/estadisticas')
      .expect(200)
      .then(response =>{
        expect(response.body.jugadoresAnotados).toEqual(0)
        expect(response.body.partidosCreados).toEqual(0)
      })
  });
});
