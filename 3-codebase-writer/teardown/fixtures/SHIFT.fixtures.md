# SHIFT Fixtures

## Source
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2)
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3)

## Row Schema
```ts
interface Row {
  shiftid: number;   // Auto-generated unique shift ID
  shiftdate: Date;   // Date of the shift
  begintime: Time;   // Shift start time
  endtime: Time;     // Shift end time
  crewid: number;    // FK to CREW.CREWID
}
```

## Seed Data
| shiftid | shiftdate  | begintime | endtime | crewid |
|---------|------------|-----------|---------|--------|
| 9       | 09/01/2022 | 10:00     | 15:00   | 6      |
| 21      | 09/01/2022 | 10:00     | 15:00   | 21     |
| 22      | 09/01/2022 | 10:00     | 15:00   | 22     |
| 23      | 09/01/2022 | 10:00     | 15:00   | 23     |

Note: Each shift represents a work period for a specific crew on a given date.

## Relevant files
- [SHIFT](../../COBOL-AIRLINES/DB2/DCLGEN/SHIFT) - DB2 DCLGEN copybook
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2) - Initial shift data
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3) - Additional shifts
