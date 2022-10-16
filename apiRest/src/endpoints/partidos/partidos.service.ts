import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from "crypto";
import { AnotarJugadorResponse, CrearPartidoDto, JugadorDto } from './partidos.controller';
import { Jugador, Partido, PartidoDocument } from './partidos.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PartidosService {
  constructor(@InjectModel(Partido.name) private partidoModel: Model<PartidoDocument>) {}

  async obtenerPartidos(): Promise<Partido[]> {
    return this.partidoModel.find().exec()
  }

  async crearPartido(crearPartidoDto: CrearPartidoDto): Promise<Partido> {
    const nuevoPartido = new this.partidoModel({ id: randomUUID(), jugadores: [], creadoEl: new Date(), ...crearPartidoDto })
    return nuevoPartido.save()
  }

  async seleccionarPartido(id: string): Promise<Partido | undefined> {
    return this.partidoModel.findById(id).exec()
  }

  async anotarJugadorAPartido(partido: Partido, jugador: JugadorDto): Promise<AnotarJugadorResponse> {
    if (partido.jugadores.length == 13) {
      throw new BadRequestException("Ya se ha completado el cupo de jugadores para este partido");
    }
    const nuevoJugador: Jugador = {creadoEl: new Date(), ...jugador}
    const nuevaComposicionDeJugadores = partido.jugadores.concat(nuevoJugador)

    await this.partidoModel.findByIdAndUpdate(partido.id,{jugadores: nuevaComposicionDeJugadores})

    return { idPartido: partido.id, ...jugador };

  }

  async partidosCreadosEnLasUltimasHoras(horasPrevias: number): Promise<Partido[]> {
    const haceXHoras = new Date()
    haceXHoras.setHours(haceXHoras.getHours() - horasPrevias)

    return this.partidoModel.find({creadoEl: {$gte: haceXHoras}}).exec()
  }

  async cantidadPartidosCreadosEnUltimasHoras(horasPrevias: number): Promise<number> {
    const partidosRecientes = await this.partidosCreadosEnLasUltimasHoras(horasPrevias)
    return partidosRecientes.length
  }

  async cantidadJugadoresAnotadosEnUltimasHoras(horasPrevias: number): Promise<number> {
    const partidosRecientes = await this.partidosCreadosEnLasUltimasHoras(horasPrevias)
    return partidosRecientes.flatMap(p => p.jugadores).length
  }
}
