---
title: BRC Core 27.0.30430.0
categories: [BRC Core, ReleaseNotes]
description: Price Book performance overhaul with batch calculation mode and zero-downtime recalculation
date: 2026-04-02
---

## Release Summary

| Feature | Description | ID |
| ------- | ----------- | --: |
| Batch Calculation Mode | New opt-in calculation mode that groups customers by pricing attributes and calculates once per group, dramatically reducing calculation time at scale | #26385 |
| Zero-Downtime Recalculation | Atomic generation pointer swap ensures external systems never see empty or partial results during Price Book recalculation | #26385 |

## Detailed Feature Information

---

### Price Book Performance Overhaul (#26385)

The Price Book system has been significantly enhanced to support high-volume pricing scenarios. Two complementary improvements are included in this release.

#### Batch Calculation Mode

The new Batch calculation mode deduplicates customers into pricing fingerprints based on the attributes that determine their price — Customer Price Group, Customer Discount Group, Currency Code, VAT Business Posting Group, Allow Line Discount, and Prices Including VAT. Customers sharing identical attributes are calculated once and the results expanded to all members of each group.

This reduces billions of individual price calculations to hundreds of thousands, cutting calculation time from days to hours for large customer bases.

Batch mode is opt-in and displays a confirmation warning when selected, as it assumes standard Business Central pricing logic. Customers with customer-specific Price List Lines are always calculated individually regardless of mode.

#### Zero-Downtime Recalculation

Both Batch and Permutation modes now use a generation pointer system. New calculations are written with a new generation number while the current results remain fully active and queryable. The switch to new results is a single atomic update — external systems and integrations never experience empty or partial results during recalculation.

## Breaking Changes

No breaking changes in this release.

## Bugfixes

No bugfixes in this release.
