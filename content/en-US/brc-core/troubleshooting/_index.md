---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
weight: 50
description: >
  Common issues, solutions, and troubleshooting procedures for BRC Core.
---

## Troubleshooting Overview

This section provides comprehensive troubleshooting guidance for common BRC Core issues, including diagnostic procedures, resolution steps, and prevention strategies.

## Quick Troubleshooting Guide

### Common Issues Quick Reference

| Symptom | Likely Cause | Quick Fix |
|---------|-------------|-----------|
| Cannot access BRC features | Permission issue | Check `BRC Core All` permission set assignment |
| Currency rates not updating | Service connectivity | Check external service connectivity and job queue |
| Background monitor not working | Monitor disabled or misconfigured | Verify BRC Core BM Setup configuration |
| Features appear restricted | Feature conditions not met | Review Feature Management conditions |
| Job queue errors | User context or permission issues | Check `BRC Core User ID` field in job queue entries |

## Installation and Setup Issues

### Installation Problems

**Cannot Install BRC Core Extension**

*Symptoms*:
- Extension installation fails
- Dependency error messages
- Installation timeout

*Causes and Solutions*:

1. **Missing Dependencies**:
   ```
   Error: "Dependency not found: Intrastat Core"
   Solution: Install Microsoft Intrastat Core app first
   ```

2. **Insufficient Permissions**:
   ```
   Error: "Permission denied during installation"
   Solution: Verify administrator rights in Extension Management
   ```

3. **Version Compatibility**:
   ```
   Error: "Platform version not supported"
   Solution: Ensure Business Central 25.0+ is installed
   ```

**Post-Installation Access Issues**

*Symptoms*:
- BRC Core features not visible
- Search returns no BRC results
- Permission denied errors

*Diagnostic Steps*:

1. **Check Extension Status**:
   - Navigate to Extension Management
   - Verify BRC Core is "Installed" and "Enabled"
   - Check version matches expected installation

2. **Verify Permission Assignment**:
   - Check user has `BRC Core All` permission set
   - Confirm permission set is active (not expired)
   - Validate user license includes necessary BC permissions

3. **Test Feature Access**:
   - Search for "BRC Core Feature Management" (Alt+Q)
   - If accessible, installation is successful
   - If not accessible, permission issue exists

## Feature Management Issues

### Feature Availability Problems

**Features Show as Restricted**

*Symptoms*:
- Features appear in Feature Management but marked as restricted
- Users cannot access features they should have
- Feature conditions seem correct but don't work

*Troubleshooting Steps*:

1. **Check Feature Conditions**:
   ```
   Navigate to: BRC Core Feature Management > Select Feature > Feature Conditions
   Verify: Condition codes are properly configured
   Test: Run condition evaluation manually if possible
   ```

2. **User Group Membership**:
   ```
   Check: User Groups page for affected user
   Verify: User is member of expected groups
   Test: Try with different user in same group
   ```

3. **Condition Logic Debugging**:
   - Open `BRC Core Feature Conditions` page
   - Review condition code and filter logic
   - Test condition manually with sample data

**Feature Conditions Not Evaluating Correctly**

*Common Issues*:

1. **Filter Syntax Problems**:
   ```
   Invalid: User Name=ADMIN (missing quotes)
   Valid: "User Name"='ADMIN'
   ```

2. **Group Name Mismatches**:
   ```
   Check: Exact spelling and case of group names
   Verify: Group still exists and is active
   ```

3. **Function Code Issues**:
   ```
   USER: Requires user-based filter
   USERGROUP: Requires group-based filter  
   COMPANY: Requires company-based filter
   ```

### Feature Management Performance Issues

**Slow Feature Evaluation**

*Symptoms*:
- Delayed page loading when features are evaluated
- Timeouts on pages with many features
- Performance degradation

*Solutions*:

1. **Optimize Condition Filters**:
   - Simplify complex filter conditions
   - Use indexed fields where possible
   - Minimize condition complexity

2. **Review Condition Usage**:
   - Remove unused conditions
   - Consolidate similar conditions
   - Cache frequently used evaluations

