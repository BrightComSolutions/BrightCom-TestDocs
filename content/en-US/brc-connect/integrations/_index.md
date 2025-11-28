---
title: "Integrations"
linkTitle: "Integrations"
weight: 40
type: docs
description: >
  Integration architecture, Business Central touchpoints, external system connections, and API documentation for BRC Connect.
---

## Integration Overview

BRC Connect uses a sophisticated multi-layer architecture to enable seamless bidirectional integration between Business Central and external e-commerce/POS systems. The integration follows RESTful API principles with JSON data exchange.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Business Central                          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Sales Orders │  │   Customers  │  │    Items     │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                 │              │
│  ┌──────▼─────────────────▼─────────────────▼───────────┐  │
│  │            BRC Connect Integration Layer              │  │
│  │                                                       │  │
│  │  ┌─────────────────┐  ┌────────────────────────┐    │  │
│  │  │ Entry Processor │  │ Content Processor      │    │  │
│  │  │ (HTTP Layer)    │  │ (JSON Parser)          │    │  │
│  │  └────────┬────────┘  └──────┬─────────────────┘    │  │
│  │           │                   │                       │  │
│  │  ┌────────▼───────────────────▼─────────────────┐    │  │
│  │  │      Validation & Business Logic Layer      │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  │                                                       │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │      Outgoing Queue & Event Layer          │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                    HTTPS / JSON
                           │
┌──────────────────────────▼───────────────────────────────────┐
│               External Systems (E-commerce/POS)              │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Shopify  │  │  Storm   │  │ Litium   │  │  Sitoo   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Integration Layers

### 1. HTTP Transport Layer

**Codeunit**: `BRC Connect Http Mgmt` (12073500)

**Responsibilities:**
- RESTful API communication (GET, POST, PUT, DELETE)
- Bearer token authentication
- Request/response logging
- Error handling and retry logic
- HTTP status code processing

**Key Features:**
- Automatic retry on transient failures (configurable)
- Debug mode for detailed logging
- Connection pooling for performance
- Timeout handling

**Configuration:**
- **API Path**: Base URL for external API
- **Bearer Token**: Authentication credential
- **Webservice Retries**: Number of retry attempts (default: 3)

**HTTP Methods Used:**

| Method | Purpose | Example Endpoint |
|--------|---------|------------------|
| **GET** | Download orders, fetch data | `/documents?source=BC001` |
| **POST** | Create records, send updates | `/inventory` |
| **PUT** | Update existing records | `/orders/{id}/status` |
| **DELETE** | Remove records (rarely used) | `/cache/{id}` |

### 2. Entry Management Layer

**Tables:**
- `BRC Connect Entry` (12073500) - HTTP request/response tracking

**Entry Lifecycle:**

```
Queued → Not Sent → Sent and Received → Finished
         │                              │
         └──────────────► Error ◄───────┘
```

**Entry Types:**

| Service Type | Direction | Purpose |
|--------------|-----------|---------|
| **Get All** | Inbound | Download batch of documents |
| **Get** | Inbound | Fetch specific document |
| **Create** | Outbound | Send new record to external system |
| **Update** | Outbound | Update existing record |

**Key Fields:**
- **Entry No.**: Unique identifier (BigInteger)
- **Service Type**: HTTP operation type
- **BRC Connect Type**: Entity type (DOCUMENT, ITEM, etc.)
- **Request Content**: JSON sent (Blob)
- **Response Content**: JSON received (Blob)
- **Status**: Processing status
- **Error Text**: Error message if failed
- **Entry DateTime**: Timestamp

### 3. Content Processing Layer

**Tables:**
- `BRC Connect Content` (12073502) - Parsed JSON documents
- `BRC Connect Value` (12073504) - Key-value pairs extracted from JSON

**Content Lifecycle:**

```
New → Read → Validated → OK
 │      │        │
 └──────┴────────┴────────► Error
```

**Processing Flow:**

