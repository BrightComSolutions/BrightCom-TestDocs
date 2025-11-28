---
title: "Integrations"
linkTitle: "Integrations"
weight: 40
description: >
  Detailed specifications for 35+ supported WMS and returns management platform integrations.
---

## Overview

BRC Logistics supports **35 different warehouse management and returns management platforms** through a unified integration architecture. This section provides platform-specific configuration details, API specifications, and integration patterns for each supported system.

## Integration Architecture

All integrations follow a common pattern:

1. **Configuration**: Select Integration Engine in BRC Logi Setup
2. **Auto-Configuration**: System assigns platform-specific codeunits
3. **Connection**: Configure API credentials or file paths
4. **Data Exchange**: Bidirectional synchronization of orders, inventory, and tracking

### Common Integration Components

Regardless of WMS platform, all integrations share:

- **BRC Logi Setup** - Central configuration table
- **BRC Logi Warehouse Header/Line** - Transaction storage
- **Job Queue Scheduler** - Automated polling (default: every 15 minutes)
- **Error handling** - Retry logic, error counting, email notifications
- **Request/Response logging** - Full payload storage for troubleshooting

## Supported Platforms

### Full WMS Integrations (30 Platforms)

These integrations support complete bidirectional workflows including item master data, sales orders, purchase orders, inventory synchronization, and tracking:

| Platform | API Type | Business Processes Supported |
|----------|----------|------------------------------|
| **3PL Central** | REST API + OAuth | Items, Sales Orders, Purchase Orders, Inventory Balance, Adjustments, Shipment/Receival Confirmations |
| **Aditro Logistics** | REST API | Items, Sales Orders, Purchase Orders, Inventory Balance, Stock Movements, Order Confirmations |
| **Allson** | REST/JSON API | Sales Orders, Shipment Confirmations |
| **Alyson** | REST/JSON API | Items, Sales Orders, Purchase Orders, Returns, Inventory Balance, Adjustments, Posted Sales |
| **BC Connect** | File Exchange (XML/CSV) | Shipments, Receipts, Returns, Inventory Balance, Transfer Orders |
| **Bergendahls Foodservice** | File + Web Service Callbacks | Items, Sales Orders, Purchase Orders, Inventory Balance, Adjustments, Customer Parties, Delivery Receipts |
| **Bitlog** | REST API + OAuth (v1-9, v10+) | Items, Customers, Vendors, Sales Orders, Purchase Orders, Inventory Adjustments, Tracking Numbers, Assembly Orders |
| **Bluejay** (formerly 3T) | REST/SOAP API | Transport Management, Supply Chain Visibility |
| **Bonver** | File/API | General WMS Operations |
| **BX Software** | BC OData/REST APIs (Reverse) | Current Inventory, Physical Inventory, Transfers, Shipments, Item References, Employee Data |
| **Diracom** | REST/API | General Logistics Operations |
| **DSV** (Mintsoft-based) | REST API + Token | Items, Sales Orders, Purchase Orders, Inventory |
| **Extend** | REST/API | Extended Warehouse Functionality |
| **JD Logistics** | REST API | Items, Sales Orders, Purchase Orders, Inventory Balance |
| **Logiwa** | REST API + OAuth | Items, Sales Orders, Purchase Orders, Inventory, Shipments, Receipts |
| **Mintsoft** | REST API + Bearer Token | Items, Sales Orders, Purchase Orders, Inventory |
| **Nowaste** | REST API | Waste/Recycling Logistics |
| **Nyce REST API** | REST API | General WMS Operations |
| **Ongoing WMS SOAP** | SOAP/XML Web Services | Items, Sales Orders, Purchase Orders, Returns, Production Orders, Inventory Balance, Adjustments, Item Movements, Proforma Documents |
| **Posti** | REST/API | Parcel Shipping, Logistics |
| **Prime Penguin** | REST API | E-commerce Order Fulfillment |
| **QSSI** | REST/API | General WMS Operations |
| **Schipt** | REST/API | General Logistics |
| **ShipHero** | GraphQL API + OAuth | Items, Sales Orders, Purchase Orders, Inventory Snapshots, Adjustments, E-commerce Fulfillment |
| **SMD** | REST/API | General WMS Operations |
| **Speedgroup Astro** | REST API | Items, Sales Orders, Purchase Orders, Inventory Balance |
| **Stan Robinson** | REST/API | Third-Party Logistics |
| **VeraCore** | REST API + Bearer Token | Items, Sales Orders, Purchase Orders, Inventory |
| **Zenventory** | REST API + Token | Items, Sales Orders, Purchase Orders, Inventory |

