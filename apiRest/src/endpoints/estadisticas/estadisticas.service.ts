import { Injectable } from '@nestjs/common';
import { PartidosService } from '../partidos/partidos.service';
export interface Estadistica {
  partidosCreados: number;
  jugadoresAnotados: number;
}

@Injectable()
export class EstadisticasService {
  constructor(private readonly partidosService: PartidosService) {}

  async obtenerEstadisticas(): Promise<Estadistica> {
    const horas = 2;
    const partidosCreados: number =
      await this.partidosService.cantidadPartidosCreadosEnUltimasHoras(horas);
    const jugadoresAnotados: number =
      await this.partidosService.cantidadJugadoresAnotadosEnUltimasHoras(horas);

    return {
      partidosCreados,
      jugadoresAnotados,
    };
  }
}
