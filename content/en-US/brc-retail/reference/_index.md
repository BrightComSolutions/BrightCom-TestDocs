---
title: "Reference"
linkTitle: "Reference"
weight: 60
description: >
  Technical reference documentation for BRC Retail Extension including permissions, API reference, field definitions, and release notes.
---

## Reference Documentation Overview

This section provides comprehensive technical reference information for BRC Retail Extension, including detailed object information, permission requirements, API documentation, and version history.

## Documentation Sections

### [Permissions](permissions.md)
Complete permission requirements and security model:
- Detailed permission set breakdown
- Object-level permissions
- User role assignments
- Security best practices

### [API Reference](api-reference.md)  
Technical API documentation for integration:
- Web service endpoints
- Data structures and schemas
- Authentication requirements
- Integration examples

### [Release Notes](release-notes.md)
Version history and change documentation:
- Feature additions and enhancements
- Bug fixes and improvements
- Breaking changes and migration notes
- Upgrade procedures

## Object Reference Summary

### Tables (17 objects)
BRC Retail Extension includes comprehensive data structures:

**Core Variant Management:**
- `BRC Retail Setup` (12097620): Main configuration table
- `BRC Retail Variant` (12097621): Variant dimension definitions
- `BRC Retail Variant Value` (12097622): Specific values within dimensions
- `BRC Retail Variant Template` (12097623): Item variant structure blueprints

**Item and Variant Relationships:**
- `BRC Retail Item Variant` (12097624): Item-specific variant assignments
- `BRC Retail Item Brand` (12097625): Brand classification
- `BRC Retail Season` (12097626): Seasonal management
- `BRC Retail Order Type` (12097627): Order classification

**Document Integration:**
- `BRC Retail Doc. Line Item Var.` (12097628): Document line variant details
- `BRC Matrix Source Doc. Line` (12097629): Matrix report source data
- `BRC Matrix Group Line` (12097630): Matrix grouping calculations

**Supporting Structures:**
- `BRC Retail Code 128/39` (12097631): Barcode management
- `BRC Retail Delivery Season` (12097632): Delivery scheduling
- `BRC Retail Ordering Terms` (12097633): Purchase terms
- `BRC Retail Item UoM` (12097634): Unit of measure extensions
- `BRC Retail Variant Translation` (12097635): Multi-language support
- `BRC Retail Var. Val. Transl.` (12097636): Variant value translations

### Pages (16 objects)
User interface components for variant management:

**Setup and Configuration:**
- `BRC Retail Setup` (12097620): Main setup page
- `BRC Retail Variant Template` (12097621): Template management
- `BRC Retail Variant List` (12097622): Variant dimension management

**Daily Operations:**
- `BRC Retail Item Variants` (12097623): Item-specific variant management
- `BRC Retail Variant Value List` (12097624): Variant value maintenance
- `BRC Retail Doc. Line Item Var.` (12097625): Document line variant details

**Matrix Views:**
- `BRC Retail Var by Loc. Matrix` (12097626): Inventory matrix view
- `BRC Retail Var. by Location` (12097627): Location-specific inventory

**Supporting Pages:**
- `BRC Retail Seasons` (12097628): Season management
- `BRC Retail Item Brand List` (12097629): Brand management
- `BRC Retail Order Types` (12097630): Order type maintenance
- `BRC Retail Item UoM` (12097631): Unit of measure management
- `BRC Retail Variant Transl.` (12097632): Translation management
- `BRC Retail Itm Var. Val. Trans` (12097633): Variant value translations
- `BRC Retail Delivery Season` (12097634): Delivery season setup
- `BRC Retail Item Ref. Entries` (12097635): Item reference management

### Codeunits (15 objects)
Business logic and processing components:

**Core Processing:**
- `BRC Retail Crt. Var. from Item` (12097619): Automatic variant creation
- `BRC Retail Matrix Calculation` (12097630): Matrix report calculations
- `BRC Retail Barcode Mgt.` (12097631): Barcode generation and management

**Event Integration:**
- `BRC Retail Item Event Subs.` (12097632): Item management events
- `BRC Retail Sales Order Subs.` (12097633): Sales order processing events
- `BRC Retail Purch. Order Subs.` (12097634): Purchase order processing events

**Document Processing:**
- `BRC Retail Sales Line Var Mt.` (12097635): Sales line variant management
- `BRC Retail Purch Line Item Mt` (12097636): Purchase line variant management
- `BRC Retail Tran Lne Itm Var Mt` (12097637): Transfer line variant management

**Specialized Functions:**
- `BRC Retail Del Season Mgt.` (12097638): Delivery season calculations
- `BRC Retail Var. Cap. Class Mgt` (12097639): Variant capacity management
- `BRC Retail Item Inv. Upd WS` (12097640): Web service integration
- `BRC Retail Solution Upgrade` (12097641): Version upgrade management
- `BRC Retail Sales Event Subs.` (12097642): Sales event subscribers
- `BRC Retail Install` (12097643): Installation procedures

### Reports (8 objects)
Specialized reporting capabilities:

**Matrix Reports:**
- `BRC Retail Matrix Sales Order` (12097619): Sales order matrix format
- `BRC Retail Matrix Sales Inv.` (12097620): Sales invoice matrix format  
- `BRC Retail Matrix Purch. Order` (12097621): Purchase order matrix format

**Inventory Reports:**
- `BRC Retail Inventory Valuation` (12097622): Variant inventory valuation
- `BRC Retail Phys. Inv. List` (12097623): Physical inventory with variants

