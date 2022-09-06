import { Injectable } from '@nestjs/common';
import { partidos } from '../partidos/partidos.service';

export interface Estadistica {
    partidosCreados: number,
    jugadoresAnotados: number
}

@Injectable()
export class EstadisticasService {
    _partidos = partidos;

    obtenerEstadisticas(): Estadistica {
        let partidosCreados: number = this.cantidadCreadaEnUltimasDosHoras(this._partidos)
        let jugadoresAnotados: number = this.cantidadCreadaEnUltimasDosHoras([])

        return {
            partidosCreados,
            jugadoresAnotados
        }
    }

    dosHorasAtras(): Date {
        let haceDosHoras = new Date()
        haceDosHoras.setHours(haceDosHoras.getHours() - 2) 
        return haceDosHoras
    }

    cantidadCreadaEnUltimasDosHoras(lista){
        return lista.filter(e => e.creacion > this.dosHorasAtras()).length
    }

}
