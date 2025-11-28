---
title: "Configuration"
linkTitle: "Configuration"
weight: 3
type: docs
description: >
  Detailed configuration guide including basic setup, advanced options, and the High Speed Parallel operator system.
---

## Overview

This guide covers BRC Connect configuration from basic connection settings through advanced parallel processing optimization. Configuration is performed primarily through the **BRC Connect Setup** page with additional specialized setup for high-volume scenarios.

## Basic Configuration

### Connection Settings

Open **BRC Connect Setup** and configure the essential connection parameters:

| Setting | Description | Example | Required |
|---------|-------------|---------|----------|
| **Integration Active** | Master on/off switch | OFF initially | Yes |
| **API Path** | External API base URL | `https://api.shop.com/v1` | Yes |
| **Bearer Token** | Authentication token | `eyJhbGc...` | Yes |
| **Source ID** | BC instance identifier | `BC-PROD-01` | Optional |
| **Debug Mode** | Detailed logging | ON for testing | Optional |

**Best Practice**: Keep Integration Active = OFF until configuration complete and tested.

### Automation Configuration

Configure which processes run automatically:

#### Inbound Processing
- **Auto Download Documents**: Download orders from external system
- **Auto Read Content**: Parse JSON into structured data
- **Auto Validate Content**: Validate data against business rules
- **Auto Create Content**: Create BC records
- **Auto Create/Update Customer**: Create missing customers
- **Auto Create/Update Item**: Create missing items
- **Auto Release Sales Documents**: Release created orders

**Recommended Starting Point**: Enable all except Auto Release (validate first)

#### Outbound Processing
- **Auto Send Inventory Update**: Sync inventory changes
- **Auto Send Price Update**: Sync price changes
- **Auto Send Item Update**: Sync item master changes
- **Auto Send Shipment**: Notify shipment posting
- **Auto Send Invoiced Shipment**: Notify invoice posting
- **Auto Send Order Confirmation**: Confirm order receipt

**Recommended Starting Point**: Enable after inbound processing working

### Document Settings

Configure order processing behavior:

**Payment Handling:**
- **Payment Option**: Multiple Payments (recommended)
- **Payment Journal Template**: GENERAL
- **Payment Journal Batch**: WEB (create dedicated batch)
- **Post Payments**: OFF initially

**Line Item Handling:**
- **Discount Type**: G/L Account
- **Discount No.**: (G/L for discounts)
- **Shipping Fee Type**: G/L Account
- **Shipping Fee No.**: (G/L for freight)
- **Duties Fee Type**: G/L Account
- **Duties Fee No.**: (G/L for duties)

**Validation Settings:**
- **Total Amt. Document Tolerance**: 0.5 (currency units)
- **Unit Price Rounding**: 0.01
- **Discount Rounding**: 0.01
- **Disable Totals Check**: OFF (keep validation)
- **Disable VAT Check**: OFF (keep validation)
- **No Incl. VAT on Document**: Based on your VAT setup

### Processing Limits

Configure throughput and retry settings:

| Setting | Recommended | Purpose |
|---------|-------------|---------|
| **Process Entry Max Count** | 100-200 | Entries per job run |
| **Webservice Retries** | 3 | HTTP retry attempts |
| **Content Creation Retries** | 2 | Document creation retries |
| **Auto-Acknowledge Entry Count** | 50 | Batch acknowledgment size |
| **Delete Content After** | 30D | Data retention period |

## Advanced Configuration

### High Speed Parallel Operator System

For high-volume environments (>5,000 orders/hour), BRC Connect includes a sophisticated parallel processing system that dramatically improves throughput.

#### Understanding the Operator System

**The Problem with Traditional Processing:**
- Single job queue entry processes all operations sequentially
- Fast operations (parsing) blocked by slow operations (document creation)
- No ability to scale different operation types independently
- Bottlenecks at document creation stage

**The Operator Solution:**
- Multiple specialized job queue entries run in parallel
- Each operator handles specific operation types (Download, Read, Validate, Create, Delete)
- Operations scaled independently based on their speed characteristics
- DateTime-based work partitioning prevents contention

#### Operation Characteristics

Understanding each operation type is key to optimization:

| Operation | Speed | Bottleneck | Recommended Operators |
|-----------|-------|------------|----------------------|
| **Download** | Medium | External API rate limits | 2-4 operators |
| **Read** | Fast | JSON parsing CPU | 1-3 operators |
| **Validate** | Medium | Business logic complexity | 1-3 operators |
| **Create** | **Slow** | Database writes, BC posting | **5-10+ operators** |
| **Delete** | Fast | Infrequent (old records only) | 1 operator |

**Key Insight**: Create is 10x slower than other operations - it's the primary bottleneck.

#### Setting Up Parallel Operators

**Step 1: Create Operator Control Records**

