---
title: "Permissions"
linkTitle: "Permissions"
weight: 61
description: >
  Comprehensive permission requirements and security model for BRC Retail Extension including role-based access control and object permissions.
---

## Permission Framework Overview

BRC Retail Extension implements a comprehensive permission framework integrated with Microsoft Dynamics 365 Business Central's security model. This section details all permission requirements, role-based access control, and security best practices.

## Core Permission Set

### BRC Retail All Permission Set

**Permission Set ID:** `BRC Retail All`
**Assignable:** Yes
**Description:** Complete access to all BRC Retail Extension functionality

This is the primary permission set providing full access to all BRC Retail Extension features. It includes comprehensive permissions for all objects and data operations.

## Object Permissions Breakdown

### Table Permissions

#### Core Tables (Read/Insert/Modify/Delete Access)

**Variant Management Tables:**
```al
table "BRC Retail Setup" = RIMD
table "BRC Retail Variant" = RIMD  
table "BRC Retail Variant Value" = RIMD
table "BRC Retail Variant Template" = RIMD
table "BRC Retail Item Variant" = RIMD
```

**Business Classification Tables:**
```al
table "BRC Retail Item Brand" = RIMD
table "BRC Retail Season" = RIMD
table "BRC Retail Order Type" = RIMD
table "BRC Retail Ordering Terms" = RIMD
table "BRC Retail Delivery Season" = RIMD
```

**Document Integration Tables:**
```al
table "BRC Retail Doc. Line Item Var." = RIMD
table "BRC Matrix Source Doc. Line" = RIMD
table "BRC Matrix Group Line" = RIMD
```

**Supporting Tables:**
```al
table "BRC Retail Code 128/39" = RIMD
table "BRC Retail Item UoM" = RIMD
table "BRC Retail Variant Translation" = RIMD
table "BRC Retail Var. Val. Transl." = RIMD
```

#### TableData Permissions

All custom tables include corresponding TableData permissions:
```al
tabledata "BRC Retail Setup" = RIMD
tabledata "BRC Retail Variant" = RIMD
tabledata "BRC Retail Variant Value" = RIMD
// ... (continues for all custom tables)
```

### Page Permissions

#### Setup and Configuration Pages (Execute Access)

**Administrative Pages:**
```al
page "BRC Retail Setup" = X
page "BRC Retail Variant Template" = X
page "BRC Retail Seasons" = X
page "BRC Retail Order Types" = X
```

**Variant Management Pages:**
```al
page "BRC Retail Variant List" = X
page "BRC Retail Variant Value List" = X  
page "BRC Retail Item Variants" = X
page "BRC Retail Item Brand List" = X
```

**Matrix and Analysis Pages:**
```al
page "BRC Retail Var by Loc. Matrix" = X
page "BRC Retail Var. by Location" = X
page "BRC Retail Doc. Line Item Var." = X
```

**Translation and Localization Pages:**
```al
page "BRC Retail Variant Transl." = X
page "BRC Retail Itm Var. Val. Trans" = X
```

**Supporting Pages:**
```al
page "BRC Retail Delivery Season" = X
page "BRC Retail Item UoM" = X
page "BRC Retail Item Ref. Entries" = X
```

### Codeunit Permissions

#### Business Logic Codeunits (Execute Access)

**Core Processing:**
```al
codeunit "BRC Retail Crt. Var. from Item" = X
codeunit "BRC Retail Matrix Calculation" = X
codeunit "BRC Retail Barcode Mgt." = X
```

**Event Subscribers:**
```al
codeunit "BRC Retail Item Event Subs." = X
codeunit "BRC Retail Sales Order Subs." = X
codeunit "BRC Retail Purch. Order Subs." = X
codeunit "BRC Retail Sales Event Subs." = X
```

**Document Management:**
```al
codeunit "BRC Retail Sales Line Var Mt." = X
codeunit "BRC Retail Purch Line Item Mt" = X
codeunit "BRC Retail Tran Lne Itm Var Mt" = X
```

**Specialized Functions:**
```al
codeunit "BRC Retail Del Season Mgt." = X
codeunit "BRC Retail Var. Cap. Class Mgt" = X
codeunit "BRC Retail Item Inv. Upd WS" = X
codeunit "BRC Retail Solution Upgrade" = X
```

### Report Permissions

#### Reporting and Analysis (Execute Access)

