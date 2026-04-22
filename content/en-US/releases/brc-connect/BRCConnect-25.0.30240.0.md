---
title: BRC Connect 25.0.30240.0
categories: [BRC Connect, ReleaseNotes]
description: Enhanced BOM structure filtering to include only web-enabled items, preventing inconsistent data in e-commerce integrations
date: 2026-03-25
---

## Release Summary

| Feature                                    | Description                                                                                                                |   ID |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ---: |
| Only include web enabled items in structure | BOM component structures now filter to include only web-enabled items, preventing inconsistent data in e-commerce platforms | 23105 |

## Detailed Feature Information

---

### Only Include Web Enabled Items in Structure (#23105)

BOM component structures transmitted through BRC Connect now filter to include only web-enabled items, preventing inconsistent data in integrated e-commerce platforms.

**Background:** When sending BOM (Bill of Materials) components as "structure" in item data feeds to e-commerce platforms, including items that are not web-enabled can create data inconsistencies and display issues. The receiving system may attempt to display or process items that shouldn't be visible to customers or available for online orders.

**What's New:**
- BOM components are now filtered based on "BRC Enabled Web" setting
- Only components marked as web-enabled are included in the structure array
- New `ItemIsAvailableInWeb()` helper function for checking web enablement status
- Optimized item record loading using `SetLoadFields` for improved performance
- Cleaner, more consistent data feeds to e-commerce platforms

**Technical Details:**
- Added web availability check wrapper around BOM component JSON creation
- Components that are not web-enabled are excluded from the structure transmission
- Prevents downstream systems from receiving item data they cannot properly handle

**Impact:** E-commerce integrations will receive cleaner, more consistent BOM structure data that aligns with web availability settings, reducing display inconsistencies and improving data quality in online stores.

## Breaking Changes

No breaking changes in this release.

## Bug Fixes

No bug fixes in this release.
