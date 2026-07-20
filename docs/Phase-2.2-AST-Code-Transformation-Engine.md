# Phase 2.2 – AST-Based Code Transformation Engine

## Objective

Build an enterprise-grade AST engine capable of understanding Angular source code and performing automatic migration using the TypeScript Abstract Syntax Tree (AST).

---

# Architecture

```
Angular Project
        │
        ▼
TypeScript Parser
        │
        ▼
Project Analyzer
        │
        ▼
Source File Walker
        │
        ▼
Angular Metadata Detector
        │
        ▼
Component Analyzer
        │
        ▼
Transformation Pipeline
        │
        ├───────────────► Standalone Migration
        │
        ├───────────────► Bootstrap Migration
        │
        ├───────────────► Control Flow Migration
        │
        ├───────────────► Dependency Injection Migration
        │
        └───────────────► RxJS Migration
```

---

# Implemented Components

## AST Parser

- Parses tsconfig.json
- Loads TypeScript project
- Enumerates source files

---

## Source File Walker

Traverses every TypeScript file in the project.

---

## Angular Metadata Detection

Detects:

- Components
- Modules
- Services
- Directives
- Pipes

---

## Component Metadata Analyzer

Extracts:

- Component name
- Selector
- Template URL
- Inline template
- Style URLs
- Inline styles
- Standalone status
- Change detection strategy

---

## Standalone Component Transformer

Automatically converts legacy components into standalone components.

Features:

- Adds standalone: true
- Creates imports array
- Imports CommonModule

---

## Bootstrap Transformer

Migrates:

platformBrowserDynamic()

↓

bootstrapApplication()

---

## Control Flow Transformer

Migrates templates:

Old

```html
<div *ngIf="condition">
```

↓

```html
@if(condition){

<div>

}
```

Old

```html
<li *ngFor="let item of items">
```

↓

```html
@for(item of items; track $index){

<li>

}
```

---

## Dependency Injection Transformer

Converts:

```ts
constructor(private service: UserService){}
```

↓

```ts
private service = inject(UserService);
```

---

## RxJS Transformer

Modernizes:

- toPromise()
- firstValueFrom()
- Internal RxJS imports

---

# REST APIs

| Endpoint | Description |
|----------|-------------|
| GET /ast/analyze | Analyze Angular project |
| POST /ast/standalone | Convert standalone components |
| POST /ast/bootstrap | Bootstrap migration |
| POST /ast/templates | Template migration |
| POST /ast/inject | Dependency injection migration |
| POST /ast/rxjs | RxJS modernization |

---

# Benefits

- Enterprise-grade AST analysis
- Automated Angular modernization
- Reduced migration effort
- Structural code transformations
- Extensible transformation pipeline

---

# Technologies Used

- NestJS
- TypeScript
- ts-morph
- Angular Compiler APIs (foundation)
- Node.js

---

# Outcome

The migration platform can now automatically parse, analyze, and transform Angular source code using the TypeScript AST, providing a robust foundation for enterprise Angular migrations from Angular 8 to Angular 20.

---

# Next Phase

**Phase 2.3 – Angular Migration Rule Engine**

The next phase will orchestrate all AST transformers using configurable migration rules based on source and target Angular versions, project characteristics, and user-selected migration options.