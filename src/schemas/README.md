# Line Array Products Schema Documentation

This directory contains comprehensive schemas for the Line Array Products system, including TypeScript interfaces, JSON schemas, API documentation, and validation utilities. The system now supports both **flat** and **hierarchical** data structures for maximum flexibility.

## 📁 Files Overview

### 1. `LineArrayProductSchema.ts`

**TypeScript Schema with Validation**

- Defines the core product interface (`ILineArrayProduct`)
- Includes comprehensive validation rules
- Provides `ProductValidator` class for runtime validation
- Contains utility functions for product operations

**Key Features:**

- ✅ Field validation with custom error messages
- ✅ Business logic validation (e.g., originalPrice >= price)
- ✅ Utility functions for discount calculation, stock status, etc.
- ✅ SKU generation helper

### 2. `LineArrayProductTypes.ts`

**Complete TypeScript Interface Definitions**

- All interfaces used throughout the application
- API request/response types
- Redux state interfaces
- Filter and search parameter types
- Error handling interfaces

**Key Interfaces:**

- `LineArrayProduct` - Main product interface
- `ProductCategory` - Hierarchical category structure
- `ProductSubCategory` - Subcategory with products
- `LineArrayProductsData` - Hierarchical data structure (matches JSON)
- `LineArrayProductsResponse` - API list response (supports both flat and hierarchical)
- `SingleProductResponse` - API single item response
- `CreateProductRequest` - Product creation payload
- `UpdateProductRequest` - Product update payload
- `ProductFilters` - Search/filter parameters
- `LineArrayProductsState` - Redux state structure (supports both data types)

### 3. `LineArrayProductJSONSchema.ts`

**JSON Schema for API Validation**

- OpenAPI-compatible JSON schemas
- Request/response validation schemas
- Field-level validation rules
- API documentation schemas

**Schemas Included:**

- `LineArrayProductJSONSchema` - Complete product schema
- `CreateLineArrayProductSchema` - Creation validation
- `UpdateLineArrayProductSchema` - Update validation
- `ProductListResponseSchema` - List API response
- `ProductResponseSchema` - Single API response
- `ProductSearchParamsSchema` - Search parameters

### 4. `LineArrayProductAPIDoc.ts`

**OpenAPI 3.0 API Documentation**

- Complete API specification
- Endpoint documentation
- Request/response examples
- Error handling documentation

**API Endpoints Documented:**

- `GET /product/line-array` - List products with filtering
- `POST /product/line-array` - Create new product
- `GET /product/line-array/{id}` - Get single product
- `PUT /product/line-array/{id}` - Update product
- `DELETE /product/line-array/{id}` - Delete product

## 🏗️ Data Structure Support

The system now supports **two data structures**:

### 1. Flat Structure (Legacy)

```typescript
// Array of products directly
const products: LineArrayProduct[] = [
    { _id: "1", name: "Speaker 1", ... },
    { _id: "2", name: "Speaker 2", ... }
];
```

### 2. Hierarchical Structure (New)

```typescript
// Nested categories and subcategories
const hierarchicalData: LineArrayProductsData = [
    {
        categoryName: "Professional Line Array Systems",
        subCategories: [
            {
                subCategoryName: "Line Array Speakers",
                products: [
                    { _id: "1", name: "Speaker 1", ... },
                    { _id: "2", name: "Speaker 2", ... }
                ]
            }
        ]
    }
];
```

### Automatic Detection

The Redux slice automatically detects whether incoming data is flat or hierarchical and handles both appropriately.

## 🚀 Usage Examples

### TypeScript Interface Usage

```typescript
import { CreateProductRequest, LineArrayProduct } from '@/schemas/LineArrayProductTypes';

const newProduct: CreateProductRequest = {
    name: 'TOA HX-5B Speaker',
    image: '/images/speaker.jpg',
    price: 1299.99,
    description: 'Professional line array speaker',
    category: 'Line Array Speakers',
    categoryId: 'line-array-professional',
    categoryName: 'Professional Line Array Systems',
    inStock: true,
    stockCount: 12,
    reviewCount: 0,
    tags: ['Professional', 'High-Quality'],
    specifications: {
        'Power Handling': '600W Program',
        Impedance: '8 Ω',
    },
    brand: 'TOA',
    sku: 'TOA-HX5B-001',
    warranty: '5-Year Manufacturer Warranty',
};
```

### Validation Usage

```typescript
import { ILineArrayProduct, ProductValidator } from '@/schemas/LineArrayProductSchema';

const product: Partial<ILineArrayProduct> = {
    name: 'Test Speaker',
    price: 999.99,
    // ... other fields
};

const errors = ProductValidator.validateProduct(product);
if (errors.length > 0) {
    console.log('Validation errors:', errors);
} else {
    console.log('Product is valid');
}
```

### Utility Functions Usage

```typescript
import { ProductUtils } from '@/schemas/LineArrayProductSchema';

const product: ILineArrayProduct = {
    // ... product data
    price: 999.99,
    originalPrice: 1299.99,
    stockCount: 3,
};

// Calculate discount
const discount = ProductUtils.calculateDiscountPercentage(product.price, product.originalPrice);
console.log(`Discount: ${discount}%`);

// Check stock status
const status = ProductUtils.getAvailabilityStatus(product);
console.log(`Status: ${status}`);

// Generate SKU
const sku = ProductUtils.generateSKU('TOA', 'HX5B', 'WP');
console.log(`Generated SKU: ${sku}`);
```

### Hierarchical Data Usage