### Returns Management Platforms (8 Platforms)

These specialized integrations focus on customer return processing and reverse logistics:

| Platform | API Type | Features |
|----------|----------|----------|
| **Claim Line Return** | REST API | Return Order Management |
| **EasyCom Return** | REST API | Customer Returns, Return Order Management |
| **nShift Return** (Returnado) | REST API | Returns Management, Reverse Logistics |
| **ReclaimIt Return** | REST API | Customer Returns Management |
| **Return Center** | REST API | Returns Processing |
| **Sello Return** | REST API | E-commerce Returns |
| **TurnR Return** | REST API | Return Order Management |
| **Yahloh Return** | REST API | Return Processing |

## Integration Patterns

### API-Based Integrations

**REST API with OAuth 2.0**
- Platforms: 3PL Central, ShipHero, Bitlog, Logiwa
- Authentication: Client credentials flow
- Token Management: Automatic refresh via BRC OAuth Storage codeunits
- Polling: Every 15 minutes for status updates

**REST API with Bearer Token**
- Platforms: VeraCore, Mintsoft, Zenventory, Aditro
- Authentication: Static API key/token
- Token Management: Stored encrypted in setup
- Polling: Every 15 minutes

**GraphQL API**
- Platform: ShipHero (unique)
- Authentication: OAuth 2.0
- Query Language: GraphQL mutations and queries
- Polling: Every 15 minutes

**SOAP/XML Web Services**
- Platform: Ongoing WMS
- Authentication: Username/password in SOAP envelope
- Message Format: SOAP 1.1/1.2 with XML payload
- Polling: Configurable per message type

### File-Based Integrations

**File Exchange**
- Platforms: BC Connect, Bergendahls (partial)
- Methods: FTP, SFTP, Azure Blob Storage, UNC file share
- File Formats: XML, CSV, fixed-width
- Polling: File monitoring with import processing

**Hybrid (File + API)**
- Platform: Bergendahls
- Outbound: File export (XML)
- Inbound: Web service callbacks + file import
- Pattern: BC sends files, WMS calls back with confirmations

### Reverse Integration

**Business Central as API Provider**
- Platform: BX Software
- Pattern: WMS calls Business Central OData/REST APIs
- API Pages: Custom API pages for inventory, shipments, transfers
- Authentication: BC service-to-service authentication

## Business Process Support Matrix

| Process | API Integrations | File Integrations | Returns Platforms |
|---------|------------------|-------------------|-------------------|
| Item Master Data | ✓ | ✓ | ✗ |
| Customer Master Data | ✓ (select platforms) | ✓ | ✗ |
| Vendor Master Data | ✓ (select platforms) | ✗ | ✗ |
| Sales Orders (Outbound) | ✓ | ✓ | ✗ |
| Purchase Orders (Inbound) | ✓ | ✓ | ✗ |
| Return Orders | ✓ (some) | ✓ (some) | ✓ |
| Transfer Orders | ✓ (some) | ✓ | ✗ |
| Shipment Confirmations | ✓ | ✓ | ✗ |
| Receipt Confirmations | ✓ | ✓ | ✗ |
| Inventory Balance Sync | ✓ | ✓ | ✗ |
| Inventory Adjustments | ✓ | ✓ | ✗ |
| Item Movements | ✓ (select platforms) | ✗ | ✗ |
| Serial Number Tracking | ✓ | ✓ | ✗ |
| Lot Number Tracking | ✓ | ✓ | ✗ |
| Multi-Package Shipments | ✓ | ✓ | ✗ |
| Tracking Numbers | ✓ | ✓ | ✓ |
| Assembly Orders | ✓ (Bitlog, others) | ✗ | ✗ |
| Production Orders | ✓ (Ongoing WMS) | ✗ | ✗ |
| Proforma Documents | ✓ (Ongoing WMS) | ✗ | ✗ |

## Platform-Specific Documentation

Detailed configuration guides for major platforms:

### Top Platforms

- [Ongoing WMS SOAP](ongoing-wms/) - Most comprehensive SOAP integration
- [Bitlog](bitlog/) - Popular European WMS with version-specific config
- [3PL Central](3pl-central/) - OAuth-based cloud WMS
- [ShipHero](shiphero/) - GraphQL-based e-commerce fulfillment
- [Logiwa](logiwa/) - Cloud fulfillment platform

### Additional Platforms

- [Aditro Logistics](aditro/)
- [Alyson](alyson/)
- [BC Connect](bc-connect/) - File-based integration
- [Bergendahls](bergendahls/) - Hybrid file/API integration
- [BX Software](bx-software/) - Reverse integration pattern
- [Mintsoft](mintsoft/) - Cloud WMS
- [VeraCore](veracore/) - Cloud WMS
- [Zenventory](zenventory/) - Inventory and order management

