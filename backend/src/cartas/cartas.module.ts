import { Module } from '@nestjs/common';
import { CartasService } from './cartas.service';
import { CartasController } from './cartas.controller';

@Module({
  controllers: [CartasController],
  providers: [CartasService],
})
export class CartasModule {}
