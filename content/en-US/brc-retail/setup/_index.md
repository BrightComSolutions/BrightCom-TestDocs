---
title: "Setup & Installation"
linkTitle: "Setup"
weight: 20
description: >
  Complete setup guide for BRC Retail Extension including system requirements, installation steps, and initial configuration.
---

## Prerequisites

### Business Central Requirements

- **Version**: Microsoft Dynamics 365 Business Central 24.0 or higher (Platform 24.0.0.0)
- **Runtime**: AL Runtime 13.0 or higher  
- **Target**: Cloud deployment required
- **Application**: Business Central Application 24.0.0.0 minimum

### Required Licenses

Based on the functionality and permission analysis:
- Business Central Essential or Premium license
- Inventory Management permissions
- Sales & Purchasing module access
- Warehouse Management (for barcode and physical inventory features)
- Item tracking permissions (for variant management)

### Dependencies

- **Core Business Central Objects**: Standard Item, Item Variant, Sales/Purchase documents
- **No External Dependencies**: BRC Retail Extension is a standalone app with no external app dependencies
- **Internal Dependencies**: The app extends standard Business Central tables and processes

### Technical Requirements

- **Object Range**: ID Range 12097619-12097668 (50 objects)
- **Data Classification**: Customer Content and System Metadata handling
- **Integration Points**: Event subscribers for Sales Order, Purchase Order, and Item management
- **Translation Support**: Multi-language capabilities included

## Installation Process

### 1. App Installation

1. **Download and Install**
   - Install BRC Retail Extension from AppSource or deploy via Business Central Admin Center
   - Verify installation in Extension Management page
   - Confirm version 24.4.24986.1 or higher

2. **Permission Assignment**
   - Assign "BRC Retail All" permission set to relevant users
   - Verify users have access to BRC Retail Setup page
   - Test access to variant management pages

### 2. Initial Setup Verification

1. **Access BRC Retail Setup**
   - Navigate to BRC Retail Setup page (ID 12097620)
   - Verify page opens without errors
   - Confirm all setup fields are accessible

2. **Validate Object Installation**
   - Check that all 50+ objects are properly installed
   - Verify table extensions on Item, Sales Line, Purchase Line are active
   - Test page extensions on item and document pages

## Initial Configuration

### 1. Basic Setup Configuration

Access **BRC Retail Setup** from the Administration section and configure:

#### General Settings
- **Default Item Variant Template**: Set the default template for new items requiring variants
- **Auto Insert Variant Val.**: Enable automatic insertion of variant values when manually creating variants  
- **Update Sorting on Modify**: Enable automatic sorting field updates when modifying variants

#### EAN Code Configuration
- **EAN Code No. Series**: Configure number series for automatic EAN code generation
- **EAN Check Digit Method**: Select check digit calculation method (None, EAN-13, etc.)
- **EAN Visible Inv. Matrix**: Enable EAN code visibility in variant inventory matrix views

### 2. Delivery Season Setup

Configure seasonal management features:

- **Auto. Calc. Delivery Season**: Enable automatic delivery season calculation
- **Del. Season Calc. Date Basis**: Choose date basis for season calculation (Order Date, Shipment Date, etc.)
- **Inherit Del. Season to S.Line**: Enable inheritance from sales header to lines
- **Inherit Del. Season to P.Line**: Enable inheritance from purchase header to lines
- **Copy Del. Seas. to S.Ord. Hdr.**: Enable copying season from line to header

### 3. Purchase Configuration

Set up purchase-specific settings:

- **Purch. Line Variant Prompt**: Configure variant prompting behavior on purchase lines
- **Use Variant Desc. Purch. Lines**: Enable variant description usage on purchase documents

### 4. Core Data Setup

#### Variant Templates
1. Navigate to **BRC Retail Variant Templates**
2. Create templates defining your variant structure:
   - **Variant Code 1**: First dimension (e.g., "SIZE")
   - **Variant Code 2**: Second dimension (e.g., "COLOR")  
   - **Variant Code Separator**: Character separating variant codes (e.g., "-")
   - **Description patterns**: Configure automatic description generation

#### Variants and Variant Values
1. Set up **BRC Retail Variants** (dimensions):
   - Create "SIZE", "COLOR", "LENGTH" etc. as needed
   - Configure variant type (Size, Colour, Length, General)
   - Set descriptions and code captions

2. Create **BRC Retail Variant Values**:
   - Define specific values (S, M, L, XL for sizes)
   - Set sorting numbers for proper ordering
   - Add translations for multi-language support

#### Seasons and Brands
1. **BRC Retail Seasons**: Define seasonal periods for your business
2. **BRC Retail Item Brands**: Set up brand classifications
3. **BRC Retail Order Types**: Configure order type classifications

### 5. Item Configuration

For items requiring variant management:

1. **Set Variant Template**: Assign appropriate variant template to items
2. **Configure Brand**: Assign item brand if using brand management
3. **Set Season**: Assign seasonal classification as needed
4. **Variant Generation**: Use automated variant creation tools

### 6. User Training Setup

1. **Permission Verification**: Ensure all users have appropriate BRC Retail permissions
2. **Page Access**: Verify users can access variant management pages
3. **Workflow Testing**: Test variant creation and modification processes

## Post-Installation Checklist

- [ ] BRC Retail Setup page accessible and configured
- [ ] Variant templates created and assigned to test items
- [ ] Variant values configured with proper sorting
- [ ] EAN code generation working (if enabled)
- [ ] Sales and purchase document extensions functional
- [ ] Matrix reporting capabilities tested
- [ ] User permissions verified and working
- [ ] Inventory matrix views displaying correctly
- [ ] Barcode generation tested (if using barcode features)
- [ ] Multi-language support configured (if needed)

## Next Steps

After completing initial setup:
1. Review the [User Guide](../user-guide/) for daily operations
2. Test variant creation workflows with sample items
3. Configure [Integrations](../integrations/) as needed for your environment
4. Train users on new variant management capabilities

## Support During Setup

If you encounter issues during installation or configuration:
- Check [Troubleshooting Guide](../troubleshooting/) for common setup problems
- Review [Reference Documentation](../reference/) for detailed field explanations
- Contact BrightCom Solutions AB support team for assistance