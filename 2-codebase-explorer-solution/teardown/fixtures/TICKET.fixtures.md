# TICKET Fixtures

## Source
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2)

## Row Schema
```ts
interface Row {
  ticketid: string;  // 10-char unique ticket ID (e.g., "CB00000001")
  buyid: number;     // FK to BUY.BUYID - Associated purchase
  clientid: number;  // FK to PASSENGERS.CLIENTID - Passenger
  flightid: number;  // FK to FLIGHT.FLIGHTID - Flight
  seatnum: string;   // 3-char seat number (e.g., "B04")
}
```

## Seed Data
| ticketid   | buyid | clientid | flightid | seatnum |
|------------|-------|----------|----------|---------|
| CB00000001 | 3     | 6        | 4        | B04     |

Note: Ticket IDs follow the pattern CBxxxxxxxx. Tickets are created during the purchase flow through CICS transactions.

## Relevant files
- [TICKET](../../COBOL-AIRLINES/DB2/DCLGEN/TICKET) - DB2 DCLGEN copybook
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2) - Sample ticket data
- [PRINT-TICKET-COB](../../COBOL-AIRLINES/CICS/SALES-MAP/) - Ticket printing program
