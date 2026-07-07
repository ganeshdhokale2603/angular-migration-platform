import { TemplateChange } from './models/template-change';

export class TemplateTransformer {
  transform(html: string): {
    html: string;

    changes: TemplateChange[];
  } {
    let updated = html;

    const changes: TemplateChange[] = [];

    //----------------------------------------------------
    // *ngIf -> @if
    //----------------------------------------------------

    updated = updated.replace(
      /<([a-zA-Z0-9-]+)([^>]*)\s\*ngIf="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/gm,

      (_match, tag, before, condition, after, content) => {
        changes.push({
          file: '',

          rule: '*ngIf',

          before: `*ngIf="${condition}"`,

          after: `@if (${condition})`,
        });

        return `@if (${condition}) {\n<${tag}${before}${after}>${content}</${tag}>\n}`;
      },
    );

    //----------------------------------------------------
    // *ngFor -> @for
    //----------------------------------------------------

    updated = updated.replace(
      /<([a-zA-Z0-9-]+)([^>]*)\s\*ngFor="let\s+(\w+)\s+of\s+([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/gm,

      (_match, tag, before, variable, collection, after, content) => {
        changes.push({
          file: '',

          rule: '*ngFor',

          before: `*ngFor="let ${variable} of ${collection}"`,

          after: `@for (${variable} of ${collection}; track ${variable})`,
        });

        return `@for (${variable} of ${collection}; track ${variable}) {\n<${tag}${before}${after}>${content}</${tag}>\n}`;
      },
    );

    //----------------------------------------------------
    // ngSwitch -> @switch
    //----------------------------------------------------

    updated = updated.replace(
      /<([a-zA-Z0-9-]+)([^>]*)\s\[ngSwitch\]="([^"]+)"([^>]*)>/gm,

      (_m, tag, before, value, after) => {
        changes.push({
          file: '',

          rule: 'ngSwitch',

          before: `[ngSwitch]="${value}"`,

          after: `@switch (${value})`,
        });

        return `@switch (${value}) {\n<${tag}${before}${after}>`;
      },
    );

    //----------------------------------------------------
    // trackBy -> track
    //----------------------------------------------------

    updated = updated.replace(
      /trackBy:\s*([A-Za-z0-9_]+)/gm,

      (_m, fn) => {
        changes.push({
          file: '',

          rule: 'trackBy',

          before: `trackBy: ${fn}`,

          after: `track ${fn}`,
        });

        return `track ${fn}`;
      },
    );

    //----------------------------------------------------
    // Remove ng-container
    //----------------------------------------------------

    updated = updated.replace(
      /<ng-container>([\s\S]*?)<\/ng-container>/gm,

      (_m, content) => {
        changes.push({
          file: '',

          rule: 'Remove ng-container',

          before: '<ng-container>',

          after: '',
        });

        return content;
      },
    );

    //----------------------------------------------------
    // Remove ng-template
    //----------------------------------------------------

    updated = updated.replace(
      /<ng-template>([\s\S]*?)<\/ng-template>/gm,

      (_m, content) => {
        changes.push({
          file: '',

          rule: 'Remove ng-template',

          before: '<ng-template>',

          after: '',
        });

        return content;
      },
    );

    //----------------------------------------------------
    // Manual Review Detection
    //----------------------------------------------------

    const reviewPatterns = [
      '[innerHTML]',

      'ViewContainerRef',

      'ComponentFactoryResolver',

      'ngTemplateOutlet',
    ];

    reviewPatterns.forEach((pattern) => {
      if (updated.includes(pattern)) {
        changes.push({
          file: '',

          rule: 'Manual Review',

          before: pattern,

          after: pattern,
        });
      }
    });

    if (changes.length > 0) {
      console.log(`Template Changes : ${changes.length}`);
    }

    return {
      html: updated,

      changes,
    };
  }
}
