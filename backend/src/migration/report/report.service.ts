import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {

    generate(scan:any){

        return {

            components:
                scan.statistics.componentCount,

            services:
                scan.statistics.serviceCount,

            modules:
                scan.statistics.moduleCount,

            standalone:
                scan.statistics.standaloneCount

        };

    }

}