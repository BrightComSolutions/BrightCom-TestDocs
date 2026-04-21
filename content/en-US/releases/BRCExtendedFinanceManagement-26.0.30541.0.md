---
title: BRC Extended Finance Management 26.0.30541.0
categories: [BRC Extended Finance Management, ReleaseNotes]
description: EU Sales Export report data accuracy fix
date: 2026-04-08
---

## Release Summary

| Feature                              | Description                                                    |   ID |
| ------------------------------------ | -------------------------------------------------------------- | ---: |
| EU Sales Export Report Accuracy Fix  | Fixed incorrect VAT number matching in export buffer           | 26426 |

## Detailed Feature Information

---

### EU Sales Export Report Data Accuracy Fix (#26426)

Fixed a data accuracy bug in the EU B2B Sales Export report where the system could incorrectly match customer VAT registration numbers to header rows in the CSV export buffer instead of data rows. This caused the report to potentially use wrong values when calculating and exporting EU sales amounts for customers.

**The Fix:** Added a filter to exclude the first two rows (header rows) when searching for customer VAT registration numbers in the export buffer. The code now explicitly searches only data rows (Line No. > 2) when matching VAT numbers to sales data.

**Impact:** This fix ensures accurate sales amounts in the EU B2B Sales Export report. Without this fix, customers could have seen incorrect Item Amount, Third Party Amount, or Service Amount values in their EU sales exports if VAT numbers coincidentally appeared in header rows.

**Recommendation:** Customers using the EU Sales Export functionality should consider regenerating any recent exports to ensure accuracy.

**Technical Change:** Added filter in BRCEFMEUSalesExport.Report.al:
```al
TempCSVBuffer.SetFilter("Line No.", '>%1', 2);
```

## Breaking Changes

No breaking changes in this release.

## Bugfixes

- **EU Sales Export Report Accuracy** (#26426) - Fixed incorrect VAT registration number matching that could cause inaccurate export values
