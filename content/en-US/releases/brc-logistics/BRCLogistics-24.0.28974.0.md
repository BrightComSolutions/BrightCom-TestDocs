---
title: BRC Logistics 24.0.28974.0
categories: [BRC Logistics, ReleaseNotes]
description: Multiple enhancements including InReturn improvements, WMS integrations, performance optimizations, and bug fixes
date: 2026-02-18
---

## Release Summary

| Feature | Description | ID |
|----------------------------------|---------------------------------------------------------------|----------:|
| Version Driven Updates | Planned development work tied to specific version releases | 18314 |
| Performance Improvements | Enhanced system performance through optimized indexing | 23296 |
| Deposco US WMS Integration | Webhook-based integration with Deposco warehouse management system for US operations | 23436 |
| Return Order Status Management | Status tracking for posting operations on return orders | 23435 |
| Unit Conversion Enhancement | Automated conversion from metric (meter) to imperial (inch) measurements | 23208 |
| External Seller Reference | Added external seller reference to InReturn order and invoice data with configurable field mapping | 23305 |


## Detailed Feature Information
---

### BRC Logistics - App Updates - Version Driven (#18314)

Feature for tracking version-driven updates, enhancements, and new functionality for BRC Logistics. Requirements under this Feature represent planned development work tied to specific version releases.

#### InReturn No Return (#23377)

Customer-driven development for InReturn functionality to handle scenarios where no return items are specified


### Performance Issues (#23296)

Defined new key for ItemNo to address performance bottlenecks in high-volume operations.


### Deposco US WMS Integration (#23436)

Webhook-based integration enabling real-time communication with Deposco warehouse management system for US-based operations. Supports automated inventory updates, order fulfillment tracking, and shipment notifications.


### Status for Posting on Return Orders (#23435)

Enhanced visibility and control over return order processing with status indicators for posting operations. Helps track the progression of return orders through the posting workflow.


### Add a conversion from meter to inch (#23208)

Added transformation of measurement units to support customer requirements. Enables automatic conversion from meter-based measurements to inch-based measurements for streamlined international operations.


### Add ExternalSellerReference to order/invoice (#23305)

Add External Seller Reference to JSON output in sales order request for InReturn integration. The value for this field is now mappable, allowing flexible configuration based on business requirements.


## Breaking Changes

No breaking changes in this release.

## Bugfixes

- Sello not fetching Return Orders (#23110)
- Auto create exchange for customer orders (#23309)
- Supplier No too many characters error (#23301)
- Transfer Order - Posting Date, Reason Code, Move Types corrections (#23115)
