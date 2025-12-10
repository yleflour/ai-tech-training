# Database Models

This document provides an overview of all database tables in the COBOL-AIRLINES system.

## Entity Relationship Diagram

```mermaid
erDiagram
    AIRPORT {
        CHAR4 AIRPORTID PK
        VARCHAR100 NAME
        VARCHAR250 ADDRESS
        VARCHAR30 CITY
        VARCHAR30 COUNTRY
        VARCHAR15 ZIPCODE
    }

    AIRPLANE {
        CHAR8 AIRPLANEID PK
        VARCHAR8 TYPE
        INT NUMSEATS
        INT TOTALFUEL
    }

    DEPT {
        INT DEPTID PK
        VARCHAR20 NAME
        CHAR8 MANAGER FK
    }

    EMPLO {
        CHAR8 EMPID PK
        VARCHAR30 FIRSTNAME
        VARCHAR30 LASTNAME
        VARCHAR100 ADDRE
        VARCHAR50 CITY
        VARCHAR15 ZIPCODE
        VARCHAR10 TELEPHONE
        VARCHAR100 EMAIL
        DATE ADMIDATE
        DEC82 SALARY
        INT DEPTID FK
    }

    PASSENGERS {
        INT CLIENTID PK
        VARCHAR30 FIRSTNAME
        VARCHAR30 LASTNAME
        VARCHAR250 ADDRESS
        VARCHAR50 CITY
        VARCHAR30 COUNTRY
        VARCHAR15 ZIPCODE
        VARCHAR18 TELEPHONE
        VARCHAR100 EMAIL
    }

    CREW {
        INT CREWID PK
        CHAR8 COMMANDER FK
        CHAR8 COPILOTE FK
        CHAR8 FACHIEF FK
        CHAR8 FLIATTENDANT1 FK
        CHAR8 FLIATTENDANT2 FK
        CHAR8 FLIATTENDANT3 FK
    }

    SHIFT {
        INT SHIFTID PK
        DATE SHIFTDATE
        TIME BEGINTIME
        TIME ENDTIME
        INT CREWID FK
    }

    FLIGHT {
        INT FLIGHTID PK
        DATE FLIGHTDATE
        TIME DEPTIME
        TIME ARRTIME
        INT TOTPASS
        INT TOTBAGGA
        CHAR6 FLIGHTNUM
        INT SHIFTID FK
        CHAR8 AIRPLANEID FK
        CHAR4 AIRPORTDEP FK
        CHAR4 AIRPORTARR FK
    }

    BUY {
        INT BUYID PK
        DATE BUYDATE
        TIME BUYTIME
        DEC72 PRICE
        CHAR8 EMPID FK
        INT CLIENTID FK
    }

    TICKET {
        CHAR10 TICKETID PK
        INT BUYID FK
        INT CLIENTID FK
        INT FLIGHTID FK
        CHAR3 SEATNUM
    }

    %% Relationships
    DEPT ||--o| EMPLO : "manager"
    EMPLO }o--|| DEPT : "belongs to"

    CREW ||--|| EMPLO : "commander"
    CREW ||--|| EMPLO : "copilote"
    CREW ||--|| EMPLO : "fachief"
    CREW ||--|| EMPLO : "fliattendant1"
    CREW ||--|| EMPLO : "fliattendant2"
    CREW ||--|| EMPLO : "fliattendant3"

    SHIFT }o--|| CREW : "assigned to"

    FLIGHT }o--|| SHIFT : "uses"
    FLIGHT }o--|| AIRPLANE : "uses"
    FLIGHT }o--|| AIRPORT : "departs from"
    FLIGHT }o--|| AIRPORT : "arrives at"

    BUY }o--|| EMPLO : "processed by"
    BUY }o--|| PASSENGERS : "purchased by"

    TICKET }o--|| BUY : "part of"
    TICKET }o--|| PASSENGERS : "belongs to"
    TICKET }o--|| FLIGHT : "for"
```

## Tables

| Table | Description |
|-------|-------------|
| [AIRPORT](./AIRPORT.md) | Reference table containing airport information including location details |
| [AIRPLANE](./AIRPLANE.md) | Reference table containing aircraft information including type, capacity, and fuel |
| [DEPT](./DEPT.md) | Department reference table defining organizational units and their managers |
| [EMPLO](./EMPLO.md) | Employee master table containing staff personal information and employment data |
| [PASSENGERS](./PASSENGERS.md) | Customer master table containing passenger personal and contact information |
| [CREW](./CREW.md) | Flight crew composition table defining staff assignments for each crew unit |
| [SHIFT](./SHIFT.md) | Work shift schedule table linking crew assignments to specific dates and times |
| [FLIGHT](./FLIGHT.md) | Core transaction table storing flight schedule information including routes and timing |
| [BUY](./BUY.md) | Purchase transaction table recording ticket sales |
| [TICKET](./TICKET.md) | Transaction table linking passengers to specific flights and purchases |

## Table Categories

### Reference Tables
- **AIRPORT** - Airport locations
- **AIRPLANE** - Aircraft fleet
- **DEPT** - Organizational departments

### Master Tables
- **EMPLO** - Employee records
- **PASSENGERS** - Customer records

### Operational Tables
- **CREW** - Crew compositions
- **SHIFT** - Work schedules
- **FLIGHT** - Flight schedules

### Transaction Tables
- **BUY** - Purchase transactions
- **TICKET** - Individual tickets
