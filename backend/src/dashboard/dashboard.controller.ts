import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get()
  async getDashboardData() {
    const [topPombos, statusOverview, topClientes] = await Promise.all([
      this.dashboardService.getTopPombos(),
      this.dashboardService.getStatusOverview(),
      this.dashboardService.getTopClientes()
    ]);

    return { topPombos, statusOverview, topClientes };
  }
}
