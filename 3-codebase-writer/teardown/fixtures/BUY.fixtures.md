# BUY Fixtures

## Source
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2)

## Row Schema
```ts
interface Row {
  buyid: number;     // Auto-generated unique purchase ID
  buydate: Date;     // Date of purchase
  buytime: Time;     // Time of purchase
  price: number;     // Total transaction price (decimal 7,2)
  empid: string;     // FK to EMPLO.EMPID - Sales employee
  clientid: number;  // FK to PASSENGERS.CLIENTID - Customer
}
```

## Seed Data
| buyid | buydate    | buytime | price  | empid    | clientid |
|-------|------------|---------|--------|----------|----------|
| 3     | 08/09/2022 | 10:03   | 100.00 | 10000006 | 6        |

Note: Purchase records are typically created at runtime through the SALES-MAP CICS transaction when customers buy tickets.

## Relevant files
- [BUY](../../COBOL-AIRLINES/DB2/DCLGEN/BUY) - DB2 DCLGEN copybook
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2) - Sample purchase data
- [SELL1-COB](../../COBOL-AIRLINES/CICS/SALES-MAP/) - Sales transaction program
