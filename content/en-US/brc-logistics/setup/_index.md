---
title: "Setup & Installation"
linkTitle: "Setup"
weight: 20
description: >
  Complete setup guide for BRC Logistics including prerequisites, installation steps, connection configuration, and initial setup for WMS integration.
---

## Overview

This guide walks through the complete setup process for BRC Logistics, from installation to first successful WMS transaction. The setup process typically takes 30-60 minutes depending on WMS platform complexity.

## Installation Steps

### 1. Prerequisites

Before installing BRC Logistics, ensure you have:

#### Business Central Requirements
- **Version**: Business Central 24.0 or later
- **Deployment Type**: Cloud (SaaS)
- **Runtime**: 8.0+
- **License**: Valid Business Central license with inventory management permissions

#### User Permissions
- **SUPER** permission set (for installation and initial setup)
- **BRC Lgsts** permission set (assigned after installation for regular users)
- Access to **Job Queue administration**
- Email configuration permissions (for error notifications)

#### WMS Requirements
- Active account with supported WMS provider
- WMS API credentials (username, password, API key, or OAuth client credentials)
- WMS account configured with your warehouse location(s)
- WMS item master data (or plan to sync from Business Central)

#### Business Central Configuration
- **Location codes** defined for warehouses using WMS
- **Item journal templates** and batches configured (for inventory adjustments)
- **Number series** configured for warehouse documents
- **Shipping agents** configured (for carrier tracking)
- **Return reason codes** configured (if using returns management)

### 2. App Installation

**Option A: Install from AppSource**
1. Open Business Central
2. Search for **Extension Management**
3. Click **Manage** → **Browse AppSource**
4. Search for **"BRC Logistics"**
5. Click **Get it now** → **Install**
6. Accept terms and conditions
7. Wait for installation to complete (2-5 minutes)

**Option B: Install from Extension Management (if provided by partner)**
1. Obtain `.app` file from BrightCom Solutions or partner
2. Open **Extension Management**
3. Click **Upload Extension**
4. Select the `.app` file
5. Click **Deploy** → **Install**

### 3. Verify Installation

After installation completes:

1. Search for **"BRC Logi Setup"**
   - If the page opens, installation succeeded
2. Verify permission set:
   - Search for **Permission Sets**
   - Confirm **BRC Lgsts** exists (Object ID 12073969)
3. Check object range:
   - Search for **Objects** (if available in environment)
   - Verify objects in range 12073969-12074468

### 4. Automatic Installation Actions

The installation process automatically:

- Creates the **BRC Lgsts** permission set
- Registers 35+ integration engine options
- Creates table structures for:
  - BRC Logi Setup (configuration)
  - BRC Logi Warehouse Header (transactions)
  - BRC Logi Warehouse Line (transaction lines)
  - BRC Logi Item SKU (item mapping)
  - Additional support tables (see [Data Model Reference](../reference/data-model/))

## Initial Configuration

### 5. Assign Permissions

**For Users Who Will Configure WMS:**
1. Search for **Users**
2. Select user
3. Click **User Permission Sets**
4. Add **BRC Lgsts** permission set

**For Users Who Will Monitor Transactions:**
1. Assign **BRC Lgsts** (for full access)
   OR
2. Create custom permission set with read-only access to:
   - BRC Logi Warehouse Header (Read)
   - BRC Logi Warehouse Line (Read)
   - BRC Logi Setup (Read)

### 6. Create Logistics Setup

1. Search for **BRC Logi Setup**
2. Click **+ New**
3. Enter required fields:

| Field | Example Value | Description |
|-------|---------------|-------------|
| Code | MAIN-WMS | Unique identifier (max 20 characters) |
| Description | Main Warehouse - Ongoing WMS | Descriptive name |
| Integration Engine | Ongoing WMS SOAP | Select your WMS platform from dropdown |
| Location Code | MAIN | BC location code for this warehouse |
| Enabled | No (configure first, enable later) | Start disabled for testing |

