---
title: "Reference"
linkTitle: "Reference"
weight: 60
description: >
  Technical reference documentation including permissions, data model, field mappings, and release notes.
---

## Overview

This section provides technical reference information for BRC Logistics including:

- Permission sets and security model
- Data model and table structures
- Field mappings and extra fields
- API reference (for supported platforms)
- Release notes and version history

## Permission Sets

### BRC Lgsts (Object ID: 12073969)

**Permission Set Type**: Assignable

**Purpose**: Grants full access to BRC Logistics functionality

**Permissions Granted**:

#### Table Permissions (RIMD = Read, Insert, Modify, Delete)

| Table Name | Object ID | Permissions |
|------------|-----------|-------------|
| BRC Logi Extra | 12073974 | RIMD |
| BRC Logi Item SKU | 12073972 | RIMD |
| BRC Logi Logistics Reason | 12073973 | RIMD |
| BRC Logi Mapping | 12073976 | RIMD |
| BRC Logi Return Exchange Entry | 12073969 | RIMD |
| BRC Logi Sales Shpmt. Tr. Info | 12073975 | RIMD |
| BRC Logi Setup | 12073979 | RIMD |
| BRC Logi Warehouse Header | 12073970 | RIMD |
| BRC Logi Warehouse Header Req. | 12073978 | RIMD |
| BRC Logi Warehouse Line | 12073971 | RIMD |
| BRC Logi Warehouse Line Pack. | 12073977 | RIMD |

#### Codeunit Permissions (X = Execute)

All codeunits in object range 12073969-12074468 granted Execute (X) permission.

**Key Codeunits Include**:
- BRC Logi Install (12073980) - Installation and upgrade
- BRC Logi Whse. Job Scheduler (12073990) - Job queue scheduler
- BRC Logi Create Ship Req. (12073981) - Sales order shipment requests
- BRC Logi Create Rec Req. (12073979) - Purchase order receival requests
- BRC Logi Update Item Balance (12073983) - Inventory synchronization
- BRC Logi Update Item Adj. (12073982) - Inventory adjustments
- Plus 400+ integration-specific codeunits

#### Page Permissions (R = Read)

All pages in object range granted Read permission (users access through table permissions).

### Custom Permission Sets

Organizations can create custom permission sets for specific roles:

**Warehouse Monitor** (Read-Only):
- Read permission on BRC Logi Warehouse Header, Line, Setup
- No Insert/Modify/Delete permissions
- Execute permission on viewing actions only

**Order Processor**:
- BRC Lgsts permission set
- Plus Sales/Purchase Order posting permissions

## Data Model

### Core Tables

#### BRC Logi Setup (Table 12073979)
**Purpose**: Configuration table for WMS integrations

**Primary Key**: Code

**Key Fields**:
- Code (Code[20]) - Unique setup identifier
- Integration Engine (Enum) - WMS platform selection
- Location Code (Code[20]) - Associated BC location
- Enabled (Boolean) - Activates integration
- Webservice URL / Export Path (Text[500]) - API endpoint or file path
- Username / Key (Text[500]) - Authentication username or API key
- Password (Text[500]) - Authentication password or secret (encrypted)
- Item SKU Option (Enum) - Item identification scheme
- Auto-Send flags - Automation triggers
- Post Shipment/Receival (Boolean) - Auto-posting controls
- Error Max Count (Integer) - Error threshold
- Send mail on Error (Boolean) - Email notifications

**Related Tables**:
- Location (standard BC)
- BRC Logi Mapping (value translations)
- BRC Logi Extra (field mappings)

---

#### BRC Logi Warehouse Header (Table 12073970)
**Purpose**: Master transaction record for all WMS communications

**Primary Key**: Document Type, No.

**Key Fields**:
- Document Type (Enum) - Transaction type (Shipment Order/Notice, Receival Order/Notice, etc.)
- No. (Code[20]) - Unique transaction number
- Logistics Code (Code[20]) - Links to BRC Logi Setup
- Document Status (Enum) - Lifecycle status
- Warehouse Date Time (DateTime) - WMS timestamp
- Applies-to Document Type/No. (Enum/Code[20]) - Source BC document
- Customer/Vendor No., Name, Address - Party information
- Error Count (Integer), Error Description (Text[250]) - Error tracking
- Extra Fields 1-50 (Text/DateTime) - Custom WMS data

