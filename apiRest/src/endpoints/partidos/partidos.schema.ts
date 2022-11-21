import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export interface Jugador {
  telefono: string;
  mail: string;
  nombre: string;
  creadoEl: Date;
}

export type PartidoDocument = Partido & Document;

@Schema()
export class Partido {
  @Prop({ type: [String], index: true })
  id: string;

  @Prop()
  fechaYHora: string;

  @Prop()
  lugar: string;

  @Prop()
  jugadores: Jugador[];

  @Prop({ type: [Date], index: true })
  creadoEl: Date;
}

export const PartidoSchema = SchemaFactory.createForClass(Partido);

export const PartidoModel = mongoose.model('Partido', PartidoSchema);
