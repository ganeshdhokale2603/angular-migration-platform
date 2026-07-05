# Installation
# Project Setup Guide

## Prerequisites

Install the following software:

- Node.js (v20 or later recommended)
- npm
- Git
- Angular CLI
- VS Code

---

# Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm run start:dev
```

Backend URL:

```
http://localhost:3000
```

---

# Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Angular application:

```bash
ng serve
```

Frontend URL:

```
http://localhost:4200
```

---

# Project Structure

```
angular-migration-platform
│
├── backend
│   ├── src
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── src
│   ├── package.json
│   └── angular.json
│
├── docs
│
└── README.md
```

---

# Running the Application

1. Start the backend.
2. Start the frontend.
3. Open:

```
http://localhost:4200
```

4. Enter:

- Repository URL
- Current Angular Version
- Target Angular Version
- Output Folder

5. Click **Start Migration**.

---

# Build Commands

Backend

```bash
npm run build
```

Frontend

```bash
ng build
```

---

# Troubleshooting

## Port Already in Use

Kill the process using the occupied port or change the application's port.

## npm install Fails

Delete:

- node_modules
- package-lock.json

Then run:

```bash
npm install
```

## Backend Cannot Connect

Verify that the backend server is running on port **3000**.

## Angular Build Errors

Run:

```bash
ng cache clean
npm install
```

---

# Next Steps

- Explore the dashboard.
- Review generated migration reports.
- Test with different Angular projects.
- Follow the documentation in the `docs/` directory for detailed implementation information.
