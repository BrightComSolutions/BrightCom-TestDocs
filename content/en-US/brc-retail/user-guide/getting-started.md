---
title: "Getting Started"
linkTitle: "Getting Started"
weight: 31
description: >
  Essential information for new users of BRC Retail Extension including basic concepts, navigation, and first steps.
---

## Welcome to BRC Retail Extension

BRC Retail Extension enhances your Business Central environment with advanced variant management capabilities designed specifically for retail businesses. This guide will help you understand the key concepts and get started with your daily tasks.

## Key Concepts You Need to Know

### What Are Variants?

In retail, products often come in multiple versions - different sizes, colors, styles, or other characteristics. BRC Retail Extension helps you manage these variations systematically:

- **Item**: The base product (e.g., "Cotton T-Shirt")
- **Variant**: A specific version of that product (e.g., "Medium Blue Cotton T-Shirt")  
- **Variant Dimensions**: The characteristics that define variants (Size, Color, etc.)
- **Variant Values**: Specific options within each dimension (Small, Medium, Large for Size)

### The Two-Dimension System

BRC Retail Extension uses a powerful two-dimension variant system:

**Dimension 1 (Primary)**: Usually the most important characteristic
- Examples: Size, Model, Style

**Dimension 2 (Secondary)**: Additional characteristic for further specification  
- Examples: Color, Finish, Material

**Combined Code**: System automatically creates codes like "M-BLU" (Medium Blue)

### Variant Templates

Think of variant templates as blueprints that define how variants work for different product categories:

- **Apparel Template**: Size (S,M,L,XL) + Color (Red, Blue, Green)
- **Footwear Template**: Size (6,7,8,9,10) + Width (Narrow, Medium, Wide)
- **Electronics Template**: Storage (128GB, 256GB, 512GB) + Color (Silver, Black, Gold)

## Navigating BRC Retail Extension

### Finding Variant-Related Pages

Use Business Central's search function to quickly locate pages:

**Setup and Configuration:**
- Search: "BRC Retail Setup" - Main configuration page
- Search: "BRC Retail Variant Templates" - Template management
- Search: "BRC Retail Variants" - Dimension setup

**Daily Operations:**
- Search: "BRC Retail Variant Values" - Value management
- Search: "BRC Retail Item Variants" - Item-specific variant information
- Search: "Items" - Enhanced with variant functionality

**Reporting:**
- Search: "BRC Retail Matrix" - Matrix-style reports
- Search: "BRC Retail Inventory" - Variant inventory reports

### Enhanced Standard Pages

BRC Retail Extension enhances existing Business Central pages:

**Item Cards:** Now include variant template assignment and variant counters
**Sales Orders:** Lines show variant information and matrix views
**Purchase Orders:** Enhanced with variant selection and matrix capabilities
**Inventory Pages:** Display inventory across variant combinations

## Your First Variant Setup

Follow these steps to create your first variant structure:

### Step 1: Understand Your Products

Before starting, identify:
- What product categories need variants?
- What characteristics define your variants? (Size, Color, Style, etc.)
- How many dimensions do you need? (Most products use 1-2 dimensions)

### Step 2: Create Variant Dimensions

1. **Open Variant Management**
   - Search for "BRC Retail Variants"
   - Click **New** to create a dimension

2. **Set Up Size Dimension**
   ```
   Code: SIZE
   Name: Size  
   Variant Type: Size
   Description: Product Size Dimension
   ```

3. **Set Up Color Dimension** (if needed)
   ```
   Code: COLOR
   Name: Color
   Variant Type: Colour  
   Description: Product Color Dimension
   ```

### Step 3: Create Variant Values

1. **Open Variant Values**
   - Search for "BRC Retail Variant Values"
   - Create values for each dimension

2. **Size Values Example:**
   ```
   Variant Code: SIZE
   Code: S, Name: Small, Sorting: 10
   Code: M, Name: Medium, Sorting: 20  
   Code: L, Name: Large, Sorting: 30
   Code: XL, Name: Extra Large, Sorting: 40
   ```

3. **Color Values Example:**
   ```
   Variant Code: COLOR  
   Code: BLK, Name: Black, Sorting: 10
   Code: WHT, Name: White, Sorting: 20
   Code: RED, Name: Red, Sorting: 30
   ```

**Sorting Tips:**
- Use increments of 10 (10, 20, 30, etc.)
- This allows easy insertion of new values later
- Values display in ascending order of sorting numbers

### Step 4: Create a Variant Template

1. **Open Variant Templates**
   - Search for "BRC Retail Variant Templates"
   - Click **New**