## Background Monitor Issues

### Monitor Not Running

**Background Monitor Appears Inactive**

*Symptoms*:
- No recent entries in BRC Core BM Action Entries
- Background monitor setup shows "Last Monitor Run" is old
- Error notifications not being sent

*Diagnostic Steps*:

1. **Check Monitor Configuration**:
   ```
   Navigate to: BRC Core BM Setup
   Verify: "Enabled" = True
   Check: "Standard Monitor Time" is reasonable (5-15 minutes)
   ```

2. **Job Queue Entry Status**:
   ```
   Navigate to: Job Queue Entries
   Filter: Find background monitor job
   Check: Status should be "Ready" or "In Process"
   ```

3. **Monitor Job Permissions**:
   ```
   Check: "BRC Core User ID" field in monitor job queue entry
   Verify: User has necessary permissions for monitoring
   Test: Run job manually to check for errors
   ```

### Job Queue Monitoring Issues

**Jobs Not Being Monitored**

*Symptoms*:
- Job failures not detected by monitor
- No error notifications for failed jobs
- Monitor running but not catching issues

*Troubleshooting*:

1. **Monitor Scope Configuration**:
   - Check if monitor is configured for specific job categories
   - Verify job queue entries are in monitored scope
   - Review filter criteria for monitored jobs

2. **Error Detection Settings**:
   ```
   Check: "Job Queue Runtime Max (min)" setting
   Verify: "Job Queue Max Tries" is appropriate
   Test: Create intentional job failure to test detection
   ```

### Email Notification Problems

**Error Emails Not Being Sent**

*Symptoms*:
- Job failures detected but no emails sent
- Email configuration appears correct
- Manual email tests work from BC

*Solutions*:

1. **Email Configuration**:
   ```
   Check: "E-mail Error" field in BRC Core BM Setup
   Verify: Email address is valid and monitored
   Test: "Disable mail in Monitor Job" = False
   ```

2. **SMTP Configuration**:
   ```
   Navigate to: SMTP Mail Setup in Business Central
   Verify: SMTP server configuration is working
   Test: Send test email from BC
   ```

3. **Email Content Issues**:
   - Check if emails are being caught by spam filters
   - Verify email server allows automated emails
   - Review email logs for delivery failures

## Currency Rate Issues

### Rates Not Updating

**Exchange Rates Appear Outdated**

*Symptoms*:
- Exchange rates haven't updated in expected timeframe
- Rate dates are older than expected
- Currency rate job shows errors

*Diagnostic Process*:

1. **Service Status Check**:
   ```
   Navigate to: BRC Curr Exch Rate Services
   Check: Last update times for each service
   Review: Any error messages or status indicators
   ```

2. **Job Queue Status**:
   ```
   Navigate to: Job Queue Entries
   Filter: Currency rate update jobs
   Check: Job status and error messages
   ```

3. **External Service Connectivity**:
   ```
   Test: Internet connectivity to rate provider URLs
   Check: Firewall rules allow HTTPS to external services
   Verify: DNS resolution for service endpoints
   ```

### Rate Service Errors

**Specific Service Provider Failures**

*Common Error Patterns*:

1. **ECB Service Issues**:
   ```
   Error: "Cannot connect to ecb.europa.eu"
   Check: Network connectivity and firewall rules
   Test: Manual URL access to ECB feeds
   ```

2. **API Rate Limiting**:
   ```
   Error: "Rate limit exceeded" or "Too many requests"
   Solution: Adjust job frequency or implement delays
   Check: Service-specific rate limits
   ```

3. **Authentication Problems**:
   ```
   Error: "Authentication failed" or "Invalid API key"
   Check: API key configuration for paid services
   Verify: API key hasn't expired
   ```

### Rate Validation Issues

**Suspicious Rate Changes**

*Symptoms*:
- Rates appear unrealistic or extreme
- Sudden large rate changes
- Rate variance warnings

*Investigation Steps*:

1. **Rate Verification**:
   - Compare rates against multiple external sources
   - Check historical rate patterns for context
   - Verify rate isn't a data error from provider

