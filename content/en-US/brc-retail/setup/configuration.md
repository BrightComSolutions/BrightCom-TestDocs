---
title: "Configuration"
linkTitle: "Configuration"
weight: 23
description: >
  Complete configuration guide for BRC Retail Extension including setup parameters, variant templates, and business process configuration.
---

## Configuration Overview

After installation, BRC Retail Extension requires configuration to match your business requirements. This includes setting up variant structures, business rules, and integration parameters.

## Initial Setup Configuration

### Accessing BRC Retail Setup

1. **Open Setup Page**
   - Search for "BRC Retail Setup" in Business Central
   - Open the **BRC Retail Setup** page
   - This is your main configuration hub

### General Configuration

Configure these core settings first:

#### Basic Settings
- **Default Item Variant Template**: Select the default template for new items requiring variants
  - Create variant templates first (see Variant Template section)
  - This template will be automatically assigned to new items

- **Auto Insert Variant Val.**: Enable/disable automatic variant value insertion
  - When enabled, system automatically creates variant values when manually creating variants
  - Recommended: **Enabled** for most businesses

- **Update Sorting on Modify**: Control automatic sorting updates
  - When enabled, system updates sorting fields when variants are modified
  - Recommended: **Enabled** for consistent variant ordering

#### EAN Code Configuration
- **EAN Code No. Series**: Set up number series for automatic EAN generation
  - Create a new number series in **No. Series** if not already available
  - Example: "EAN-XXXXX" format

- **EAN Check Digit Method**: Choose check digit calculation
  - Options: None, EAN-13, UPC-A, etc.
  - Recommended: **EAN-13** for retail compatibility

- **EAN Visible Inv. Matrix**: Control EAN visibility in inventory matrices
  - Enable if you want EAN codes displayed in inventory matrix views
  - Useful for warehouse operations

## Variant Template Configuration

Variant templates define the structure of your product variants. Configure these before setting up items.

### Creating Variant Templates

1. **Access Variant Templates**
   - Search for "BRC Retail Variant Templates"
   - Open the **BRC Retail Variant Templates** page

2. **Create Template**
   - Click **New** to create a new template
   - Fill in required information:

#### Template Fields Configuration

**Basic Information:**
- **Code**: Unique identifier (e.g., "APPAREL", "FOOTWEAR")
- **Description**: Descriptive name for the template
- **Variant Code 1**: First dimension code (e.g., "SIZE")
- **Variant Code 2**: Second dimension code (e.g., "COLOR") - Optional

**Advanced Settings:**
- **Variant Code Separator**: Character to separate variant codes in item variant codes (e.g., "-")
- **Description Building**: Configure how variant descriptions are automatically generated

### Example Template Configurations

#### Single Dimension Template (Size Only)
```
Code: BASIC-SIZE
Description: Basic Size Template
Variant Code 1: SIZE
Variant Code 2: (blank)
Separator: N/A
```

#### Two Dimension Template (Size + Color)
```
Code: SIZE-COLOR
Description: Size and Color Template  
Variant Code 1: SIZE
Variant Code 2: COLOR
Separator: -
```

## Variant and Variant Value Setup

### Creating Variants (Dimensions)

1. **Access Variant Management**
   - Search for "BRC Retail Variants"
   - Open the **BRC Retail Variants** page

2. **Create Variants**
   - Create entries for each dimension you'll use:

#### Example Variants:
```
Code: SIZE
Name: Size
Variant Type: Size
Description: Product Size Dimension

Code: COLOR  
Name: Color
Variant Type: Colour
Description: Product Color Dimension

Code: LENGTH
Name: Length  
Variant Type: Length
Description: Product Length Dimension
```

### Creating Variant Values

1. **Access Variant Values**
   - Search for "BRC Retail Variant Values"
   - Open the **BRC Retail Variant Values** page

2. **Create Values for Each Variant**

#### Example Size Values:
```
Variant Code: SIZE
Code: XS, Name: Extra Small, Sorting: 10
Code: S, Name: Small, Sorting: 20  
Code: M, Name: Medium, Sorting: 30
Code: L, Name: Large, Sorting: 40
Code: XL, Name: Extra Large, Sorting: 50
```

#### Example Color Values:
```
Variant Code: COLOR
Code: BLK, Name: Black, Sorting: 10
Code: WHT, Name: White, Sorting: 20
Code: RED, Name: Red, Sorting: 30
Code: BLU, Name: Blue, Sorting: 40
```

**Sorting Guidelines:**
- Use increments of 10 for easy insertion of new values
- Values are sorted in ascending order
- Maximum sorting value: 9999

## Seasonal Management Configuration

### Delivery Season Setup

1. **Enable Seasonal Features**
   - In BRC Retail Setup, configure Delivery Season group:

**Automatic Calculation:**
- **Auto. Calc. Delivery Season**: Enable automatic season calculation
- **Del. Season Calc. Date Basis**: Choose date field for calculation
  - Options: Order Date, Shipment Date, Promised Delivery Date

