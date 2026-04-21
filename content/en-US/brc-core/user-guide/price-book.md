---
title: "Price Book Management"
linkTitle: "Price Book"
weight: 34
description: >
  Automated price calculation and materialization system for bulk price exports to external systems.
---

## Overview

The BRC Core Price Book feature provides automated calculation and storage of Business Central prices in a flat, queryable table that can be efficiently exported to external systems. Instead of calculating prices on-demand for millions of Source-Asset combinations (typically Customers and Items), the Price Book pre-materializes all possible prices based on your configured rules and pricing logic.

## When to Use Price Book

The Price Book system is designed for scenarios where you need to:

- **Export prices to external systems**: E-commerce platforms, mobile apps, or third-party catalogs that need current pricing data
- **Provide fast price lookups**: Pre-calculated prices eliminate the calculation overhead during queries
- **Handle large-scale pricing**: Efficient processing of millions of Source-Asset combinations
- **Maintain price consistency**: Ensure external systems always have synchronized pricing with Business Central

## Key Features

### Zero-Downtime Recalculation

When price calculations are in progress, your external systems continue to access the current published prices without interruption. The Price Book uses a generation-based system where new calculations are prepared in the background and then activated atomically when complete.

**Benefits:**
- No empty results during recalculation
- External integrations never experience downtime
- Failed calculations don't affect current published prices

### Calculation Modes

The Price Book supports two calculation modes optimized for different scenarios:

#### Permutation Mode (Default)

Calculates prices individually for every Source-Asset-variant-unit of measure combination.

**When to use:**
- You have customer-specific pricing rules or Per Tenant Extensions (PTEs) that modify pricing logic
- You need guaranteed accuracy for all pricing scenarios
- Customer count is moderate (hundreds to thousands)

**Characteristics:**
- Complete accuracy for all pricing scenarios
- Supports any custom pricing logic
- Processing time scales with Source count × Asset count

#### Batch Mode

Groups customers by their pricing attributes (Customer Price Group, Customer Discount Group, etc.) and calculates once per group, then expands results to all customers sharing those attributes.

**When to use:**
- You use standard Business Central pricing (no custom pricing PTEs)
- You have a large customer base (tens of thousands or millions)
- Most customers share common pricing groups
- Performance is a critical concern

**Characteristics:**
- Dramatically faster for large customer bases (300+ groups vs millions of customers)
- Requires standard BC pricing logic only
- Customers with unique price list lines are still calculated individually

{{% alert title="Important" color="warning" %}}
**Batch Mode Limitation**: Batch mode assumes standard Business Central pricing only. If your solution includes Per Tenant Extensions or customizations that modify pricing based on customer attributes not in the standard grouping logic, those customizations will NOT be reflected in batch-calculated prices. Always test results carefully when switching to Batch mode.
{{% /alert %}}

## How Batch Mode Works

Batch mode optimizes price calculation by recognizing that many customers share identical pricing attributes:

1. **Grouping**: Customers are grouped by:
   - Customer Price Group
   - Customer Discount Group  
   - Currency Code
   - VAT Business Posting Group
   - Allow Line Discount setting
   - Prices Including VAT setting

2. **Calculation**: Prices are calculated once per unique group (typically 50-300 groups instead of millions of customers)

3. **Expansion**: Results are efficiently copied to all customers within each group

4. **Special Cases**: Customers with customer-specific price list lines are automatically detected and calculated individually to ensure accuracy

### Example Scenario

**Without Batch Mode:**
- 3,000,000 customers × 1,000 items = 3 billion price calculations
- Processing time: Days

**With Batch Mode:**
- 2,999,700 customers fit into 50 unique pricing groups
- 300 customers have customer-specific pricing
- Total calculations: (50 groups + 300 individual customers) × 1,000 items = 350,000 calculations
- Processing time: Hours
- Result expansion: Fast bulk inserts with no calculation

## Configuration

### Creating a Price Book

1. Search for **BRC Core Price Books** in Business Central
2. Create a new price book entry
3. Configure:
   - **Code**: Unique identifier for the price book
   - **Description**: Descriptive name
   - **Currency Code**: Currency for price calculations
   - **Calculation Method**: Choose Permutation or Batch mode