### Returns Platforms

- [nShift Return (Returnado)](nshift-return/)
- [EasyCom Return](easycom-return/)
- [ReclaimIt Return](reclaimit-return/)

## Configuration Quick Reference

### Common Configuration Fields

All API-based integrations use these fields:

| Field | Purpose | Example Value |
|-------|---------|---------------|
| Integration Engine | Select WMS platform | "Ongoing WMS SOAP" |
| Webservice URL / Export Path | API endpoint | `https://api.ongoingwms.com/` |
| Username / Key | API username or client ID | `your-company` |
| Password | API password or secret | `•••` |

### OAuth Integrations Additional Fields

| Field | Purpose | Platforms |
|-------|---------|-----------|
| OAuth Scope | OAuth 2.0 scope | 3PL Central, ShipHero, Bitlog, Logiwa |

### File Integrations Additional Fields

| Field | Purpose | Platforms |
|-------|---------|-----------|
| ABS Container Name | Azure Blob Storage container | BC Connect, others |
| Webservice URL / Import Path | Import file path/container | BC Connect, Bergendahls |

### Platform-Specific Fields

Some platforms have unique configuration fields:

**Ongoing WMS:**
- Ongoing Whse. ID
- Ongoing Goods Owner ID
- Check for Shipment/Receival/Return/Inventory Updates (individual toggles)

**Bitlog:**
- BRC Bitlog Version (1-9 vs 10+)
- BRC Bitlog WMS API Url
- BRC Bitlog WMS Username/Password (WMS credentials)
- BRC Bitlog ERP Client ID/Secret (OAuth for BC → Bitlog)

**3PL Central:**
- 3PL User Login ID
- 3PL TPL (Third-Party Logistics ID)

**Nyce:**
- Check For Returns From Nyce
- Nyce Integration Type
- Nyce Integration Prefix
- Nyce EAN From GTIN

## Testing Your Integration

### Pre-Go-Live Checklist

- [ ] Test account configured in WMS
- [ ] API credentials validated (test connection successful)
- [ ] Item SKU generation tested
- [ ] Test sales order sent and confirmed
- [ ] Test purchase order sent and confirmed
- [ ] Inventory balance sync tested
- [ ] Tracking number capture verified
- [ ] Auto-posting tested (if enabled)
- [ ] Error notification email received and tested
- [ ] Job queue scheduled and running

### Test Scenarios

1. **Simple Sales Order**: Single item, single line, no tracking
2. **Multi-Line Sales Order**: Multiple items, verify all lines process
3. **Serial Tracked Sales Order**: Verify serial numbers sync correctly
4. **Lot Tracked Sales Order**: Verify batch numbers sync correctly
5. **Purchase Order Receipt**: Verify receipt updates purchase order
6. **Over-Receipt Scenario**: Test tolerance settings
7. **Inventory Adjustment**: Verify item journal creation and posting
8. **Return Order**: Test return workflow end-to-end
9. **Error Scenario**: Force error, verify email notification, test retry
10. **Multi-Package Shipment**: Verify all packages/tracking numbers captured

## Troubleshooting Integration Issues

Common issues across all platforms:

### Authentication Failures
- **Symptom**: "401 Unauthorized" or "403 Forbidden" errors
- **Resolution**: Verify credentials, check token expiration (OAuth), confirm API access enabled in WMS

### Connection Timeouts
- **Symptom**: "Request timeout" errors
- **Resolution**: Check WMS API status, verify network connectivity, confirm firewall rules

### Data Mapping Issues
- **Symptom**: Items not found in WMS, incorrect quantities
- **Resolution**: Review Item SKU list, verify variant delimiter settings, check unit of measure mappings

### Tracking Number Issues
- **Symptom**: Tracking numbers not captured in BC
- **Resolution**: Verify WMS sends tracking in response, check field mapping, review package creation logic

See [Troubleshooting Guide](../troubleshooting/) for detailed resolution steps.

## Adding New Integrations

BRC Logistics is regularly updated with new platform support. To request a new integration:

1. Contact BrightCom Solutions with WMS platform details
2. Provide API documentation from WMS vendor
3. Coordinate test account access
4. Participate in UAT testing
5. Receive updated app version with new Integration Engine option

## Next Steps

- [Setup Your Integration](../setup/configuration/)
- [Platform-Specific Guides](ongoing-wms/) (choose your platform)
- [Troubleshooting Integration Issues](../troubleshooting/)
- [User Guide for Daily Operations](../user-guide/)
