---
title: "Setup & Installation"
linkTitle: "Setup"
weight: 20
type: docs
description: >
  Complete setup guide for BRC Connect including system requirements, installation procedures, and initial configuration.
---

## Overview

This guide walks through the complete setup process for BRC Connect, from system prerequisites through initial configuration and testing. The setup process typically takes 2-4 hours depending on the complexity of your integration requirements.

## Setup Process

The BRC Connect setup follows these major phases:

1. **Prerequisites** - Verify system requirements and gather credentials
2. **Installation** - Deploy the app to Business Central
3. **Configuration** - Configure connection settings and automation
4. **Field Mapping** - Map JSON fields to Business Central fields
5. **Testing** - Validate the integration with test data

## Prerequisites

Before installing BRC Connect, ensure you meet these requirements:

### Business Central Requirements

- **Version**: Business Central 25.0 or later
- **Deployment**: Cloud (SaaS)
- **Runtime**: AL Runtime 12.0
- **Licenses**: Full user licenses for users who will configure or monitor integrations

### Required Permissions

Users need these Business Central permissions:

- **BRC CONNECT - EDIT** - Full access to configure and use BRC Connect
- **BRC CONNECT - VIEW** - Read-only access to view entries and content
- Standard BC permissions for entities you'll sync (Customers, Items, Sales Orders, etc.)

### External System Requirements

From your e-commerce platform or POS system, you need:

- **API Endpoint URL** - Base URL for the integration API
- **Bearer Token** - Authentication token for API access
- **Source ID** - Identifier for your Business Central instance (if required)
- **API Documentation** - JSON structure and field definitions

### Network Requirements

- **Outbound HTTPS** - Business Central must reach external API endpoints
- **IP Whitelisting** - Add BC's outbound IPs to external system allowlist (if required)

## Installation Steps

### 1. Deploy the App

**For Production Environments:**

1. Download BRC Connect from AppSource or your BrightCom portal
2. In Business Central, go to **Extension Management**
3. Choose **Upload Extension**
4. Select the downloaded .app file
5. Choose **Deploy** and select target environment
6. Wait for deployment to complete (typically 5-10 minutes)
7. Refresh your browser

**For Sandbox Environments:**

1. Use the same process as production, or
2. Copy from production using **Copy Environment** functionality

### 2. Verify Installation

After deployment:

1. Search for **BRC Connect Setup** in Business Central
2. Verify the page opens without errors
3. Check that all BRC-related pages are accessible
4. Review **Extension Management** to confirm app is deployed and up-to-date

### 3. License Validation

BRC Connect validates licensing on first use:

1. The app checks for valid BrightCom subscription
2. If licensing issues occur, contact BrightCom Solutions AB
3. Enterprise customers should verify their subscription includes BRC Connect

## Initial Configuration

After installation, configure BRC Connect through these steps:

### 1. Basic Connection Settings

Open **BRC Connect Setup** and configure:

| Field | Description | Example |
|-------|-------------|---------|
| **Integration Active** | Master on/off switch | Leave OFF during setup |
| **API Path** | Base URL for external API | `https://api.shop.com/bc/v1` |
| **Bearer Token** | Authentication token | Paste from external system |
| **Source ID** | Identifier for this BC instance | `BC-PROD-01` |
| **Debug Mode** | Enables detailed logging | ON during setup, OFF in production |

### 2. Automation Settings

Configure which processes run automatically:

**Inbound Processing:**
- ☑ Auto Download Documents
- ☑ Auto Read Content
- ☑ Auto Validate Content
- ☑ Auto Create Content
- ☑ Auto Create/Update Customer
- ☐ Auto Create/Update Item (enable after testing)
- ☐ Auto Release Sales Documents (enable after validation)

**Outbound Processing:**
- ☐ Auto Send Inventory Update (enable after field mapping)
- ☐ Auto Send Price Update (enable after field mapping)
- ☐ Auto Send Item Update (enable after field mapping)
- ☐ Auto Send Shipment (enable after testing)
- ☐ Auto Send Invoiced Shipment (enable after testing)

**Best Practice**: Start with automation OFF, test manually, then enable incrementally.

### 3. Document Settings

Configure order processing behavior:

