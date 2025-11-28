---
title: "API Reference"
linkTitle: "API Reference"
weight: 62
description: >
  Technical API documentation for BRC Retail Extension including web service endpoints, data structures, authentication, and integration examples.
---

## API Overview

BRC Retail Extension provides comprehensive API capabilities for integration with external systems, e-commerce platforms, and third-party applications. The API follows RESTful principles and integrates with Business Central's standard web service framework.

## Authentication and Security

### Authentication Methods

#### OAuth 2.0 Authentication (Recommended)

**Token Endpoint:**
```
https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token
```

**Required Parameters:**
```json
{
  "grant_type": "client_credentials",
  "client_id": "{clientId}",
  "client_secret": "{clientSecret}",
  "scope": "https://api.businesscentral.dynamics.com/.default"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6...",
  "token_type": "Bearer",
  "expires_in": 3599
}
```

#### Basic Authentication

For development and testing environments:
```http
Authorization: Basic base64(username:password)
```

### API Base URL

**Production Environment:**
```
https://api.businesscentral.dynamics.com/v2.0/{tenantId}/{environment}/api/brightcom/brcretail/v1.0
```

**Sandbox Environment:**
```
https://api.businesscentral.dynamics.com/v2.0/{tenantId}/Sandbox/api/brightcom/brcretail/v1.0
```

### Required Permissions

**Minimum API Permissions:**
- BRC Retail Extension objects: Read/Write access
- Web Service Access permission
- API Management permissions in Azure AD

## Core API Endpoints

### Inventory Management API

#### Update Variant Inventory

**Endpoint:** `POST /inventory/variants/update`

**Description:** Updates inventory for specific item variant combinations

**Request Headers:**
```http
Content-Type: application/json
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "itemNo": "ITEM001",
  "variantCode": "M-BLK",
  "locationCode": "MAIN",
  "quantity": 150,
  "adjustmentType": "absolute|positive|negative",
  "reasonCode": "PHYSICAL",
  "documentNo": "EXT-ADJ-001",
  "unitCost": 25.50
}
```

**Response:**
```json
{
  "success": true,
  "itemNo": "ITEM001",
  "variantCode": "M-BLK",
  "locationCode": "MAIN",
  "newQuantity": 150,
  "adjustmentQuantity": 25,
  "documentNo": "EXT-ADJ-001",
  "timestamp": "2025-11-28T10:30:00Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VARIANT_NOT_FOUND",
    "message": "Variant M-BLK not found for item ITEM001",
    "details": "Verify variant code and item number are correct"
  }
}
```

#### Query Variant Inventory

**Endpoint:** `GET /inventory/variants/{itemNo}/{variantCode}`

**Description:** Retrieves current inventory levels for specific variant

**Query Parameters:**
- `locationCode` (optional): Filter by specific location
- `includeReservations` (optional): Include reservation details

**Example Request:**
```http
GET /inventory/variants/ITEM001/M-BLK?locationCode=MAIN&includeReservations=true
```

**Response:**
```json
{
  "itemNo": "ITEM001",
  "variantCode": "M-BLK",
  "variantDescription": "Medium Black",
  "locationCode": "MAIN",
  "inventory": {
    "onHand": 175,
    "available": 150,
    "reserved": 25,
    "onOrder": 50,
    "lastUpdated": "2025-11-28T10:30:00Z"
  },
  "reservations": [
    {
      "documentType": "Sales Order",
      "documentNo": "SO-001",
      "quantity": 15,
      "dueDate": "2025-12-01"
    }
  ]
}
```

#### Batch Inventory Update

**Endpoint:** `POST /inventory/variants/batch`

**Description:** Updates multiple variant inventories in a single operation

**Request Body:**
```json
{
  "updates": [
    {
      "itemNo": "ITEM001",
      "variantCode": "M-BLK",
      "locationCode": "MAIN",
      "quantity": 150,
      "adjustmentType": "absolute"
    },
    {
      "itemNo": "ITEM001",
      "variantCode": "L-BLK", 
      "locationCode": "MAIN",
      "quantity": 200,
      "adjustmentType": "absolute"
    }
  ],
  "reasonCode": "SYSTEM_SYNC",
  "documentNo": "BATCH-001"
}
```

