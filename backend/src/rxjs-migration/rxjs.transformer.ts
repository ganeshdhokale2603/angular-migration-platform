export interface RxjsTransformResult {
  source: string;

  migrated: boolean;

  deprecatedOperators: number;
}

export class RxjsTransformer {
  transform(source: string): RxjsTransformResult {
    let updated = source;

    let deprecatedOperators = 0;

    const replacements = [
      ['rxjs/add/operator/map', 'rxjs/operators'],
      ['rxjs/add/operator/filter', 'rxjs/operators'],
      ['rxjs/add/operator/switchMap', 'rxjs/operators'],
      ['rxjs/add/operator/mergeMap', 'rxjs/operators'],
      ['rxjs/add/operator/catch', 'rxjs/operators'],
      ['rxjs/add/operator/finally', 'rxjs/operators'],
    ];

    for (const [legacy, modern] of replacements) {
      if (updated.includes(legacy)) {
        updated = updated.replaceAll(legacy, modern);

        deprecatedOperators++;
      }
    }

    return {
      source: updated,

      migrated: deprecatedOperators > 0,

      deprecatedOperators,
    };
  }
}
