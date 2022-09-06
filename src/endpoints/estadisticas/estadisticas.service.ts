import { Injectable } from '@nestjs/common';

export interface Estadistica {
    partidosCreados: number,
    jugadoresAnotados: number
}

@Injectable()
export class EstadisticasService {
    partidos;
    jugadores;

    estadisticas(): Estadistica {
        let partidosCreados: number = this.cantidadCreadaEnUltimasDosHoras(this.partidos)
        let jugadoresAnotados: number = this.cantidadCreadaEnUltimasDosHoras(this.jugadores)

        return {
            partidosCreados,
            jugadoresAnotados
        }
    }

    haceDoshoras(): Date {
        let haceDosHoras = new Date()
        haceDosHoras.setHours(haceDosHoras.getHours() - 2) 
        return haceDosHoras
    }

    cantidadCreadaEnUltimasDosHoras(lista){
        return lista.filter(e => e.creacion > this.haceDoshoras()).length
    }

}