Navigate to **BRC Connect Process Operator Control**:

For each operator, create a control record:

| Field | Value | Example |
|-------|-------|---------|
| **Code** | Descriptive identifier | `CREATE-01`, `READ-01` |
| **Description** | Purpose documentation | "Create Operator - Orders" |
| **Execute Download** | Enable if operator downloads | ☐ for specialized |
| **Execute Read** | Enable if operator parses JSON | ☐ for specialized |
| **Execute Validate** | Enable if operator validates | ☐ for specialized |
| **Execute Create** | Enable if operator creates records | ☑ for Create operators |
| **Execute Delete** | Enable if operator deletes old data | ☐ for specialized |
| **Auto-scaling** | Enable dynamic tuning | ☑ recommended |
| **Scaling Min** | Minimum batch size | 50 |
| **Scaling Max** | Maximum batch size | 500 |
| **Target Operations** | Current batch size | 100 |

**Step 2: Create Job Queue Entries**

Navigate to **Job Queue Entries** and create entries for each operator:

**Basic Configuration:**
- **Object Type to Run**: Codeunit
- **Object ID to Run**: 12073574 (BRC Process Content Operator)
- **Description**: Descriptive name (e.g., "BRC Operator - Create Only")

**Critical Settings:**
- **Parameter String**: Must match Operator Control Code (e.g., `CREATE-01`)
  - This links Job Queue Entry → Operator Control record
  - Must be exact match (case-sensitive)

**Scheduling by Operation Type:**

| Operation Type | Minutes Between Runs | Target Operations | Max Attempts | Rerun Delay |
|----------------|---------------------|-------------------|--------------|-------------|
| **Download/Read** | 1-2 | 200-400 | 3 | 60 sec |
| **Validate** | 2-3 | 100-200 | 3 | 120 sec |
| **Create** | 3-5 | 50-100 | 3 | 120 sec |
| **Delete** | 60+ | 500-1000 | 3 | 300 sec |

**Critical Configuration:**
- **Job Queue Category Code**: **LEAVE BLANK** ⚠️
  - Setting a category limits parallelism (only 1 job per category runs at once)
  - Blank = full parallel execution
  - Exception: Use different categories per operation type for controlled parallelism

- **Maximum No. of Attempts to Run**: 3 ⭐
  - Prevents stuck jobs from blocking queue
  - Retries transient errors (API timeout, database lock)
  - After 3 failures → Error state → requires manual intervention

- **Job Timeout**: Set based on operation type ⭐
  - Download/Read: 10 minutes
  - Validate: 20 minutes
  - Create: 30 minutes
  - Delete: 60 minutes
  - Prevents runaway jobs

#### Recommended Operator Configurations

**Small-Medium Volume (<5,000 records/hour):**

```
2-3 Specialized Operators:

Operator: "DL-READ-01" (Every 2 minutes)
├─ Execute Download: ☑
├─ Execute Read: ☑
├─ Target Operations: 200
└─ Purpose: Fast pipeline - inbound processing

Operator: "VAL-CREATE-01" (Every 3 minutes)
├─ Execute Validate: ☑
├─ Execute Create: ☑
├─ Target Operations: 100
└─ Purpose: Slow processing - validation and record creation

Operator: "DELETE-01" (Every 60 minutes)
├─ Execute Delete: ☑
├─ Target Operations: 500
└─ Purpose: Cleanup old records
```

**High Volume (5,000-20,000 records/hour):**

```
5-7 Specialized Operators:

Operators: "DL-01", "DL-02" (Every 2 minutes)
├─ Execute Download: ☑ (ONLY)
├─ Target Operations: 300
└─ Purpose: Dedicated external API downloading

Operators: "READ-01", "READ-02" (Every 2 minutes)
├─ Execute Read: ☑ (ONLY)
├─ Target Operations: 400
└─ Purpose: Fast JSON parsing

Operator: "VAL-01" (Every 3 minutes)
├─ Execute Validate: ☑ (ONLY)
├─ Target Operations: 200
└─ Purpose: Business rule validation

Operators: "CREATE-01" through "CREATE-04" (Every 5 minutes)
├─ Execute Create: ☑ (ONLY)
├─ Target Operations: 75
└─ Purpose: Document creation (bottleneck stage)

Operator: "DELETE-01" (Every 60 minutes)
├─ Execute Delete: ☑
├─ Target Operations: 1000
└─ Purpose: Maintenance
```

**Extreme Volume (>20,000 records/hour):**

```
10-20 Specialized Operators:

- 4 Download operators (staggered: 0, 30, 60, 90 sec)
- 3 Read operators (staggered: 0, 40, 80 sec)
- 3 Validate operators (staggered: 0, 60, 120 sec)
- 8 Create operators (staggered: 0, 30, 60, 90, 120, 150, 180, 210 sec)
- 2 Delete operators (off-peak hours)
```