**Document Types**:
- Shipment Order, Shipment Notice
- Receival Order, Receival Notice
- Return Order
- Item Balance, Item Adjustment, Item Movement
- Item Request, Customer Request, Vendor Request

**Document Statuses**:
- New Request, Document Not Sent, Sent to WMS, Acknowledged
- Shipment/Receival Finished, Closed, Cancelled

**Related Tables**:
- BRC Logi Warehouse Line (1:N)
- BRC Logi Warehouse Header Req. (1:1) - Request/response storage
- Sales/Purchase/Transfer Headers (standard BC)

---

#### BRC Logi Warehouse Line (Table 12073971)
**Purpose**: Line-level details for warehouse transactions

**Primary Key**: Document Type, Document No., Line No.

**Key Fields**:
- Item No., Variant Code, Unit of Measure Code - Item identification
- Original Quantity (Decimal) - Requested quantity
- Handled Quantity (Decimal) - WMS actual quantity
- Series No., Batch No. - Item tracking
- Applies-to Table/Document Type/Document No./Line No. - Source BC line
- Reason Code - Return/adjustment reason
- Exchange Item No., Exchange Variant Code - Return exchange info
- Extra Fields 1-30 (Text) - Custom line data

**Related Tables**:
- BRC Logi Warehouse Header (N:1)
- BRC Logi Warehouse Line Pack. (1:N) - Package tracking
- Sales/Purchase/Transfer Lines (standard BC)

---

#### BRC Logi Warehouse Line Pack. (Table 12073977)
**Purpose**: Package-level tracking for multi-package shipments

**Primary Key**: Document Type, Document No., Line No., Package No

**Key Fields**:
- Package No (Integer) - Package sequence number
- Tracking No., Tracking Link (Text) - Carrier tracking
- Container No. (Code[50]) - Physical container ID
- Series No., Batch No. - Item tracking per package
- Weight, Length, Width, Height - Physical dimensions
- SSCC codes - GS1 logistics labels

**Related Tables**:
- BRC Logi Warehouse Line (N:1)

---

#### BRC Logi Item SKU (Table 12073972)
**Purpose**: Maps BC items to WMS SKU identifiers

**Primary Key**: Item No., Variant Code, Unit of Measure Code, Logistics Code

**Key Fields**:
- Stock Keeping Unit (Text[100]) - Generated WMS SKU
- Description (Text[100]) - Item description

**SKU Generation Rules**:
- Item only: `ITEM001`
- Item + Variant: `ITEM001-BLUE` (delimiter configurable)
- Item + Variant + UoM: `ITEM001-BLUE-BOX`

---

#### BRC Logi Logistics Reason (Table 12073973)
**Purpose**: Reason code mapping with conditional logic

**Primary Key**: Code

**Key Fields**:
- Code (Code[20]) - WMS reason code
- Return Reason Code (Code[20]) - BC return reason mapping
- Add Fee on Return (Boolean) - Automatic fee addition
- Return Fee Condition (TableView) - Conditional fee logic
- Special Return Item (Code[20]) - Substitute item for specific reasons
- Trigger Exchange of Item (Boolean) - Auto-exchange flag
- Set Zero Unit Price (Boolean) - Pricing override

---

#### BRC Logi Mapping (Table 12073976)
**Purpose**: Generic value translation between BC and WMS

**Primary Key**: Code, Incoming Value

**Key Fields**:
- Code (Code[20]) - Mapping category
- Incoming Value (Text[100]) - WMS value
- Outgoing Value (Text[100]) - BC value

**Usage**: Location codes, status values, custom code translations

---

#### BRC Logi Extra (Table 12073974)
**Purpose**: Configuration for custom field mapping

**Primary Key**: Document Type, Header/Line, Entry No., Logistics Code

**Key Fields**:
- Table No., Field No. (Integer) - Source BC field
- Field No. on Whse. Table (Integer) - Destination Extra Field (1-50)
- WMS Field Name (Text[250]) - XML/JSON element name
- Map Value Code (Code[20]) - Optional value translation
- Combine Value (Boolean) - Concatenation support

---

### Supporting Tables

