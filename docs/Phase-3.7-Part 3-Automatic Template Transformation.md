# Phase 3.7 – Part 3: Automatic Template Transformation

## Step 3 – Implement Automatic Template Transformation

### Objective

Implement automatic transformation of legacy Angular template syntax into modern Angular control-flow syntax.

The transformation is performed by the backend template transformer service and returns:

- Original template
- Transformed template
- Whether any changes were made
- Details of each migration rule applied

---

## 1. Scope

This step focuses on automatic migration of legacy Angular structural directives.

### Supported transformations

| Legacy Angular Syntax | Modern Angular Syntax | Automation |
|---|---|---|
| `*ngIf` | `@if` | Yes |
| `*ngFor` | `@for` | Yes |
| `*ngSwitch` | `@switch` | Yes |

Additional Angular template constructs such as `ngClass` and `ngStyle` require contextual analysis and are handled separately as review rules.

---

## 2. Template Transformer Structure

The implementation is located under:

```text
backend/
└── src/
    └── code-migration/
        └── template-transformer/
            ├── angular-template-transformer.service.ts
            ├── angular-template-transformer.module.ts
            └── models/
                └── template-transformation-result.model.ts