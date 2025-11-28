---
title: "FAQ"
linkTitle: "FAQ"
weight: 10
description: >
  Frequently asked questions about BRC Logistics.
---

## General Questions

### What is BRC Logistics?

BRC Logistics is a Business Central app that connects your ERP system to third-party warehouse management systems (WMS). It automates the exchange of orders, inventory, and tracking information between Business Central and over 35 different WMS platforms.

### Which WMS platforms are supported?

BRC Logistics supports 35+ platforms including:
- **Full WMS**: Ongoing WMS, Bitlog, 3PL Central, ShipHero, Logiwa, VeraCore, Mintsoft, Aditro, Alyson, and 20+ others
- **Returns Platforms**: nShift Return, EasyCom, ReclaimIt, TurnR, Yahloh, Sello, and others

See [Integrations](../integrations/) for the complete list.

### Can I use BRC Logistics with multiple warehouses?

Yes. You can create multiple BRC Logi Setup records, each with:
- Different location codes
- Different WMS platforms
- Different integration settings

This supports multi-warehouse, multi-3PL scenarios.

### Does BRC Logistics work on-premises?

No. BRC Logistics is designed for **Business Central Cloud (SaaS)** only. It requires BC version 24.0 or later.

## Setup & Configuration

### How long does setup take?

Typical setup timeline:
- **Installation**: 2-5 minutes
- **Basic Configuration**: 30-60 minutes
- **Testing**: 2-4 hours
- **Training**: 2-4 hours

Total: 1-2 days for full deployment including testing.

### Do I need custom development?

No. BRC Logistics is a zero-code integration solution. Configuration is done through setup pages without AL development.

**Advanced Scenarios**: Custom field mapping uses built-in Extra Fields configuration (no coding required).

### Can I test before going live?

Yes, highly recommended. Use:
1. Business Central **sandbox environment**
2. WMS **test/sandbox account**
3. Test with sample orders before production

### What BC permissions are needed?

- **Installation**: SUPER permission set
- **Configuration**: SUPER or BRC Lgsts
- **Daily Use**: BRC Lgsts + Sales/Purchase posting permissions

