---
title: "Third Party"
linkTitle: "Third Party"
weight: 42
description: >
  External service integrations including currency providers and monitoring services.
---

## Third-Party Integration Overview

BRC Core integrates with multiple external services to provide automated currency rates, enhanced monitoring capabilities, and extended functionality beyond the core Business Central platform.

## Currency Rate Provider Integrations

BRC Core supports multiple external currency rate providers for comprehensive exchange rate management.

### European Central Bank (ECB)

**Service Provider**: European Central Bank  
**Endpoints**: ecb.europa.eu  
**Coverage**: EUR-based exchange rates for major global currencies

**Integration Details**:
- **Service Implementation**: `BRC ecb.europa.eu Latest`, `BRC ecb.europa.eu 90Days`
- **Update Frequency**: Daily rates (latest) and historical data (90-day period)
- **Supported Currencies**: All major currencies published by ECB
- **Data Format**: XML-based rate feeds
- **Reliability**: High (official central bank source)

**Configuration**:
```
Service URL Pattern: ecb.europa.eu/stats/eurofxref/...
Update Schedule: Daily after 16:00 CET
Backup Service: Available for redundancy
```

### Riksbank (Sweden)

**Service Provider**: Sveriges Riksbank (Swedish Central Bank)  
**Endpoints**: riksbank.se  
**Coverage**: SEK-based exchange rates and cross-currency rates

**Integration Details**:
- **Service Implementation**: `BRC Riksbank.se Latest`, `BRC Riksbank.se Period`, `BRC Riksbank.rest`, `BRC Riksbank.se Azure Function`
- **API Types**: REST API and Azure Function integration
- **Update Frequency**: Daily rates with historical period support
- **Supported Currencies**: SEK and major international currencies
- **Data Format**: JSON and XML formats supported
- **Special Features**: Azure Function integration for enhanced performance

**Configuration**:
```
API Endpoint: Various riksbank.se endpoints
Authentication: Public API (no key required)
Rate Limits: Standard rate limiting applies
Azure Function: Optional enhanced performance endpoint
```

### Nationalbanken (Denmark)

**Service Provider**: Danmarks Nationalbank  
**Endpoints**: nationalbanken.dk  
**Coverage**: DKK-based exchange rates

**Integration Details**:
- **Service Implementation**: `BRC Nationalbanken.dk Latest`, `BRC Nationalbanken.dk 5Days`
- **Update Frequency**: Daily rates with 5-day historical coverage
- **Supported Currencies**: DKK and major trading partner currencies
- **Data Format**: XML-based feeds
- **Coverage**: Comprehensive European currency coverage

**Configuration**:
```
Service URL: nationalbanken.dk currency feeds
Update Schedule: Daily updates
Historical Data: 5-day rolling historical rates
Backup Options: ECB fallback available
```

### Norges Bank (Norway)

**Service Provider**: Norges Bank (Central Bank of Norway)  
**Endpoints**: norges-bank.no  
**Coverage**: NOK-based exchange rates

**Integration Details**:
- **Service Implementation**: `BRC norges-bank.no Period`
- **Update Frequency**: Periodic updates with historical data support
- **Supported Currencies**: NOK and international currencies
- **Data Format**: Structured API responses
- **Special Features**: Extended historical data availability

**Configuration**:
```
API Base: norges-bank.no currency services
Data Range: Historical and current rates
Update Pattern: Periodic batch updates
Integration Method: Direct API calls
```

### Central Bank of Turkey (TCMB)

**Service Provider**: Türkiye Cumhuriyet Merkez Bankası  
**Endpoints**: tcmb.gov.tr  
**Coverage**: TRY-based exchange rates

**Integration Details**:
- **Service Implementation**: `BRC tcmb.gov.tr Latest`
- **Update Frequency**: Daily latest rates
- **Supported Currencies**: TRY and major international currencies
- **Data Format**: XML currency feeds
- **Regional Focus**: Strong Middle East and European currency coverage

**Configuration**:
```
Service Provider: tcmb.gov.tr
Update Frequency: Daily after market close
Currency Scope: TRY-based rates
Data Format: XML feeds
```

