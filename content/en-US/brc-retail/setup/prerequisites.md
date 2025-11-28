---
title: "Prerequisites"
linkTitle: "Prerequisites"
weight: 21
description: >
  Detailed system requirements and prerequisites for BRC Retail Extension installation.
---

## System Requirements

### Business Central Version Requirements

**Minimum Requirements:**
- Microsoft Dynamics 365 Business Central version 24.0.0.0
- Application version 24.0.0.0 or higher
- AL Runtime 13.0 or higher
- Cloud deployment environment

**Supported Deployment Types:**
- Business Central Online (SaaS)
- Business Central Cloud (Private/Public)
- **Not supported**: On-premises deployments

### License Requirements

#### Core Licensing
- **Business Central Essentials** or **Business Central Premium** license
- **Item Management** permissions included in core license
- **Sales & Purchase** module access

#### Feature-Specific Licensing
Based on features you plan to use:

- **Warehouse Management**: Required for barcode label printing and physical inventory features
- **Multi-Language**: Required if using translation features across multiple languages
- **Advanced Reporting**: May require additional permissions for matrix reporting features

### User Permission Requirements

#### Minimum Permissions
Users working with BRC Retail Extension need:
- **Read/Write** access to Item and Item Variant tables
- **Read/Write** access to Sales and Purchase documents
- **Read** access to inventory ledger entries
- **Administrative** access for setup and configuration

#### Recommended Permission Sets
- Assign **"BRC Retail All"** permission set to power users
- Create custom permission sets for specific roles if needed
- Ensure setup users have full administrative access

## Technical Prerequisites

### Object Range Allocation
- **ID Range**: 12097619 to 12097668 (50 objects)
- Verify this range is available and not conflicting with other extensions
- No conflicts with standard Business Central objects

### Database Considerations
- **Table Extensions**: Extends standard BC tables (Item, Sales Line, Purchase Line, etc.)
- **Data Classification**: Implements proper Customer Content and System Metadata classification
- **Performance**: Designed for cloud-optimized performance

### Integration Points
The app integrates with these Business Central areas:
- **Item Management**: Extends item and variant functionality
- **Sales Process**: Enhances sales documents with variant information
- **Purchase Process**: Adds variant capabilities to purchase workflows  
- **Inventory Management**: Provides variant-aware inventory tracking
- **Reporting**: Extends standard reporting with matrix capabilities

## Business Prerequisites

### Organizational Readiness

#### Product Structure Understanding
Before implementation, ensure you have:
- Clear definition of your product variant dimensions (Size, Color, Style, etc.)
- Understanding of how variants relate to your business processes
- Established product coding conventions
- Brand and seasonal classification requirements

#### Process Requirements
- **Item Master Data**: Established item creation and maintenance processes
- **Variant Management**: Clear business rules for variant creation and management
- **Inventory Control**: Understanding of how variants affect inventory tracking
- **Sales/Purchase**: Knowledge of how variants impact document processing

#### User Training Needs
- **Administrative Users**: Need training on setup and configuration
- **End Users**: Require training on daily variant management operations
- **Power Users**: May need advanced training on reporting and matrix features

### Data Migration Considerations

#### Existing Item Data
If you have existing items in Business Central:
- **Variant Assessment**: Review current variant usage and structure
- **Data Cleanup**: Clean up inconsistent variant data before implementation
- **Template Design**: Design variant templates to accommodate existing products
- **Migration Planning**: Plan phased implementation for existing items

#### Historical Data
- **Transaction History**: Existing sales/purchase history remains intact
- **Reporting Continuity**: Ensure historical reporting needs are considered
- **Audit Requirements**: Maintain data integrity during transition

## Environmental Prerequisites

### Development and Testing
For implementation projects:
- **Sandbox Environment**: Dedicated environment for testing and configuration
- **User Acceptance Testing**: Environment for business user validation
- **Production Planning**: Planned deployment schedule and rollback procedures

### Backup and Recovery
- **Data Backup**: Ensure regular backup procedures are in place
- **Configuration Backup**: Document all setup configurations
- **Recovery Planning**: Understand recovery procedures for extension-related data

## Compliance and Security

### Data Classification
BRC Retail Extension handles:
- **Customer Content**: Product information, variant data, transaction details
- **System Metadata**: Timestamps, system-generated identifiers
- **Business Data**: Sales, purchase, and inventory information

### Privacy Considerations
- Review the [BRC Retail Extension Privacy Policy](https://docs.brightcom.se/sv/PrivacyPolicy/BRCRetailExtension)
- Understand data handling and storage practices
- Ensure compliance with local data protection regulations

### Security Requirements
- **User Access Control**: Implement proper role-based access
- **Data Encryption**: Leverage Business Central's built-in security features
- **Audit Trail**: Maintain proper audit trails for variant-related changes

## Pre-Installation Checklist

Before proceeding with installation, verify:

- [ ] Business Central version 24.0 or higher confirmed
- [ ] Required licenses available and assigned
- [ ] Object ID range 12097619-12097668 available
- [ ] User permission strategy defined
- [ ] Product variant structure documented
- [ ] Business processes mapped and understood
- [ ] Training plan developed for users
- [ ] Sandbox environment prepared for testing
- [ ] Backup and recovery procedures in place
- [ ] Privacy and compliance requirements reviewed

## Next Steps

Once prerequisites are confirmed:
1. Proceed to [Installation Guide](installation.md)
2. Review [Configuration Guide](configuration.md) 
3. Plan [User Training](../user-guide/getting-started.md)

For questions about prerequisites or compatibility:
- Contact your Business Central partner
- Reach out to BrightCom Solutions AB support
- Review Business Central system requirements documentation