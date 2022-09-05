import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {PartidosModule} from "../src/endpoints/partidos/partidos.module";
import {CrearPartidoDto} from "../src/endpoints/partidos/partidos.controller";

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
});
