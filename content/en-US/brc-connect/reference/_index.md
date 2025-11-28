---
title: "Reference"
linkTitle: "Reference"
weight: 60
type: docs
description: >
  Technical reference including permissions, data models, codeunit listings, and release information for BRC Connect.
---

## Overview

This reference section provides detailed technical information about BRC Connect's structure, permissions, and components.

## Permission Sets

### BRC CONNECT - EDIT

**Purpose**: Full access to configure and use BRC Connect

**Assigned To**: Integration administrators, operations managers

**Permissions Granted:**

| Object Type | Object Range | Permission |
|-------------|-------------|------------|
| **Tables** | 12073500-12073968 | RIMD (Read, Insert, Modify, Delete) |
| **Pages** | 12073500-12073968 | Full access |
| **Codeunits** | 12073500-12073968 | Execute |
| **Reports** | 12073500-12073968 | Execute |

**Key Pages Accessible:**
- BRC Connect Setup
- BRC Connect Entries
- BRC Connect Content
- BRC Connect Type
- BRC Content Type Field Setup
- BRC Mapping
- BRC Outgoing Sync Queue
- BRC Connect Error List

### BRC CONNECT - VIEW

**Purpose**: Read-only access for monitoring and support

**Assigned To**: Support staff, analysts, auditors

**Permissions Granted:**

| Object Type | Object Range | Permission |
|-------------|-------------|------------|
| **Tables** | 12073500-12073968 | R (Read only) |
| **Pages** | 12073500-12073968 | Read only |

**Limitations:**
- Cannot modify configuration
- Cannot create/update/delete records
- Cannot run processing actions
- Can view entries, content, errors

### Additional BC Permissions Required

Users also need standard BC permissions based on their role:

**For Order Processing:**
- Sales Order management (Tables 36, 37)
- Customer management (Table 18)
- Item management (Table 27)

**For Inventory Sync:**
- Item Ledger Entry read (Table 32)
- Inventory posting (Item Journals)

**For Payment Processing:**
- Gen. Journal Line management (Table 81)
- Payment Journal posting

## Database Schema

### Core Tables

#### BRC Connect Entry (12073500)

**Purpose**: HTTP request/response log

**Key Fields:**

| Field | Type | Description |
|-------|------|-------------|
| Entry No. | BigInteger | Primary key, auto-increment |
| Service Type | Enum | Get All, Get, Create, Update |
| BRC Connect Type | Code[30] | Entity type (DOCUMENT, ITEM, etc.) |
| Source | Code[50] | External system identifier |
| Path | Text[250] | API endpoint path |
| Request Content | Blob | HTTP request body (JSON) |
| Response Content | Blob | HTTP response body (JSON) |
| Status | Enum | Queued, Not Sent, Sent and Received, Finished, Error |
| Error Text | Text[250] | Error message if failed |
| Entry DateTime | DateTime | Timestamp |
| Web Entry No. | Integer | External system entry reference |
| Retry Count | Integer | Number of retry attempts |

**Indexes:**
- Primary Key: Entry No.
- Status: For filtering by processing status
- Entry DateTime: For date-based queries
- BRC Connect Type, Source: For type-specific queries

#### BRC Connect Setup (12073501)

**Purpose**: Global configuration

**Key Fields:**

| Field | Type | Description |
|-------|------|-------------|
| Primary Key | Code[10] | Singleton record |
| Integration Active | Boolean | Master on/off switch |
| API Path | Text[250] | Base URL for external API |
| Bearer Token | Text[250] | Authentication token (encrypted) |
| Source ID | Code[50] | BC instance identifier |
| Debug Mode | Boolean | Enable detailed logging |
| Auto Download Documents | Boolean | Auto-download from external system |
| Auto Read Content | Boolean | Auto-parse JSON |
| Auto Validate Content | Boolean | Auto-validate data |
| Auto Create Content | Boolean | Auto-create BC records |
| Auto Create/Update Customer | Boolean | Auto-create missing customers |
| Auto Create/Update Item | Boolean | Auto-create missing items |
| Process Entry Max Count | Integer | Max entries per job run |
| Webservice Retries | Integer | HTTP retry attempts |
| Payment Option | Enum | Payment handling mode |
| Payment Journal Template | Code[10] | Journal template for payments |
| Payment Journal Batch | Code[10] | Journal batch for payments |
| Total Amt. Document Tolerance | Decimal | Allowed total variance |
| Inventory to Web | Enum | Inventory calculation method |

