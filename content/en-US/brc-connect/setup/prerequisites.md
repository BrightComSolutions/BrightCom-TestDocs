---
title: "Prerequisites"
linkTitle: "Prerequisites"
weight: 1
type: docs
description: >
  System requirements and prerequisites for BRC Connect installation and operation.
---

## Business Central Requirements

### Version Compatibility

BRC Connect requires:

- **Minimum BC Version**: 25.0.0.0
- **Platform**: Business Central Cloud (SaaS)
- **Runtime Version**: AL Runtime 12.0
- **Target Environment**: Cloud only (not supported for on-premises)

### License Requirements

**User Licenses:**
- Full Business Central user licenses for administrators who configure BRC Connect
- Full licenses for users who need to view/process orders manually
- Device licenses sufficient for automated job queue processing

**Feature Licensing:**
- No additional Business Central features required beyond base BC Cloud
- Standard Sales and Inventory modules must be licensed

### Permission Requirements

Users need appropriate permission sets:

| Permission Set | Purpose | Required For |
|----------------|---------|--------------|
| **BRC CONNECT - EDIT** | Full BRC Connect configuration and usage | Setup administrators, integration managers |
| **BRC CONNECT - VIEW** | Read-only access to entries and content | Analysts, support staff |
| **D365 FULL ACCESS** | Complete BC access including setup | Initial configuration |

**Standard BC Permissions Also Required:**
- Sales document creation and posting
- Customer master data management
- Item master data management
- Inventory posting
- Payment journal posting (if using payment automation)

## External System Requirements

### API Access

Your e-commerce platform or POS system must provide:

**Required:**
- RESTful JSON API with HTTP/HTTPS endpoints
- Authentication method (bearer token, API key, OAuth)
- GET endpoints for downloading orders, customers, items
- POST endpoints for sending inventory, shipments, invoices
- API documentation with JSON schema

**Recommended:**
- Webhook support for real-time notifications
- Batch/bulk API endpoints for initial data loads
- Pagination support for large datasets
- Test/sandbox environment for integration testing

### Supported Platforms

BRC Connect has pre-built integrations for:

| Platform | Type | Version | Notes |
|----------|------|---------|-------|
| **Shopify** | E-commerce | All current versions | Full API support |
| **Storm** | E-commerce | Current API | Swedish market focus |
| **Litium** | E-commerce | API v3+ | Full feature support |
| **Sitoo** | POS | Current API | Retail operations |
| **Custom** | Any | N/A | Generic JSON API support |

### API Credentials

Before starting setup, gather:

1. **API Endpoint URL**
   - Base URL for API calls
   - Example: `https://api.yourshop.com/bc/v1`
   - Must be HTTPS (HTTP not supported)

2. **Authentication Credentials**
   - Bearer token, or
   - API key, or
   - OAuth client ID and secret

3. **Source Identifier** (if required)
   - Unique ID for this BC instance
   - Used by external system to route requests
   - Example: `BC-PROD-001`

4. **API Documentation**
   - JSON request/response examples
   - Field definitions and data types
   - Rate limits and throttling rules
   - Error code reference

## Network Requirements

### Outbound Connectivity

Business Central must reach external API endpoints:

- **Protocol**: HTTPS (TLS 1.2 or higher)
- **Ports**: 443 (standard HTTPS)
- **DNS**: Able to resolve external API hostnames
- **Firewall**: Allow outbound connections to API endpoints

### IP Whitelisting

If external system requires IP whitelisting:

- Business Central Cloud uses dynamic outbound IP ranges
- Obtain current BC Cloud IP ranges from Microsoft documentation
- Configure external system to allow BC's IP ranges
- Note: IP ranges may change; monitor Microsoft announcements

### Latency Considerations

For optimal performance:

- **API Response Time**: < 2 seconds per request
- **Network Latency**: < 200ms between BC and external API
- **Throughput**: Sufficient for peak order volumes

**Example Load Calculations:**
- 1000 orders/day = ~42 orders/hour = ~1 order every 2 minutes
- At 5-minute job queue interval, process ~3 orders per run
- Higher volumes may need more frequent job runs or batch processing

## Data Requirements

### Master Data Preparation

Before enabling automation, prepare:

**Customer Data:**
- Existing customer records with email/phone for matching
- Customer templates for auto-creation
- Default values for required BC fields

**Item Data:**
- Items with references (cross-references) matching external SKUs
- Item variants configured if using product variations
- Unit of measure matching external system UOMs

**Financial Data:**
- G/L accounts for freight, discounts, duties
- Payment methods matching external payment types
- VAT posting groups for tax calculations

### Initial Data Sync

Plan initial data synchronization:

1. **Historical Orders**
   - Decide historical order cutoff date
   - Plan bulk import strategy (may require manual load)
   - Consider starting fresh vs. importing history

2. **Item Master Data**
   - Export items from BC to external system, or
   - Import items from external system to BC, or
   - Manually reconcile item lists

