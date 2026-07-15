import { Controller, Get } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

import { DashboardResponseDto } from './dto/dashboard-response.dto';
import {

    ApiTags,

    ApiOperation,

    ApiResponse

} from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {

    constructor(

        private readonly dashboardService: DashboardService

    ) { }

    @Get()
    @ApiOperation({

        summary: 'Get enterprise dashboard'

    })
    @ApiResponse({

        status: 200,

        description: 'Dashboard returned successfully.'

    })
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