2. **Configure Template**
   ```
   Code: APPAREL
   Description: Apparel Products  
   Variant Code 1: SIZE
   Variant Code 2: COLOR
   Variant Code Separator: -
   ```

This creates variants like "M-BLK" (Medium Black), "L-RED" (Large Red), etc.

### Step 5: Apply Template to an Item

1. **Open Item Card**
   - Find an existing item or create a new one
   - Go to the item card

2. **Assign Template**
   - Set field **"BRC Retail Variant Templ Code"** to "APPAREL"
   - Save the item

3. **Generate Variants**
   - System will automatically offer to create variants
   - Accept to generate all combinations (S-BLK, S-WHT, S-RED, M-BLK, etc.)

## Working with Variants Daily

### Creating Sales Orders with Variants

1. **Create Sales Order**
   - Standard Business Central sales order creation
   - Add customer information as usual

2. **Add Variant Item**
   - In sales lines, select your variant-enabled item
   - System shows variant selection options

3. **Select Specific Variant**
   - Choose the exact variant needed (e.g., "Medium Blue")
   - Quantity and pricing work normally
   - Repeat for additional variants

4. **Use Matrix View** (Advanced)
   - Click matrix view action for grid-style variant selection
   - Useful for orders with multiple variant combinations

### Checking Inventory by Variant

1. **Open Item Card**
   - Navigate to your variant-enabled item
   - Inventory information now shows by variant

2. **View Variant Inventory Matrix**
   - Search for "BRC Retail Var by Location"
   - See inventory levels across all variant combinations
   - Filter by location, item, or date as needed

3. **Run Inventory Reports**
   - Use enhanced inventory reports showing variant breakdowns
   - Matrix-style formatting for easy analysis

## Common Beginner Workflows

### Workflow 1: Adding a New Variant Value

When you need a new size (like XXL):

1. Open "BRC Retail Variant Values"
2. Create new entry: Code: XXL, Name: Extra Extra Large, Sorting: 50
3. For existing items, manually create new variants or regenerate

### Workflow 2: Setting Up a New Product Category

For a new product type requiring different variants:

1. Create new variant dimensions if needed (e.g., "STORAGE" for electronics)
2. Create variant values for the new dimension
3. Create new variant template combining appropriate dimensions  
4. Apply template to items in that category

### Workflow 3: Handling Seasonal Products

For seasonal products:
1. Use the Season field on item cards
2. Set up seasons in "BRC Retail Seasons"  
3. Configure seasonal delivery management in BRC Retail Setup
4. System automatically manages seasonal information

## Best Practices for Beginners

### Start Simple
- Begin with one dimension (e.g., Size only)
- Add complexity gradually as you become comfortable
- Test with a few items before applying broadly

### Plan Your Structure
- Think about future needs when designing variant templates
- Use consistent naming conventions
- Document your variant structure decisions

### Data Quality
- Use clear, descriptive names for variants and values
- Set sorting numbers thoughtfully for logical display order
- Regularly review and clean up unused variants

### User Training
- Ensure all users understand the variant concepts
- Train on both variant setup and daily usage
- Provide quick reference guides for common tasks

## Getting Help

### Built-in Help
- **Field Tooltips**: Hover over fields for quick explanations
- **Page Help**: Press F1 for context-sensitive help
- **Search**: Use Business Central search to find variant-related pages

### When You Need Assistance
- **Documentation**: Check this user guide and [Advanced Features](advanced-features.md)
- **Support**: Contact BrightCom Solutions AB for technical assistance
- **Training**: Request additional training for complex scenarios

## Next Steps

Once you're comfortable with the basics:

1. **Explore Daily Operations**
   - Review [Daily Operations](daily-operations.md) for detailed procedures
   - Practice with real business scenarios

2. **Learn Advanced Features**  
   - Explore [Advanced Features](advanced-features.md) for power user capabilities
   - Investigate matrix reporting and barcode features

3. **Optimize Your Setup**
   - Fine-tune variant structures based on experience
   - Consider additional features like multi-language support

## Quick Reference

### Essential Pages
- **BRC Retail Setup**: Main configuration
- **BRC Retail Variant Templates**: Blueprint management  
- **BRC Retail Variants**: Dimension setup
- **BRC Retail Variant Values**: Value management
- **BRC Retail Item Variants**: Item-specific variant info

### Common Tasks
- **Create Variant**: Set up dimensions → values → template → apply to item
- **Sales with Variants**: Create order → select variant item → choose specific variant
- **Check Inventory**: Item card → variant inventory or matrix view
- **Add New Value**: Variant Values page → new entry with appropriate sorting

You're now ready to start working with BRC Retail Extension! Remember, start simple and build complexity gradually as you become more comfortable with the system.