import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PartidosModule } from "../src/endpoints/partidos/partidos.module";
import { CrearPartidoDto } from "../src/endpoints/partidos/partidos.controller";

describe('PartidosController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PartidosModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/partidos (Post) devuelve 200 + los datos del partido con su id', () => {

    let fechaEsperada = "2020-07-10 15:00";
    let lugarEsperado = "boca juniors";
    const datosPartido: CrearPartidoDto = {
      fechaYHora: fechaEsperada,
      lugar: lugarEsperado
    }

    return request(app.getHttpServer())
      .post('/partidos')
      .send(datosPartido)
      .expect(201)
      .then((response) => {
        expect(response.body.fechaYHora).toEqual(fechaEsperada)
        expect(response.body.lugar).toEqual(lugarEsperado)
        expect(response.body.id).toBeTruthy()
      });
  });

  it('/partidos/5 (GET) devuelve 200 + los datos del partido', () => {

    let fechaEsperada = "2020-07-01 15:00";
    let lugarEsperado = "la canchita";

    return request(app.getHttpServer())
      .get('/partidos/5')
      .expect(200)
      .then((response) => {
        expect(response.body.fechaYHora).toEqual(fechaEsperada)
        expect(response.body.lugar).toEqual(lugarEsperado)
        expect(response.body.id).toBeTruthy()
      });
  });

  it('/partidos/id-inexistente (GET) devuelve 404', () => {

    let fechaEsperada = "2020-07-01 15:00";
    let lugarEsperado = "la canchita";

    return request(app.getHttpServer())
      .get('/partidos/id-inexistente')
      .expect(404);
  });
});
