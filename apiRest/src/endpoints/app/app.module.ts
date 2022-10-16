import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartidosModule } from '../partidos/partidos.module';
import { EstadisticasModule } from '../estadisticas/estadisticas.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [PartidosModule, EstadisticasModule, MongooseModule.forRootAsync({useFactory: () => ({ uri: process.env.DB_URL, })})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
