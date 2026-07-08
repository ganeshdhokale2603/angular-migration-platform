import { Injectable } from '@nestjs/common';
import { InjectTransformer } from './inject.transformer';
import { ProviderTransformer } from './provider.transformer';
import { ProviderModernizationTransformer } from './provider-modernization.transformer';

@Injectable()
export class DependencyInjectionService {

  private readonly transformer = new InjectTransformer();

  private readonly modernization = new ProviderModernizationTransformer();

  private readonly providerTransformer = new ProviderTransformer();

  migrate(file: string, source: string) {
    const migratedSource = this.transformer.transform(source);

    const providerResult = this.providerTransformer.transform(migratedSource);

    const modernizationResult = this.modernization.transform(
      providerResult.source,
    );

    return {
      source: modernizationResult.source,

      report: {
        constructorsFound: 0,

        injectCalls: 0,

        migrated: providerResult.report.functionalProviders,

        providers: {
          ...providerResult.report,

          httpClient: modernizationResult.report.httpClient,

          animations: modernizationResult.report.animations,

          router: modernizationResult.report.router,
        },
      },
    };
  }

}