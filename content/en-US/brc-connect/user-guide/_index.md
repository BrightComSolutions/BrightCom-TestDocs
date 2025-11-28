---
title: "User Guide"
linkTitle: "User Guide"
weight: 30
type: docs
description: >
  Complete guide for daily operations, order processing, inventory management, and error handling in BRC Connect.
---

## Overview

This guide covers day-to-day operations with BRC Connect, from processing incoming orders to managing outbound data synchronization. Whether you're handling orders manually or monitoring automated processes, this guide provides step-by-step instructions.

## User Roles

BRC Connect supports different user roles with varying responsibilities:

| Role | Responsibilities | Required Permissions |
|------|------------------|---------------------|
| **Integration Administrator** | Configure settings, field mappings, troubleshoot errors | BRC CONNECT - EDIT |
| **Operations Manager** | Monitor processing, handle exceptions, review errors | BRC CONNECT - EDIT |
| **Order Processor** | Process orders, create documents, handle customer issues | BRC CONNECT - VIEW + Sales permissions |
| **Warehouse User** | Post shipments, update inventory | BRC CONNECT - VIEW + Inventory permissions |
| **Finance User** | Review/post payments, handle pricing | BRC CONNECT - VIEW + Finance permissions |

## Daily Operations Workflow

### Typical Daily Flow

**Morning (Start of Day):**
1. Check overnight processing results
2. Review **BRC Connect Error List** for issues
3. Process any failed orders manually
4. Monitor **BRC Outgoing Sync Queue** for pending items

**Throughout Day:**
1. Orders process automatically (if automation enabled)
2. Monitor **BRC Connect Entries** for new downloads
3. Handle customer service escalations
4. Post shipments as orders fulfilled

**End of Day:**
1. Verify all orders processed
2. Clear error queue
3. Confirm inventory synchronized
4. Review processing statistics

## Core Processes

### 1. Order Download and Processing

**Automated Processing** (Recommended):

When automation is enabled, BRC Connect automatically:
- Downloads new orders every 5 minutes (configurable)
- Parses JSON content into structured data
- Validates customers, items, and totals
- Creates Sales Orders in Business Central
- Logs any errors for manual review

**Manual Processing**:

For testing or troubleshooting, process orders manually:

1. **Download Orders**
   - Open **BRC Connect Entries**
   - Choose **Actions** → **Get All Documents**
   - System creates entry with Status = "Not Sent"
   - Entry progresses to "Sent and Received" when data downloaded

2. **View Downloaded Content**
   - Open **BRC Connect Content**
   - Filter **BRC Connect Type** = DOCUMENT
   - Filter **Status** = New
   - Review **JSON Content** field to see raw data

3. **Parse Content**
   - Select content record
   - Choose **Actions** → **Read Content**
   - System parses JSON into **BRC Connect Value** records
   - Status changes from "New" to "Read"

4. **Validate Order**
   - Select content record (Status = Read)
   - Choose **Actions** → **Validate Content**
   - System validates customer, items, totals
   - Status changes to "Validated" if successful
   - Status changes to "Error" if validation fails

5. **Create Sales Order**
   - Select content record (Status = Validated)
   - Choose **Actions** → **Create/Update BC Record**
   - System creates Sales Order in BC
   - Status changes to "OK"
   - **Record ID** field links to created Sales Order

6. **View Created Order**
   - Click **Record ID** hyperlink, or
   - Note **External ID** and search for Sales Order
   - Review order details
   - Post or release as normal BC process

### 2. Manual Order Creation

For orders entered directly by staff (phone, email, etc.):

1. **Open Manual Order Page**
   - Search for **BRC Manual Order**
   - Page provides simplified order entry

2. **Enter Header Information**
   - **Customer**: Select existing or create new
   - **Order Date**: Date order received
   - **External ID**: Reference number from customer
   - **Source**: Identify source (e.g., PHONE, EMAIL)

3. **Add Line Items**
   - Enter **Item No.** or **Item Reference**
   - Enter **Quantity**
   - System fills **Unit Price** from BC
   - Add additional lines as needed

4. **Create Order**
   - Choose **Create Sales Order** action
   - System validates and creates Sales Order
   - Opens created order for review

