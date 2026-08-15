# Phase 3.5 – Standalone Validation & AST-Based Constructor Transformation

## Overview

Phase 3.5 improves the Angular migration engine by introducing validation for
standalone migration results and AST-based transformation of constructor
dependency injection.

The main objective is to safely modernize Angular constructor-based dependency
injection to the `inject()` API while preserving existing application logic.

---

## Objectives

The objectives of Phase 3.5 are:

- Validate standalone migration results.
- Introduce AST-based constructor transformation.
- Convert constructor dependency injection to Angular `inject()`.
- Preserve access modifiers.
- Preserve readonly properties.
- Preserve non-DI constructor parameters.
- Manage Angular `inject` imports automatically.
- Integrate the transformation into the existing migration pipeline.
- Validate the generated source after transformation.

---

# Part 1 – Standalone Migration Validation

## Standalone Validation Service

The standalone migration validation functionality verifies the result of
standalone component migration.

The validation layer provides structured information about migration results
and validation status.

### Main Components

- `StandaloneValidationService`
- `StandaloneValidationResult`
- Standalone validation controller/API integration

### Validation Responsibilities

The validation layer checks:

- Migration result availability.
- Converted component information.
- Migration status.
- Validation errors.
- Validation warnings.

---

# Part 2 – AST-Based Constructor Transformation

## Objective

Angular dependency injection traditionally uses constructor parameters:

```typescript
constructor(
  private userService: UserService,
  private router: Router
) {}