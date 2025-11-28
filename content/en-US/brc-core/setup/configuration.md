---
title: "Configuration"
linkTitle: "Configuration"
weight: 23
description: >
  Initial configuration steps for BRC Core after installation.
---

## Overview

After successful installation, BRC Core requires initial configuration to enable its features. This guide covers the essential configuration steps for core functionality.

## Feature Management Configuration

Feature Management controls which BRC Core features are available to different users and companies.

### Access Feature Management

1. Search for "**BRC Core Feature Management**" (Alt+Q)
2. The page shows available features and their current conditions

### Configure Default Conditions

The installation creates default conditions automatically:

- **ALL USERS**: Enables features for all users (condition code: "ALL USERS")
- **Current User**: Enables features for the installing user

### Create Custom Feature Conditions

To create targeted feature availability:

1. Open **BRC Core Feature Conditions** from Feature Management page
2. Create new condition:
   - **Condition Code**: Unique identifier (e.g., "ADMIN_USERS")
   - **Function Code**: Select from available functions:
     - `USER`: User-based filtering
     - `USERGROUP`: User group-based filtering  
     - `COMPANY`: Company-based filtering
   - **Filter**: Define the condition criteria

**Example - Admin Users Only**:
- Condition Code: `ADMIN_USERS`
- Function Code: `USERGROUP`
- Filter: `<filter criteria for admin user group>`

### Assign Features to Conditions

1. Return to **BRC Core Feature Management**
2. Select a feature and assign condition codes
3. Features are only available when conditions are met

## Background Monitor Configuration

The Background Monitor tracks job queue entries and handles error notifications.

### Basic Setup

1. Open **BRC Core BM Setup** page
2. Configure core settings:

| Field | Purpose | Recommended Value |
|-------|---------|------------------|
| **Enabled** | Activates background monitoring | `True` |
| **Job Queue Runtime Max (min)** | Maximum runtime before flagging as error | `30-60` minutes |
| **Job Queue Max Tries** | Maximum retry attempts | `3` |
| **Standard Monitor Time (min)** | Monitoring frequency | `5` minutes |

### Email Notification Setup

For error notifications:

1. **E-mail Error**: Enter administrator email address
2. **Disable mail in Monitor Job**: Leave unchecked to enable notifications
3. Ensure SMTP is configured in Business Central

### Monitoring Configuration

1. **Action Categories**: Define error response actions
2. **Category Receivers**: Assign notification recipients by category
3. **Job Queue Monitoring**: The system automatically monitors job queue entries

## Currency Exchange Rate Configuration

Automate currency rate updates from external providers.

### Enable Currency Rate Services

1. Open **BRC Curr Exch. Rate Services** page
2. Review available services:
   - European Central Bank (ECB)
   - Riksbank (Sweden)
   - Nationalbanken (Denmark)
   - Norges Bank (Norway)
   - Central Bank of Turkey
   - XE.com
   - Fixer.io

### Configure Rate Update Setup

1. Navigate to **Curr. Exch. Rate Update Setup** (standard BC page)
2. Create update setup for each currency/provider combination
3. Configure:
   - **Service URL**: Select from available BRC services
   - **Currency Filter**: Specify currencies to update
   - **Update Schedule**: Define frequency via job queue

### Currency-Specific Configuration

1. Open **BRC Curr Exch. Rate Setup**
2. Configure currency-specific settings:
   - Rate override options
   - Update schedules
   - Service priority

## GDPR Management Configuration

Set up data anonymization and deletion capabilities.

### Basic GDPR Setup

1. Open **BRC Core GDPR Setup** page
2. Configure anonymization settings:
   - **Retention Policies**: Define how long to keep customer data
   - **Anonymization Rules**: Specify fields to anonymize
   - **Related Tables**: Configure connected data handling

### Related Field Configuration

1. Access **BRC Core GDPR Related Fields** page
2. Define fields that should be anonymized together
3. Configure cascade rules for related data

### Testing GDPR Functionality

**Important**: Always test GDPR functionality in a test environment first.

1. Create test customer data
2. Run anonymization process
3. Verify results meet compliance requirements
4. Document process for audit purposes

## Price Book Configuration

Configure automated price calculation and updates.

### Price Book Setup

1. Access Price Book configuration pages
2. Define:
   - **Price Books**: Catalog of prices to maintain
   - **Update Schedules**: When prices should be recalculated
   - **Calculation Rules**: How prices are determined

### Job Queue Integration

1. Set up job queue entries for automated price updates
2. Configure frequency based on business needs
3. Monitor job execution through Background Monitor

## Admin Toolbox Configuration

The Admin Toolbox provides system diagnostic and management capabilities.

### Accessing Admin Tools

1. Search for "**BRC Admin Toolbox**"
2. Available tools include:
   - System diagnostics
   - Record counting utilities
   - Administrative functions

### Configure Diagnostic Monitoring

Set up regular system health checks using available diagnostic tools.

## Job Queue User ID Configuration

Configure job queue entries to run with specific user context.

### Setting Job Queue User IDs

1. Navigate to **Job Queue Entries**
2. For BRC Core job queue entries, use the **BRC Core User ID** field
3. This allows jobs to run with appropriate permissions

### Security Considerations

- Assign appropriate user IDs based on job requirements
- Ensure job queue users have necessary permissions
- Monitor job execution through Background Monitor

## Application Insights Configuration

BRC Core includes Application Insights integration for telemetry.

### Telemetry Configuration

The app is pre-configured with:
- **Instrumentation Key**: bd3990ea-869d-43c4-aa17-34ec88949e0c
- **Endpoint**: swedencentral-0.in.applicationinsights.azure.com

No additional configuration required unless customizing telemetry.

## Configuration Validation

### Test Core Functionality

After configuration, validate:

1. **Feature Management**: Test feature availability for different users
2. **Background Monitor**: Create test job and verify monitoring
3. **Currency Rates**: Test rate update functionality
4. **Permissions**: Verify users have appropriate access

### Monitor Configuration

1. Review **BRC Core BM Action Entries** for monitoring activity
2. Check job queue execution logs
3. Validate email notifications (if configured)

## Configuration Best Practices

### Security
- Use principle of least privilege for job queue user IDs
- Regularly review feature condition assignments
- Monitor access logs for unusual activity

### Performance
- Adjust monitoring frequency based on system load
- Configure appropriate retry limits for job queue entries
- Monitor currency rate update performance

### Maintenance
- Regularly review and update feature conditions
- Monitor Background Monitor performance
- Keep currency rate services updated

## Next Steps

After completing initial configuration:

1. **User Training**: Review [User Guide](../user-guide/) for operational procedures
2. **Integration Setup**: Configure [integrations](../integrations/) as needed
3. **Ongoing Monitoring**: Establish monitoring and maintenance procedures
4. **Feature Rollout**: Gradually enable features based on business readiness

## Configuration Troubleshooting

For configuration issues, see the [Troubleshooting](../troubleshooting/) section for common problems and solutions.