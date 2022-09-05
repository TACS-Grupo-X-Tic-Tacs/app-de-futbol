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

import { Body, Controller, Get, Post, Param, NotFoundException } from '@nestjs/common';
import { Partido, PartidosService } from "./partidos.service";

@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) { }

  @Post()
  crearPartido(@Body() crearPartidoDto: CrearPartidoDto) {
    return this.partidosService.crearPartido(crearPartidoDto)
  }

  @Get(':id')
  obtenerPartido(@Param() params): Partido {
    let partido = this.partidosService.seleccionarPartido(params.id);
    if (partido)
      return partido;
    else
      throw new NotFoundException(`No se ha encontra el partido de id. ${params.id}`);
  }
}
