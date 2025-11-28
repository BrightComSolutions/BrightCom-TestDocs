---
title: "Installation"
linkTitle: "Installation"  
weight: 22
description: >
  Step-by-step installation guide for BRC Retail Extension.
---

## Installation Overview

BRC Retail Extension is installed as a standard Business Central extension. The installation process includes app deployment, permission assignment, and initial system validation.

## Installation Methods

### Method 1: AppSource Installation (Recommended)

1. **Access AppSource**
   - Open Business Central and navigate to **Extension Management**
   - Search for "BRC Retail Extension" by BrightCom Solutions AB
   - Click **Install** to begin installation

2. **Installation Process**
   - Accept license terms and privacy policy
   - Confirm installation in your environment
   - Wait for installation completion (typically 2-5 minutes)

3. **Verification**
   - Refresh Extension Management page
   - Verify "BRC Retail Extension" appears as **Installed**
   - Check version number matches 24.4.24986.1 or higher

### Method 2: Manual Installation (Partner/Admin)

1. **Download App Package**
   - Obtain the .app file from BrightCom Solutions AB
   - Ensure you have the correct version for your BC environment

2. **Deploy via Admin Center**
   - Access Business Central Admin Center
   - Navigate to **Apps** section
   - Click **Upload** and select the .app file
   - Choose target environment for deployment

3. **Installation Completion**
   - Monitor installation progress in Admin Center
   - Verify successful deployment status
   - Check extension appears in target environment

## Post-Installation Verification

### 1. Extension Status Check

1. **Verify Installation**
   - Open **Extension Management** in Business Central
   - Locate "BRC Retail Extension" in the installed extensions list
   - Confirm status shows as **Installed** and **Enabled**

2. **Check Object Installation**
   ```
   Expected Objects Installed:
   - Tables: 17 custom tables + table extensions
   - Pages: 15+ pages and page extensions  
   - Codeunits: 15+ codeunits for business logic
   - Reports: 8 specialized reports
   - Enums: 6 enumeration objects
   - Permission Sets: 1 comprehensive permission set
   ```

### 2. Basic Functionality Test

1. **Access Setup Page**
   - Navigate to Search and enter "BRC Retail Setup"
   - Open **BRC Retail Setup** page
   - Verify page opens without errors

2. **Check Permission Set**
   - Go to **Permission Sets**
   - Search for "BRC Retail All"
   - Verify permission set exists with correct object assignments

3. **Test Page Extensions**
   - Open any **Item Card**
   - Verify new BRC Retail fields are visible (Variant Template Code, Brand, Season, etc.)
   - Open **Sales Order** and verify variant-related fields on lines

## Permission Assignment

### 1. Administrative Setup

Assign permissions to users who will configure the system:

1. **Access User Management**
   - Navigate to **Users** in Business Central
   - Select administrative users

2. **Assign Permission Set**
   - Add **"BRC Retail All"** permission set
   - Verify assignment is effective immediately
   - Test access to BRC Retail Setup

### 2. End User Permissions

For regular users working with variants:

1. **Create Custom Permission Set** (Optional)
   - Copy "BRC Retail All" as template
   - Remove administrative objects if needed
   - Assign to appropriate user groups

2. **Standard Assignment**
   - Most users can use the full "BRC Retail All" permission set
   - Verify users can access relevant pages and functions

## Validation Checklist

Complete this checklist to ensure successful installation:

### Core Installation
- [ ] Extension appears as "Installed" in Extension Management
- [ ] Version number is 24.4.24986.1 or higher
- [ ] No error messages during installation process
- [ ] BRC Retail Setup page opens successfully

### Object Verification
- [ ] BRC Retail Setup page accessible (ID 12097620)
- [ ] Item card shows new BRC Retail fields
- [ ] Sales/Purchase documents show variant extensions
- [ ] BRC Retail permission set exists and is complete

### Permission Testing
- [ ] Administrative users can access setup functions
- [ ] End users can access relevant variant management features
- [ ] No permission errors when accessing BRC Retail functionality

### Integration Points
- [ ] Item management pages show BRC extensions
- [ ] Sales order lines display variant information
- [ ] Purchase order lines show variant capabilities
- [ ] Inventory pages reflect variant functionality

## Troubleshooting Installation Issues

### Common Installation Problems

**Extension Installation Fails**
- Verify Business Central version compatibility (24.0+)
- Check object ID range availability (12097619-12097668)
- Ensure adequate permissions for installation
- Review environment capacity and limits

**Permission Errors After Installation**
- Confirm "BRC Retail All" permission set was created
- Verify users have been assigned the permission set
- Check that permissions are effective (may require sign-out/sign-in)
- Validate user has base permissions for items and sales/purchase

**Objects Not Appearing**
- Refresh browser cache and reload Business Central
- Verify extension is both installed AND enabled
- Check that installation completed without errors
- Confirm no conflicts with other extensions

**Setup Page Inaccessible**
- Verify user has "BRC Retail All" permissions
- Check that extension installation completed fully
- Confirm page ID 12097620 is available
- Try accessing via direct search in Business Central

### Getting Help

If installation issues persist:

1. **Check System Requirements**
   - Review [Prerequisites](prerequisites.md) again
   - Verify all requirements are met

2. **Review Error Messages**
   - Document exact error messages
   - Check Business Central event log if available
   - Note timing of when errors occur

3. **Contact Support**
   - Reach out to BrightCom Solutions AB support
   - Provide environment details and error information
   - Include steps taken prior to encountering issues

## Next Steps

After successful installation:

1. **Initial Configuration**
   - Proceed to [Configuration Guide](configuration.md)
   - Set up basic system parameters

2. **User Training**
   - Plan user training sessions
   - Review [User Guide](../user-guide/) for operational procedures

3. **Testing**
   - Conduct thorough testing in sandbox environment
   - Validate business processes with BRC Retail features

4. **Go-Live Planning**
   - Plan production deployment
   - Prepare rollback procedures if needed
   - Schedule user training and support

## Installation Complete

With successful installation and verification, your Business Central environment now includes the full BRC Retail Extension functionality. Continue to configuration to set up the system for your specific business requirements.