**Response:**
```json
{
  "success": true,
  "processedCount": 2,
  "failedCount": 0,
  "results": [
    {
      "itemNo": "ITEM001",
      "variantCode": "M-BLK",
      "success": true,
      "newQuantity": 150
    },
    {
      "itemNo": "ITEM001", 
      "variantCode": "L-BLK",
      "success": true,
      "newQuantity": 200
    }
  ],
  "batchDocumentNo": "BATCH-001",
  "timestamp": "2025-11-28T10:30:00Z"
}
```

### Product Catalog API

#### Export Item Variants

**Endpoint:** `GET /catalog/items/{itemNo}/variants`

**Description:** Exports complete variant information for specific item

**Query Parameters:**
- `includeInventory` (optional): Include inventory levels
- `includePricing` (optional): Include pricing information
- `language` (optional): Language code for translations

**Example Request:**
```http
GET /catalog/items/ITEM001/variants?includeInventory=true&includePricing=true&language=en-US
```

**Response:**
```json
{
  "baseItem": {
    "itemNo": "ITEM001",
    "description": "Cotton T-Shirt",
    "brand": "BRC Apparel",
    "season": "SS25",
    "variantTemplate": "APPAREL",
    "imageUrl": "https://images.example.com/item001.jpg"
  },
  "variantStructure": {
    "dimension1": {
      "code": "SIZE",
      "name": "Size",
      "type": "Size"
    },
    "dimension2": {
      "code": "COLOR",
      "name": "Color", 
      "type": "Colour"
    },
    "separator": "-"
  },
  "variants": [
    {
      "variantCode": "M-BLK",
      "description": "Medium Black",
      "dimension1Value": {
        "code": "M",
        "name": "Medium",
        "sorting": 30
      },
      "dimension2Value": {
        "code": "BLK",
        "name": "Black",
        "sorting": 10
      },
      "eanCode": "1234567890123",
      "inventory": {
        "available": 150,
        "onHand": 175
      },
      "pricing": {
        "unitPrice": 29.99,
        "currency": "USD"
      }
    }
  ]
}
```

#### Export All Variants

**Endpoint:** `GET /catalog/variants`

**Description:** Exports all variant information across items

**Query Parameters:**
- `itemFilter` (optional): Filter by item numbers (comma-separated)
- `brandFilter` (optional): Filter by brand codes
- `seasonFilter` (optional): Filter by season codes
- `lastModified` (optional): Filter by modification date
- `pageSize` (optional): Number of items per page (default: 100)
- `page` (optional): Page number for pagination

**Example Request:**
```http
GET /catalog/variants?brandFilter=BRC&seasonFilter=SS25&lastModified=2025-11-01&pageSize=50
```

### Pricing API

#### Export Variant Pricing

**Endpoint:** `GET /pricing/variants`

**Description:** Exports pricing information for variants

**Query Parameters:**
- `itemNo` (optional): Specific item number
- `customerGroup` (optional): Customer price group
- `currency` (optional): Currency code
- `effectiveDate` (optional): Price effective date

**Response:**
```json
{
  "pricing": [
    {
      "itemNo": "ITEM001",
      "variantCode": "M-BLK",
      "customerGroup": "RETAIL",
      "currency": "USD",
      "unitPrice": 29.99,
      "minimumQuantity": 1,
      "validFrom": "2025-01-01",
      "validTo": "2025-12-31",
      "discountGroup": "STANDARD"
    }
  ],
  "exportDate": "2025-11-28T10:30:00Z",
  "totalRecords": 150
}
```

### Sales Integration API

#### Create Sales Order with Variants

**Endpoint:** `POST /sales/orders`

**Description:** Creates sales order with variant-specific lines