**BRC Logi Return Exchange Entry** (12073969)
- Audit log for return-to-exchange transactions
- Links original invoices, returns, and exchange orders

**BRC Logi Sales Shpmt. Tr. Info** (12073975)
- Supplemental tracking information for posted sales documents
- Multiple tracking entries per shipment for multi-package scenarios

**BRC Logi Warehouse Header Req.** (12073978)
- Stores raw XML/JSON request and response payloads (BLOB fields)
- Used for troubleshooting and audit trail

## Field Mappings

### Extra Fields

**Warehouse Header Extra Fields**:
- Extra Field Text 1-25 (Text[250])
- Extra Field Text 26-50 (Text[250])
- Extra Field DateTime 1-2 (DateTime)

**Warehouse Line Extra Fields**:
- Extra Field Text 1-30 (Text[250])

**Configuration**: Use BRC Logi Extra table to map BC fields to Extra Fields

**Example Mapping**:
- BC Field: Sales Header."Your Reference"
- WMS Field Name: "CustomerPO"
- Extra Field: Extra Field Text 1

### Standard Field Mappings

**Sales Order → Shipment Order**:
| BC Field | WMS Field | Notes |
|----------|-----------|-------|
| Sell-to Customer No. | Customer No. | |
| Sell-to Customer Name | Customer Name | |
| Ship-to Address | Delivery Address | |
| Shipment Date | Requested Shipment Date | |
| External Document No. | Customer PO | |
| Shipping Agent Code | Carrier Code | Via mapping table |

**Purchase Order → Receival Order**:
| BC Field | WMS Field | Notes |
|----------|-----------|-------|
| Buy-from Vendor No. | Supplier No. | |
| Buy-from Vendor Name | Supplier Name | |
| Expected Receipt Date | Expected Receival Date | |
| Vendor Invoice No. | Supplier Invoice | |

**Item → Product Master**:
| BC Field | WMS Field | Notes |
|----------|-----------|-------|
| No. | Item No. | Via Item SKU table |
| Description | Product Description | |
| Base Unit of Measure | UoM | |
| GTIN | Barcode | If configured |
| Item Category Code | Product Category | Via mapping |

## Integration Events

BRC Logistics publishes and subscribes to integration events for extensibility:

### Published Events

**OnBeforeCreateShipmentRequest**
- Event Publisher: BRCLogiCreateShipReq codeunit
- Parameters: Sales Header, BRC Logi Warehouse Header
- Purpose: Customize shipment request before creation

**OnAfterCreateShipmentRequest**
- Event Publisher: BRCLogiCreateShipReq codeunit
- Parameters: Sales Header, BRC Logi Warehouse Header
- Purpose: Post-creation customization

**OnBeforeProcessShipmentNotice**
- Event Publisher: LogiUpdShpmtToDoc codeunit
- Parameters: BRC Logi Warehouse Header, Sales Header
- Purpose: Pre-processing validation or customization

**OnAfterProcessShipmentNotice**
- Event Publisher: LogiUpdShpmtToDoc codeunit
- Parameters: BRC Logi Warehouse Header, Sales Header
- Purpose: Post-processing actions

### Subscribed Events

**OnAfterReleaseSalesDoc** (Codeunit 414)
- Subscriber: BRCLogiWhseConnectEvents codeunit
- Action: Creates shipment/receival request to WMS

**OnAfterReleasePurchaseDoc** (Codeunit 415)
- Subscriber: BRCLogiWhseConnectEvents codeunit
- Action: Creates receival/shipment request to WMS

**OnBeforePostSalesDoc** (Codeunit 80)
- Subscriber: BRCLogiWhseConnectEvents codeunit
- Action: Return validation and exchange checks

**OnAfterPostSalesDoc** (Codeunit 80)
- Subscriber: BRCLogiWhseConnectEvents codeunit
- Action: Creates return/exchange entries, copies tracking info

## API Reference

### BX Software API Pages

BRC Logistics includes API pages for reverse integration (WMS calls BC):

**BRC BXSoftware Current Inv Api** (Page 12074245)
- Endpoint: `/api/brc/v1.0/currentInventory`
- Method: GET
- Returns: Current inventory levels

**BRC BXSoftware Physical Inv Api** (Page 12074251)
- Endpoint: `/api/brc/v1.0/physicalInventory`
- Method: GET, POST
- Purpose: Physical inventory journal integration

