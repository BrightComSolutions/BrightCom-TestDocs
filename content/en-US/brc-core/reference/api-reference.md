---
title: "API Reference"
linkTitle: "API Reference"
weight: 62
description: >
  Technical API documentation for BRC Core integration points and extension capabilities.
---

## API Reference Overview

This section provides comprehensive technical documentation for BRC Core's integration points, events, and extension capabilities. Developers can use this information to extend BRC Core functionality or integrate with custom solutions.

## Integration Events

BRC Core provides numerous integration events that allow developers to extend functionality without modifying core objects.

### Feature Management API

#### OnAddFunctionsToLibraryEvent

**Event Type**: Business Event  
**Publisher**: BRC Core Feature Mgmt. (Codeunit 12078468)  
**Purpose**: Add custom filtering functions to the feature management system

```al
[BusinessEvent(false)]
local procedure OnAddFunctionsToLibraryEvent()
```

**Usage Example**:
```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Core Feature Mgmt.", 'OnAddFunctionsToLibraryEvent', '', false, false)]
local procedure AddCustomFunctions()
begin
    BRCCoreFeatureMgmt.AddFunctionToLibrary('DEPT', 'Department Filter');
    BRCCoreFeatureMgmt.AddFunctionToLibrary('LOCATION', 'Location Filter');
end;
```

#### OnAddConditionsToLibraryEvent

**Event Type**: Business Event  
**Publisher**: BRC Core Feature Mgmt. (Codeunit 12078468)  
**Purpose**: Add custom feature conditions during library creation

```al
[BusinessEvent(false)]
local procedure OnAddConditionsToLibraryEvent()
```

**Usage Example**:
```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Core Feature Mgmt.", 'OnAddConditionsToLibraryEvent', '', false, false)]
local procedure AddCustomConditions()
begin
    BRCCoreFeatureMgmt.AddConditionToLibrary('SALES_TEAM', 'USER', '"User Group Code"=''SALES''');
end;
```

### Background Monitor API

#### OnBeforeProcessJobQueueEntry

**Event Type**: Integration Event  
**Publisher**: BRC Core BM Job Queue Monitor  
**Purpose**: Customize job queue processing before standard processing

```al
[IntegrationEvent(false, false)]
local procedure OnBeforeProcessJobQueueEntry(var JobQueueEntry: Record "Job Queue Entry"; var Handled: Boolean)
```

**Parameters**:
- `JobQueueEntry`: The job queue entry being processed
- `Handled`: Set to true to skip standard processing

**Usage Example**:
```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Core BM Job Queue Monitor", 'OnBeforeProcessJobQueueEntry', '', false, false)]
local procedure CustomJobProcessing(var JobQueueEntry: Record "Job Queue Entry"; var Handled: Boolean)
begin
    if JobQueueEntry."Object ID to Run" = 12345678 then begin
        // Custom processing logic
        Handled := true;
    end;
end;
```

#### OnAfterProcessJobQueueError

**Event Type**: Integration Event  
**Publisher**: BRC Core BM Job Queue Monitor  
**Purpose**: Custom error handling after standard error processing

```al
[IntegrationEvent(false, false)]
local procedure OnAfterProcessJobQueueError(var JobQueueEntry: Record "Job Queue Entry")
```

**Usage Example**:
```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Core BM Job Queue Monitor", 'OnAfterProcessJobQueueError', '', false, false)]
local procedure CustomErrorHandling(var JobQueueEntry: Record "Job Queue Entry")
begin
    // Send custom notifications
    // Log to external system
    // Perform custom retry logic
end;
```

### Currency Rate Service API

#### OnBeforeExecuteService

**Event Type**: Integration Event  
**Publisher**: BRC Curr Exch Rate Service (Codeunit 12079119)  
**Purpose**: Add custom currency rate service providers

```al
[IntegrationEvent(false, false)]
local procedure OnBeforeExecuteService(var ServiceURL: Text; var CurrExchRateUpdateSetup: Record "Curr. Exch. Rate Update Setup"; var Handled: Boolean)
```

**Usage Example**:
```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Curr Exch Rate Service", 'OnBeforeExecuteService', '', false, false)]
local procedure CustomCurrencyService(var ServiceURL: Text; var CurrExchRateUpdateSetup: Record "Curr. Exch. Rate Update Setup"; var Handled: Boolean)
begin
    if ServiceURL = 'custom.currencyapi.com' then begin
        // Custom currency rate retrieval
        Handled := true;
    end;
end;
```

#### OnAfterGetExchangeRates