**Request Body:**
```json
{
  "customerNo": "CUST001",
  "orderDate": "2025-11-28",
  "requestedDeliveryDate": "2025-12-05",
  "deliverySeason": "SS25",
  "lines": [
    {
      "itemNo": "ITEM001",
      "variantCode": "M-BLK",
      "quantity": 10,
      "unitPrice": 29.99,
      "locationCode": "MAIN"
    },
    {
      "itemNo": "ITEM001",
      "variantCode": "L-BLK",
      "quantity": 5,
      "unitPrice": 29.99,
      "locationCode": "MAIN"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "salesOrderNo": "SO-001234",
  "customerNo": "CUST001",
  "orderDate": "2025-11-28",
  "totalAmount": 448.85,
  "lines": [
    {
      "lineNo": 10000,
      "itemNo": "ITEM001",
      "variantCode": "M-BLK",
      "quantity": 10,
      "unitPrice": 29.99,
      "lineAmount": 299.90
    }
  ]
}
```

## Data Structures

### Core Data Models

#### VariantInfo Structure
```json
{
  "variantCode": "string",           // Combined variant code (e.g., "M-BLK")
  "description": "string",           // Full variant description
  "dimension1Code": "string",        // Primary dimension code (e.g., "SIZE")
  "dimension1Value": "string",       // Primary value (e.g., "M")
  "dimension1Name": "string",        // Primary value name (e.g., "Medium")
  "dimension1Sorting": "integer",    // Sorting order for primary dimension
  "dimension2Code": "string",        // Secondary dimension code (e.g., "COLOR")
  "dimension2Value": "string",       // Secondary value (e.g., "BLK")
  "dimension2Name": "string",        // Secondary value name (e.g., "Black")
  "dimension2Sorting": "integer",    // Sorting order for secondary dimension
  "eanCode": "string",              // EAN/barcode if assigned
  "active": "boolean",              // Variant active status
  "lastModified": "datetime"        // Last modification timestamp
}
```

#### InventoryInfo Structure
```json
{
  "locationCode": "string",         // Location identifier
  "onHand": "decimal",             // Physical inventory quantity
  "available": "decimal",          // Available for sale quantity
  "reserved": "decimal",           // Reserved quantity
  "onOrder": "decimal",            // On purchase order quantity
  "lastCountDate": "date",         // Last physical count date
  "lastUpdated": "datetime"        // Last update timestamp
}
```

#### PricingInfo Structure
```json
{
  "currency": "string",            // Currency code
  "unitPrice": "decimal",          // Base unit price
  "minimumQuantity": "decimal",    // Minimum quantity for price tier
  "customerGroup": "string",       // Customer price group
  "discountGroup": "string",       // Discount group assignment
  "validFrom": "date",            // Price valid from date
  "validTo": "date",              // Price valid to date
  "priceInclVAT": "boolean"       // Price includes VAT flag
}
```

### Error Response Structure

```json
{
  "success": false,
  "error": {
    "code": "string",              // Error code identifier
    "message": "string",           // Human-readable error message
    "details": "string",           // Additional error details
    "field": "string",            // Field causing error (if applicable)
    "timestamp": "datetime"        // Error occurrence timestamp
  },
  "requestId": "string"           // Request identifier for troubleshooting
}
```

## Error Codes Reference

### Common Error Codes

#### Authentication Errors
- `AUTH_TOKEN_EXPIRED`: Access token has expired
- `AUTH_INVALID_TOKEN`: Invalid or malformed token
- `AUTH_INSUFFICIENT_SCOPE`: Token lacks required permissions

#### Validation Errors
- `ITEM_NOT_FOUND`: Item number does not exist
- `VARIANT_NOT_FOUND`: Variant code not found for item
- `LOCATION_NOT_FOUND`: Location code not found
- `INVALID_QUANTITY`: Quantity value is invalid
- `INVALID_DATE_RANGE`: Date range parameters are invalid

#### Business Logic Errors
- `INSUFFICIENT_INVENTORY`: Not enough inventory for operation
- `VARIANT_NOT_ACTIVE`: Variant is marked as inactive
- `TEMPLATE_MISMATCH`: Variant doesn't match item template
- `SORTING_LIMIT_EXCEEDED`: Sorting value exceeds maximum (9999)

#### System Errors
- `INTERNAL_SERVER_ERROR`: Unexpected system error
- `SERVICE_UNAVAILABLE`: Service temporarily unavailable
- `RATE_LIMIT_EXCEEDED`: Too many requests per time period

## Rate Limiting

### Request Limits

