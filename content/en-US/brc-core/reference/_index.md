---
title: "Reference"
linkTitle: "Reference"
weight: 60
description: >
  Technical reference documentation for BRC Core including permissions, APIs, and release information.
---

## Reference Documentation

This section provides comprehensive technical reference information for BRC Core, including permissions, object references, API documentation, and release notes.

## Reference Sections

{{< cardpane >}}
{{< card header="Permissions" >}}
Complete list of required permissions and permission sets for BRC Core functionality and security configuration.
{{< /card >}}

{{< card header="API Reference" >}}
Technical documentation for BRC Core integration points, events, and extension capabilities.
{{< /card >}}

{{< card header="Release Notes" >}}
Version history, new features, bug fixes, and upgrade information for all BRC Core releases.
{{< /card >}}
{{< /cardpane >}}

## Quick Reference

### Current Version Information

- **Version**: 25.0.26689.1
- **Publisher**: BrightCom Solutions AB  
- **Platform**: Business Central 25.0 Cloud
- **Runtime**: 13.0
- **Dependencies**: Microsoft Intrastat Core (25.0.0.0)

### Key Object Ranges

**Object ID Ranges**:
- **From**: 12078468
- **To**: 12079467

**Table Range**: 12078XXX series  
**Page Range**: 12078XXX series  
**Codeunit Range**: 12078XXX series  
**Permission Set ID**: 12078468

### Application Insights Configuration

**Telemetry Configuration**:
```
Instrumentation Key: bd3990ea-869d-43c4-aa17-34ec88949e0c
Endpoint: swedencentral-0.in.applicationinsights.azure.com
Connection Type: HTTPS
Data Classification: System telemetry and performance metrics
```

## Core Objects Overview

### Primary Permission Set

**BRC Core All** (12078468):
- **Access**: Internal
- **Assignable**: True
- **Scope**: Complete access to all BRC Core functionality
- **Usage**: Assign to users requiring full BRC Core access

### Key Table Objects

**Feature Management Tables**:
- `BRC Core Feature` - Feature definitions and metadata
- `BRC Core Feature Condition` - Conditional access rules  
- `BRC Core Feature Cond. Setup` - Feature condition configuration
- `BRC Core Feature Filter` - Filter functions for conditions

**Background Monitor Tables**:
- `BRC Core BM Setup` - Background monitoring configuration
- `BRC Core BM Action Entry` - Monitoring activity log
- `BRC Core BM Category Receiver` - Error notification configuration

**Currency Rate Tables**:
- `BRC Curr Exch Rate Service` - External service configuration
- `BRC Curr Exch Rate Buffer` - Rate processing buffer
- `BRC Curr Exch Rate Setup` - Currency rate management setup

### Key Codeunit Objects

**Core Management**:
- `BRC Core Feature Mgmt.` (12078468) - Feature management engine
- `BRC Core Install` (12078475) - Installation and migration logic
- `BRC Core Upgrade` - Upgrade handling and data migration

**Background Monitoring**:
- `BRC Core BM Job Queue Monitor` - Job queue monitoring engine
- `BRC Core BM Perform Action` - Monitor action execution
- `BRC Core JobQueue Mgmt.` - Job queue management utilities

**Currency Management**:
- `BRC Curr Exch Rate Service` (12079119) - Currency service coordinator
- `BRC Curr Exch Rate Helper` - Rate processing utilities
- Various provider-specific codeunits (ECB, Riksbank, etc.)

### Primary Pages

**Administrative Pages**:
- `BRC Core Feature Management` - Feature control interface
- `BRC Core BM Setup` - Monitor configuration
- `BRC Admin Toolbox` - Administrative utilities

**Configuration Pages**:
- `BRC Core Feature Conditions` - Condition management
- `BRC Curr Exch Rate Services` - Service configuration
- `BRC Core GDPR Setup` - Data privacy configuration

## Extension Points and Events

### Integration Events

BRC Core provides several integration events for customization:

**Feature Management Events**:
```al
[BusinessEvent(false)]
local procedure OnAddFunctionsToLibraryEvent()

[BusinessEvent(false)] 
local procedure OnAddConditionsToLibraryEvent()
```

**Background Monitor Events**:
```al
[IntegrationEvent(false, false)]
local procedure OnBeforeProcessJobQueueEntry(var JobQueueEntry: Record "Job Queue Entry")

[IntegrationEvent(false, false)]
local procedure OnAfterProcessJobQueueError(var JobQueueEntry: Record "Job Queue Entry")
```

