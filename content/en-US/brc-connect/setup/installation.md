---
title: "Installation"
linkTitle: "Installation"
weight: 2
type: docs
description: >
  Step-by-step installation procedures for deploying BRC Connect to Business Central.
---

## Installation Overview

BRC Connect is installed as a per-tenant extension (PTE) in Business Central Cloud. The installation process deploys the app files, creates database objects, and runs installation codeunits to initialize the system.

**Installation Time**: 10-15 minutes
**Downtime**: None (users can continue working)
**Reversible**: Yes (can be uninstalled, though data will be lost)

## Before You Begin

Ensure you have:

- ✅ Verified all [Prerequisites](prerequisites)
- ✅ Business Central administrator access
- ✅ Extension Management permissions
- ✅ Backup of BC environment (recommended for production)
- ✅ BRC Connect app package (.app file) from BrightCom or AppSource

## Installation Methods

Choose the appropriate installation method:

### Method 1: AppSource Installation (Recommended)

**For SaaS customers with AppSource access:**

1. **Open Business Central**
   - Log in to your BC environment
   - Ensure you're in the target environment (sandbox or production)

2. **Navigate to AppSource**
   - Search for **Extension Management** or **AppSource Marketplace**
   - Choose **Marketplace**
   - Select **AppSource**

3. **Search for BRC Connect**
   - Enter "BRC Connect" in search
   - Select **BRC Connect** by BrightCom Solutions AB
   - Review app details and ratings

4. **Install the App**
   - Choose **Get it now** or **Free trial** (if applicable)
   - Accept terms and conditions
   - Choose **Install**

5. **Monitor Installation**
   - Installation status appears in notification area
   - Wait for "Installation completed" message
   - Refresh browser if needed

6. **Verify Installation**
   - Go to **Extension Management**
   - Confirm **BRC Connect** appears with status "Installed"
   - Note the installed version number

### Method 2: Manual Upload (Per-Tenant Extension)

**For customers with app package from BrightCom:**

1. **Obtain App Package**
   - Download `BRCConnect_25.0.25051.1.app` from BrightCom portal
   - Verify file integrity (check file size, no corruption)
   - Save to accessible location

2. **Open Extension Management**
   - In Business Central, search for **Extension Management**
   - Choose **Manage** → **Upload Extension**

3. **Upload App File**
   - Choose **Browse** or drag-and-drop
   - Select the `.app` file
   - Wait for upload to complete (progress bar shown)

4. **Configure Installation Options**
   - **Language**: Select default language (English, Swedish, etc.)
   - **Accept License Agreement**: Check the box
   - **Install for**: Choose **Current environment** or **All environments**

5. **Deploy the Extension**
   - Choose **Deploy**
   - Monitor deployment status
   - Installation runs in background

6. **Wait for Completion**
   - Deployment typically takes 5-10 minutes
   - Status changes from "Uploading" → "Installing" → "Installed"
   - Notification appears when complete

7. **Refresh Browser**
   - Refresh BC to load new extension UI
   - Log out and log back in if necessary

### Method 3: PowerShell Deployment

**For administrators deploying to multiple environments:**

```powershell
# Install BC PowerShell module (if not already installed)
Install-Module -Name "Microsoft.Dynamics.Bccontainer.Helper"

# Connect to BC environment
$tenant = "your-tenant-name"
$environment = "Production"

# Publish and sync extension
Publish-BcContainerApp `
    -containerName $environment `
    -appFile "C:\Path\To\BRCConnect_25.0.25051.1.app" `
    -sync `
    -install

# Verify installation
Get-BcContainerAppInfo -containerName $environment -name "BRC Connect"
```

**Note**: PowerShell method requires BC PowerShell modules and appropriate Azure AD authentication.

## Installation Process Details

### What Happens During Installation

The BRC Connect installer performs these actions:

1. **Database Schema Creation**
   - Creates BRC Connect tables (ID range 12073500-12073968)
   - Creates indexes and keys for performance
   - Sets up table relationships

2. **Codeunit Registration**
   - Registers ~75 codeunits for processing logic
   - Configures event subscribers
   - Initializes HTTP client

3. **Page Deployment**
   - Creates UI pages for setup and operations
   - Registers actions and navigation links
   - Deploys control add-ins (JSON Viewer)

4. **Permission Set Creation**
   - Creates **BRC CONNECT - EDIT** permission set
   - Creates **BRC CONNECT - VIEW** permission set
   - Grants permissions to object range

5. **Default Data Initialization**
   - Creates default **BRC Connect Type** records
   - Sets up standard field mappings (can be customized)
   - Initializes **BRC Connect Setup** with defaults

