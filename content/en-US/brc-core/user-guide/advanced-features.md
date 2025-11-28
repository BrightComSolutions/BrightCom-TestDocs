---
title: "Advanced Features"
linkTitle: "Advanced Features"
weight: 33
description: >
  Advanced configuration and power user features for experienced BRC Core users.
---

## Advanced Features Overview

This section covers advanced BRC Core features designed for power users, administrators, and those who need to customize or extend BRC Core functionality beyond basic operations.

## Advanced Feature Management

### Custom Feature Conditions

**Creating Complex Conditions**:

Beyond basic user and group filters, you can create sophisticated feature conditions:

**Multi-Criteria Conditions**:
```
Filter Example: 'ADMIN|MANAGER' (User groups)
Logic: Users in either ADMIN or MANAGER groups get access
```

**Company-Specific Features**:
```
Condition Code: COMPANY_SPECIFIC
Function Code: COMPANY  
Filter: 'COMPANY1|COMPANY2' (Enable for specific companies)
```

**Date-Based Conditions**:
```
Condition Code: PILOT_PERIOD
Function Code: USER (with custom logic)
Filter: Users during specific date ranges
```

### Feature Condition Programming

**Integration Events for Custom Logic**:

Use the `OnAddConditionsToLibraryEvent` to add custom feature conditions:

```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Core Feature Mgmt.", 'OnAddConditionsToLibraryEvent', '', false, false)]
local procedure OnAddCustomConditions()
begin
    // Add your custom condition logic here
end;
```

**Custom Function Development**:

Extend the feature management system with custom filtering functions by subscribing to `OnAddFunctionsToLibraryEvent`.

### Feature Usage Analytics

**Monitoring Feature Adoption**:

1. Use **BRC Core Feature Usage Queries** to analyze:
   - Which features are most/least used
   - User adoption patterns
   - Condition effectiveness

2. **Query Tables**:
   - `BRCCoreFeatureUsrMemWithGrp` - User membership with groups
   - `BRCCoreFeatureValidFeatures` - Valid features per user
   - `BRCCoreFeatureCondsInUse` - Active conditions

## Advanced Background Monitoring

### Custom Monitor Actions

**Extending Monitor Response Actions**:

Create custom response actions for specific error scenarios:

1. **Define Custom Action Categories**:
   - Open **BRC Core BM Category Receiver**
   - Create categories for different error types
   - Assign specific receivers and response procedures

2. **Configure Automated Responses**:
   - Set up automated email notifications
   - Define escalation procedures
   - Configure retry logic for specific job types

### Advanced Error Handling

**Custom Error Processing**:

Subscribe to monitor events to implement custom error handling:

```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Core BM Job Queue Monitor", 'OnAfterProcessError', '', false, false)]
local procedure OnAfterProcessJobQueueError(var JobQueueEntry: Record "Job Queue Entry")
begin
    // Custom error handling logic
end;
```

**Integration with External Monitoring Systems**:

- Configure webhook notifications to external systems
- Send telemetry data to centralized monitoring platforms
- Integrate with ITSM systems for automated ticket creation

### Performance Optimization

**Monitor Performance Tuning**:

1. **Optimize Monitor Frequency**:
   - Adjust **Standard Monitor Time** based on job queue load
   - Use different frequencies for critical vs. non-critical jobs
   - Monitor system performance impact

2. **Selective Monitoring**:
   - Configure monitoring to focus on specific job queue categories
   - Exclude low-priority jobs from frequent monitoring
   - Implement tiered monitoring strategies

## Advanced Currency Rate Management

### Custom Currency Rate Providers

**Adding New Rate Providers**:

Extend the currency rate service system to support additional providers:

1. **Service Registration**:
   - Create new entries in **BRC Curr Exch Rate Service** table
   - Define service-specific parameters and endpoints

2. **Custom Service Implementation**:
   Subscribe to currency rate events to add custom providers:

```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Curr Exch Rate Service", 'OnBeforeExecuteService', '', false, false)]
local procedure OnBeforeExecuteCustomService(var Handled: Boolean)
begin
    // Custom currency rate retrieval logic
end;
```

### Rate Override and Validation

**Implementing Rate Validation Rules**:

1. **Rate Variance Checking**:
   - Set up automatic validation for unusual rate changes
   - Configure tolerance limits for rate fluctuations
   - Implement approval workflows for significant changes

2. **Manual Override Procedures**:
   - Define authorization levels for rate overrides
   - Implement audit trails for manual rate changes
   - Set up notification systems for override activities

### Advanced Rate Caching

**Optimizing Rate Updates**:

1. **Cache Management**:
   - Configure **BRC Curr Exch. Rate Cache** for performance
   - Implement cache invalidation strategies
   - Monitor cache hit rates and effectiveness

2. **Bulk Rate Processing**:
   - Schedule bulk updates during off-hours
   - Implement parallel processing for multiple currencies
   - Configure error recovery for partial update failures

## Advanced Price Book Management

### Custom Price Calculation Engines

**Extending Price Book Functionality**:

1. **Custom Calculation Logic**:
   Subscribe to price book events to implement custom pricing:

```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::BRCCorePBEngine, 'OnBeforeCalculatePriceBook', '', false, false)]
local procedure OnBeforeCustomPriceCalculation(var PriceBook: Record BRCCorePriceBook)
begin
    // Custom price calculation logic
end;
```

2. **Advanced Scheduling**:
   - Implement complex update schedules using **BRCCorePBFreqRunCheck** interface
   - Create conditional update logic based on market conditions
   - Set up event-driven price updates

### Price Book Performance Optimization

**Large Dataset Management**:

1. **Incremental Updates**:
   - Configure price books to update only changed items
   - Implement delta processing for large catalogs
   - Use filtering to optimize calculation scope

2. **Parallel Processing**:
   - Split large price books into smaller segments
   - Run multiple calculation jobs simultaneously
   - Monitor resource usage during bulk operations

## Advanced GDPR Management

### Custom Anonymization Rules

**Extending Data Anonymization**:

1. **Custom Field Anonymization**:
   - Configure **BRC Core GDPR Related Fields** for custom tables
   - Define anonymization patterns for specific data types
   - Implement reversible vs. irreversible anonymization

2. **Conditional Anonymization**:
   - Set up rules based on customer attributes
   - Implement geographic-specific anonymization rules
   - Configure time-based anonymization policies

### Advanced Data Deletion

**Comprehensive Data Management**:

1. **Related Record Processing**:
   - Configure **BRC Core GDPR Related Tables** for complete data removal
   - Implement cascade deletion rules
   - Set up orphan record cleanup procedures

2. **Audit and Compliance**:
   - Maintain deletion audit trails
   - Generate compliance reports
   - Implement legal hold procedures

## Advanced Administration Tools

### System Diagnostics and Optimization

**Advanced Diagnostic Procedures**:

1. **Performance Analysis**:
   - Use **BRC Admin Tool Mgt.** for deep system analysis
   - Monitor table growth and performance impacts
   - Identify optimization opportunities

2. **Custom Diagnostic Tools**:
   - Extend the admin toolbox with custom utilities
   - Create specialized diagnostic procedures
   - Implement automated health checks

### Advanced User Management

**Sophisticated Access Control**:

1. **Dynamic Permission Assignment**:
   - Implement context-aware permission systems
   - Create time-based access controls
   - Set up location or department-based restrictions

2. **Usage Analytics**:
   - Track feature usage patterns
   - Monitor user behavior and adoption
   - Generate usage reports for compliance

## Integration and Extension Development

### API Integration

**Extending BRC Core with External Systems**:

1. **Webhook Integration**:
   - Set up outbound webhooks for key events
   - Configure inbound API endpoints for external triggers
   - Implement secure API authentication

2. **Data Synchronization**:
   - Create bidirectional sync with external systems
   - Implement conflict resolution strategies
   - Set up real-time vs. batch sync options

### Custom Development Guidelines

**Best Practices for Extensions**:

1. **Event-Driven Architecture**:
   - Use integration events rather than direct modifications
   - Maintain upgrade compatibility
   - Document custom extensions thoroughly

2. **Performance Considerations**:
   - Minimize database impact of customizations
   - Use appropriate data structures and indexing
   - Implement proper error handling and logging

## Advanced Configuration Patterns

### Multi-Company Scenarios

**Enterprise Deployment Strategies**:

1. **Centralized vs. Distributed Configuration**:
   - Design configuration inheritance patterns
   - Implement company-specific overrides
   - Manage shared vs. isolated features

2. **Data Synchronization Across Companies**:
   - Configure cross-company currency rate sharing
   - Implement centralized feature management
   - Set up consolidated monitoring

### High Availability and Disaster Recovery

**Enterprise Resilience**:

1. **Redundancy Configuration**:
   - Set up failover procedures for external services
   - Configure backup monitoring systems
   - Implement service health checks

2. **Data Backup and Recovery**:
   - Design backup strategies for BRC Core configuration
   - Test recovery procedures regularly
   - Document disaster recovery processes

## Troubleshooting Advanced Scenarios

### Complex Performance Issues

**Advanced Debugging Techniques**:

1. **Performance Profiling**:
   - Use Application Insights for detailed performance analysis
   - Identify bottlenecks in custom implementations
   - Optimize database queries and operations

2. **Scaling Challenges**:
   - Address high-volume processing issues
   - Optimize for large user bases
   - Implement efficient caching strategies

### Integration Debugging

**Multi-System Problem Resolution**:

1. **Cross-System Tracing**:
   - Implement correlation IDs across systems
   - Set up distributed logging and monitoring
   - Create debugging procedures for integration points

2. **Service Dependency Management**:
   - Monitor external service availability
   - Implement circuit breaker patterns
   - Set up graceful degradation procedures

## Advanced Security Considerations

### Security Hardening

**Enhanced Security Measures**:

1. **Access Monitoring**:
   - Implement detailed audit logging
   - Monitor privileged access patterns
   - Set up anomaly detection for unusual access

2. **Data Protection**:
   - Implement field-level security where needed
   - Configure data encryption for sensitive fields
   - Set up compliance monitoring

These advanced features allow you to fully leverage BRC Core's extensibility and power, enabling sophisticated business scenarios and enterprise-grade implementations.