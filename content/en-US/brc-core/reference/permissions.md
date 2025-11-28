---
title: "Permissions"
linkTitle: "Permissions"
weight: 61
description: >
  Complete permission requirements and security configuration for BRC Core.
---

## Permission Requirements

This section provides comprehensive information about the permissions required for BRC Core functionality, including permission sets, security considerations, and access control configuration.

## Primary Permission Set

### BRC Core All (12078468)

**Permission Set Details**:
- **ID**: 12078468
- **Name**: "BRC Core All"
- **Caption**: "All permissions"
- **Access**: Internal
- **Assignable**: True
- **Scope**: Complete access to all BRC Core functionality

**Usage**: This is the primary permission set that should be assigned to users who need access to BRC Core features.

## Detailed Permission Breakdown

### Codeunit Permissions

The `BRC Core All` permission set grants execute (X) permissions to all BRC Core codeunits:

**Core Management Codeunits**:
```
codeunit "BRC Core Feature Mgmt." = X
codeunit "BRC Core Install" = X  
codeunit "BRC Core Upgrade" = X
codeunit "BRC Admin Tool Mgt." = X
codeunit "BRC Core Migrate Tool" = X
```

**Background Monitoring Codeunits**:
```
codeunit "BRC Core BM Error Test" = X
codeunit "BRC Core BM Job Queue Monitor" = X
codeunit "BRC Core BM Perform Action" = X
codeunit "BRC Core JobQueue Mgmt." = X
codeunit "BRC Core JobQueue Subscribers" = X
codeunit "BRC Core TB Job Queue Mgmt." = X
```

**Currency Exchange Rate Codeunits**:
```
codeunit "BRC Curr Exch Rate Service" = X
codeunit "BRC Curr Exch Rate Helper" = X
codeunit "BRC Curr Exch Rate Http" = X
codeunit "BRC Curr Exch Rate Cache" = X
codeunit "BRC Currency Exch. Rate Event" = X
```

**External Service Provider Codeunits**:
```
codeunit "BRC ecb.europa.eu 90Days" = X
codeunit "BRC ecb.europa.eu Latest" = X
codeunit "BRC Riksbank.se Latest" = X
codeunit "BRC Riksbank.se Period" = X
codeunit "BRC Riksbank.rest" = X
codeunit "BRC Nationalbanken.dk Latest" = X
codeunit "BRC Nationalbanken.dk 5Days" = X
codeunit "BRC norges-bank.no Period" = X
codeunit "BRC tcmb.gov.tr Latest" = X
codeunit "BRC Xe.com Period" = X
codeunit "BRC fixer.io Period" = X
codeunit "BRC Sedlabanki.is Period" = X
```

**GDPR Management Codeunits**:
```
codeunit "BRC Core GDPR Job Queue Mgt." = X
codeunit "BRC Core GDPR Management" = X
codeunit "BRC Core GDPR Process Cust." = X
codeunit "BRC Core RD Record Del. Mgmt" = X
```

**Feature Management Codeunits**:
```
codeunit "BRC Core Install Feature Mgmt" = X
codeunit "BRC Core Upgrade Feature Mgmt" = X
```

### Page Permissions

The permission set grants access (X) to all BRC Core pages:

**Administrative Pages**:
```
page "BRC Admin Toolbox" = X
page "BRC All Objects" = X
page "BRC Active Session List" = X
```

**Feature Management Pages**:
```
page "BRC Core Feature Management" = X
page "BRC Core Feature Conditions" = X
page "BRC Core Feature Cond. Setup" = X
page "BRC Core Feature Filters" = X
page "BRC Core Feature Cond Factbox" = X
```

**Background Monitoring Pages**:
```
page "BRC Core BM Setup" = X
page "BRC Core BM Action Entries" = X
page "BRC Core BM Category Receiver" = X
```

**Currency Management Pages**:
```
page "BRC Curr Exch Rate Services" = X
page "BRC Curr Exch. Rate Setup" = X
page "BRC Curr Exch Rate ISO List" = X
```

