---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
weight: 50
description: >
  Common issues, solutions, and troubleshooting procedures for BRC Retail Extension including error resolution and system diagnostics.
---

## Troubleshooting Overview

This section provides comprehensive troubleshooting guidance for BRC Retail Extension, covering common issues, error messages, diagnostic procedures, and resolution steps. Most issues can be resolved by following the structured approach outlined here.

## General Troubleshooting Approach

### Systematic Problem Resolution

1. **Identify the Problem**
   - Note exact error messages or symptoms
   - Identify when the issue occurs (during setup, daily operations, etc.)
   - Determine which users or processes are affected

2. **Gather Information**
   - Check user permissions and roles
   - Verify system configuration and setup
   - Review recent changes to items, variants, or setup

3. **Apply Solutions**
   - Start with most common solutions
   - Test solutions in a controlled manner
   - Document successful resolution steps

4. **Prevent Recurrence**
   - Implement best practices
   - Train users on proper procedures
   - Monitor system for similar issues

## Common Issues and Solutions

### Variant Creation Problems

#### Issue: "Invalid Variant Template Code" Error

**Symptoms:**
- Error when assigning variant template to item
- Error message: "Invalid Variant Template Code"
- Variant template lookup shows no results

**Root Causes:**
- Variant template doesn't exist
- User lacks permissions to variant templates
- Variant template is inactive or incorrectly configured

**Resolution Steps:**
1. **Verify Template Exists**
   ```
   Navigate to: Search → "BRC Retail Variant Templates"
   Check: Template code exists and is active
   Verify: Template has proper Variant Code 1 and optionally Variant Code 2
   ```

2. **Check User Permissions**
   ```
   Navigate to: Users → Select User → Permission Sets
   Verify: "BRC Retail All" permission set is assigned
   Check: User has Read access to BRC Retail Variant Template table
   ```

3. **Validate Template Configuration**
   ```
   Open: Variant Template card
   Verify: Variant Code 1 is assigned and exists in BRC Retail Variants
   Check: If Variant Code 2 is used, it exists and is different from Variant Code 1
   Confirm: Variant Code Separator is configured if using two dimensions
   ```

#### Issue: Variants Not Generated Automatically

**Symptoms:**
- Item has variant template assigned
- No variants created automatically
- Manual variant creation works

**Root Causes:**
- Auto Insert Variant Val. not enabled
- Missing variant values for template dimensions
- Event subscribers not functioning

**Resolution Steps:**
1. **Check Setup Configuration**
   ```
   Navigate to: BRC Retail Setup
   Verify: "Auto Insert Variant Val." is enabled
   Check: Default Item Variant Template is set if applicable
   ```

2. **Verify Variant Values Exist**
   ```
   Navigate to: BRC Retail Variant Values
   Filter: Variant Code = template's Variant Code 1
   Verify: At least one variant value exists
   Repeat: For Variant Code 2 if used
   ```

3. **Trigger Manual Generation**
   ```
   Open: Item Card
   Actions: Navigate → Variants
   Manual: Create variants using template structure
   Test: Verify automatic population works
   ```

### Sales Order Issues

#### Issue: Variant Information Not Showing on Sales Lines

**Symptoms:**
- Sales lines created but variant fields empty
- Standard variant code works but BRC fields blank
- Matrix views not available

**Root Causes:**
- Item not configured with BRC variant template
- Event subscribers not firing correctly
- Missing variant value assignments

**Resolution Steps:**
1. **Verify Item Configuration**
   ```
   Open: Item Card for the item
   Check: BRC Retail Variant Templ Code is assigned
   Verify: Template exists and is properly configured
   ```

2. **Check Variant Assignments**
   ```
   Open: Item Variants for the item
   Verify: BRC Retail Variant 1 Code and BRC Retail Variant 2 Code are populated
   Check: Variant values codes are assigned correctly
   ```

3. **Test Event Integration**
   ```
   Create: New sales line with variant item
   Check: BRC fields populate automatically
   If not: Review event subscriber installation and permissions
   ```

#### Issue: Matrix Views Not Displaying Correctly

