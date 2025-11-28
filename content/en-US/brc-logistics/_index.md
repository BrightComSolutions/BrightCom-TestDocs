---
title: "BRC Logistics"
linkTitle: "Logistics"
weight: 10
type: docs
description: >
  Enterprise-grade WMS integration app connecting Business Central to 35+ third-party warehouse management systems for automated order fulfillment, inventory synchronization, and returns processing.
---

## Overview

BRC Logistics is a comprehensive integration platform that connects Microsoft Dynamics 365 Business Central with third-party warehouse management systems (WMS). The app enables businesses to outsource warehouse operations to 3PL (third-party logistics) providers while maintaining synchronized data between Business Central and the WMS platform.

Built by BrightCom Solutions AB, this app supports **35+ different WMS and returns management platforms**, including major providers like Ongoing WMS, Bitlog, ShipHero, 3PL Central, Logiwa, VeraCore, and many others.

### Business Problem Solved

When companies use external warehouses managed by 3PL providers, they face a critical integration challenge: their Business Central ERP system needs to communicate with warehouse systems that handle physical inventory, order picking, packing, and shipping. Without automation, this requires manual data entry, leading to errors, delays, and inventory discrepancies.

BRC Logistics eliminates manual processes by:

- **Automatically sending sales orders to the WMS** as picking orders
- **Receiving shipment confirmations** with tracking numbers back into Business Central
- **Synchronizing inventory levels** between WMS and Business Central
- **Processing purchase receipts** from warehouse receiving operations
- **Handling customer returns** through integrated returns management platforms
- **Managing item master data** across systems

## Key Features

Based on actual code analysis, BRC Logistics provides these core capabilities:

### **Multi-WMS Support**
- Single app supports 35+ different WMS and returns platforms
- Standardized configuration interface regardless of underlying WMS
- Switch between WMS providers without custom development
- Support for multiple WMS connections per database (multi-location scenarios)

### **Outbound Order Processing (Sales Fulfillment)**
- Automatic transmission of released sales orders to WMS as shipment/picking orders
- Support for drop shipments, assembly-to-order (ATO), and special order types
- Customer master data synchronization
- Configurable auto-posting of sales shipments upon WMS confirmation
- Multi-package shipment tracking with carrier tracking numbers

### **Inbound Order Processing (Purchase Receipts)**
- Automatic transmission of released purchase orders to WMS as receival orders
- Vendor master data synchronization
- Support for prepayment-triggered warehouse notifications
- Serial/lot number tracking from warehouse receipts
- Configurable auto-posting of purchase receipts upon WMS confirmation

### **Returns Management**
- Integration with 8 specialized returns platforms (nShift Return/Returnado, EasyCom, ReclaimIt, TurnR, Yahloh, Sello, Claim Line, Return Center)
- Enhanced return validation (prevents over-return against original invoices)
- Return-to-exchange workflow automation
- Configurable return fees and service item additions
- Return reason code mapping with conditional logic

### **Inventory Synchronization**
- Physical inventory balance sync from WMS to Business Central item journals
- Automatic posting of inventory adjustments
- Real-time inventory movement tracking
- Support for multiple units of measure and item variants
- Item SKU mapping (Item only, Item+Variant, Item+Variant+UoM)

### **Item Tracking Support**
- Serial number synchronization (BC ↔ WMS)
- Lot/batch number synchronization (BC ↔ WMS)
- Package-level tracking for multi-package shipments
- Expiration date tracking
- SSCC (Serial Shipping Container Code) support for logistics labels

### **Advanced Configuration**
- **Over-shipment/receival tolerance** - Accept variance percentages
- **Accumulative quantity handling** - Support partial shipments/receipts
- **Custom field mapping** - Map any BC field to WMS via Extra Fields (1-50)
- **Value translation mapping** - Convert codes between BC and WMS
- **Multiple integration engines per database** - Different WMS per location

