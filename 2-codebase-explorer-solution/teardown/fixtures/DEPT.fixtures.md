# DEPT Fixtures

## Source
- [insertion-1](../../COBOL-AIRLINES/DB2/insertion-1)
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2)

## Row Schema
```ts
interface Row {
  deptid: number;   // Unique department identifier
  name: string;     // Department name
  manager?: string; // Department manager (EMPID) - set via update after EMPLO insert
}
```

## Seed Data
| deptid | name             |
|--------|------------------|
| 1      | ceo              |
| 2      | commander        |
| 3      | copilote         |
| 4      | Flight Attendant |
| 5      | Human resources  |
| 6      | Suport IT        |
| 7      | Sales            |
| 8      | Legal            |
| 9      | Schedule         |

## Manager Assignments (Post-EMPLO Insert)
| deptid | manager    |
|--------|------------|
| 1      | 10000029   |
| 5      | 10000013   |
| 6      | 10000027   |
| 7      | 10000019   |
| 8      | 10000017   |
| 9      | 10000022   |

## Relevant files
- [DEPT](../../COBOL-AIRLINES/DB2/DCLGEN/DEPT) - DB2 DCLGEN copybook
- [insertion-1](../../COBOL-AIRLINES/DB2/insertion-1) - Initial department inserts
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2) - Manager updates
