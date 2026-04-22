---
title: Madden Analytics Connect 21.0.28973.0
categories: [Madden Analytics Connect, ReleaseNotes]
description: Changed to retry create temp line until it succeeds
date: 2026-02-18
---

## Release Summary

| Feature | Description | ID |
|----------------------------------|---------------------------------------------------------------|----------:|
| Bug Repairs and Maintenance | Improvements and fixes for product stability and reliability | 18369 |


## Detailed Feature Information
---

### Madden Analytics Connect - App Updates - Bug Repairs (#18369)

Feature for tracking bug repairs, hotfixes, and maintenance work for Madden Analytics Connect. Requirements and Bugs under this Feature represent reactive work to fix issues and maintain product quality.

#### Bug when sending deleted PO (#24008)

Some customers experienced an error when sending cancel on purchase orders. 
Posten i tabellen Inköpsrad finns redan. Identifieringsfält och värden: Dokumenttyp='Order',Dokumentnr='138212',Radnr='70001'
Code is written to one retry, I have updated to try with incremented line no until it gets inserted. 


## Breaking Changes

No breaking changes in this release.

## Bugfixes

No bug fixes in this release.