1. **Download** (Entry created)
   - HTTP GET retrieves JSON
   - Stored in Entry's Response Content

2. **Parse** (New → Read)
   - `BRC Entry To Content Mth` extracts JSON
   - Creates hierarchical Content records
   - Stores parent-child relationships

3. **Extract Values** (Read state)
   - `BRC Content To Value Mth` parses fields
   - Creates Value records for each JSON key
   - Handles nested objects and arrays

4. **Validate** (Read → Validated)
   - Type-specific validator codeunit runs
   - Checks customers exist, items exist, totals match
   - Updates Status to Validated or Error

5. **Create BC Record** (Validated → OK)
   - Type-specific create/update codeunit runs
   - Creates Sales Order, Customer, Item, etc.
   - Links to BC record via Record ID
   - Updates Status to OK

**Hierarchical Content:**

```json
{
  "orderId": "12345",
  "buyer": {
    "email": "customer@example.com",
    "name": "John Doe"
  },
  "lines": [
    {"itemNo": "ITEM001", "quantity": 2},
    {"itemNo": "ITEM002", "quantity": 1}
  ]
}
```

Becomes:

```
Content 1 (Type: DOCUMENT, ID: 12345)
├─ Value: orderId = "12345"
├─ Content 2 (Parent: DOCUMENT-12345, Field: buyer)
│  ├─ Value: email = "customer@example.com"
│  └─ Value: name = "John Doe"
├─ Content 3 (Parent: DOCUMENT-12345, Field: lines[0])
│  ├─ Value: itemNo = "ITEM001"
│  └─ Value: quantity = 2
└─ Content 4 (Parent: DOCUMENT-12345, Field: lines[1])
   ├─ Value: itemNo = "ITEM002"
   └─ Value: quantity = 1
```

### 4. Validation Layer

**Purpose**: Verify data integrity before creating BC records

**Type-Specific Validators:**

| BRC Connect Type | Validator Codeunit | Checks |
|------------------|-------------------|--------|
| **DOCUMENT** | 12073517 (BRCValidateDocumentMth) | Customer exists, items exist, totals match, VAT correct |
| **CUSTOMER** | 12073525 (BRCValidateCustomerMth) | Required fields, email format, duplicate check |
| **ITEM** | 12073529 (BRCValidateItemMth) | UOM valid, references exist, pricing correct |
| **PAYMENT** | 12073533 (BRCValidatePaymentMth) | Payment method mapped, amount positive |
| **SHIPMENT** | 12073535 (BRCValidateShipmentMth) | Order exists, quantities valid |

**Validation Rules:**

**Document Validation:**
- Customer email/phone/ID matches existing or can be created
- All line items have valid item references
- Line totals = (Quantity × Unit Price) - Discount
- Document total = ∑Line Totals + Freight - Discount ± tolerance
- VAT calculations correct (if enabled)
- Payment amounts = Document total (if payment option requires)

**Customer Validation:**
- Email format valid (if present)
- Phone format valid (if present)
- Required BC fields have values or defaults
- No duplicate by unique identifier

**Item Validation:**
- Item No. or Reference exists in BC
- Variant Code valid (if variants used)
- Unit of Measure exists for item
- Quantity > 0

### 5. Business Logic Layer

**Purpose**: Create/update BC records from validated content

**Type-Specific Create/Update Codeunits:**

| BRC Connect Type | Codeunit | Creates |
|------------------|----------|---------|
| **DOCUMENT** | 12073518 (BRCCreateDocumentMth) | Sales Order, Invoice, Credit Memo, Return Order |
| **CUSTOMER** | 12073521 (BRCCreateUpdateCustomerMth) | Customer, Ship-to Address |
| **ITEM** | 12073531 (BRCCreateUpdateItemMth) | Item, Item Reference, Variant |
| **PAYMENT** | 12073530 (BRCCreateUpdatePaymentMth) | Payment Journal Lines |
| **SHIPMENT** | 12073544 (BRCCreateUpdateShipmentMth) | Update Sales Order with shipment info |

