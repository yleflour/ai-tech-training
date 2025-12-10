# AuthController

Handles user authentication and session management for the COBOL Airlines system. Validates employee credentials and routes users to their department-specific interfaces.

## Login

- URL: `/api/auth/login`
- Method: POST
- Description: Authenticate user credentials against employee database and route to appropriate department
- Content Type: application/json
- View: [login](../pages/login.md)

### Data model
```ts
declare namespace Login {
  export namespace Request {
    interface Body {
      userid: string;     // Employee ID (8 chars, alphanumeric)
      password: string;   // Password (8 chars, will be encrypted)
    }
  }

  export namespace Response {
    export interface Body {
      success: boolean;
      departmentId: number;
      redirectPath: string;
      message?: string;
    }
  }
}
```

### Business Logic
```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant EmployeeRepository
    participant CryptoService
    participant SessionService

    Client->>AuthController: POST /api/auth/login
    AuthController->>AuthController: Validate input format
    alt Invalid format
        AuthController-->>Client: 400 Bad Request
    end

    AuthController->>EmployeeRepository: findByUserId(userid)
    alt User not found
        AuthController-->>Client: 401 Unauthorized (Invalid credentials)
    end

    AuthController->>CryptoService: encryptPassword(password)
    AuthController->>AuthController: Compare encrypted passwords
    alt Password mismatch
        AuthController-->>Client: 401 Unauthorized (Invalid credentials)
    end

    AuthController->>SessionService: createSession(employee)
    AuthController->>AuthController: Determine redirect by departmentId
    Note over AuthController: DEPTID 7 → Sales (/sales)<br/>Others → Unavailable
    AuthController-->>Client: 200 OK (redirectPath, departmentId)
```

### Relevant models
- [EMPLO](../models/EMPLO.md)
- [DEPT](../models/DEPT.md)
