export class ControlFlowTransformer {
  transform(template: string): string {
    let result = template;

    //----------------------------------
    // *ngIf
    //----------------------------------

    result = result.replace(
      /\*ngIf="([^"]+)"/g,

      '@if ($1)',
    );

    //----------------------------------
    // *ngFor
    //----------------------------------

    result = result.replace(
      /\*ngFor="let\s+(\w+)\s+of\s+([^"]+)"/g,

      '@for ($1 of $2; track $index)',
    );

    //----------------------------------
    // ngSwitch
    //----------------------------------

    result = result.replace(
      /\[ngSwitch\]="([^"]+)"/g,

      '@switch ($1)',
    );

    result = result.replace(
      /\*ngSwitchCase="([^"]+)"/g,

      '@case ($1)',
    );

    result = result.replace(
      /\*ngSwitchDefault/g,

      '@default',
    );

    return result;
  }
}
