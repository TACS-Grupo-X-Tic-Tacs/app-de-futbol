import { Injectable } from '@nestjs/common';
import { randomUUID } from "crypto";
import { CrearPartidoDto } from "./partidos.controller";

export interface Partido {
  id: string,
  fechaYHora: string;
  lugar: string;
  jugadores: string[];
}

let partidos: Partido[] = [{ id: "5", fechaYHora: "2020-07-01 15:00", lugar: "la canchita", jugadores: ["Pepe", "Juan", "Maria"] }]

@Injectable()
export class PartidosService {
  crearPartido(crearPartidoDto: CrearPartidoDto): Partido {
    let nuevoPartido = { id: randomUUID(), jugadores: [], ...crearPartidoDto };

    partidos.push(nuevoPartido)

    console.log("los partidos actuales son")
    console.log(partidos)

    return nuevoPartido
  }

  seleccionarPartido(id: string): Partido {
    return partidos.find(partido => partido.id == id);
  }
}
