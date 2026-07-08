import { Injectable } from '@nestjs/common';
import { LazyLoadingTransformer } from './lazy-loading.transformer';
import { LazyLoadingReport } from './lazy-loading.report';

@Injectable()
export class LazyLoadingService {
  private readonly transformer = new LazyLoadingTransformer();

  migrate(source: string): {
    source: string;

    report: LazyLoadingReport;
  } {
    const before = (source.match(/loadChildren/g) || []).length;

    const updated = this.transformer.transform(source);

    const after = (updated.match(/loadComponent/g) || []).length;

    return {
      source: updated,

      report: {
        routesScanned: before,

        loadChildrenFound: before,

        loadComponentGenerated: after,

        skipped: Math.max(0, before - after),
      },
    };
  }
}
