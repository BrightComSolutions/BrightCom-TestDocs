---
title: "Setup & Installation"
linkTitle: "Setup"
weight: 20
description: >
  Complete setup guide for BRC Core including prerequisites, installation, and initial configuration.
---

## Prerequisites

### Business Central Requirements
- **Version**: Business Central 25.0 or later (Cloud deployment)
- **Runtime**: AL Runtime 13.0 or later
- **Dependencies**: Microsoft Intrastat Core app (version 25.0.0.0 or later)
- **Platform**: Business Central 25.0.0.0 Cloud platform

### License Requirements
The `BRC Core All` permission set requires the following Business Central permissions:
- Access to Job Queue Entry table and related functionality
- Currency Exchange Rate management permissions
- User and User Group management for feature controls
- Customer data management for GDPR functionality
- Administrative access for monitoring and diagnostic features

### Technical Requirements

#### For Currency Exchange Rate Service
- Outbound internet connectivity for external currency rate providers:
  - European Central Bank (ecb.europa.eu)
  - Riksbank (riksbank.se)
  - Nationalbanken (nationalbanken.dk)
  - Norges Bank (norges-bank.no)
  - Central Bank of Turkey (tcmb.gov.tr)
  - XE.com
  - Fixer.io

#### For Application Insights Integration
- Azure Application Insights connection (pre-configured with instrumentation key)
- Internet connectivity for telemetry data transmission

## Installation Process

### 1. App Installation
1. Download BRC Core app from Microsoft AppSource or your distribution channel
2. Install through Business Central Extension Management
3. Verify installation in **Extension Management** page

### 2. Dependencies Verification
Ensure Microsoft Intrastat Core app is installed:
1. Navigate to **Extension Management**
2. Verify "Intrastat Core" by Microsoft is installed and active
3. Version must be 25.0.0.0 or later

### 3. Permission Assignment
Assign the `BRC Core All` permission set to users who need access:
1. Navigate to **Users** page
2. Select user and choose **User Permission Sets**
3. Add permission set `BRC Core All`
4. Verify permissions are applied correctly

### 4. Feature Management Setup
Configure feature management during initial setup:
1. The installation process automatically creates basic feature conditions
2. All users condition is created by default
3. Current user condition is created for the installing user

## Initial Configuration

### Background Monitor Setup
Configure background job monitoring:

1. Open **BRC Core BM Setup** page
2. Configure the following settings:
   - **Enabled**: Set to `true` to activate monitoring
   - **Job Queue Runtime Max (min)**: Maximum runtime before flagging as error (default: recommended 30-60 minutes)
   - **Job Queue Max Tries**: Maximum retry attempts for failed jobs (default: 3)
   - **Standard Monitor Time (min)**: Monitoring interval in minutes (default: 5)
   - **E-mail Error**: Email address for error notifications
   - **Disable mail in Monitor Job**: Check to disable email notifications

### Currency Exchange Rate Configuration
Set up automated currency rate updates:

1. Navigate to **BRC Curr Exch. Rate Setup**
2. Enable desired currency rate services
3. Configure update schedules through standard BC Currency Exchange Rate Update Setup
4. Set currency filters for specific currencies you need

### Feature Management Configuration
Configure conditional feature availability:

1. Open **BRC Core Feature Management** page
2. Review existing feature conditions
3. Create new conditions as needed using **BRC Core Feature Conditions**
4. Set up feature filters using **BRC Core Feature Filters**

### GDPR Setup (If Required)
Configure GDPR data management:

1. Open **BRC Core GDPR Setup** page
2. Define anonymization rules and retention policies
3. Configure related tables and fields for data management
4. Test anonymization process on test data

### Price Book Setup (If Required)
Configure automated price calculations:

1. Set up price books in the Price Book configuration
2. Define update schedules and calculation rules
3. Configure job queue entries for automated price updates

## Post-Installation Verification

### 1. Feature Verification
- Verify feature management is working by checking **BRC Core Feature Management** page
- Confirm conditions are properly evaluated
- Test feature availability for different users

### 2. Background Monitor Testing
- Create a test job queue entry
- Verify it appears in background monitor
- Check error handling and notification functionality

### 3. Integration Testing
- Test currency rate updates (if configured)
- Verify job queue user ID functionality
- Confirm Application Insights telemetry is working

## Migration from BCS Base

If upgrading from a previous BCS Base installation:

1. The installation automatically detects existing BCS Base configuration
2. Feature conditions are migrated with "BCS" prefix replaced by "BRC"
3. Job Queue User ID fields are preserved and migrated
4. Review migrated settings to ensure accuracy

## Next Steps

After successful installation and initial configuration:

1. Review the [User Guide](../user-guide/) for operational procedures
2. Configure specific features based on your business requirements
3. Set up monitoring and alerting as needed
4. Train users on new functionality

## Troubleshooting Installation

For common installation issues, see the [Troubleshooting](../troubleshooting/) section.