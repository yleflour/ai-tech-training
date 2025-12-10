# AIRPORT Fixtures

## Source
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2)
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3)

## Row Schema
```ts
interface Row {
  airportid: string;  // 4-char airport code (IATA-like)
  name: string;       // Full airport name
  address: string;    // Street address
  city: string;       // City name
  country: string;    // Country name
  zipcode: string;    // Postal code
}
```

## Seed Data
| airportid | name                                            | city       | country       |
|-----------|-------------------------------------------------|------------|---------------|
| CDG       | Aeroport Paris-Charles de Gaulles               | Rossy      | France        |
| BOD       | Aeroport Bordeaux - Merignac                    | Merignac   | France        |
| FCO       | Aeroport Leonard-de-Vinci de Rome Fiumicino     | Fiumicino  | Italie        |
| LIS       | Airoport international de Lisbonne Humberto Delegado | Lisbonne | Portugal     |
| LHR       | Heathrow airport                                | Londres    | Royaume Unis  |
| AMS       | Aeroport d'Amsterdam-Schiphol                   | Amsterdam  | Hollande      |
| FRA       | Aeroport de Francfort-sur-le-Main               | Frankfurt  | Allemagne     |
| ISL       | Aeroport Ataturk d'Istanbul                     | Istanbul   | Turquie       |
| MAD       | Aeroport Adolfo Suarez Madrid-Barajas           | Madrid     | Espagne       |

## Relevant files
- [AIRPORT](../../COBOL-AIRLINES/DB2/DCLGEN/AIRPORT) - DB2 DCLGEN copybook
- [insertion-2](../../COBOL-AIRLINES/DB2/insertion-2) - Initial airport data
- [insertion-3](../../COBOL-AIRLINES/DB2/insertion-3) - Additional airports
