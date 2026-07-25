import { Injectable } from '@nestjs/common';

@Injectable()
export class EffortEstimatorService {

    estimate(

        analysis: any

    ): number {

        let hours = 8;

        hours +=
            analysis.totalComponents * 0.30;

        hours +=
            analysis.totalServices * 0.20;

        hours +=
            analysis.totalModules * 0.50;

        const gap =
            20 - analysis.angularVersion;

        hours += gap * 4;

        return Math.round(hours);

    }

}