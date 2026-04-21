---
title: BRC Connect 25.0.30428.0
categories: [BRC Connect, ReleaseNotes]
description: Enhanced BOM component filtering to include only web-enabled items in product structure data
date: 2026-04-02
---

## Release Summary

| Feature | Description | ID |
| ------- | ----------- | --: |
| Web-Enabled BOM Components | Filter BOM components to include only web-enabled items in structure data | 23105 |

## Detailed Feature Information

---

### Web-Enabled BOM Components (#23105)

**Business Value:**
When sending BOM components as "structure" in the item data, Connect now only includes components which are enabled for web to avoid inconsistent data in the receiving system. This ensures that e-commerce platforms and other web-based systems only receive product structure information for items that should be visible and orderable online.

**What's New:**
The BOM component export has been enhanced with intelligent filtering:
- Only BOM components marked as "web-enabled" in Business Central are included in the structure data
- Prevents sending incomplete or inconsistent product structures to external systems
- Maintains data integrity between Business Central and connected e-commerce platforms

This improvement is particularly important for complex assembly or manufacturing scenarios where some components may be internal-use only or not individually sellable through web channels.

**Prerequisites:**
- BRC Connect
- Business Central Assembly Management or Manufacturing

**Scope:**
Applies to all BOM structure data exports from Connect. The web-enabled flag on individual items is respected when building the component structure for transmission.

## Breaking Changes

No breaking changes in this release. The filtering behavior is additive and respects existing item configuration.
