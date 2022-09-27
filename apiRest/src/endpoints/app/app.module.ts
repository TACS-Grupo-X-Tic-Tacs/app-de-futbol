import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartidosModule } from '../partidos/partidos.module';
import { EstadisticasModule } from '../estadisticas/estadisticas.module';

@Module({
  imports: [PartidosModule, EstadisticasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
