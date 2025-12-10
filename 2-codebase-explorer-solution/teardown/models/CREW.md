# CREW

Flight crew composition table defining the staff assignments for each crew unit.

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| CREWID | INT | Auto-generated unique crew identifier | FALSE | |
| COMMANDER | CHAR(8) | Pilot in command | FALSE | [EMPLO.EMPID](./EMPLO.md) |
| COPILOTE | CHAR(8) | Co-pilot/First officer | FALSE | [EMPLO.EMPID](./EMPLO.md) |
| FACHIEF | CHAR(8) | Flight attendant chief/Purser | FALSE | [EMPLO.EMPID](./EMPLO.md) |
| FLIATTENDANT1 | CHAR(8) | Flight attendant 1 | FALSE | [EMPLO.EMPID](./EMPLO.md) |
| FLIATTENDANT2 | CHAR(8) | Flight attendant 2 | FALSE | [EMPLO.EMPID](./EMPLO.md) |
| FLIATTENDANT3 | CHAR(8) | Flight attendant 3 | FALSE | [EMPLO.EMPID](./EMPLO.md) |

## Primary Key

- CREWID

## Indexes

- idx_crew: CREWID (unique)

## Relevant files
- [CREW](../../COBOL-AIRLINES/DB2/DCLGEN/CREW) - DB2 DCLGEN copybook
