export interface ProviderModernizationReport {
  httpClient: number;

  animations: number;

  router: number;
}

export class ProviderModernizationTransformer {
  transform(source: string) {
    const report: ProviderModernizationReport = {
      httpClient: 0,

      animations: 0,

      router: 0,
    };

    //----------------------------------
    // HttpClientModule
    //----------------------------------

    if (source.includes('HttpClientModule')) {
      source = source.replace(
        /HttpClientModule/g,

        'provideHttpClient()',
      );

      report.httpClient++;
    }

    //----------------------------------
    // BrowserAnimationsModule
    //----------------------------------

    if (source.includes('BrowserAnimationsModule')) {
      source = source.replace(
        /BrowserAnimationsModule/g,

        'provideAnimations()',
      );

      report.animations++;
    }

    //----------------------------------
    // RouterModule.forRoot(...)
    //----------------------------------

    source = source.replace(
      /RouterModule\.forRoot\((.*?)\)/g,

      (_, routes) => {
        report.router++;

        return `provideRouter(${routes})`;
      },
    );

    return {
      source,

      report,
    };
  }
}