5. **Optional: Send to Web**
   - If customer needs confirmation via external system
   - Choose **Send to Web** action
   - System queues order confirmation to external API

### 3. Error Handling

When orders fail validation or creation:

**View Errors:**

1. Open **BRC Connect Error List**
2. Filter by:
   - **Error Type**: Error (critical) vs. Warning (informational)
   - **BRC Connect Type**: DOCUMENT, CUSTOMER, ITEM, etc.
   - **Date**: Today, This Week, etc.

**Common Errors and Resolutions:**

| Error Message | Cause | Resolution |
|---------------|-------|------------|
| "Customer not found" | No matching customer by email/phone/ID | Create customer or update matching fields |
| "Item not found" | SKU doesn't match BC item reference | Create item or add cross-reference |
| "Total amount mismatch" | Line totals ≠ external total | Check pricing, discounts; adjust tolerance |
| "VAT calculation error" | VAT amount doesn't match expected | Verify VAT posting setup, disable VAT check if needed |
| "Payment method not mapped" | External payment code unmapped | Add mapping in **BRC Mapping** |

**Fix and Retry:**

1. Note **Entry No.** or **Content ID** from error
2. Fix underlying issue (create customer, map value, etc.)
3. Open **BRC Connect Content**
4. Find record with error
5. Choose **Actions** → **Reset Status**
6. Choose **Actions** → **Create/Update BC Record**
7. Verify Status = OK

**Ignore Errors:**

For errors that can't be fixed (e.g., test orders, spam):

1. Open **BRC Connect Content**
2. Find record with error
3. Choose **Actions** → **Ignore**
4. Record no longer appears in error list

### 4. Outbound Inventory Synchronization

BRC Connect automatically updates external systems when inventory changes:

**How It Works:**

1. User posts inventory transaction in BC (purchase receipt, sales shipment, adjustment)
2. System adds affected items to **BRC Outgoing Sync Queue**
3. Job queue processes queue every 5 minutes
4. System builds inventory JSON and POSTs to external API
5. Entry appears in **BRC Connect Entries** with Service Type = "Update"

**Manual Inventory Update:**

Force immediate inventory sync:

1. Open **BRC Outgoing Sync Queue**
2. Select item(s) to sync
3. Choose **Actions** → **Send Now**
4. System immediately processes and sends

**Monitor Inventory Sync:**

1. Open **BRC Connect Entries**
2. Filter **Service Type** = Update
3. Filter **BRC Connect Type** = INVENTORY
4. Verify Status = "Finished" for successful sync
5. Check **Error Text** for failures

**Configure Inventory Settings:**

1. Open **BRC Connect Setup**
2. Configure **Inventory to Web**:
   - **Real-time**: Current inventory on-hand
   - **Available**: Projected available (on-hand - committed)
   - **Grouped by Location**: Separate by warehouse
3. Configure **Outstanding Qty. Max**: Exclude purchase order quantities
4. Enable **Send Virtual Inv. for BOM Item**: Calculate component availability

### 5. Price Synchronization

Send price updates to external systems:

**Automatic Price Sync:**

1. Update sales prices in BC (Sales Prices, Price Lists)
2. System adds to **BRC Outgoing Sync Queue**
3. Job queue processes and sends to external API

**Manual Price Update:**

1. Open **Items** or **Price Lists**
2. Select item(s)
3. Choose **Actions** → **Send to BRC Connect** (if available)
4. Or navigate to **BRC Outgoing Sync Queue** and send manually

**Price Types Supported:**

- Sales Prices (customer-specific, general)
- Price List Lines (BC 2020+)
- Purchase Prices (if configured)
- Minimum Quantity pricing

**Product Range Filtering:**

Control which items' prices sync:

1. Open **BRC Connect Setup**
2. Enable **Product Range on Price**
3. Configure **Product Range** field on items
4. Only items with matching product range sync

### 6. Shipment Notifications

Notify external systems when orders ship:

**Automatic Shipment Notification:**

1. Post Sales Shipment in BC
2. System adds shipment to **BRC Outgoing Sync Queue**
3. Job queue sends shipment details to external API
4. External system notifies customer of shipment

**Manual Shipment Notification:**

