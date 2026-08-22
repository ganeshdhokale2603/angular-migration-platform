# Phase 3.6 – Part 1: Angular Import AST Analyzer

## Overview

Phase 3.6 begins the Angular import and decorator analysis stage of the
migration engine.

Part 1 introduces an AST-based Angular Import Analyzer that identifies and
extracts TypeScript import declarations from Angular source files.

The analyzer uses the TypeScript Compiler API and does not modify source code.

---

## Objectives

The objectives of Part 1 are:

- Analyze TypeScript import declarations.
- Detect Angular imports.
- Detect `@angular/core` imports.
- Extract named imports.
- Extract default imports.
- Extract namespace imports.
- Identify non-Angular imports.
- Provide structured import information.
- Expose the analyzer through a Swagger API.
- Prepare the analyzer for future import transformation and cleanup.

---

# Architecture

The analyzer follows this flow:

Angular Source
      |
      v
TypeScript SourceFile
      |
      v
ImportDeclaration Analysis
      |
      +---- Module Name
      |
      +---- Named Imports
      |
      +---- Default Import
      |
      +---- Namespace Import
      |
      +---- Angular Detection
      |
      +---- Core Detection
      |
      v
AngularImport[]