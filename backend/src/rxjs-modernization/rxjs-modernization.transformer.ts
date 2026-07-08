export class RxjsModernizationTransformer {
  transform(source: string): string {
    let updated = source;

    //------------------------------------
    // toPromise() -> firstValueFrom()
    //------------------------------------

    updated = updated.replace(
      /\.toPromise\(\)/g,

      '',
    );

    updated = updated.replace(
      /(\w+)\s*=\s*await\s*([^\n;]+)/g,

      (match) => {
        if (match.includes('firstValueFrom')) {
          return match;
        }

        return match.replace(
          /await\s*(.+)$/,

          'await firstValueFrom($1)',
        );
      },
    );

    //------------------------------------
    // Add import
    //------------------------------------

    if (
      updated.includes('firstValueFrom(') &&
      !updated.includes('firstValueFrom')
    ) {
      updated = updated.replace(
        /from 'rxjs';/,

        `from 'rxjs';
import { firstValueFrom } from 'rxjs';`,
      );
    }

    return updated;
  }
}