4. Click **OK** - System auto-configures codeunits based on Integration Engine

### 7. Configure Connection Settings

Click into your setup card and configure the **System** FastTab:

#### For REST/SOAP API Integrations:

| Field | Purpose | Example |
|-------|---------|---------|
| Webservice URL / Export Path | Outbound API endpoint | `https://api.ongoingwms.com/` |
| Webservice URL / Import Path | Inbound API endpoint (often same) | `https://api.ongoingwms.com/` |
| Username / Key | API username or key | `your-company` |
| Password | API password or secret | `••••••••` |

#### For OAuth-Based Integrations (3PL Central, ShipHero, Bitlog):

| Field | Purpose |
|-------|---------|
| Username / Key | OAuth Client ID |
| Password | OAuth Client Secret |
| OAuth Scope | OAuth scope (auto-populated for most platforms) |

#### For File-Based Integrations (BC Connect, Bergendahls):

| Field | Purpose |
|-------|---------|
| Webservice URL / Export Path | File export folder path or Azure Blob Storage container |
| Webservice URL / Import Path | File import folder path or Azure Blob Storage container |
| ABS Container Name | Azure Blob Storage container name (if applicable) |

**Important**: Passwords are encrypted in the database. Test connection before enabling.

### 8. Configure Document Processing

On the **Document** FastTab, configure automation behavior:

#### Auto-Send Settings
- **Auto-Send on Shipment Request**: ✓ (recommended) - Sends sales orders when released
- **Auto-Send on Receival Request**: ✓ (recommended) - Sends purchase orders when released
- **Auto-Send Return to WMS**: ✓ (if using returns)

#### Auto-Post Settings
- **Post Shipment**: ✓ (recommended) - Auto-posts sales shipments from WMS confirmations
- **Post Receival**: ✓ (recommended) - Auto-posts purchase receipts from WMS confirmations
- **Invoice and Ship**: ☐ (use cautiously) - Auto-invoices when shipping

**Warning**: Auto-posting requires careful setup. Test with manual posting first.

#### Tolerance Settings
- **Allow Over Receival**: ✓ (if WMS may receive slightly more than ordered)
- **Tolerance % - Over Receival**: `5` (allow 5% variance)
- **Allow Over Shipment**: ☐ (usually disabled)
- **Tolerance % - Over Shipment**: `0`

### 9. Configure Item Integration

On the **Item** FastTab:

#### Item Availability
Choose how items are made available to WMS:

- **All Items Enabled**: All BC items sync to WMS
- **Item Field No. for Enable**: Specify boolean field on Item table (e.g., field 50000 "Send to WMS")
- **Item Available Filter View**: Filter view key for complex criteria

**Recommendation**: Start with "All Items Enabled" for testing, refine with filters for production.

#### Item SKU Options
Select how items are identified in WMS:

- **Item only**: Use BC Item No. as WMS SKU
- **Item + Variant**: Combine Item No. and Variant Code (e.g., `ITEM001-BLUE`)
- **Item + Variant + UoM**: Include unit of measure (e.g., `ITEM001-BLUE-BOX`)

**Item Variant Delimiter**: `-` (character separating Item from Variant in SKU)

#### Item Tracking
Enable serial/batch number tracking per document type:

| Document Type | Serial No. | Batch No. |
|---------------|------------|-----------|
| Shipment | ✓ | ✓ |
| Receival | ✓ | ✓ |
| Transfer In | ✓ | ✓ |
| Transfer Out | ✓ | ✓ |

### 10. Configure Item Journals

If using inventory synchronization, configure journals on **Item Journals** FastTab:

#### Adjustment Journal
- **Adjust. Item Journal Template**: `ITEM`
- **Adjustment Item Journal Batch**: `WMSADJ`
- **Auto-Post Adjustment**: ✓

