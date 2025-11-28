---
title: "Release Notes"
linkTitle: "Release Notes"
weight: 63
description: >
  Version history, new features, bug fixes, and upgrade information for BRC Core.
---

## Release Notes

This section provides comprehensive release information for all versions of BRC Core, including new features, improvements, bug fixes, and upgrade guidance.

## Current Version: 25.0.26689.1

**Release Date**: Latest release  
**Platform**: Business Central 25.0 Cloud  
**Runtime**: AL Runtime 13.0

### Version Highlights

This is the current production version of BRC Core, providing comprehensive background management and core functionality enhancements for Business Central 25.0.

**Key Features in Current Version**:
- **Background Monitor**: Complete job queue monitoring with error handling and notifications
- **Currency Exchange Rates**: Multi-provider automated currency rate updates
- **Feature Management**: Conditional feature availability based on user, group, or custom criteria
- **Price Book Management**: Automated price calculation and update system
- **GDPR Management**: Customer data anonymization and compliance tools
- **Admin Toolbox**: Comprehensive system diagnostics and administrative utilities

**Platform Requirements**:
- Microsoft Dynamics 365 Business Central 25.0 or later
- Cloud deployment environment
- Microsoft Intrastat Core app dependency
- Internet connectivity for external services

### New Features and Enhancements

#### Background Monitoring System
- **Enhanced Job Queue Monitoring**: Real-time monitoring of all job queue entries
- **Automated Error Detection**: Intelligent detection of failed or long-running jobs
- **Email Notification System**: Configurable email alerts for job failures
- **User Context Control**: Job execution with specific user permissions via "BRC Core User ID"
- **Retry Logic**: Configurable automatic retry mechanisms for failed jobs
- **Performance Monitoring**: Tracking of job execution times and resource usage

#### Currency Rate Management
- **Multiple Service Providers**: Support for 8+ external currency rate services
  - European Central Bank (ECB)
  - Sveriges Riksbank (Sweden)
  - Danmarks Nationalbank (Denmark)  
  - Norges Bank (Norway)
  - Central Bank of Turkey
  - XE.com
  - Fixer.io
  - Sedlabanki (Iceland)
- **Automated Scheduling**: Integration with BC job queue for regular updates
- **Rate Validation**: Built-in validation and variance checking
- **Service Failover**: Automatic switching between providers on failure
- **Caching System**: Efficient rate caching for improved performance

#### Feature Management Framework
- **Conditional Access Control**: Features available based on configurable conditions
- **User-Based Conditions**: Control access by individual users
- **Group-Based Conditions**: Control access by user groups
- **Company-Based Conditions**: Control access by company
- **Custom Conditions**: Extensible condition system for custom business rules
- **Dynamic Evaluation**: Real-time condition evaluation
- **Audit Capabilities**: Complete tracking of feature access and usage

#### GDPR Compliance Tools
- **Customer Data Anonymization**: Comprehensive anonymization capabilities
- **Related Record Management**: Automatic handling of related customer data
- **Eligibility Checking**: Verification that customers can be safely anonymized
- **Audit Trails**: Complete logging of GDPR operations
- **Data Export Tools**: Support for data portability requirements
- **Retention Management**: Configurable data retention policies

### Technical Improvements

#### Performance Optimizations
- **Efficient Background Processing**: Optimized job queue monitoring with minimal system impact
- **Smart Caching**: Intelligent caching strategies for currency rates and feature conditions
- **Batch Processing**: Efficient batch operations for bulk updates
- **Resource Management**: Optimized memory and CPU usage patterns

#### Security Enhancements
- **Comprehensive Permission System**: Complete permission set covering all functionality
- **Data Classification**: Proper data classification for all fields and tables
- **Secure External Communications**: HTTPS-only connections to external services
- **Audit Logging**: Complete audit trails for administrative and sensitive operations

#### Integration Capabilities
- **Event-Driven Architecture**: Comprehensive integration events for extensibility
- **Application Insights**: Built-in telemetry and monitoring integration
- **Standard BC Integration**: Deep integration with Business Central's core features
- **Extension Points**: Multiple extension points for custom development

### Migration and Upgrade Information

#### Migration from BCS Base
BRC Core includes automatic migration capabilities for organizations upgrading from the previous BCS Base solution:

**Automatic Migration Features**:
- **Configuration Migration**: Automatic detection and migration of BCS Base configuration
- **Data Transformation**: Feature conditions migrated with prefix updates ("BCS" to "BRC")
- **Job Queue Settings**: Preservation of job queue user ID assignments
- **Validation Tools**: Post-migration validation of migrated settings