**Document Creation Process:**

1. **Create/Update Customer**
   - Match customer by unique identifier (email, phone, web ID)
   - Create new if no match and auto-create enabled
   - Update address information

2. **Create Sales Header**
   - Set Document Type (Order, Invoice, etc.)
   - Assign Customer No.
   - Set Order Date, Posting Date
   - Map custom dimensions from extended info

3. **Create Sales Lines**
   - For each line item in content:
     - Match item by reference or item no.
     - Set Quantity, Unit Price, Discount
     - Handle line-level dimensions
     - Add shipment method line (if configured)
     - Add discount line (if configured)

4. **Handle Payments**
   - Based on Payment Option setting:
     - Create payment journal lines
     - Add payment lines to sales order
     - Ignore if configured

5. **Add Freight/Discounts**
   - Add freight line (if amount > 0)
   - Add document discount line (if amount > 0)
   - Add duties line (if amount > 0)

6. **Rounding Adjustment**
   - Calculate difference between BC total and external total
   - If within tolerance, add rounding line
   - If exceeds tolerance, throw error

7. **Link Extended Info**
   - Create extended info records
   - Map custom fields to BC fields or extended tables
   - Preserve JSON path references

8. **Release Document** (if auto-release enabled)
   - Validate document
   - Release for processing

### 6. Outbound Event Layer

**Purpose**: Detect BC changes and queue for external system updates

**Codeunit**: `BRCConnectEvents` (12073507)

**Event Subscribers:**

```al
// Example event subscriptions
[EventSubscriber(ObjectType::Table, Database::Item, 'OnAfterModifyEvent')]
local procedure ItemOnAfterModify(var Rec: Record Item; var xRec: Record Item)
begin
    // Add to outgoing queue if item changed
end

[EventSubscriber(ObjectType::Table, Database::"Sales Shipment Header", 'OnAfterInsertEvent')]
local procedure SalesShipmentOnAfterInsert(var Rec: Record "Sales Shipment Header")
begin
    // Add shipment to outgoing queue
end
```

**Triggers:**

| BC Action | Triggers | Sends |
|-----------|----------|-------|
| Item modified | Item update | Item master data |
| Inventory posted | Inventory update | Stock levels by location |
| Sales Price changed | Price update | Sales prices, price lists |
| Sales Shipment posted | Shipment notification | Shipment details, tracking |
| Sales Invoice posted | Invoice notification | Invoice details, payment due |
| Customer modified | Customer update | Customer data |

**Outgoing Queue Table**: `BRC Outgoing Synce Queue` (12073511)

**Fields:**
- **Record ID**: Link to BC record
- **BRC Connect Type**: Entity type to sync
- **Sync Date Time**: When change detected
- **Synced**: Boolean (processed or not)
- **Error Count**: Number of failed attempts
- **Last Error**: Error message

**Processing:**
- Job Queue runs every 5 minutes (configurable)
- Codeunit `BRC Process Outgoing Queue` processes queue
- Builds JSON from BC record
- POSTs to external API via HTTP layer
- Marks Synced = TRUE on success
- Increments Error Count on failure

### 7. Field Mapping Engine

**Table**: `BRC Content Type Field Setup` (12073505)

**Purpose**: Map JSON paths to BC fields

**Mapping Configuration:**

| JSON Key Name | Field No. | Logic Mapping | Purpose |
|---------------|-----------|---------------|---------|
| buyer.email | 102 | - | Customer email |
| status | 1 | USE MAPPING | Translate external status to BC Document Type |
| lines[0].itemNo | 6 | - | Item number |
| customField1 | 50000 | - | Custom BC field |

**Mapping Features:**

1. **JSON Path Support**
   - Dot notation: `buyer.email`
   - Array notation: `lines[0].quantity`
   - Nested objects: `address.billing.zipCode`

