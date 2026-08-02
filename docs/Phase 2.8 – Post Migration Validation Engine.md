# Phase 2.8 – Post Migration Validation Engine

## Objective

Validate Angular projects after migration to ensure project integrity and build readiness.

---

# Components

Validation Module

Validation Service

Validation Controller

Validation Report Service

---

# Validation Checks

## Project

- Project Folder
- package.json
- angular.json
- tsconfig.json

---

## Dependencies

- Angular Dependencies
- TypeScript
- node_modules

---

## Build

- Angular CLI
- Angular Build
- Lint Configuration

---

# Reports

Generated reports are stored inside

validation-reports/

Example

validation-1754200000000.json

---

# APIs

## Run Validation

POST

/validation/run

Request

```json
{
  "projectPath": "C:\\AngularProject"
}
```