**Symptoms:**
- Matrix action available but view is empty
- Matrix shows partial data only
- Error when opening matrix view

**Root Causes:**
- Item uses only single dimension (matrix requires two)
- Missing variant values in second dimension
- Sorting values configured incorrectly

**Resolution Steps:**
1. **Verify Two-Dimension Setup**
   ```
   Check: Item's variant template has both Variant Code 1 and Variant Code 2
   Verify: Both dimensions have variant values created
   Confirm: Both dimensions are assigned to item variants
   ```

2. **Review Variant Value Configuration**
   ```
   Navigate to: BRC Retail Variant Values
   Check: Sorting values are set and not exceeding 9999
   Verify: No duplicate sorting values within same variant
   Confirm: All required variant values exist
   ```

3. **Test Matrix Calculation**
   ```
   Open: Matrix view from sales order
   Verify: Columns show Variant 1 values
   Check: Rows show Variant 2 values
   Confirm: Intersections show available quantities/options
   ```

### Purchase Order Issues

#### Issue: Variant Prompting Not Working

**Symptoms:**
- Purchase lines created without variant prompting
- Variants must be selected manually
- Configuration appears correct

**Root Causes:**
- Purch. Line Variant Prompt setting incorrect
- Item doesn't have multiple variants
- User permissions insufficient

**Resolution Steps:**
1. **Check Purchase Setup**
   ```
   Navigate to: BRC Retail Setup → Purchase group
   Verify: "Purch. Line Variant Prompt" is set correctly
   Options: Never, Always, When Multiple Variants Exist
   ```

2. **Verify Item Variant Configuration**
   ```
   Check: Item has multiple variants created
   Verify: Variants are active and available
   Confirm: Item has BRC variant template assigned
   ```

3. **Test Prompting Logic**
   ```
   Create: New purchase line with variant item
   Expected: System prompts for variant selection (based on setup)
   If not: Check user permissions and event subscriber functionality
   ```

### Inventory Management Issues

#### Issue: Variant Inventory Matrix Shows Incorrect Data

**Symptoms:**
- Matrix displays zero inventory when items exist
- Inventory totals don't match item card
- Missing variants in matrix display

**Root Causes:**
- Date filters exclude current inventory
- Location filters too restrictive
- Variant assignments not properly configured

**Resolution Steps:**
1. **Check Matrix Filters**
   ```
   Open: BRC Retail Var. by Location Matrix
   Verify: Date filters include current date
   Check: Location filters include desired locations
   Reset: All filters and retry
   ```

2. **Verify Inventory Posting**
   ```
   Navigate to: Item Ledger Entries
   Filter: By Item No. and Variant Code
   Check: Recent inventory transactions exist
   Verify: Quantities posted correctly by variant
   ```

3. **Validate Variant Configuration**
   ```
   Check: Item variants have proper BRC variant codes assigned
   Verify: Variant values exist for all dimensions
   Confirm: Sorting is configured correctly
   ```

### Barcode and EAN Issues

#### Issue: EAN Codes Not Generated Automatically

**Symptoms:**
- New variants created without EAN codes
- Manual EAN assignment works
- No error messages displayed

**Root Causes:**
- EAN Code No. Series not configured
- Auto-generation not enabled
- Number series exhausted or invalid

**Resolution Steps:**
1. **Check EAN Configuration**
   ```
   Navigate to: BRC Retail Setup → General group
   Verify: "EAN Code No. Series" is assigned
   Check: Number series exists and is active
   ```

2. **Verify Number Series**
   ```
   Navigate to: No. Series
   Find: EAN Code number series
   Check: Series has available numbers
   Verify: Series is not expired
   ```

3. **Test EAN Generation**
   ```
   Create: New item variant manually
   Check: EAN code generates automatically
   Verify: Check digit calculated correctly (if enabled)
   ```

#### Issue: Check Digit Calculation Errors

**Symptoms:**
- EAN codes generated but check digit incorrect
- Barcode scanning fails due to invalid check digit
- Error message about check digit validation