6. **Navigation Setup**
   - Adds BRC Connect entries to search
   - Creates role center links (if applicable)
   - Registers keyboard shortcuts

### Installation Codeunit

The installation logic is in:

- **Codeunit 12073538**: `ConnectInstall`
  - `OnInstallAppPerCompany()` trigger
  - Creates default BRC Connect Types
  - Initializes setup table with sensible defaults
  - Configures codeunit assignments

**Data Upgrade:**
- **Codeunit 12073506**: `BRCConnectDataupgrade`
  - Handles upgrades from previous versions
  - Migrates data schemas if needed
  - Runs on upgrade installations

## Post-Installation Steps

### 1. Verify Installation Success

**Check Extension Status:**

1. Open **Extension Management**
2. Find **BRC Connect** in the list
3. Verify:
   - Status: "Installed"
   - Version: 25.0.25051.1 (or current version)
   - Publisher: BrightCom Solutions AB

**Test Basic Functionality:**

1. Search for **BRC Connect Setup**
2. Page should open without errors
3. Default values should be present
4. Fields should be editable

### 2. Assign Permissions

**Create User Groups (if not using permission sets directly):**

1. Search for **Permission Sets**
2. Locate **BRC CONNECT - EDIT** and **BRC CONNECT - VIEW**
3. Assign to appropriate users or user groups

**Test Permissions:**

1. Log in as non-admin user
2. Verify access to **BRC Connect Setup** (if assigned EDIT)
3. Verify access to **BRC Connect Entries** (if assigned VIEW)

### 3. Review Default Configuration

**Open BRC Connect Setup:**