2. **Logic Mapping**
   - Translates external values to BC values
   - Example: "pending" → "Order", "completed" → "Invoice"
   - Configured in `BRC Mapping` table

3. **Unique Identifiers**
   - Mark fields used for record matching
   - Priority-based matching (try Priority 1, then 2, etc.)
   - Case sensitivity options

4. **Extended Info**
   - Map to custom tables/fields
   - Preserve source JSON structure
   - Audit trail for data lineage

5. **Validation Order**
   - Control sequence of validation rules
   - Dependencies between fields
   - Conditional validation

**Example Mapping Configuration:**

```
BRC Connect Type: DOCUMENT
Source: SHOPIFY

JSON Key Name          │ Field No. │ Table         │ Logic Mapping
──────────────────────┼───────────┼──────────────┼──────────────
id                    │ 50100     │ Sales Header │ -
email                 │ 102       │ Sales Header │ -
financial_status      │ 1         │ Sales Header │ USE MAPPING
line_items[0].sku     │ 6         │ Sales Line   │ -
line_items[0].price   │ 22        │ Sales Line   │ -
shipping.company      │ 50101     │ Sales Header │ -
```

## Business Central Touchpoints

BRC Connect integrates with these BC areas:

### Sales & Receivables

**Tables:**
- Sales Header (36)
- Sales Line (37)
- Customer (18)
- Ship-to Address (222)

**Pages:**
- Sales Orders
- Sales Invoices
- Sales Credit Memos
- Customers

**Posting:**
- Sales Order → Sales Shipment (triggered notification to web)
- Sales Invoice (triggered notification to web)

### Inventory

**Tables:**
- Item (27)
- Item Reference (5717) / Item Cross Reference (5717)
- Item Ledger Entry (32)
- Item Variant (5401)

**Pages:**
- Items
- Item References
- Item Availability

**Posting:**
- Item Journal (triggered inventory update to web)
- Purchase Receipt (triggered inventory update to web)
- Transfer Shipment (triggered notification to web)

### Sales Prices

**Tables:**
- Sales Price (7002) - older BC versions
- Price List Line (7001) - BC 2020+

**Pages:**
- Sales Prices
- Price Lists

**Triggers:**
- Price modification (triggered price update to web)

### Financial

**Tables:**
- Gen. Journal Line (81)
- Payment Method (289)

**Pages:**
- Payment Journals

**Integration:**
- Payment journal line creation from order payments
- Optional auto-posting

### Dimensions

**Tables:**
- Dimension Value (349)
- Default Dimension (352)

**Integration:**
- Map external categories/tags to BC dimensions
- Set shortcut dimensions on documents

## External System Integration

### JSON API Requirements

BRC Connect expects external systems to provide:

**Inbound (External → BC):**

**GET /documents** - Download orders
```json
{
  "documents": [
    {
      "id": "ORDER-12345",
      "documentType": "Order",
      "orderDate": "2025-11-28T10:30:00Z",
      "buyer": {
        "email": "customer@example.com",
        "name": "John Doe",
        "phone": "+1234567890"
      },
      "lines": [
        {
          "itemNo": "SKU001",
          "description": "Product Name",
          "quantity": 2,
          "unitPrice": 49.99,
          "discount": 0,
          "vatPercent": 25
        }
      ],
      "payments": [
        {
          "method": "credit_card",
          "amount": 99.98
        }
      ],
      "totals": {
        "subtotal": 99.98,
        "freight": 10.00,
        "tax": 27.50,
        "total": 137.48
      }
    }
  ],
  "nextLink": "/documents?page=2"
}
```

**Outbound (BC → External):**

**POST /inventory** - Update inventory
```json
{
  "source": "BC-PROD-01",
  "items": [
    {
      "itemNo": "SKU001",
      "inventory": 150,
      "location": "MAIN",
      "lastUpdated": "2025-11-28T14:22:00Z"
    }
  ]
}
```

