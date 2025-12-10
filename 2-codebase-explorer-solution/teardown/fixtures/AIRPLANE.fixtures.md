# AIRPLANE Fixtures

## Source
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2)
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3)

## Row Schema
```ts
interface Row {
  airplaneid: string; // 8-char unique aircraft identifier
  type: string;       // Aircraft type/model (e.g., "737-200", "A320")
  numseats: number;   // Total passenger seats
  totalfuel: number;  // Fuel tank capacity
}
```

## Seed Data
| airplaneid | type    | numseats | totalfuel |
|------------|---------|----------|-----------|
| BOEING01   | 737-200 | 130      | 26        |
| AIRBUS01   | A320    | 150      | 28        |
| AIRBUS02   | A340    | 230      | 35        |
| BOEING02   | 737-300 | 200      | 30        |
| BOEING03   | 737-200 | 130      | 26        |
| BOEING04   | 737-600 | 300      | 40        |
| AIRBUS03   | A340    | 230      | 35        |
| AIRBUS04   | A321    | 180      | 28        |
| AIRBUS05   | A321    | 180      | 28        |
| AIRBUS06   | A330    | 260      | 35        |

## Relevant files
- [AIRPLANE](../../COBOL-AIRLINES/DB2/DCLGEN/AIRPLANE) - DB2 DCLGEN copybook
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2) - Initial airplane data
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3) - Additional airplanes