**Inheritance Settings:**
- **Inherit Del. Season to S.Line**: Copy season from sales header to lines
- **Inherit Del. Season to P.Line**: Copy season from purchase header to lines  
- **Copy Del. Seas. to S.Ord. Hdr.**: Update header when line season changes

2. **Create Seasons**
   - Search for "BRC Retail Seasons"
   - Create seasonal periods:

#### Example Seasons:
```
Code: SS25, Description: Spring/Summer 2025, Start Date: 03/01/2025, End Date: 08/31/2025
Code: FW25, Description: Fall/Winter 2025, Start Date: 09/01/2025, End Date: 02/28/2026
```

### Delivery Season Configuration
- Search for "BRC Retail Delivery Season"
- Link seasons to specific date ranges and business rules

## Purchase Process Configuration

### Purchase Line Settings

Configure purchase-specific behavior:

- **Purch. Line Variant Prompt**: Control variant prompting behavior
  - Options: Never, Always, When Multiple Variants Exist
  - Recommended: **When Multiple Variants Exist**

- **Use Variant Desc. Purchase Lines**: Enable variant description usage
  - When enabled, purchase lines show variant-specific descriptions
  - Improves clarity in purchase documents

## Brand and Classification Setup

### Item Brand Configuration

1. **Create Item Brands**
   - Search for "BRC Retail Item Brands"
   - Create brand classifications for your products:

#### Example Brands:
```
Code: NIKE, Name: Nike, Description: Nike Brand Products
Code: ADIDAS, Name: Adidas, Description: Adidas Brand Products
Code: PRIVATE, Name: Private Label, Description: Private Label Products
```

### Order Type Configuration

1. **Create Order Types**
   - Search for "BRC Retail Order Types"
   - Define order type classifications:

#### Example Order Types:
```
Code: REGULAR, Description: Regular Orders
Code: PREORDER, Description: Pre-Orders  
Code: SPECIAL, Description: Special Orders
Code: DROPSHIP, Description: Drop Shipment
```

## Item Configuration for Variants

### Configuring Items for Variant Management

For each item that will use variants:

1. **Open Item Card**
   - Navigate to the item requiring variant management

2. **Assign Variant Template**
   - Set **BRC Retail Variant Templ Code** field
   - Select appropriate template based on product type

3. **Set Additional Properties**
   - **BRC Retail Item Brand**: Assign brand if applicable
   - **BRC Retail Season**: Set seasonal classification
   - **BRC Retail Made to Order**: Enable for made-to-order items

### Automatic Variant Creation

Once templates are assigned to items:

1. **Generate Variants**
   - Use automated variant creation tools
   - System creates variants based on template configuration
   - Variant codes automatically generated using separator rules

2. **Review Generated Variants**
   - Verify variant codes follow expected patterns
   - Check descriptions are properly generated
   - Confirm sorting is correctly applied

## Multi-Language Configuration

### Translation Setup

For businesses requiring multiple languages:

1. **Variant Translations**
   - Search for "BRC Retail Variant Translations"
   - Add translations for variant names and descriptions

2. **Variant Value Translations**  
   - Search for "BRC Retail Var. Val. Transl."
   - Translate variant values for different languages

#### Example Translations:
```
Variant: SIZE, Language: French, Name: Taille
Variant Value: L, Language: French, Name: Grand
```

## Configuration Validation

### Testing Your Configuration

1. **Create Test Item**
   - Create a new item with variant template assigned
   - Generate variants using automated tools
   - Verify variant structure matches expectations

2. **Test Document Integration**
   - Create sales order with variant items
   - Verify variant information displays correctly
   - Test purchase order functionality

3. **Validate Reporting**
   - Run matrix reports to verify layout
   - Check inventory matrix views
   - Validate barcode generation (if enabled)

## Configuration Checklist

Complete this checklist to ensure proper configuration:

### Core Setup
- [ ] BRC Retail Setup page configured
- [ ] Default variant template selected
- [ ] EAN code settings configured (if using barcodes)
- [ ] Auto-insertion settings configured

### Variant Structure
- [ ] Variant templates created for your product types
- [ ] Variants (dimensions) created and configured
- [ ] Variant values created with proper sorting
- [ ] Templates assigned to items requiring variants

### Business Process Setup
- [ ] Seasonal management configured (if applicable)
- [ ] Purchase line settings configured
- [ ] Brand classifications created
- [ ] Order types defined

### Advanced Features
- [ ] Multi-language translations added (if needed)
- [ ] Delivery season rules configured
- [ ] Matrix reporting tested and validated
- [ ] Integration with existing processes verified

## Next Steps

After completing configuration:

1. **User Training**
   - Train users on new variant management processes
   - Review [User Guide](../user-guide/) for operational procedures

2. **Testing Phase**
   - Conduct thorough testing with real business scenarios
   - Validate all configured features work as expected

3. **Go-Live Preparation**
   - Plan production rollout
   - Prepare support procedures
   - Document configuration decisions for future reference

## Configuration Support

For assistance with configuration:
- Review [Troubleshooting Guide](../troubleshooting/) for common configuration issues
- Contact BrightCom Solutions AB for advanced configuration requirements
- Consult [Reference Documentation](../reference/) for detailed field explanations