**BRC BXSoftware Whouse Out Api** (Page 12074257)
- Endpoint: `/api/brc/v1.0/warehouseOutbound`
- Method: GET, POST
- Purpose: Outbound warehouse shipments

**BRC BXSoftware Whouse Trans Api** (Page 12074258)
- Endpoint: `/api/brc/v1.0/warehouseTransfer`
- Method: GET, POST
- Purpose: Warehouse transfer orders

**BRC BXSoftware Item Reference** (Page 12074246)
- Endpoint: `/api/brc/v1.0/itemReference`
- Method: GET
- Purpose: Item cross-reference lookup

**BRC BXSoftware Employee Api** (Page 12074244)
- Endpoint: `/api/brc/v1.0/employees`
- Method: GET
- Purpose: Employee/user data for WMS

### Authentication

API pages use standard Business Central OAuth 2.0 or Basic authentication.

## Enums

### Integration Engine (Enum ID varies by version)
Values (partial list):
- Ongoing WMS SOAP
- Nyce REST API
- Bitlog
- Aditro Logistics
- 3PL Central
- ShipHero
- Logiwa
- VeraCore
- Mintsoft
- (30+ total values)

### Document Type
Values:
- Shipment Order
- Shipment Notice
- Receival Order
- Receival Notice
- Return Order
- Item Balance
- Item Adjustment
- Item Movement
- Item Request
- Customer Request
- Vendor Request
- Assembly Order
- Posted Sales Request

### Document Status
Values:
- New Request
- Document Not Sent
- Sent to WMS
- Acknowledged
- In Progress
- Shipment/Receival Finished
- Closed
- Cancelled
- Error

### Item SKU Option
Values:
- Item only
- Item + Variant
- Item + Variant + UoM

## Release Notes

### Version 24.0.26530.1 (Current)

**Platform Requirements**:
- Business Central 24.0+
- Runtime 8.0
- Cloud deployment only

**New Features**:
- Enhanced return validation
- Multi-package tracking improvements
- Additional WMS platform support
- OAuth token refresh optimization

**Bug Fixes**:
- Improved error handling for timeout scenarios
- Fixed item tracking synchronization edge cases
- Corrected unit of measure conversion rounding

**Migrations**:
- OnUpgrade: Migrates `Use Item Variants` to `Item SKU Option` enum
- OnUpgrade: Migrates `Add Return of Sev. Items` to `Return of Sev. Item Option` enum

### Previous Versions

Contact BrightCom Solutions for detailed release history.

## Technical Specifications

**Object ID Range**: 12073969 - 12074468

**Supported BC Versions**: 24.0+

**Deployment**: Cloud (SaaS) only

**Runtime**: 8.0

**Dependencies**: None (standalone app)

**Application Insights**: Enabled (connection string in app.json)

**Translation Support**: TranslationFile feature enabled

**Debugging**: Allowed (resourceExposurePolicy.allowDebugging = true)

## Developer Extensions

### Extending BRC Logistics

**Recommended Extension Points**:
1. Subscribe to integration events (OnBefore/OnAfter)
2. Create custom field mappings via BRC Logi Extra
3. Extend Item SKU generation logic
4. Customize value mappings in BRC Logi Mapping

**Not Recommended**:
- Modifying core BRC Logistics tables (use extra fields instead)
- Overriding core codeunits (use events)
- Directly accessing WMS APIs (use BRC framework)

## Support Resources

- **Official Documentation**: [https://docs.brightcom.se/sv/Products/BRCLogistics](https://docs.brightcom.se/sv/Products/BRCLogistics)
- **Privacy Policy**: [https://docs.brightcom.se/sv/PrivacyPolicy/BRCLogistics](https://docs.brightcom.se/sv/PrivacyPolicy/BRCLogistics)
- **EULA**: [https://brightcom.se/EULA/](https://brightcom.se/EULA/)
- **Publisher Website**: [https://brightcom.se/](https://brightcom.se/)

## Next Steps

- [Setup Guide](../setup/) - Installation and configuration
- [User Guide](../user-guide/) - Daily operations
- [Integrations](../integrations/) - Platform-specific details
- [Troubleshooting](../troubleshooting/) - Issue resolution