2. **Data Quality Checks**:
   ```
   Navigate to: Exchange Rates page
   Review: Recent rate history for patterns
   Check: Rate effective dates are correct
   ```

3. **Service Failover**:
   - Switch to backup rate provider temporarily
   - Compare rates from multiple sources
   - Implement manual rate override if necessary

## Performance Issues

### Slow System Performance

**BRC Core Features Running Slowly**

*Symptoms*:
- Slow page loading for BRC Core pages
- Timeouts on feature-heavy pages
- General system sluggishness

*Performance Diagnostics*:

1. **Database Performance**:
   ```
   Check: Large table sizes in BRC Core tables
   Review: Index usage and optimization
   Monitor: Database query performance
   ```

2. **Job Queue Performance**:
   ```
   Check: Number of concurrent job queue entries
   Review: Job execution times
   Monitor: Resource usage during job processing
   ```

3. **Feature Management Performance**:
   ```
   Check: Complex feature conditions
   Review: Number of active conditions
   Optimize: Condition filter complexity
   ```

### External Service Performance

**Slow External Service Responses**

*Symptoms*:
- Currency rate updates take excessive time
- External service timeouts
- Inconsistent response times

*Optimization Steps*:

1. **Connection Configuration**:
   ```
   Check: Network latency to external services
   Adjust: Timeout settings if necessary
   Configure: Connection pooling settings
   ```

2. **Batch Processing Optimization**:
   ```
   Review: Batch size for rate updates
   Optimize: Number of concurrent external requests
   Schedule: Updates during off-peak hours
   ```

## Data and Integration Issues

### GDPR Management Issues

**Anonymization Process Failures**

*Symptoms*:
- Customer anonymization fails
- Incomplete data anonymization
- Error messages during GDPR processing

*Troubleshooting*:

1. **Customer Eligibility Check**:
   ```
   Use: BRC Core GDPR Management tools
   Check: OKToAnonymizeData function results
   Verify: No blocking conditions exist
   ```

2. **Data Dependency Issues**:
   ```
   Check: Open transactions for customer
   Verify: Related records are properly configured
   Review: GDPR related tables setup
   ```

### Price Book Issues

**Price Calculation Problems**

*Symptoms*:
- Price calculations not running
- Incorrect calculated prices
- Price book job failures

*Resolution Steps*:

1. **Price Book Configuration**:
   ```
   Check: Price book active status
   Verify: Calculation schedules are correct
   Review: Update frequency settings
   ```

2. **Calculation Logic Issues**:
   ```
   Test: Manual price book calculation
   Check: Calculation engine parameters
   Verify: Data sources for calculations
   ```

## Getting Additional Help

### Diagnostic Information Collection

**Information to Gather Before Contacting Support**:

1. **System Information**:
   - BRC Core version number
   - Business Central version and build
   - Browser and client information

2. **Error Information**:
   - Exact error messages
   - Steps to reproduce the issue
   - Screenshots of error conditions

3. **Configuration Information**:
   - Feature management setup
   - Background monitor configuration
   - Currency service configuration

### Support Escalation

**When to Contact Technical Support**:

- Issues persist after following troubleshooting steps
- Critical business functions are impacted
- Error messages indicate system-level problems
- Performance issues affect business operations

**Contact Information**:
- **Documentation**: [https://docs.brightcom.se/sv/Products/BRCCore](https://docs.brightcom.se/sv/Products/BRCCore)
- **Support**: BrightCom Solutions AB technical support
- **Community**: Business Central community forums

### Preventive Measures

**Avoiding Common Issues**:

1. **Regular Monitoring**:
   - Daily review of background monitor status
   - Weekly verification of currency rate updates
   - Monthly review of feature management usage

2. **Maintenance Tasks**:
   - Regular testing of external service connectivity
   - Periodic review of job queue performance
   - Ongoing monitoring of system resource usage

3. **Configuration Management**:
   - Document all configuration changes
   - Test changes in development environment first
   - Maintain backup configurations

By following these troubleshooting procedures and maintaining good system hygiene, most BRC Core issues can be resolved quickly and prevented from recurring.