**Resolution Steps:**
1. **Verify Check Digit Method**
   ```
   Navigate to: BRC Retail Setup → General group
   Check: "EAN Check Digit Method" setting
   Verify: Method matches your barcode standard (EAN-13, UPC-A, etc.)
   ```

2. **Recalculate Existing Codes**
   ```
   Identify: Items with incorrect check digits
   Process: Regenerate EAN codes for affected items
   Verify: New codes have correct check digits
   ```

### Seasonal Management Issues

#### Issue: Delivery Seasons Not Calculating Automatically

**Symptoms:**
- Sales/purchase lines created without delivery season
- Manual season assignment works
- Auto calculation enabled in setup

**Root Causes:**
- Date basis field not configured correctly
- Season date ranges don't cover order dates
- Event subscribers not functioning

**Resolution Steps:**
1. **Check Season Setup**
   ```
   Navigate to: BRC Retail Setup → Delivery Season group
   Verify: "Auto. Calc. Delivery Season" is enabled
   Check: "Del. Season Calc. Date Basis" is set appropriately
   ```

2. **Verify Season Date Ranges**
   ```
   Navigate to: BRC Retail Seasons
   Check: Season date ranges cover expected order dates
   Verify: No gaps between seasons if full coverage needed
   ```

3. **Test Season Calculation**
   ```
   Create: Sales order with delivery date
   Expected: Delivery season calculated based on configured date basis
   Verify: Season appears on order line automatically
   ```

## Performance Issues

### Slow Matrix Report Generation

#### Symptoms and Causes

**Symptoms:**
- Matrix reports take excessive time to generate
- System becomes unresponsive during matrix operations
- Memory issues when generating large matrices

**Common Causes:**
- Large number of variant combinations
- Inefficient sorting configurations
- Too many items included in matrix scope
- Historical data range too broad

**Resolution Steps:**

1. **Optimize Filters**
   ```
   Limit: Date ranges to necessary periods
   Filter: By specific items or item categories
   Reduce: Number of locations if not all needed
   Focus: On active variants only
   ```

2. **Review Sorting Configuration**
   ```
   Check: Variant value sorting uses incremental values
   Verify: Sorting values don't exceed 9999
   Optimize: Remove unused variant values
   Consolidate: Similar variants if business appropriate
   ```

3. **Implement Best Practices**
   ```
   Schedule: Large matrix reports during off-peak hours
   Use: Batch processing for multiple items
   Archive: Historical data to reduce active dataset
   Monitor: System performance during matrix operations
   ```

### Memory and Performance Optimization

#### System Resource Management

**Memory Optimization:**
- Close unnecessary pages and reports
- Run matrix operations during low-usage periods
- Implement regular maintenance routines
- Monitor system performance metrics

**Database Optimization:**
- Regular index maintenance
- Statistics updates for variant tables
- Archive old variant transaction data
- Optimize variant value configurations

## Data Integrity Issues

### Variant Data Consistency Problems

#### Issue: Variant Relationships Broken

**Symptoms:**
- Variant codes exist but descriptions missing
- FlowFields showing incorrect values
- Variant value lookups failing

**Resolution Steps:**

1. **Run Data Validation**
   ```
   Check: All item variants have corresponding BRC variant values
   Verify: Variant template assignments are consistent
   Validate: FlowField calculations are working
   ```

2. **Repair Broken Relationships**
   ```
   Identify: Items with missing variant value assignments
   Reassign: Variant values based on variant codes
   Refresh: FlowField calculations
   Test: Variant functionality after repairs
   ```

3. **Implement Prevention**
   ```
   Enable: Validation rules in setup
   Train: Users on proper variant modification procedures
   Schedule: Regular data integrity checks
   Monitor: System for consistency issues
   ```

### Translation and Multi-Language Issues

#### Missing Translations

**Symptoms:**
- Variant names appear in base language only
- Inconsistent language display
- Missing variant value translations

**Resolution Steps:**
1. **Check Translation Tables**
   ```
   Navigate to: BRC Retail Variant Translations
   Verify: Translations exist for required languages
   Check: BRC Retail Var. Val. Transl. completeness
   ```

