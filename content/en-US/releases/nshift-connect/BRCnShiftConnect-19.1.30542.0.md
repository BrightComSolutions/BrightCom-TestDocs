---
title: BRC nShift Connect 19.1.30542.0
categories: [BRC nShift Connect, ReleaseNotes]
description: Package Code filter flow field fix
date: 2026-04-08
---

## Release Summary

| Feature                    | Description                                              |   ID |
| -------------------------- | -------------------------------------------------------- | ---: |
| Package Code Filter Fix    | Fixed flow field filtering for Package Code selection   | 26421 |

## Detailed Feature Information

---

### Package Code Filter Fix (#26421)

Fixed an issue where filtering by Package Code was not working correctly when used as a flow field. Previously, when Package Code was used as a flow field, the lookup would not display the correct values for filtering, making it difficult or impossible for users to properly filter or select Package Code values.

**The Fix:** The lookup logic has been moved from the flow field definition into code, ensuring the flow field is calculated **before** the filter/selection occurs. This guarantees users see the correct Package Code values in the lookup.

**Impact:** Restores expected filtering functionality for Package Code selection and data filtering. Users can now properly filter records by Package Code as intended.

**Technical Details:** Updated flow field calculation to occur during lookup operations, which is a common pattern when working with calculated fields in Business Central.

## Breaking Changes

No breaking changes in this release.

## Bugfixes

- **Package Code Filter** (#26421) - Fixed flow field calculation timing to display correct values during filtering and selection
