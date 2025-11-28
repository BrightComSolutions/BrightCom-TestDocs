---
title: "Prerequisites"
linkTitle: "Prerequisites"
weight: 10
description: >
  System requirements and prerequisites for installing and configuring BRC Logistics.
---

## Business Central Requirements

### Platform Version
- **Minimum Version**: Business Central 24.0 (Spring 2024 release)
- **Platform**: 1.0.0.0 or later
- **Application**: 24.0.0.0 or later
- **Runtime**: 8.0
- **Deployment**: Cloud (SaaS) - On-premises not supported

### License Requirements
- Valid Business Central license with:
  - **Sales Order Management** module
  - **Purchase Order Management** module
  - **Inventory Management** module
  - **Item Tracking** (if using serial/lot numbers)
  - **Warehouse Management** (optional, for advanced warehousing)

## User Permissions

### Installation Permissions
- **SUPER** permission set required for:
  - Extension installation from AppSource or file upload
  - Initial configuration
  - Permission set assignment

### Operational Permissions
- **BRC Lgsts** permission set (installed with app) grants:
  - Execute (X) permissions on all BRC Logistics codeunits
  - Read/Insert/Modify/Delete (RIMD) on BRC Logistics tables
  - Read permissions on related BC tables (Sales, Purchase, Item, etc.)

### Additional Permissions Needed
- **Job Queue administration** - To activate automated polling
- **Email configuration** - To send error notifications and summaries
- **Item Journal posting** - For inventory adjustment processing
- **Sales Order posting** - For auto-posting shipments
- **Purchase Order posting** - For auto-posting receipts

## WMS Provider Requirements

### Active WMS Account
- Account with one of the 35+ supported WMS platforms
- Warehouse location(s) configured in WMS system
- WMS user with appropriate API access permissions

### API Credentials
Depending on your WMS platform, you'll need:

**For REST/SOAP APIs:**
- Username and password
  OR
- API key/token

**For OAuth 2.0 APIs (3PL Central, ShipHero, Bitlog, Logiwa):**
- OAuth Client ID
- OAuth Client Secret
- OAuth Scope (usually provided by WMS platform)

**For File-Based Integration (BC Connect, Bergendahls):**
- File share access (FTP, SFTP, Azure Blob Storage)
- Container/folder names
- Authentication credentials

### WMS Configuration

Before integrating with Business Central, ensure your WMS has:

1. **Warehouse location(s)** set up and active
2. **User account** with API access enabled
3. **Item master capability** (ability to receive product data from BC or manually enter)
4. **Customer/Vendor integration** enabled (if syncing master data)
5. **Webhooks or polling endpoints** configured (for receiving BC data)
6. **Return address labels** (if using returns management integrations)

## Business Central Configuration

### Mandatory Setup

#### 1. Location Codes
- At least one location code defined in Business Central
- Location must represent the physical warehouse managed by WMS
- Navigate to: **Inventory Setup** → **Locations**

#### 2. Number Series
Configure number series for:
- **BRC Logi Warehouse Documents** (auto-created, but verify)
- Navigate to: **No. Series**

#### 3. Item Master Data
- Items must exist in Business Central Item table
- Items should have:
  - **Base Unit of Measure** defined
  - **Item Category** (recommended)
  - **Inventory Posting Group** and **Gen. Prod. Posting Group** (for posting)
  - **Serial/Lot Number Tracking** configured (if using item tracking)

#### 4. Customers and Vendors
- Customer/Vendor master data complete with:
  - **Name** and **Address**
  - **Contact** information (phone, email recommended)
  - **Posting Groups** configured
  - **Payment Terms** and **Shipping Agents** (for sales)

### Recommended Setup

#### 1. Item Journal Templates and Batches
For inventory synchronization features:

**Adjustment Journal:**
- Template: `ITEM` (or create new)
- Batch: `WMSADJ` (recommended name)
- Navigate to: **Item Journals** → Select template → **Batches**

**Physical Inventory Journal:**
- Template: `PHYS INV` (or create new)
- Batch: `WMSBAL` (recommended name)

#### 2. Shipping Agents
For carrier tracking number integration:
- Create shipping agent codes matching your carriers
- Navigate to: **Shipping Agents**
- Examples: `UPS`, `FEDEX`, `DHL`, `USPS`

#### 3. Return Reason Codes
If using returns management:
- Define return reason codes in Business Central
- Navigate to: **Return Reason Codes**
- Examples: `DEFECTIVE`, `WRONG-ITEM`, `SIZE`, `DAMAGED`

#### 4. Item Charges
For return fees or shipping charges:
- Create item charge codes
- Navigate to: **Item Charges**
- Example: `RETURN-FEE`, `SHIPPING`

#### 5. Units of Measure
- Define all units of measure used in your business
- Configure **Item Units of Measure** for items with multiple UoMs
- Ensure **Qty. per Unit of Measure** is correct
- Navigate to: **Units of Measure** and **Item Card** → **Units of Measure**

## Network and Infrastructure