**Configuration Categories:**
1. Connection Settings (API Path, Bearer Token, etc.)
2. Automation Flags (Auto Download, Auto Create, etc.)
3. Processing Limits (Max Count, Retries)
4. Document Settings (Payment, Totals, VAT)
5. Inventory Settings (Inventory Type, Locations)
6. Monitoring (Email alerts, logging)

#### BRC Connect Content (12073502)

**Purpose**: Parsed JSON documents

**Key Fields:**

| Field | Type | Description |
|-------|------|-------------|
| BRC Connect Type | Code[30] | Entity type (part of PK) |
| BRC Connect ID | Code[250] | Content identifier (part of PK) |
| Parent Type | Code[30] | Parent content type (for hierarchical) |
| Parent ID | Code[250] | Parent content ID |
| Parent Field Name | Text[100] | JSON array field name |
| Json Content | Blob | Full JSON for this content |
| Status | Enum | New, Read, Validated, OK, Error |
| External ID | Code[250] | External system reference |
| Source | Code[50] | External system identifier |
| Record ID | RecordID | Link to created BC record |
| Error Text | Text[250] | Error message if failed |
| Created Date | Date | Date content created |
| Entry No. | BigInteger | Link to BRC Connect Entry |

**Indexes:**
- Primary Key: BRC Connect Type, BRC Connect ID
- Processing: Status, BRC Connect Type (optimized for processing queries)
- ProcessingByType: BRC Connect Type, Status (type-specific queries)
- Parent: Parent Type, Parent ID (hierarchical navigation)
- QueuedCreate: Status, Created Date (batch processing)

#### BRC Connect Value (12073504)

**Purpose**: Key-value pairs extracted from JSON

**Key Fields:**

| Field | Type | Description |
|-------|------|-------------|
| BRC Connect Type | Code[30] | Content type (part of PK) |
| BRC Connect ID | Code[250] | Content ID (part of PK) |
| Field Name | Text[100] | JSON key name (part of PK) |
| Value Text | Text[250] | String value |
| Value Decimal | Decimal | Numeric value |
| Value Boolean | Boolean | Boolean value |
| Value Long Text | Blob | Large text values |
| Value Content Type | Code[30] | Nested object reference (type) |
| Value Content ID | Code[250] | Nested object reference (ID) |
| Multiple Values | Boolean | Multiple values for same key |
| Updated by User | Boolean | User manually updated |

**Use Cases:**
- Field-level validation
- Custom field extraction
- Extended info mapping
- Audit trail for data changes

#### BRC Connect Type (12073503)

**Purpose**: Entity type configuration

**Key Fields:**

| Field | Type | Description |
|-------|------|-------------|
| BRC Connect Type | Code[30] | Primary key |
| Table No. | Integer | BC table to create records in |
| Path | Text[250] | API endpoint for this type |
| Json Key Identifier List | Text[250] | JSON keys for identification |
| Parent Type | Code[30] | Parent type (for hierarchical) |
| Download Data | Boolean | Enable downloading |
| Process Content | Boolean | Enable processing |
| Validator Codeunit | Integer | Validation codeunit ID |
| Create/Update Codeunit | Integer | Creation codeunit ID |
| Create Request Codeunit | Integer | Outbound request builder codeunit |
| Record per Entry | Integer | Batching size |
| Sync to Web on Insert | Boolean | Trigger sync on BC insert |
| Sync to Web on Modify | Boolean | Trigger sync on BC modify |

**Standard Types:**
- DOCUMENT (Sales documents)
- CUSTOMER (Customers)
- ITEM (Items)
- INVENTORY (Stock levels)
- PRICE (Sales prices)
- PAYMENT (Payments)
- SHIPMENT (Shipments)
- INVOICE (Invoices)
- CREDITMEMO (Credit memos)

#### BRC Content Type Field Setup (12073505)

**Purpose**: JSON to BC field mapping

**Key Fields:**

| Field | Type | Description |
|-------|------|-------------|
| BRC Connect Type | Code[30] | Content type (part of PK) |
| Source | Code[50] | External system (part of PK) |
| JSON Key Name | Text[100] | JSON path (part of PK) |
| Field No. | Integer | BC table field number |
| Logic Mapping | Enum | Value translation rule |
| Unique Identifier | Boolean | Use for record matching |
| Priority No. | Integer | Matching priority (1 = highest) |
| Case Sensitive Filtering | Boolean | Case-sensitive matching |
| Set Value to Content | Boolean | Store in content record |
| Validation Order | Integer | Validation sequence |
| Map to Dimension | Boolean | Map to BC dimension |
| Is Extended Info | Boolean | Map to extended info |

**JSON Path Examples:**
- `buyer.email` - Nested object
- `lines[0].itemNo` - Array element
- `totals.grandTotal` - Nested value

