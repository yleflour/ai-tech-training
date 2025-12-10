# AIRPLANE

Reference table containing aircraft information including type, capacity, and fuel specifications.

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| AIRPLANEID | CHAR(8) | Unique aircraft identifier | FALSE | |
| TYPE | VARCHAR(8) | Aircraft type/model designation | FALSE | |
| NUMSEATS | INT | Total number of passenger seats | FALSE | |
| TOTALFUEL | INT | Total fuel tank capacity | FALSE | |

## Primary Key

- AIRPLANEID

## Indexes

- idx_airplane: AIRPLANEID (unique)

## Relevant files
- [AIRPLANE](../../COBOL-AIRLINES/DB2/DCLGEN/AIRPLANE) - DB2 DCLGEN copybook
