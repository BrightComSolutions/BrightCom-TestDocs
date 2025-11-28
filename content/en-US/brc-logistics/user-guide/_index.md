---
title: "User Guide"
linkTitle: "User Guide"
weight: 30
description: >
  Step-by-step user guide for daily operations with BRC Logistics including order processing, returns management, and transaction monitoring.
---

## Overview

This user guide covers day-to-day operations with BRC Logistics after installation and configuration are complete. Users will learn how to:

- Process sales orders through the WMS
- Handle purchase order receipts from the WMS
- Manage customer returns and exchanges
- Monitor WMS transactions and troubleshoot errors
- Synchronize inventory between Business Central and the WMS

## User Personas

### Warehouse Coordinator
- **Primary Tasks**: Monitor WMS transactions, troubleshoot errors, manually process exceptions
- **Key Pages**: BRC Logi Whse. Transactions, BRC Logi Whse. Trans. Card
- **Permissions**: BRC Lgsts (full access)

### Sales Order Processor
- **Primary Tasks**: Create and release sales orders, verify shipment confirmations
- **Key Pages**: Sales Orders, BRC Logi Whse. Transactions (filtered to sales)
- **Permissions**: BRC Lgsts + Sales Order processing

### Purchase Order Processor
- **Primary Tasks**: Create and release purchase orders, verify receipt confirmations
- **Key Pages**: Purchase Orders, BRC Logi Whse. Transactions (filtered to purchases)
- **Permissions**: BRC Lgsts + Purchase Order processing

### Returns Specialist
- **Primary Tasks**: Process customer returns, handle return-to-exchange workflows
- **Key Pages**: Sales Return Orders, BRC Logi Whse. Transactions (returns filter)
- **Permissions**: BRC Lgsts + Return Order processing

### System Administrator
- **Primary Tasks**: Configure setup, manage job queues, review error logs
- **Key Pages**: BRC Logi Setup, Job Queue Entries, BRC Logi Whse. Transactions
- **Permissions**: BRC Lgsts + System administration

## Documentation Structure

### [Getting Started](getting-started/)
First-time user orientation:
- Understanding the integration workflow
- Navigating BRC Logistics pages
- Monitoring your first transaction
- Understanding document statuses

### [Daily Operations](daily-operations/)
Common workflows:
- **Sales Order Fulfillment**: Release sales orders, monitor shipment processing, verify tracking numbers
- **Purchase Order Receiving**: Release purchase orders, monitor receival processing, verify receipt quantities
- **Return Order Processing**: Create return orders, handle exchanges, manage return fees
- **Transfer Orders**: Process inter-location transfers through WMS
- **Inventory Adjustments**: Review and post WMS inventory adjustments

### [Advanced Features](advanced-features/)
Power user capabilities:
- Manual transaction processing
- Uploading/downloading request/response payloads
- Handling partial shipments and receipts
- Working with item tracking (serial/lot numbers)
- Managing multi-package shipments
- Return-to-exchange workflows
- Custom field mapping usage

### [Monitoring & Troubleshooting](monitoring/)
Operational oversight:
- Using the BRC Logi Whse. Transactions page
- Filtering by document status and errors
- Understanding error messages
- Manually retrying failed transactions
- Viewing request/response payloads
- Email notification management

## Quick Reference

### Key Pages

| Page Name | Search Term | Purpose |
|-----------|-------------|---------|
| BRC Logi Whse. Transactions | `BRC Logi Whse. Transactions` | Main transaction monitoring page |
| BRC Logi Whse. Trans. Card | (Open from list) | Detailed transaction view |
| BRC Logi Setup | `BRC Logi Setup` | Configuration (admin only) |
| BRC Logi Item SKU List | `BRC Logi Item SKU` | View item-to-SKU mappings |
| BRC Logi Whse. Reason Codes | `BRC Logi Whse. Reason` | Return reason configuration |
| BRC Logi Return Exch. Entries | `BRC Logi Return` | Return/exchange audit trail |

### Document Types

| Document Type | Direction | BC Source Document |
|---------------|-----------|-------------------|
| Shipment Order | BC → WMS | Sales Order, Transfer Order (outbound) |
| Shipment Notice | WMS → BC | WMS shipment confirmation |
| Receival Order | BC → WMS | Purchase Order, Sales Return Order, Transfer Order (inbound) |
| Receival Notice | WMS → BC | WMS receipt confirmation |
| Return Order | WMS → BC | Customer return initiation (returns platforms) |
| Item Balance | WMS → BC | Physical inventory count |
| Item Adjustment | WMS → BC | Inventory adjustment transaction |
| Item Movement | WMS → BC | Stock movement within WMS |

