import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from "crypto";
import { AnotarJugadorResponse, CrearPartidoDto, JugadorDto } from './partidos.controller';

export interface Partido {
  id: string,
  fechaYHora: string;
  lugar: string;
  jugadores: Jugador[];
  creadoEl: Date;
}

export interface Jugador {
  telefono: string,
  mail: string,
  nombre: string,
  creadoEl: Date
}

export let partidos: Partido[] = [{ id: "5", fechaYHora: "2020-07-01 15:00", lugar: "la canchita", jugadores: [], creadoEl: new Date(2022, 8, 5)}]

@Injectable()
export class PartidosService {

  obtenerPartidos() {
    return partidos
  }

  crearPartido(crearPartidoDto: CrearPartidoDto): Partido {
    let nuevoPartido = { id: randomUUID(), jugadores: [], creadoEl: new Date(), ...crearPartidoDto };

    partidos.push(nuevoPartido)
    return nuevoPartido
  }

  seleccionarPartido(id: string): Partido {
    return partidos.find(partido => partido.id == id);
  }

  anotarJugadorAPartido(partido: Partido, jugador: JugadorDto): AnotarJugadorResponse {
    if (partido.jugadores.length == 13) {
      throw new BadRequestException("Ya se ha completado el cupo de jugadores para este partido");
    }

    partido.jugadores.push({creadoEl: new Date(), ...jugador})
    let anotarJugadorResponse = {
      idPartido: partido.id,
      ...jugador
    }
    let index = partidos.findIndex(p => p.id == partido.id);
    partidos[index] = partido;
    return anotarJugadorResponse;

  }
}
