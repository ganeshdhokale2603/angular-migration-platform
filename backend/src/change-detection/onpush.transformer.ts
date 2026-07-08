import * as ts from 'typescript';

export class OnPushTransformer {
  transform(source: string): {
    source: string;

    optimized: boolean;

    hasOnPush: boolean;
  } {
    if (!source.includes('@Component')) {
      return {
        source,

        optimized: false,

        hasOnPush: false,
      };
    }

    if (source.includes('ChangeDetectionStrategy.OnPush')) {
      return {
        source,

        optimized: false,

        hasOnPush: true,
      };
    }

    let updated = source;

    //------------------------------------
    // Add import if missing
    //------------------------------------

    if (!updated.includes('ChangeDetectionStrategy')) {
      updated = updated.replace(
        /from '@angular\/core';/,

        `, ChangeDetectionStrategy from '@angular/core';`,
      );
    }

    //------------------------------------
    // Add changeDetection property
    //------------------------------------

    updated = updated.replace(
      /@Component\s*\(\s*{/,

      `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,`,
    );

    return {
      source: updated,

      optimized: true,

      hasOnPush: true,
    };
  }
}
