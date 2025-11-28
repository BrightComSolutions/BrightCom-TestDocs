---
title: "BRC Connect"
linkTitle: "Connect"
weight: 10
type: docs
description: >
  Integration platform connecting Business Central to e-commerce platforms and POS systems through standardized setup and automated data synchronization.
---

## Overview

BRC Connect is a comprehensive integration platform for Microsoft Dynamics 365 Business Central that enables seamless connectivity with various e-commerce platforms and POS systems. The app provides bidirectional data synchronization, automated order processing, and real-time inventory management.

### Supported Platforms

BRC Connect integrates with leading e-commerce and retail systems including:
- **Shopify** - E-commerce platform
- **Storm** - E-commerce platform
- **Litium** - E-commerce platform
- **Sitoo** - POS system
- **Generic JSON APIs** - Flexible integration with custom systems

## Key Features

### Order Management
- **Automated Order Download**: Retrieves orders from external systems and creates Sales Orders, Invoices, Credit Memos, and Return Orders in Business Central
- **Document Processing Pipeline**: Four-stage processing (Download → Parse → Validate → Create) with granular automation control
- **Multiple Payment Methods**: Supports single/multiple payments, PSP integration, and payment journal posting
- **Smart Customer Matching**: Two-pass identity matching using email, phone, or web ID with automatic customer creation
- **Total Validation**: Configurable tolerance checking with automatic rounding adjustment lines

### Inventory Synchronization
- **Real-Time Inventory**: Automatic updates to external systems when BC inventory changes
- **Multiple Inventory Types**: Real-time, available, projected, grouped by location
- **BOM Support**: Virtual inventory calculation for Bill of Materials items
- **Outstanding Orders**: Tracks incoming shipments and expected delivery dates

### Price Management
- **Bidirectional Price Sync**: Sales prices, purchase prices, and price list lines
- **Minimum Quantity Pricing**: Supports tiered pricing structures
- **Product Range Filtering**: Control which items sync to specific channels
- **Multi-Channel Support**: Separate pricing for different sales channels

### Item Master Data
- **Complete Item Sync**: Item details, variants, references, unit of measure
- **Item References**: Cross-reference management, barcode support
- **Parent-Child Relationships**: Product hierarchy with variants
- **Automatic Creation**: Auto-create items from incoming orders

### Document Notifications
- **Shipment Notifications**: Automatic posting of sales shipments to external systems
- **Invoice Updates**: Send posted invoice details with payment status
- **Credit Memo Processing**: Return and refund notifications
- **Transfer Orders**: Multi-location inventory movements

### Flexible Configuration
- **Granular Automation**: Individual on/off switches for each process step
- **Source-Specific Overrides**: Different settings per integration source
- **Field Mapping**: JSON path to BC field mapping with validation rules
- **Extended Info**: Custom field mapping for platform-specific data

## Business Value

### Operational Efficiency
- **Eliminates Manual Data Entry**: Orders flow automatically from web/POS to Business Central
- **Reduces Errors**: Validation rules and duplicate detection prevent data quality issues
- **Saves Time**: Automated inventory and price updates keep systems synchronized

### Multi-Channel Commerce
- **Unified Operations**: Manage all sales channels from Business Central
- **Consistent Data**: Single source of truth for items, pricing, and inventory
- **Scalability**: Process high volumes with performance optimizations and parallel processing

### Business Flexibility
- **Rapid Integration**: Standardized setup reduces implementation time
- **Extensibility**: Event-driven architecture supports custom modifications
- **Platform Independence**: Generic JSON API support enables integration with any system

## Architecture Overview

BRC Connect uses a sophisticated multi-layer architecture:

1. **HTTP Transport Layer**: RESTful API communication with bearer token authentication
2. **Content Processing Layer**: JSON parsing into hierarchical content and key-value structures
3. **Validation Layer**: Configurable business rules with error tracking
4. **Business Logic Layer**: Entity creation/update with BC integration
5. **Outbound Queue**: Event-driven sync when BC data changes

## Getting Started

To begin using BRC Connect:

1. Review [Prerequisites](setup/prerequisites) for system requirements
2. Follow the [Installation Guide](setup/installation) to deploy the app
3. Complete [Initial Configuration](setup/configuration) with API credentials and field mappings
4. Explore [User Guide](user-guide/) for daily operations

## Documentation Sections

{{< cardpane >}}
{{< card header="**Setup & Installation**" >}}
Complete setup guide including prerequisites, installation steps, and initial configuration with API credentials and field mappings.
{{< /card >}}

{{< card header="**User Guide**" >}}
Daily operations including order processing, inventory management, error handling, and manual order creation workflows.
{{< /card >}}

{{< card header="**Integrations**" >}}
Integration architecture, Business Central touchpoints, external system connections, and API reference documentation.
{{< /card >}}

{{< card header="**Troubleshooting**" >}}
Common issues, error messages, diagnostic tools, and frequently asked questions with solutions.
{{< /card >}}

{{< card header="**Reference**" >}}
Technical reference including permissions, API documentation, data models, and release notes for version tracking.
{{< /card >}}
{{< /cardpane >}}

## Support

For technical support and assistance:

- **Documentation**: [docs.brightcom.online/brcconnect](https://docs.brightcom.online/brcconnect)
- **Publisher**: BrightCom Solutions AB
- **Contact**: [brightcom.se/kontakt](https://brightcom.se/kontakt/)
- **App Version**: 25.0.25051.1
- **BC Platform**: 25.0.0.0 (Cloud)

## Quick Reference

| Feature | Page/Action |
|---------|-------------|
| Download Orders | BRC Connect Entries → Get All Documents |
| View Orders | BRC Connect Content |
| Process Orders | BRC Process All Contents (Job Queue) |
| Outbound Queue | BRC Outgoing Sync Queue |
| Error List | BRC Connect Error List |
| Setup | BRC Connect Setup |
| Field Mappings | BRC Content Type Field Setup |
| Manual Orders | BRC Manual Order |
