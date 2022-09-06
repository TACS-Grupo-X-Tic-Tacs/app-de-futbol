import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartidosModule } from '../partidos/partidos.module';

@Module({
  imports: [PartidosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
