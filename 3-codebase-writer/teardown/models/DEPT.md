# DEPT

Department reference table defining organizational units and their managers.

## Fields

| Field Name | Field Type | Field Description | Nullable | FK |
|------------|------------|-------------------|----------|------|
| DEPTID | INT | Unique department identifier | FALSE | |
| NAME | VARCHAR(20) | Department name | FALSE | |
| MANAGER | CHAR(8) | Department manager | TRUE | [EMPLO.EMPID](./EMPLO.md) |

## Primary Key

- DEPTID

## Indexes

- idx_dept: DEPTID (unique)

## Relevant files
- [DEPT](../../COBOL-AIRLINES/DB2/DCLGEN/DEPT) - DB2 DCLGEN copybook
