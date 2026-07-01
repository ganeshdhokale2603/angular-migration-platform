import { Injectable } from '@nestjs/common';

@Injectable()
export class RuleEngineService {

  evaluate(scan: any) {

    const issues: any[] = [];

    //------------------------------------------------
    // Angular Version
    //------------------------------------------------

    const version =
      Number(
        scan.projectInfo.angularVersion
          ?.replace(/[^\d]/g, '')
      );

    if (version < 15) {

      issues.push({

        type: 'Angular',

        severity: 'HIGH',

        title: 'Angular version is too old',

        recommendation:
          'Upgrade Angular incrementally.'

      });

    }

    //------------------------------------------------
    // Modules
    //------------------------------------------------

    if (scan.statistics.moduleCount > 20) {

      issues.push({

        type: 'Architecture',

        severity: 'MEDIUM',

        title: 'Large number of NgModules',

        recommendation:
          'Consider migrating to Standalone Components.'

      });

    }

    //------------------------------------------------
    // Standalone
    //------------------------------------------------

    if (scan.statistics.standaloneCount === 0) {

      issues.push({

        type: 'Migration',

        severity: 'LOW',

        title: 'Standalone components not found',

        recommendation:
          'Standalone migration recommended.'

      });

    }

    return issues;

  }

}