### **API Communication Patterns**
The app supports diverse integration methods:
- **REST API with OAuth 2.0** (3PL Central, ShipHero, Bitlog, Logiwa)
- **REST API with Bearer Token** (VeraCore, Mintsoft, Zenventory, Aditro)
- **GraphQL API** (ShipHero)
- **SOAP/XML Web Services** (Ongoing WMS)
- **File-based integration** (BC Connect, Bergendahls via XML/CSV)
- **Business Central OData APIs** (BX Software - reverse integration)

### **Automation & Scheduling**
- **Job Queue integration** - Automated polling every 15 minutes
- Configurable auto-send triggers (on release, on prepayment, manual)
- Configurable auto-posting (shipments, receipts, adjustments)
- Error handling with retry logic and email notifications

### **Audit & Troubleshooting**
- Complete transaction log (all WMS communications)
- Request/response payload storage (XML/JSON)
- Error tracking with line-level detail
- Return/exchange audit trail
- Tracking number history per shipment

## Business Value

### Operational Efficiency
- **Eliminates manual data entry** between Business Central and warehouse systems
- **Reduces order processing time** through automation
- **Prevents inventory discrepancies** with real-time synchronization
- **Accelerates customer shipments** with direct WMS integration

### Flexibility & Scalability
- **Switch 3PL providers** without custom development
- **Scale to multiple warehouses** with multi-location support
- **Expand to new markets** using different regional 3PL providers
- **Add new WMS platforms** through standardized configuration

### Data Accuracy
- **Single source of truth** - Business Central remains the ERP system of record
- **Automatic reconciliation** - Inventory balances sync regularly
- **Tracking number capture** - Customer service has shipment visibility
- **Return validation** - Enhanced checking prevents processing errors

### Cost Reduction
- **Lower IT costs** - No custom integration development required
- **Reduce inventory carrying costs** - Accurate inventory levels
- **Minimize returns processing time** - Automated return-to-exchange workflows
- **Decrease customer service inquiries** - Tracking information automatically updated

## Architecture

### Data Model
BRC Logistics uses a central transaction table (`BRC Logi Warehouse Header`) that stores all communications with WMS platforms. Key tables include:

- **BRC Logi Setup** - Configuration per location/WMS
- **BRC Logi Warehouse Header** - Transaction master records (shipments, receipts, returns, adjustments)
- **BRC Logi Warehouse Line** - Transaction line details (items, quantities, tracking)
- **BRC Logi Warehouse Line Pack.** - Package-level tracking (multi-package shipments)
- **BRC Logi Item SKU** - Item identifier mapping (BC ↔ WMS)
- **BRC Logi Logistics Reason** - Return reason code mapping with conditional logic
- **BRC Logi Mapping** - Generic code translation (locations, statuses, values)
- **BRC Logi Extra** - Custom field mapping configuration

### Integration Events
The app uses Business Central event subscribers to trigger WMS communications:

- `OnAfterReleaseSalesDoc` - Sales order release → Creates WMS shipment order
- `OnAfterReleasePurchaseDoc` - Purchase order release → Creates WMS receival order
- `OnAfterReleaseTransferDoc` - Transfer order release → Creates WMS transfer orders
- `OnBeforePostSalesDoc` - Pre-posting validation (return quantity checks)
- `OnAfterPostSalesDoc` - Post-posting actions (tracking info, return/exchange entries)

### Workflow Patterns

**Outbound Flow:**
```
Sales Order Released → WMS Shipment Request → WMS Picks & Ships →
Shipment Notice from WMS → Update BC Sales Order → Auto-Post Sales Shipment
```

**Inbound Flow:**
```
Purchase Order Released → WMS Receival Request → WMS Receives Items →
Receival Notice from WMS → Update BC Purchase Order → Auto-Post Purchase Receipt
```

**Inventory Sync Flow:**
```
WMS Physical Count → Physical Inventory Balance Message →
Create BC Item Journal → Auto-Post Adjustments
```

## Supported WMS Platforms

### Full WMS Integration (30 platforms)
Ongoing WMS SOAP, Nyce REST API, Alyson, Bitlog, Posti, Aditro Logistics, Bergendahls Foodservice, Extend, 3PL Central, Schipt, ShipHero, BX Software, BC Connect, Speedgroup Astro, VeraCore, SMD, Diracom, Allson, Bluejay, JD Logistics, Bonver, Logiwa, Prime Penguin, QSSI, Nowaste, Stan Robinson, Zenventory, Mintsoft, DSV (Mintsoft-based)

