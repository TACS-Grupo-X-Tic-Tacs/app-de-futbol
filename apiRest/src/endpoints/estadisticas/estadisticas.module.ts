import { Module } from '@nestjs/common';
import { EstadisticasController } from './estadisticas.controller';
import { EstadisticasService } from './estadisticas.service';


@Module({
  imports: [],
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
export class EstadisticasModule {}