**Event Type**: Integration Event  
**Publisher**: Currency exchange rate processing  
**Purpose**: Post-process exchange rates after retrieval

```al
[IntegrationEvent(false, false)]
local procedure OnAfterGetExchangeRates(var TempCurrencyExchangeRate: Record "Currency Exchange Rate" temporary)
```

**Usage Example**:
```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Curr Exch Rate Service", 'OnAfterGetExchangeRates', '', false, false)]
local procedure ValidateExchangeRates(var TempCurrencyExchangeRate: Record "Currency Exchange Rate" temporary)
begin
    // Validate rate reasonableness
    // Apply business rules
    // Log rate changes
end;
```

### Price Book API

#### OnBeforePriceBookLoop

**Event Type**: Integration Event  
**Publisher**: BRCCorePriceBookCalc (Codeunit 12078494)  
**Purpose**: Customize price book processing before calculation loop

```al
[IntegrationEvent(false, false)]
local procedure OnBeforePriceBookLoop(PriceBooksToRun: List of [Code[20]])
```

**Usage Example**:
```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::BRCCorePriceBookCalc, 'OnBeforePriceBookLoop', '', false, false)]
local procedure CustomPriceBookSelection(PriceBooksToRun: List of [Code[20]])
var
    PriceBookCode: Code[20];
begin
    // Log price books to be processed
    foreach PriceBookCode in PriceBooksToRun do
        LogPriceBookProcessing(PriceBookCode);
end;
```

## Table Extension Points

### Job Queue Entry Extensions

BRC Core extends the standard Job Queue Entry table with additional fields:

**Extended Fields**:
```al
field(12078000; "BRC Core User ID"; Code[50])
{
    Caption = 'BRC Core User ID';
    DataClassification = EndUserIdentifiableInformation;
    Description = 'User context for job execution';
}
```

**Usage**: Set this field to specify which user context the job should run under for permissions and access control.

### Application Area Setup Extensions

BRC Core extends the Application Area Setup with feature flags:

**Extended Fields**:
```al
field(12078001; BRCCurrExchRate; Boolean)
{
    Caption = 'BRC Currency Exchange Rate';
    Description = 'Enable BRC Currency Exchange Rate features';
}

field(12078002; BRCBackgroundMonitor; Boolean)  
{
    Caption = 'BRC Background Monitor';
    Description = 'Enable BRC Background Monitor features';
}
```

## Interface Implementations

### Currency Rate Service Provider Interface

BRC Core defines a service provider interface for extensible currency rate services:

```al
interface BRCCurrExchRateServiceProvider
{
    /// <summary>
    /// Retrieve exchange rates from the service provider
    /// </summary>
    procedure GetExchangeRates(CurrencyFilter: Text): Boolean;
    
    /// <summary>
    /// Validate service configuration and connectivity
    /// </summary>
    procedure ValidateService(): Boolean;
    
    /// <summary>
    /// Get current service health status
    /// </summary>
    procedure GetServiceStatus(): Enum BRCServiceStatus;
}
```

**Implementation Example**:
```al
codeunit 50100 "Custom Currency Provider" implements BRCCurrExchRateServiceProvider
{
    procedure GetExchangeRates(CurrencyFilter: Text): Boolean
    begin
        // Implement custom rate retrieval logic
    end;
    
    procedure ValidateService(): Boolean
    begin
        // Implement service validation
    end;
    
    procedure GetServiceStatus(): Enum BRCServiceStatus
    begin
        // Return service status
    end;
}
```

### Price Book Frequency Interface

For custom price book update schedules:

```al
interface BRCCorePBFreqRunCheck
{
    /// <summary>
    /// Determine if it's time to run the price book calculation
    /// </summary>
    procedure IsRunTimeForPriceBook(PriceBook: Record BRCCorePriceBook): Boolean;
}
```

## Codeunit APIs

### BRC Core Feature Management

**Public Procedures**:

```al
/// <summary>
/// Check if application area is enabled for current user
/// </summary>
procedure IsApplicationAreaEnabled(FieldNo: Integer): Boolean

/// <summary>
/// Add a function to the feature filter library
/// </summary>
procedure AddFunctionToLibrary(Code: Code[10]; Description: Text[30]): Boolean

/// <summary>
/// Add a condition to the feature condition library
/// </summary>
procedure AddConditionToLibrary(ConditionCode: Code[20]; FunctionCode: Code[10]; Filter: Text[250]): Boolean
```

### BRC Admin Tool Management

**Public Procedures**:

```al
/// <summary>
/// Calculate number of records in specified table
/// </summary>
procedure CalcRecordsInTable(TableNoToCheck: Integer): Integer

/// <summary>
/// Perform system diagnostic checks
/// </summary>
procedure RunSystemDiagnostics(): Boolean
```

### BRC Currency Exchange Rate Helper

**Public Procedures**:

```al
/// <summary>
/// Get exchange rate from cache or service
/// </summary>
procedure GetExchangeRate(FromCurrency: Code[10]; ToCurrency: Code[10]; Date: Date): Decimal

/// <summary>
/// Validate exchange rate reasonableness
/// </summary>
procedure ValidateExchangeRate(var ExchangeRate: Record "Currency Exchange Rate"): Boolean
```

## Error Handling APIs

### Standard Error Patterns

BRC Core implements consistent error handling patterns:

**Error Information Interface**:
```al
procedure GetLastErrorInfo(var ErrorCode: Code[20]; var ErrorMessage: Text[250]): Boolean
```

**Error Recovery Interface**:
```al
procedure RetryLastOperation(MaxRetries: Integer): Boolean
```

## Configuration APIs

### Setup Configuration

**Background Monitor Setup API**:
```al
procedure GetBMSetup(var BMSetup: Record "BRC Core BM Setup"): Boolean
procedure UpdateBMSetup(var BMSetup: Record "BRC Core BM Setup"): Boolean
```

**Currency Rate Setup API**:
```al
procedure GetCurrencyRateSetup(var Setup: Record "BRC Curr Exch. Rate Setup"): Boolean
procedure ConfigureRateService(ServiceURL: Text; Enabled: Boolean): Boolean
```

## Telemetry APIs

### Application Insights Integration

BRC Core provides telemetry integration for monitoring and diagnostics:

**Custom Event Logging**:
```al
procedure LogCustomEvent(EventName: Text; EventData: Dictionary of [Text, Text])
procedure LogPerformanceEvent(OperationName: Text; Duration: Duration)
procedure LogErrorEvent(ErrorMessage: Text; ErrorDetails: Text)
```

**Usage Example**:
```al
local procedure LogFeatureUsage(FeatureName: Text)
var
    TelemetryData: Dictionary of [Text, Text];
begin
    TelemetryData.Add('FeatureName', FeatureName);
    TelemetryData.Add('UserId', UserId());
    TelemetryData.Add('Company', CompanyName());
    
    BRCCoreTelemetry.LogCustomEvent('FeatureUsage', TelemetryData);
end;
```

## Security and Authentication

### Permission Validation APIs

```al
/// <summary>
/// Check if current user has permission for specific BRC Core functionality
/// </summary>
procedure HasBRCPermission(FunctionArea: Enum BRCFunctionArea): Boolean

/// <summary>
/// Validate job queue user context
/// </summary>
procedure ValidateJobQueueUserContext(var JobQueueEntry: Record "Job Queue Entry"): Boolean
```

## Data Access APIs

### Safe Data Access Patterns

BRC Core implements safe data access patterns:

**Record Management**:
```al
procedure SafeGetRecord(TableNo: Integer; RecordId: RecordId; var RecordRef: RecordRef): Boolean
procedure SafeInsertRecord(var RecordRef: RecordRef): Boolean
procedure SafeModifyRecord(var RecordRef: RecordRef): Boolean
```

**Bulk Operations**:
```al
procedure BulkProcessRecords(TableNo: Integer; FilterText: Text; ProcessingCodeunit: Integer): Boolean
```

## Best Practices for API Usage

### Development Guidelines

1. **Event Subscription**:
   - Always use integration events rather than modifying BRC Core objects
   - Implement proper error handling in event subscribers
   - Maintain upgrade compatibility

2. **Performance Considerations**:
   - Minimize processing in event subscribers
   - Use async processing for heavy operations
   - Implement proper caching strategies

3. **Security**:
   - Validate permissions before performing operations
   - Use proper data classification for any custom fields
   - Implement audit trails for sensitive operations

### Error Handling

```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::"BRC Core Feature Mgmt.", 'OnAddConditionsToLibraryEvent', '', false, false)]
local procedure AddConditionsWithErrorHandling()
begin
    if not TryAddCustomCondition() then
        HandleConditionError(GetLastErrorText());
end;

[TryFunction]
local procedure TryAddCustomCondition()
begin
    // Custom condition addition logic
end;
```

This API reference provides the foundation for extending and integrating with BRC Core functionality while maintaining system stability and upgrade compatibility.