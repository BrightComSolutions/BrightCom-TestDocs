---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
weight: 50
description: >
  Common issues, error messages, and resolution steps for BRC Logistics integration problems.
---

## Overview

This guide helps diagnose and resolve common BRC Logistics integration issues. Topics covered:

- Error message interpretation
- Transaction status issues
- Connection and authentication problems
- Data synchronization errors
- Performance and job queue issues

## Diagnostic Approach

### 1. Identify the Issue

**Key Questions:**
- Which document type is affected? (Sales Order, Purchase Order, Return, Inventory)
- What is the document status? (New Request, Document Not Sent, Sent, etc.)
- Are there error messages? (Check Error Description field)
- Is it affecting all transactions or specific ones?
- When did the issue start?

### 2. Check Transaction Details

1. Navigate to **BRC Logi Whse. Transactions**
2. Filter to "Requires Attention" or locate problematic transaction
3. Open transaction card
4. Review:
   - **Error Count** and **Error Description**
   - **Document Status**
   - **Last Updated** timestamp
   - **Request Content** (Download Content action)
   - **Response Content** (Download Response action)

### 3. Verify Configuration

1. Open **BRC Logi Setup**
2. Locate setup for affected location
3. Verify:
   - **Enabled** = ✓
   - **Integration Engine** = correct platform
   - **Credentials** are current (Username/Password/Key)
   - **Webservice URL** is correct
   - **Job Queue Entry** status = "Ready" (not "On Hold" or "Error")

## Common Error Messages

### Authentication Errors

#### "401 Unauthorized"

**Symptom**: Transactions fail with HTTP 401 error

**Cause**: Invalid or expired credentials

**Resolution**:
1. Verify credentials in **BRC Logi Setup** → **System** tab
2. For OAuth integrations: Token may be expired, system should auto-refresh
3. Test connection: Click **Actions** → **Check For Change**
4. If using file-based integration: Verify file share permissions
5. Contact WMS administrator to verify API user account is active

#### "403 Forbidden"

**Symptom**: Authentication succeeds but access denied

**Cause**: Account lacks necessary permissions in WMS

**Resolution**:
1. Contact WMS administrator to verify API user has required permissions
2. For OAuth: Verify **OAuth Scope** includes necessary permissions
3. Check WMS platform documentation for required permission sets

### Connection Errors

#### "Request Timeout"

**Symptom**: Transactions fail with timeout error after 60-120 seconds

**Cause**: Network connectivity issue or WMS API performance problem

**Resolution**:
1. Check WMS platform status page (if available)
2. Verify internet connectivity from BC environment
3. Test WMS API directly (use Postman or similar tool)
4. Contact WMS support if API is responding slowly
5. Check firewall rules allow outbound HTTPS (port 443)

#### "Could not resolve host"

**Symptom**: DNS resolution fails for WMS API endpoint

**Cause**: Incorrect URL or DNS issue

**Resolution**:
1. Verify **Webservice URL** spelling in setup
2. Test URL in web browser
3. Ensure URL includes protocol (`https://`)
4. Check for typos (e.g., `.com` vs `.co`)

### Data Mapping Errors

#### "Item not found in WMS"

**Symptom**: Sales/purchase order fails with "item not found" error

**Cause**: Item SKU not synchronized to WMS

**Resolution**:
1. Navigate to **BRC Logi Item SKU List**
2. Search for the item number
3. If not found: Click **Actions** → **Generate Item SKU List** on setup page
4. Verify **Item SKU Option** in setup matches WMS expectation
5. Check **Item Variant Delimiter** setting (e.g., `-` vs `_`)
6. Manually send item to WMS: **Actions** → **Create Item Request**

#### "Unit of Measure not supported"

**Symptom**: Transaction fails due to UoM mismatch

**Cause**: BC unit of measure doesn't exist in WMS

**Resolution**:
1. Verify item unit of measure configured in WMS
2. Check **Item Units of Measure** in BC for item
3. Adjust **Item SKU Option** to include UoM if needed
4. Create mapping in **BRC Logi Mapping** for UoM codes

#### "Customer not found"

**Symptom**: Sales order fails with customer not found error

**Cause**: Customer master data not synced to WMS

**Resolution**:
1. Check if **Integrate Customer** enabled in setup
2. Manually trigger customer export if supported by platform
3. For platforms without customer sync: Manually create customer in WMS
4. Verify customer number format matches WMS requirements

### Quantity and Posting Errors

#### "Cannot ship more than ordered"

**Symptom**: Shipment notice fails to update sales order

**Cause**: WMS shipped quantity exceeds ordered quantity

**Resolution**:
1. Verify **Allow Over Shipment** setting in setup
2. Adjust **Tolerance % - Over Shipment** if variance is acceptable
3. Investigate WMS picking error if quantity is significantly wrong
4. Manually adjust "Qty. to Ship" on sales line if one-time exception

