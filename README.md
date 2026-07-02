# 📖 Project Overview

The **AI Angular Migration Platform** is an enterprise-grade application designed to automate the migration of Angular applications from older versions (Angular 8+) to the latest Angular releases.

The platform analyzes an Angular project, identifies migration challenges, generates an execution plan, executes migration tasks, and provides detailed reports to simplify and accelerate the migration process.

The project consists of:

- **Frontend:** Angular 17 + Angular Material
- **Backend:** NestJS
- **Repository Management:** Git
- **Project Scanner:** Fast-Glob
- **Code Analysis:** TypeScript AST
- **Migration Rule Engine**
- **Migration Planner**
- **Migration Executor**

---

# ✨ Features

## ✅ Repository Management

- Clone Git repositories
- Create temporary workspaces
- Validate repository structure

---

## ✅ Project Analysis

- Detect Angular project
- Read package.json
- Detect Angular version
- Detect TypeScript version
- Detect RxJS version
- Detect Package Manager

---

## ✅ Project Scanner

Automatically scans the project for:

- Components
- Modules
- Services
- Directives
- Pipes
- Routing Modules
- Standalone Components

---

## ✅ Dependency Analysis

- Analyze component imports
- Detect dependencies
- Generate dependency graph

---

## ✅ Migration Rule Engine

Detects migration issues such as:

- NgModule usage
- Standalone migration candidates
- Large component count
- Deprecated architecture

---

## ✅ Migration Planner

Automatically generates migration steps.

Example:

- Scan Components
- Convert NgModules
- Resolve Issues
- Upgrade Angular

---

## ✅ Migration Executor

Simulates migration execution.

Supports:

- Pending
- Running
- Completed
- Failed

---

## 🚧 Upcoming Features

- Package Upgrade Engine
- Angular CLI Integration
- AST Code Transformation
- Standalone Migration
- Route Migration
- Report Generation
- AI Recommendations
- Rollback Support

---

# 🏗️ Architecture

```
                    Angular Frontend
                           │
                           ▼
                Migration REST API (NestJS)
                           │
     ┌─────────────────────┼─────────────────────┐
     │                     │                     │
     ▼                     ▼                     ▼
 Git Module         Project Analyzer      Scanner Service
                                              │
                                              ▼
                                    Dependency Analyzer
                                              │
                                              ▼
                                        Rule Engine
                                              │
                                              ▼
                                   Migration Planner
                                              │
                                              ▼
                                   Migration Executor
                                              │
                                              ▼
                                    Response to Frontend
```

---

# 💻 Technology Stack

## Frontend

- Angular 17
- Angular Material
- Standalone Components
- Reactive Forms
- Angular Signals
- RxJS
- TypeScript

---

## Backend

- NestJS 11
- TypeScript
- Simple Git
- Fast Glob
- fs-extra
- UUID

---

## Development Tools

- VS Code
- Git
- GitHub
- npm
- Angular CLI
- Nest CLI

---

# 📁 Folder Structure

```
AI-Angular-Migration-Platform
│
├── backend
│   ├── git
│   ├── migration
│   ├── scanner
│   │      ├── ast
│   │      ├── dependency
│   │      ├── rules
│   │      └── utils
│   ├── planner
│   ├── executor
│   └── models
│
├── frontend
│   ├── features
│   ├── services
│   ├── models
│   ├── shared
│   └── assets
│
├── docs
│
└── screenshots
```

---

# ⚙️ Installation

## Prerequisites

- Node.js 20+
- npm
- Angular CLI
- Nest CLI
- Git

---

## Clone Repository

```bash
git clone https://github.com/<your-repository>.git
```

---

## Backend Setup

```bash
cd backend

npm install

npm run start:dev
```

Backend runs on

```
http://localhost:3000
```

---

## Frontend Setup

```bash
cd frontend

npm install

ng serve
```

Frontend runs on

```
http://localhost:4200
```

---

# ▶️ Running the Project

### Start Backend

```bash
cd backend

npm run start:dev
```

---

### Start Frontend

```bash
cd frontend

ng serve
```

---

### Open Browser

```
http://localhost:4200
```

---

# 📷 Screenshots

Add screenshots inside:

```
screenshots/
```

Example:

```
screenshots/
│
├── dashboard.png
├── project-info.png
├── scan-summary.png
├── migration-issues.png
├── migration-plan.png
└── execution-summary.png
```

Example in Markdown:

```markdown
## Dashboard

![Dashboard](screenshots/dashboard.png)

## Project Scan

![Project Scan](screenshots/scan-summary.png)
```

---

# 🔗 API Summary

## Start Migration

### POST

```
POST /migration/start
```

### Request

```json
{
  "repositoryUrl": "https://github.com/example/project.git",
  "fromVersion": "17",
  "toVersion": "20",
  "outputFolder": "C:/Migration"
}
```

---

### Response

```json
{
  "jobId": "...",
  "status": "SCANNED",
  "projectInfo": {},
  "scan": {},
  "plan": {}
}
```

---

# 🛣️ Roadmap

## ✅ Completed

- Project Setup
- Dashboard UI
- Backend API
- Repository Cloning
- Workspace Creation
- Angular Project Detection
- Package Analysis
- Project Scanner
- Standalone Detection
- AST Analysis
- Dependency Graph
- Rule Engine
- Migration Planner
- Migration Executor

---

## 🚧 In Progress

- Package Upgrade Engine
- Angular CLI Integration
- Code Transformation
- Report Generator
- AI Recommendation Engine

---

## 📚 Documentation

Detailed documentation is available inside the **docs** folder.

```
docs/
│
├── 01-Architecture.md
├── 02-Installation.md
├── 03-Backend.md
├── 04-Frontend.md
├── 05-API.md
├── 06-Development-Journey.md
├── 07-Migration-Engine.md
├── 08-Roadmap.md
└── 09-Contributing.md
```

---

# 🎯 Current Progress

| Module | Status |
|----------|--------|
| Frontend Dashboard | ✅ |
| Backend API | ✅ |
| Git Clone | ✅ |
| Workspace | ✅ |
| Project Analyzer | ✅ |
| Scanner | ✅ |
| AST Analyzer | ✅ |
| Dependency Graph | ✅ |
| Rule Engine | ✅ |
| Migration Planner | ✅ |
| Migration Executor | ✅ |
| Package Upgrade | 🚧 |
| CLI Execution | 🚧 |
| Standalone Migration | 🚧 |
| Report Generator | 🚧 |
| AI Recommendation | 🚧 |

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ganesh Dhokale**

Technical Specialist | Frontend Developer

12+ Years of Experience

Angular • React • TypeScript • NestJS • AI Applications

---

# ⭐ Acknowledgements

Special thanks to the Angular, NestJS, and Open Source communities for providing the tools and libraries that made this project possible.

---

**If you find this project helpful, please consider giving it a ⭐ on GitHub!**