**Barcode Reports:**
- `BRC Retail ItmVar Multi 55x25` (12097624): Item variant barcode labels
- `BRC Retail Wh. Act. Barc 55x25` (12097625): Warehouse activity barcodes

**Export Reports:**
- `BRC Retail Export Price` (12097626): Price export for external systems

### Enumerations (6 objects)
Type definitions and option sets:

- `BRC Retail Variant Type` (12097622): Size, Colour, Length, General
- `BRC Retail EAN Check Digit` (12097623): Check digit calculation methods
- `BRC Retail Del S Calc D Basis` (12097624): Delivery season date basis
- `BRC Retail Variant Desc` (12097625): Variant description options
- `BRC Retail Var Sort Order` (12097626): Variant sorting configurations
- `BRC Matrix Line Type` (12097627): Matrix line type classifications

### Queries (1 object)
Data access optimizations:

- `BRC Retail ItemBalance by Var.` (12097619): Optimized variant inventory queries

### Table Extensions (23 objects)
Extensions to standard Business Central tables:

**Item Management:**
- Item, Item Variant, Item Reference, Item Unit of Measure, Stock Keeping Unit

**Sales Documents:**
- Sales Header, Sales Line, Sales Invoice Header, Sales Invoice Line
- Sales Credit Memo Header, Sales Credit Memo Line
- Sales Shipment Header, Sales Shipment Line

**Purchase Documents:**
- Purchase Header, Purchase Line, Purchase Invoice Header, Purchase Invoice Line
- Purchase Receipt Header, Purchase Receipt Line
- Return Receipt Header, Return Receipt Line

**Other Extensions:**
- Transfer Line, Bank Account, Sales & Receivables Setup

## Field Reference Summary

### Key Field Additions

**Item Table Extensions:**
```al
"BRC Retail Variant Templ Code" // Links to variant template
"BRC Retail Item Brand"         // Brand classification  
"BRC Retail Season"             // Seasonal classification
"BRC Retail Made to Order"      // Special order handling
"BRC Variant Inventory"         // Variant-specific inventory
```

**Item Variant Extensions:**
```al
"BRC Retail Variant 1 Code"     // Primary dimension code
"BRC Retail Variant 2 Code"     // Secondary dimension code
"BRC Retail Variant Val. 1 Code" // Specific value for dimension 1
"BRC Retail Variant Val. 2 Code" // Specific value for dimension 2
"BRC Retail Sorting"            // Display order management
```

**Document Line Extensions:**
```al
"BRC Retail Delivery Season"    // Season assignment
"BRC Retail Var. Value 1 Desc." // Variant value description
"BRC Retail Var. Value 2 Desc." // Secondary value description
"BRC Retail Variant Group No."  // Matrix grouping number
```

## Version Information

**Current Version:** 24.4.24986.1
**Platform Compatibility:** Business Central 24.0+
**Runtime Version:** AL 13.0
**Target Environment:** Cloud

**Publisher:** BrightCom Solutions AB
**App ID:** 1615a8c9-24c3-434e-8482-f278027dcd1d

## Object ID Ranges

**Allocated Range:** 12097619 - 12097668 (50 objects)
**Usage:**
- Tables: 12097620-12097636 (17 objects)
- Pages: 12097620-12097635 (16 objects)  
- Codeunits: 12097619, 12097630-12097643 (15 objects)
- Reports: 12097619-12097626 (8 objects)
- Enums: 12097622-12097627 (6 objects)
- Queries: 12097619 (1 object)

## Technical Specifications

### Performance Characteristics
- **Matrix Calculation**: Optimized for up to 1000 variant combinations
- **Memory Usage**: Efficient temporary table usage for large datasets
- **Database Impact**: Minimal performance impact on standard BC operations
- **Concurrent Users**: Designed for multi-user environments

### Integration Points
- **Event Subscribers**: 15+ integration points with standard BC processes
- **FlowField Calculations**: Real-time aggregation of variant data
- **Web Services**: RESTful API for external system integration
- **Reporting Framework**: Integration with standard BC reporting engine

### Data Classification
- **Customer Content**: Variant values, descriptions, business data
- **System Metadata**: Timestamps, system-generated identifiers
- **Application Data**: Configuration settings, template definitions

## Compliance and Certification

### Standards Compliance
- **Business Central Standards**: Full compliance with BC development guidelines
- **Security Standards**: Implements BC security framework
- **Performance Standards**: Optimized for cloud deployment
- **Integration Standards**: RESTful API design principles

### Certification Information
- **AppSource Certification**: Certified for Business Central AppSource
- **Cloud Readiness**: Designed and tested for cloud deployment
- **Upgrade Compatibility**: Compatible with BC platform upgrades

## Support Information

### Documentation Resources
- **Online Documentation**: [BRC Documentation Portal](https://docs.brightcom.se/sv/BRCretail)
- **Privacy Policy**: [Privacy Information](https://docs.brightcom.se/sv/PrivacyPolicy/BRCRetailExtension)
- **Company Website**: [BrightCom Solutions AB](https://brightcom.se/)

### Technical Support
- **Support Scope**: Technical issues, implementation guidance, troubleshooting
- **Response Times**: Based on support agreement terms
- **Support Channels**: Email, phone, partner network

### Professional Services
- **Implementation Services**: Setup, configuration, training
- **Custom Development**: Extension customization, integration development
- **Training Services**: User training, administrator training, advanced features

This reference documentation provides the technical foundation for understanding and working with BRC Retail Extension. For specific implementation questions or advanced scenarios, consult the detailed documentation sections or contact professional services.