#### "Cannot receive more than ordered"

**Symptom**: Receival notice fails to update purchase order

**Cause**: WMS received quantity exceeds ordered quantity

**Resolution**:
1. Verify **Allow Over Receival** setting in setup
2. Adjust **Tolerance % - Over Receival** if variance is acceptable
3. For intentional over-receipt: Manually update purchase order line quantity
4. Contact vendor if consistent over-receiving occurs

#### "Posting failed: [Error Message]"

**Symptom**: Auto-posting fails after successful WMS confirmation

**Cause**: BC posting validation error (posting groups, dimensions, inventory, etc.)

**Resolution**:
1. Review specific posting error in **Error Description**
2. Common causes:
   - **Insufficient inventory**: Check item availability
   - **Missing posting groups**: Verify customer/vendor posting setup
   - **Dimension errors**: Check default dimensions
   - **Blocked customer/vendor**: Unblock or adjust settings
3. Disable **Post Shipment**/**Post Receival** temporarily
4. Manually post after resolving underlying issue
5. Re-enable auto-posting once fixed

### Item Tracking Errors

#### "Serial Number already exists"

**Symptom**: Posting fails due to duplicate serial number

**Cause**: WMS sent serial number that already exists in BC

**Resolution**:
1. Verify serial number truly is duplicate: Search **Item Ledger Entries**
2. If WMS error: Contact WMS administrator to correct serial assignment
3. If BC data error: Correct existing item ledger entry or reservation
4. For return scenarios: Verify system configured to reuse serial numbers

#### "Lot Number not found on purchase order"

**Symptom**: Receival fails because lot number missing

**Cause**: WMS didn't provide lot number for lot-tracked item

**Resolution**:
1. Verify WMS configured to track lot numbers for this item
2. Check **Item Tracking Code** on item in BC
3. Verify setup enables lot tracking: **Batch No. on Receival** = ✓
4. Contact WMS support if lot tracking not working correctly

#### "Quantity mismatch for tracked item"

**Symptom**: Tracked quantity doesn't match line quantity

**Cause**: Sum of serial/lot quantities ≠ handled quantity

**Resolution**:
1. Download response content and review tracking details
2. Verify WMS sent complete tracking information
3. Check for partial package scenarios
4. Manually adjust tracking if WMS data is incomplete

### Return Order Errors

#### "Original invoice not found"

**Symptom**: Return order creation fails

**Cause**: Return references invoice that doesn't exist in BC

**Resolution**:
1. Verify **BRC Logi Origin Invoice No.** field on return line
2. Check if invoice exists: Search **Posted Sales Invoices**
3. If invoice deleted: Manually create return order without reference
4. If returns platform error: Verify platform configured with correct invoice numbers

#### "Return quantity exceeds invoiced quantity"

**Symptom**: Return validation fails with **Enhanced Return Check** enabled

**Cause**: Attempting to return more than originally invoiced

**Resolution**:
1. Review **BRC Logi Return Exchange Entry** table for prior returns
2. Verify original invoice quantity vs. cumulative return quantity
3. If legitimate: Disable **Enhanced Return Check** temporarily
4. Investigate fraudulent return attempt if quantities suspicious

#### "Return fee not added"

**Symptom**: Expected return fee missing from return order

**Cause**: Configuration or condition not met

**Resolution**:
1. Verify **Add Item On Return** configured in setup
2. Check **BRC Logi Logistics Reason** for return reason code
3. Verify **Return Fee Condition** table view evaluates to true
4. Check **Return Fee Max Count** not exceeded
5. Review **Add Fee on Return** setting on reason code

### Inventory Synchronization Errors

#### "Item journal posting failed"

**Symptom**: Inventory balance/adjustment doesn't post to item ledger

**Cause**: Item journal validation error

**Resolution**:
1. Navigate to **Item Journals**
2. Select template and batch from setup
3. Review journal lines for errors
4. Common issues:
   - **Negative inventory**: Item not configured for negative inventory
   - **Missing location**: Verify location code exists
   - **Blocked item**: Unblock item
5. Manually post journal after fixing errors
6. Re-enable **Auto-Post Adjustment**/**Auto-Post Balance**

#### "Item not in journal"

**Symptom**: Expected inventory adjustment missing from journal

**Cause**: Item filtering or journal cleanup settings

**Resolution**:
1. Check **Item Available Filter View** in setup - item may be excluded
2. Verify **Clear Phys. Inv. on Both Zero** not removing needed entries
3. Check **Add Missing Items To Journal** setting for balance sync
4. Review **Item Enabled** field or filter configuration

## Document Status Issues

### Stuck in "Document Not Sent"

**Symptom**: Transaction created but never transmitted

**Cause**: Auto-send disabled or job queue not running

**Resolution**:
1. Check **Auto-Send on Shipment/Receival Request** in setup
2. Verify **Job Queue Entry** status = "Ready"
3. Manually send: Open transaction → **Actions** → **Send Request**
4. Check **Max transactions per Run** not limiting throughput
5. Review job queue error log for failures