### Selecting Calculation Method

When creating or modifying a price book, choose the appropriate calculation method:

**Permutation Mode:**
- Select when accuracy is paramount
- Use with custom pricing extensions
- Default and safest option

**Batch Mode:**
- Shows confirmation warning when selected
- Review warning carefully before proceeding
- Test results thoroughly before production use

{{% alert title="Warning Dialog" %}}
When switching to Batch mode, you'll see:

> **Warning:** Batch mode calculates prices based on Customer Price Group and Customer Discount Group combinations. This assumes you are using standard Business Central pricing only. If any Per Tenant Extensions (PTEs) or third-party apps modify pricing logic based on other customer attributes, those customizations will NOT be reflected in batch-calculated prices. Do you want to continue?
{{% /alert %}}

### Defining Sources and Assets

Configure which customers (Sources) and items (Assets) should be included in price calculations. The Price Book uses generic terminology because Sources can represent Customers, Customer Price Groups, or Customer Discount Groups, while Assets typically represent Items or Item Discount Groups.

**On the Price Book Card page:**

1. **Sources Section**: Define which customers to include in price calculations
   - **Source Type**: Select from All Customers, Customer, Customer Price Group, or Customer Disc. Group
   - **Source No.**: Specify the specific customer, price group, or discount group (if applicable)
   - **Source Filters**: Add additional field-level filters to narrow the customer selection
   - **Included Customers**: View count of customers matched by your filters

2. **Assets Section**: Define which items to include in price calculations
   - **Asset Type**: Select Item or Item Discount Group
   - **Asset No.**: Specify the specific item or discount group (if applicable)
   - **Asset Filters**: Add additional field-level filters to narrow the item selection
   - **Quantity Breaks**: Configure quantity breaks for volume pricing
   - **Permutations**: View total calculation combinations for this asset configuration

### Scheduling Automated Updates

The Price Book includes built-in scheduling directly on the Price Book Card page. Configure automated recalculation in the **Schedule** section:

1. **Update Type**: Choose how frequently to update:
   - **Manual**: No automatic updates (calculate on demand only)
   - **Minutes**: Recalculate at a specified minute interval
   - **DailyTime**: Recalculate once per day at a specific time

2. **Update Every**: (Available when Update Type = Minutes)
   - Specify the number of minutes between automatic recalculations
   - Example: Set to 60 for hourly updates

3. **Update At**: (Available when Update Type = DailyTime)
   - Specify the time of day to run the calculation
   - Example: Set to 02:00 for nightly price updates

The Price Book system automatically manages the underlying job queue entries based on your schedule configuration.

## Running Price Calculations

### Manual Calculation

To immediately calculate or recalculate a price book:

1. Open the **BRC Core Price Books** page
2. Select your price book
3. Choose the **Calculate** action
4. Monitor progress through the Background Monitor

### Viewing Calculation Status

Check the price book card for status information:

- **Last Generated**: Timestamp of last successful calculation
- **Active Generation**: Current published result set
- **Last Generation Runtime**: How long the last calculation took

### Monitoring Progress

During calculation, monitor through:

1. **BRC Core BM Action Entries**: View background job progress
2. **Job Queue Entries**: Check job queue status
3. **Price Book Card**: View last run statistics

## Using Price Book Results

### Accessing Calculated Prices

Query calculated prices through:

1. **BRC Core PB Results** page: View all calculated prices
2. **BRC Core PB API**: Query prices via API for integration
3. **Direct lookup**: Use the lookup codeunit in custom code

### API Integration

The Price Book provides APIs for external system integration:

```
Query: BRCCorePBBulkAPI
- Optimized for bulk exports
- Filters automatically to active generation
- Returns flattened price data
```

**Example Use Cases:**
- Nightly export to e-commerce platform
- Real-time price queries for mobile apps
- Batch updates to third-party catalogs

### Understanding Results

Each price book result includes:

- **Source information**: Customer number and name (or other source entity details)
- **Asset information**: Item number, variant, unit of measure (or other asset details)
- **Pricing details**: Unit price, line discount percentage
- **Calculation context**: Currency, quantity breaks
- **Metadata**: Generation number (hidden from users)

## Performance at Scale

### Batch Mode Performance

Typical performance improvements with Batch mode:

| Customer Count | Unique Groups | Permutation Time | Batch Time | Improvement |
|---------------|---------------|------------------|------------|-------------|
| 10,000 | 30 | 2 hours | 15 minutes | 8x faster |
| 100,000 | 75 | 20 hours | 45 minutes | 27x faster |
| 1,000,000 | 150 | 8 days | 3 hours | 64x faster |
| 3,000,000 | 300 | 24 days | 9 hours | 64x faster |

*Actual performance varies based on item count, variants, UOMs, and quantity breaks.*

### Optimization Tips

1. **Use appropriate filters**: Limit calculations to relevant Assets and Sources using the filter capabilities
2. **Schedule during off-hours**: Configure the Schedule section to run large calculations during off-peak times
3. **Monitor group distribution**: View how Sources distribute across pricing groups
4. **Test before production**: Verify batch mode accuracy with a sample before full deployment
5. **Review permutation counts**: Check the Permutations field in the Assets section to understand calculation scope

## Troubleshooting

### Calculation Failures

If a price book calculation fails:

1. **Check Background Monitor**: Review **BRC Core BM Action Entries** for error details
2. **Review Job Queue**: Check job queue entry error messages
3. **Verify Configuration**: Ensure item and customer filters are valid
4. **Check Permissions**: Confirm job queue user has appropriate access

### Incorrect Prices in Batch Mode

If batch-calculated prices don't match expectations:

1. **Verify pricing is standard**: Ensure no custom pricing PTEs are active
2. **Check Source-specific rules**: Review price list lines for unexpected Source-specific entries (e.g., customer-specific pricing)
3. **Compare modes**: Run a small test in both Permutation and Batch mode to identify differences
4. **Review grouping logic**: Sources with different VAT groups, discount settings, or "Prices Including VAT" flags create separate groups

### Performance Issues

If calculations are taking too long:

1. **Review Asset/Source scope**: Consider narrowing filters in both the Assets and Sources sections
2. **Check quantity breaks**: Excessive quantity breaks multiply calculation volume (visible in the Quantity Breaks field)
3. **Consider Batch mode**: If using Permutation with large Source base (many customers)
4. **Optimize scheduling**: Use the Schedule section to run calculations during off-peak hours
5. **Check Estimated Runtime**: Review the Estimated Runtime field on the Price Book Card for time expectations

## Advanced Scenarios

### Incremental Updates

For scenarios where only certain Assets change frequently:

1. Create multiple price books:
   - **Full Catalog**: Complete price list with all Assets and Sources, updated weekly
   - **Fast Movers**: High-change Assets (items) only, updated daily using Asset Filters
2. Configure Source and Asset filters appropriately for each price book
3. External systems merge results from both sources

### Multi-Currency Pricing

To support multiple currencies:

1. Create separate price books per currency
2. Configure appropriate currency code on each
3. Schedule calculations to maintain synchronization
4. Export to currency-specific external systems

### Testing New Pricing

Before rolling out new pricing rules:

1. Create a test price book with identical configuration
2. Switch calculation method if testing Batch mode
3. Run calculation and review results
4. Compare with production price book
5. Activate when satisfied

## Related Topics

- [Daily Operations](daily-operations.md): Routine price book monitoring tasks
- [Advanced Features](advanced-features.md): Extensibility and custom calculation engines
- [Configuration](../setup/configuration.md): Initial Price Book setup
- [Troubleshooting](../troubleshooting/_index.md): Price Book issue resolution

## Summary

The BRC Core Price Book provides efficient, scalable price materialization for external system integration. Choose Permutation mode for maximum accuracy and custom pricing support, or Batch mode for dramatically improved performance with large customer bases using standard Business Central pricing. The generation-based system ensures your external integrations never experience downtime during price recalculations.
