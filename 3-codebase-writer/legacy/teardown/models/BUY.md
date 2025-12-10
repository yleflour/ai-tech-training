# BUY

Purchase transaction table recording ticket sales including date, time, price, and parties involved.

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| BUYID | INT | Auto-generated unique purchase identifier | FALSE | |
| BUYDATE | DATE | Date of purchase | FALSE | |
| BUYTIME | TIME | Time of purchase | FALSE | |
| PRICE | DEC(7,2) | Total transaction price | FALSE | |
| EMPID | CHAR(8) | Sales employee who processed the transaction | FALSE | [EMPLO.EMPID](./EMPLO.md) |
| CLIENTID | INT | Customer making the purchase | FALSE | [PASSENGERS.CLIENTID](./PASSENGERS.md) |

## Primary Key

- BUYID

## Indexes

- idx_buy: BUYID (unique)

## Relevant files
- [BUY](../../COBOL-AIRLINES/DB2/DCLGEN/BUY) - DB2 DCLGEN copybook
