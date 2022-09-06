import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Post } from '@nestjs/common';
import * as request from 'supertest';
import { PartidosModule } from "../src/endpoints/partidos/partidos.module";
import { CrearPartidoDto } from "../src/endpoints/partidos/partidos.controller";
import { JugadorDto } from '../dist/endpoints/partidos/partidos.controller';

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

  it('/partidos/5/jugadores (POST) devuelve 201 y los datos del jugador + id del partido', () => {

    const jugadorDto: JugadorDto = {
      nombre: "Pablo Marmol",
      mail: "pmarmol@piedrabuena.com",
      telefono: "45646"
    }

    return request(app.getHttpServer())
      .post('/partidos/5/jugadores')
      .send(jugadorDto)
      .expect(201)
      .then((response) => {
        expect(response.body.nombre).toEqual(jugadorDto.nombre)
        expect(response.body.telefono).toEqual(jugadorDto.telefono)
        expect(response.body.mail).toEqual(jugadorDto.mail)
        expect(response.body.idPartido).toEqual("5")
      });
  });

  it('/partidos/id-inexistente/jugadores(POST) devuelve 404', () => {

    const jugadorDto: JugadorDto = {
      nombre: "Pablo Marmol",
      mail: "pmarmol@piedrabuena.com",
      telefono: "45646"
    }

    return request(app.getHttpServer())
      .post('/partidos/id-inexistente/jugadores')
      .send(jugadorDto)
      .expect(404);
  });

  it('/partidos/5/jugadores (POST) devuelve 400 cuando el partido esta lleno', async () => {

    const jugadorDto: JugadorDto = {
      nombre: "Pablo Marmol",
      mail: "pmarmol@piedrabuena.com",
      telefono: "45646"
    }

    for (let i = 2; i <= 13; i++) {

      const JugadorN: JugadorDto = {
        nombre: "Jugador" + " " + i,
        mail: "pmarmol@piedrabuena.com",
        telefono: "45646"
      }
      await request(app.getHttpServer())
        .post('/partidos/5/jugadores')
        .send(JugadorN)
        .expect(201);
    }

    return await request(app.getHttpServer())
      .post('/partidos/5/jugadores')
      .send(jugadorDto)
      .expect(400);
  });

});