1. Open **Posted Sales Shipments**
2. Select shipment
3. Choose **Actions** → **Send to BRC Connect**
4. Verify in **BRC Outgoing Sync Queue**

**Delayed Shipment Notification:**

Configure delay between posting and sending:

1. Open **BRC Connect Setup**
2. Set **Auto Send Shipment Delay Minutes** (e.g., 30)
3. System waits configured minutes before sending
4. Allows for shipment corrections before external notification

**What Gets Sent:**

- Shipment No.
- Order No. (external reference)
- Line items with quantities shipped
- Tracking numbers (if configured)
- Shipment date
- Carrier information (if configured)

### 7. Payment Processing

Handle payments from external systems:

**Payment Options:**

BRC Connect supports these payment handling modes:

| Option | Behavior | Use Case |
|--------|----------|----------|
| **One Payment** | Single payment line regardless of external payments | Simple integrations, payment settled externally |
| **Multiple Payments** | One payment line per external payment method | Track payment splits (e.g., part credit card, part gift card) |
| **Add Payment Lines** | Add payments as sales order lines | Include payment fees in order total |
| **Ignore Payments** | Don't process payment information | Manual payment entry |

**Configure Payment Processing:**

1. Open **BRC Connect Setup**
2. Set **Payment Option** to desired mode
3. Configure **Payment Journal Template** and **Batch**
4. Enable **Post Payments** for automatic posting

**Map Payment Methods:**

1. Open **BRC Mapping**
2. Add mappings for each external payment method:
   - **Source**: External system (e.g., SHOPIFY)
   - **BRC Connect Type**: PAYMENT
   - **From**: External code (e.g., "credit_card")
   - **To**: BC Payment Method Code (e.g., "CC")

**Review Payment Journals:**

1. Open **Payment Journals**
2. Select batch configured in BRC Connect Setup
3. Review payment lines created by BRC Connect
4. Post or modify as needed

### 8. Customer Management

Handle customer auto-creation and matching:

**Customer Matching:**

BRC Connect uses two-pass matching:

1. **Pass 1**: Fast exact match on unique identifiers (email, phone, web ID)
2. **Pass 2**: Settings-driven fuzzy match with case sensitivity options

**Configure Unique Identifiers:**

1. Open **BRC Content Type Field Setup**
2. Filter **BRC Connect Type** = CUSTOMER
3. Mark fields as **Unique Identifier**:
   - **buyer.email** - Priority 1
   - **buyer.phone** - Priority 2
   - **buyer.webId** - Priority 3
4. System tries Priority 1 first, then 2, then 3

**Customer Auto-Creation:**

When no match found:

1. System creates new customer in BC
2. Uses customer template (configure in BC)
3. Fills fields from JSON mapping
4. Assigns next available customer number
5. Links to order

**Manual Customer Review:**

1. Open **Customers**
2. Filter **Created by BRC Connect** (if field exists)
3. Review for duplicates or data quality
4. Merge duplicates using BC's customer merge tools

### 9. Item Management

Handle item auto-creation and variant matching:

**Item Matching:**

System matches items by:

1. **Item Reference** (cross-reference, barcode)
2. **Item No.** (direct match)
3. **Variant Code** (for product variants)

**Configure Item References:**

1. Open **Item References** (or **Item Cross References** in older BC)
2. For each item, add:
   - **Reference Type**: Customer, Vendor, or Bar Code
   - **Reference No.**: External SKU from e-commerce system
   - **Unit of Measure**: Matching UOM

**Item Auto-Creation:**

Enable in **BRC Connect Setup**:

1. Set **Auto Create/Update Item** = ON
2. System creates items when not found
3. Uses item template
4. Maps fields from JSON

**Variant Handling:**

For products with sizes, colors, etc.:

1. Create item in BC with variants
2. Add Item References for each variant
3. Map **variant** JSON field to **Variant Code** BC field
4. System matches to specific variant

### 10. Monitoring and Reporting

Track integration health and performance:

**Key Monitoring Pages:**

| Page | Purpose | Check Frequency |
|------|---------|-----------------|
| **BRC Connect Error List** | Critical errors requiring attention | Hourly |
| **BRC Outgoing Sync Queue** | Pending outbound records | Daily |
| **BRC Connect Entries** | HTTP request/response log | As needed |
| **BRC Process Run Logs** | Job execution history | Weekly |

