# EMPLO Fixtures

## Source
- [Emplo-file](../../COBOL-AIRLINES/AS-400/Insert/Emplo-file)
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3)

## Row Schema
```ts
interface Row {
  empid: string;      // 8-char unique employee ID (e.g., "10000001")
  firstname: string;  // First name
  lastname: string;   // Last name
  addre: string;      // Street address
  city: string;       // City
  zipcode: string;    // Postal code
  telephone: string;  // Phone number
  email: string;      // Email address
  admidate: Date;     // Date of hire
  salary: number;     // Salary (decimal 8,2)
  deptid: number;     // FK to DEPT.DEPTID
}
```

## Data Sources

### CSV File (Emplo-file)
Contains 30 employee records in CSV format:
```
empid,passw,firstname,lastname,addre,city,zipcode,telephone,email,admindate,salary,deptid
1,zMKdQYb,Mirelle,Thurstance,9270 Esch Parkway,Khonj,87100,3106069183,mthurstance0@psu.edu,2022/01/15,9691.38,5
2,0Is2FnAbwi,Torey,Fache,887 Dahle Pass,Malanville,94300,7933458250,tfache1@csmonitor.com,2006/07/04,8629.2,6
...
```

Note: The `passw` field is encrypted via CRYPTPGM subprogram during import.

### SQL Inserts (insertion-3)
Additional employees (IDs 10000031-10000039) for various departments.

## Department Distribution
| deptid | Department       | Count |
|--------|------------------|-------|
| 1      | CEO              | 1     |
| 2      | Commander        | 3     |
| 3      | Copilote         | 3     |
| 4      | Flight Attendant | 18    |
| 5      | Human Resources  | 2     |
| 6      | Support IT       | 3     |
| 7      | Sales            | 4     |
| 8      | Legal            | 1     |
| 9      | Schedule         | 3     |

## Relevant files
- [EMPLO](../../COBOL-AIRLINES/DB2/DCLGEN/EMPLO) - DB2 DCLGEN copybook
- [EMPLO-INSERT](../../COBOL-AIRLINES/COB-PROG/EMPLO-INSERT/) - Employee data loading program
- [Emplo-file](../../COBOL-AIRLINES/AS-400/Insert/Emplo-file) - CSV employee data
- [INSERTCSV](../../COBOL-AIRLINES/AS-400/Insert/INSERTCSV) - CSV import COBOL program
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3) - Additional employee inserts
