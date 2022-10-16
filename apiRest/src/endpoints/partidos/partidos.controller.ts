import { Body, Controller, Get, Post, Param, NotFoundException, HttpCode } from '@nestjs/common';
import { PartidosService } from "./partidos.service";
import { Partido } from './partidos.schema';

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

@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) { }

  @Get()
  async listarPartidos(): Promise<Partido[]> {
    return this.partidosService.obtenerPartidos()
  }

  @Post()
  async crearPartido(@Body() crearPartidoDto: CrearPartidoDto): Promise<Partido> {
    return this.partidosService.crearPartido(crearPartidoDto)
  }

  @Get(':id')
  async obtenerPartido(@Param() params): Promise<Partido> {
    const partido: Partido | undefined = await this.partidosService.seleccionarPartido(params.id)
    if (partido)
      return partido;
    else
      throw new NotFoundException(`No se ha encontra el partido de id. ${params.id}`);
  }

  @Post(':id/jugadores')
  @HttpCode(200)
  async anotarJugadorAPartido(@Body() jugadorDto: JugadorDto, @Param() params): Promise<AnotarJugadorResponse> {
    const partido: Partido | undefined = await this.partidosService.seleccionarPartido(params.id);
    if (partido) {
      return this.partidosService.anotarJugadorAPartido(partido, jugadorDto);
    } else
      throw new NotFoundException(`No se ha encontra el partido de id. ${params.id}`);
  }
}
