# Phase 3.7 – Part 1: Angular Template Analyzer

## 1. Objective

Implement the first stage of Angular template migration by creating a template analyzer that identifies Angular template constructs and HTML elements.

The analyzer provides the discovery layer required by later template migration rules and automatic transformation.

## 2. Scope

- Angular template node model
- Angular template analyzer service
- Template analysis API
- Structural directive detection
- HTML element detection
- Interpolation detection
- Property binding detection
- Event binding detection
- Template reference detection
- Swagger API verification

## 3. Implementation

### Model

Created:

`src/code-migration/template-analyzer/models/angular-template-node.model.ts`

Supported node types include:

- `ELEMENT`
- `TEXT`
- `INTERPOLATION`
- `STRUCTURAL_DIRECTIVE`
- `PROPERTY_BINDING`
- `EVENT_BINDING`
- `ATTRIBUTE`
- `TEMPLATE_REFERENCE`

### Analyzer Service

Created:

`src/code-migration/template-analyzer/angular-template-analyzer.service.ts`

The service analyzes Angular template source and identifies supported constructs. Helper methods are provided for querying structural directives, interpolations, property bindings, event bindings, and template references.

### Module

Created:

`src/code-migration/template-analyzer/angular-template-analyzer.module.ts`

The analyzer service is exported for use by the Code Migration module.

### API

Added:

`POST /code-migration/analyze-template`

The endpoint accepts Angular HTML template source and returns detected template nodes.

## 4. Swagger Request

```json
{
  "source": "<div *ngIf="isBusy"><mat-spinner></mat-spinner></div>"
}
```

## 5. Verified Response

The analyzer successfully returned:

```json
[
  {
    "type": "STRUCTURAL_DIRECTIVE",
    "name": "ngIf",
    "expression": "isBusy",
    "value": "isBusy",
    "metadata": {
      "syntax": "*ngIf"
    }
  },
  {
    "type": "ELEMENT",
    "element": "div"
  },
  {
    "type": "ELEMENT",
    "element": "mat-spinner"
  }
]
```

This confirms detection of the `*ngIf` structural directive and the `div` and `mat-spinner` elements.

## 6. Supported Constructs

| Construct | Example | Status |
|---|---|---|
| Structural directive | `*ngIf="isBusy"` | Verified |
| Structural directive | `*ngFor="let answer of answers"` | Supported |
| Interpolation | `{{ answer.body }}` | Supported |
| Property binding | `[innerHtml]="question.body"` | Supported |
| Property binding | `[routerLink]="link"` | Supported |
| Event binding | `(click)="save()"` | Supported |
| Template reference | `#myInput` | Supported |
| HTML element | `<div>` | Verified |
| Angular component element | `<mat-spinner>` | Verified |

## 7. Design Note

The current implementation is a lightweight discovery analyzer. It identifies template constructs required by the migration pipeline.

Actual migrations such as:

`*ngIf → @if`

`*ngFor → @for`

`*ngSwitch → @switch`

belong to the subsequent migration-rule phase.

## 8. Swagger Verification

1. Open Swagger UI.
2. Locate `POST /code-migration/analyze-template`.
3. Click **Try it out**.
4. Enter Angular template source.
5. Execute the request.
6. Verify HTTP 201.
7. Verify detected template nodes in the response.

## 9. Screenshots

### Screenshot 1 – Swagger Analyze Template Endpoint

**Filename:**

`Phase-3.7-Part-1-Swagger-Analyze-Template.png`

**Caption:**

> Figure 3.7.1.1 – Swagger UI showing the `POST /code-migration/analyze-template` endpoint and Angular template request body.

### Screenshot 2 – Successful Template Analysis

**Filename:**

`Phase-3.7-Part-1-Successful-Template-Analysis.png`

**Caption:**

> Figure 3.7.1.2 – Successful template analysis response showing detection of the `ngIf` structural directive and the `div` and `mat-spinner` elements.

This should be the primary evidence screenshot.

### Screenshot 3 – Full Template Analysis

**Filename:**

`Phase-3.7-Part-1-Full-Template-Analysis.png`

**Caption:**

> Figure 3.7.1.3 – Template analyzer response for a representative Angular template containing structural directives, interpolations, property bindings, event bindings, and Angular component elements.

This is recommended after running the full-template test.

## 10. Acceptance Criteria

| Acceptance Criteria | Status |
|---|---|
| Template node model created | Completed |
| Analyzer service created | Completed |
| Analyzer module created | Completed |
| Analyzer integrated with Code Migration module | Completed |
| Analyze-template API exposed | Completed |
| Swagger request body available | Completed |
| `ngIf` detection verified | Completed |
| HTML element detection verified | Completed |
| Interpolation detection implemented | Completed |
| Property binding detection implemented | Completed |
| Event binding detection implemented | Completed |
| Template reference detection implemented | Completed |

## 11. Recommended Commit

```text
Phase 3.7 Part 1 - Add Angular template analyzer
```

Suggested commands:

```bash
git status
git add src/code-migration/template-analyzer
git add src/code-migration/code-migration.controller.ts
git add src/code-migration/code-migration.module.ts
git add src/code-migration/dto/analyze-template.dto.ts
git add docs
git add screenshots
git commit -m "Phase 3.7 Part 1 - Add Angular template analyzer"
```

Review `git status` before committing and exclude temporary/debug files.

## 12. PR Summary

Implemented the first stage of Angular template migration by adding a template discovery analyzer.

The analyzer exposes:

`POST /code-migration/analyze-template`

and successfully detects Angular structural directives and HTML elements from template source.

The analyzer also provides detection support for interpolations, property bindings, event bindings, and template references, which will be used by subsequent template migration rules.

## 13. Phase Status

**Phase 3.7 – Part 1: Completed**

The Angular template discovery/analyzer layer is implemented and verified through the migration platform API.

## 14. Next Phase

**Phase 3.7 – Part 2: Angular Template Migration Rules**

Planned rules include:

`*ngIf → @if`

`*ngFor → @for`

`*ngSwitch → @switch`
