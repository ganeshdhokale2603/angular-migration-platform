import { Injectable } from '@nestjs/common';
import { ProviderReport } from './provider.report';

@Injectable()
export class ProviderTransformer {
  transform(source: string): {
    source: string;

    report: ProviderReport;
  } {
    const report: ProviderReport = {
      httpClient: 0,

      animations: 0,

      router: 0,

      rootProviders: 0,

      functionalProviders: 0,
    };

    //------------------------------------
    // HttpClientModule
    //------------------------------------

    if (source.includes('HttpClientModule')) {
      source = source.replace(/HttpClientModule/g, 'provideHttpClient()');

      report.httpClient++;

      report.functionalProviders++;

      console.log('Migrated HttpClientModule');
    }

    //------------------------------------
    // BrowserAnimationsModule
    //------------------------------------

    if (source.includes('BrowserAnimationsModule')) {
      source = source.replace(
        /BrowserAnimationsModule/g,
        'provideAnimations()',
      );

      report.animations++;

      report.functionalProviders++;

      console.log('Migrated BrowserAnimationsModule');
    }

    //------------------------------------
    // providedIn root
    //------------------------------------

    if (
      source.includes('@Injectable(') &&
      !source.includes("providedIn: 'root'")
    ) {
      source = source.replace(
        /@Injectable\(\s*\)/,

        "@Injectable({ providedIn: 'root' })",
      );

      report.rootProviders++;
    }

    return {
      source,

      report,
    };
  }
}