#### Physical Inventory Journal
- **Invent. Journal Template**: `PHYS INV`
- **Invent. Journal Batch**: `WMSBAL`
- **Auto-Post Balance**: ✓
- **Add Missing Items To Journal**: ✓
- **Clear Phys. Inv. on Both Zero**: ✓

**Note**: Create journal batches if they don't exist:
1. Search for **Item Journals**
2. Select template
3. Click **Batches** → **+ New**
4. Enter batch name

### 11. Configure Job Queue

BRC Logistics uses Business Central's job queue for automated polling:

1. Search for **Job Queue Entries**
2. Find entry with:
   - **Object Type to Run**: Codeunit
   - **Object ID to Run**: (varies by setup)
   - **Parameter String**: Your setup code
3. Configure schedule:
   - **Status**: On Hold (start with this)
   - **Recurring Job**: ✓
   - **Run on Mondays**: ✓ (select all days you want polling)
   - **Run on Tuesdays**: ✓
   - _(Select all 7 days for continuous operation)_
   - **Starting Time**: 00:00:00
   - **Ending Time**: 23:59:59
   - **No. of Minutes between Runs**: `15` (polls every 15 minutes)

**Important**: Leave status as **On Hold** until you complete testing.

### 12. Configure Error Management

On **System** FastTab:

| Field | Recommended Value | Purpose |
|-------|-------------------|---------|
| Error Max Count | `3` | Max errors before stopping processing |
| Send mail on Error | ✓ | Email when errors occur |
| Error E-Mail Recipient List | `wms-admin@company.com;it-support@company.com` | Semicolon-separated emails |
| Send E-mail Summary | ✓ | Daily summary |
| E-mail Summary Time | 08:00:00 | When to send summary |

### 13. Platform-Specific Configuration

Some WMS platforms require additional settings. See:

- [Ongoing WMS Configuration](ongoing-wms/)
- [Bitlog Configuration](bitlog/)
- [3PL Central Configuration](3pl-central/)
- [ShipHero Configuration](shiphero/)
- [Full integration list](../integrations/)

### 14. Test Connection

Before enabling:

1. Click **Actions** → **Check For Change**
2. Review any error messages
3. Verify connection succeeds
4. Check **BRC Logi Whse. Transactions** for test transactions

### 15. Enable Setup

Once configuration is complete and tested:

1. Open your setup record
2. Set **Enabled** = ✓
3. Activate job queue entry (change Status from "On Hold" to "Ready")

## Post-Installation Tasks

### Generate Item SKU List

1. Open **BRC Logi Setup Card**
2. Click **Actions** → **Generate Item SKU List**
3. Confirm item count
4. Review **BRC Logi Item SKU List** to verify mappings

### Configure Reason Codes

1. Search for **BRC Logi Whse. Reason Codes**
2. Create entries for return reasons, adjustment reasons
3. Map to BC return reason codes
4. Configure conditional logic (fees, exchanges, pricing)

See: [Reason Code Configuration](configuration/#reason-codes)

### Configure Value Mappings

1. Search for **BRC Logi Mapping**
2. Create translation entries for:
   - Location codes (if WMS uses different codes)
   - Status values
   - Custom codes

See: [Value Mapping Configuration](configuration/#value-mapping)

### Set Up Extra Field Mappings

For advanced scenarios requiring custom field exchange:

1. Search for **BRC Logi Extras**
2. Define mappings from BC table fields to WMS Extra Fields
3. Specify WMS field names (XML/JSON element names)

See: [Extra Field Configuration](configuration/#extra-fields)

## Next Steps

- [Prerequisites Details](prerequisites/)
- [Configuration Guide](configuration/)
- [First Transaction Test](../user-guide/getting-started/)
- [Troubleshooting Setup Issues](../troubleshooting/)

## Common Setup Issues

See [Troubleshooting Guide](../troubleshooting/) for solutions to:

- Connection failures
- Permission errors
- Job queue not running
- Item SKU generation issues
- Auto-posting failures
