---
title: BRC PS Inkasso Connect 22.0.29769.0
categories: [BRC PS Inkasso Connect, ReleaseNotes]
description: Reason Code API Enhancement
date: 2026-03-11
---

## Release Summary

| Feature         | Description           |   ID |
| --------------- | --------------------- | ---: |
| Reason Code API Support | Add Reason Code fields to API2 and API3 | #25127 |

## Detailed Feature Information

---

### Reason Code API Support (#25127)

Enhanced API integration by adding missing Reason Code fields to API endpoints.

#### Add Reason Code to API2 and API3 (#25127)

This bug fix resolves an issue where the Reason Code field was missing in API2 and API3 endpoints. The Reason Code is now properly exposed through these APIs, ensuring complete data availability for integrations and improving consistency across all API versions.

**Benefits:**
- Complete API data coverage
- Improved integration reliability
- Consistent field availability across API versions

## Breaking Changes

No breaking changes in this release.

## Bug Fixes

- **Missing Reason Code in APIs** (#25127) - Reason Code field is now available in API2 and API3 endpoints
