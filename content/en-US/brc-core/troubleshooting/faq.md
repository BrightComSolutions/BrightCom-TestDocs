---
title: "FAQ"
linkTitle: "FAQ"
weight: 51
description: >
  Frequently asked questions about BRC Core functionality and usage.
---

## Frequently Asked Questions

This section addresses the most common questions about BRC Core functionality, configuration, and troubleshooting.

## General Questions

### What is BRC Core?

**Q**: What does BRC Core do for my Business Central environment?

**A**: BRC Core is a foundational app that enhances Business Central with automated background management, currency rate updates, feature management, and administrative tools. It provides:
- Background job monitoring with automated error handling
- Multi-source currency exchange rate updates
- Conditional feature management for controlled rollouts
- GDPR compliance tools for customer data management
- Administrative utilities for system diagnostics

### Who should use BRC Core?

**Q**: Is BRC Core suitable for my organization?

**A**: BRC Core benefits organizations that:
- Need reliable background job monitoring
- Handle multiple currencies requiring frequent rate updates
- Want granular control over feature availability
- Require GDPR compliance tools
- Need enhanced administrative capabilities for Business Central

It's particularly valuable for mid-to-large organizations with complex Business Central implementations.

### What Business Central versions are supported?

**Q**: Can I install BRC Core on my current Business Central version?

**A**: BRC Core requires:
- Business Central 25.0 or later
- Cloud deployment (not supported on-premises)
- AL Runtime 13.0 or later
- Microsoft Intrastat Core app dependency

Check your system version in Business Central's Help & Support section.

## Installation and Setup

### Why can't I install BRC Core?

**Q**: The installation fails with dependency errors.

**A**: The most common installation issue is missing dependencies:

1. **Install Microsoft Intrastat Core first**:
   - Go to Extension Management
   - Search for "Intrastat Core" by Microsoft
   - Install version 25.0.0.0 or later

2. **Check Business Central version**:
   - Ensure you're running BC 25.0 or later
   - Verify cloud deployment (on-premises not supported)

3. **Verify permissions**:
   - Ensure you have Extension Management permissions
   - Use an administrator account for installation

### How do I access BRC Core features after installation?

**Q**: I installed BRC Core but can't find the features.

**A**: Follow these steps:

1. **Check permission assignment**:
   - Navigate to Users page
   - Select your user and choose "User Permission Sets"
   - Add the `BRC Core All` permission set

2. **Search for BRC features**:
   - Press Alt+Q to open search
   - Type "BRC" to see all available features
   - If no results appear, check permission assignment

3. **Verify installation**:
   - Go to Extension Management
   - Confirm BRC Core shows as "Installed" and "Enabled"

## Feature Management

### How does Feature Management work?

**Q**: I don't understand how BRC Core controls feature availability.

**A**: BRC Core uses conditional feature management:

1. **Features** are individual BRC Core capabilities
2. **Conditions** define when features are available (based on user, group, company)
3. **Functions** determine how conditions are evaluated (USER, USERGROUP, COMPANY)

Example: A feature might only be available to users in the "ADMIN" group.

### Why are some features restricted for me?

**Q**: Features appear in Feature Management but show as restricted.

**A**: Check these common causes:

1. **User Group Membership**:
   - Verify you're in the required user group
   - Check User Groups page for your memberships

2. **Condition Configuration**:
   - Review the feature conditions in Feature Management
   - Conditions might require specific user attributes

3. **Company-Specific Rules**:
   - Some features might be enabled only for certain companies
   - Check if you're in the correct company context

### Can I create custom feature conditions?

**Q**: I want to control feature access based on custom criteria.

**A**: Yes, you can create custom feature conditions:

1. **Navigate to BRC Core Feature Conditions**
2. **Create new condition** with:
   - Unique Condition Code
   - Function Code (USER, USERGROUP, COMPANY)
   - Filter criteria defining the condition

3. **Assign conditions** to features in Feature Management

Advanced users can also extend the system with custom functions through development.

## Background Monitoring

### How often does Background Monitor check jobs?

**Q**: How frequently are job queue entries monitored?

**A**: The monitoring frequency is configurable:

- **Default**: Every 5 minutes
- **Configurable**: Set "Standard Monitor Time" in BRC Core BM Setup
- **Recommendation**: 5-15 minutes for most environments
- **Performance**: Lower frequency reduces system load

### Why am I not receiving error notifications?

**Q**: Jobs are failing but I'm not getting email alerts.

**A**: Check these settings:

1. **Email Configuration**:
   - Set "E-mail Error" in BRC Core BM Setup
   - Ensure "Disable mail in Monitor Job" = False

2. **SMTP Setup**:
   - Verify SMTP Mail Setup in Business Central
   - Test email functionality with a manual test

3. **Spam Filtering**:
   - Check if emails are being filtered as spam
   - Whitelist the sending address if necessary

### What's the difference between job queue runtime max and max tries?

**Q**: How should I configure these monitoring settings?

**A**: These settings control different aspects of monitoring:

- **Job Queue Runtime Max**: Maximum time before a job is considered "stuck" (recommend 30-60 minutes)
- **Job Queue Max Tries**: Maximum retry attempts for failed jobs (recommend 3)

Set runtime max based on your longest legitimate job duration. Set max tries based on how many retries you want before manual intervention.

## Currency Rate Management

### Which currency rate providers are most reliable?

**Q**: Which external services should I use for currency rates?

**A**: Provider reliability varies by region and currency:

