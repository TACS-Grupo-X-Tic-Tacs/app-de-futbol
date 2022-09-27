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

export interface JugadorDto {
  telefono: string,
  mail: string,
  nombre: string
}

export interface AnotarJugadorResponse {
  idPartido: string,
  telefono: string,
  mail: string,
  nombre: string
}

import { Body, Controller, Get, Post, Param, NotFoundException, BadRequestException, HttpCode } from '@nestjs/common';
import { Partido, PartidosService } from "./partidos.service";

@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) { }

  @Get()
  listarPartidos() {
    return this.partidosService.obtenerPartidos()
  }

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

  @Post(':id/jugadores')
  @HttpCode(200)
  anotarJugadorAPartido(@Body() jugadorDto: JugadorDto, @Param() params): AnotarJugadorResponse {
    let partido = this.partidosService.seleccionarPartido(params.id);
    if (partido) {
      let response = this.partidosService.anotarJugadorAPartido(partido, jugadorDto);
      return response;
    } else
      throw new NotFoundException(`No se ha encontra el partido de id. ${params.id}`);
  }
}