See [Permissions Reference](../reference/#permission-sets).

## Operations

### How are orders sent to the WMS?

**Automatic** (recommended):
1. User releases sales/purchase order in BC
2. BRC Logistics auto-creates WMS request
3. Job queue sends request every 15 minutes (configurable)

**Manual**:
1. User releases order
2. User navigates to BRC Logi Whse. Transactions
3. User clicks "Send Request" action

### How quickly are orders processed?

**Sending to WMS**: Within 15 minutes of order release (default job queue interval)

**Receiving from WMS**: Within 15 minutes of WMS completion (depends on WMS processing time)

**Override**: Use manual "Send Request" for immediate transmission.

### Can I track which orders are in the WMS?

Yes. Navigate to **BRC Logi Whse. Transactions** page:
- Filter by **Logistics Code** (location)
- Filter by **Document Type** (Shipment, Receival, Return)
- Check **Document Status** for lifecycle stage
- Use "Requires Attention" filter for errors

### What happens if the WMS is down?

- Requests are queued in BC with status "Document Not Sent"
- Job queue retries automatically
- When WMS comes back online, queued requests are sent
- No manual intervention needed (unless errors exceed threshold)

### Can I manually post shipments/receipts?

Yes:
1. Disable **Post Shipment**/**Post Receival** in setup
2. Process WMS confirmations (updates BC documents)
3. Manually post from Sales Orders/Purchase Orders
4. Re-enable auto-posting when ready

## Inventory & Items

### How are items synchronized to the WMS?

**Automatic**: When sales/purchase order references item, system creates item request to WMS (if configured)

**Manual**: Actions → Create Item Request from setup page

**Bulk**: Actions → Generate Item SKU List (creates SKU mappings)

### How does item SKU mapping work?

Configure **Item SKU Option** in setup:
- **Item only**: Use BC Item No. as WMS SKU (e.g., `ITEM001`)
- **Item + Variant**: Combine with delimiter (e.g., `ITEM001-BLUE`)
- **Item + Variant + UoM**: Include unit of measure (e.g., `ITEM001-BLUE-BOX`)

System auto-generates SKU in **BRC Logi Item SKU** table.

### Can I sync inventory levels from WMS?

Yes. WMS sends **Item Balance** messages:
- Creates BC item journal (Physical Inventory type)
- Calculates difference between WMS and BC quantities
- Auto-posts adjustment (if configured)

### What if WMS and BC inventory don't match?

Investigation steps:
1. Review **Item Journal** created from balance sync
2. Check for in-transit shipments/receipts
3. Verify WMS reporting correct location
4. Check for manual BC transactions not sent to WMS
5. Contact WMS support to verify count accuracy

## Tracking & Returns

### Where do I find tracking numbers?

**For Sales Shipments**:
1. Posted Sales Shipment document
2. Package Tracking No. field (if single package)
3. Shipping FastTab → Packages (if multi-package)

**For All Transactions**:
1. BRC Logi Whse. Trans. Card
2. Packages tab
3. Tracking No. and Tracking Link fields

### How do customer returns work?

**Scenario 1: Returns Platform Integration**
1. Customer initiates return through returns portal
2. WMS sends Return Order to BC
3. BC creates Sales Return Order automatically
4. Customer ships to warehouse
5. WMS confirms receipt
6. BC posts return receipt and credit memo

**Scenario 2: BC-Initiated Return**
1. User creates Sales Return Order in BC
2. BC sends receival request to WMS
3. WMS receives return
4. WMS sends confirmation
5. BC posts return receipt and credit memo

### Can returns trigger exchanges?

Yes. Configure in **BRC Logi Logistics Reason**:
- Set **Trigger Exchange of Item** = ✓
- System auto-creates exchange sales order
- Exchange order links to original return
- Prevents exchange shipment before return receipt

### How are return fees added?

Configure in setup:
- **Add Item On Return**: Specify fee item (e.g., Item Charge)
- **Return Fee Condition**: Define when to add (TableView filter)
- **Return Fee Max Count**: Limit fees per order
- Set per reason code: **Add Fee on Return** in BRC Logi Logistics Reason

## Errors & Troubleshooting

### How do I know if there's an error?

**Email Notifications** (if configured):
- Error email sent immediately when error occurs
- Daily summary email at configured time

**Manual Monitoring**:
- Navigate to BRC Logi Whse. Transactions
- Filter by "Requires Attention"
- Check **Error Count** and **Error Description** fields

### What does "Error Max Count exceeded" mean?

Transaction attempted 3 times (default) and failed each time. System stops retrying automatically.

**Resolution**:
1. Investigate root cause (check Error Description)
2. Fix underlying issue
3. Click **Actions** → **Unmark Errors**
4. System retries on next job queue run

### Why is my transaction stuck in "Document Not Sent"?

**Common Causes**:
- Job queue entry status = "On Hold" (should be "Ready")
- Job queue not running
- Auto-send disabled in setup
- Max transactions per run limit reached

**Resolution**: Check job queue status, verify auto-send settings.

### Why is my transaction stuck in "Sent to WMS"?

**Cause**: WMS received request but hasn't sent confirmation back to BC.

**Resolution**:
1. Wait 30-60 minutes (WMS may be processing)
2. Check WMS platform directly for order status
3. Contact WMS support if stuck > 2 hours

### How do I view the actual request sent to WMS?

1. Open **BRC Logi Whse. Trans. Card**
2. Click **Actions** → **Download Content**
3. Save XML/JSON file
4. Open in text editor or XML/JSON viewer

Same process for **Download Response** to see WMS reply.

## Performance & Limits

### How many transactions can BRC Logistics handle?

**Tested Volume**: Thousands of transactions per day per setup

**Limiting Factors**:
- WMS API performance
- Job queue capacity
- Business Central environment resources

**Optimization**: Adjust **Max transactions per Run** and **No. of Minutes between Runs** for throughput.

### Why is the transaction list slow?

**Cause**: Loading thousands of historical transactions

**Resolution**:
1. Always use filters (Location, Document Type, Date)
2. Archive old transactions: Configure **Delete Old Transactions after** (e.g., "-3M" for 3 months)
3. Don't load full list without filters

### Can I adjust the polling frequency?

Yes. In **Job Queue Entry**:
- Default: **No. of Minutes between Runs** = 15
- Reduce for faster polling (e.g., 5 minutes)
- Increase for lower API load (e.g., 30 minutes)

**Warning**: Too frequent polling may impact WMS API performance or hit rate limits.

## Customization

### Can I add custom fields to WMS messages?

Yes. Use **BRC Logi Extra** table:
1. Navigate to BRC Logi Extras page
2. Create new entry
3. Specify:
   - Source BC table and field
   - Destination Extra Field number (1-50)
   - WMS field name (XML/JSON element name)
4. Value automatically includes in WMS messages

No AL coding required.

### Can I modify how quantities are calculated?

**Configuration Options**:
- **Send Outstanding Quantity**: Only unsent quantity
- **Send Total Quantity**: Full order quantity (supports partial shipments)
- **Treat Handled Qty. as Accumulative**: Sum all confirmations
- **Convert to Base UOM**: Always use base unit of measure

Change in **BRC Logi Setup** → **Document** FastTab.

### Can I map WMS codes to BC codes?

Yes. Use **BRC Logi Mapping** table:
- Map WMS location codes to BC location codes
- Map WMS reason codes to BC reason codes
- Map WMS status values to BC statuses
- Supports wildcard matching

## Support

### How do I get support?

**BrightCom Solutions**:
- Documentation: [https://docs.brightcom.se/sv/Products/BRCLogistics](https://docs.brightcom.se/sv/Products/BRCLogistics)
- Website: [https://brightcom.se/](https://brightcom.se/)

**WMS Provider**:
- Contact your WMS vendor for WMS-side issues

**Microsoft**:
- Contact for Business Central platform issues

### What information should I provide when reporting an issue?

Include:
1. BC version and BRC Logistics version
2. WMS platform name
3. Transaction number exhibiting error
4. Error description
5. Request/response payloads (Download Content/Response)
6. Screenshot of error
7. Steps to reproduce

### Is training available?

Contact BrightCom Solutions or your implementation partner for:
- User training sessions
- Administrator training
- Custom configuration assistance
- Go-live support

### Where can I learn more?

- [Setup Guide](../setup/) - Installation and configuration
- [User Guide](../user-guide/) - Daily operations
- [Integrations](../integrations/) - Platform-specific details
- [Troubleshooting](../troubleshooting/) - Issue resolution
- [Reference](../reference/) - Technical documentation
