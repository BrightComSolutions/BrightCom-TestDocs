---
title: "Business Central"
linkTitle: "Business Central"
weight: 41
description: >
  Deep integrations with core Business Central functionality.
---

## Business Central Platform Integration

BRC Core integrates seamlessly with Microsoft Dynamics 365 Business Central's core platform, enhancing existing functionality without disrupting standard operations.

## Core Platform Integration Points

### Job Queue Framework Integration

**Enhanced Job Queue Management**:

BRC Core extends Business Central's job queue system with advanced monitoring and management capabilities:

**Table Extensions**:
- **Job Queue Entry**: Added `BRC Core User ID` field for user context control
- **Enhanced Fields**: Additional metadata for monitoring and control

**Functional Enhancements**:
- **Background Monitoring**: Continuous monitoring of job queue status
- **Error Detection**: Automated detection of failed or long-running jobs
- **User Context**: Jobs can run under specific user contexts for permissions
- **Retry Logic**: Configurable retry mechanisms for failed jobs
- **Notification System**: Email alerts for job failures and issues

**Integration Benefits**:
- Maintains standard BC job queue functionality
- Adds enterprise-grade monitoring capabilities
- Provides better control over background processing
- Enables proactive issue resolution

### Currency and Exchange Rate Integration

**Standard BC Currency Management Enhancement**:

BRC Core integrates with Business Central's standard currency and exchange rate functionality:

**Table Integration**:
- **Currency Exchange Rate**: Enhanced with automated update capabilities
- **Currency Exchange Rate Update Setup**: Extended with BRC service integration
- **Currency**: Maintained compatibility with standard BC currency management

**Service Integration Architecture**:
```al
// Event subscriber pattern for non-intrusive integration
[EventSubscriber(ObjectType::Table, Database::"Curr. Exch. Rate Update Setup", 'OnAfterGetWebServiceURL', '', false, false)]
local procedure OnAfterGetWebServiceURL(var sender: Record "Curr. Exch. Rate Update Setup"; var ServiceURL: Text)
```

**Integration Features**:
- **Multiple Rate Providers**: Connect to various external currency services
- **Automated Scheduling**: Use BC's job queue for regular rate updates  
- **Rate Validation**: Built-in validation and variance checking
- **Cache Management**: Efficient caching for improved performance
- **Service Failover**: Automatic switching between rate providers

### User and Security Integration

**Business Central User Management Enhancement**:

BRC Core integrates with BC's user and permission system for advanced access control:

**User Management Integration**:
- **User Table**: Enhanced queries for feature management
- **User Groups**: Integration for group-based feature control
- **Permission Sets**: Works with existing BC permission framework

**Feature Management Architecture**:
- **Condition-Based Access**: Features available based on user, group, or custom criteria
- **Dynamic Evaluation**: Real-time evaluation of feature availability
- **Audit Integration**: Tracks feature access and usage patterns

**Security Benefits**:
- Maintains BC security model integrity
- Provides granular feature control
- Enables compliance and audit capabilities
- Supports complex organizational structures

## Page and UI Integration

### Role Center Integration

**Seamless User Experience**:

BRC Core features integrate naturally into Business Central Role Centers:

**Navigation Integration**:
- BRC Core pages appear in standard BC navigation
- Search functionality includes BRC features
- Role-based visibility controls

**Activity Integration**:
- Background monitor status in activity tiles
- Currency rate update notifications
- Feature availability indicators

### Page Extension Pattern

**Non-Intrusive UI Enhancement**:

BRC Core uses page extensions to add functionality without modifying core BC objects:

**Extension Examples**:
- Job Queue Entry pages with BRC monitoring information
- Currency setup pages with rate service configuration
- User setup pages with feature management options

**Benefits**:
- Maintains upgrade compatibility
- Preserves standard BC functionality
- Provides seamless user experience
- Enables modular feature deployment

## Data Integration Patterns

### Table Extension Architecture

**Extending Standard BC Tables**:

BRC Core uses table extensions to add functionality without disrupting core data structures:

