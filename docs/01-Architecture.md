# Architecture

# System Architecture

## High-Level Architecture

```
                +-----------------------+
                |   Angular Frontend    |
                +-----------+-----------+
                            |
                            |
                       REST API
                            |
                            |
                +-----------v-----------+
                |     NestJS Backend    |
                +-----------+-----------+
                            |
     ------------------------------------------------------
     |          |           |         |         |          |
 Git Clone  Analyzer   Scanner   Planner   Executor  Upgrader
     |          |           |         |         |          |
     ------------------------------------------------------
                            |
                     Temporary Workspace
                            |
                       Cloned Repository
```

---

# Backend Modules

## Git Module

Responsibilities

- Clone repositories
- Workspace management

---

## Project Analyzer

Responsibilities

- Detect Angular version
- Detect TypeScript version
- Detect RxJS version
- Detect package manager

---

## Scanner

Responsibilities

- Scan Components
- Scan Modules
- Scan Services
- Scan Directives
- Scan Pipes
- Scan Routing

---

## Dependency Analyzer

Responsibilities

- Build dependency graph
- Detect standalone components
- Analyze imports

---

## Rule Engine

Responsibilities

- Evaluate migration rules
- Generate recommendations
- Detect migration blockers

---

## Migration Planner

Responsibilities

- Create migration steps
- Estimate execution time
- Order migration tasks

---

## Migration Executor

Responsibilities

- Execute migration plan
- Track progress
- Generate execution summary

---

## Package Upgrade

Responsibilities

- Update package.json
- Upgrade dependencies
- Upgrade devDependencies

---

# Frontend Architecture

Dashboard

↓

Migration Form

↓

HTTP Service

↓

REST API

↓

Display Results

---

# Data Flow

User

↓

Repository URL

↓

Backend

↓

Clone Repository

↓

Analyze

↓

Scan

↓

Detect Issues

↓

Generate Plan

↓

Execute

↓

Upgrade Packages

↓

Return Result

↓

Frontend Dashboard

---

# Design Principles

- Modular Architecture
- Single Responsibility Principle
- Service-Based Design
- Reusable Components
- Extensible Modules
- Enterprise Scalability
