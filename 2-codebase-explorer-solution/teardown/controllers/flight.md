# FlightController

Provides flight search functionality with multiple filter criteria including flight number, date, departure airport, and arrival airport.

## Search Flights

- URL: `/api/flights/search`
- Method: GET
- Description: Search for available flights based on various criteria combinations
- Content Type: application/json
- View: [search-flight](../pages/search-flight.md)

### Data model
```ts
declare namespace SearchFlights {
  export namespace Request {
    interface Params {
      flightNum?: string;       // Flight number filter
      flightDate?: string;      // Date filter (YYYY-MM-DD)
      depAirport?: string;      // Departure airport code (3 chars)
      landAirport?: string;     // Arrival airport code (3 chars)
    }
  }

  export namespace Response {
    export interface Body {
      flights: Array<{
        flightId: string;
        depTime: string;
        landTime: string;
        depAirport: string;
        landAirport: string;
        availableSeats: number;
        flightDate: string;
      }>;
      totalResults: number;
      message?: string;
    }
  }
}
```

### Business Logic
```mermaid
sequenceDiagram
    participant Client
    participant FlightController
    participant FlightRepository
    participant AirportRepository

    Client->>FlightController: GET /api/flights/search?params
    FlightController->>FlightController: Validate parameters

    alt No criteria provided
        FlightController-->>Client: 400 (No search criteria provided)
    end

    alt Invalid date format
        FlightController-->>Client: 400 (Invalid date format)
    end

    FlightController->>FlightController: Determine search strategy

    Note over FlightController: Search type based on params:<br/>1 = flightNum only<br/>10 = date only<br/>11 = flightNum + date<br/>100 = depAirport + date<br/>1000 = landAirport + date<br/>1100 = both airports + date

    FlightController->>FlightRepository: executeSearch(strategy, params)
    FlightRepository-->>FlightController: Flight results (max 10)

    alt No results found
        FlightController-->>Client: 200 (empty results)
    end

    FlightController-->>Client: 200 OK (flights array)
```

### Relevant models
- [FLIGHT](../models/FLIGHT.md)
- [AIRPORT](../models/AIRPORT.md)