**GDPR Management Pages**:
```
page "BRC Core GDPR Setup" = X
page "BRC Core GDPR Search" = X
page "BRC Core GDPR Search Tbl Instr" = X
page "BRC Core GDPR Related Fields" = X
page "BRC Core GDPR Related Tables" = X
page "BRC Core GDPR Field Lookup" = X
page "BRC Core GDPR Anony. Customers" = X
```

### Table Permissions

The permission set includes read/write permissions for all BRC Core tables:

**Feature Management Tables**:
```
table "BRC Core Feature" = RIMD
table "BRC Core Feature Condition" = RIMD
table "BRC Core Feature Cond. Setup" = RIMD
table "BRC Core Feature Filter" = RIMD
```

**Background Monitoring Tables**:
```
table "BRC Core BM Setup" = RIMD  
table "BRC Core BM Action Entry" = RIMD
table "BRC Core BM Category Receiver" = RIMD
```

**Currency Rate Tables**:
```
table "BRC Curr Exch Rate Service" = RIMD
table "BRC Curr Exch Rate Buffer" = RIMD
table "BRC Curr Exch Rate Setup" = RIMD
```

## Security Considerations

### Role-Based Access Control

**Administrator Role**:
- **Permission Set**: `BRC Core All`
- **Access Level**: Full access to all BRC Core functionality
- **Responsibilities**: Configuration, monitoring, user management
- **Required for**: Installation, setup, advanced configuration

**End User Role**:
- **Permission Set**: `BRC Core All` (with feature management restrictions)
- **Access Level**: Feature-controlled access based on conditions
- **Responsibilities**: Daily operations within assigned features
- **Required for**: Using BRC Core features in daily work

**Read-Only Role**:
- **Permission Set**: Custom subset of `BRC Core All` with read-only permissions
- **Access Level**: View-only access to monitoring and status information
- **Responsibilities**: Monitoring, reporting, status checking
- **Required for**: Supervisory oversight without configuration rights

### Feature-Level Security

**Conditional Access Control**:

BRC Core implements additional security through feature management:

1. **User-Based Conditions**:
   ```
   Condition: USER
   Filter: "User Name" = 'ADMIN'
   Result: Feature only available to ADMIN user
   ```

2. **Group-Based Conditions**:
   ```
   Condition: USERGROUP  
   Filter: User Group Code = 'MANAGER'
   Result: Feature available to users in MANAGER group
   ```

3. **Company-Based Conditions**:
   ```
   Condition: COMPANY
   Filter: Company Name = 'CRONUS'
   Result: Feature only available in CRONUS company
   ```

### Data Protection and Privacy

**GDPR Compliance Permissions**:

Special considerations for GDPR-related functionality:

- **Customer Data Access**: Requires permissions to Customer table and related records
- **Anonymization Rights**: Should be restricted to compliance officers or administrators
- **Audit Trail Access**: Read access to GDPR audit logs for compliance reporting
- **Data Export Rights**: Permissions for data portability requirements

**Recommended GDPR Permission Assignment**:
```
Role: GDPR Compliance Officer
Permissions: BRC Core All + Customer table RIMD + related audit permissions
Restrictions: Feature conditions limiting GDPR functions to compliance role
```

## Business Central Standard Permissions

### Required Standard BC Permissions

BRC Core functionality requires certain standard Business Central permissions:

**Job Queue Management**:
```
Table: Job Queue Entry (RIMD)
Table: Job Queue Category (R)
Pages: Job Queue Entries, Job Queue Entry Card
```

**User and Security Management**:
```
Table: User (R)
Table: User Group (R)  
Table: User Group Member (R)
Table: Access Control (R)
Pages: Users, User Groups
```

**Currency Management**:
```
Table: Currency (R)
Table: Currency Exchange Rate (RIMD)
Table: Curr. Exch. Rate Update Setup (RIMD)
Pages: Currencies, Exchange Rates
```

**General System Access**:
```
Table: Company Information (R)
Table: General Ledger Setup (R)
Application Area: Basic, Suite (as appropriate)
```

### Integration with Standard Permission Sets

**Recommended Standard Permission Sets**:

