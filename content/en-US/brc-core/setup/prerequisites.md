---
title: "Prerequisites"
linkTitle: "Prerequisites"
weight: 21
description: >
  System requirements and prerequisites for BRC Core installation.
---

## System Requirements

### Business Central Platform
- **Minimum Version**: Microsoft Dynamics 365 Business Central 25.0
- **Platform**: Cloud deployment only
- **Application Version**: 25.0.0.0 or later
- **Runtime**: AL Runtime 13.0 or later

### Required Dependencies

#### Microsoft Intrastat Core App
- **Publisher**: Microsoft
- **Minimum Version**: 25.0.0.0
- **Status**: Must be installed and active before BRC Core installation

This dependency is used for specific intrastat weight rounding functionality within BRC Core.

## User Permissions

### Required Permission Sets
Users who will use BRC Core functionality need appropriate permissions:

- **BRC Core All**: Complete access to all BRC Core functionality (assignable permission set)
- Standard Business Central permissions for:
  - Job Queue Entry management
  - Currency and Exchange Rate management  
  - User and User Group administration
  - Customer record access (for GDPR features)

### Administrative Access
Installation and configuration require users with:
- Extension Management permissions
- Permission Set assignment capabilities
- System administration rights for initial setup

## Technical Prerequisites

### Network Requirements

#### Outbound Internet Connectivity
Required for external service integrations:

**Currency Rate Providers**:
- `ecb.europa.eu` (European Central Bank) - Port 443 (HTTPS)
- `riksbank.se` (Swedish Central Bank) - Port 443 (HTTPS) 
- `nationalbanken.dk` (Danish National Bank) - Port 443 (HTTPS)
- `norges-bank.no` (Norwegian Central Bank) - Port 443 (HTTPS)
- `tcmb.gov.tr` (Central Bank of Turkey) - Port 443 (HTTPS)
- `xe.com` - Port 443 (HTTPS)
- `fixer.io` - Port 443 (HTTPS)

**Application Insights Telemetry**:
- `swedencentral-0.in.applicationinsights.azure.com` - Port 443 (HTTPS)

### Email Configuration
For Background Monitor notifications:
- SMTP server configured in Business Central
- Valid email addresses for error notifications
- Appropriate email permissions for the service account

## Feature-Specific Prerequisites

### Background Monitor
- Job Queue functionality enabled in Business Central
- Appropriate permissions for job queue entry monitoring
- Email setup (optional, for error notifications)

### Currency Exchange Rate Management  
- Currency setup completed in Business Central
- Currencies defined for rate updates
- Outbound internet access to rate provider APIs
- Job Queue functionality for automated updates

### Feature Management
- User and User Group configuration completed
- Understanding of conditional logic requirements
- Administrative access for feature condition setup

### GDPR Management
- Clear data retention policies defined
- Legal compliance requirements understood
- Test environment available for anonymization testing
- Backup procedures in place

### Price Book Functionality
- Product/item catalog properly configured
- Price calculation rules defined
- Job Queue functionality for automated updates

## Data Backup and Testing

### Pre-Installation Backup
- Complete database backup recommended
- Test environment setup for validation
- Rollback plan in place

### Test Environment
- Isolated test environment for initial configuration
- Sample data for testing functionality
- User acceptance testing plan

## Licensing Considerations

### Business Central Licensing
Ensure appropriate Business Central license covers:
- Number of users who will access BRC Core features
- Required application areas and functionality
- Integration and API access rights

### Third-Party Service Costs
Some currency rate providers may have:
- Usage limits on free tiers
- API rate limiting
- Potential costs for high-volume usage

## Migration Preparation

### From BCS Base
If migrating from previous BCS Base installation:
- Document existing configuration
- Export current settings where possible
- Plan for configuration review post-migration
- Identify customizations that may need updating

## Pre-Installation Checklist

Before proceeding with installation, verify:

- [ ] Business Central 25.0 or later is installed
- [ ] Microsoft Intrastat Core app is installed and active
- [ ] Required permissions are available
- [ ] Network connectivity to external services is confirmed
- [ ] Email configuration is completed (if using notifications)
- [ ] Backup procedures are in place
- [ ] Test environment is prepared
- [ ] Migration planning is complete (if applicable)

## Next Steps

Once all prerequisites are met, proceed to [Installation](installation/) for step-by-step installation instructions.