| Setting | Recommended Value | Notes |
|---------|-------------------|-------|
| **Payment Option** | Multiple Payments | Supports complex payment scenarios |
| **Payment Journal Template** | GENERAL | Standard BC template |
| **Payment Journal Batch** | WEB | Create dedicated batch for web payments |
| **Post Payments** | OFF initially | Enable after testing |
| **Discount Type** | G/L Account | For freight/discount line items |
| **Shipping Fee Type** | G/L Account | For shipping charges |
| **Total Amt. Document Tolerance** | 0.5 | Allows 0.50 rounding differences |
| **Disable Totals Check** | OFF | Keep validation enabled |
| **Disable VAT Check** | OFF | Keep validation enabled |

### 4. Inventory Settings

Configure inventory synchronization:

| Setting | Value | Purpose |
|---------|-------|---------|
| **Inventory to Web** | Available | Use projected available inventory |
| **Group Inventory to Location** | ON | Separate by warehouse |
| **Outstanding Qty. Max** | 0 | Exclude quantities on purchase orders |
| **Send Virtual Inv. for BOM Item** | ON | Calculate BOM component availability |

### 5. Product Range Settings

Control which items sync to which channels:

- **Product Range on Item**: ON - Filter items by product range codes
- **Product Range on Price**: ON - Separate pricing by channel
- **Product Range on Inventory**: ON - Control inventory visibility

### 6. Processing Limits

Configure performance and retry settings:

| Setting | Recommended | Purpose |
|---------|-------------|---------|
| **Webservice Retries** | 3 | HTTP request retry attempts |
| **Content Creation Retries** | 2 | Document creation retry attempts |
| **Process Entry Max Count** | 100 | Max entries per job run |
| **Auto-Acknowledge Entry Count** | 50 | Batch size for acknowledgments |

## BRC Connect Type Configuration

For each entity type (DOCUMENT, CUSTOMER, ITEM, etc.), configure:

### Open BRC Connect Type page

1. Search for **BRC Connect Type**
2. Review pre-configured types
3. Verify these settings for DOCUMENT type:

| Field | Value |
|-------|-------|
| **BRC Connect Type** | DOCUMENT |
| **Table No.** | 36 (Sales Header) |
| **Path** | /documents or /orders |
| **Json Key Identifier List** | id, orderId, documentId |
| **Download Data** | ON |
| **Process Content** | ON |

### Verify Codeunit Assignments

Each type should have these codeunits assigned:

- **Validator Codeunit**: Validates incoming data
- **Create/Update Codeunit**: Creates BC records
- **Create Request Codeunit**: Builds outbound JSON

For DOCUMENT type, verify:
- Validator: 12073517 (BRC Validate Document Mth)
- Create/Update: 12073518 (BRC Create Document Mth)

## Field Mapping

Map JSON fields from external system to Business Central fields:

### 1. Open Field Setup

Search for **BRC Content Type Field Setup**

### 2. Create Mappings for DOCUMENT Type

Example mappings:

| JSON Key Name | Field No. | Table | Purpose |
|---------------|-----------|-------|---------|
| documentType | 1 | Sales Header | Document Type |
| orderDate | 20 | Sales Header | Order Date |
| buyer.email | 102 | Sales Header | Sell-to E-Mail |
| buyer.name | 2 | Sales Header | Sell-to Customer Name |
| buyer.phone | 9 | Sales Header | Phone No. |
| lines[0].itemNo | 6 | Sales Line | No. |
| lines[0].quantity | 15 | Sales Line | Quantity |
| lines[0].unitPrice | 22 | Sales Line | Unit Price |

### 3. Configure Unique Identifiers

For customer matching, mark these fields as unique identifiers:

- **buyer.email** - Priority 1, Case Insensitive
- **buyer.phone** - Priority 2
- **buyer.webId** - Priority 3

### 4. Set Up Value Mappings

Open **BRC Mapping** to translate external values to BC values:

| Source | BRC Connect Type | From | To |
|--------|------------------|------|-----|
| SHOPIFY | DOCUMENT | pending | Order |
| SHOPIFY | DOCUMENT | completed | Invoice |
| SHOPIFY | PAYMENT | credit_card | CC |
| SHOPIFY | PAYMENT | paypal | PAYPAL |