#### Staggering Operator Start Times

For multiple operators handling the same operation type, stagger their start times to prevent "thundering herd" where all operators start simultaneously.

**Method 1: Manual Stagger (Precise Control)**

1. Create all Job Queue Entries with Status = "On Hold"
2. Set same interval for all (e.g., 5 minutes)
3. Start them at staggered times:
   - 10:00:00 → Set CREATE-01 to Ready (runs at :00, :05, :10...)
   - 10:01:00 → Set CREATE-02 to Ready (runs at :01, :06, :11...)
   - 10:02:00 → Set CREATE-03 to Ready (runs at :02, :07, :12...)
4. BC maintains offset: "Next Run = Last Run + Interval"

**Method 2: Natural Stagger (Simpler)**

- Set all operators to same interval
- DateTime-based work partitioning automatically distributes work
- Slight runtime variations naturally stagger subsequent runs
- Less precise but much simpler to manage

**Recommendation**: Use Method 2 unless you have >20 operators.

#### Monitoring Operator Performance

**Key Metrics:**

1. **Job Queue Log Entry**
   - Runtime < Interval: ✅ Good, consider increasing Target Operations
   - Runtime ≥ Interval: ⚠️ Operator can't keep up - decrease Target Operations or add more operators

2. **BRC Connect Content** (by Status)
   - High "New" count: Need more Read operators
   - High "Read" count: Need more Validate operators
   - High "Validated" count: Need more Create operators (primary bottleneck)

3. **Operator Control Records**
   - Auto-scaling adjusts Target Operations over time
   - Consistently at max: Add more parallel operators
   - Consistently at min: Reduce operator count

**Troubleshooting:**

| Symptom | Cause | Solution |
|---------|-------|----------|
| Records stuck in "New" | Insufficient Read operators | Add 2-3 Read-only operators |
| Records stuck in "Validated" | Create bottleneck | Add 3-5 Create-only operators |
| Operators finish too quickly | Target Operations too low | Increase via auto-scaling or manually |
| Operators timeout | Target Operations too high | Decrease Target Operations |

#### Common Mistakes to Avoid

**❌ Mistake 1: All Operators Do Everything**
```
10 operators all with:
☑ Download ☑ Read ☑ Validate ☑ Create ☑ Delete
```
**Problem**: Massive contention, inefficient scaling
**Solution**: Specialize operators by operation type

**❌ Mistake 2: Not Enough Create Operators**
```
1 Download, 1 Read, 1 Validate, 1 Create
```
**Problem**: Create is 10x slower - pipeline backs up
**Solution**: Use 5-10 Create operators for every 1 Read operator

**❌ Mistake 3: Setting Job Queue Category Code**
```
All operators assigned to "BRCCONNECT" category
```
**Problem**: Only 1 job per category runs at once - kills parallelism
**Solution**: Leave Job Queue Category Code BLANK

**❌ Mistake 4: Too Aggressive Target Operations**
```
Target Operations: 5000, Runtime: 45 min, Interval: 2 min
```
**Problem**: Operator overlaps with next run, causing contention
**Solution**: Target Operations should complete in <80% of interval

#### Performance Expectations

After proper operator specialization:

| Volume | Records/Hour | Operators | Avg Create Time | Lag Time |
|--------|--------------|-----------|----------------|----------|
| Small | <5,000 | 2-3 | <2 min | <10 min |
| Medium | 5,000-10,000 | 5-7 | <5 min | <15 min |
| High | 10,000-20,000 | 10-15 | <10 min | <30 min |
| Extreme | >20,000 | 15-20 | <15 min | <45 min |

*Lag Time = Entry arrival to Create completion*

### Inventory Configuration

Configure how inventory syncs to external systems:

**Inventory Calculation Method:**
- **Real-time**: Current on-hand quantity
- **Available**: Projected available (on-hand - committed + inbound)
- **Grouped by Location**: Separate quantities per warehouse

**Advanced Settings:**
- **Group Inventory to Location**: ON for multi-warehouse
- **Outstanding Qty. Max**: 0 (exclude purchase orders) or higher to include
- **Add Next Expected Delivery**: ON to include incoming shipment dates
- **Send Virtual Inv. for BOM Item**: ON to calculate component availability

**Item Journal Settings:**
- **Phys. Inventory Journal Template**: Template for physical inventory
- **Item Adjustment Journal Template**: Template for adjustments
- **Post Item Adjustment**: ON for automatic posting (use with caution)

### Product Range and Channel Management

Control which items sync to which channels:

**Enable Product Range Filtering:**
- **Product Range on Item**: ON
- **Product Range on Price**: ON
- **Product Range on Inventory**: ON

**Configure Product Ranges:**

Navigate to **BRC Product Range** and create ranges:

