---
title: BRC Logistics 25.0.30544.0
categories: [BRC Logistics, ReleaseNotes]
description: Sello integration pagination enhancement and tracking link rollback
date: 2026-04-08
---

## Release Summary

| Feature                                      | Description                                                                 |   ID |
| -------------------------------------------- | --------------------------------------------------------------------------- | ---: |
| Sello Integration Pagination Enhancement    | Improved handling of marketplace returns with automatic pagination support | 26425 |
| Rollback: Multiple Package Tracking Links   | Reverted to single tracking number per warehouse shipment                  | 22547 |

## Detailed Feature Information

---

### Sello Integration Pagination Enhancement (#26425)

Improved handling of returns from marketplace platforms via Sello integration. The system now properly manages large volumes of return orders by implementing pagination support. 

When retrieving return orders from Sello, if more than 100 orders are available, the system automatically creates follow-up requests to retrieve all data across multiple pages. Additionally, the API query filter was optimized to efficiently retrieve both accepted and canceled returns in a single request.

**Business Value:** Ensures reliable processing of all return orders from marketplace platforms, preventing data loss when high volumes of returns need to be processed. This is particularly important during high-traffic periods or when processing historical return data.

**Technical Details:**
- Added automatic pagination for Sello API responses exceeding 100 orders
- Optimized filter syntax for retrieving multiple return statuses
- Adjusted page size from 200 to 100 items to align with API best practices
- Automatic creation of warehouse document chains for multi-page result sets

---

### Rollback: Multiple Package Tracking Links (#22547)

This release removes previously added functionality that enabled multiple package tracking links in warehouse shipment headers. The system has been reverted to support a single tracking number per warehouse shipment.

**Background:** The multiple tracking links feature was originally implemented to support tracking information from third-party logistics providers via return management services. However, during testing and integration with warehouse management systems, incompatibilities were discovered with how tracking numbers are processed and stored in warehouse transaction headers.

**Impact:** 
- Warehouse shipments now support one tracking number per shipment, stored in the standard "Shipment Tracking No." field
- This ensures proper integration with external warehouse management systems and logistics partner APIs
- Customers requiring multiple tracking numbers for complex shipments should contact support for alternative solutions

**Reason for Rollback:** Testing revealed that the multiple tracking links implementation conflicted with warehouse management system integrations that expect tracking information in a specific single-field format, causing issues with shipment notice processing.

## Breaking Changes

No breaking changes in this release.

## Bugfixes

No additional bug fixes in this release.