**Matrix Reports:**
```al
report "BRC Retail Matrix Sales Order" = X
report "BRC Retail Matrix Sales Inv." = X
report "BRC Retail Matrix Purch. Order" = X
```

**Inventory Reports:**
```al
report "BRC Retail Inventory Valuation" = X
report "BRC Retail Phys. Inv. List" = X
```

**Barcode and Label Reports:**
```al
report "BRC Retail ItmVar Multi 55x25" = X
report "BRC Retail Wh. Act. Barc 55x25" = X
```

**Export and Integration:**
```al
report "BRC Retail Export Price" = X
```

### Query Permissions

#### Data Access Queries (Execute Access)

```al
query "BRC Retail ItemBalance by Var." = X
```

## Role-Based Access Control

### Administrator Role

**Full Access Requirements:**
- Complete "BRC Retail All" permission set
- Administrative access to Business Central
- Permission to manage user accounts and permission sets

**Responsibilities:**
- Initial system setup and configuration
- Variant template creation and maintenance
- User permission management
- System monitoring and troubleshooting

**Additional BC Permissions Required:**
```al
// Standard BC permissions for administration
Permission Set: "D365 BASIC"
Permission Set: "D365 BUS FULL ACCESS"
// Or equivalent administrative permissions
```

### Power User Role

**Enhanced Access Requirements:**
- "BRC Retail All" permission set
- Read/Write access to item management
- Access to advanced reporting features

**Responsibilities:**
- Variant structure design and implementation
- Advanced reporting and analysis
- Matrix report generation
- Integration management

**Additional BC Permissions Required:**
```al
// Standard BC permissions for power users
Permission Set: "D365 BASIC"
Table Item = RIMD
Table "Item Variant" = RIMD  
Table "Sales Line" = RIMD
Table "Purchase Line" = RIMD
```

### End User Role

**Standard Access Requirements:**
- "BRC Retail All" permission set (can be customized)
- Read/Write access to relevant document types
- Limited setup access

**Responsibilities:**
- Daily variant management operations
- Sales and purchase order processing
- Inventory management by variant
- Standard reporting usage

**Customized Permission Set Option:**

For organizations requiring restricted access, create a custom permission set:

```al
permissionset 50001 "BRC Retail User"
{
    Assignable = true;
    Caption = 'BRC Retail User Access';
    
    Permissions = 
        // Read-only setup access
        table "BRC Retail Setup" = R,
        table "BRC Retail Variant" = R,
        table "BRC Retail Variant Value" = R,
        
        // Full operational access
        table "BRC Retail Item Variant" = RIMD,
        table "BRC Retail Doc. Line Item Var." = RIMD,
        
        // Page access for daily operations  
        page "BRC Retail Item Variants" = X,
        page "BRC Retail Variant Value List" = X,
        page "BRC Retail Var. by Location" = X,
        
        // Essential reports
        report "BRC Retail Matrix Sales Order" = X,
        report "BRC Retail Inventory Valuation" = X;
}
```

### Read-Only Role

**Limited Access Requirements:**
- Restricted permission set for viewing only
- No modification capabilities
- Reporting access only

**Use Cases:**
- Managers requiring variant visibility
- External auditors or consultants
- Temporary access for specific projects

**Read-Only Permission Set:**

```al
permissionset 50002 "BRC Retail Read-Only"
{
    Assignable = true;
    Caption = 'BRC Retail Read-Only Access';
    
    Permissions = 
        // Read-only table access
        table "BRC Retail Setup" = R,
        table "BRC Retail Variant" = R,
        table "BRC Retail Variant Value" = R,
        table "BRC Retail Item Variant" = R,
        
        // Page access for viewing
        page "BRC Retail Item Variants" = X,
        page "BRC Retail Var. by Location" = X,
        
        // Report access
        report "BRC Retail Matrix Sales Order" = X,
        report "BRC Retail Inventory Valuation" = X;
}
```

## Security Best Practices

### Permission Assignment Guidelines

#### Initial Implementation

1. **Start Conservative**
   - Begin with read-only access for most users
   - Grant full access to administrators and power users only
   - Gradually expand permissions based on actual needs

2. **Test Thoroughly**
   - Test each permission level in sandbox environment
   - Validate user workflows with assigned permissions
   - Ensure adequate functionality without over-permissioning

