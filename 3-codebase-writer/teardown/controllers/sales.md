# SalesController

Manages the ticket sales workflow including client/flight search, price calculation, passenger selection, and purchase confirmation.

## Search Client and Flight

- URL: `/api/sales/search`
- Method: POST
- Description: Search for a client and flight, calculate pricing for the booking
- Content Type: application/json
- View: [sell1](../pages/sell1.md)

### Data model
```ts
declare namespace SearchClientFlight {
  export namespace Request {
    interface Body {
      clientId: string;       // Client/Passenger ID (6 digits)
      flightNum: string;      // Flight number
      flightDate: string;     // Flight date (YYYY-MM-DD)
      passNumber: number;     // Number of passengers (1-9)
    }
  }

  export namespace Response {
    export interface Body {
      client: {
        id: string;
        name: string;
      };
      flight: {
        flightNum: string;
        flightDate: string;
        depTime: string;
        landTime: string;
        depAirport: string;
        landAirport: string;
      };
      pricing: {
        pricePerTicket: number;
        totalPrice: number;
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
    participant SalesController
    participant PassengerRepository
    participant FlightRepository
    participant PricingService

    Client->>SalesController: POST /api/sales/search
    SalesController->>SalesController: Validate input

    SalesController->>PassengerRepository: findById(clientId)
    alt Client not found
        SalesController-->>Client: 404 (Passenger does not exist)
    end

    SalesController->>FlightRepository: findByNumAndDate(flightNum, flightDate)
    alt Flight not found
        SalesController-->>Client: 404 (Flight does not exist)
    end

    SalesController->>PricingService: calculatePrice(flight, passNumber)
    Note over PricingService: Currently hardcoded at 120.99 per ticket

    SalesController-->>Client: 200 OK (client, flight, pricing)
```

### Relevant models
- [PASSENGERS](../models/PASSENGERS.md)
- [FLIGHT](../models/FLIGHT.md)

---

## Confirm Passengers

- URL: `/api/sales/confirm`
- Method: POST
- Description: Validate passengers, create tickets and purchase record
- Content Type: application/json
- View: [sell2](../pages/sell2.md)

### Data model
```ts
declare namespace ConfirmPassengers {
  export namespace Request {
    interface Body {
      clientId: string;           // Primary client ID
      flightNum: string;          // Selected flight number
      flightDate: string;         // Flight date
      passNumber: number;         // Total number of passengers
      passengers: Array<{
        clientId: string;         // Additional passenger ID
      }>;
      paymentMethod: 'CB' | 'CS' | 'CH';  // Card, Cash, Check
    }
  }

  export namespace Response {
    export interface Body {
      success: boolean;
      buyId: string;              // Transaction ID
      tickets: Array<{
        ticketId: string;
        passengerName: string;
        seatNumber: string;
      }>;
      totalAmount: number;
      receiptUrl: string;
    }
  }
}
```

### Business Logic
```mermaid
sequenceDiagram
    participant Client
    participant SalesController
    participant PassengerRepository
    participant TicketService
    participant BuyRepository
    participant ReceiptService

    Client->>SalesController: POST /api/sales/confirm
    SalesController->>SalesController: Validate booking data

    loop For each passenger
        SalesController->>PassengerRepository: findById(passengerId)
        alt Passenger not found
            SalesController-->>Client: 404 (Passenger X does not exist)
        end
    end

    SalesController->>TicketService: createTickets(flight, passengers)
    Note over TicketService: Assigns seat numbers<br/>Creates TICKET records

    SalesController->>BuyRepository: createTransaction(totalAmount, paymentMethod)
    Note over BuyRepository: Creates BUY record<br/>Links tickets to transaction

    SalesController->>ReceiptService: generateReceipt(buyRecord)

    SalesController-->>Client: 200 OK (buyId, tickets, receiptUrl)
```

### Relevant models
- [PASSENGERS](../models/PASSENGERS.md)
- [FLIGHT](../models/FLIGHT.md)
- [TICKET](../models/TICKET.md)
- [BUY](../models/BUY.md)
