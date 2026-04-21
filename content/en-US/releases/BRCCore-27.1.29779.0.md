---
title: BRC Core 27.1.29779.0
categories: [BRC Core, ReleaseNotes]
description: Currency Exchange Rate Service Fix
date: 2026-03-11
---

## Release Summary

| Feature         | Description           |   ID |
| --------------- | --------------------- | ---: |
| Currency Service Fix | Resolve service URL connectivity issues | #24393 |

## Detailed Feature Information

---

### Currency Exchange Rate Service Fix (#24393)

Fixed critical issue preventing access to the Currency Exchange Rate Service.

#### Service URL Connectivity Issue (#24393)

Resolved an issue where the Currency Exchange Rate Service URL was unreachable, causing errors when attempting to retrieve new currency exchange rates. This fix ensures the service connection is properly established and currency rates can be updated successfully.

The fix includes:
- Disabling problematic external cache dependencies
- Removing Azure Function service dependencies that caused connectivity failures
- Ensuring reliable currency rate updates

**Benefits:**
- Restored currency exchange rate updates
- Eliminated dependency on external services that caused failures
- Improved system reliability

## Breaking Changes

No breaking changes in this release.

## Bug Fixes

- **Currency Exchange Rate Service URL Issue** (#24393) - Fixed service connectivity preventing currency rate updates
