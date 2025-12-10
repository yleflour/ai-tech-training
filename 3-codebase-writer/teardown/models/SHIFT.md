# SHIFT

Work shift schedule table linking crew assignments to specific dates and time periods.

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| SHIFTID | INT | Auto-generated unique shift identifier | FALSE | |
| SHIFTDATE | DATE | Date of the shift | FALSE | |
| BEGINTIME | TIME | Shift start time | FALSE | |
| ENDTIME | TIME | Shift end time | FALSE | |
| CREWID | INT | Crew assigned to this shift | FALSE | [CREW.CREWID](./CREW.md) |

## Primary Key

- SHIFTID

## Indexes

- idx_shift: SHIFTID (unique)

## Relevant files
- [SHIFT](../../COBOL-AIRLINES/DB2/DCLGEN/SHIFT) - DB2 DCLGEN copybook
