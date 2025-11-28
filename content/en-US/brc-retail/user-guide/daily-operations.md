---
title: "Daily Operations"
linkTitle: "Daily Operations"  
weight: 32
description: >
  Detailed procedures for common daily tasks using BRC Retail Extension including variant management, sales processing, and inventory operations.
---

## Daily Operations Overview

This section covers the most common tasks you'll perform with BRC Retail Extension in your daily Business Central operations. Each procedure includes step-by-step instructions and tips for efficient execution.

## Item and Variant Management

### Creating New Item Variants

#### Automatic Variant Creation (Recommended)

1. **Prepare the Item**
   - Open the item card for a variant-enabled item
   - Ensure **BRC Retail Variant Templ Code** is assigned
   - Verify the variant template is properly configured

2. **Trigger Automatic Creation**
   - Navigate to the item's variant list (Actions → Variants)
   - Use **Create Variants** action (if available)
   - System generates all possible combinations based on template

3. **Review Generated Variants**
   - Check variant codes follow expected pattern (e.g., "M-BLK", "L-RED")
   - Verify descriptions are properly generated
   - Confirm sorting order is logical

#### Manual Variant Creation

1. **Open Item Variant List**
   - From item card, choose Actions → Variants
   - Click **New** to create individual variants

2. **Enter Variant Information**
   - **Code**: Enter variant code (system may auto-suggest)
   - **Description**: Enter descriptive text
   - System automatically populates BRC Retail fields based on template

3. **Validate Variant Data**
   - Ensure **BRC Retail Variant 1 Code** and **BRC Retail Variant 2 Code** are correct
   - Check **BRC Retail Variant Val. 1 Code** and **BRC Retail Variant Val. 2 Code**
   - Verify sorting is appropriate

### Modifying Existing Variants

#### Updating Variant Information

1. **Locate the Variant**
   - Open item card and navigate to variants
   - Find the variant to modify
   - Open the variant card

2. **Make Changes**
   - Update description, if needed
   - Modify any custom fields
   - System automatically updates **BRC Retail Sorting** if configured

3. **Validate Changes**
   - Check that changes don't conflict with existing sales/purchase documents
   - Verify variant relationships remain intact

#### Updating Variant Values

1. **Access Variant Values**
   - Search for "BRC Retail Variant Values"
   - Locate the value to modify

2. **Modify Properties**
   - Update **Name** or **Description**
   - Adjust **Sorting** if display order needs to change
   - Changes affect all items using this variant value

3. **Review Impact**
   - Check items using the modified variant value
   - Verify displays and reports show updated information

## Sales Order Processing

### Creating Sales Orders with Variants

#### Standard Variant Selection

1. **Create Sales Order**
   - Create new sales order in standard Business Central manner
   - Enter customer information and header details

2. **Add Variant Items**
   - In sales lines, select Type = Item
   - Choose an item configured with variants
   - **No.** field shows the base item

3. **Select Specific Variant**
   - **Variant Code** field becomes available
   - Click lookup to see available variants
   - Select the specific variant needed (e.g., "M-BLK" for Medium Black)

4. **Complete Line Details**
   - Enter quantity for this specific variant
   - Pricing and discounts work normally
   - System shows variant-specific description

5. **Add Additional Variants**
   - Create new lines for other variants of the same item
   - Each variant gets its own line with specific quantity

#### Using Matrix View for Multiple Variants

1. **Access Matrix View**
   - From sales order, select a variant item line
   - Use Actions → Functions → **Matrix View** (if available)
   - System displays grid showing all variant combinations

2. **Select Multiple Variants**
   - Grid shows Variant 1 values across columns
   - Variant 2 values down rows
   - Enter quantities directly in the grid

3. **Confirm Selections**
   - System creates individual sales lines for each variant with quantity
   - Review the generated lines in the sales order
   - Adjust quantities or add additional lines as needed

### Processing Sales Orders with Seasonal Information

