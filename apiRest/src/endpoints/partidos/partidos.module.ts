import { Module } from '@nestjs/common';
import {PartidosController} from "./partidos.controller";
import {PartidosService} from "./partidos.service";
import { MongooseModule } from '@nestjs/mongoose';
import { Partido, PartidoSchema } from './partidos.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Partido.name, schema: PartidoSchema }])],
  controllers: [PartidosController],
  providers: [PartidosService],
  exports: [PartidosService]
})
export class PartidosModule {}
