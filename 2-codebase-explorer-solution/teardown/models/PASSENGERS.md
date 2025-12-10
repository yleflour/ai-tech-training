# PASSENGERS

Customer master table containing passenger personal and contact information.

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| CLIENTID | INT | Auto-generated unique passenger identifier | FALSE | |
| FIRSTNAME | VARCHAR(30) | Passenger's first name | FALSE | |
| LASTNAME | VARCHAR(30) | Passenger's last name | FALSE | |
| ADDRESS | VARCHAR(250) | Street address | FALSE | |
| CITY | VARCHAR(50) | City of residence | FALSE | |
| COUNTRY | VARCHAR(30) | Country of residence | TRUE | |
| ZIPCODE | VARCHAR(15) | Postal/ZIP code | FALSE | |
| TELEPHONE | VARCHAR(18) | Contact phone number | FALSE | |
| EMAIL | VARCHAR(100) | Email address | FALSE | |

## Primary Key

- CLIENTID

## Indexes

- idx_pass: CLIENTID (unique)

## Relevant files
- [PASSENG](../../COBOL-AIRLINES/DB2/DCLGEN/PASSENG) - DB2 DCLGEN copybook
- [PASSENGER-INSERT](../../COBOL-AIRLINES/COB-PROG/PASSENGER-INSERT/) - Passenger data loading program
