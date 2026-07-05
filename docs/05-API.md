# REST API Documentation

## Base URL

```
http://localhost:3000
```

---

# Migration API

## Start Migration

### Endpoint

```
POST /migration/start
```

---

### Request

```json
{
    "repositoryUrl":"https://github.com/example/project.git",
    "fromVersion":17,
    "toVersion":20,
    "outputFolder":"C:/MigrationOutput"
}
```

---

### Response

```json
{
    "jobId":"uuid",
    "status":"SUCCESS",
    "message":"Migration completed successfully.",
    "projectInfo":{},
    "scan":{},
    "plan":{},
    "execution":{},
    "packageUpgrade":{}
}
```

---

# Response Sections

## Project Information

Contains

- Angular Version
- TypeScript Version
- RxJS Version
- Package Manager

---

## Scan

Contains

- Statistics
- Components
- Modules
- Services
- Pipes
- Directives
- Routing
- Dependency Graph
- Issues

---

## Migration Plan

Contains

- Total Steps
- Estimated Time
- Migration Steps

---

## Execution

Contains

- Started Time
- Finished Time
- Execution Duration
- Step Status

---

## Package Upgrade

Contains

- Updated Packages
- Target Angular Version
- Upgrade Status

---

# HTTP Status Codes

| Code | Meaning |
|-------|----------|
|200|Migration Successful|
|400|Invalid Request|
|404|Repository Not Found|
|500|Internal Server Error|

---

# Future APIs

POST /migration/execute

POST /migration/rollback

GET /migration/status/{jobId}

GET /migration/report/{jobId}

GET /migration/history

POST /migration/download-report
