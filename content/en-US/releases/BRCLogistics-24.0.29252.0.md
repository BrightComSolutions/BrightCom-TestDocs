---
title: BRC Logistics 24.0.29252.0
categories: [BRCLogistics, ReleaseNotes]
description: WMS status propagation for split documents and Deposco WMS integration features
date: 2026-02-23
---

## Release Summary

| Feature                                       | Description                                                                                                 |   ID |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---: |
| Propagate External WMS Status to Child Documents | Ensure all return and exchange child documents inherit the External WMS status from their parent         | 24046 |
| Deposco US WMS Integration                    | New integration features for Deposco WMS system                                                             | 23425 |

## Detailed Feature Information

---

### Propagate External WMS Status to Child Documents (#24046)

When customers perform a return and exchange in the same return ticket in InReturn, the logistics logic splits this flow into multiple Business Central documents. These include a main return document (the "mother") and several related documents such as return orders, exchange orders, and replacement-related returns (the "children").

Previously, only the mother document received updates to the External WMS status from InReturn. As a result, child documents remained without the correct status, preventing job queues from running automatically and causing delays, manual intervention, and risk of incorrect stock levels.

This feature ensures that when InReturn updates the External WMS status on the mother document, the system automatically propagates the same status to all related child documents created as part of the split process. This ensures that all documents reflect the same warehouse processing state and can be handled uniformly by downstream automation.

This is especially critical when the External WMS status changes to Closed, as a job queue relies on this status to automatically receive and post return orders in Business Central.

### Deposco US WMS Integration (#23425)

New integration features for Deposco WMS system to support warehouse management operations. This integration enables seamless communication between Business Central and Deposco for inventory management, order fulfillment, and warehouse operations.

## Breaking Changes

No breaking changes in this release.

## Bugfixes

None in this release.