### Stuck in "Sent to WMS"

**Symptom**: Transaction sent but never acknowledged by WMS

**Cause**: WMS processing delay or error

**Resolution**:
1. Wait 15-30 minutes (WMS may be processing)
2. Check WMS platform directly for order status
3. Review WMS error logs if accessible
4. Download response content to see if WMS sent error message
5. Contact WMS support if stuck > 2 hours

### Stuck in "Shipment/Receival Finished"

**Symptom**: WMS confirmation received but not processed in BC

**Cause**: Processing error or auto-process disabled

**Resolution**:
1. Open transaction card
2. Click **Actions** → **Process Response**
3. Review error if processing fails
4. Verify job queue running: **Actions** → **Run Job Queue Job** on setup
5. Check **Error Max Count** - may have exceeded retry limit

## Job Queue Issues

### Job Queue Not Running

**Symptom**: No automated processing occurring

**Resolution**:
1. Navigate to **Job Queue Entries**
2. Find entry for **BRC Logi Whse. Job Scheduler**
3. Check **Status** field:
   - **On Hold**: Change to "Ready"
   - **Error**: Review error message, fix issue, set to "Ready"
   - **Ready**: Should be running - check **Last Ready State** timestamp
4. Verify **Recurring Job** = ✓
5. Check **No. of Minutes between Runs** = 15 (or desired interval)
6. Ensure at least one day selected (Monday-Sunday)

### Job Queue Running Slowly

**Symptom**: Processing delayed, backlog building

**Resolution**:
1. Check **Max transactions per Run** setting - may be too low
2. Increase job queue capacity: **Job Queue Entries** → **Actions** → **Set Status to Ready** for additional servers
3. Reduce polling frequency temporarily if WMS can't keep up
4. Review **Delete Old Transactions after** - archiving may improve performance

## Performance Issues

### Transaction List Slow to Load

**Symptom**: **BRC Logi Whse. Transactions** page slow to open

**Resolution**:
1. Always use filters - don't load all transactions
2. Filter by **Logistics Code** (location)
3. Filter by **Document Type**
4. Use date filters: **Warehouse Date Time** or **Last Updated**
5. Archive old transactions per retention policy

### WMS API Slow

**Symptom**: All transactions processing slowly

**Resolution**:
1. Check WMS platform status/performance
2. Contact WMS support for API performance issues
3. Consider increasing **No. of Minutes between Runs** to reduce API load
4. Batch orders: Release multiple sales orders together during off-peak hours

## Logging and Diagnostics

### Viewing Request Payloads

1. Open **BRC Logi Whse. Trans. Card**
2. Click **Actions** → **Download Content**
3. Save XML/JSON file
4. Open in text editor or XML/JSON viewer
5. Review for data accuracy

### Viewing Response Payloads

1. Open **BRC Logi Whse. Trans. Card**
2. Click **Actions** → **Download Response**
3. Save XML/JSON file
4. Review WMS response for error messages or unexpected data

### Enabling Debug Logging

Some platforms support additional logging:

1. Check platform-specific documentation
2. Look for debug/verbose logging settings in **BRC Logi Setup**
3. Enable temporarily for troubleshooting
4. Disable after issue resolved (to avoid performance impact)

## Escalation Process

### When to Contact BrightCom Support

Contact BrightCom if:
- Error occurs in BRC Logistics codeunit (error references object ID 12073xxx-12074xxx)
- Integration worked previously and now fails (after BC update)
- Configuration questions not covered in documentation
- Feature requests or integration enhancements

### When to Contact WMS Support

Contact WMS provider if:
- WMS API returns error messages
- Orders stuck in WMS processing
- WMS not sending confirmations back to BC
- WMS item/customer/vendor master data issues

### When to Contact Microsoft Support

Contact Microsoft if:
- Business Central platform issues
- Job queue framework problems
- BC posting errors (not WMS-related)
- Permission or licensing issues

## Preventive Measures

### Regular Monitoring

- Review **Requires Attention** filter daily
- Monitor error email notifications
- Check job queue status weekly
- Review transaction throughput monthly

### Maintenance Tasks

- Archive old transactions quarterly
- Review and update reason code mappings
- Test connectivity after credential changes
- Verify item SKU list after major item updates
- Update credentials before expiration (OAuth tokens)

### Best Practices

- Test in sandbox before production changes
- Document custom configurations
- Maintain WMS admin contact information
- Keep integration documentation current
- Train backup staff on error resolution

## FAQ

See [FAQ Page](faq/) for frequently asked questions.

## Next Steps

- [Setup Guide](../setup/) - Review configuration
- [User Guide](../user-guide/) - Daily operations
- [Reference Documentation](../reference/) - Technical details
- [Contact Support](#escalation-process) - Get help
