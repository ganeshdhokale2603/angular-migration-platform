# Day 11 - Package Upgrade Engine

## Overview

Day 11 introduces the Package Upgrade Engine.

This module automatically updates the cloned Angular project's package.json according to the target Angular version selected by the user.

The migration platform now performs an actual migration action instead of only analyzing the project.

---

# Objectives

- Read package.json.
- Upgrade Angular packages.
- Upgrade Angular Material.
- Upgrade Angular CDK.
- Upgrade TypeScript.
- Upgrade RxJS.
- Save the updated package.json.
- Return upgrade summary.

---

# Architecture

Clone Repository

↓

Read package.json

↓

Update Dependencies

↓

Update DevDependencies

↓

Write package.json

↓

Return Upgrade Summary

---

# New Module

backend/src/package-upgrade

Files

- package-upgrade.service.ts
- package-upgrade.module.ts

---

# Supported Package Updates

Dependencies

- @angular/core
- @angular/common
- @angular/compiler
- @angular/forms
- @angular/router
- @angular/platform-browser
- @angular/platform-browser-dynamic
- @angular/material
- @angular/cdk
- rxjs

Development Dependencies

- @angular/cli
- @angular/compiler-cli
- typescript

---

# Dynamic Version Support

Instead of hardcoding versions, the Package Upgrade Service uses the Target Angular Version selected by the user.

Example

Target Version = 20

↓

package.json

Before

```json
"@angular/core": "^17.3.0"

After

"@angular/core": "^20.0.0"
Migration Workflow

Clone Repository

↓

Analyze Project

↓

Scan Project

↓

Generate Issues

↓

Generate Plan

↓

Execute Plan

↓

Upgrade package.json

↓

Return Package Upgrade Summary

API Response

Example

{
  "packageUpgrade": {
    "status": "SUCCESS",
    "targetVersion": "20",
    "upgradedPackages": [
      "@angular/*",
      "@angular/material",
      "@angular/cdk",
      "typescript",
      "rxjs"
    ]
  }
}
Files Added
backend/src/package-upgrade/
package-upgrade.service.ts
package-upgrade.module.ts


Files Updated
migration.service.ts

migration.module.ts

app.module.ts

MigrationResponse model

Dashboard UI
Frontend Changes

Added Package Upgrade section showing:

Upgrade Status
Target Angular Version
Updated Packages


Testing:

Verified

Reads package.json
Updates Angular packages
Updates Angular Material
Updates Angular CDK
Updates RxJS
Updates TypeScript
Saves updated package.json
Returns package upgrade summary
Displays upgrade summary in UI
Benefits
Performs actual migration changes.
Supports dynamic Angular versions.
Easy to extend for Angular 21+.
Provides upgrade summary.
Prepares the project for Angular CLI execution.
Future Improvements
Execute npm install
Execute ng update
Validate package compatibility
Automatic dependency conflict detection
Rollback on failure
Live upgrade logs


Day 11 Summary :

✅ Package Upgrade Engine implemented

✅ Dynamic Angular version support

✅ Automatic package.json update

✅ Package upgrade summary returned

✅ Frontend displays upgrade results