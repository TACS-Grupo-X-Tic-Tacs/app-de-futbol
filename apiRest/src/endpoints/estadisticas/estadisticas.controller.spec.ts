import { Test, TestingModule } from '@nestjs/testing';
import { EstadisticasController } from './estadisticas.controller';
import { Estadistica, EstadisticasService } from './estadisticas.service';
import { PartidosService } from '../partidos/partidos.service';
// F, mockinggoose require usar require para requerirlo bien, no se puede import, un pequeño precio para mejores tests :(
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');
import { PartidoModel } from '../partidos/partidos.schema';

describe('EstadisticasController', () => {
  let estadisticasController: EstadisticasController;
  let estadisticasService: EstadisticasService;

  const partidosMockService = new PartidosService(
    mockingoose(PartidoModel).toReturn(),
  );

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EstadisticasController],
      providers: [EstadisticasService, PartidosService],
    })
      .overrideProvider(PartidosService)
      .useValue(partidosMockService)
      .compile();

    estadisticasController = app.get<EstadisticasController>(
      EstadisticasController,
    );
    estadisticasService = app.get<EstadisticasService>(EstadisticasService);
  });

  describe('Estadisticas', () => {
    it('Obtiene la cantidad de partidos creados hasta hace dos horas', async () => {
      const estadistica: Estadistica = {
        partidosCreados: 2,
        jugadoresAnotados: 3,
      };
      jest
        .spyOn(estadisticasService, 'obtenerEstadisticas')
        .mockImplementation(async () => estadistica);
      const result = await estadisticasController.obtenerEstadisticas();
      expect(result.partidosCreados).toEqual(2);
      expect(result.jugadoresAnotados).toEqual(3);
    });
  });
});
