# ReceiptController

Handles receipt generation for completed ticket purchases. Receipts are generated automatically after successful sales transactions.

## Generate Receipt

- URL: `/api/receipts/:buyId`
- Method: GET
- Description: Retrieve or generate a receipt for a completed transaction
- Content Type: application/json
- View: [receipt](../pages/receipt.md)

### Data model
```ts
declare namespace GetReceipt {
  export namespace Request {
    interface Params {
      buyId: string;            // Transaction/Purchase ID
    }
  }

  export namespace Response {
    export interface Body {
      receipt: {
        buyId: string;
        paymentMethod: 'CB' | 'CS' | 'CH';  // Card, Cash, Check
        transactionDate: string;             // DD/MM/YYYY
        transactionTime: string;             // HH:MM:SS
        companyName: string;                 // "COBOL AIRLINES"
        city: string;                        // "PARIS"
        postalCode: string;                  // "75000"
        amount: number;                      // Amount in EUR
        transactionType: 'DEBIT' | 'CREDIT';
      };
    }
  }
}
```

### Business Logic
```mermaid
sequenceDiagram
    participant Client
    participant ReceiptController
    participant BuyRepository

    Client->>ReceiptController: GET /api/receipts/:buyId
    ReceiptController->>BuyRepository: findById(buyId)

    alt Transaction not found
        ReceiptController-->>Client: 404 (Transaction not found)
    end

    ReceiptController->>ReceiptController: Format receipt data
    Note over ReceiptController: Payment method codes:<br/>CB = Credit Card<br/>CS = Cash<br/>CH = Check

    ReceiptController-->>Client: 200 OK (receipt)
```

### Relevant models
- [BUY](../models/BUY.md)

---

## Print Receipt

- URL: `/api/receipts/:buyId/print`
- Method: POST
- Description: Send receipt to print queue
- Content Type: application/json
- View: [receipt](../pages/receipt.md)

### Data model
```ts
declare namespace PrintReceipt {
  export namespace Request {
    interface Params {
      buyId: string;            // Transaction/Purchase ID
    }
  }

  export namespace Response {
    export interface Body {
      success: boolean;
      jobId?: string;           // Print job ID
      message: string;
    }
  }
}
```

### Business Logic
```mermaid
sequenceDiagram
    participant Client
    participant ReceiptController
    participant BuyRepository
    participant PrintService

    Client->>ReceiptController: POST /api/receipts/:buyId/print
    ReceiptController->>BuyRepository: findById(buyId)

    alt Transaction not found
        ReceiptController-->>Client: 404 (Transaction not found)
    end

    ReceiptController->>ReceiptController: Format receipt document

    ReceiptController->>PrintService: submitPrintJob(receiptData)

    alt Print failed
        PrintService-->>ReceiptController: Error
        ReceiptController-->>Client: 500 (Print error)
    end

    PrintService-->>ReceiptController: jobId
    ReceiptController-->>Client: 200 OK (success, jobId)
```

### Relevant models
- [BUY](../models/BUY.md)
