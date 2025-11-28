---
title: "Daily Operations"
linkTitle: "Daily Operations"
weight: 32
description: >
  Common daily tasks and workflows using BRC Core features.
---

## Daily Operations Overview

This guide covers the routine tasks and workflows you'll perform with BRC Core features as part of your daily Business Central operations.

## Background Monitoring Tasks

### Morning System Health Check

**Frequency**: Daily at start of business

**Purpose**: Ensure all background processes ran correctly overnight

**Steps**:
1. Search for "**BRC Core BM Action Entries**"
2. Review entries from the last 24 hours
3. Look for:
   - ❌ **Error entries**: Jobs that failed
   - ⚠️ **Warning entries**: Jobs that need attention
   - ✅ **Success entries**: Normal operations

**Action Items**:
- **Errors Found**: Follow error resolution procedures
- **Warnings Found**: Review and address if needed
- **All Clean**: Continue with normal operations

### Monitoring Job Queue Status

**When to Perform**: When notified of job issues or during troubleshooting

**Steps**:
1. Open "**Job Queue Entries**" (standard BC page)
2. Filter by status if needed:
   - **Status = Error**: Failed jobs requiring attention
   - **Status = In Process**: Currently running jobs
3. For BRC Core jobs, check the **BRC Core User ID** field
4. Review error messages and take appropriate action

**Common Actions**:
- **Restart Failed Jobs**: Set status back to "Ready" 
- **Adjust Schedules**: Modify frequency if needed
- **Check Permissions**: Verify user context is appropriate

### Responding to Monitor Alerts

**Email Notifications**:
When you receive background monitor error emails:

1. **Read the alert carefully** - Note job name, error message, time
2. **Access the system** - Log into Business Central
3. **Check current status** - Error may have resolved automatically
4. **Follow escalation procedures** - Contact administrator if unresolved

**In-System Alerts**:
1. Navigate to **BRC Core BM Action Entries**
2. Filter to error entries from the alert time
3. Review detailed error information
4. Take corrective action based on error type

## Currency Rate Management

### Daily Rate Verification

**Frequency**: Daily, typically morning

**Purpose**: Ensure exchange rates are current and accurate

**Steps**:
1. Navigate to "**Exchange Rates**" (standard BC page)
2. Check **Starting Date** for your key currencies
3. Verify rates are from current/recent date
4. Note any missing or outdated rates

**Verification Checklist**:
- [ ] Rates updated within expected timeframe
- [ ] Key trading currencies present
- [ ] Rates appear reasonable (no extreme changes)
- [ ] No error notifications for rate services

### Handling Rate Update Issues

**When Rates Haven't Updated**:

1. **Check Service Status**:
   - Open "**BRC Curr Exch Rate Services**"
   - Review last update times
   - Check for error messages

2. **Manual Rate Update** (if needed):
   - Navigate to **Curr. Exch. Rate Update Setup**
   - Select appropriate service
   - Choose "**Update Exch. Rates**" action

3. **Document Issues**:
   - Note which services failed
   - Record error messages
   - Report to administrator if persistent

### Working with Rate Variances

**When Exchange Rates Change Significantly**:

1. **Verify Rate Accuracy**:
   - Check against external sources
   - Confirm rate is not an error

2. **Business Impact Assessment**:
   - Review open foreign currency transactions
   - Assess impact on pending orders
   - Consider timing of currency-sensitive activities

3. **Communication**:
   - Inform relevant stakeholders
   - Document significant rate changes
   - Follow company procedures for rate variance

## Price Book Operations

### Daily Price Monitoring

**For Organizations Using Price Books**:

**Morning Price Check**:
1. Review price book update logs
2. Verify automated calculations completed
3. Check for any price calculation errors

**Price Validation**:
1. Spot-check critical item prices
2. Verify pricing appears reasonable
3. Confirm price effective dates are correct

### Handling Price Update Issues

**When Price Updates Fail**:

1. **Check Job Queue Status**:
   - Locate price book calculation job
   - Review error messages
   - Check job timing and frequency

2. **Manual Price Calculation**:
   - Access price book configuration
   - Trigger manual calculation if needed
   - Verify results are as expected