#### BRC Mapping (12073507)

**Purpose**: Value translation

**Key Fields:**

| Field | Type | Description |
|-------|------|-------------|
| Source | Code[50] | External system (part of PK) |
| BRC Connect Type | Code[30] | Entity type (part of PK) |
| From | Text[100] | External value (part of PK) |
| To | Code[50] | BC value |

**Common Mappings:**
- Payment methods: "credit_card" → "CC"
- Document types: "pending" → "Order"
- Statuses: "completed" → "Invoice"

#### BRC Outgoing Synce Queue (12073511)

**Purpose**: Outbound synchronization queue

**Key Fields:**

| Field | Type | Description |
|-------|------|-------------|
| Record ID | RecordID | BC record to sync (part of PK) |
| BRC Connect Type | Code[30] | Entity type (part of PK) |
| Sync Date Time | DateTime | When change detected |
| Synced | Boolean | Processing complete |
| Entry No. | BigInteger | Link to BRC Connect Entry |
| Error Count | Integer | Failed attempt count |
| Last Error | Text[250] | Most recent error message |
| From Background | Boolean | Triggered by background job |
| User Name | Code[50] | User who triggered change |

**Processing:**
- Job queue processes queue every N minutes
- Records marked Synced = TRUE after success
- Error Count increments on failure
- Retry logic based on error type

## Codeunit Reference

### Core Processing Codeunits

| Codeunit ID | Name | Purpose |
|-------------|------|---------|
| 12073500 | BRC Connect Http Mgmt | HTTP communication |
| 12073501 | BRC Connect Entry Processor | Entry lifecycle management |
| 12073502 | BRC Connect Content Processor | Content lifecycle management |
| 12073503 | BRC Content To Value Mth | Extract values from JSON |
| 12073507 | BRC Connect Events | Event subscribers for BC changes |
| 12073509 | BRC Process All Entries | Batch entry processing |
| 12073512 | BRC Entry To Content Mth | Parse JSON to content |
| 12073522 | BRC Process All Contents | Batch content processing |
| 12073538 | Connect Install | Installation logic |
| 12073570 | BRC Process Web Entries | Entry processing coordinator |
| 12073573 | BRC Connect Op Coordinator | Parallel processing coordinator |
| 12073574 | BRC Process Content Operator | Parallel processing worker |

### Document Processing Codeunits

| Codeunit ID | Name | Purpose |
|-------------|------|---------|
| 12073517 | BRC Validate Document Mth | Document validation |
| 12073518 | BRC Create Document Mth | Sales document creation |
| 12073540 | BRC Create Document Line Mth | Sales line creation |
| 12073532 | BRC Create Extended Info Mth | Extended info handling |
| 12073519 | BRC Create Req All Cont Mth | Request builder |

### Customer/Item Management Codeunits

| Codeunit ID | Name | Purpose |
|-------------|------|---------|
| 12073521 | BRC Create Update Customer Mth | Customer create/update |
| 12073523 | BRC Create Update Address Mth | Address handling |
| 12073525 | BRC Validate Customer Mth | Customer validation |
| 12073531 | BRC Create Update Item Mth | Item create/update |
| 12073529 | BRC Validate Item Mth | Item validation |
| 12073533 | BRC Create Update Variant Mth | Variant handling |

### Outbound Sync Codeunits

| Codeunit ID | Name | Purpose |
|-------------|------|---------|
| 12073550 | BRC Send to BC Connect Mth | Outbound coordinator |
| 12073560 | BRC Item to Web Mth | Item master sync |
| 12073561 | BRC Item Inventory to Web Mth | Inventory sync |
| 12073551 | Item Price to Web Mth | Price sync |
| 12073552 | Sales Price to Web Mth | Sales price sync |
| 12073571 | BRC Sales Shipment to Web Mth | Shipment notification |
| 12073576 | BRC Sales Invoice Web Mth | Invoice notification |
| 12073577 | BRC Sales Cr Memo to Web Mth | Credit memo notification |
| 12073547 | BRC Customer to Web Mth | Customer sync |
| 12073562 | BRC Add Record To Web Entry | Queue management |

### Validation Codeunits

| Codeunit ID | Name | Purpose |
|-------------|------|---------|
| 12073526 | BRC Validate Content | Generic validation |
| 12073527 | BRC Validate Cross Ref Mth | Item reference validation |
| 12073528 | BRC Validate Document Line Mth | Line validation |
| 12073530 | BRC Create Update Payment Mth | Payment handling |
| 12073533 | BRC Validate Payment Mth | Payment validation |
| 12073535 | BRC Validate Shipment Mth | Shipment validation |
| 12073539 | BRC Validate Ext Info | Extended info validation |

