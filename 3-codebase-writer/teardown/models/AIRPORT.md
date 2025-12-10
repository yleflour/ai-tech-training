# AIRPORT

Reference table containing airport information including location details for departure and arrival points of flights.

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| AIRPORTID | CHAR(4) | Unique airport identifier code | FALSE | |
| NAME | VARCHAR(100) | Full name of the airport | FALSE | |
| ADDRESS | VARCHAR(250) | Street address of the airport | FALSE | |
| CITY | VARCHAR(30) | City where the airport is located | FALSE | |
| COUNTRY | VARCHAR(30) | Country where the airport is located | TRUE | |
| ZIPCODE | VARCHAR(15) | Postal/ZIP code | FALSE | |

## Primary Key

- AIRPORTID

## Indexes

- idx_airport: AIRPORTID (unique)

## Relevant files
- [AIRPORT](../../COBOL-AIRLINES/DB2/DCLGEN/AIRPORT) - DB2 DCLGEN copybook
