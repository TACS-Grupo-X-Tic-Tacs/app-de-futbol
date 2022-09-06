import { Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ok } from 'assert';
import { CrearPartidoDto, PartidosController } from "./partidos.controller";
import { PartidosService } from "./partidos.service";

// este es un test unitario de la api
describe('PartidosController', () => {
  let partidosController: PartidosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PartidosController],
      providers: [PartidosService],
    }).compile();

    partidosController = app.get<PartidosController>(PartidosController);

  });

  describe('crearPartido', () => {
    it('debería retornar un partido con los mismos datos del parametro ademas de un id', () => {
      let fechaEsperada = "2020-07-10 15:00";
      let lugarEsperado = "boca juniors";
      const datosPartido: CrearPartidoDto = {
        fechaYHora: fechaEsperada,
        lugar: lugarEsperado
      }

      let result = partidosController.crearPartido(datosPartido);

      expect(result.fechaYHora).toEqual(fechaEsperada);
      expect(result.lugar).toEqual(lugarEsperado);
      expect(result.id).toBeTruthy()
    });
  });

  describe('obtenerPartido', () => {
    it('Deberia devolver los datos del partido de id 5 que ya existe en memoria.', () => {
      let fechaEsperada = "2020-07-01 15:00";
      let lugarEsperado = "la canchita";
      let result = partidosController.obtenerPartido({ id: "5" });

      expect(result.fechaYHora).toEqual(fechaEsperada);
      expect(result.lugar).toEqual(lugarEsperado);
      expect(result.id).toBeTruthy()
    });
  });

  describe('obtenerPartido', () => {
    it('Deberia Status Code 404 cuando busco un partido inexistente.', () => {
      try {
        partidosController.obtenerPartido({ id: "id inexistente" });
      } catch (NotFoundException) {
        ok(true);
        return;
      }
      ok(false);
    });
  });

  describe('anotarJugadorAPartido', () => {
    it('Deberia anotar al jugador en el partido y devolver los datos del jugador + id del partido.', () => {
      let result = partidosController.anotarJugadorAPartido({ telefono: "4444", mail: "ejemplo@hotmail.com", nombre: "Oscar" }, { id: "5" });

      expect(result.telefono).toEqual("4444");
      expect(result.mail).toEqual("ejemplo@hotmail.com");
      expect(result.nombre).toEqual("Oscar")
      expect(result.idPartido).toEqual("5")
    });
  });

  describe('anotarJugadorAPartido', () => {
    it('Deberia arrojar un BadRequestException al querer anotarse a un partido con cuplo completo', () => {
            
      for (let i = 2; i <= 13; i++){
        partidosController.anotarJugadorAPartido({ telefono: "4444", mail: "ejemplo@hotmail.com", nombre: `Jugador ${i}` }, { id: "5" });
      }

      try {
        let result = partidosController.anotarJugadorAPartido({ telefono: "4444", mail: "ejemplo@hotmail.com", nombre: `Jugador Rechazado` }, { id: "5" });
        
      } catch (BadRequestException) {
        ok(true);
        return;
      }
      
      ok(false)

    });
  });

});
