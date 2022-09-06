import { Test, TestingModule } from '@nestjs/testing';
import { EstadisticasController } from './estadisticas.controller';
import { Estadistica, EstadisticasService } from './estadisticas.service';

describe('EstadisticasController', () => {
  let estadisticasController: EstadisticasController;
  let estadisticasService: EstadisticasService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EstadisticasController],
      providers: [EstadisticasService],
    }).compile();

    estadisticasController = app.get<EstadisticasController>(EstadisticasController);
    estadisticasService = app.get<EstadisticasService>(EstadisticasService);
  });

  describe('Estadisticas', () => {
    it('Obtiene la cantidad de partidos creados hasta hace dos horas', () => {
        let estadistica: Estadistica = {
            partidosCreados: 2,
            jugadoresAnotados: 3
        }
        jest.spyOn(estadisticasService, 'estadisticas').mockImplementation(() => estadistica);
        let result = estadisticasController.estadisticas()
        expect(result.partidosCreados).toEqual(2)
        expect(result.jugadoresAnotados).toEqual(3)
    });


  });
});
