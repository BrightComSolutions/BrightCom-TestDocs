---
title: "Integrations"
linkTitle: "Integrations"
weight: 40
description: >
  Comprehensive integration documentation for BRC Retail Extension including Business Central extensions, table modifications, and system integration points.
---

## Integration Overview

BRC Retail Extension seamlessly integrates with Microsoft Dynamics 365 Business Central through extensive table extensions, event subscribers, and enhanced business processes. This section documents all integration points and their impact on standard Business Central functionality.

## Business Central Core Integrations

### Item Management Integration

#### Item Table Extensions

**Item Table Extension** (`BRC Retail Item`)

The extension adds comprehensive variant management fields to the standard Item table:

**Variant Template Fields:**
- `BRC Retail Variant Templ Code`: Links items to variant templates
- `BRC Retail Variant 1 Code`: FlowField showing first variant dimension
- `BRC Retail Variant 2 Code`: FlowField showing second variant dimension

**Variant Counters:**
- `BRC Retail No of Variant 1`: Count of variants in first dimension
- `BRC Retail No of Variant 2`: Count of variants in second dimension

**Business Classification Fields:**
- `BRC Retail Item Brand`: Brand classification
- `BRC Retail Season`: Seasonal classification
- `BRC Retail Made to Order`: Special order indicator
- `BRC NOOS/Carry Over`: Never-out-of-stock indicator

**Enhanced Inventory:**
- `BRC Variant Inventory`: FlowField for variant-specific inventory
- `BRC Image URL`: Product image URL for e-commerce integration

#### Item Variant Table Extensions

**Item Variant Table Extension** (`BRC Retail Item Variant`)

Extends standard Item Variant with detailed variant information:

**Core Variant Fields:**
- `BRC Retail Variant 1 Code`: Primary variant dimension code
- `BRC Retail Variant 2 Code`: Secondary variant dimension code
- `BRC Retail Variant Val. 1 Code`: Specific value for dimension 1
- `BRC Retail Variant Val. 2 Code`: Specific value for dimension 2

**Display and Organization:**
- `BRC Retail Sorting`: Automatic sorting for consistent display
- FlowFields for variant value descriptions
- Integration with variant group calculations

### Sales Process Integration

#### Sales Document Extensions

**Sales Header Extensions**
Multiple sales headers extended with variant-related information:

- `BRC Retail Sales Header`: Sales order enhancement
- `BRC Retail Sales Inv Header`: Posted invoice integration  
- `BRC Retail Sales Cr Memo Hdr`: Credit memo integration
- `BRC Retail Sales Ship Header`: Shipment document integration

**Key Enhancement Fields:**
- Delivery season integration
- Variant summary information
- Matrix reporting preparation

**Sales Line Extensions**
Comprehensive enhancement of all sales line tables:

- `BRC Retail Sales Line`: Sales order lines
- `BRC Retail Sales Inv Line`: Posted invoice lines
- `BRC Retail Sales Cr Memo Line`: Credit memo lines  
- `BRC Retail Sales Shipment Line`: Shipment lines

**Enhanced Line Information:**
- Full variant dimension data on each line
- Variant value descriptions with FlowFields
- Variant group number calculations
- Delivery season tracking
- Enhanced descriptions using variant information

#### Sales Line Event Integration

**Sales Order Event Subscribers** (`BRC Retail Sales Order Subs.`)

Integrates with standard sales processes through event subscribers:

```al
OnAfterInsertSalesLine: Automatic variant field population
OnAfterModifySalesLine: Variant validation and updates
OnBeforePostSalesOrder: Variant data validation
OnAfterPostSalesOrder: Matrix data preparation
```

**Sales Line Variant Management** (`BRC Retail Sales Line Var Mt.`)

Provides specialized variant handling for sales lines:
- Automatic variant value lookup
- Description building with variant information
- Inventory availability checking by variant
- Pricing integration with variant-specific rates

### Purchase Process Integration

#### Purchase Document Extensions

**Purchase Header Extensions**
- `BRC Retail Purchase Header`: Purchase order enhancement
- `BRC Retail Purch Inv Header`: Posted invoice integration
- `BRC Retail Purc Rcpt Header`: Receipt document integration
- `BRC Retail Return Rcpt Header`: Return receipt integration

**Purchase Line Extensions**  
- `BRC Retail Purchase Line E`: Purchase order lines
- `BRC Retail Purchase Inv Line`: Posted invoice lines
- `BRC Retail Purchase Rcpt Line`: Receipt lines
- `BRC Retail Return Rcpt Line`: Return receipt lines

