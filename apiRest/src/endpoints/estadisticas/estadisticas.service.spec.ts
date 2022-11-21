import { Test, TestingModule } from '@nestjs/testing';
import { EstadisticasService } from './estadisticas.service';
import { Jugador, Partido, PartidoModel } from '../partidos/partidos.schema';
import { PartidosService } from '../partidos/partidos.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');

describe('EstadisticasService', () => {
  let estadisticasService: EstadisticasService;

  const fechaReciente: Date = new Date();
  fechaReciente.setHours(fechaReciente.getHours() - 1);
  const fechaVieja: Date = new Date();
  fechaVieja.setHours(fechaVieja.getHours() - 3);

  const jugador = { mail: '', telefono: '', nombre: '' };

  const partido = { id: '', fechaYHora: '', lugar: '' };

  const jugadorReciente: Jugador = { creadoEl: fechaReciente, ...jugador };
  const jugadorViejo: Jugador = { creadoEl: fechaVieja, ...jugador };

  async function mockearFind(partidos: Partido[]) {
    mockingoose(PartidoModel).toReturn(partidos, 'find');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const partidosMockService = new PartidosService(PartidoModel);

    const app: TestingModule = await Test.createTestingModule({
      providers: [EstadisticasService, PartidosService],
    })
      .overrideProvider(PartidosService)
      .useValue(partidosMockService)
      .compile();

    estadisticasService = app.get<EstadisticasService>(EstadisticasService);
  }

  it('Se pueden obtener los jugadores creados y partidos creados hace menos de dos horas', async () => {
    const partidosMock: Partido[] = [
      {
        id: 'ejemplo',
        creadoEl: new Date(),
        jugadores: [jugadorReciente, jugadorViejo],
        ...partido,
      },
      { creadoEl: new Date(), jugadores: [jugadorReciente], ...partido },
    ];

    await mockearFind(partidosMock);

    const estadistica = await estadisticasService.obtenerEstadisticas();

    expect(estadistica.jugadoresAnotados).toBe(2);
    expect(estadistica.partidosCreados).toBe(2);
  });
});
