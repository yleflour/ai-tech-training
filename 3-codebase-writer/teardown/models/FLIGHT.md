# FLIGHT

Core transaction table storing flight schedule information including routes, timing, and associated resources.

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| FLIGHTID | INT | Auto-generated unique flight identifier | FALSE | |
| FLIGHTDATE | DATE | Date of the flight | FALSE | |
| DEPTIME | TIME | Scheduled departure time | FALSE | |
| ARRTIME | TIME | Scheduled arrival time | FALSE | |
| TOTPASS | INT | Total number of passengers on flight | FALSE | |
| TOTBAGGA | INT | Total baggage count | FALSE | |
| FLIGHTNUM | CHAR(6) | Flight number code | FALSE | |
| SHIFTID | INT | Crew shift assignment | FALSE | [SHIFT.SHIFTID](./SHIFT.md) |
| AIRPLANEID | CHAR(8) | Aircraft assigned to the flight | FALSE | [AIRPLANE.AIRPLANEID](./AIRPLANE.md) |
| AIRPORTDEP | CHAR(4) | Departure airport | FALSE | [AIRPORT.AIRPORTID](./AIRPORT.md) |
| AIRPORTARR | CHAR(4) | Arrival airport | FALSE | [AIRPORT.AIRPORTID](./AIRPORT.md) |

## Primary Key

- FLIGHTID

## Indexes

- idx_flight: FLIGHTID (unique)

## Relevant files
- [FLIGHT](../../COBOL-AIRLINES/DB2/DCLGEN/FLIGHT) - DB2 DCLGEN copybook
- [FLIGHT-DUPLICATE](../../COBOL-AIRLINES/COB-PROG/FLIGHT-DUPLICATE/) - Flight management program
