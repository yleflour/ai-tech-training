# TicketController

Handles ticket search operations and boarding pass generation. Supports multiple search criteria and pagination for results.

## Search Tickets

- URL: `/api/tickets/search`
- Method: GET
- Description: Search for existing tickets by various criteria including ticket ID, client ID, passenger name, or flight details
- Content Type: application/json
- View: [search-ticket](../pages/search-ticket.md)

### Data model
```ts
declare namespace SearchTickets {
  export namespace Request {
    interface Params {
      ticketId?: string;        // Ticket ID
      clientId?: string;        // Client/Passenger ID
      firstName?: string;       // Passenger first name
      lastName?: string;        // Passenger last name
      flightId?: string;        // Flight ID
      flightDate?: string;      // Flight date (YYYY-MM-DD)
      page?: number;            // Page number for pagination
    }
  }

  export namespace Response {
    export interface Body {
      tickets: Array<{
        ticketId: string;
        firstName: string;
        lastName: string;
        flightId: string;
        depTime: string;
        landTime: string;
        flightDate: string;
        depAirport: string;
        landAirport: string;
        seatNumber: string;
      }>;
      pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
      };
      message?: string;
    }
  }
}
```

### Business Logic
```mermaid
sequenceDiagram
    participant Client
    participant TicketController
    participant TicketRepository
    participant PassengerRepository
    participant FlightRepository

    Client->>TicketController: GET /api/tickets/search?params
    TicketController->>TicketController: Validate search criteria

    alt Invalid combination
        TicketController-->>Client: 400 (Requires ticketId, clientId, or full name)
    end

    TicketController->>TicketController: Determine search strategy

    Note over TicketController: Search type based on params:<br/>1 = ticketId<br/>10 = clientId only<br/>11 = clientId + flightId<br/>12 = clientId + date<br/>100 = firstName + lastName<br/>101 = name + flightId<br/>102 = name + date

    TicketController->>TicketRepository: executeSearch(strategy, params)
    Note over TicketRepository: Joins TICKET + PASSENGERS + FLIGHT

    alt No results
        TicketController-->>Client: 200 (empty results)
    end

    TicketController-->>Client: 200 OK (tickets, pagination)
```

### Relevant models
- [TICKET](../models/TICKET.md)
- [PASSENGERS](../models/PASSENGERS.md)
- [FLIGHT](../models/FLIGHT.md)
- [AIRPORT](../models/AIRPORT.md)

---

## Print Boarding Pass

- URL: `/api/tickets/:ticketId/boarding-pass`
- Method: POST
- Description: Generate and print a boarding pass for a specific ticket
- Content Type: application/json
- View: [boarding-pass](../pages/boarding-pass.md)

### Data model
```ts
declare namespace PrintBoardingPass {
  export namespace Request {
    interface Params {
      ticketId: string;         // Ticket ID to print
    }
  }

  export namespace Response {
    export interface Body {
      success: boolean;
      jobId?: string;           // Print job ID
      boardingPass?: {
        passengerName: string;
        seatNumber: string;
        flightId: string;
        flightDate: string;
        departureTime: string;
        depAirportCode: string;
        arrAirportCode: string;
        depCityName: string;
        arrCityName: string;
      };
      message: string;
    }
  }
}
```

### Business Logic
```mermaid
sequenceDiagram
    participant Client
    participant TicketController
    participant TicketRepository
    participant AirportRepository
    participant PrintService

    Client->>TicketController: POST /api/tickets/:ticketId/boarding-pass
    TicketController->>TicketRepository: findById(ticketId)

    alt Ticket not found
        TicketController-->>Client: 404 (Ticket not found)
    end

    TicketController->>AirportRepository: findByCode(depAirportCode)
    TicketController->>AirportRepository: findByCode(arrAirportCode)

    TicketController->>TicketController: Format boarding pass data
    Note over TicketController: Format name: "FIRSTNAME LASTNAME"<br/>Format city: "CITY-CODE"<br/>Format date: DDMMMYYYY

    TicketController->>PrintService: submitPrintJob(boardingPassData)
    Note over PrintService: Submits JCL job to print queue

    alt Print failed
        PrintService-->>TicketController: Error
        TicketController-->>Client: 500 (Print error)
    end

    PrintService-->>TicketController: jobId
    TicketController-->>Client: 200 OK (success, jobId, boardingPass)
```

### Relevant models
- [TICKET](../models/TICKET.md)
- [PASSENGERS](../models/PASSENGERS.md)
- [FLIGHT](../models/FLIGHT.md)
- [AIRPORT](../models/AIRPORT.md)
