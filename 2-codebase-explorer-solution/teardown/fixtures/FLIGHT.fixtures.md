# FLIGHT Fixtures

## Source
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2)
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3)

## Row Schema
```ts
interface Row {
  flightid: number;    // Auto-generated unique flight ID
  flightdate: Date;    // Date of the flight
  deptime: Time;       // Scheduled departure time
  arrtime: Time;       // Scheduled arrival time
  totpass: number;     // Total passengers on flight
  totbagga: number;    // Total baggage count
  flightnum: string;   // 6-char flight number code (e.g., "CB2204")
  shiftid: number;     // FK to SHIFT.SHIFTID
  airplaneid: string;  // FK to AIRPLANE.AIRPLANEID
  airportdep: string;  // FK to AIRPORT.AIRPORTID - Departure airport
  airportarr: string;  // FK to AIRPORT.AIRPORTID - Arrival airport
}
```

## Seed Data
| flightid | flightdate | deptime  | arrtime  | flightnum | shiftid | airplaneid | airportdep | airportarr |
|----------|------------|----------|----------|-----------|---------|------------|------------|------------|
| 4        | 01/09/2022 | 10:00:00 | 15:00:00 | CB2204    | 9       | AIRBUS01   | CDG        | FCO        |
| 5        | 09/01/2022 | 17:00:00 | 20:00:00 | CB2205    | 9       | AIRBUS01   | FCO        | CDG        |
| 6        | 09/01/2022 | 10:00:00 | 15:00:00 | CB1104    | 21      | AIRBUS02   | CDG        | LIS        |
| 7        | 09/01/2022 | 17:00:00 | 20:00:00 | CB1105    | 21      | AIRBUS02   | LIS        | CDG        |
| 8        | 09/01/2022 | 10:00:00 | 15:00:00 | CB3304    | 22      | BOEING01   | CDG        | AMS        |
| 9        | 09/01/2022 | 17:00:00 | 20:00:00 | CB3305    | 22      | BOEING01   | AMS        | CDG        |
| 10       | 09/01/2022 | 10:00:00 | 15:00:00 | CB4404    | 23      | BOEING02   | CDG        | LHR        |
| 11       | 09/01/2022 | 17:00:00 | 20:00:00 | CB4405    | 23      | BOEING02   | LHR        | CDG        |

Note: Flight numbers follow pattern CBxxxx. Most flights are round-trips from/to CDG (Paris).

## Relevant files
- [FLIGHT](../../COBOL-AIRLINES/DB2/DCLGEN/FLIGHT) - DB2 DCLGEN copybook
- [FLIGHT-DUPLICATE](../../COBOL-AIRLINES/COB-PROG/FLIGHT-DUPLICATE/) - Flight management program
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2) - Initial flight data
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3) - Additional flights