### Document Statuses

| Status | Meaning | Next Action |
|--------|---------|-------------|
| New Request | Not yet created | System will create request |
| Document Not Sent | Created but not transmitted | Send to WMS (auto or manual) |
| Sent to WMS | Transmitted to WMS | Wait for WMS processing |
| Acknowledged | WMS confirmed receipt | Wait for WMS completion |
| Shipment/Receival Finished | WMS sent confirmation back | Process response in BC |
| Closed | Fully processed and posted | No action needed |
| Cancelled | Transaction cancelled | Review cancellation reason |

### Common Actions

| Action | Location | Purpose |
|--------|----------|---------|
| Create Request | Transaction card | Generate WMS request message |
| Send Request | Transaction card | Transmit request to WMS |
| Process Response | Transaction card | Apply WMS data to BC document |
| Download Content | Transaction card | View request payload (XML/JSON) |
| Download Response | Transaction card | View WMS response payload |
| Open Document | Transaction card | Navigate to source BC document |
| Unmark Errors | Transaction card | Reset error count for retry |

## Workflows Overview

### Standard Sales Order Workflow
```
1. Create Sales Order in BC
2. Release Sales Order → Auto-creates Shipment Order to WMS
3. WMS picks and ships order → Sends Shipment Notice
4. BC receives notice → Updates Sales Order with shipped quantities
5. BC auto-posts Sales Shipment (if configured)
6. Customer receives tracking number
```

### Standard Purchase Order Workflow
```
1. Create Purchase Order in BC
2. Release Purchase Order → Auto-creates Receival Order to WMS
3. WMS receives and puts away items → Sends Receival Notice
4. BC receives notice → Updates Purchase Order with received quantities
5. BC auto-posts Purchase Receipt (if configured)
6. Inventory updated in BC
```

### Return-to-Exchange Workflow
```
1. Customer initiates return through returns platform OR creates Sales Return Order
2. WMS receives return → Sends Return Order to BC
3. BC creates Sales Return Order (if from WMS)
4. WMS confirms receipt → BC posts Return Receipt and Credit Memo
5. BC creates Exchange Sales Order (if configured)
6. Exchange order processed as normal shipment
```

## Best Practices

### Sales Order Processing
- **Always verify customer address** before releasing order
- **Check item availability** at WMS location
- **Use correct shipping agent** for accurate carrier routing
- **Monitor "Requires Attention" filter** daily for errors

### Purchase Order Processing
- **Confirm expected receipt date** with vendor before releasing
- **Verify item tracking requirements** if using serial/lot numbers
- **Review over-receival tolerance** settings before posting
- **Check for receival discrepancies** promptly

### Returns Management
- **Validate original invoice reference** when creating return orders
- **Apply correct return reason** for proper fee calculation
- **Monitor return receipts** to ensure timely credit memo processing
- **Track return-to-exchange linkage** for customer service inquiries

### Error Handling
- **Review errors promptly** (check email notifications)
- **Investigate root cause** before unmarking errors
- **Contact WMS support** for WMS-side issues
- **Check request/response payloads** for troubleshooting
- **Don't repeatedly retry** without fixing underlying issue

### Performance Optimization
- **Use filters** on transaction list to reduce load time
- **Archive old transactions** per retention policy
- **Monitor job queue performance** for polling delays
- **Batch release orders** during off-peak hours if large volumes

## Training Recommendations

### New User Onboarding (2-4 hours)
1. **Introduction** (30 min): Integration overview, workflow concepts
2. **Page Navigation** (30 min): Key pages, filters, actions
3. **Sales Order Demo** (60 min): End-to-end sales fulfillment workflow
4. **Error Handling** (60 min): Reviewing errors, troubleshooting, retry process

### Role-Specific Training
- **Warehouse Coordinators**: Focus on monitoring, error resolution, manual processing
- **Order Processors**: Focus on document creation, release triggers, status verification
- **Returns Specialists**: Focus on return workflows, exchange processing, reason codes
- **Administrators**: Focus on configuration, job queues, integration debugging

## Next Steps

- [Getting Started Guide](getting-started/) - First-time user orientation
- [Daily Operations Guide](daily-operations/) - Common workflows
- [Advanced Features Guide](advanced-features/) - Power user features
- [Troubleshooting Guide](../troubleshooting/) - Error resolution