1. Search for **BRC Connect Setup**
2. Review default values set by installer:
   - **Integration Active**: OFF (correct - don't enable until configured)
   - **Auto Download Documents**: OFF
   - **Process Entry Max Count**: 100
   - **Webservice Retries**: 3
3. **Do not enable** Integration Active yet

**Review BRC Connect Types:**

1. Search for **BRC Connect Type**
2. Verify default types exist:
   - DOCUMENT
   - CUSTOMER
   - ITEM
   - INVENTORY
   - PRICE
   - PAYMENT
   - SHIPMENT
3. Note codeunit assignments for each type

### 4. Check Database Objects

**Verify Tables Created:**

Run this from AL:
```al
// In AL development environment
Table.Get(Database::"BRC Connect Entry"); // 12073500
Table.Get(Database::"BRC Connect Setup"); // 12073501
Table.Get(Database::"BRC Connect Content"); // 12073502
```

Or search for these pages to confirm backend tables exist:
- **BRC Connect Entries**
- **BRC Connect Content**
- **BRC Outgoing Synce Queue**

### 5. Review Event Log

**Check for Installation Errors:**

1. Search for **BC Admin Center** or **Telemetry**
2. Filter for events from today
3. Look for errors related to "BRC Connect" or "BrightCom"
4. Common benign messages:
   - "Extension installed successfully"
   - "Default data created"
   - "Permission sets registered"

### 6. Initial Health Check

**Run Basic Tests:**

1. Open **BRC Connect Entries**
2. Verify list page opens (should be empty)
3. Verify actions are available (Get All Documents, etc.)
4. Close page

**Do NOT run "Get All Documents"** yet - API credentials not configured.

## Troubleshooting Installation Issues

### Issue: Installation Fails with "Dependency Missing"

**Cause**: Required BC extensions not installed

**Resolution**:
1. Check **Extension Management** for missing dependencies
2. Install dependent extensions first
3. Retry BRC Connect installation
4. BRC Connect should have no external dependencies (only base BC)

### Issue: Installation Hangs at "Installing..."

**Cause**: Large transaction, server busy, or timeout

**Resolution**:
1. Wait 15-20 minutes (some installations are slow)
2. If still hung, contact BC support
3. Check **Service Health** in Microsoft 365 admin center
4. Retry during off-peak hours

### Issue: Permission Denied During Installation

**Cause**: Insufficient user permissions

**Resolution**:
1. Verify user has **D365 FULL ACCESS** or **SUPER** permission set
2. Verify user assigned to administrator role in **User Security Status**
3. Log out and log back in to refresh permissions
4. Retry installation

### Issue: "This extension cannot be installed" Error

**Possible Causes and Solutions**:

**App not compatible with BC version:**
- Verify BC version is 25.0 or later
- Update BC to compatible version
- Obtain correct app version from BrightCom

**App signature invalid:**
- Re-download app from trusted source
- Verify file not corrupted
- Contact BrightCom for new package

**App already installed:**
- Check **Extension Management** for existing installation
- Uninstall previous version first
- Retry installation

### Issue: Tables or Pages Missing After Installation

**Cause**: Incomplete synchronization or browser cache

**Resolution**:
1. Refresh browser (Ctrl+F5)
2. Clear browser cache
3. Log out and log back in
4. Re-sync extension from **Extension Management**:
   - Select BRC Connect
   - Choose **Uninstall**
   - Wait for completion
   - Choose **Install** again

## Upgrading from Previous Versions

If upgrading from an older BRC Connect version:

### Pre-Upgrade Checklist

1. **Backup Environment**
   - Create sandbox copy of production
   - Export BRC Connect data if possible
   - Document current configuration

2. **Review Release Notes**
   - Check what changed in new version
   - Identify breaking changes
   - Plan configuration updates

3. **Test in Sandbox**
   - Install new version in sandbox first
   - Test key workflows
   - Verify data migration

### Upgrade Process

1. **Disable Integration**
   - Open **BRC Connect Setup**
   - Set **Integration Active** = OFF
   - Wait for active jobs to complete

2. **Upload New Version**
   - Go to **Extension Management**
   - Choose **Upload Extension**
   - Select new .app file
   - System detects upgrade and runs data migration

3. **Run Data Upgrade**
   - Codeunit 12073506 (`BRCConnectDataupgrade`) runs automatically
   - Migrates schema changes
   - Updates default values

4. **Verify Configuration**
   - Review **BRC Connect Setup** for new fields
   - Check **BRC Connect Type** for updated codeunit assignments
   - Test field mappings still valid

5. **Re-Enable Integration**
   - Set **Integration Active** = ON
   - Monitor **BRC Connect Entries** for issues
   - Review **BRC Connect Error List**

### Rollback Procedure

If upgrade fails:

1. **Restore Sandbox Backup**
   - Use BC's environment restore functionality
   - Restore to pre-upgrade state

2. **Uninstall New Version**
   - **Extension Management** → Select BRC Connect
   - Choose **Uninstall**

3. **Reinstall Previous Version**
   - Upload previous .app file
   - Install as normal

4. **Contact BrightCom Support**
   - Report upgrade issue
   - Provide error messages and telemetry
   - Get guidance on resolution

## Multi-Environment Deployment

For organizations with multiple BC environments:

### Recommended Deployment Strategy

```
Development → Sandbox → Production
```

1. **Development Environment**
   - Install and configure initially
   - Test field mappings
   - Validate codeunit customizations (if any)

2. **Sandbox Environment**
   - Deploy configuration from development
   - Perform end-to-end testing
   - Train users

3. **Production Environment**
   - Deploy after successful sandbox testing
   - Use same configuration
   - Monitor closely during initial days

### Configuration Export/Import

BRC Connect configuration can be exported/imported:

1. **Export Configuration** (from sandbox):
   - Use RapidStart Services or Configuration Packages
   - Export these tables:
     - BRC Connect Setup
     - BRC Connect Type
     - BRC Content Type Field Setup
     - BRC Mapping

2. **Import Configuration** (to production):
   - Create Configuration Package in production
   - Import exported data
   - Verify API credentials updated for production

## Next Steps

After successful installation:

1. ✅ Installation complete - BRC Connect is deployed
2. ➡️ Proceed to [Configuration](configuration) to set up API connection and field mappings
3. ➡️ Review [Prerequisites](prerequisites) if you missed any steps
4. ➡️ Contact BrightCom Support if installation issues persist

## Installation Checklist

- [ ] BRC Connect installed via AppSource or manual upload
- [ ] Extension status shows "Installed" in Extension Management
- [ ] Version number confirmed as 25.0.25051.1 or current
- [ ] **BRC Connect Setup** page opens without errors
- [ ] Default BRC Connect Types created
- [ ] Permission sets (BRC CONNECT - EDIT, BRC CONNECT - VIEW) available
- [ ] Permissions assigned to appropriate users
- [ ] Installation errors reviewed in event log (none critical)
- [ ] Integration Active = OFF (do not enable until configured)
- [ ] Ready to proceed to configuration

## Support Information

**Installation Support:**
- BrightCom Solutions AB: [brightcom.se/kontakt](https://brightcom.se/kontakt/)
- Documentation: [docs.brightcom.online/brcconnect](https://docs.brightcom.online/brcconnect)

**Microsoft Business Central Support:**
- For BC platform issues (not BRC Connect specific)
- Access via BC Admin Center → Support

**Community Resources:**
- BRC Connect documentation site
- BrightCom customer portal
- BC community forums (for BC-related questions)