## Enum Reference

### BRC Content Status

**Values:**
- **New** (0): Downloaded, not yet parsed
- **Read** (1): Parsed into values
- **Validated** (2): Passed validation
- **OK** (3): BC record created successfully
- **Error** (4): Processing failed

### BRC Process Run Status

**Values:**
- **Queued** (0): Entry created, not sent
- **Not Sent** (1): Ready to send
- **Sent and Received** (2): Response received
- **Finished** (3): Processing complete
- **Error** (4): HTTP or processing error

### BRC Service Type

**Values:**
- **Get All** (0): Batch download
- **Get** (1): Single record fetch
- **Create** (2): Create new record
- **Update** (3): Update existing record
- **Delete** (4): Delete record

### BRC Document Type

**Values:**
- **Order** (0): Sales Order
- **Invoice** (1): Sales Invoice
- **Credit Memo** (2): Sales Credit Memo
- **Blanket Order** (3): Sales Blanket Order
- **Return Order** (4): Sales Return Order
- **Quote** (5): Sales Quote
- **Purchase Order** (6): Purchase Order

### BRC Payment Option

**Values:**
- **One Payment** (0): Single payment line
- **Multiple Payments** (1): One line per payment method
- **Add Payment Lines** (2): Payments as sales lines
- **Ignore Payments** (3): Don't process payments

### BRC Inventory Type

**Values:**
- **Real-time** (0): Current on-hand
- **Available** (1): Projected available
- **Grouped by Location** (2): Separate by warehouse
- **Outstanding** (3): On purchase orders

## Page Reference

### Configuration Pages

| Page ID | Page Name | Purpose |
|---------|-----------|---------|
| 12073501 | BRC Connect Setup | Global configuration |
| 12073503 | BRC Connect Type | Entity type configuration |
| 12073505 | BRC Content Type Field Setup | Field mappings |
| 12073507 | BRC Mapping | Value translation |
| 12073520 | BRC Connect Source | Source-specific overrides |

### Operational Pages

| Page ID | Page Name | Purpose |
|---------|-----------|---------|
| 12073500 | BRC Connect Entries | HTTP log |
| 12073502 | BRC Connect Content | Parsed documents |
| 12073504 | BRC Connect Values | Field values |
| 12073511 | BRC Outgoing Synce Queue | Outbound queue |
| 12073514 | BRC Connect Error List | Error dashboard |
| 12073525 | BRC Manual Order | Manual order entry |
| 12073530 | BRC Process Run Logs | Job execution history |

### Supporting Pages

| Page ID | Page Name | Purpose |
|---------|-----------|---------|
| 12073516 | BRC Brands | Brand management |
| 12073517 | BRC Channel | Channel configuration |
| 12073534 | BRC Product Range | Product range setup |

## API Endpoints (External System)

### Required Inbound Endpoints

External systems must provide these endpoints:

| Method | Endpoint | Purpose | BRC Connect Type |
|--------|----------|---------|------------------|
| GET | /documents | Download orders | DOCUMENT |
| GET | /customers | Download customers | CUSTOMER |
| GET | /items | Download items | ITEM |
| POST | /documents/acknowledge | Acknowledge processed | DOCUMENT |

### Required Outbound Endpoints

BRC Connect sends to these endpoints:

| Method | Endpoint | Purpose | BRC Connect Type |
|--------|----------|---------|------------------|
| POST | /inventory | Update stock levels | INVENTORY |
| POST | /prices | Update prices | PRICE |
| POST | /items | Update item master | ITEM |
| POST | /shipments | Notify shipment | SHIPMENT |
| POST | /invoices | Notify invoice | INVOICE |
| POST | /customers | Update customer | CUSTOMER |

### Authentication

**Header:**
```
Authorization: Bearer {token}
```

**Token Configuration:**
- Stored in BRC Connect Setup
- Encrypted in database
- Sent with every HTTP request

## Version History

### Version 25.0.25051.1 (Current)

**Release Date**: 2025 (Build 25051)

**Platform Requirements:**
- Business Central 25.0+
- AL Runtime 12.0
- Cloud only

**Key Features:**
- Bidirectional integration with e-commerce/POS
- Automated order processing pipeline
- Real-time inventory synchronization
- Payment processing integration
- Two-pass identity matching optimization
- Parallel processing support
- Event-driven outbound sync

**Recent Enhancements:**
- Two-pass customer matching for performance
- LoadFields optimization for reduced data transfer
- Enhanced error handling and retry logic
- Improved JSON parsing for large documents

### Upgrade Path