**Currency Rate Events**:
```al
[IntegrationEvent(false, false)]
local procedure OnBeforeExecuteService(var ServiceURL: Text; var Handled: Boolean)

[IntegrationEvent(false, false)]
local procedure OnAfterGetExchangeRates(var ExchangeRate: Record "Currency Exchange Rate")
```

### Extensibility Guidelines

**Best Practices for Extensions**:

1. **Use Integration Events**: Subscribe to provided events rather than modifying objects
2. **Follow Naming Conventions**: Use consistent prefixes for custom objects
3. **Respect Object Ranges**: Use appropriate object ID ranges for extensions
4. **Maintain Compatibility**: Design for upgrade compatibility

**Event Subscription Pattern**:
```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Core Feature Mgmt.", 'OnAddConditionsToLibraryEvent', '', false, false)]
local procedure AddCustomConditions()
begin
    // Custom condition logic here
end;
```

## Technical Specifications

### System Requirements

**Minimum Requirements**:
- Business Central 25.0 or later
- AL Runtime 13.0
- Cloud deployment environment
- Internet connectivity for external services

**Performance Specifications**:
- **Memory Impact**: Minimal additional memory usage
- **Database Impact**: Lightweight table structure
- **Processing Overhead**: Optimized background processing
- **Network Usage**: Efficient external service calls

### Data Classification

**Personal Data Handling**:
- Customer information in GDPR tables: `CustomerContent`
- User information in feature management: `EndUserIdentifiableInformation`
- System configuration data: `SystemMetadata`
- Audit and monitoring data: `SystemMetadata`

### Security Considerations

**Authentication and Authorization**:
- Uses Business Central's standard security model
- Role-based access through permission sets
- Feature-level access control through condition system
- Secure external service communications (HTTPS only)

**Data Protection**:
- GDPR-compliant data handling
- Audit trails for sensitive operations
- Secure credential management for external services
- Encryption for data in transit

## Compliance and Standards

### Regulatory Compliance

**GDPR Compliance**:
- Right to erasure (customer anonymization)
- Data portability (data export capabilities)
- Data minimization (collect only necessary data)
- Audit trails (complete activity logging)

**Industry Standards**:
- ISO 27001 alignment for security practices
- SOC 2 Type 2 compliance through Business Central platform
- EU data protection regulations

### Quality Standards

**Development Standards**:
- Microsoft AL coding standards
- Business Central development best practices
- Comprehensive testing including unit and integration tests
- Performance optimization guidelines

**Support Standards**:
- Comprehensive documentation
- Multi-tier support structure
- Regular updates and maintenance
- Community support resources

## Licensing Information

### License Terms

**End User License Agreement**:
- Available at: [https://brightcom.se/EULA/](https://brightcom.se/EULA/)
- Terms apply to all BRC Core usage
- Commercial use permitted under license

**Privacy Policy**:
- Available at: [https://docs.brightcom.se/sv/PrivacyPolicy/BRCCore](https://docs.brightcom.se/sv/PrivacyPolicy/BRCCore)
- Covers telemetry data collection and usage
- Describes data protection measures

### Third-Party Components

**External Service Dependencies**:
- Currency rate providers (various, see integrations documentation)
- Microsoft Application Insights (telemetry)
- Microsoft Intrastat Core (functionality dependency)

## Support Information

### Official Support Channels

**Documentation**:
- Primary: [https://docs.brightcom.se/sv/Products/BRCCore](https://docs.brightcom.se/sv/Products/BRCCore)
- Technical Reference: This documentation

**Technical Support**:
- Provider: BrightCom Solutions AB
- Availability: Business hours (CET timezone)
- Languages: Swedish, English

**Community Resources**:
- Business Central community forums
- Microsoft Dynamics 365 Business Central documentation
- Partner network support resources

### Update and Maintenance

**Update Delivery**:
- Updates delivered through Microsoft AppSource
- Automatic notification of available updates
- Staged rollout for major version updates

**Maintenance Windows**:
- Scheduled maintenance communicated in advance
- Critical updates may be deployed outside normal windows
- Rollback procedures available for emergency situations

This reference documentation provides the technical foundation for implementing, integrating, and maintaining BRC Core within your Business Central environment.