1. **Automatic Season Calculation**
   - If configured, system automatically calculates delivery season
   - Based on shipment date or other configured date field
   - **BRC Retail Delivery Season** field populated automatically

2. **Manual Season Assignment**
   - If not automatic, use lookup in **BRC Retail Delivery Season**
   - Select appropriate season based on delivery requirements
   - Season information flows to related documents

### Sales Invoice Processing

1. **Post Sales Order**
   - Standard Business Central posting process
   - Variant information transfers to posted documents
   - Posted sales invoice retains all variant details

2. **Matrix Invoice Reporting**
   - Use **BRC Retail Matrix Sales Inv.** report
   - Provides matrix view of posted invoice with variants
   - Shows quantities across variant dimensions in grid format

## Purchase Order Processing

### Creating Purchase Orders with Variants

#### Standard Variant Purchasing

1. **Create Purchase Order**
   - Standard Business Central purchase order creation
   - Enter vendor and header information

2. **Add Variant Items**
   - Select variant-enabled items on purchase lines
   - Use **Variant Code** field to specify exact variants needed
   - System may prompt for variant selection based on setup

3. **Quantity Planning by Variant**
   - Enter specific quantities for each variant
   - Consider inventory levels for each variant combination
   - Use inventory matrix views to check current stock

#### Using Variant Prompts

1. **Prompt Configuration**
   - **Purch. Line Variant Prompt** in BRC Retail Setup controls behavior
   - Options: Never, Always, When Multiple Variants Exist

2. **Responding to Prompts**
   - When prompted, select required variants from lookup
   - System may suggest commonly ordered variants
   - Complete variant selection before continuing

### Purchase Receipt and Invoicing

1. **Receiving by Variant**
   - Post purchase receipts normally
   - System tracks receipt quantities by specific variant
   - Inventory updates reflect variant-specific quantities

2. **Matrix Purchase Reporting**
   - Use **BRC Retail Matrix Purch. Order** report
   - View purchase quantities across variant dimensions
   - Helpful for vendor communications and planning

## Inventory Management

### Monitoring Inventory Levels

#### Variant Inventory Matrix

1. **Access Matrix View**
   - Search for "BRC Retail Var by Location"
   - **BRC Retail Var. by Location Matrix** page opens

2. **Configure Display**
   - Filter by **Item No.** for specific items
   - Filter by **Location Code** for specific locations
   - Date filters control inventory snapshot date

3. **Interpret the Matrix**
   - Columns show Variant 1 values (e.g., Sizes)
   - Rows show Variant 2 values (e.g., Colors)  
   - Cell values show inventory quantities
   - Blank cells indicate zero inventory

#### Item-Specific Inventory Review

1. **From Item Card**
   - Open item card for variant item
   - Choose Actions → Inventory → **Entries**
   - Filter by variant code to see specific variant movements

2. **Using Enhanced Fields**
   - **BRC Variant Inventory** field shows total variant inventory
   - Excludes items without variant codes
   - Useful for comparing variant vs. non-variant inventory

### Physical Inventory Procedures

#### Generating Physical Inventory Lists

1. **Run Specialized Report**
   - Use **BRC Retail Phys. Inv. List** report
   - Includes variant information on counting sheets
   - Helps warehouse staff identify specific variants

2. **Barcode Integration** (if enabled)
   - Use **BRC Retail Wh. Act. Barc 55x25** report
   - Generates barcode labels for warehouse activities
   - Supports scanning during physical counts

#### Recording Physical Inventory

1. **Standard BC Process**
   - Use Business Central's physical inventory journals
   - Enter counts for specific variants using variant codes
   - System updates inventory for each variant separately

2. **Variance Analysis**
   - Analyze variances by variant to identify patterns
   - Use matrix reports to compare counted vs. system quantities
   - Investigate significant variances at variant level

### Inventory Transfers

1. **Transfer by Variant**
   - Create inventory transfer orders normally
   - Specify exact variants being transferred
   - **BRC Retail Variant 1 Code** and **BRC Retail Variant 2 Code** transfer with items