**POST /shipments** - Notify shipment
```json
{
  "source": "BC-PROD-01",
  "orderId": "ORDER-12345",
  "shipmentNo": "SH-001234",
  "shipmentDate": "2025-11-28",
  "lines": [
    {
      "itemNo": "SKU001",
      "quantityShipped": 2
    }
  ],
  "tracking": {
    "carrier": "DHL",
    "trackingNumber": "1234567890"
  }
}
```

### Pagination

BRC Connect supports these pagination methods:

1. **nextLink**: URL to next page
   ```json
   {
     "documents": [...],
     "nextLink": "/documents?page=2"
   }
   ```

2. **acknowledgeToken**: Token to acknowledge processed records
   ```json
   {
     "documents": [...],
     "acknowledgeToken": "abc123"
   }
   ```
   BC sends token back in next request to mark records processed

### Authentication

**Supported Methods:**

1. **Bearer Token** (Primary)
   ```
   Authorization: Bearer {token}
   ```
   - Configure in BRC Connect Setup
   - Token stored encrypted in BC
   - Include in all HTTP requests

2. **API Key** (Alternative)
   ```
   X-API-Key: {key}
   ```
   - Custom header
   - Requires modification to HTTP Mgmt codeunit

3. **OAuth 2.0** (Custom Implementation)
   - Requires custom token refresh logic
   - Contact BrightCom for OAuth implementation

### Error Handling

**HTTP Status Codes:**

| Status | Meaning | BRC Connect Action |
|--------|---------|-------------------|
| 200 OK | Success | Process response |
| 201 Created | Resource created | Mark success |
| 400 Bad Request | Invalid request | Log error, don't retry |
| 401 Unauthorized | Auth failed | Log error, alert admin |
| 404 Not Found | Resource not found | Log error, don't retry |
| 429 Too Many Requests | Rate limited | Retry after delay |
| 500 Server Error | External system error | Retry (up to configured limit) |
| 503 Service Unavailable | Temporary outage | Retry (up to configured limit) |

**Retry Logic:**

- Transient errors (429, 500, 503): Retry up to **Webservice Retries** count
- Permanent errors (400, 401, 404): Don't retry, log error
- Exponential backoff between retries (1s, 2s, 4s, etc.)

### Rate Limiting

To avoid overwhelming external APIs:

1. **Process Entry Max Count**: Limits entries per job run
2. **No. of Minutes between Runs**: Controls job frequency
3. **Batch Acknowledgment**: Acknowledges processed records in batches

**Example**:
- Max Count = 100
- Run Interval = 5 minutes
- Max throughput = 100 entries × 12 runs/hour = 1200 entries/hour

## Integration Patterns

### Pattern 1: Order Import

```
External System                 BRC Connect                  Business Central
─────────────────              ─────────────                ─────────────────
New Order Created
    │
    │ [Webhook or Polling]
    │
    ├────────────► GET /documents
    │
    │◄──────────── Orders JSON
    │
    │              Parse JSON
    │              Validate Customer
    │              Validate Items
    │              Validate Totals
    │                    │
    │                    ├─────────────► Create Sales Order
    │                    │
    │                    ├─────────────► Create Customer (if needed)
    │                    │
    │                    ├─────────────► Create Payment Journal
    │                    │
    │                    │◄──────────── Sales Order No.
    │
    │◄──────────── Acknowledge
```

### Pattern 2: Inventory Sync

```
Business Central                BRC Connect                 External System
────────────────               ─────────────               ─────────────────
Inventory Posted
    │
    ├──────────────► OnAfterPost Event
    │                     │
    │                     │ Add to Queue
    │                     │
    │                     │ [Job Queue]
    │                     │
    │                     │ Build JSON
    │                     │
    │                     ├──────────────► POST /inventory
    │                     │
    │                     │                  Update Stock Display
    │                     │
    │                     │◄─────────────── 200 OK
    │
    │◄─────────────       Mark Synced
```