**Extension Strategy**:
```al
tableextension 12078XXX "BRC Job Queue Entry Ext" extends "Job Queue Entry"
{
    fields
    {
        field(12078000; "BRC Core User ID"; Code[50])
        {
            Caption = 'BRC Core User ID';
            DataClassification = EndUserIdentifiableInformation;
        }
    }
}
```

**Data Integrity**:
- Maintains referential integrity with standard BC tables
- Follows BC data classification guidelines
- Preserves existing business logic and validation

### Event-Driven Integration

**Responsive Integration Architecture**:

BRC Core uses Business Central's event framework for responsive integrations:

**Event Types Used**:
- **Table Events**: OnAfterInsert, OnAfterModify for data synchronization
- **Page Events**: OnAfterAction for UI interactions  
- **Codeunit Events**: OnAfterExecute for process integration
- **Custom Events**: BRC-specific integration points

**Integration Benefits**:
- Low-coupling design for maintainability
- Responsive to BC platform changes
- Extensible for custom development
- High performance through selective processing

## Application Integration

### Intrastat Integration

**Required Dependency Integration**:

BRC Core integrates with Microsoft's Intrastat Core app:

**Integration Purpose**:
- Intrastat weight rounding functionality
- Compliance with EU trade reporting requirements
- Enhanced intrastat data processing

**Technical Integration**:
- Uses Intrastat Core app as dependency
- Extends intrastat functionality with BRC enhancements
- Maintains compatibility with standard intrastat processes

### Financial Management Integration

**Core Financial Process Enhancement**:

BRC Core integrates with Business Central financial management:

**Integration Areas**:
- **VAT Posting**: Enhanced VAT posting date management
- **Posting Date Control**: Copy document posting date functionality
- **Price Management**: Integration with BC pricing framework
- **Dimension Management**: Enhanced dimension handling for items and locations

## Advanced Integration Features

### Feature Flag Integration

**Application Area Integration**:

BRC Core extends Business Central's application area framework:

**Application Area Extension**:
```al
tableextension 12078XXX "BRC App Area Setup Ext" extends "Application Area Setup"
{
    fields
    {
        field(12078000; BRCCurrExchRate; Boolean)
        {
            Caption = 'BRC Currency Exchange Rate';
        }
        // Additional application area fields
    }
}
```

**Benefits**:
- Consistent with BC application area model
- Enables granular feature control
- Supports licensing and edition management
- Provides upgrade path compatibility

### Telemetry Integration

**Application Insights Integration**:

BRC Core integrates with Business Central's telemetry framework:

**Telemetry Configuration**:
- **Connection String**: Pre-configured Application Insights endpoint
- **Custom Events**: BRC-specific telemetry events
- **Performance Tracking**: Job queue and service performance metrics
- **Error Reporting**: Detailed error information for troubleshooting

## Integration Testing and Validation

### Compatibility Testing

**Business Central Version Compatibility**:

BRC Core maintains compatibility across Business Central versions:

**Testing Matrix**:
- **Platform Compatibility**: Tests across BC 25.0+ versions
- **Feature Compatibility**: Validates feature functionality  
- **Upgrade Compatibility**: Tests upgrade scenarios
- **Integration Testing**: Validates all integration points

### Performance Integration Testing

**Performance Under Integration Load**:

BRC Core testing includes performance validation:

**Test Scenarios**:
- High-volume job queue processing
- Multiple concurrent currency rate updates
- Large-scale feature condition evaluation
- Integration stress testing with external services

## Best Practices for BC Integration

### Development Guidelines

**Following BC Development Standards**:

- **Event-Driven**: Use events rather than direct object modifications
- **Extension Pattern**: Use table and page extensions appropriately
- **Naming Conventions**: Follow BC naming standards for consistency
- **Data Classification**: Proper classification of all data fields
- **Performance**: Optimize for BC platform performance characteristics

### Upgrade and Maintenance

**Maintaining Integration Integrity**:

- **Version Control**: Track integration changes across BC versions
- **Testing Procedures**: Comprehensive testing for each BC update
- **Rollback Procedures**: Safe rollback if integration issues occur
- **Documentation**: Keep integration documentation current

The deep integration with Business Central ensures that BRC Core functionality feels native to the platform while providing significant enhancements to core business processes.