**Enhanced Purchase Features:**
- Variant prompting based on setup configuration
- Automatic variant description usage
- Delivery season inheritance from headers
- Matrix-compatible data structure

#### Purchase Line Event Integration

**Purchase Order Event Subscribers** (`BRC Retail Purch Order Subs.`)

```al
OnAfterInsertPurchLine: Variant prompt processing
OnAfterModifyPurchLine: Variant validation
OnBeforePostPurchOrder: Variant data validation
```

**Purchase Line Item Management** (`BRC Retail Purch Line Item Mt`)

Specialized purchase line variant handling:
- Vendor-specific variant mapping
- Purchase variant prompting logic
- Inventory planning integration
- Receipt processing with variant tracking

### Inventory Management Integration

#### Enhanced Inventory Tracking

**Stock Keeping Unit Extensions** (`BRC Retail Stock Keeping Unit`)
- Variant-specific SKU management
- Location-specific variant tracking  
- Enhanced planning parameters by variant

**Transfer Integration** (`BRC Retail Transfer Line`)
- Variant information in transfer orders
- Location-to-location variant tracking
- Transfer document variant reporting

#### Item Unit of Measure Extensions

**Item UoM Integration** (`BRC Retail Item UoM`)
- Variant-specific unit of measure handling
- Custom UoM tables for retail operations
- Enhanced measurement tracking

**Item Reference Extensions** (`BRC Retail Item Ref`)
- Enhanced item references with variant support
- Barcode integration for variants
- Customer/vendor variant number mapping

### Document Reference Integration

#### Bank Account Integration

**Bank Account Extensions** (`BRC Retail Bank Account`)
- Payment processing with variant-aware transactions
- Enhanced reconciliation with variant details
- Integration with variant-specific pricing

#### Sales & Receivables Setup

**Sales & Receivables Setup** (`BRC Retail Sales Rec Setup`)
- Global settings affecting variant processing
- Number series integration for variant documents
- Default behaviors for variant operations

## Event-Driven Integration Architecture

### Core Event Subscribers

#### Item Management Events

**Item Event Subscribers** (`BRC Retail Item Event Subs.`)

Critical integration points for item processing:

```al
OnAfterValidateNo: Variant template validation
OnAfterInsert: Automatic variant generation triggers  
OnAfterModify: Variant data consistency checks
OnBeforeDelete: Variant dependency validation
```

**Automatic Variant Creation** (`BRC Retail Crt. Var. from Item`)

Automated processes triggered by item events:
- Template-based variant generation
- Variant code construction using separators
- Automatic sorting assignment
- Description building from templates

#### Transfer Integration Events

**Transfer Line Item Variant Management** (`BRC Retail Tran Lne Itm Var Mt`)

Manages variant data during inventory transfers:
- Variant information preservation across locations
- Transfer document variant reporting
- Integration with warehouse management

### Matrix Calculation Integration

#### Advanced Matrix Processing

**Matrix Calculation Engine** (`BRC Retail Matrix Calculation`)

Sophisticated integration with Business Central reporting:

```al
SetMatrixSourceDocLines: Prepares document data for matrix display
CalculateGroupLines: Groups variants for efficient display
OptimizeSorting: Implements intelligent sorting algorithms
ProcessVariantData: Handles complex variant combinations
```

**Matrix Data Tables**
- `BRC Matrix Group Line`: Optimized grouping for matrix displays
- `BRC Matrix Source Doc. Line`: Source data preparation for reports

## Web Service Integration

### External System Integration

#### Inventory Update Web Service

**BRC Retail Item Inv. Upd WS** provides RESTful integration:

**Capabilities:**
- Real-time inventory updates by variant
- Batch processing for large updates
- Error handling and logging
- Integration with external ERP systems

**API Endpoints:**
```
POST /api/inventory/variant/update
GET /api/inventory/variant/{itemNo}/{variantCode}
PUT /api/inventory/variant/adjust
DELETE /api/inventory/variant/remove
```

**Data Exchange Format:**
```json
{
  "itemNo": "ITEM001",
  "variantCode": "M-BLK",
  "locationCode": "MAIN",
  "quantity": 100,
  "adjustmentType": "positive"
}
```

### Variant Capacity Classification

**Variant Capacity Class Management** (`BRC Retail Var. Cap. Class Mgt`)

Advanced classification system for variant management:
- Capacity-based variant grouping
- Performance optimization for large variant sets
- Integration with planning and forecasting systems

## Barcode System Integration

### Comprehensive Barcode Management

#### Barcode Generation Integration

**Barcode Management** (`BRC Retail Barcode Mgt.`)