3. **Price Accuracy Verification**:
   - Compare calculated vs. expected prices
   - Check calculation rules and logic
   - Report discrepancies to administrator

## Feature Management Operations

### Checking Feature Availability

**When New Features Are Deployed**:

1. **Review Feature Status**:
   - Open "**BRC Core Feature Management**"
   - Check for newly available features
   - Note any changed conditions

2. **Test New Access**:
   - Try accessing new features
   - Verify functionality works as expected
   - Report any issues to administrator

### Managing Feature Conditions

**For Users with Feature Management Rights**:

**Adding Users to Features**:
1. Navigate to **BRC Core Feature Conditions**
2. Locate relevant condition
3. Modify user or group filters as needed
4. Test that changes work correctly

**Troubleshooting Feature Access**:
1. Check user's group memberships
2. Verify condition logic is correct
3. Test condition evaluation
4. Update conditions as needed

## GDPR and Data Management

### Daily Data Management Tasks

**For Compliance Officers or Administrators**:

**Customer Data Review**:
1. Check for customer anonymization requests
2. Review data retention compliance
3. Process any pending data deletions

**Data Quality Monitoring**:
1. Review customer data for accuracy
2. Check for duplicate or incomplete records
3. Ensure data classification is correct

### Processing GDPR Requests

**Customer Data Anonymization**:

1. **Verify Request Legitimacy**:
   - Confirm customer identity
   - Verify request authorization
   - Check legal requirements

2. **Pre-Anonymization Check**:
   - Use **BRC Core GDPR Management** tools
   - Verify customer can be anonymized
   - Check for blocking conditions (open transactions, etc.)

3. **Execute Anonymization**:
   - Run anonymization process
   - Verify completion
   - Document action taken

## Administrative Tools Usage

### Daily System Diagnostics

**For System Administrators**:

**System Health Check**:
1. Open "**BRC Admin Toolbox**"
2. Run diagnostic utilities
3. Check system performance metrics
4. Review any warnings or alerts

**Record Management**:
1. Monitor table record counts
2. Check for unusual growth patterns
3. Review system resource usage

### Troubleshooting Daily Issues

**Performance Monitoring**:
1. Check job queue performance
2. Monitor background process timing
3. Review system resource usage

**User Support**:
1. Assist users with feature access issues
2. Troubleshoot permission problems
3. Provide guidance on feature usage

## End-of-Day Tasks

### System Status Wrap-up

**Before Leaving for the Day**:

1. **Final Monitor Check**:
   - Review any late-day job queue activity
   - Check for new error notifications
   - Verify critical processes completed

2. **Pending Issues Review**:
   - Document any unresolved issues
   - Set priorities for next day
   - Communicate critical issues to on-call support

3. **System Preparation**:
   - Ensure overnight jobs are scheduled
   - Verify automatic processes are enabled
   - Check weekend/holiday schedules

## Weekly and Periodic Tasks

### Weekly System Review

**Every Monday Morning**:
1. Review weekend job queue activity
2. Check currency rate updates after weekend
3. Verify all services are operational

**Monthly Tasks**:
1. Review feature usage patterns
2. Analyze system performance trends
3. Plan feature rollouts or changes

## Emergency Procedures

### Critical System Issues

**When Background Monitoring Fails**:
1. Check Job Queue Entry for monitor job
2. Restart monitoring if needed
3. Escalate to technical support

**When Currency Rates Stop Updating**:
1. Check external service connectivity
2. Manual update of critical rates
3. Business impact assessment and communication

**When Price Calculations Fail**:
1. Manual price review and updates
2. Hold pricing-dependent transactions
3. Expedite resolution with technical team

## Best Practices for Daily Operations

### Routine Excellence
- Establish consistent daily check procedures
- Document unusual events and resolutions
- Maintain awareness of system performance trends

### Communication
- Keep stakeholders informed of system status
- Escalate issues promptly when needed
- Share knowledge with team members

### Continuous Improvement
- Suggest process improvements based on daily experience
- Provide feedback on feature usability
- Participate in training on new features

Regular attention to these daily operations ensures BRC Core continues to enhance your Business Central environment reliably and efficiently.