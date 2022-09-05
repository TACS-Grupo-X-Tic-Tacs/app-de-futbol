import { Param, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ok } from 'assert';
import {CrearPartidoDto, PartidosController} from "./partidos.controller";
import {PartidosService} from "./partidos.service";

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
      let result = partidosController.obtenerPartido({id: "5"});

      expect(result.fechaYHora).toEqual(fechaEsperada);
      expect(result.lugar).toEqual(lugarEsperado);
      expect(result.id).toBeTruthy()
    });
  });

  describe('obtenerPartido', () => {
    it('Deberia Status Code 404 cuando busco un partido inexistente.', () => {
      try{
      let result = partidosController.obtenerPartido({id: "id inexistente"});
      }catch(NotFoundException){
        ok(true);
        return;
      }
      ok(false);
    });
  });

});
