/*
* Como usuario quiero crear un partido, estableciendo fecha, hora y lugar. El sistema se encargará de darme un ID.
Post a /partidos

{
   fechaYHora: "en formato iso con horas y minuto",
   lugar: "string"
}
retorna 200 con:

{
   id: "string",
   fechaYHora: "en formato iso con horas y minuto",
   lugar: "string"
}
* */

export interface CrearPartidoDto {
  fechaYHora: string;
  lugar: string;
}

import {Body, Controller, Post} from '@nestjs/common';
import {PartidosService} from "./partidos.service";

@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) {}

  @Post()
  crearPartido(@Body() crearPartidoDto: CrearPartidoDto) {
    return this.partidosService.crearPartido(crearPartidoDto)
  }
}
