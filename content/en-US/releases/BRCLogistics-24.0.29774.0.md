---
title: BRC Logistics 24.0.29774.0
categories: [BRC Logistics, ReleaseNotes]
description: Major WMS Integration and Return Handling Enhancements
date: 2026-03-11
---

## Release Summary

| Feature         | Description           |   ID |
| --------------- | --------------------- | ---: |
| Sello Partial Returns | Correct handling of partial returns across multiple messages | #24125 |
| POD Sales Line Tokens | Send Token IDs for personalized item picking | #24278 |
| Way of Delivery Mapping | Enhanced Ongoing integration with Code and Name mapping | #24256 |
| Transfer Order Status Check | Add warehouse status check action to transfer orders | #24293 |
| Snap-fulfill WMS Integration | Connect new UK 3PL WMS system | #20569 |

## Detailed Feature Information

---

### Sello Partial Returns (#24125)

Ensures partial returns from Sello are processed correctly across multiple return messages without duplicate prevention blocking the flow.

Customers using Sello via BRC Logistics (such as those with monthly invoicing) can now handle scenarios where return data arrives incrementally across multiple messages for the same order. Each return message creates a new return document with only the quantities specified in that message, allowing proper accumulation without triggering duplicate-return prevention logic.

This approach mirrors the proven logic used for Ongoing shipments and is critical for customers who cannot use copy document functionality due to external logistics control and monthly invoicing requirements.

**Benefits:**
- Reliable partial return processing
- No manual intervention required for incremental returns
- Supports monthly invoicing workflows

---

### POD Sales Line Tokens (#24278)

Send Sales Order Line Token IDs through BRC Logistics to ensure correct picking of personalized POD (Print-on-Demand) items in Bitlog.

This enhancement enables the transfer of unique Token identifiers from Business Central sales order lines to the Bitlog WMS on a per-line basis. Each personalized item can now be distinctly identified during warehouse picking, preventing mix-ups and ensuring the correct customized item is selected for each order line.

The Token field on sales lines is populated by upstream processes, and BRC Logistics now includes this information in the outbound Bitlog integration payload.

**Benefits:**
- Accurate picking of personalized items
- Reduced fulfillment errors for POD products
- Critical enabler for POD project testing and go-live

---

### Way of Delivery Code and Name Mapping (#24256)

Enhance Ongoing integration by mapping both Code and Name for Way of Delivery, ensuring successful order export and go-live readiness.

The Ongoing WMS connector now supports both Code and Name values for Way of Delivery Type mapping. Previously, only the Code was mapped, which was insufficient for successful order export. The system now:
- Maps both Code (extra mapping 1010) and Name (extra mapping 1026)
- Supports CreateOrFind mode: finds existing records by Code or Name, creates if missing
- Supports CreateOrUpdate mode: updates existing records with both values
- Sends both fields to Ongoing on outbound order export

This enhancement is backward-compatible and does not modify existing carrier or shipment method mappings.

**Benefits:**
- Successful order export to Ongoing WMS
- Flexible record identification and creation
- Supports critical customer go-live requirements

---

### Transfer Order Status Check (#24293)

Add "Check Whse. Status" action to Transfer Orders for improved warehouse visibility.

This enhancement extends the existing warehouse status checking functionality to Transfer Orders, enabling users to quickly verify warehouse processing status directly from the transfer order document.

**Benefits:**
- Improved warehouse operation visibility
- Faster status verification
- Consistent user experience across document types

---

### Snap-fulfill WMS Integration (#20569)

Integration with new UK-based 3PL warehouse using Snap-fulfill WMS system.

This development adds support for connecting to customer warehouse operations using the Snap-fulfill WMS platform. Key functionality includes:
- Handling SHOL (negative adjustments from main location) and SREL (positive adjustments to main location) move types via item reclassification journal instead of item journal
- Proper routing to correct warehouse locations
- Configurable move type processing to minimize hard-coding

The integration supports expanded warehouse operations in the UK market with proper inventory movement tracking and location management.

**Benefits:**
- Expanded warehouse network capabilities
- Proper inventory flow for UK operations
- Flexible move type configuration

## Breaking Changes

No breaking changes in this release.

## Bug Fixes

None