2. **Transfer Documentation**
   - Transfer documents show full variant details
   - Receiving location gets complete variant information
   - Inventory tracking maintains variant integrity

## Reporting and Analysis

### Daily Inventory Reports

#### Inventory Valuation by Variant

1. **Run Inventory Valuation Report**
   - Use **BRC Retail Inventory Valuation** report
   - Shows value breakdown by variant dimensions
   - Useful for financial reporting and analysis

2. **Configure Parameters**
   - Set appropriate date ranges
   - Filter by item categories or specific items
   - Choose cost calculation method

#### Matrix Sales Analysis

1. **Posted Sales Analysis**
   - Use **BRC Retail Matrix Sales** reports
   - Analyze sales patterns across variant dimensions
   - Identify best and worst performing variant combinations

2. **Period Comparisons**
   - Run reports for different periods
   - Compare variant performance over time
   - Support purchasing and inventory planning decisions

### Export and Integration

#### Price Export Functionality

1. **Export Price Data**
   - Use **BRC Retail Export Price** report
   - Generates variant-specific pricing information
   - Useful for e-commerce or catalog integration

2. **Configure Export Format**
   - Select appropriate fields for export
   - Include variant descriptions and codes
   - Format for destination system requirements

## Barcode Operations

### Generating Barcode Labels

#### Item Variant Barcodes

1. **Single Item Labels**
   - Use **BRC Retail ItmVar Multi 55x25** report
   - Generates labels with variant-specific barcodes
   - Include variant descriptions on labels

2. **Warehouse Activity Labels**
   - Use **BRC Retail Wh. Act. Barc 55x25** report
   - Supports warehouse picking and putaway activities
   - Integrates with warehouse management processes

#### EAN Code Management

1. **Automatic EAN Generation**
   - If configured, system generates EAN codes for variants
   - Uses number series from BRC Retail Setup
   - Applies check digit calculation if enabled

2. **Manual EAN Assignment**
   - Manually assign EAN codes to specific variants
   - Use **Item References** for additional barcode types
   - Maintain multiple barcodes per variant if needed

## Multi-Language Operations

### Managing Translations

1. **Variant Translations**
   - Access "BRC Retail Variant Translations"
   - Add translations for variant names in different languages
   - System displays appropriate language based on user settings

2. **Variant Value Translations**
   - Access "BRC Retail Var. Val. Transl."
   - Translate variant values (Size names, Color names, etc.)
   - Maintains consistency across language versions

## Troubleshooting Daily Operations

### Common Issues and Solutions

#### Variant Not Appearing in Lookups
- **Check**: Item has variant template assigned
- **Verify**: Variant values exist for the template dimensions
- **Confirm**: User has proper permissions to variant objects

#### Incorrect Variant Descriptions
- **Review**: Variant template description building rules
- **Check**: Variant value names and translations
- **Update**: Regenerate variants if template changed

#### Matrix Views Not Loading
- **Verify**: Item has both Variant 1 and Variant 2 configured
- **Check**: Variant values exist for both dimensions
- **Confirm**: Matrix-related permissions are assigned

#### Inventory Discrepancies by Variant
- **Review**: Item ledger entries by variant code
- **Check**: Transfer and adjustment entries
- **Verify**: Physical inventory procedures include variant codes

## Performance Tips

### Efficient Variant Operations

1. **Use Filters Effectively**
   - Filter by item number when viewing variant lists
   - Use date filters for large transaction volumes
   - Apply location filters for multi-location operations

2. **Batch Operations**
   - Process similar variant operations together
   - Use matrix views for multiple variant selections
   - Group variant-related reporting activities

3. **Regular Maintenance**
   - Clean up unused variants periodically
   - Archive historical data appropriately
   - Monitor system performance with large variant catalogs

This completes the daily operations guide. These procedures form the core of your daily work with BRC Retail Extension. For more advanced features and specialized operations, refer to the [Advanced Features](advanced-features.md) guide.