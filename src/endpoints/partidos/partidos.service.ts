import { Injectable } from '@nestjs/common';
import {randomUUID} from "crypto";
import {CrearPartidoDto} from "./partidos.controller";

export interface Partido {
  id: string,
  fechaYHora: string;
  lugar: string;
  creacion: Date;
}

export let partidos: Partido[] = []

@Injectable()
export class PartidosService {
  crearPartido(crearPartidoDto: CrearPartidoDto): Partido {
    let nuevoPartido = {id: randomUUID(), creacion: new Date(), ...crearPartidoDto, };

    partidos.push(nuevoPartido)

    console.log("los partidos actuales son")
    console.log(partidos)

    return nuevoPartido
  }
}