**Most Reliable (Official Central Banks)**:
- European Central Bank (ECB) - for EUR rates
- Riksbank - for SEK rates  
- Nationalbanken - for DKK rates
- Norges Bank - for NOK rates

**Commercial Services (broader coverage)**:
- XE.com - extensive currency coverage
- Fixer.io - comprehensive global rates

**Recommendation**: Use official central bank sources for your base currencies, commercial services for broader coverage.

### How often should currency rates update?

**Q**: What's the optimal update frequency for exchange rates?

**A**: Update frequency depends on business needs:

- **Daily**: Sufficient for most businesses
- **Intraday**: For trading or forex-sensitive operations
- **Weekly**: For stable currencies or internal reporting

**Recommendation**: Daily updates after market close (around 16:00 CET for European rates).

### What happens if currency rate updates fail?

**Q**: How does the system handle rate service failures?

**A**: BRC Core implements several failure handling mechanisms:

1. **Automatic Retry**: Failed updates are retried automatically
2. **Service Failover**: Switch to backup providers if configured
3. **Error Notifications**: Administrators receive failure alerts
4. **Cached Rates**: System continues with last known rates
5. **Manual Override**: Administrators can manually update critical rates

## Performance and Troubleshooting

### Is BRC Core affecting my system performance?

**Q**: Business Central seems slower since installing BRC Core.

**A**: BRC Core is designed for minimal performance impact, but check:

1. **Background Monitor Frequency**: 
   - High frequency monitoring can impact performance
   - Adjust "Standard Monitor Time" to 10-15 minutes if needed

2. **Feature Condition Complexity**:
   - Complex conditions can slow page loading
   - Simplify conditions or reduce the number of active conditions

3. **Currency Update Frequency**:
   - Very frequent rate updates can impact performance
   - Schedule updates during off-peak hours

### How do I troubleshoot feature access issues?

**Q**: A user can't access features they should have access to.

**A**: Follow this diagnostic process:

1. **Permission Check**:
   - Verify user has `BRC Core All` permission set
   - Check permission set is active and not expired

2. **Feature Condition Review**:
   - Check Feature Management for the specific feature
   - Review conditions and verify user meets criteria

3. **User Group Verification**:
   - Confirm user is in expected groups
   - Check group names match exactly (case-sensitive)

4. **Test with Admin**:
   - Test feature access with administrator account
   - If admin can access, it's a permission/condition issue

## GDPR and Compliance

### How does GDPR data management work?

**Q**: What GDPR capabilities does BRC Core provide?

**A**: BRC Core offers comprehensive GDPR tools:

1. **Data Anonymization**: Remove personally identifiable information
2. **Related Record Management**: Handle connected customer data
3. **Eligibility Checking**: Verify customers can be safely anonymized
4. **Audit Trails**: Track data management activities

**Important**: Test GDPR functionality in a test environment before production use.

### Is customer data safe during anonymization?

**Q**: What safeguards exist for GDPR operations?

**A**: BRC Core includes several safeguards:

1. **Eligibility Checks**: Prevents anonymization of customers with active business
2. **Related Record Processing**: Ensures complete data handling
3. **Reversible vs. Irreversible**: Different anonymization levels available
4. **Audit Logging**: Complete record of anonymization activities

**Recommendation**: Always maintain backups and test procedures in development environments.

## Advanced Configuration

### Can I extend BRC Core functionality?

**Q**: Can I customize BRC Core for specific business needs?

**A**: Yes, BRC Core is designed for extensibility:

1. **Event Subscribers**: Subscribe to BRC Core events for custom logic
2. **Custom Conditions**: Create specialized feature conditions
3. **Service Extensions**: Add custom currency rate providers
4. **Integration Events**: Hook into BRC Core processing

**Note**: Extensions should be developed following Business Central best practices to maintain upgrade compatibility.

### How do I migrate from BCS Base?

**Q**: We're upgrading from BCS Base to BRC Core.

**A**: BRC Core handles migration automatically:

1. **Automatic Detection**: Installation detects existing BCS Base configuration
2. **Data Migration**: Feature conditions and settings are migrated
3. **Prefix Updates**: "BCS" prefixes are changed to "BRC"
4. **Job Queue Fields**: User ID assignments are preserved

**Post-Migration**: Review all migrated settings to ensure accuracy and completeness.

## Support and Resources

### Where can I get additional help?

**Q**: Where should I go for support beyond this documentation?

**A**: Several support resources are available:

1. **Official Documentation**: [https://docs.brightcom.se/sv/Products/BRCCore](https://docs.brightcom.se/sv/Products/BRCCore)
2. **Technical Support**: BrightCom Solutions AB support team
3. **Community Forums**: Business Central community for general platform questions
4. **Internal Support**: Your system administrator for configuration questions

### How do I report bugs or feature requests?

**Q**: I found a problem or want to suggest an improvement.

**A**: For issues or enhancement requests:

1. **Document the Issue**: Gather error messages, steps to reproduce, screenshots
2. **Contact Support**: Use BrightCom Solutions AB official support channels
3. **Provide Context**: Include BRC Core version, BC version, and configuration details

### Is training available for BRC Core?

**Q**: Does BrightCom Solutions offer training on BRC Core?

**A**: Contact BrightCom Solutions AB for training options:

- Product-specific training sessions
- Implementation guidance
- Best practices workshops
- Custom training for large deployments

Training recommendations can be customized based on your organization's needs and BRC Core usage patterns.