**From Older Versions:**

1. Backup environment
2. Test in sandbox first
3. Upload new .app file
4. Data upgrade codeunit runs automatically
5. Review new configuration options
6. Test key workflows
7. Deploy to production

**Data Migration:**

Codeunit 12073506 (BRCConnectDataupgrade) handles:
- Schema changes
- Default value updates
- Codeunit assignment updates
- New field population

## Support and Resources

### Documentation

- **Primary Docs**: [docs.brightcom.online/brcconnect](https://docs.brightcom.online/brcconnect)
- **Context-Sensitive Help**: F1 in BC opens relevant documentation
- **Privacy Statement**: [brightcom.se/kontakt](https://brightcom.se/kontakt/)

### Support Contacts

- **Publisher**: BrightCom Solutions AB
- **Website**: [brightcom.com](http://www.brightcom.com)
- **Contact**: [brightcom.se/kontakt](https://brightcom.se/kontakt/)

### Technical Support

**Before Contacting Support:**
1. Review [Troubleshooting](../troubleshooting/) guide
2. Check error messages in BRC Connect Error List
3. Verify configuration in BRC Connect Setup
4. Gather environment details (BC version, BRC version)

**Support Request Information:**
- BC environment type (sandbox/production)
- BRC Connect version (25.0.25051.1)
- Error message (exact text)
- Entry No. or Content ID with issue
- Steps to reproduce
- Expected vs. actual behavior

### Community Resources

- BrightCom customer portal
- BC community forums (for BC-related questions)
- Partner network for implementation assistance

## App Metadata

| Property | Value |
|----------|-------|
| **App ID** | a8c23fb1-7a2b-475a-b7b4-38822848f521 |
| **Name** | BRC Connect |
| **Publisher** | BrightCom Solutions AB |
| **Version** | 25.0.25051.1 |
| **Platform** | 25.0.0.0 |
| **Application** | 25.0.0.0 |
| **Runtime** | 12.0 |
| **Target** | Cloud |
| **Object ID Range** | 12073500-12073968 |
| **Brief** | BrightCom's Integration Platform for Web |

### Dependencies

**Base Dependencies:**
- Microsoft Dynamics 365 Business Central (25.0.0.0)

**No External App Dependencies**

### Visible To (Test Apps)

These apps can access BRC Connect internals:

| App ID | Name | Purpose |
|--------|------|---------|
| 774e95a6-f3e0-4be4-924f-13ce93b90a52 | BRC Connect-Diag-Operator | Diagnostic tools |
| 822e60d4-5bcd-4bd6-9544-aa85fb39005d | BRC Connect-Perf | Performance testing |
| ab6a0bdd-902c-4da3-b241-50b51c00f32b | BRC Connect-Test | Automated tests |

## Data Retention

### Automatic Cleanup

Configure automatic deletion of old data:

**BRC Connect Setup:**
- **Delete Content After**: Date formula (e.g., "30D" for 30 days)

**Applies To:**
- BRC Connect Entries
- BRC Connect Content
- BRC Connect Values

**Recommended Settings:**
- **Sandbox**: 7-14 days
- **Production**: 30-90 days
- **High Volume**: 14-30 days

### Manual Cleanup

Run manual cleanup when needed:

1. Open **BRC Connect Content**
2. Filter **Created Date** < cutoff date
3. Filter **Status** = OK (only delete successfully processed)
4. Delete records
5. Related Values auto-delete (cascade)

**Warning**: Don't delete records with Status = Error (may need for troubleshooting)

## Performance Metrics

### Typical Throughput

**Order Processing:**
- Simple orders: 100-200/minute
- Complex orders (10+ lines): 50-100/minute
- Depends on: validation complexity, BC performance, external API speed

**Inventory Sync:**
- Items: 1000-2000/minute
- Depends on: number of locations, BOM complexity

**API Calls:**
- Inbound: 50-100 requests/minute
- Outbound: 100-200 requests/minute
- Rate limiting: Configurable via job queue frequency

### Optimization Tips

1. **Increase Max Count**: Higher Process Entry Max Count = more per run
2. **Parallel Processing**: Multiple job queue entries for same codeunit
3. **Product Range Filtering**: Reduce unnecessary data sync
4. **Batch Acknowledgment**: Acknowledge in batches vs. individual
5. **Off-Peak Processing**: Schedule heavy jobs during low-usage hours

## Next Steps

- [Setup Guide](../setup/) - Configure BRC Connect
- [User Guide](../user-guide/) - Daily operations
- [Troubleshooting](../troubleshooting/) - Problem resolution
- [Integrations](../integrations/) - Integration architecture
