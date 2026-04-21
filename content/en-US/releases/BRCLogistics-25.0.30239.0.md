---
title: BRC Logistics 25.0.30239.0
categories: [BRC Logistics, ReleaseNotes]
description: Multi-WMS enhancements including Schipt, Deposco, and Bitlog integrations, Sello return handling improvements, and configurable auto-posting controls
date: 2026-03-25
---

## Release Summary

| Feature                                          | Description                                                                                                                              |   ID |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ---: |
| Restore Multiple Addresses in Schipt Sales Orders | Sales Order messages to Schipt now include Sell-to and Company Information addresses again, restoring required WMS compatibility       | 25961 |
| Deposco Shipment Notice Line Expansion          | Enhanced Deposco WMS integration to handle shipment notices with more than 10 lines, supporting larger order fulfillment scenarios     | 18116 |
| Supplier Reference Attribute for Bitlog          | Added Supplier Reference attribute functionality at item level for Bitlog WMS integration, enabling better supplier tracking           | 14867 |
| Configurable Auto-Posting per WMS Line           | Added configuration options to selectively disable automatic shipment and receipt posting per line in WMS setup                         | 23958 |
| Correct Handling of Partial Sello Returns        | Ensures partial returns from Sello are processed correctly across multiple return messages without duplicate prevention blocking flow   | 24125 |

## Detailed Feature Information

---

### Restore Multiple Addresses in Schipt Sales Orders (#25961)

Sales Order messages sent to Schipt WMS now include Sell-to and Company Information addresses again, restoring required WMS compatibility that was inadvertently removed during the BRC Logistics refactoring.

**Background:** Previously in BCS Warehouse Connect, multiple addresses were sent to Schipt for proper order processing. This functionality was changed when the app was refactored as BRC Logistics, creating compatibility issues with Schipt WMS configurations.

**What's New:**
- Sales Order messages now include all required address types
- Sell-to address information is properly formatted and transmitted
- Company Information addresses are included in the message structure
- Full restoration of pre-refactoring address handling behavior

**Impact:** Customers using Schipt WMS integration will experience improved order processing reliability and compatibility with Schipt's address requirements.

---

### Deposco Shipment Notice Line Expansion (#18116)

Enhanced Deposco WMS integration to handle shipment notices with more than 10 lines, supporting larger order fulfillment scenarios and removing previous line count limitations.

**What's New:**
- Shipment notice processing updated to accommodate unlimited line items
- Message parsing optimized for higher line counts
- Improved performance for large shipment notices
- Support for high-volume warehouse operations

**Impact:** Customers integrating with Deposco WMS can now process shipment notices of any size without truncation or errors, supporting growing business volumes.

---

### Supplier Reference Attribute for Bitlog (#14867)

Added Supplier Reference attribute functionality at item level for Bitlog WMS integration, enabling better supplier tracking and item identification in warehouse operations.

**What's New:**
- New Supplier Reference attribute available on item messages
- Attribute can be configured and transmitted at the line level
- Enhanced item data structure for Bitlog integration
- Improved supplier tracking capabilities in warehouse processes

**Impact:** Customers using Bitlog WMS integration gain enhanced supplier reference tracking, improving traceability and warehouse management data quality.

---

### Configurable Auto-Posting per WMS Line (#23958)

Added configuration options to selectively disable automatic shipment and receipt posting per line in WMS setup, providing greater control over warehouse posting workflows.

**What's New:**
- New setup options to disable auto-posting for receipts per line type
- New setup options to disable auto-posting for shipments per line type
- Granular control over posting behavior by line configuration
- Flexibility to customize posting workflows based on business requirements

**Impact:** Customers can now fine-tune their warehouse posting automation, choosing which line types should auto-post and which require manual intervention, supporting diverse warehouse operation models.

---

### Correct Handling of Partial Sello Returns (#24125)

Ensures partial returns from Sello are processed correctly across multiple return messages without duplicate prevention logic blocking the flow. This enhancement properly accumulates returned quantities across multiple return messages for the same original order lines.

**Background:** When customers initiate multiple partial returns for the same sales order through Sello, the system needs to process each return message independently while correctly tracking accumulated quantities. Previous logic could prevent legitimate partial returns from processing.

**What's New:**
- Multiple return messages for the same sales order lines are processed independently
- Returned quantities are correctly accumulated per original order line
- Duplicate prevention logic updated to allow legitimate partial returns
- Improved handling of canceled order quantities in return processing

**Impact:** Critical for e-commerce operations where customers make multiple partial returns. Ensures smooth return processing without manual intervention or blocked transactions.

## Breaking Changes

No breaking changes in this release.

## Bug Fixes

- **#25961**: Fixed missing address information in Schipt Sales Order messages that was removed during BRC Logistics refactoring