### Returns Management Platforms (8 platforms)
nShift Return (Returnado), EasyCom Return, ReclaimIt Return, Return Center, TurnR Return, Yahloh Return, Claim Line Return, Sello Return

For detailed integration specifications, see [Integrations Documentation](integrations/).

## Getting Started

### Prerequisites
- **Business Central Version**: 24.0 or later
- **Deployment**: Cloud
- **Runtime**: 8.0+
- **Permissions**: SUPER or BRC Lgsts permission set
- **WMS Account**: Active account with supported WMS provider
- **Configuration**: BC location codes, item journal templates, number series

### Quick Start
1. Install BRC Logistics from AppSource or via Extension Management
2. Assign **BRC Lgsts** permission set to users
3. Navigate to **BRC Logi Setup** page
4. Create new setup record with unique code
5. Select **Integration Engine** (your WMS platform)
6. Configure **connection settings** (URL, credentials)
7. Configure **document processing** options (auto-send, auto-post)
8. Activate **job queue entry** for automated polling
9. Mark setup as **Enabled**

Detailed setup instructions: [Setup & Installation Guide](setup/)

## Documentation Sections

<div class="row">
  <div class="col-md-4">
    <h3><a href="setup/">Setup & Installation</a></h3>
    <p>Complete configuration guide including prerequisites, installation steps, connection setup, and initial configuration for all supported WMS platforms.</p>
  </div>
  <div class="col-md-4">
    <h3><a href="user-guide/">User Guide</a></h3>
    <p>Step-by-step workflows for daily operations including order processing, returns management, inventory synchronization, and transaction monitoring.</p>
  </div>
  <div class="col-md-4">
    <h3><a href="integrations/">Integrations</a></h3>
    <p>Detailed specifications for each WMS platform including API methods, authentication, data mappings, and platform-specific configuration.</p>
  </div>
</div>

<div class="row">
  <div class="col-md-4">
    <h3><a href="troubleshooting/">Troubleshooting</a></h3>
    <p>Common issues, error messages, resolution steps, and FAQ for diagnosing and fixing integration problems.</p>
  </div>
  <div class="col-md-4">
    <h3><a href="reference/">Reference</a></h3>
    <p>Technical reference including permission sets, API documentation, data model, field mappings, and release notes.</p>
  </div>
  <div class="col-md-4">
    <h3><a href="https://docs.brightcom.se/sv/Products/BRCLogistics">Official Docs</a></h3>
    <p>BrightCom's official Swedish documentation site (external link).</p>
  </div>
</div>

## Version Information

- **Current Version**: 24.0.26530.1
- **Publisher**: BrightCom Solutions AB
- **App ID**: 82205158-e9c5-466b-8f4a-ad4f6804e613
- **Object Range**: 12073969 - 12074468
- **Target Platform**: Business Central 24.0+ (Cloud)

## Support

### Report Issues
For bugs, feature requests, or integration issues:
- **Privacy Policy**: [https://docs.brightcom.se/sv/PrivacyPolicy/BRCLogistics](https://docs.brightcom.se/sv/PrivacyPolicy/BRCLogistics)
- **EULA**: [https://brightcom.se/EULA/](https://brightcom.se/EULA/)
- **Help**: [https://docs.brightcom.se/sv/Products/BRCLogistics](https://docs.brightcom.se/sv/Products/BRCLogistics)
- **Website**: [https://brightcom.se/](https://brightcom.se/)

### Error Notifications
Configure email notifications in **BRC Logi Setup**:
- Enable **Send mail on Error**
- Configure **Error E-Mail Recipient List**
- Enable **Send E-mail Summary** for daily reports

### Transaction Monitoring
Monitor all WMS communications via:
- **BRC Logi Whse. Transactions** page
- Filter by "Requires Attention" to show errors
- View request/response payloads for troubleshooting
- Track document status through lifecycle

## License

Copyright BrightCom Solutions AB. Licensed under [BrightCom EULA](https://brightcom.se/EULA/).