**Standard Limits:**
- 1000 requests per minute per client
- 100 concurrent requests
- Maximum payload size: 10MB

**Burst Limits:**
- 200 requests in 10-second window
- Automatic throttling when limits exceeded

**Rate Limit Headers:**
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 742
X-RateLimit-Reset: 1698764400
```

## Webhooks (Future Enhancement)

### Event Notifications

**Planned Webhook Events:**
- Variant inventory changes
- New variant creation
- Price updates
- Order status changes

**Webhook Payload Example:**
```json
{
  "eventType": "inventory.updated",
  "timestamp": "2025-11-28T10:30:00Z",
  "data": {
    "itemNo": "ITEM001",
    "variantCode": "M-BLK",
    "locationCode": "MAIN",
    "oldQuantity": 125,
    "newQuantity": 150,
    "changeReason": "PHYSICAL_COUNT"
  }
}
```

## SDK and Integration Examples

### C# SDK Example

```csharp
using BRCRetailAPI;

var client = new BRCRetailClient("tenant-id", "environment");
await client.AuthenticateAsync("client-id", "client-secret");

// Update inventory
var updateRequest = new InventoryUpdateRequest
{
    ItemNo = "ITEM001",
    VariantCode = "M-BLK",
    LocationCode = "MAIN",
    Quantity = 150,
    AdjustmentType = AdjustmentType.Absolute
};

var result = await client.Inventory.UpdateAsync(updateRequest);
```

### PowerShell Example

```powershell
# Authenticate
$token = Invoke-RestMethod -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
    -Method Post -Body @{
        grant_type = "client_credentials"
        client_id = $clientId
        client_secret = $clientSecret
        scope = "https://api.businesscentral.dynamics.com/.default"
    }

# Update inventory
$headers = @{ Authorization = "Bearer $($token.access_token)" }
$body = @{
    itemNo = "ITEM001"
    variantCode = "M-BLK"
    locationCode = "MAIN"
    quantity = 150
    adjustmentType = "absolute"
} | ConvertTo-Json

Invoke-RestMethod -Uri "$baseUrl/inventory/variants/update" `
    -Method Post -Headers $headers -Body $body -ContentType "application/json"
```

### JavaScript/Node.js Example

```javascript
const axios = require('axios');

class BRCRetailClient {
    constructor(tenantId, environment, clientId, clientSecret) {
        this.baseUrl = `https://api.businesscentral.dynamics.com/v2.0/${tenantId}/${environment}/api/brightcom/brcretail/v1.0`;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    async authenticate() {
        const tokenResponse = await axios.post(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
            grant_type: 'client_credentials',
            client_id: this.clientId,
            client_secret: this.clientSecret,
            scope: 'https://api.businesscentral.dynamics.com/.default'
        });
        
        this.accessToken = tokenResponse.data.access_token;
    }

    async updateInventory(itemNo, variantCode, locationCode, quantity) {
        const response = await axios.post(`${this.baseUrl}/inventory/variants/update`, {
            itemNo,
            variantCode,
            locationCode,
            quantity,
            adjustmentType: 'absolute'
        }, {
            headers: { Authorization: `Bearer ${this.accessToken}` }
        });
        
        return response.data;
    }
}
```

## Testing and Development

### Sandbox Environment

**Test Endpoints:**
- Use Sandbox environment for development and testing
- Test data is isolated from production
- Full API functionality available

**Test Data:**
- Sample items with variant structures
- Predefined variant templates
- Test inventory locations

### API Testing Tools

**Recommended Tools:**
- Postman collection available
- Swagger/OpenAPI documentation
- curl command examples
- SDK samples and documentation

## Support and Resources

### API Support

**Documentation:**
- Interactive API documentation available
- SDK documentation and samples
- Integration best practices guide

**Support Channels:**
- Technical API support through BrightCom Solutions AB
- Community forums for integration questions
- Partner network for implementation assistance

**Monitoring:**
- API health status page
- Performance metrics and SLA information
- Planned maintenance notifications

This comprehensive API reference provides the technical foundation for integrating with BRC Retail Extension. For specific implementation scenarios or advanced integration requirements, contact the BrightCom Solutions AB technical team.