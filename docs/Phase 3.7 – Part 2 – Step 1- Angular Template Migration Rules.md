# Phase 3.7 – Part 2 – Step 1: Angular Template Migration Rules

## 1. Objective

Implement the first rule layer for Angular template migration. The rule service provides a centralized, extensible definition of legacy Angular template syntax and its corresponding modern Angular syntax.

This step establishes the migration rules that will be consumed by the automatic template transformation implemented in Phase 3.7 Part 3.

## 2. Scope

Implemented:

- Angular template migration rule model
- Angular template rule service
- Initial structural-directive migration rules
- Review rules for selected Angular bindings
- Rule lookup and filtering APIs
- NestJS module registration
- `GET /code-migration/template-rules` endpoint
- Swagger verification

## 3. Files Added

```text
src/code-migration/template-rules/
├── angular-template-rule.model.ts
├── angular-template-rule.service.ts
└── angular-template-rule.module.ts
```

## 4. Migration Rule Model

`angular-template-rule.model.ts` defines:

- `AngularTemplateRuleType`
- `AngularTemplateMigrationRule`

Supported rule types:

- `STRUCTURAL_DIRECTIVE`
- `INTERPOLATION`
- `PROPERTY_BINDING`
- `EVENT_BINDING`

Each migration rule contains:

- `id`
- `type`
- `sourceSyntax`
- `targetSyntax`
- `description`
- `automated`

## 5. Implemented Rules

### 5.1 `*ngIf` → `@if`

```text
Source:
*ngIf="condition"

Target:
@if (condition) {
  ...
}
```

Rule ID: `NGIF_TO_IF`

Automation: `true`

### 5.2 `*ngFor` → `@for`

```text
Source:
*ngFor="let item of items"

Target:
@for (item of items; track item) {
  ...
}
```

Rule ID: `NGFOR_TO_FOR`

Automation: `true`

### 5.3 `ngSwitch` → `@switch`

```text
Source:
[ngSwitch]="value"

Target:
@switch (value) {
  ...
}
```

Rule ID: `NGSWITCH_TO_SWITCH`

Automation: `true`

### 5.4 `ngClass` Review Rule

```text
Source:
[ngClass]="expression"

Target:
[class]="expression"
```

Rule ID: `NGCLASS_REVIEW`

Automation: `false`

This rule is marked for review because transformation may depend on the expression structure.

### 5.5 `ngStyle` Review Rule

```text
Source:
[ngStyle]="expression"

Target:
[style]="expression"
```

Rule ID: `NGSTYLE_REVIEW`

Automation: `false`

This rule is also marked for review rather than unconditional automatic transformation.

## 6. Rule Service

`AngularTemplateRuleService` provides:

```text
getRules()
getRule(ruleId)
getRulesByType(type)
getAutomatedRules()
findRuleForDirective(directive)
hasRule(ruleId)
```

This keeps migration rules centralized and extensible for future Angular template migrations.

## 7. Module Integration

`AngularTemplateRuleModule` registers and exports:

```ts
AngularTemplateRuleService
```

The module is registered with the code-migration module so the controller can consume the rule service.

## 8. API Endpoint

### GET

```text
/code-migration/template-rules
```

### Purpose

Returns the currently configured Angular template migration rules.

### Swagger Test

Execute:

```text
GET /code-migration/template-rules
```

Expected result:

- HTTP `200`
- JSON array containing the configured migration rules
- `NGIF_TO_IF`
- `NGFOR_TO_FOR`
- `NGSWITCH_TO_SWITCH`
- `NGCLASS_REVIEW`
- `NGSTYLE_REVIEW`

## 9. Acceptance Criteria

- [x] Template migration rule model created
- [x] Rule service created
- [x] `*ngIf` → `@if` rule added
- [x] `*ngFor` → `@for` rule added
- [x] `ngSwitch` → `@switch` rule added
- [x] `ngClass` review rule added
- [x] `ngStyle` review rule added
- [x] Automated and manual-review rules distinguished
- [x] Rule module registered
- [x] Template-rules endpoint exposed
- [x] Swagger endpoint verified

## 10. Important Design Decision

Part 2 defines **what should be migrated**, but does not perform HTML transformation.

The actual transformation of:

```html
<div *ngIf="isBusy">
  ...
</div>
```

into:

```html
@if (isBusy) {
  <div>
    ...
  </div>
}
```

belongs to **Phase 3.7 Part 3 – Automatic Template Transformation**.

The template analyzer from Part 1 provides syntax discovery. Part 3 will consume the analyzer output and migration rules to produce transformed Angular templates.

## 11. Suggested Screenshots

### Primary

```text
Phase-3.7-Part-2-Step-1-Swagger-Template-Rules.png
```

Capture the Swagger UI showing:

- `GET /code-migration/template-rules`
- Request execution
- HTTP `200`
- Response containing the configured migration rules

### Optional

```text
Phase-3.7-Part-2-Step-1-Migration-Rules-Response.png
```

Use this if the response is long and the rule definitions are easier to read in a separate capture.

## 12. PR Comment

### PR Title

```text
Phase 3.7 Part 2 Step 1 - Add Angular template migration rules
```

### PR Description

Implemented the first rule layer for Angular template migration.

### Changes

- Added `AngularTemplateMigrationRule` model.
- Added centralized `AngularTemplateRuleService`.
- Added migration rules for:
  - `*ngIf` → `@if`
  - `*ngFor` → `@for`
  - `ngSwitch` → `@switch`
  - `ngClass` review
  - `ngStyle` review
- Added automated/manual-review classification.
- Added rule lookup and filtering methods.
- Registered `AngularTemplateRuleModule`.
- Added `GET /code-migration/template-rules`.
- Verified the endpoint through Swagger.

### Validation

Swagger successfully exposes the template migration rules endpoint and returns the configured rules.

### Next Step

Phase 3.7 Part 3 will use these rules to perform automatic Angular template transformation.

## 13. Commit Message

```text
Phase 3.7 Part 2 Step 1 - Add Angular template migration rules
```
