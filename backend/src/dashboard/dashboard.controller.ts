import { Controller, Get } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

import { DashboardResponseDto } from './dto/dashboard-response.dto';

@Controller('dashboard')
export class DashboardController {

    constructor(

        private readonly dashboardService: DashboardService

    ) { }

    @Get()

    getDashboard(): DashboardResponseDto {

        return {

            success: true,

            data: this.dashboardService.getDashboard()

        };

    }

    @Get('metrics')

getMetrics() {

    return this.dashboardService.getMetrics();

}

@Get('history')

getHistory() {

    return this.dashboardService.getHistory();

}

@Get('performance')

getPerformance() {

    return this.dashboardService.getPerformance();

}
@Get('ai')

getAI() {

    return this.dashboardService.getAI();

}

}