import { DeadCodeResult } from './models/dead-code-result';

export class DeadCodeAnalyzer {
  analyze(file: string, source: string): DeadCodeResult {
    let unusedImports = 0;

    let unusedProviders = 0;

    let unusedComponents = 0;

    let unusedServices = 0;

    //-----------------------------------
    // Very simple static analysis
    //-----------------------------------

    const imports = source.match(/^import .*$/gm) ?? [];

    imports.forEach((line) => {
      const match = line.match(/\{(.*?)\}/);

      if (!match) {
        return;
      }

      const symbols = match[1].split(',').map((s) => s.trim());

      symbols.forEach((symbol) => {
        const regex = new RegExp(`\\b${symbol}\\b`, 'g');

        const occurrences = source.match(regex)?.length ?? 0;

        if (occurrences <= 1) {
          unusedImports++;
        }
      });
    });

    //-----------------------------------
    // Simple provider detection
    //-----------------------------------

    if (source.includes('providers: []')) {
      unusedProviders++;
    }

    //-----------------------------------
    // Component detection
    //-----------------------------------

    if (source.includes('@Component') && !source.includes('selector:')) {
      unusedComponents++;
    }

    //-----------------------------------
    // Service detection
    //-----------------------------------

    if (source.includes('@Injectable') && !source.includes('providedIn')) {
      unusedServices++;
    }

    return {
      file,

      unusedImports,

      unusedProviders,

      unusedComponents,

      unusedServices,
    };
  }
}