**Migration Process**:
1. **Detection**: Installation automatically detects existing BCS Base configuration (Table ID 90190)
2. **Data Migration**: Feature conditions and job queue settings are migrated automatically
3. **Validation**: Post-migration verification ensures data integrity
4. **Documentation**: Migration activity is logged for audit purposes

#### Upgrade Procedures
For installations upgrading BRC Core:

**Pre-Upgrade Preparation**:
- Back up current configuration and data
- Document custom configurations and conditions
- Review release notes for breaking changes
- Plan upgrade timing for minimal business impact

**Post-Upgrade Verification**:
- Verify all features are functioning correctly
- Test external service connections
- Validate feature management conditions
- Confirm background monitoring is operational

### Known Issues and Limitations

#### Current Limitations
- **Platform Support**: Cloud deployment only (on-premises not supported in current version)
- **Currency Services**: Some external services may have usage limitations or costs
- **Batch Processing**: Large-scale operations may require scheduling during off-peak hours

#### Compatibility Notes
- **Business Central Version**: Requires BC 25.0 or later
- **Dependencies**: Microsoft Intrastat Core app must be installed first
- **Browser Support**: Follows standard Business Central browser support guidelines
- **Mobile Support**: Limited mobile functionality in current version

### Bug Fixes and Resolved Issues

#### Resolved in Current Version
- **Background Monitor**: Fixed rare issue with monitoring job startup
- **Currency Rates**: Improved error handling for service timeouts
- **Feature Conditions**: Enhanced condition evaluation performance
- **GDPR Processing**: Improved handling of complex related record scenarios
- **Job Queue Management**: Better handling of concurrent job processing

#### Performance Improvements
- **Database Operations**: Optimized queries for large datasets
- **External Service Calls**: Improved connection management and retry logic
- **Memory Usage**: Reduced memory footprint for background processing
- **Response Times**: Faster feature condition evaluation

### Security Updates

#### Security Enhancements
- **Permission Validation**: Enhanced permission checking for all operations
- **Data Protection**: Improved data classification and protection measures
- **External Communications**: Enhanced security for external service connections
- **Audit Logging**: More comprehensive audit trail capabilities

#### Compliance Updates
- **GDPR Compliance**: Enhanced data protection and privacy features
- **Industry Standards**: Alignment with latest security and compliance standards
- **Data Classification**: Updated data classification for all fields and tables

## Future Release Planning

### Upcoming Features (Planned)
While specific dates are not confirmed, future releases may include:

**Enhanced Monitoring**:
- Additional monitoring capabilities and dashboards
- Integration with more external monitoring systems
- Enhanced performance analytics

**Extended Currency Support**:
- Additional currency rate providers
- Enhanced rate validation and prediction capabilities
- Improved handling of cryptocurrency rates

**Advanced Feature Management**:
- More sophisticated condition types
- Enhanced user interface for condition management
- Bulk feature management capabilities

**Integration Enhancements**:
- Enhanced API capabilities
- Additional integration points
- Improved extensibility framework

### Support and Maintenance

#### Long-Term Support
- **Update Frequency**: Regular updates aligned with Business Central release cycles
- **Security Updates**: Prompt security updates as needed
- **Bug Fixes**: Regular bug fix releases
- **Feature Updates**: New features added based on customer feedback and market needs

#### End-of-Life Policy
- **Support Period**: Minimum 2 years of support for major versions
- **Migration Assistance**: Migration tools and guidance for version transitions
- **Documentation**: Maintained documentation throughout support period

### Getting Updates

#### Update Delivery
- **Microsoft AppSource**: Updates delivered through standard AppSource mechanisms
- **Notification**: Automatic notification of available updates in Business Central
- **Release Notes**: Detailed release notes provided with each update

#### Update Process
1. **Notification**: Receive update notification in Business Central admin center
2. **Review**: Review release notes and change information
3. **Planning**: Plan update timing for minimal business disruption
4. **Testing**: Test updates in development environment if available
5. **Deployment**: Deploy update during planned maintenance window
6. **Validation**: Verify functionality after update deployment

For the most current release information and updates, refer to:
- **Official Documentation**: [https://docs.brightcom.se/sv/Products/BRCCore](https://docs.brightcom.se/sv/Products/BRCCore)
- **Support Channels**: BrightCom Solutions AB official support
- **Microsoft AppSource**: BRC Core app page for update notifications

This release information helps ensure successful deployment, maintenance, and upgrade of BRC Core in your Business Central environment.