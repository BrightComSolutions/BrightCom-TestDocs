---
title: "Installation"
linkTitle: "Installation"
weight: 22
description: >
  Step-by-step installation guide for BRC Core.
---

## Pre-Installation Steps

Before beginning installation, ensure you have completed all [prerequisites](prerequisites/) and have administrative access to your Business Central environment.

### 1. Verify System Requirements
- Confirm Business Central 25.0 or later is running
- Check that Microsoft Intrastat Core app is installed
- Verify network connectivity to external services
- Ensure backup procedures are in place

## Installation Process

### Step 1: Download BRC Core App

1. Access Microsoft AppSource or your organization's app distribution channel
2. Locate "BRC Core" published by BrightCom Solutions AB
3. Download the app package (`.app` file)
4. Save to a secure location accessible during installation

### Step 2: Install via Extension Management

1. **Open Business Central Admin Center** or your Business Central environment
2. Navigate to **Extension Management** 
   - Path: `Setup & Extensions > Extension Management`
3. Choose **Upload Extension**
4. Select the BRC Core `.app` file
5. Click **Deploy** to begin installation

**Installation Progress**:
- The system will validate dependencies
- Microsoft Intrastat Core dependency will be verified
- App will be installed and activated automatically

### Step 3: Verify Successful Installation

1. Return to **Extension Management** page
2. Locate "BRC Core" in the installed extensions list
3. Verify the following details:
   - **Name**: BRC Core
   - **Publisher**: BrightCom Solutions AB  
   - **Version**: 25.0.26689.1 (or your installed version)
   - **Status**: Installed and enabled

### Step 4: Initial Permission Assignment

Assign the core permission set to administrators:

1. Navigate to **Users** page
2. Select the user account that will configure BRC Core
3. Choose **User Permission Sets**
4. Add permission set: **BRC Core All**
5. Verify the permission set is active

## Post-Installation Verification

### Verify Core Functionality Access

After permission assignment, verify access to BRC Core features:

1. **Search for "BRC"** in the Business Central search (Alt+Q)
2. Confirm you can access:
   - BRC Core Feature Management
   - BRC Core BM Setup  
   - BRC Curr Exch. Rate Setup
   - BRC Admin Toolbox

### Check Feature Management Installation

1. Open **BRC Core Feature Management** page
2. Verify default feature conditions are created:
   - "ALL USERS" condition should be present
   - Current user condition should be created
3. Confirm feature management system is operational

### Validate Background Monitor Setup

1. Access **BRC Core BM Setup** page
2. Verify default configuration values:
   - Standard Monitor Time: 5 minutes
   - Job Queue Runtime Max: (configure as needed)
   - Job Queue Max Tries: (configure as needed)

## Migration Handling (BCS Base Users)

If you previously used BCS Base, the installation automatically handles migration:

### Automatic Migration Process

1. **Detection**: Installation detects existing BCS Base configuration (Table ID 90190)
2. **Feature Conditions**: Existing feature conditions are migrated
   - "BCS" prefixes are replaced with "BRC"
   - Condition codes and filters are preserved
3. **Job Queue Settings**: User ID assignments are migrated to new BRC fields

### Post-Migration Verification

After migration, verify:

1. **Feature Conditions**: Check **BRC Core Feature Conditions** page
   - Confirm migrated conditions are present
   - Verify condition logic is preserved
2. **Job Queue Entries**: Check that User ID assignments are maintained
3. **Configuration Review**: Review all migrated settings for accuracy

## Installation Troubleshooting

### Common Installation Issues

**Extension Dependency Error**:
- Ensure Microsoft Intrastat Core is installed first
- Check version compatibility (25.0.0.0 or later required)

**Permission Errors During Installation**:
- Verify administrative rights in Business Central
- Check Extension Management permissions

**Installation Timeout**:
- Large environments may require additional time
- Monitor installation progress in Extension Management
- Contact support if installation fails after extended time

**Post-Installation Access Issues**:
- Verify `BRC Core All` permission set is assigned
- Check user license includes required Business Central permissions
- Confirm app is enabled in Extension Management

### Rollback Procedures

If installation issues occur:

1. **Uninstall App**: Use Extension Management to remove BRC Core
2. **Restore Backup**: If data issues occur, restore from pre-installation backup
3. **Review Prerequisites**: Verify all requirements before retry
4. **Contact Support**: Use BrightCom Solutions support channels

## Next Steps

After successful installation:

1. **Initial Configuration**: Proceed to [Configuration](configuration/) for setup
2. **Feature Setup**: Configure specific features based on business needs
3. **User Training**: Review [User Guide](../user-guide/) for operational procedures
4. **Testing**: Validate functionality in test environment before production use

## Support During Installation

If you encounter issues during installation:

- **Documentation**: [https://docs.brightcom.se/sv/Products/BRCCore](https://docs.brightcom.se/sv/Products/BRCCore)
- **Technical Support**: Contact BrightCom Solutions AB support
- **Community**: Business Central community forums for general BC extension questions