### XE.com

**Service Provider**: XE.com  
**Coverage**: Global currency exchange rates

**Integration Details**:
- **Service Implementation**: `BRC Xe.com Period`
- **Update Frequency**: Periodic updates with broad currency coverage
- **Supported Currencies**: Extensive global currency support
- **Data Format**: API-based JSON responses
- **Features**: Real-time and historical rate data

**Configuration**:
```
API Provider: XE.com currency services
Rate Coverage: Global currencies
Update Method: Periodic API calls
Authentication: API key required (if using commercial tier)
```

### Fixer.io

**Service Provider**: Fixer.io  
**Coverage**: Comprehensive global exchange rates

**Integration Details**:
- **Service Implementation**: `BRC fixer.io Period`
- **Update Frequency**: Periodic updates with extensive currency support
- **Supported Currencies**: 170+ global currencies
- **Data Format**: JSON API responses
- **Features**: Historical data and currency conversion

**Configuration**:
```
API Endpoint: fixer.io currency API
Currency Support: 170+ currencies
Rate Limits: Based on subscription tier
Authentication: API key required
Historical Data: Available with subscription
```

### Sedlabanki (Iceland)

**Service Provider**: Central Bank of Iceland  
**Endpoints**: sedlabanki.is  
**Coverage**: ISK-based exchange rates

**Integration Details**:
- **Service Implementation**: `BRC Sedlabanki.is Period`
- **Update Frequency**: Periodic updates for ISK rates
- **Supported Currencies**: ISK and major international currencies
- **Data Format**: Structured feed format
- **Regional Focus**: Nordic and European currency emphasis

**Configuration**:
```
Provider: Central Bank of Iceland
Base Currency: ISK
Update Schedule: Periodic updates
Data Source: Official central bank rates
```

## Application Insights Integration

### Microsoft Azure Application Insights

**Service Provider**: Microsoft Azure  
**Purpose**: Telemetry, monitoring, and analytics

**Integration Details**:
- **Instrumentation Key**: bd3990ea-869d-43c4-aa17-34ec88949e0c
- **Endpoint**: swedencentral-0.in.applicationinsights.azure.com
- **Data Types**: Performance metrics, error tracking, usage analytics
- **Integration Level**: Built-in telemetry framework

**Telemetry Data Collected**:
```
Performance Metrics:
- Job queue execution times
- Currency rate update performance  
- Feature management response times
- Background monitor processing efficiency

Error Tracking:
- Service connectivity issues
- Job queue failures
- Feature condition evaluation errors
- Integration point failures

Usage Analytics:
- Feature adoption patterns
- User behavior analysis
- System utilization metrics
- Performance trend analysis
```

**Configuration**:
```
Connection String: Pre-configured in app.json
Data Retention: Based on Azure subscription
Privacy: Follows BrightCom Solutions privacy policy
Access: Managed by BrightCom Solutions support team
```

## External Service Architecture

### Service Connection Management

**Connection Patterns**:

BRC Core implements robust connection management for external services:

**Connection Architecture**:
```al
// Example service connection pattern
interface BRCCurrExchRateServiceProvider
{
    procedure GetExchangeRates(CurrencyFilter: Text): Boolean;
    procedure ValidateService(): Boolean;
    procedure GetServiceStatus(): Enum BRCServiceStatus;
}
```

**Features**:
- **Connection Pooling**: Efficient connection management
- **Timeout Handling**: Configurable timeout values  
- **Retry Logic**: Automatic retry with exponential backoff
- **Circuit Breaker**: Prevents cascading failures
- **Health Monitoring**: Continuous service health checks

### Error Handling and Resilience

**Robust Error Management**:

BRC Core implements comprehensive error handling for external service integrations:

**Error Handling Strategy**:
```
Service Unavailable:
1. Automatic retry with backoff
2. Switch to backup service if available
3. Log error for administrator review
4. Continue with cached data if appropriate

Data Validation Errors:
1. Validate rate reasonableness
2. Check for obvious data errors
3. Flag suspicious rate changes
4. Require manual review for significant variances

Authentication Failures:
1. Retry with fresh credentials
2. Log security-related failures
3. Alert administrators of persistent issues
4. Implement security lockout if necessary
```