| Code | Description | Use Case |
|------|-------------|----------|
| WEB | Website products | E-commerce only items |
| POS | Point-of-sale items | Retail store inventory |
| ALL | All channels | Items sold everywhere |
| SEASON | Seasonal items | Limited-time products |

**Assign to Items:**
- Open **Items**
- Set **Product Range** field
- Only items with matching range sync to that channel

### Source-Specific Overrides

For platform-specific settings, use **BRC Connect Source**:

1. Navigate to **BRC Connect Source**
2. Create entry for each external system (e.g., SHOPIFY, STORM)
3. Enable **Override Default Setup**
4. Configure source-specific settings:
   - Integration Engine
   - Payment handling rules
   - Totals check tolerance
   - VAT validation rules

**Use Case**: Shopify calculates VAT differently than Litium - use source overrides.

## Monitoring Configuration

### Email Alerts

Enable proactive monitoring:

1. **Monitor Active**: ON
2. **Monitor E-Mail List**: Semicolon-separated emails (e.g., `admin@company.com;ops@company.com`)
3. System emails alerts when error thresholds exceeded

**Alert Triggers:**
- High error rate (>10% of orders)
- Multiple consecutive job failures
- API connection failures
- Critical validation errors

### Logging Configuration

Control log verbosity:

**Debug Mode:**
- **ON**: Logs full JSON, headers, detailed processing steps
- **OFF**: Logs errors and summary only (recommended for production)

**Warning**: Debug mode logs PII (customer emails, phone numbers). Disable in production or ensure log retention complies with privacy regulations.

**Process Run Logging:**
- **Log Outgoing Process Runs**: ON
- Creates entries in **BRC Process Run Logs**
- Tracks job execution time, record counts, errors

## Migration from Single to Parallel Processing

If currently using single job queue entry:

**Phase 1: Assess Current State (Day 1)**
1. Check **BRC Connect Content** counts by Status
2. Identify bottleneck (usually "Validated" status)
3. Note current throughput (records/hour)

**Phase 2: Add Parallel Operators (Days 2-3)**
1. Keep existing job queue entry running (safety net)
2. Create 3-5 specialized Create operators
3. Monitor for 24-48 hours
4. Compare throughput improvement

**Phase 3: Full Specialization (Week 1)**
1. Disable original "do everything" job entry
2. Convert all processing to specialized operators
3. Use recommended patterns for your volume tier
4. Monitor and tune Target Operations

**Phase 4: Optimization (Ongoing)**
1. Enable auto-scaling on all operators
2. Add operators at bottleneck stages as needed
3. Review Job Queue Log weekly for trends
4. Adjust configuration based on business volume changes

## Configuration Validation Checklist

Before going live:

- [ ] **Connection**: API Path, Bearer Token tested successfully
- [ ] **Automation**: Appropriate flags enabled for your process
- [ ] **Field Mappings**: All required fields mapped in BRC Content Type Field Setup
- [ ] **Value Mappings**: External codes mapped in BRC Mapping
- [ ] **Payment Settings**: Payment option and journal configured
- [ ] **Tolerances**: Totals/VAT tolerances set appropriately
- [ ] **Operators**: Job queue entries created and configured (if using parallel)
- [ ] **Monitoring**: Email alerts configured
- [ ] **Testing**: Test order processed successfully end-to-end
- [ ] **Documentation**: Configuration documented for team reference

## Advanced Topics

### Custom Field Mapping

For platform-specific fields not in standard mapping:

1. Navigate to **BRC Content Type Field Setup**
2. Filter to your **BRC Connect Type** (e.g., DOCUMENT)
3. Add custom mappings with JSON paths
4. Use extended info for non-standard BC fields

### Dimension Integration

Map external categories/tags to BC dimensions:

1. In **BRC Content Type Field Setup**, find category fields
2. Enable **Map to Dimension**
3. Configure **Logic Mapping** to translate values
4. System automatically assigns shortcut dimensions

### Event Subscribers

For advanced customization, subscribe to BRC Connect events:

**Available Events:**
- `OnBeforeCreateDocument`: Modify order before creation
- `OnAfterCreateDocument`: Post-creation processing
- `OnBeforeValidateContent`: Custom validation
- `OnAfterSendToWeb`: Post-send actions

**Example Use Case**: Add custom validation rules based on business-specific requirements.

## Next Steps

- [User Guide](../user-guide/) - Daily operations
- [Troubleshooting](../troubleshooting/) - Problem resolution
- [Reference](../reference/) - Technical details
- [Integrations](../integrations/) - Architecture deep dive

## Support

For configuration assistance:
- **Documentation**: [docs.brightcom.online/brcconnect](https://docs.brightcom.online/brcconnect)
- **Support**: [brightcom.se/kontakt](https://brightcom.se/kontakt/)
- **Community**: BrightCom customer portal
