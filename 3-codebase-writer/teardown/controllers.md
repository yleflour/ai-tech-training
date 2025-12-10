# Controllers Overview

This document provides an overview of all API controllers in the COBOL Airlines system.

## API Architecture

```mermaid
flowchart TB
    subgraph Client
        UI[Web UI]
    end

    subgraph Controllers
        Auth[AuthController]
        Sales[SalesController]
        Flight[FlightController]
        Ticket[TicketController]
        Receipt[ReceiptController]
    end

    subgraph Services
        CryptoSvc[CryptoService]
        PricingSvc[PricingService]
        TicketSvc[TicketService]
        PrintSvc[PrintService]
    end

    subgraph Repositories
        EmploRepo[EmployeeRepository]
        PassRepo[PassengerRepository]
        FlightRepo[FlightRepository]
        TicketRepo[TicketRepository]
        BuyRepo[BuyRepository]
        AirportRepo[AirportRepository]
    end

    UI --> Auth
    UI --> Sales
    UI --> Flight
    UI --> Ticket
    UI --> Receipt

    Auth --> CryptoSvc
    Auth --> EmploRepo

    Sales --> PassRepo
    Sales --> FlightRepo
    Sales --> PricingSvc
    Sales --> TicketSvc
    Sales --> BuyRepo

    Flight --> FlightRepo
    Flight --> AirportRepo

    Ticket --> TicketRepo
    Ticket --> PassRepo
    Ticket --> FlightRepo
    Ticket --> AirportRepo
    Ticket --> PrintSvc

    Receipt --> BuyRepo
    Receipt --> PrintSvc
```

## Controllers

| Controller | Description | Endpoints |
|------------|-------------|-----------|
| [AuthController](./controllers/auth.md) | User authentication and session management | `POST /api/auth/login` |
| [SalesController](./controllers/sales.md) | Ticket sales workflow | `POST /api/sales/search`<br/>`POST /api/sales/confirm` |
| [FlightController](./controllers/flight.md) | Flight search operations | `GET /api/flights/search` |
| [TicketController](./controllers/ticket.md) | Ticket search and boarding pass generation | `GET /api/tickets/search`<br/>`POST /api/tickets/:ticketId/boarding-pass` |
| [ReceiptController](./controllers/receipt.md) | Receipt retrieval and printing | `GET /api/receipts/:buyId`<br/>`POST /api/receipts/:buyId/print` |

## User Flow

```mermaid
sequenceDiagram
    participant User
    participant Auth as AuthController
    participant Sales as SalesController
    participant Flight as FlightController
    participant Ticket as TicketController
    participant Receipt as ReceiptController

    User->>Auth: POST /api/auth/login
    Auth-->>User: Session + redirect to /sales

    Note over User,Receipt: Sales Agent Workflow

    User->>Flight: GET /api/flights/search
    Flight-->>User: Available flights

    User->>Sales: POST /api/sales/search
    Sales-->>User: Client + flight + pricing

    User->>Sales: POST /api/sales/confirm
    Sales-->>User: Tickets + receipt URL

    User->>Receipt: GET /api/receipts/:buyId
    Receipt-->>User: Receipt data

    Note over User,Receipt: Ticket Lookup Workflow

    User->>Ticket: GET /api/tickets/search
    Ticket-->>User: Ticket results

    User->>Ticket: POST /api/tickets/:id/boarding-pass
    Ticket-->>User: Boarding pass printed
```

## Endpoint Summary

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Authenticate user credentials |

### Sales
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/sales/search` | Search client and flight, calculate price |
| POST | `/api/sales/confirm` | Confirm passengers and complete purchase |

### Flights
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/flights/search` | Search available flights |

### Tickets
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets/search` | Search existing tickets |
| POST | `/api/tickets/:ticketId/boarding-pass` | Print boarding pass |

### Receipts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/receipts/:buyId` | Get receipt details |
| POST | `/api/receipts/:buyId/print` | Print receipt |
