import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get()
  async getDashboardData() {
    // Chama os métodos do serviço para buscar os dados
    const [topPombos, statusOverview, topClientes] = await Promise.all([
      this.dashboardService.getTopPombos(),
      this.dashboardService.getStatusOverview(),
      this.dashboardService.getTopClientes()
    ]);

    // Retorna um objeto com todas as estatísticas
    return { topPombos, statusOverview, topClientes };
  }
}