3. **Document Assignments**
   - Maintain records of who has what access
   - Document business justifications for permission levels
   - Regular review of permission assignments

#### Ongoing Management

1. **Regular Reviews**
   - Quarterly review of user permission assignments
   - Verify users still require current access levels
   - Remove unused or unnecessary permissions

2. **Role Changes**
   - Update permissions when users change roles
   - Remove access when users leave organization
   - Ensure temporary access has expiration dates

3. **Monitoring and Auditing**
   - Monitor usage of high-privilege operations
   - Audit changes to variant setup and configuration
   - Log access to sensitive variant data

### Data Security Considerations

#### Customer Content Protection

**Variant Data Classification:**
- Variant values and descriptions: Customer Content
- Business transactions with variants: Customer Content  
- Configuration and setup: Customer Content

**Access Control:**
- Implement appropriate access restrictions
- Ensure compliance with data protection regulations
- Regular backup and recovery testing

#### System Metadata Protection

**Technical Data:**
- System timestamps: System Metadata
- Automatically generated identifiers: System Metadata
- Performance and diagnostic data: System Metadata

**Security Measures:**
- Protect against unauthorized system modifications
- Monitor system performance and health
- Maintain audit trails for system changes

## Integration Security

### Event Subscriber Security

**Automatic Processing:**
- Event subscribers run with system permissions
- No additional user permissions required for automatic processing
- Security through controlled access to triggering operations

**Monitoring:**
- Log event subscriber execution for audit purposes
- Monitor for unusual patterns or failures
- Ensure event processing doesn't compromise data integrity

### Web Service Security

#### API Access Control

**Authentication:**
- OAuth 2.0 integration with Business Central authentication
- Token-based access with appropriate expiration
- Service account management for system integrations

**Authorization:**
- API-specific permission requirements
- Rate limiting and throttling controls
- Audit logging for all API operations

**Permission Requirements for Web Services:**
```al
// Additional permissions for web service access
table "BRC Retail Item Variant" = RIMD
codeunit "BRC Retail Item Inv. Upd WS" = X
// Plus standard BC web service permissions
```

## Troubleshooting Permission Issues

### Common Permission Problems

#### "You do not have permission" Errors

**Diagnosis Steps:**
1. Verify user has "BRC Retail All" permission set assigned
2. Check that permission set assignment is effective
3. Confirm user has base Business Central permissions
4. Test with administrative account

**Resolution:**
1. Assign missing permission sets
2. Refresh user sessions (sign out/sign in)
3. Check for conflicting permission restrictions
4. Verify object installation completed successfully

#### Partial Functionality Access

**Symptoms:**
- Some BRC features work, others don't
- Inconsistent behavior across users
- Reports available but setup inaccessible

**Common Causes:**
- Custom permission sets with incomplete coverage
- User group restrictions overriding individual permissions
- Object-specific permission conflicts

**Resolution Steps:**
1. Compare working vs. non-working user permissions
2. Test with full "BRC Retail All" permission set
3. Identify specific missing permissions
4. Update custom permission sets as needed

### Permission Validation

#### Verification Checklist

**For New Users:**
- [ ] "BRC Retail All" permission set assigned
- [ ] User can access BRC Retail Setup page
- [ ] User can view variant-related pages
- [ ] User can run standard BRC reports
- [ ] User can perform their specific job functions

**For Role Changes:**
- [ ] Old permissions removed appropriately  
- [ ] New permissions provide adequate access
- [ ] No unintended permission elevation
- [ ] Functionality tested in user's context

**For System Issues:**
- [ ] Extension properly installed and enabled
- [ ] Permission sets contain expected objects
- [ ] No conflicts with other extensions
- [ ] Standard BC permissions adequate for base functionality

## Contact Information for Security Issues

### Security Incident Response

**For Security Concerns:**
- Contact BrightCom Solutions AB support immediately
- Provide detailed description of security issue
- Include steps to reproduce if applicable
- Maintain confidentiality until resolved

**Documentation:**
- Security-related documentation available through partner channels
- Privacy policy: [BRC Privacy Policy](https://docs.brightcom.se/sv/PrivacyPolicy/BRCRetailExtension)
- Company security practices: Contact BrightCom Solutions AB

This comprehensive permission framework ensures secure and appropriate access to BRC Retail Extension functionality while maintaining Business Central security standards and compliance requirements.