## Job Queue Setup

Configure automated processing:

### 1. Create Job Queue Entry for Inbound

1. Search for **Job Queue Entries**
2. Choose **New**
3. Configure:
   - **Object Type to Run**: Codeunit
   - **Object ID to Run**: 12073522 (BRC Process All Contents)
   - **Recurring**: ON
   - **Run on Mondays-Sundays**: All checked
   - **Starting Time**: 00:00:00
   - **Ending Time**: 23:59:59
   - **No. of Minutes between Runs**: 5
   - **Maximum No. of Attempts**: 3
4. Set **Status** to **Ready**

### 2. Create Job Queue Entry for Outbound

1. Create another Job Queue Entry
2. Configure:
   - **Object Type to Run**: Codeunit
   - **Object ID to Run**: 12073560 (BRC Process Outgoing Queue)
   - **Recurring**: ON
   - **No. of Minutes between Runs**: 5
3. Set **Status** to **Ready**

## Source-Specific Configuration

For platform-specific overrides:

### Open BRC Connect Source

1. Search for **BRC Connect Source**
2. Create entry for your platform (e.g., SHOPIFY)
3. Enable **Override Default Setup**
4. Configure source-specific settings:
   - Integration Engine
   - Payment handling differences
   - Totals check variations

## Testing the Integration

### 1. Test Inbound Processing

**Manual Test:**

1. Ensure **Integration Active** = ON
2. Open **BRC Connect Entries**
3. Choose **Get All Documents**
4. Monitor **Status** field (Not Sent → Sent and Received → Finished)
5. Open **BRC Connect Content** to view downloaded orders
6. Verify **Status** = OK and **Record ID** points to Sales Order
7. Open the created Sales Order and verify data accuracy

**Troubleshooting:**
- If Status = Error, check **Error Text** field
- Review **JSON Content** to verify external data format
- Check **BRC Connect Values** for parsed field values

### 2. Test Outbound Processing

**Test Inventory Sync:**

1. Modify an item's inventory in Business Central
2. Check **BRC Outgoing Sync Queue** - item should appear
3. Wait for job queue to run (or run manually)
4. Verify in **BRC Connect Entries** that inventory update sent successfully

**Test Shipment Notification:**

1. Post a sales shipment
2. Verify entry appears in **BRC Outgoing Sync Queue**
3. Check **BRC Connect Entries** for outbound HTTP POST
4. Verify external system received shipment notification

### 3. Validate Error Handling

1. Open **BRC Connect Error List**
2. Create a test order with invalid data (e.g., missing customer email)
3. Verify error appears with clear message
4. Correct the issue
5. Retry processing from **BRC Connect Content**

## Post-Setup Checklist

After completing setup, verify:

- [ ] Test order successfully creates Sales Order
- [ ] Customer auto-creation works correctly
- [ ] Item matching identifies correct items
- [ ] Payment lines create properly
- [ ] Total amounts match within tolerance
- [ ] Inventory updates send to external system
- [ ] Shipment notifications post correctly
- [ ] Error handling logs issues clearly
- [ ] Job queue entries run without errors
- [ ] All automation flags configured appropriately

## Ongoing Maintenance

### Regular Tasks

- **Weekly**: Review **BRC Connect Error List** for recurring issues
- **Monthly**: Clean up old entries (automated with "Delete Content After" setting)
- **Quarterly**: Review field mappings for accuracy
- **After Updates**: Test integration after BC or external system updates

### Monitoring

Enable monitoring features:

1. Open **BRC Connect Setup**
2. Set **Monitor Active** = ON
3. Enter **Monitor E-Mail List** with admin addresses
4. System will email alerts for critical errors

### Performance Optimization

As volume grows:

- Increase **Process Entry Max Count** to process more per run
- Add dedicated job queue entries for peak hours
- Review and optimize custom field mappings
- Consider product range filtering to reduce data volume

## Next Steps

- [User Guide](../user-guide/) - Learn daily operations
- [Troubleshooting](../troubleshooting/) - Common issues and solutions
- [Integration Details](../integrations/) - Deep dive into integration architecture
