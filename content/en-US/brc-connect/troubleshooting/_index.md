---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
weight: 50
type: docs
description: >
  Common issues, error messages, diagnostic tools, and solutions for BRC Connect problems.
---

## Quick Diagnostic Checklist

When experiencing issues with BRC Connect, check these first:

- [ ] **Integration Active** = ON in BRC Connect Setup
- [ ] Bearer token valid and not expired
- [ ] External API endpoint reachable
- [ ] Job Queue Entries running and not errored
- [ ] No "Stopped" entries in Job Queue Entries
- [ ] Recent errors in BRC Connect Error List reviewed
- [ ] BC environment healthy (check Microsoft 365 Service Health)

## Common Issues and Solutions

### Orders Not Downloading

**Symptom**: No new entries in BRC Connect Entries, or entries stuck at "Not Sent"

**Possible Causes and Solutions:**

#### Cause 1: Integration Disabled

**Check:**
1. Open **BRC Connect Setup**
2. Verify **Integration Active** = ON

**Solution:**
- Enable **Integration Active**
- Save changes
- Wait for next job queue run

#### Cause 2: Job Queue Not Running

**Check:**
1. Open **Job Queue Entries**
2. Filter **Object ID to Run** = 12073522 (BRC Process All Contents)
3. Check **Status** field

