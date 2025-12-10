# COBOL Airlines - Screen Navigation

Overview of all screens in the COBOL Airlines system and their navigation relationships.

## Screen Inventory

| Screen | Transaction | Program | Description |
|--------|-------------|---------|-------------|
| LOGIN | LOGP | LOGIN-COB | User authentication |
| SELL1 | SEL1 | SELLCOB1 | Sales - client/flight selection |
| SELL2 | SEL2 | SELLCOB2 | Sales - passenger confirmation |
| SEARCH FLIGHT | SCHF | SRCHFLY-COB | Flight search |
| SEARCH TICKET | SCHT | SRCHTKT-COB | Ticket search |
| RECEIPT | - | RECEIPT-COB | Print: purchase receipt |
| BOARDING PASS | - | PRINT-TICKET-COB | Print: boarding pass |

## Navigation Flow

```mermaid
flowchart TD
    subgraph auth["Authentication"]
        LOGIN[LOGIN<br/>LOGP]
    end

    subgraph sales["Sales Feature"]
        SELL1[SELL1<br/>SEL1]
        SELL2[SELL2<br/>SEL2]
        RECEIPT([RECEIPT<br/>Print])
    end

    subgraph search["Search Feature"]
        SRCHFLI[SEARCH FLIGHT<br/>SCHF]
        SRCHTKT[SEARCH TICKET<br/>SCHT]
        BOARDING([BOARDING PASS<br/>Print])
    end

    subgraph unavailable["Unavailable Screens"]
        CEO[CEO MAP]
        CREW[CREW MAP]
        HR[HR MAP]
        IT[IT MAP]
        LAWYER[LAWYER MAP]
        SCHEDULE[SCHEDULE MAP]
        PASSREG[PASSENGER REG.]
    end

    %% Authentication flow
    LOGIN -->|"DEPTID=7<br/>Sales Dept"| SRCHFLI
    LOGIN -.->|"Other DEPTID"| unavailable

    %% Sales navigation
    SELL1 -->|F12| SELL2
    SELL2 -->|F10| SELL1
    SELL2 -->|F11 Confirm| RECEIPT

    %% Search navigation
    SRCHFLI -->|F6| SELL1
    SRCHTKT -->|F6| SELL1
    SELL1 -->|F4| SRCHFLI
    SELL1 -->|F5| SRCHTKT
    SELL2 -->|F4| SRCHFLI
    SELL2 -->|F5| SRCHTKT
    SRCHFLI -->|F5| SRCHTKT
    SRCHTKT -->|F4| SRCHFLI
    SRCHTKT -->|F12| BOARDING

    %% Exit to login
    SRCHFLI -->|F3| LOGIN
    SRCHTKT -->|F3| LOGIN
    SELL1 -->|F3| LOGIN
    SELL2 -->|F3| LOGIN

    %% Passenger registration (not available)
    SELL1 -.->|F7| PASSREG
    SELL2 -.->|F7| PASSREG
    SRCHFLI -.->|F7| PASSREG
    SRCHTKT -.->|F7| PASSREG

    %% Styling
    style LOGIN fill:#e3f2fd
    style SELL1 fill:#e8f5e9
    style SELL2 fill:#e8f5e9
    style SRCHFLI fill:#fff3e0
    style SRCHTKT fill:#fff3e0
    style RECEIPT fill:#f3e5f5
    style BOARDING fill:#f3e5f5
    style unavailable fill:#ffebee
```

## Function Key Reference

| Key | Action |
|-----|--------|
| F3 | Exit / Return to LOGIN |
| F4 | Search Flight (SRCHFLI) |
| F5 | Search Ticket (SRCHTKT) |
| F6 | Sell (SELL1) |
| F7 | Passenger Registration (N/A) |
| F10 | Return / Previous Page |
| F11 | Next Page / Confirm |
| F12 | Insert Passengers / Print Ticket |

## Screen Details

- [LOGIN](./pages/login.md) - Authentication with department-based routing
- [SELL1](./pages/sell1.md) - Initial sales: client/flight selection
- [SELL2](./pages/sell2.md) - Passenger confirmation and sale finalization
- [SEARCH FLIGHT](./pages/search-flight.md) - Multi-criteria flight search
- [SEARCH TICKET](./pages/search-ticket.md) - Ticket lookup with pagination
- [RECEIPT](./pages/receipt.md) - Purchase receipt (print output)
- [BOARDING PASS](./pages/boarding-pass.md) - Ticket/boarding pass (print output)