### Pattern 3: Shipment Notification

```
Business Central                BRC Connect                 External System
────────────────               ─────────────               ─────────────────
Post Shipment
    │
    ├──────────────► OnAfterInsert Event
    │                     │
    │                     │ Add to Queue
    │                     │
    │                     │ [Wait Delay]
    │                     │
    │                     │ Build Shipment JSON
    │                     │
    │                     ├──────────────► POST /shipments
    │                     │
    │                     │                  Email Customer
    │                     │                  Update Order Status
    │                     │
    │                     │◄─────────────── 200 OK
```

## Performance Optimization

### Parallel Processing

BRC Connect supports parallel processing for high throughput:

**Codeunits:**
- `BRCConnectOpCoordinator` (12073573) - Coordinates parallel operations
- `BRCProcessContentOperator` (12073574) - Worker process

**Implementation:**
- Multiple job queue entries run concurrently
- Each processor claims a batch of entries using locking
- Optimized keys prevent contention (ProcessingByType, QueuedCreate)

**Configuration:**
- Create multiple job queue entries for same codeunit
- Stagger start times slightly (0s, 10s, 20s, 30s)
- Monitor for lock timeouts

### Indexing Strategy

**Key Indexes:**

| Table | Key Name | Fields | Purpose |
|-------|----------|--------|---------|
| BRC Connect Content | Processing | Status, BRC Connect Type | Fast status filtering |
| BRC Connect Content | ProcessingByType | BRC Connect Type, Status | Type-specific queries |
| BRC Outgoing Sync Queue | NotSynced | Synced, Sync Date Time | Find pending records |

**LoadFields Optimization:**

Recent optimization in identity matching:
```al
// Load only primary key initially
Content.LoadFields("BRC Connect ID", "BRC Connect Type");

// Load additional fields only when needed
if NeedDetails then
    Content.LoadFields("External ID", "Record ID", "Status");
```

### Caching

**Value Caching:**
- Frequently accessed mappings cached in memory
- Customer/item lookups cached per processing session
- Clears at end of processing run

## Security Considerations

### Data Protection

- **Bearer tokens** stored encrypted in BC
- **Debug Mode** logs full JSON (disable in production)
- **Error logs** may contain PII (customer emails, etc.)
- Regular cleanup of old entries recommended

### Network Security

- **HTTPS only** (no HTTP support)
- **TLS 1.2+** required
- **IP whitelisting** recommended on external system
- **Outbound only** (no inbound webhooks to BC)

### Permission Security

- **BRC CONNECT - EDIT**: Full access (admins only)
- **BRC CONNECT - VIEW**: Read-only (support staff)
- Separate permissions for BC entities (Sales, Inventory)

## Extensibility

BRC Connect supports customization through:

### Events

**Published Events:**
- `OnBeforeCreateDocument`: Modify order before creation
- `OnAfterCreateDocument`: Post-creation processing
- `OnBeforeValidateContent`: Custom validation rules
- `OnAfterSendToWeb`: Post-send actions

**Example Subscription:**
```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::BRCCreateDocumentMth, 'OnBeforeCreateDocument')]
local procedure CustomDocumentLogic(var Content: Record "BRC Connect Content"; var IsHandled: Boolean)
begin
    // Custom logic here
    // Set IsHandled = true to skip standard processing
end
```

### Custom Fields

Add custom fields to BRC tables:
- Extend `BRC Connect Content` with custom fields
- Extend `BRC Connect Entry` with custom tracking
- Map via `BRC Content Type Field Setup`

### Custom Types

Create new BRC Connect Types:
- Define new type in `BRC Connect Type` table
- Assign custom validator codeunit
- Assign custom create/update codeunit
- Configure field mappings

## Next Steps

- [Troubleshooting](../troubleshooting/) - Common integration issues
- [Reference](../reference/) - API and permission reference
- [Setup](../setup/) - Configuration guide
