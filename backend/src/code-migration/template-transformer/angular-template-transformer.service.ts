import { Injectable } from '@nestjs/common';
import {
  TemplateTransformationChange,
  TemplateTransformationResult,
} from './models/template-transformation-result.model';

interface NgIfExpression {
  condition: string;
  thenTemplate?: string;
  elseTemplate?: string;
}

interface NgForExpression {
  itemVariable: string;
  iterable: string;
  indexVariable?: string;
  firstVariable?: string;
  lastVariable?: string;
  evenVariable?: string;
  oddVariable?: string;
  trackByExpression?: string;
}

@Injectable()
export class AngularTemplateTransformerService {
  transform(source: string): TemplateTransformationResult {
    const changes: TemplateTransformationChange[] = [];

    let transformed = source;

    /*
     * Order matters.
     *
     * First migrate ngFor because an ngFor element can contain
     * nested ngIf/ngFor blocks.
     */
    transformed = this.transformNgFor(transformed, changes);

    transformed = this.transformNgIf(transformed, changes);

    return {
      source,
      transformed,
      changed: transformed !== source,
      changes,
    };
  }

  // ============================================================
  // *ngFor -> @for
  // ============================================================

  private transformNgFor(
    source: string,
    changes: TemplateTransformationChange[],
  ): string {
    let result = source;

    let previous: string;

    do {
      previous = result;

      result = this.transformSingleLevelNgFor(result, changes);
    } while (result !== previous);

    return result;
  }

  private transformSingleLevelNgFor(
    source: string,
    changes: TemplateTransformationChange[],
  ): string {
    const elementPattern =
      /<([a-zA-Z][\w:-]*)([^>]*?)\s\*ngFor\s*=\s*"([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g;

    return source.replace(
      elementPattern,
      (
        fullMatch: string,
        elementName: string,
        attributesBefore: string,
        ngForExpression: string,
        attributesAfter: string,
        content: string,
      ) => {
        const parsed = this.parseNgForExpression(ngForExpression);

        if (!parsed) {
          return fullMatch;
        }

        const cleanElement =
          `<${elementName}${attributesBefore}${attributesAfter}>` +
          content +
          `</${elementName}>`;

        const replacement = this.createForBlock(
          parsed,
          cleanElement,
        );

        changes.push({
          ruleId: 'NGFOR_TO_FOR',
          sourceSyntax: `*ngFor="${ngForExpression.trim()}"`,
          targetSyntax: this.describeForTargetSyntax(parsed),
          description:
            'Migrates the Angular *ngFor structural directive to modern Angular @for control-flow syntax.',
        });

        return replacement;
      },
    );
  }

  // ============================================================
  // Parse *ngFor microsyntax
  // ============================================================

  private parseNgForExpression(
    expression: string,
  ): NgForExpression | null {
    const parts = expression
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      return null;
    }

    /*
     * First expression:
     *
     * let item of items
     */
    const itemMatch = parts[0].match(
      /^let\s+([a-zA-Z_$][\w$]*)\s+of\s+(.+)$/i,
    );

    if (!itemMatch) {
      return null;
    }

    const itemVariable = itemMatch[1].trim();
    const iterable = itemMatch[2].trim();

    const result: NgForExpression = {
      itemVariable,
      iterable,
    };

    for (const part of parts.slice(1)) {
      this.parseNgForPart(part, result);
    }