### Internet Connectivity
- **Outbound HTTPS (port 443)** - Required for REST/SOAP API calls to WMS
- **Outbound SMTP** - Required for email notifications (if enabled)
- **Business Central Online** must have internet access (standard for cloud)

### Firewall/Security
- No inbound firewall rules required (BC initiates all connections)
- Outbound connections to WMS API endpoints must be allowed
- If using webhooks, WMS must be able to reach BC OData/API endpoints

### Azure Blob Storage (Optional)
If using file-based integration with Azure Blob Storage:
- Azure Storage Account created
- Container(s) created for import/export
- Access keys or SAS tokens configured
- Navigate to: Azure Portal → Storage Accounts

## Email Configuration

### SMTP Setup
For error notifications and daily summaries:
1. Navigate to: **SMTP Mail Setup** in Business Central
2. Configure SMTP server settings:
   - **Server**: SMTP server address
   - **Port**: Usually 25, 587, or 465
   - **Authentication**: Username/password if required
   - **Secure Connection**: ✓ (recommended)

### Test Email
1. Navigate to: **Email Accounts**
2. Send test email to verify configuration
3. Confirm receipt before relying on automated notifications

## Integration Knowledge

### Recommended Skills
Users configuring BRC Logistics should have:

- **Business Central administration experience** - Understanding of setup tables, permissions, job queues
- **Inventory management knowledge** - Familiarity with sales orders, purchase orders, item journals
- **Basic API concepts** - Understanding of REST/SOAP, authentication, request/response
- **WMS platform knowledge** - Familiarity with your specific WMS platform's configuration

### Optional Advanced Skills
For complex scenarios:
- **AL development** - For custom field mapping or event subscriber extensions
- **Azure administration** - If using Azure Blob Storage for file exchange
- **XML/JSON** - For troubleshooting request/response payloads

## Testing Environment

### Recommended: Sandbox Environment
Before production deployment:
1. Create Business Central **sandbox environment**
2. Install BRC Logistics in sandbox
3. Configure with WMS **test/development account**
4. Test complete workflows (sales orders, purchase orders, returns)
5. Verify auto-posting works correctly
6. Test error scenarios and notification emails

### Production Considerations
- Never test in production environment initially
- Use WMS test mode if available (many WMS platforms support test/sandbox mode)
- Plan go-live timing during low-volume period
- Have rollback plan if issues arise

## Supported WMS Platforms

Verify your WMS platform is in the supported list. As of version 24.0.26530.1:

### Full WMS Integrations (30)
3PL Central, Aditro Logistics, Allson, Alyson, BC Connect, Bergendahls Foodservice, Bitlog, Bluejay, Bonver, BX Software, Diracom, DSV (Mintsoft), Extend, JD Logistics, Logiwa, Mintsoft, Nowaste, Nyce REST API, Ongoing WMS SOAP, Posti, Prime Penguin, QSSI, Schipt, ShipHero, SMD, Speedgroup Astro, Stan Robinson, VeraCore, Zenventory

### Returns Management Integrations (8)
Claim Line Return, EasyCom Return, nShift Return (Returnado), ReclaimIt Return, Return Center, Sello Return, TurnR Return, Yahloh Return

See [Integrations Documentation](../integrations/) for platform-specific requirements.

## Data Readiness

### Before Go-Live
Ensure you have:

1. **Item master data** complete and accurate in BC
2. **Customer addresses** complete (for shipment orders)
3. **Vendor information** complete (for receival orders)
4. **Inventory counts** synchronized between BC and WMS
5. **Open sales orders** and **purchase orders** reviewed (decide if sending to WMS or fulfilling manually)

### Initial Data Sync
Plan for initial synchronization:
- Will you send all BC items to WMS? (can take time for large catalogs)
- Will you manually create items in WMS first?
- Do you need historical inventory balance sync?
- How will you handle in-flight orders during go-live?

## Support Resources

### BrightCom Solutions Support
- **Help Site**: [https://docs.brightcom.se/sv/Products/BRCLogistics](https://docs.brightcom.se/sv/Products/BRCLogistics)
- **Website**: [https://brightcom.se/](https://brightcom.se/)
- **Privacy Policy**: [https://docs.brightcom.se/sv/PrivacyPolicy/BRCLogistics](https://docs.brightcom.se/sv/PrivacyPolicy/BRCLogistics)

### WMS Provider Support
- Ensure you have support contact for your WMS platform
- API documentation should be available from WMS provider
- Know your WMS support hours and SLAs

## Checklist

Before proceeding to installation:

- [ ] Business Central version 24.0+ confirmed
- [ ] Cloud deployment confirmed
- [ ] SUPER permission set assigned to installer
- [ ] WMS account active with API credentials obtained
- [ ] Location codes defined in Business Central
- [ ] Item master data complete
- [ ] Item journal templates and batches created
- [ ] Shipping agents configured
- [ ] Return reason codes defined (if using returns)
- [ ] Email/SMTP configured
- [ ] Sandbox environment available for testing
- [ ] WMS platform in supported list confirmed

## Next Steps

With prerequisites met, proceed to:
- [Installation Guide](../setup/#installation-steps)
- [Configuration Guide](configuration/)