**Email Monitoring:**

Enable automated alerts:

1. Open **BRC Connect Setup**
2. Set **Monitor Active** = ON
3. Enter **Monitor E-Mail List** (semicolon-separated)
4. System emails when errors exceed threshold

**Performance Metrics:**

Track these KPIs:

- **Order Processing Time**: Entry created to Sales Order created
- **Error Rate**: % of orders with errors
- **Sync Latency**: Time from BC change to external system update
- **Throughput**: Orders processed per hour/day

**Health Check Queries:**

Run these checks regularly:

```
// Orders pending processing
BRC Connect Content where Status IN (New, Read, Validated)

// Outbound records not synced
BRC Outgoing Sync Queue where Synced = FALSE AND Date < TODAY

// Recent errors
BRC Connect Error List where Date >= TODAY

// Failed HTTP requests
BRC Connect Entries where Status = Error
```

## Best Practices

### Order Processing

- ✅ Enable automation only after thorough testing
- ✅ Monitor errors daily, don't let error queue grow
- ✅ Set up email alerts for critical errors
- ✅ Clean up old entries regularly (configure "Delete Content After")
- ✅ Use sandbox environment for testing changes

### Data Quality

- ✅ Keep item references up-to-date with external SKUs
- ✅ Maintain clean customer data for accurate matching
- ✅ Regular review auto-created customers for duplicates
- ✅ Validate totals to catch pricing discrepancies early

### Performance

- ✅ Set appropriate **Process Entry Max Count** (100-500 depending on volume)
- ✅ Run job queues during off-peak hours for large batches
- ✅ Use product range filtering to reduce unnecessary data sync
- ✅ Archive old entries to keep tables lean

### Security

- ✅ Limit **BRC CONNECT - EDIT** permission to admins only
- ✅ Rotate bearer tokens periodically
- ✅ Review HTTP logs for suspicious activity
- ✅ Disable **Debug Mode** in production (logs sensitive data)

## Keyboard Shortcuts

Speed up common tasks:

| Action | Shortcut | Context |
|--------|----------|---------|
| **Refresh List** | F5 | Any list page |
| **Navigate to Record** | Shift+Click on Record ID | Opens linked BC record |
| **Filter Current Column** | Ctrl+F3 | Any list column |
| **Copy Field Value** | Ctrl+C | Selected field |

## Common Scenarios

### Scenario: High Order Volume Day

**Situation**: Black Friday, 500 orders in one hour

**Actions**:
1. Increase **Process Entry Max Count** to 500 temporarily
2. Reduce **No. of Minutes between Runs** to 2 minutes
3. Monitor **BRC Connect Error List** more frequently
4. Add warehouse staff to handle increased shipment volume
5. Revert settings after peak period

### Scenario: External System Down

**Situation**: E-commerce site is down, orders not downloading

**Actions**:
1. Check **Service Health** of external system
2. Disable **Integration Active** temporarily (prevents error buildup)
3. When system restored, re-enable **Integration Active**
4. Orders since last successful download will download automatically
5. Monitor for gaps in order sequences

### Scenario: Pricing Discrepancy

**Situation**: Order totals in BC don't match external order totals

**Actions**:
1. Review **BRC Connect Values** for the order
2. Compare external line prices vs. BC prices
3. Check **Unit Price Rounding** and **Discount Rounding** settings
4. Verify VAT calculations match
5. Adjust **Total Amt. Document Tolerance** if differences within acceptable range
6. Update BC prices if BC is wrong

### Scenario: Duplicate Customers

**Situation**: Same customer created multiple times

**Actions**:
1. Review **Unique Identifier** configuration in **BRC Content Type Field Setup**
2. Verify external system sends consistent email/phone values
3. Use BC's customer merge functionality to consolidate
4. Update **Unique Identifier Priority** to prefer most reliable field
5. Consider case sensitivity settings if email capitalization varies

## Next Steps

- [Integrations](../integrations/) - Deep dive into integration architecture
- [Troubleshooting](../troubleshooting/) - Detailed error resolution guide
- [Reference](../reference/) - API and permission reference