Full integration with Business Central item management:

**Features:**
- Automatic EAN code generation using number series
- Check digit calculation and validation
- Integration with Item References table
- Support for multiple barcode standards

**Barcode Data Structure** (`BRC Retail Code 128/39`)
- Code 128 and Code 39 barcode support
- Integration with warehouse scanning systems
- Label printing integration
- Batch barcode generation

#### Label Printing Integration

**Specialized Label Reports:**
- Integration with standard BC printing framework
- Custom label formats for retail operations
- Barcode quality optimization
- Multi-language label support

## Workflow Integration Points

### Business Process Enhancement

#### Sales Workflow Integration

**Enhanced Sales Process:**
1. **Order Entry**: Variant selection with matrix views
2. **Inventory Check**: Real-time availability by variant
3. **Pricing**: Variant-specific pricing integration
4. **Fulfillment**: Variant-aware picking and shipping
5. **Invoicing**: Matrix invoice formats

**Integration Points:**
- Standard BC approval workflows enhanced with variant data
- Document flow maintains variant information integrity
- Posting routines include variant validation

#### Purchase Workflow Integration

**Enhanced Purchase Process:**
1. **Requisition**: Variant-based purchase planning
2. **Ordering**: Supplier-specific variant management
3. **Receiving**: Variant verification during receipt
4. **Invoicing**: Variant matching for three-way matching

### Seasonal Integration

#### Delivery Season Management

**Season Integration** (`BRC Retail Del Season Mgt.`)

**Business Process Integration:**
- Automatic season calculation on document dates
- Season inheritance between headers and lines
- Integration with inventory planning
- Seasonal reporting and analysis

**Season Data Flow:**
```
Sales Order Header → Delivery Season Calculation →
Sales Order Lines → Inventory Planning →
Purchase Suggestions → Vendor Orders
```

## Multi-Language Integration

### Localization Support

#### Translation Architecture

**Multi-Language Framework:**
- `BRC Retail Variant Translation`: Variant dimension translations
- `BRC Retail Var. Val. Transl.`: Variant value translations
- User language preferences integration
- Automatic language detection and display

**Business Central Integration:**
- Standard BC language framework utilization
- Translation management through standard tools
- Export/import for translation services
- Runtime language switching support

## Performance Integration

### Optimization Strategies

#### Database Integration

**Performance Optimizations:**
- Intelligent indexing on variant fields
- FlowField optimization for variant calculations
- Efficient table relationships
- Optimized queries for matrix operations

**Memory Management:**
- Temporary table usage for matrix calculations
- Efficient caching strategies
- Background processing for large operations
- Resource optimization for concurrent users

## Security Integration

### Permission Integration

#### Comprehensive Security Model

**Permission Framework:**
- Integration with standard BC security
- Granular permissions for variant operations
- Role-based access control
- Data classification compliance

**Security Levels:**
- **Read**: View variant information
- **Insert**: Create new variants
- **Modify**: Update variant data  
- **Delete**: Remove variant configurations

## Upgrade and Maintenance Integration

### Version Management

#### Upgrade Integration

**Solution Upgrade Management** (`BRC Retail Solution Upgrade`)

**Upgrade Process:**
- Automated data migration between versions
- Backward compatibility maintenance
- Configuration preservation during upgrades
- Validation of upgrade success

**Maintenance Integration:**
- Integration with BC maintenance schedules
- Automated health checks for variant data
- Performance monitoring and optimization
- Data integrity validation

## Integration Troubleshooting

### Common Integration Issues

#### Event Subscriber Conflicts
- **Symptoms**: Unexpected behavior in standard BC processes
- **Resolution**: Review event subscriber order and dependencies
- **Prevention**: Follow BC development best practices

#### Performance Impact
- **Symptoms**: Slower performance in standard operations
- **Resolution**: Optimize variant queries and indexing
- **Monitoring**: Use BC performance monitoring tools

#### Data Consistency
- **Symptoms**: Variant data inconsistencies across tables
- **Resolution**: Run data validation and correction routines
- **Prevention**: Regular maintenance and validation procedures

## Integration Support

### Technical Support

**For Integration Issues:**
- Review integration documentation and best practices
- Use BC diagnostic tools for troubleshooting
- Contact BrightCom Solutions AB for complex integration scenarios
- Leverage BC partner network for implementation support

**Integration Validation:**
- Regular testing of integration points
- Monitoring of event subscriber performance
- Validation of data flow integrity
- User acceptance testing for integrated processes

This comprehensive integration documentation ensures successful implementation and ongoing operation of BRC Retail Extension within your Business Central environment.