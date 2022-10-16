import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface Jugador {
  telefono: string,
  mail: string,
  nombre: string,
  creadoEl: Date
}

export type PartidoDocument = Partido & Document;

@Schema()
export class Partido {
  @Prop({ required: true })
  id: string;

  @Prop()
  fechaYHora: string;

  @Prop()
  lugar: string;

  @Prop()
  jugadores: Jugador[];

  @Prop()
  creadoEl: Date;
}

export const PartidoSchema = SchemaFactory.createForClass(Partido);
