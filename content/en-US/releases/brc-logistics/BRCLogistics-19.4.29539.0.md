---
title: BRC Logistics 19.4.29539.0
categories: [BRC Logistics, ReleaseNotes]
description: Return order management enhancements, warehouse filtering capabilities, and WMS integration improvements
date: 2026-03-03
---

## Release Summary

| Feature                                        | Description                                                                          |   ID |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ | ---: |
| Filter Posted Invoices for InReturn Export    | Filter posted invoices for export to InReturn return management system               | 24274 |
| Shipment Notice Header Field Extension        | Opens up previously restricted field in shipment notice header for customization     | 23962 |
| InReturn Line Update Capability                | Allows InReturn to update information on return order lines                          | 24288 |
| WMS Integration Development                    | Development support for connecting new warehouse management systems                  | 20569 |
| Unit of Measure Handling Enhancement           | Improved handling of quantity unit of measure in customer scenarios                  | 24240 |
| Return Flow Improvements                       | Enhancements to return order processing workflows                                    | 24242 |
| InReturn Process Improvements                  | Optimizations to InReturn integration processes                                      | 24241 |
| Warehouse Status Check on Return Orders        | Validates warehouse status before processing return orders                           | 23985 |
| Filter Ongoing Returns by Returned Status      | Adds filtering capability for ongoing returns based on their returned status         | 24051 |
| Filter Warehouse IDs                           | Filter operations by one or multiple warehouse identifiers                           | 23954 |

## Detailed Feature Information

---

### Filter Posted Invoices for InReturn Export (#24274)

Provides filtering capabilities for posted invoices when exporting to the InReturn return management system. This feature streamlines the return process by allowing users to select specific invoices for return processing.

---

### Shipment Notice Header Field Extension (#23962)

Opens up Shipment Notice Header Field 1006 for general use and customization. This enhancement allows users to utilize previously restricted fields for customer-specific shipment notice requirements.

---

### InReturn Line Update Capability (#24288)

Enables the InReturn system to update information directly on return order lines. This improvement facilitates better integration with the InReturn platform and reduces manual data entry.

---

### WMS Integration Development (#20569)

Provides development capabilities for connecting new warehouse management systems to BRC Logistics. This feature extends integration options for diverse WMS platforms.

---

### Unit of Measure Handling Enhancement (#24240)

Improves the handling of quantity unit of measure fields in customer-specific scenarios. This enhancement resolves issues with unit of measure conversions and display.

---

### Return Flow Improvements (#24242)

General enhancements to return order processing workflows, improving efficiency and reducing processing time for return operations.

---

### InReturn Process Improvements (#24241)

Optimizes integration processes with the InReturn platform, enhancing reliability and performance of return management operations.

---

### Warehouse Status Check on Return Orders (#23985)

Adds validation logic to check warehouse status before processing return orders. This feature prevents issues by ensuring warehouse availability and readiness before initiating returns.

---

### Filter Ongoing Returns by Returned Status (#24051)

Introduces filtering capability for ongoing returns based on their returned status. This enhancement improves visibility and management of active return processes.

---

### Filter Warehouse IDs (#23954)

Adds the ability to filter operations by one or multiple warehouse identifiers. This feature improves multi-warehouse management by enabling targeted operations on specific warehouse locations.

## Breaking Changes

No breaking changes in this release.

## Bugfixes

No bugfixes in this release.
