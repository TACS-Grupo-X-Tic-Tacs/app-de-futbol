import { Test, TestingModule } from '@nestjs/testing';
import { Estadistica, EstadisticasService } from './estadisticas.service';
import { Jugador, Partido } from '../partidos/partidos.schema';

describe('EstadisticasService', () =>{
    let service: EstadisticasService;

    let fechaReciente: Date = new Date()
    fechaReciente.setHours(fechaReciente.getHours() - 1)
    let fechaVieja: Date = new Date()
    fechaVieja.setHours(fechaVieja.getHours() - 3)

    let jugador = {mail: "", telefono: "", nombre: ""}

    let partido =  {id: "", fechaYHora: "", lugar: ""}

    let jugadorReciente: Jugador = {creadoEl: fechaReciente, ...jugador}
    let jugadorViejo: Jugador = {creadoEl: fechaVieja, ...jugador}
    let partidoReciente: Partido = {creadoEl: fechaReciente,  jugadores: [], ...partido}
    let partidoViejo: Partido = {creadoEl: fechaVieja,  jugadores: [], ...partido}

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [EstadisticasService],
        }).compile();

        service = app.get<EstadisticasService>(EstadisticasService);
      });

    it('Se puede obtener jugadores creados hace menos de dos horas', () => {
        let partidosMock = [
            {creadoEl: new Date(), jugadores: [jugadorReciente, jugadorViejo], ...partido}, {creadoEl: new Date(), jugadores: [jugadorReciente], ...partido}
        ]
        service._partidos = partidosMock
        let jugadoresAnotados = service.obtenerJugadoresAnotados()
        expect(jugadoresAnotados.length).toBe(3)
        expect(service.cantidadCreadaEnUltimasDosHoras(jugadoresAnotados)).toBe(2);
    });

    it('Se puede obtener partidos creados hace menos de dos horas', () => {
        let partidosMock = [partidoReciente, partidoReciente, partidoViejo]
        expect(service.cantidadCreadaEnUltimasDosHoras(partidosMock)).toBe(2)
    });

    it('Se puede obtener estadisticas', () => {

        let partidosMock = [{creadoEl: fechaReciente, jugadores: [jugadorReciente], ...partido}]

        service._partidos = partidosMock

        let resultEstadisticas: Estadistica = {
            jugadoresAnotados: 1,
            partidosCreados: 1
        }
        expect(service.obtenerEstadisticas()).toEqual(resultEstadisticas)
    });

    it('Jugadores/partidos creados hace mas de dos horas', () => {
        let partidosMock = [{creadoEl: fechaVieja, jugadores: [jugadorViejo], ...partido}]
        service._partidos = partidosMock

        let resultEstadisticas: Estadistica = {
            jugadoresAnotados: 0,
            partidosCreados: 0
        }
        expect(service.obtenerEstadisticas()).toEqual(resultEstadisticas)
    });
});
