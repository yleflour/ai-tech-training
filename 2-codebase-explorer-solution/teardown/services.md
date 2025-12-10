# Services Overview

This document provides an overview of all business logic services in the COBOL Airlines system. Services encapsulate reusable business logic that is shared across multiple controllers.

## Service Architecture

```mermaid
flowchart TB
    subgraph Controllers
        Auth[AuthController]
        Sales[SalesController]
        Flight[FlightController]
        Ticket[TicketController]
        Receipt[ReceiptController]
    end

    subgraph Services
        CryptoSvc[CryptoService]
        SessionSvc[SessionService]
        PricingSvc[PricingService]
        TicketSvc[TicketService]
        ReceiptSvc[ReceiptService]
        PrintSvc[PrintService]
    end

    subgraph Repositories
        EmploRepo[(EMPLO)]
        PassRepo[(PASSENGERS)]
        FlightRepo[(FLIGHT)]
        TicketRepo[(TICKET)]
        BuyRepo[(BUY)]
        AirportRepo[(AIRPORT)]
    end

    Auth --> CryptoSvc
    Auth --> SessionSvc
    Auth --> EmploRepo

    Sales --> PricingSvc
    Sales --> TicketSvc
    Sales --> ReceiptSvc
    Sales --> PassRepo
    Sales --> FlightRepo
    Sales --> BuyRepo

    Flight --> FlightRepo
    Flight --> AirportRepo

    Ticket --> TicketSvc
    Ticket --> PrintSvc
    Ticket --> TicketRepo
    Ticket --> PassRepo
    Ticket --> AirportRepo

    Receipt --> ReceiptSvc
    Receipt --> PrintSvc
    Receipt --> BuyRepo

    TicketSvc --> TicketRepo
    TicketSvc --> PassRepo
    TicketSvc --> FlightRepo

    ReceiptSvc --> BuyRepo
    ReceiptSvc --> PrintSvc
```

## Service Dependency Diagram

```mermaid
flowchart LR
    subgraph Authentication
        CryptoSvc[CryptoService]
        SessionSvc[SessionService]
    end

    subgraph Sales Processing
        PricingSvc[PricingService]
        TicketSvc[TicketService]
        ReceiptSvc[ReceiptService]
    end

    subgraph Output
        PrintSvc[PrintService]
    end

    ReceiptSvc --> PrintSvc
    TicketSvc -.-> PrintSvc

    style CryptoSvc fill:#e1f5fe
    style SessionSvc fill:#e1f5fe
    style PricingSvc fill:#fff3e0
    style TicketSvc fill:#fff3e0
    style ReceiptSvc fill:#fff3e0
    style PrintSvc fill:#e8f5e9
```

## Services

| Service | Description | Key Methods |
|---------|-------------|-------------|
| [CryptoService](./services/crypto-service.md) | Password encryption and verification | `encryptPassword`, `verifyPassword` |
| [SessionService](./services/session-service.md) | CICS session management via COMMAREA | `createSession`, `getSessionContext` |
| [PricingService](./services/pricing-service.md) | Ticket price calculation | `calculatePrice` |
| [TicketService](./services/ticket-service.md) | Ticket creation and management | `createTickets`, `getTicketDetails`, `formatBoardingPass` |
| [ReceiptService](./services/receipt-service.md) | Receipt generation and formatting | `generateReceipt`, `getReceipt`, `formatReceiptForPrint` |
| [PrintService](./services/print-service.md) | Document printing via JCL | `submitPrintJob`, `printBoardingPass`, `printReceipt` |

## Service to Controller Mapping

| Controller | Services Used |
|------------|---------------|
| AuthController | CryptoService, SessionService |
| SalesController | PricingService, TicketService, ReceiptService |
| FlightController | (none - direct repository access) |
| TicketController | TicketService, PrintService |
| ReceiptController | ReceiptService, PrintService |

## Service Responsibilities

### Authentication Layer
- **CryptoService**: Handles password encryption using a deterministic algorithm based on user ID and admin date. Used during employee onboarding and login verification.
- **SessionService**: Manages CICS pseudo-conversational sessions through DFHCOMMAREA, enabling state persistence between user interactions.

### Sales Processing Layer
- **PricingService**: Calculates ticket prices. Currently uses flat-rate pricing (120.99 EUR) with plans for dynamic pricing.
- **TicketService**: Manages the complete ticket lifecycle including creation, seat assignment, and boarding pass formatting.
- **ReceiptService**: Generates purchase receipts with transaction details, payment method, and company information.

### Output Layer
- **PrintService**: Provides document printing capabilities through JCL batch job submission to configured printer queues.

## Data Flow Example: Complete Sale

```mermaid
sequenceDiagram
    participant User
    participant Sales as SalesController
    participant Pricing as PricingService
    participant Ticket as TicketService
    participant Receipt as ReceiptService
    participant Print as PrintService

    User->>Sales: Search client & flight
    Sales->>Pricing: calculatePrice(flight, passengers)
    Pricing-->>Sales: pricePerTicket, totalPrice
    Sales-->>User: Display pricing

    User->>Sales: Confirm purchase
    Sales->>Ticket: createTickets(flight, passengers)
    Ticket-->>Sales: tickets with seat numbers

    Sales->>Receipt: generateReceipt(buyId, amount)
    Receipt-->>Sales: receiptUrl

    Sales-->>User: Confirmation + receipt URL

    opt Print Receipt
        User->>Receipt: Print receipt
        Receipt->>Print: printReceipt(buyId, amount)
        Print-->>Receipt: jobId
    end

    opt Print Boarding Pass
        User->>Ticket: Print boarding pass
        Ticket->>Print: printBoardingPass(ticketData)
        Print-->>Ticket: jobId
    end
```