For users who need BRC Core functionality, consider these standard BC permission sets:

- **D365 BASIC**: Core Business Central functionality
- **D365 BUS PREMIUM**: Full business functionality including advanced features
- **D365 DIM MGMT**: Dimension management (for related BRC Core features)
- **LOCAL**: Localization features (for currency and regional functionality)

## Permission Assignment Guidelines

### Best Practices for Permission Assignment

**Principle of Least Privilege**:
- Grant only the minimum permissions necessary for job functions
- Use feature conditions to further restrict access within BRC Core
- Regularly review and audit permission assignments

**Role-Based Assignment Strategy**:

1. **System Administrators**:
   ```
   Standard Permissions: SUPER or D365 FULL ACCESS
   BRC Permissions: BRC Core All  
   Feature Conditions: No restrictions (administrative override)
   ```

2. **Functional Administrators**:
   ```
   Standard Permissions: D365 BUS PREMIUM
   BRC Permissions: BRC Core All
   Feature Conditions: Administrative features only
   ```

3. **End Users**:
   ```
   Standard Permissions: D365 BASIC or D365 BUS PREMIUM
   BRC Permissions: BRC Core All
   Feature Conditions: Role-specific feature access
   ```

4. **Read-Only Users**:
   ```
   Standard Permissions: Appropriate read-only set
   BRC Permissions: Custom read-only subset
   Feature Conditions: Monitoring and reporting only
   ```

### Permission Testing and Validation

**Permission Validation Process**:

1. **Test with Actual Users**: Verify permissions work with real user accounts
2. **Role-Based Testing**: Test each role scenario thoroughly
3. **Feature Condition Testing**: Verify conditional access works correctly
4. **Boundary Testing**: Test edge cases and permission boundaries

**Common Permission Issues**:

- **Inheritance Problems**: Ensure permission sets don't conflict
- **Missing Dependencies**: Verify all required standard BC permissions exist
- **Feature Condition Logic**: Test condition evaluation thoroughly
- **Company-Specific Issues**: Test multi-company scenarios if applicable

## Troubleshooting Permission Issues

### Common Permission Problems

**User Cannot Access BRC Core Features**:
1. Check if `BRC Core All` permission set is assigned
2. Verify permission set is active (not expired)
3. Check feature conditions if features appear restricted
4. Validate standard BC permissions for related functionality

**Partial Feature Access**:
1. Review feature management conditions
2. Check user group memberships
3. Verify condition filter syntax
4. Test with administrative override

**Job Queue Permission Errors**:
1. Check `BRC Core User ID` field in job queue entries
2. Verify job queue user has appropriate permissions
3. Validate service account permissions for background processing

### Diagnostic Tools

**Permission Analysis Pages**:
- **User Permission Sets**: View assigned permission sets
- **Effective Permissions**: See calculated permissions for objects
- **BRC Core Feature Management**: Check feature-level access

**Logging and Auditing**:
- Application Insights telemetry for permission-related errors
- Standard BC security audit logs
- BRC Core specific audit trails for feature access

## Advanced Permission Configuration

### Custom Permission Sets

**Creating Specialized Permission Sets**:

For organizations requiring custom permission configurations:

1. **Copy BRC Core All**: Start with full permissions
2. **Remove Unnecessary Permissions**: Strip down to required functionality
3. **Add Feature Conditions**: Use feature management for fine-grained control
4. **Test Thoroughly**: Validate custom configurations work correctly

**Example Custom Permission Set**:
```
Name: BRC Core Monitor Only
Purpose: Background monitoring access only
Include: Background monitor codeunits and pages
Exclude: Configuration pages, admin tools
Feature Conditions: Monitor features only
```

### Multi-Company Considerations

**Company-Specific Permissions**:

- **Global vs. Company**: Consider which permissions need company-specific assignment
- **Cross-Company Access**: Manage permissions for users working across companies
- **Data Isolation**: Ensure proper data separation between companies
- **Configuration Inheritance**: Plan permission inheritance across companies

This comprehensive permission documentation ensures proper security configuration and access control for BRC Core functionality while maintaining alignment with Business Central security principles.