import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

  async getTopPombos() {
    const topPombosData = await this.prisma.carta.groupBy({
      by: ['pomboId'],
      where: { status: 'ENTREGUE' },
      _count: {
        pomboId: true,
      },
      orderBy: {
        _count: {
          pomboId: 'desc',
        },
      },
      take: 5,
    });

    const pombosDetails = await this.prisma.pombo.findMany({
      where: { id: { in: topPombosData.map(p => p.pomboId) } },
    });

    return topPombosData.map(p => ({
      nome: pombosDetails.find(pd => pd.id === p.pomboId)?.apelido,
      entregas: p._count.pomboId,
    }));
  }

  async getTopClientes() {
    const topClientesData = await this.prisma.carta.groupBy({
      by: ['remetenteId'],
      _count: {
        remetenteId: true,
      },
      orderBy: {
        _count: {
          remetenteId: 'desc',
        },
      },
      take: 5,
    });

    const clientesDetails = await this.prisma.cliente.findMany({
      where: { id: { in: topClientesData.map(c => c.remetenteId) } },
    });

    return topClientesData.map(cliente => ({
      nome: clientesDetails.find(cd => cd.id === cliente.remetenteId)?.nome,
      cartasEnviadas: cliente._count.remetenteId,
    }));
  }

  async getStatusOverview() {
    return this.prisma.carta.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });
  }
}