### Service Selection and Failover

**Intelligent Service Management**:

BRC Core provides intelligent selection and failover capabilities:

**Service Priority Logic**:
1. **Primary Service**: Use configured primary provider
2. **Performance Monitoring**: Track response times and reliability
3. **Automatic Failover**: Switch to backup on service failure  
4. **Health Recovery**: Resume primary service when healthy
5. **Manual Override**: Allow administrator service selection

## Integration Security

### Secure Communication

**Security Measures**:

All external service communications implement security best practices:

**Transport Security**:
- **HTTPS Only**: All external communications use TLS encryption
- **Certificate Validation**: Validate server certificates
- **Connection Security**: Use secure connection protocols
- **Data Encryption**: Encrypt sensitive data in transit

**Authentication Management**:
- **API Key Security**: Secure storage of API keys where required
- **Token Management**: Handle authentication tokens securely
- **Credential Rotation**: Support for credential updates
- **Access Monitoring**: Log and monitor API access

### Data Privacy and Compliance

**Privacy Protection**:

BRC Core ensures compliance with data protection requirements:

**Data Handling**:
- **Minimal Data**: Only collect necessary data
- **Retention Policies**: Respect data retention requirements
- **Geographic Compliance**: Respect regional data regulations
- **Audit Trails**: Maintain comprehensive audit logs

## Performance Optimization

### Caching Strategy

**Intelligent Caching**:

BRC Core implements sophisticated caching to optimize performance:

**Cache Architecture**:
```
Rate Cache Levels:
1. In-Memory Cache: Recent rate data for quick access
2. Database Cache: Historical rates with TTL management
3. Service Cache: Provider-specific cached responses
4. Invalidation Logic: Automatic cache refresh on schedule
```

**Cache Benefits**:
- **Response Speed**: Faster access to frequently used rates
- **Service Reliability**: Reduces dependency on external services
- **Cost Optimization**: Minimizes API calls to paid services
- **Offline Capability**: Limited functionality during service outages

### Batch Processing

**Efficient Data Processing**:

BRC Core optimizes external service usage through batch processing:

**Batch Strategies**:
- **Bulk Rate Updates**: Request multiple currencies simultaneously
- **Scheduled Processing**: Batch updates during off-peak hours
- **Resource Management**: Limit concurrent external requests
- **Parallel Processing**: Process multiple services simultaneously where appropriate

## Monitoring and Diagnostics

### Service Health Monitoring

**Comprehensive Monitoring**:

BRC Core provides extensive monitoring for all external integrations:

**Health Check Metrics**:
- **Service Availability**: Track uptime for each provider
- **Response Time**: Monitor API response performance
- **Error Rates**: Track service failure frequencies
- **Data Quality**: Validate rate data consistency

**Alert Configuration**:
- **Service Outages**: Immediate alerts for service failures
- **Performance Degradation**: Warnings for slow response times
- **Data Anomalies**: Alerts for unusual rate variances
- **Authentication Issues**: Security-related failure notifications

### Integration Analytics

**Performance Analysis**:

Built-in analytics help optimize external service usage:

**Analytics Features**:
- **Usage Patterns**: Track service utilization patterns
- **Cost Analysis**: Monitor API usage costs (for paid services)
- **Performance Trends**: Historical performance analysis
- **Service Comparison**: Compare provider performance and reliability

## Best Practices for Third-Party Integration

### Service Provider Management

**Vendor Relationship Management**:

- **Multiple Providers**: Maintain relationships with multiple rate providers
- **Service Level Agreements**: Understand provider SLA commitments
- **Backup Planning**: Always have fallback options available
- **Cost Monitoring**: Track usage costs for commercial services

### Integration Maintenance

**Ongoing Management**:

- **Regular Testing**: Periodic testing of all service integrations
- **Version Monitoring**: Track API version changes from providers
- **Security Updates**: Stay current with security best practices
- **Performance Optimization**: Regular review and optimization of integration performance

The comprehensive third-party integration capabilities of BRC Core ensure reliable access to external data and services while maintaining high performance and security standards.