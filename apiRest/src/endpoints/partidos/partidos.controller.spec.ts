import { Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { CrearPartidoDto, PartidosController } from './partidos.controller';
import { PartidosService } from './partidos.service';
import { Jugador, Partido, PartidoModel } from './partidos.schema';
import mock = jest.mock;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');

// este es un test unitario de la api
describe('PartidosController', () => {
  let partidosController: PartidosController;

  function resetearController() {
    partidosController = new PartidosController(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      new PartidosService(PartidoModel),
    );
  }

  afterEach(() => {
    mockingoose(PartidoModel).reset();
    resetearController();
  });

  // estos capaz se pueden mover a otro archivo xD

  async function mockearBD() {
    mockingoose(PartidoModel).toReturn(undefined, 'find');
    resetearController();
  }
  async function mockearPartidoBD(
    partidoAEncontrar?: {
      lugar: string;
      creadoEl: Date;
      id: string;
      jugadores: any[];
      fechaYHora: string;
    },
    metodo = 'find',
  ) {
    mockingoose(PartidoModel).toReturn(partidoAEncontrar, metodo);
    resetearController();
  }

  async function mockearJugadorBD(
    jugadorAEncontrar?: Jugador,
    metodo = 'find',
  ) {
    mockingoose(PartidoModel).toReturn(jugadorAEncontrar, metodo);
    resetearController();
  }

  async function mockearPartidoYJugadorBD(
    partidoAEncontrar: Partido,
    jugadorAEncontrar: Jugador,
  ) {
    mockingoose(PartidoModel).toReturn(partidoAEncontrar, 'findOne');
    mockingoose(PartidoModel).toReturn(jugadorAEncontrar, 'findOneAndUpdate');
    resetearController();
  }

  describe('crearPartido', () => {
    it('debería retornar un partido con los mismos datos del parametro ademas de un id', async () => {
      const fechaEsperada = '2020-07-10 15:00';
      const lugarEsperado = 'boca juniors';
      const datosPartido: CrearPartidoDto = {
        fechaYHora: fechaEsperada,
        lugar: lugarEsperado,
      };

      await mockearPartidoBD();

      const result = await partidosController.crearPartido(datosPartido);

      expect(result.fechaYHora).toEqual(fechaEsperada);
      expect(result.lugar).toEqual(lugarEsperado);
      expect(result.id).toBeTruthy();
    });
  });

  function unPartidoConId5(
    fechaEsperada = '12-12-1999',
    lugarEsperado = 'boquita',
  ) {
    return {
      id: '5',
      fechaYHora: fechaEsperada,
      lugar: lugarEsperado,
      jugadores: [],
      creadoEl: new Date('12-12-1999'),
    };
  }

  describe('obtenerPartido', () => {
    it('Deberia devolver los datos del partido de la BD', async () => {
      const fechaEsperada = '2020-07-01 15:00';
      const lugarEsperado = 'la canchita';
      await mockearPartidoBD(
        unPartidoConId5(fechaEsperada, lugarEsperado),
        'findOne',
      );

      const result = await partidosController.obtenerPartido({ id: '5' });

      expect(result.fechaYHora).toEqual(fechaEsperada);
      expect(result.lugar).toEqual(lugarEsperado);
      expect(result.id).toBeTruthy();
    });
  });

  describe('obtenerPartido', () => {
    it('Deberia Status Code 404 cuando busco un partido inexistente.', async () => {
      await mockearPartidoBD();

      const pedidoDeIdInexistente = async () => {
        await partidosController.obtenerPartido({ id: 'id inexistente' });
      };

      await expect(pedidoDeIdInexistente()).rejects.toThrow(NotFoundException);
    });
  });

  function unJugadorRandom() {
    return {
      telefono: '4444',
      mail: 'ejemplo@hotmail.com',
      nombre: 'Oscar',
      creadoEl: new Date('12-12-1999'),
    };
  }

  describe('anotarJugadorAPartido', () => {
    it('Deberia anotar al jugador en el partido y devolver los datos del jugador + id del partido.', async () => {
      await mockearPartidoYJugadorBD(unPartidoConId5(), unJugadorRandom());

      const result = await partidosController.anotarJugadorAPartido(
        { telefono: '4444', mail: 'ejemplo@hotmail.com', nombre: 'Oscar' },
        { id: '5' },
      );

      expect(result.telefono).toEqual('4444');
      expect(result.mail).toEqual('ejemplo@hotmail.com');
      expect(result.nombre).toEqual('Oscar');
      expect(result.idPartido).toEqual('5');
    });
  });

  describe('anotarJugadorAPartido', () => {

    beforeEach(async () => {
      await mockearPartidoBD(
          {
            ...unPartidoConId5(),
            jugadores: Array.from({ length: 13 }, () => unJugadorRandom()),
          },
          'findOne',
      );
    });

    it('Deberia arrojar un BadRequestException al querer anotarse a un partido con cuplo completo', async () => {
      const anotarJugadorDespuesDe13 = async () => {
        return await partidosController.anotarJugadorAPartido(
          {
            telefono: '4444',
            mail: 'ejemplo@hotmail.com',
            nombre: `Jugador Rechazado`,
          },
          { id: '5' },
        );
      };
      await expect(anotarJugadorDespuesDe13).rejects.toThrow(
        BadRequestException,
      );
    });

    it('Deberia arrojar un BadRequestException al querer anotar un jugador con un mail de un jugador ya anotado', async () => {
      const anotarJugadorRepetido = async () => {
        return await partidosController.anotarJugadorAPartido(unJugadorRandom(),{id:'5'})
      }

      await expect(anotarJugadorRepetido).rejects.toThrow(BadRequestException)

    })
  });

  describe('anotarJugadorAPartido', () => {
    it('Debería devolver 404 cuando el partido no existe.', async () => {
      await mockearBD();

      const anotarAPartidoInexistente = async () => {
        await partidosController.anotarJugadorAPartido(
          { telefono: '4444', mail: 'ejemplo@hotmail.com', nombre: 'Oscar' },
          { id: 'id-inexistente' },
        );
      };

      await expect(anotarAPartidoInexistente).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
