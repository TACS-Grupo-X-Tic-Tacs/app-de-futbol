import { Test, TestingModule } from '@nestjs/testing';
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
});
