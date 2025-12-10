# CREW Fixtures

## Source
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2)
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3)

## Row Schema
```ts
interface Row {
  crewid: number;        // Auto-generated unique crew ID
  commander: string;     // FK to EMPLO.EMPID - Pilot in command
  copilote: string;      // FK to EMPLO.EMPID - Co-pilot/First officer
  fachief: string;       // FK to EMPLO.EMPID - Flight attendant chief
  fliattendant1: string; // FK to EMPLO.EMPID - Flight attendant 1
  fliattendant2: string; // FK to EMPLO.EMPID - Flight attendant 2
  fliattendant3: string; // FK to EMPLO.EMPID - Flight attendant 3
}
```

## Seed Data
| crewid | commander | copilote   | fachief  | fliattendant1 | fliattendant2 | fliattendant3 |
|--------|-----------|------------|----------|---------------|---------------|---------------|
| 6      | 10000003  | 10000004   | 10000005 | 10000007      | 10000008      | 10000009      |
| 21     | 10000014  | 100000012  | 10000010 | 10000011      | 10000024      | 10000025      |
| 22     | 10000018  | 10000020   | 10000026 | 10000031      | 100000032     | 10000033      |
| 23     | 10000034  | 10000035   | 10000036 | 10000037      | 10000038      | 10000039      |

Note: Each crew consists of 6 employees - 1 commander (pilot), 1 co-pilot, 1 flight attendant chief, and 3 flight attendants.

## Relevant files
- [CREW](../../COBOL-AIRLINES/DB2/DCLGEN/CREW) - DB2 DCLGEN copybook
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2) - Initial crew data
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3) - Additional crews
