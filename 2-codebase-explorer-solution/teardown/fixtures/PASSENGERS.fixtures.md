# PASSENGERS Fixtures

## Source
- [Passagers-file](../../COBOL-AIRLINES/AS-400/Insert/Passagers-file)
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2)

## Row Schema
```ts
interface Row {
  clientid: number;     // Auto-generated unique passenger ID
  firstname: string;    // First name
  lastname: string;     // Last name
  address: string;      // Street address
  city: string;         // City of residence
  country?: string;     // Country (nullable)
  zipcode: string;      // Postal code
  telephone: string;    // Phone number
  email: string;        // Email address
}
```

## Data Sources

### CSV File (Passagers-file)
Contains ~100+ passenger records in CSV format:
```
passagerid,firstname,lastname,addre,city,country,zipcode,telephone,email
1,Carmita,Dallender,2 Glacier Hill Drive,Sambava,Madagascar,55910-167,9636523490,cdallender0@4shared.com
2,Julianne,Sissot,58322 Fairfield Drive,Swift Current,Canada,45167-040,5931887564,jsissot1@deviantart.com
...
```

### SQL Insert (insertion-2)
```sql
insert into passengers (firstname, lastname, address, city, country, zipcode, telephone, email)
values ('Maxime', 'Duprat', '23 rue de New York', 'Rocherchouart', 'France', '87600', '0666666666', 'maxime_duprat@gmail.com');
```

## Relevant files
- [PASSENG](../../COBOL-AIRLINES/DB2/DCLGEN/PASSENG) - DB2 DCLGEN copybook
- [PASSENGER-INSERT](../../COBOL-AIRLINES/COB-PROG/PASSENGER-INSERT/) - Passenger data loading program
- [Passagers-file](../../COBOL-AIRLINES/AS-400/Insert/Passagers-file) - CSV passenger data
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2) - Additional passenger insert