    return result;
  }

  private parseNgForPart(
    part: string,
    result: NgForExpression,
  ): void {
    /*
     * index as i
     */
    const indexAsMatch = part.match(
      /^index\s+as\s+([a-zA-Z_$][\w$]*)$/i,
    );

    if (indexAsMatch) {
      result.indexVariable = indexAsMatch[1];
      return;
    }

    /*
     * first as firstItem
     */
    const firstAsMatch = part.match(
      /^first\s+as\s+([a-zA-Z_$][\w$]*)$/i,
    );

    if (firstAsMatch) {
      result.firstVariable = firstAsMatch[1];
      return;
    }

    /*
     * last as lastItem
     */
    const lastAsMatch = part.match(
      /^last\s+as\s+([a-zA-Z_$][\w$]*)$/i,
    );

    if (lastAsMatch) {
      result.lastVariable = lastAsMatch[1];
      return;
    }

    /*
     * even as evenItem
     */
    const evenAsMatch = part.match(
      /^even\s+as\s+([a-zA-Z_$][\w$]*)$/i,
    );

    if (evenAsMatch) {
      result.evenVariable = evenAsMatch[1];
      return;
    }

    /*
     * odd as oddItem
     */
    const oddAsMatch = part.match(
      /^odd\s+as\s+([a-zA-Z_$][\w$]*)$/i,
    );

    if (oddAsMatch) {
      result.oddVariable = oddAsMatch[1];
      return;
    }

    /*
     * let i = index
     */
    const letVariableMatch = part.match(
      /^let\s+([a-zA-Z_$][\w$]*)\s*=\s*(index|first|last|even|odd)$/i,
    );

    if (letVariableMatch) {
      const variableName = letVariableMatch[1];
      const contextVariable = letVariableMatch[2].toLowerCase();

      switch (contextVariable) {
        case 'index':
          result.indexVariable = variableName;
          break;

        case 'first':
          result.firstVariable = variableName;
          break;

        case 'last':
          result.lastVariable = variableName;
          break;

        case 'even':
          result.evenVariable = variableName;
          break;

        case 'odd':
          result.oddVariable = variableName;
          break;
      }

      return;
    }

    /*
     * trackBy: trackById
     */
    const trackByMatch = part.match(
      /^trackBy\s*:\s*(.+)$/i,
    );

    if (trackByMatch) {
      result.trackByExpression = trackByMatch[1].trim();
    }
  }

  // ============================================================
  // Create @for block
  // ============================================================

  private createForBlock(
    expression: NgForExpression,
    element: string,
  ): string {
    const trackExpression =
      this.createTrackExpression(expression);

    const contextVariables =
      this.createContextVariables(expression);

    const forHeaderParts = [
      `${expression.itemVariable} of ${expression.iterable}`,
      `track ${trackExpression}`,
      ...contextVariables,
    ];

    return [
      `@for (${forHeaderParts.join('; ')}) {`,
      `  ${element}`,
      `}`,
    ].join('\n');
  }

  // ============================================================
  // Track expression
  // ============================================================

  private createTrackExpression(
    expression: NgForExpression,
  ): string {
    /*
     * If legacy trackBy exists:
     *
     * trackBy: trackById
     *
     * Angular @for requires a track expression.
     *
     * We preserve the original expression in a safe
     * migration representation.
     */
    if (expression.trackByExpression) {
      return `${expression.trackByExpression}(${expression.indexVariable ?? 'index'}, ${expression.itemVariable})`;
    }

    /*
     * Default migration strategy.
     *
     * Using the item itself provides a deterministic
     * track expression for common collections.
     */
    return expression.itemVariable;
  }

  // ============================================================
  // Context variables
  // ============================================================

  private createContextVariables(
    expression: NgForExpression,
  ): string[] {
    const variables: string[] = [];

    if (expression.indexVariable) {
      variables.push(
        `let ${expression.indexVariable} = $index`,
      );
    }

    if (expression.firstVariable) {
      variables.push(
        `let ${expression.firstVariable} = $first`,
      );
    }

    if (expression.lastVariable) {
      variables.push(
        `let ${expression.lastVariable} = $last`,
      );
    }

    if (expression.evenVariable) {
      variables.push(
        `let ${expression.evenVariable} = $even`,
      );
    }

    if (expression.oddVariable) {
      variables.push(
        `let ${expression.oddVariable} = $odd`,
      );
    }

    return variables;
  }

  private describeForTargetSyntax(
    expression: NgForExpression,
  ): string {
    const trackExpression =
      this.createTrackExpression(expression);

    return `@for (${expression.itemVariable} of ${expression.iterable}; track ${trackExpression}) { ... }`;
  }

  // ============================================================
  // *ngIf -> @if
  // ============================================================

  private transformNgIf(
    source: string,
    changes: TemplateTransformationChange[],
  ): string {
    let result = source;

    let previous: string;

    do {
      previous = result;

      result = this.transformSingleLevelNgIf(
        result,
        changes,
      );
    } while (result !== previous);

    return result;
  }

  private transformSingleLevelNgIf(
    source: string,
    changes: TemplateTransformationChange[],
  ): string {
    const elementPattern =
      /<([a-zA-Z][\w:-]*)([^>]*?)\s\*ngIf\s*=\s*"([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g;

    return source.replace(
      elementPattern,
      (
        fullMatch: string,
        elementName: string,
        attributesBefore: string,
        ngIfExpression: string,
        attributesAfter: string,
        content: string,
      ) => {
        const parsed =
          this.parseNgIfExpression(ngIfExpression);

        const cleanElement =
          `<${elementName}${attributesBefore}${attributesAfter}>` +
          content +
          `</${elementName}>`;

        const replacement =
          this.createIfBlock(
            parsed,
            cleanElement,
          );

        changes.push({
          ruleId: 'NGIF_TO_IF',
          sourceSyntax: `*ngIf="${ngIfExpression.trim()}"`,
          targetSyntax:
            this.describeTargetSyntax(parsed),
          description:
            'Migrates the Angular *ngIf structural directive to modern Angular @if control-flow syntax.',
        });

        return replacement;
      },
    );
  }

  private parseNgIfExpression(
    expression: string,
  ): NgIfExpression {
    const parts = expression
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean);

    const condition = parts[0] ?? '';

    let thenTemplate: string | undefined;
    let elseTemplate: string | undefined;

    for (const part of parts.slice(1)) {
      const thenMatch =
        part.match(/^then\s+(.+)$/i);

      const elseMatch =
        part.match(/^else\s+(.+)$/i);

      if (thenMatch) {
        thenTemplate =
          thenMatch[1].trim();
      }

      if (elseMatch) {
        elseTemplate =
          elseMatch[1].trim();
      }
    }

    return {
      condition,
      thenTemplate,
      elseTemplate,
    };
  }

  private createIfBlock(
    expression: NgIfExpression,
    element: string,
  ): string {
    if (
      expression.thenTemplate &&
      expression.elseTemplate
    ) {
      return [
        `@if (${expression.condition}) {`,
        `  ${element}`,
        `} @else {`,
        `  <ng-container`,
        `    *ngTemplateOutlet="${expression.elseTemplate}"`,
        `  ></ng-container>`,
        `}`,
      ].join('\n');
    }

    if (expression.elseTemplate) {
      return [
        `@if (${expression.condition}) {`,
        `  ${element}`,
        `} @else {`,
        `  <ng-container`,
        `    *ngTemplateOutlet="${expression.elseTemplate}"`,
        `  ></ng-container>`,
        `}`,
      ].join('\n');
    }

    if (expression.thenTemplate) {
      return [
        `@if (${expression.condition}) {`,
        `  <ng-container`,
        `    *ngTemplateOutlet="${expression.thenTemplate}"`,
        `  ></ng-container>`,
        `}`,
      ].join('\n');
    }

    return [
      `@if (${expression.condition}) {`,
      `  ${element}`,
      `}`,
    ].join('\n');
  }

  private describeTargetSyntax(
    expression: NgIfExpression,
  ): string {
    if (
      expression.thenTemplate &&
      expression.elseTemplate
    ) {
      return `@if (${expression.condition}) { ... } @else { ... }`;
    }

    if (expression.elseTemplate) {
      return `@if (${expression.condition}) { ... } @else { ... }`;
    }

    if (expression.thenTemplate) {
      return `@if (${expression.condition}) { ... }`;
    }

    return `@if (${expression.condition}) { ... }`;
  }
}