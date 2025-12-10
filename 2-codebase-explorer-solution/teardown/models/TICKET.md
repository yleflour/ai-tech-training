# TICKET

Transaction table linking passengers to specific flights and purchases, including seat assignments.

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| TICKETID | CHAR(10) | Unique ticket identifier | FALSE | |
| BUYID | INT | Associated purchase transaction | FALSE | [BUY.BUYID](./BUY.md) |
| CLIENTID | INT | Passenger who owns the ticket | FALSE | [PASSENGERS.CLIENTID](./PASSENGERS.md) |
| FLIGHTID | INT | Flight the ticket is for | FALSE | [FLIGHT.FLIGHTID](./FLIGHT.md) |
| SEATNUM | CHAR(3) | Assigned seat number | FALSE | |

## Primary Key

- TICKETID

## Indexes

- idx_ticket: TICKETID (unique)

## Relevant files
- [TICKET](../../COBOL-AIRLINES/DB2/DCLGEN/TICKET) - DB2 DCLGEN copybook
