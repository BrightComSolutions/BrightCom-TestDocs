---
title: BRC Extended Order Management 25.0.30540.0
categories: [BRC Extended Order Management, ReleaseNotes]
description: Back Order Management extended to Transfer Orders
date: 2026-04-08
---

## Release Summary

| Feature                                      | Description                                                          |   ID |
| -------------------------------------------- | -------------------------------------------------------------------- | ---: |
| Back Order Management for Transfer Orders    | "No Back Order" functionality now available for Transfer Orders     | 22860 |

## Detailed Feature Information

---

### Back Order Management for Transfer Orders (#22860, #22859)

The "No Back Order" functionality, previously available only for Sales Orders, has now been extended to Transfer Orders. When a Transfer Order is shipped and received, any lines that were not fully processed are automatically removed from the order, allowing it to be completed according to Business Central's standard completion process.

**What This Enables:**

Previously, users could only use the "No Back Order" shipping advice option on Sales Orders to automatically clean up partially fulfilled orders. Now this same capability is available for Transfer Orders, enabling:

- **Automatic line cleanup**: Unfulfilled transfer lines are automatically deleted after partial shipments/receipts
- **Order completion**: Transfer Orders can be marked as complete even when not all originally planned quantities were moved
- **Consistent workflow**: The same "No Back Order" behavior users rely on for Sales Orders now works identically for inter-location transfers

**Business Value:** Streamlines warehouse transfer management by applying familiar Sales Order back order handling to inter-location transfers. This eliminates manual cleanup of partially fulfilled transfer orders and provides consistent order management across different document types.

**Extends Existing Functionality:** This builds on the existing Back Order Management feature in BRC Extended Order Management by applying the same Shipping Advice logic (Complete/Partial/No Back Order) to Transfer Orders that was previously only available for Sales Orders. Users familiar with the "No Back Order" option on sales documents can now use the same approach for managing warehouse transfers between locations.

## Breaking Changes

No breaking changes in this release.

## Bugfixes

No bug fixes in this release.
