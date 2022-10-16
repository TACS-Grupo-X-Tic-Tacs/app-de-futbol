import { Controller, Get } from "@nestjs/common"
import { Estadistica, EstadisticasService } from "./estadisticas.service"

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get()
  async obtenerEstadisticas(): Promise<Estadistica> {
    return this.estadisticasService.obtenerEstadisticas()
  }
}
