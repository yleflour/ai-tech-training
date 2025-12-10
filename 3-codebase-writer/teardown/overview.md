# COBOL-AIRLINES Project Architecture Overview

This is an **airline reservation system** built on legacy IBM enterprise technologies.

## Directory Structure

```
COBOL-AIRLINES/
├── AS-400/          # AS/400 platform components
│   ├── DDS-DB/      # Database definitions
│   ├── DSPF/        # Display format files
│   └── Insert/      # Data insertion utilities
├── CICS/            # Transaction processing (interactive)
│   ├── LOGIN/       # User authentication
│   └── SALES-MAP/   # Sales transactions
├── COB-PROG/        # Core batch COBOL programs
│   ├── EMPLO-INSERT/      # Employee data loading
│   ├── FLIGHT-DUPLICATE/  # Flight management
│   └── PASSENGER-INSERT/  # Passenger data loading
└── DB2/             # Database schema
    └── DCLGEN/      # DB2 copybooks
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Language | COBOL |
| Middleware | CICS (transaction processing) |
| Database | IBM DB2 (11 tables) |
| Platform | AS/400 |
| Data Import | JSON (employees), XML (passengers) |

## Key Components

### 1. CICS Interactive Programs

Handle user-facing transactions:

- `LOGIN-COB` - Authentication with password encryption
- `SELL1-COB` / `SRCHFLY-COB` - Flight search & booking
- `RECEIPT-COB` / `PRINT-TICKET-COB` - Receipt & ticket generation

### 2. Batch Programs

Data loading:

- `EMPLO-MAIN-INSERT` - Loads employees from JSON
- `PASSENGER-INSERT-MAINPROG` - Loads passengers from XML files

### 3. Database

11 interrelated tables:

- Core: `EMPLO`, `PASSENGERS`, `FLIGHT`, `TICKET`, `BUY`
- Reference: `AIRPORT`, `AIRPLANE`, `DEPT`, `CREW`, `SHIFT`

## Application Flow

```
User Login → Department Routing → Sales Map → Flight Search → Ticket Purchase → Receipt
```

The system uses CICS's **pseudo-conversational model** with `DFHCOMMAREA` for state management between screens, and shared **DCLGEN copybooks** for consistent DB2 table definitions across programs.
