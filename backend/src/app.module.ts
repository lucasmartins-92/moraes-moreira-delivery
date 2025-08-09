import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PombosModule } from './pombos/pombos.module';
import { ClientesModule } from './clientes/clientes.module';
import { CartasModule } from './cartas/cartas.module';
import { PrismaModule } from './prisma/prisma.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [PombosModule, ClientesModule, CartasModule, PrismaModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
