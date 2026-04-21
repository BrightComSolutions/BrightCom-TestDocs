---
title: BRC Logistics 19.4.30434.0
categories: [BRC Logistics, ReleaseNotes]
description: WMS integration enhancements including Schipt address support, Sello partial returns, InReturn improvements, and compensation margin tracking
date: 2026-04-02
---

## Release Summary

| Feature | Description | ID |
| ------- | ----------- | --: |
| Multiple Addresses for Schipt WMS | Restore required address data in Sales Order messages to Schipt | 25961 |
| Compensation Margin Tracking | Link InReturn compensations to original sales lines for accurate margin reporting | 25848 |
| Partial Sello Returns | Process multiple return messages from Sello correctly without duplicate prevention blocking | 24125 |
| InReturn Replacement Orders | Create matching return and sales orders for replacement scenarios | 25238 |
| Auto-Posting Line Control | Enhanced control over automatic posting of shipments and receipts at line level | 23958 |
| BitLog Supplier Reference | Support supplier reference attribute on item level for BitLog integration | 14867 |

## Detailed Feature Information

---

### Multiple Addresses for Schipt WMS (#25961)

**Business Value:** 
Restores compatibility with Schipt WMS by reintroducing required address data in outbound Sales Order messages. During the refactoring from BCS Warehouse Connect to BRC Logistics, address structures were inadvertently removed from the message payload, causing integration failures.

**What's New:**
Sales Order messages sent to Schipt now include:
- Sell-to Address from the Sales Order
- Company Information Address (sender company details)

Both addresses are included as structured nodes in the JSON/XML payload, matching the historical BCS Warehouse Connect format to ensure full compatibility with Schipt's WMS requirements.

---

### Compensation Margin Tracking (#25848)

**Business Value:**
Ensures accurate product-level margin reporting by allocating compensation directly to the affected item instead of posting it as a separate overhead line. Previously, compensations from InReturn were created as standalone item charge lines without connection to the original sales line, distorting contribution margin analysis per item, brand, and SKU.

**What's New:**
When compensations are received from InReturn, the system now:
- Uses provided identifiers (salesOrderNumber, salesOrderLineNumber, itemNumber) to match the original posted sales invoice line
- Creates a financial-only Value Entry linked to the original Item Ledger Entry
- Adjusts sales amounts and margins without affecting inventory quantities
- Ensures no new Item Ledger Entries are created (no physical return)

**Configuration:**
A setup flag has been added to the InReturn integration setup to control whether compensation should be linked to the original sales line. This ensures backward compatibility for existing customers.

---

### Partial Sello Returns (#24125)

**Business Value:**
Ensures reliable and transparent handling of partial returns from Sello via BRC Logistics. Without this enhancement, later return messages (return 2, 3, etc.) risk being ignored or blocked by standard duplicate prevention logic, leading to incomplete return visibility and incorrect financial data.

**What's New:**
When multiple return messages for the same original sales order lines are received from Sello, the system now:
- Processes each message independently
- Correctly accumulates returned quantities per original order line
- Creates a new return document for each message, even if previous returns are still open
- Only processes lines with Quantity Returned greater than 0

The logic mirrors the proven approach used for Ongoing shipments, where repeated quantities for the same line are handled incrementally. No copy document functionality is used, and no standard duplicate-return prevention logic blocks the process.

**Scope:**
Applies only to return messages originating from Sello via BRC Logistics. Does not change standard Business Central return order behavior for manually created returns.

---

### InReturn Replacement Orders (#25238)

**Business Value:**
Streamlines the handling of replacement orders from InReturn by automatically creating matching return and sales orders with correct amounts, eliminating manual processing steps.

**What's New:**
When a Replacement Order is received from InReturn with the "No Return of Item" flag:
- A return order is automatically created in Business Central
- A matching sales order is created for the replacement
- Amounts are correctly matched between the two documents
- Logistics codes are calculated appropriately for both orders

This ensures proper financial tracking and inventory management for replacement scenarios where the original item may not be physically returned.

---

### Auto-Posting Line Control (#23958)

**Business Value:**
Provides enhanced control over the built-in feature for automatically posting shipments and receipts, allowing configuration at the individual line level rather than document level.

**What's New:**
Options have been added to the setup to disable receival and shipment posting functions per line, providing more granular control over which lines should be automatically posted versus manually handled. This allows for workflows where certain item types or special handling scenarios require manual intervention.

---

### BitLog Supplier Reference (#14867)

**Business Value:**
Enables tracking of supplier-specific reference codes at the item level for BitLog WMS integration, improving traceability and matching with supplier data during receiving operations.

**What's New:**
Support for SupplierReference attribute on the item line level for inbound warehouse receipts. This attribute can now be captured and transmitted to BitLog during the receiving process, enabling better reconciliation with supplier advance shipping notices and packing lists.

## Breaking Changes

No breaking changes in this release. All enhancements are additive or controlled via configuration flags to maintain backward compatibility.