```typescript
import { LineArrayDataUtils } from '@/schemas/LineArrayProductTypes';

const hierarchicalData: LineArrayProductsData = [
    // ... your hierarchical data
];

// Flatten all products
const allProducts = LineArrayDataUtils.flattenProducts(hierarchicalData);

// Get products by category
const speakers = LineArrayDataUtils.getProductsByCategory(
    hierarchicalData,
    'Professional Line Array Systems',
);

// Get products by subcategory
const lineArraySpeakers = LineArrayDataUtils.getProductsBySubCategory(
    hierarchicalData,
    'Line Array Speakers',
);

// Get all category names
const categories = LineArrayDataUtils.getCategoryNames(hierarchicalData);

// Search across all products
const searchResults = LineArrayDataUtils.searchProducts(hierarchicalData, 'TOA');

// Get total product count
const totalCount = LineArrayDataUtils.getTotalProductCount(hierarchicalData);
```

### JSON Schema Validation

```typescript
import Ajv from 'ajv';

import { LineArrayProductJSONSchema } from '@/schemas/LineArrayProductJSONSchema';

const ajv = new Ajv();
const validate = ajv.compile(LineArrayProductJSONSchema);

const productData = {
    // ... product data
};

const isValid = validate(productData);
if (!isValid) {
    console.log('Validation errors:', validate.errors);
}
```

## 📋 Field Specifications

### Required Fields

- `name` - Product name (1-200 characters)
- `image` - Image path (must be valid image file)
- `price` - Product price (0-999999.99)
- `description` - Product description (10-1000 characters)
- `category` - Product category (enum)
- `categoryId` - Category identifier (enum)
- `categoryName` - Category display name (max 100 chars)
- `inStock` - Stock availability (boolean)
- `stockCount` - Number in stock (0-9999)
- `reviewCount` - Number of reviews (0-99999)
- `tags` - Product tags (1-10 items, max 50 chars each)
- `specifications` - Technical specs (1-20 properties)
- `brand` - Product brand (1-100 characters)
- `sku` - Stock keeping unit (3-50 chars, uppercase)
- `warranty` - Warranty information (1-200 characters)

### Optional Fields

- `originalPrice` - Original price before discount
- `rating` - Average rating (0-5)

### Auto-Generated Fields

- `_id` - Unique identifier
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## 🔍 Validation Rules

### Business Logic Validation

- `originalPrice` cannot be less than `price`
- `inStock` is automatically set based on `stockCount`
- SKU must be unique across all products
- Tags must be unique within a product
- Specifications must have at least one entry

### Format Validation

- Image paths must end with valid image extensions
- SKU must contain only uppercase letters, numbers, and hyphens
- Price values must have at most 2 decimal places
- Rating must be between 0 and 5

## 🛠️ Integration with Redux

The schemas are designed to work seamlessly with the Redux implementation and support both data structures:

```typescript
// Redux slice integration
// Using selectors
import {
    selectCategoriesData,
    selectProductList,
    selectProductsByCategory,
    selectProductsBySubCategory,
} from '@/redux/reducers/LineArrayProductsSlice';
import {
    LineArrayProduct,
    LineArrayProductsData,
    ProductFilters,
} from '@/schemas/LineArrayProductTypes';

// State interface matches schema (supports both flat and hierarchical)
interface LineArrayProductsState {
    categoriesData: LineArrayProductsData; // Hierarchical data
    productList: LineArrayProduct[]; // Flat data (for backward compatibility)
    productInfo: LineArrayProduct | null;
    filters: ProductFilters;
    // ... other state properties
}

// Get flat product list
const products = useSelector(selectProductList);

// Get hierarchical data
const categories = useSelector(selectCategoriesData);

// Get products by category
const speakers = useSelector(selectProductsByCategory('Professional Line Array Systems'));

// Get products by subcategory
const lineArraySpeakers = useSelector(selectProductsBySubCategory('Line Array Speakers'));
```

## 📊 API Integration

The schemas support all CRUD operations:

```typescript
// API request types
type CreateProductRequest = Omit<LineArrayProduct, '_id' | 'createdAt' | 'updatedAt'>;
type UpdateProductRequest = Partial<LineArrayProduct> & { _id: string };

// API response types
interface LineArrayProductsResponse {
    success: boolean;
    data: LineArrayProduct[];
    total?: number;
    page?: number;
    limit?: number;
}
```

## 🔧 Customization

### Adding New Fields

1. Update the interface in `LineArrayProductTypes.ts`
2. Add validation rules in `LineArrayProductSchema.ts`
3. Update JSON schemas in `LineArrayProductJSONSchema.ts`
4. Update API documentation in `LineArrayProductAPIDoc.ts`

### Adding New Validation Rules

```typescript
// In ProductValidator class
static validateCustomField(product: Partial<ILineArrayProduct>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (product.customField && !this.isValidCustomField(product.customField)) {
        errors.push({
            field: 'customField',
            message: 'Custom field validation failed'
        });
    }

    return errors;
}
```

## 📝 Notes

- All schemas are TypeScript-first for better type safety
- Validation is comprehensive and covers both format and business logic
- Schemas are designed to be extensible and maintainable
- JSON schemas are compatible with OpenAPI 3.0 specification
- All interfaces are exported for easy importing throughout the application

## 🤝 Contributing

When modifying schemas:

1. Update all related files consistently
2. Add appropriate validation rules
3. Update documentation and examples
4. Test validation thoroughly
5. Ensure backward compatibility when possible
