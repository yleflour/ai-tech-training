# EMPLO

Employee master table containing staff personal information, contact details, and employment data.

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| EMPID | CHAR(8) | Unique employee identifier | FALSE | |
| FIRSTNAME | VARCHAR(30) | Employee's first name | FALSE | |
| LASTNAME | VARCHAR(30) | Employee's last name | FALSE | |
| ADDRE | VARCHAR(100) | Street address | FALSE | |
| CITY | VARCHAR(50) | City of residence | FALSE | |
| ZIPCODE | VARCHAR(15) | Postal/ZIP code | FALSE | |
| TELEPHONE | VARCHAR(10) | Contact phone number | FALSE | |
| EMAIL | VARCHAR(100) | Email address | FALSE | |
| ADMIDATE | DATE | Date of hire/admission | FALSE | |
| SALARY | DEC(8,2) | Employee salary | FALSE | |
| DEPTID | INT | Department assignment | FALSE | [DEPT.DEPTID](./DEPT.md) |

## Primary Key

- EMPID

## Indexes

- idx_emp: EMPID (unique)

## Relevant files
- [EMPLO](../../COBOL-AIRLINES/DB2/DCLGEN/EMPLO) - DB2 DCLGEN copybook
- [EMPLO-INSERT](../../COBOL-AIRLINES/COB-PROG/EMPLO-INSERT/) - Employee data loading program