3. **Inventory Levels**
   - Perform physical inventory before go-live
   - Ensure BC inventory accurate
   - Initial inventory sync to external system

## Technical Environment

### Development/Test Environment

**Highly Recommended:**
- BC Sandbox environment for testing
- Test/staging environment on external system
- Ability to reset test data between test runs

### User Access

Assign responsibilities:

| Role | Responsibilities | User Count |
|------|------------------|------------|
| **Integration Administrator** | Initial setup, field mapping, troubleshooting | 1-2 users |
| **Operations Manager** | Monitor errors, handle exceptions | 2-3 users |
| **Finance User** | Review/post payment journals | 1-2 users |
| **Warehouse User** | Process shipments, update inventory | As needed |

## Knowledge Requirements

### Business Central Expertise

Setup team should have:

- **Essential**: BC sales order processing, customer/item management
- **Essential**: BC user security and permission management
- **Recommended**: BC job queue configuration
- **Recommended**: AL development for customizations (if needed)

### Integration Expertise

At least one team member should understand:

- RESTful API concepts
- JSON data structures
- HTTP status codes and error handling
- Authentication methods (bearer tokens, OAuth)

### External System Expertise

Have access to someone who knows:

- External system's data model
- Order/customer/item lifecycle in external system
- External system's API capabilities and limitations
- External system's configuration for BC integration

## Timing Requirements

### Project Timeline

Typical implementation timeline:

| Phase | Duration | Activities |
|-------|----------|------------|
| **Planning** | 1-2 weeks | Gather requirements, credentials, design field mapping |
| **Setup** | 2-3 days | Install app, configure connection, map fields |
| **Testing** | 1-2 weeks | Test with sample data, validate workflows, fix issues |
| **Training** | 2-3 days | Train users on operations and error handling |
| **Go-Live** | 1 day | Enable automation, monitor closely |
| **Stabilization** | 1-2 weeks | Fine-tune settings, resolve edge cases |

**Total**: 4-6 weeks from start to stable production

### Availability Requirements

During setup and go-live:

- Integration administrator available full-time
- External system technical contact available for API questions
- BC functional users available for testing
- Decision-maker available for configuration choices

## Optional Components

### Enhanced Features

Consider these optional capabilities:

**Payment Service Provider (PSP) Integration:**
- Requires PSP API credentials
- Enables automatic payment capture
- Additional field mapping for payment details

**Multi-Location Inventory:**
- Requires BC location setup
- Configure location mapping to external warehouses
- Set up transfer order automation (if needed)

**Advanced Pricing:**
- BC price list configuration
- Customer price groups
- Campaign/promotion price handling

**Dimension Integration:**
- BC dimension setup (departments, projects, etc.)
- Map external categories/tags to BC dimensions
- Configure default dimension values

## Pre-Installation Checklist

Before installing BRC Connect, verify:

**Business Central:**
- [ ] BC version 25.0 or later
- [ ] Cloud deployment (SaaS)
- [ ] Administrator access available
- [ ] Permission sets reviewed and understood
- [ ] Master data clean and accurate

**External System:**
- [ ] API credentials obtained
- [ ] API documentation reviewed
- [ ] Test environment available
- [ ] Technical contact identified

**Network:**
- [ ] Outbound HTTPS confirmed working
- [ ] IP whitelisting configured (if required)
- [ ] API endpoints reachable from BC

**Team:**
- [ ] Integration administrator assigned
- [ ] Training plan created
- [ ] Support process defined
- [ ] Go-live date agreed

**Data:**
- [ ] Field mapping design completed
- [ ] Initial data sync plan defined
- [ ] Test scenarios documented
- [ ] Acceptance criteria established

## Support Resources

Before starting installation:

**BrightCom Support:**
- Contact: [brightcom.se/kontakt](https://brightcom.se/kontakt/)
- Documentation: [docs.brightcom.online/brcconnect](https://docs.brightcom.online/brcconnect)
- License validation and support

**Microsoft Resources:**
- Business Central documentation
- BC Cloud IP ranges
- Azure status page for outage notifications

**External System Support:**
- API technical support contact
- API status page
- Developer documentation portal

## Next Steps

After verifying all prerequisites:

1. Proceed to [Installation](installation) guide
2. Gather API credentials and documentation
3. Schedule implementation kickoff with team
4. Prepare BC sandbox environment for testing

## Common Gaps

Issues often discovered during setup:

**Missing Prerequisites:**
- ❌ API credentials not ready → Delays setup by days/weeks
- ❌ No test environment → Cannot safely test configuration
- ❌ Master data quality issues → Orders fail validation
- ❌ Insufficient BC permissions → Cannot complete configuration

**Mitigation:**
- Complete this prerequisites checklist thoroughly
- Don't skip test environment (even if it costs extra)
- Clean master data before starting integration
- Assign proper administrator permissions upfront