2. **Add Missing Translations**
   ```
   Create: Translation entries for missing languages
   Verify: Translation quality and consistency
   Test: Language switching functionality
   ```

## System Administration Issues

### Permission and Security Problems

#### Access Denied Errors

**Symptoms:**
- Users cannot access BRC Retail pages
- Permission errors when creating variants
- Limited functionality for some users

**Resolution Steps:**
1. **Verify Permission Assignment**
   ```
   Navigate to: Users → Select affected user
   Check: "BRC Retail All" permission set assigned
   Verify: Permission set is active and complete
   ```

2. **Check Object Permissions**
   ```
   Review: Specific permissions for variant tables
   Verify: Page permissions for variant management
   Confirm: Report permissions for matrix reports
   ```

3. **Test User Access**
   ```
   Login: As affected user
   Test: Access to variant-related pages
   Verify: Functionality works as expected
   ```

## Integration Issues

### Event Subscriber Problems

#### Events Not Firing

**Symptoms:**
- Automatic variant field population not working
- Manual processes work but automation doesn't
- Inconsistent behavior across different operations

**Resolution Steps:**
1. **Verify Event Subscriber Installation**
   ```
   Check: BRC Retail Extension properly installed
   Verify: Event subscriber codeunits are active
   Confirm: No conflicts with other extensions
   ```

2. **Test Event Integration**
   ```
   Create: Test scenarios for each event type
   Monitor: System behavior during operations
   Validate: Event data processing
   ```

### Web Service Integration Issues

#### API Connectivity Problems

**Symptoms:**
- External systems cannot connect to BRC APIs
- Inventory updates failing
- Authentication errors

**Resolution Steps:**
1. **Check API Configuration**
   ```
   Verify: Web service endpoints are published
   Check: Authentication configuration
   Test: API connectivity from external system
   ```

2. **Review Security Settings**
   ```
   Confirm: OAuth configuration is correct
   Verify: API permissions are properly assigned
   Check: Firewall and network connectivity
   ```

## Error Messages Reference

### Common Error Messages and Solutions

#### "Variant Code must have a value"
**Cause:** Required variant information missing
**Solution:** Ensure item has variant template and variants are properly configured

#### "The field Sorting in table BRC Retail Variant Value contains a value (xxxxx) that cannot be found"
**Cause:** Sorting value exceeds maximum (9999) or database corruption
**Solution:** Review and correct sorting values, ensure they're within valid range

#### "You do not have permission to read the BRC Retail Setup table"
**Cause:** User lacks proper permissions
**Solution:** Assign "BRC Retail All" permission set to user

#### "Matrix cannot be displayed because the item has only one variant dimension"
**Cause:** Matrix view requires two variant dimensions
**Solution:** Use single-dimension variant lists instead of matrix view

## Getting Additional Help

### Support Resources

**When to Contact Support:**
- Issues persist after following troubleshooting steps
- System errors that aren't covered in this guide
- Performance problems that can't be resolved locally
- Integration issues requiring specialized assistance

**Information to Gather Before Contacting Support:**
- Exact error messages and when they occur
- Steps to reproduce the problem
- System configuration details
- Recent changes to setup or data

**Support Channels:**
- BrightCom Solutions AB Technical Support
- Online Documentation: [BRC Documentation Portal](https://docs.brightcom.se/sv/BRCretail)
- Business Central Partner Network
- Community Forums and User Groups

### Preventive Maintenance

#### Regular Maintenance Tasks

**Weekly:**
- Monitor system performance during peak variant operations
- Review and address any new error messages
- Check data consistency for recently created variants

**Monthly:**
- Review variant value sorting and organization
- Clean up unused or obsolete variants
- Validate translation completeness
- Monitor integration health

**Quarterly:**
- Comprehensive data integrity check
- Performance optimization review
- User training needs assessment
- Documentation updates

This troubleshooting guide provides systematic approaches to resolving most issues with BRC Retail Extension. For complex problems or situations not covered here, don't hesitate to reach out for professional support.