**Solution:**
- If Status = "On Hold": Set **Status** = Ready
- If Status = "Error": Review **Error Message**, fix issue, set to Ready
- If no entry exists: Create new job queue entry following [Setup Guide](../setup/#job-queue-setup)

#### Cause 3: API Connection Failure

**Check:**
1. Open **BRC Connect Entries**
2. Filter **Status** = Error
3. Review **Error Text**

**Common Error Messages:**

| Error Text | Cause | Solution |
|------------|-------|----------|
| "Could not connect to remote server" | Network issue, wrong URL | Verify API Path in BRC Connect Setup |
| "401 Unauthorized" | Invalid bearer token | Update bearer token in BRC Connect Setup |
| "403 Forbidden" | IP not whitelisted | Add BC's IP to external system allowlist |
| "404 Not Found" | Wrong endpoint path | Verify API Path and type-specific paths |
| "Timeout" | External system slow/down | Check external system health, increase timeout |

**Solution:**
1. Test API endpoint manually (use Postman or curl)
2. Verify bearer token valid
3. Check external system status page
4. Update BRC Connect Setup with correct values
5. Retry **Get All Documents** from BRC Connect Entries

#### Cause 4: External System Has No New Orders

**Check:**
1. Log into external system admin
2. Verify new orders exist
3. Check order status (may need specific status to sync)

**Solution:**
- If no orders: No issue, working as expected
- If orders exist but not syncing: Check external system's BC integration settings
- Verify **Source ID** in BRC Connect Setup matches external system config

### Orders Download but Don't Create Sales Orders

**Symptom**: Entries in BRC Connect Content with Status = "Error" or "Validated" (stuck)

**Possible Causes and Solutions:**

#### Cause 1: Automation Disabled

**Check:**
1. Open **BRC Connect Setup**
2. Review automation flags:
   - Auto Read Content
   - Auto Validate Content
   - Auto Create Content

**Solution:**
- Enable appropriate automation flags
- Or manually process from **BRC Connect Content**:
  - Select content record
  - Actions → **Read Content** (if Status = New)
  - Actions → **Validate Content** (if Status = Read)
  - Actions → **Create/Update BC Record** (if Status = Validated)

#### Cause 2: Customer Not Found

**Check:**
1. Open **BRC Connect Error List**
2. Find error: "Customer not found" or similar
3. Open **BRC Connect Values** for that content ID
4. Check values for buyer email, phone, webId

**Solution:**

**Option A: Create Customer Manually**
1. Open **Customers**
2. Create new customer with matching email/phone
3. Go back to **BRC Connect Content**
4. Select errored record
5. Actions → **Reset Status**
6. Actions → **Create/Update BC Record**

**Option B: Enable Auto-Create Customer**
1. Open **BRC Connect Setup**
2. Set **Auto Create/Update Customer** = ON
3. Configure customer template in BC
4. Retry processing

**Option C: Fix Unique Identifier Matching**
1. Open **BRC Content Type Field Setup**
2. Verify unique identifier fields configured:
   - buyer.email (Priority 1)
   - buyer.phone (Priority 2)
3. Check **Case Sensitive Filtering** settings
4. Adjust as needed for your data

#### Cause 3: Item Not Found

**Check:**
1. Open **BRC Connect Error List**
2. Find error: "Item not found" or "Item reference not found"
3. Review item SKU in error message

**Solution:**

**Option A: Create Item Reference**
1. Open **Items**
2. Find item in BC
3. Open **Item References** (or **Item Cross References**)
4. Add new reference:
   - Reference Type: Customer or Vendor
   - Reference No.: External SKU
   - Unit of Measure: Each
5. Retry processing

**Option B: Enable Auto-Create Item**
1. Open **BRC Connect Setup**
2. Set **Auto Create/Update Item** = ON
3. Configure item template in BC
4. Retry processing (creates item automatically)

#### Cause 4: Total Amount Mismatch

**Check:**
1. Open **BRC Connect Error List**
2. Find error: "Total amount mismatch" or "Document total does not match"
3. Note difference amount

**Solution:**

**If difference is small** (rounding):
1. Open **BRC Connect Setup**
2. Increase **Total Amt. Document Tolerance** (e.g., from 0.5 to 1.0)
3. Or enable **Add Rounding Adjustment Line**
4. Retry processing

**If difference is significant**:
1. Open **BRC Connect Content** for the order
2. View **JSON Content**
3. Check external line prices vs. BC prices
4. Update BC prices if BC is wrong
5. Or adjust **Unit Price Rounding** / **Discount Rounding** in setup

**Disable total check** (not recommended):
1. Open **BRC Connect Setup**
2. Set **Disable Totals Check** = ON
3. Retry (warning: may hide pricing errors)

#### Cause 5: VAT Calculation Error

**Check:**
1. Open **BRC Connect Error List**
2. Find error: "VAT amount does not match"

**Solution:**

**Option A: Fix VAT Setup**
1. Verify VAT posting groups configured correctly
2. Check VAT % in BC matches external system
3. Ensure item VAT prod. posting groups correct

**Option B: Disable VAT Check**
1. Open **BRC Connect Setup**
2. Set **Disable VAT Check** = ON
3. Retry (system trusts external VAT calculations)

### Inventory Not Syncing to External System

**Symptom**: Inventory changes in BC not reflecting on website/POS

**Possible Causes and Solutions:**

#### Cause 1: Auto Send Disabled

**Check:**
1. Open **BRC Connect Setup**
2. Verify **Auto Send Inventory Update** = ON

**Solution:**
- Enable **Auto Send Inventory Update**
- Existing inventory changes may need manual sync

#### Cause 2: Records Stuck in Queue

**Check:**
1. Open **BRC Outgoing Sync Queue**
2. Filter **Synced** = FALSE
3. Check **Last Error** field

**Solution:**
- Review error messages
- Common issues: API down, item not found in external system
- Fix issue, then:
  - Select records
  - Actions → **Retry Sending**

#### Cause 3: Job Queue Not Running

**Check:**
1. Open **Job Queue Entries**
2. Filter **Object ID to Run** = 12073560 (BRC Process Outgoing Queue)
3. Verify Status = Ready and running

**Solution:**
- If not running: Set Status = Ready
- If errored: Review error, fix, set to Ready

#### Cause 4: Item Not in External System

**Check:**
1. Review error in **BRC Outgoing Sync Queue**: "Item not found"
2. Verify item exists in external system

**Solution:**
- Sync item master data first before inventory
- Enable **Auto Send Item Update** in BRC Connect Setup
- Or manually sync item from **Items** page

### Shipment Notifications Not Sending

**Symptom**: Posted shipments not notifying external system

**Possible Causes and Solutions:**

#### Cause 1: Auto Send Shipment Disabled

**Check:**
1. Open **BRC Connect Setup**
2. Verify **Auto Send Shipment** = ON

**Solution:**
- Enable **Auto Send Shipment**
- For past shipments, send manually from **Posted Sales Shipments**

#### Cause 2: Shipment Delay Not Expired

**Check:**
1. Open **BRC Connect Setup**
2. Check **Auto Send Shipment Delay Minutes** (e.g., 30)
3. Verify shipment posted less than delay minutes ago

**Solution:**
- Wait for delay to expire
- Or reduce delay minutes for faster notification
- Or send manually (bypasses delay)

#### Cause 3: Order Not From BRC Connect

**Check:**
1. Open **Posted Sales Shipment**
2. Check if order has **External ID** or **BRC Order** indicator
3. Only BRC-sourced orders auto-notify

**Solution:**
- Manually entered BC orders don't auto-notify (working as designed)
- To notify: Manually add to **BRC Outgoing Sync Queue**

### Payment Journal Lines Not Creating

**Symptom**: Orders process but no payment journal lines

**Possible Causes and Solutions:**

#### Cause 1: Payment Option Set to Ignore

**Check:**
1. Open **BRC Connect Setup**
2. Check **Payment Option** field

**Solution:**
- Change to **Multiple Payments** or **One Payment**
- Process new orders (setting not retroactive)

#### Cause 2: Payment Journal Not Configured

**Check:**
1. Open **BRC Connect Setup**
2. Verify **Payment Journal Template** and **Batch** filled

**Solution:**
- Configure journal template (usually "GENERAL")
- Create dedicated batch (e.g., "WEB")
- Retry orders

#### Cause 3: Payment Method Not Mapped

**Check:**
1. Open **BRC Connect Error List**
2. Find error: "Payment method not mapped"
3. Note external payment method code

**Solution:**
1. Open **BRC Mapping**
2. Add new mapping:
   - Source: (your source, e.g., SHOPIFY)
   - BRC Connect Type: PAYMENT
   - From: (external code, e.g., "credit_card")
   - To: (BC payment method, e.g., "CC")
3. Retry orders

### Performance Issues

**Symptom**: Orders processing slowly, job queue timeouts

**Possible Causes and Solutions:**

#### Cause 1: Process Entry Max Count Too High

**Check:**
1. Open **BRC Connect Setup**
2. Check **Process Entry Max Count**

**Solution:**
- Reduce to 100-200 (from higher value)
- Increase **No. of Minutes between Runs** to compensate

#### Cause 2: Complex Validation Rules

**Check:**
1. Review **BRC Content Type Field Setup**
2. Count number of field mappings (>100 may slow processing)

**Solution:**
- Remove unused field mappings
- Optimize custom validation codeunits (if any)
- Consider caching frequently accessed data

#### Cause 3: Large JSON Documents

**Check:**
1. Open **BRC Connect Entries**
2. View **Response Content** size
3. Check for orders with hundreds of lines

**Solution:**
- Increase job queue timeout in BC
- Split large orders in external system before sending
- Contact BrightCom for optimization guidance

#### Cause 4: Parallel Processing Not Enabled

**Check:**
1. Open **Job Queue Entries**
2. Count number of BRC Connect job entries

**Solution:**
- Create multiple job queue entries for same codeunit
- Stagger start times (0s, 10s, 20s, 30s apart)
- Monitor for lock contention

## Diagnostic Tools

### 1. BRC Connect Entries - HTTP Log

**Purpose**: View all HTTP requests/responses

**How to Use:**
1. Open **BRC Connect Entries**
2. Filter by date, type, status
3. View **Request Content** and **Response Content** fields
4. Use **JSON Viewer** control add-in for formatted view

**What to Look For:**
- Status = "Error": API communication failures
- Error Text: Specific error messages
- Response Content: External system error details

### 2. BRC Connect Content - Parsed Orders

**Purpose**: View orders after parsing, before creation

**How to Use:**
1. Open **BRC Connect Content**
2. Filter **BRC Connect Type** = DOCUMENT
3. Filter **Status** = Error (for failed orders)
4. View **JSON Content** for raw data
5. Navigate to **BRC Connect Values** (drill-down) for parsed fields

**What to Look For:**
- Status = "Error": Validation failures
- Error Text: Specific validation errors
- Missing values in Values table: Parsing issues

### 3. BRC Connect Values - Field Data

**Purpose**: View individual field values extracted from JSON

**How to Use:**
1. From **BRC Connect Content**, choose **Values** action
2. Review **Field Name** and **Value Text**
3. Check for missing required fields
4. Verify values match expected format

**What to Look For:**
- Empty values for required fields
- Incorrect value formats (e.g., text in numeric field)
- Values not matching BC options (e.g., unknown payment method)

### 4. BRC Connect Error List

**Purpose**: Central error dashboard

**How to Use:**
1. Open **BRC Connect Error List**
2. Filter by **Error Type** (Error vs. Warning)
3. Filter by **Date** (Today, This Week)
4. Sort by **Entry No.** or **Content ID**

**What to Look For:**
- Recurring errors: Systematic issue (fix root cause)
- One-off errors: Data quality issue (fix specific record)
- Error patterns: Configuration issue (adjust settings)

### 5. BRC Outgoing Sync Queue

**Purpose**: Monitor outbound synchronization

**How to Use:**
1. Open **BRC Outgoing Sync Queue**
2. Filter **Synced** = FALSE
3. Review **Last Error**
4. Check **Error Count** (high = repeated failures)

**What to Look For:**
- Old records not synced: Job queue not running
- High error count: Persistent API issue
- Specific items failing: Item not in external system

### 6. BRC Process Run Logs

**Purpose**: Job execution history and performance metrics

**How to Use:**
1. Open **BRC Process Run Logs**
2. Review **Start Date Time**, **End Date Time**, **Duration**
3. Check **No. of Entries Processed**
4. Review **Error Message** (if run failed)

**What to Look For:**
- Increasing duration: Performance degradation
- Failed runs: Job queue issues
- Low throughput: Configuration issue (increase max count)

### 7. Debug Mode

**Purpose**: Detailed logging for troubleshooting

**How to Enable:**
1. Open **BRC Connect Setup**
2. Set **Debug Mode** = ON
3. Process orders
4. Review detailed logs in entries

**Warning**: Debug mode logs full JSON including PII. Disable in production after troubleshooting.

**What Gets Logged:**
- Detailed HTTP headers
- Full request/response bodies
- Processing step timestamps
- Validation rule results

## Error Message Reference

### Document Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Customer not found: {email}" | No customer match | Create customer or enable auto-create |
| "Item not found: {sku}" | No item reference | Add item reference or enable auto-create |
| "Total amount mismatch: Expected {x}, Calculated {y}" | Line totals ≠ document total | Adjust tolerance or check pricing |
| "VAT calculation error: Expected {x}, Calculated {y}" | VAT amounts don't match | Verify VAT setup or disable VAT check |
| "Payment method not mapped: {method}" | External payment code unmapped | Add mapping in BRC Mapping |
| "Document already processed: {external ID}" | Duplicate order | Ignore if intentional, investigate if not |
| "Required field missing: {field}" | JSON missing required field | Fix external system data |

### HTTP Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Could not connect to remote server" | Network/DNS issue | Verify API Path, check network connectivity |
| "The remote server returned an error: (401) Unauthorized" | Invalid auth | Update bearer token |
| "The remote server returned an error: (403) Forbidden" | Access denied | Check IP whitelist, verify permissions |
| "The remote server returned an error: (404) Not Found" | Wrong endpoint | Verify API Path and type-specific paths |
| "The remote server returned an error: (429) Too Many Requests" | Rate limited | Reduce frequency, wait for rate limit reset |
| "The remote server returned an error: (500) Internal Server Error" | External system error | Check external system health, retry later |
| "The operation has timed out" | Request too slow | Increase timeout, check external system performance |

### Validation Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Quantity must be positive" | Zero or negative quantity | Fix external data |
| "Unit price must be positive" | Zero or negative price | Fix external data or BC price list |
| "Discount percent must be between 0 and 100" | Invalid discount | Fix external data |
| "Unit of Measure not found: {uom}" | Invalid UOM code | Create UOM or add mapping |
| "Location code not valid: {location}" | Unknown location | Create location or add mapping |
| "Dimension value not valid: {dimension}" | Unknown dimension | Create dimension value or remove mapping |

## Advanced Troubleshooting

### Enable Detailed Telemetry

For persistent issues, enable BC telemetry:

1. **BC Admin Center** → **Telemetry**
2. Filter for:
   - **Component**: BRC Connect
   - **Severity**: Error, Warning
3. Export telemetry for analysis
4. Share with BrightCom Support if needed

### SQL Profiling (On-Premises Only)

For on-premises BC installations:

1. Use SQL Server Profiler
2. Filter for BRC Connect tables (ID range 12073500-12073968)
3. Analyze slow queries
4. Contact BrightCom for index optimization

### Custom Logging

Add custom logging to event subscribers:

```al
[EventSubscriber(ObjectType::Codeunit, Codeunit::BRCCreateDocumentMth, 'OnBeforeCreateDocument')]
local procedure LogDocumentCreation(var Content: Record "BRC Connect Content")
begin
    // Custom logging here
    Message('Creating document for external ID: %1', Content."External ID");
end
```

### Contact Support

When contacting BrightCom Support, provide:

1. **BC Environment Details**
   - BC version
   - BRC Connect version
   - Environment type (sandbox/production)

2. **Error Details**
   - Error message (exact text)
   - Entry No. or Content ID with error
   - Timestamp when error occurred

3. **Configuration**
   - Export BRC Connect Setup (screenshot or export)
   - Relevant field mappings
   - Job queue configuration

4. **Logs**
   - BRC Connect Entries (filtered to timeframe)
   - Telemetry export
   - Screenshots of error messages

5. **Steps to Reproduce**
   - Detailed steps to trigger error
   - Sample JSON (sanitize PII)
   - Expected vs. actual behavior

## Preventive Measures

### Regular Maintenance

Schedule these tasks:

**Daily:**
- Review **BRC Connect Error List**
- Check **BRC Outgoing Sync Queue** for stuck records
- Monitor **Job Queue Entries** for failures

**Weekly:**
- Review **BRC Process Run Logs** for performance trends
- Clean up old test data
- Verify automation settings still appropriate

**Monthly:**
- Archive old **BRC Connect Entries** (or configure auto-delete)
- Review and update field mappings
- Test backup/restore procedures
- Review bearer token expiration

**Quarterly:**
- Performance tuning review
- User permission audit
- Documentation updates
- Training refresher for users

### Monitoring Alerts

Set up proactive monitoring:

1. **Email Alerts**
   - Enable in **BRC Connect Setup**
   - Sends email when errors exceed threshold

2. **BC Telemetry Alerts**
   - Configure in BC Admin Center
   - Alert on specific error patterns

3. **External System Webhooks**
   - Configure external system to alert on BC integration failures
   - Monitor external system's integration health dashboard

### Health Checks

Run these checks regularly:

```
// Orders processed today
BRC Connect Content
  WHERE Status = OK
  AND Created Date = TODAY
  COUNT: Should match expected order volume

// Errors today
BRC Connect Error List
  WHERE Date = TODAY
  COUNT: Should be < 5% of total orders

// Outbound queue size
BRC Outgoing Sync Queue
  WHERE Synced = FALSE
  COUNT: Should be < 100

// Job queue health
Job Queue Entries
  WHERE Object ID IN (12073522, 12073560)
  STATUS: All should be "Ready" or "In Process"
```

## Emergency Procedures

### Critical Outage

If BRC Connect is completely non-functional:

1. **Immediate Actions**
   - Set **Integration Active** = OFF (stops processing)
   - Alert warehouse staff (orders won't auto-process)
   - Switch to manual order entry process

2. **Assess Impact**
   - Check BC platform health (Microsoft 365 Service Health)
   - Check external system health
   - Review recent changes (BC updates, config changes)

3. **Engage Support**
   - Contact BrightCom Support (critical issue)
   - Provide environment details and error logs
   - Request escalation if business-critical

4. **Workaround**
   - Manual order entry from external system
   - Export orders, import via RapidStart
   - Temporary alternative integration (if available)

5. **Recovery**
   - Follow support guidance
   - Test in sandbox first if possible
   - Re-enable **Integration Active**
   - Monitor closely after recovery

### Data Corruption

If data integrity issue suspected:

1. **Stop Processing**
   - Set **Integration Active** = OFF
   - Stop relevant job queue entries

2. **Assess Scope**
   - Identify affected records
   - Determine timeframe of corruption
   - Check for pattern (specific type, source, date range)

3. **Isolate Issues**
   - Mark corrupted records as **Ignored** in BRC Connect Content
   - Prevent further damage

4. **Fix and Retry**
   - Correct underlying issue (config, mapping, external data)
   - Reset and reprocess clean data
   - Monitor for recurrence

5. **Post-Incident Review**
   - Document root cause
   - Implement preventive measures
   - Update procedures to prevent recurrence

## Frequently Asked Questions

See [FAQ](faq) for common questions and answers.

## Next Steps

- [FAQ](faq) - Frequently asked questions
- [Reference](../reference/) - Technical reference and permissions
- [Setup](../setup/) - Configuration guide
