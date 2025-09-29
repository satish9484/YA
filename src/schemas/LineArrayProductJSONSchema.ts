// JSON Schema for Line Array Product API Validation
// This schema can be used for request/response validation

export const LineArrayProductJSONSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://yashvi-audio.com/schemas/line-array-product.json",
    title: "Line Array Product",
    description: "Schema for line array speaker products",
    type: "object",
    required: [
        "name",
        "image", 
        "price",
        "description",
        "category",
        "categoryId",
        "categoryName",
        "inStock",
        "stockCount",
        "reviewCount",
        "tags",
        "specifications",
        "brand",
        "sku",
        "warranty"
    ],
    properties: {
        _id: {
            type: "string",
            description: "Unique product identifier",
            pattern: "^[a-zA-Z0-9-_]+$",
            minLength: 1,
            maxLength: 50
        },
        name: {
            type: "string",
            description: "Product name",
            minLength: 1,
            maxLength: 200,
            pattern: "^[a-zA-Z0-9\\s\\-&.,()]+$"
        },
        image: {
            type: "string",
            description: "Product image path",
            pattern: "^\\/.*\\.(jpg|jpeg|png|gif|webp)$",
            minLength: 1,
            maxLength: 500
        },
        price: {
            type: "number",
            description: "Current product price",
            minimum: 0,
            maximum: 999999.99,
            multipleOf: 0.01
        },
        originalPrice: {
            type: "number",
            description: "Original price before discount",
            minimum: 0,
            maximum: 999999.99,
            multipleOf: 0.01
        },
        description: {
            type: "string",
            description: "Product description",
            minLength: 10,
            maxLength: 1000
        },
        category: {
            type: "string",
            description: "Product category",
            enum: ["Line Array Speakers", "Subwoofers", "Mounting Hardware"],
            minLength: 1,
            maxLength: 100
        },
        categoryId: {
            type: "string",
            description: "Category identifier",
            enum: ["line-array-professional", "line-array-accessories"],
            minLength: 1,
            maxLength: 50
        },
        categoryName: {
            type: "string",
            description: "Category display name",
            minLength: 1,
            maxLength: 100
        },
        inStock: {
            type: "boolean",
            description: "Product availability status"
        },
        stockCount: {
            type: "integer",
            description: "Number of items in stock",
            minimum: 0,
            maximum: 9999
        },
        rating: {
            type: "number",
            description: "Average product rating",
            minimum: 0,
            maximum: 5,
            multipleOf: 0.1
        },
        reviewCount: {
            type: "integer",
            description: "Total number of reviews",
            minimum: 0,
            maximum: 99999
        },
        tags: {
            type: "array",
            description: "Product tags",
            items: {
                type: "string",
                minLength: 1,
                maxLength: 50,
                pattern: "^[a-zA-Z0-9\\s\\-&]+$"
            },
            minItems: 1,
            maxItems: 10,
            uniqueItems: true
        },
        specifications: {
            type: "object",
            description: "Product technical specifications",
            patternProperties: {
                "^[a-zA-Z0-9\\s\\-&.,()]+$": {
                    type: "string",
                    minLength: 1,
                    maxLength: 200
                }
            },
            minProperties: 1,
            maxProperties: 20
        },
        brand: {
            type: "string",
            description: "Product brand",
            minLength: 1,
            maxLength: 100,
            pattern: "^[a-zA-Z0-9\\s\\-&.,()]+$"
        },
        sku: {
            type: "string",
            description: "Stock Keeping Unit",
            pattern: "^[A-Z0-9\\-]+$",
            minLength: 3,
            maxLength: 50
        },
        warranty: {
            type: "string",
            description: "Warranty information",
            minLength: 1,
            maxLength: 200
        },
        createdAt: {
            type: "string",
            format: "date-time",
            description: "Product creation timestamp"
        },
        updatedAt: {
            type: "string",
            format: "date-time",
            description: "Product last update timestamp"
        }
    },
    additionalProperties: false
};

// Schema for creating a new product (without _id, createdAt, updatedAt)
export const CreateLineArrayProductSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://yashvi-audio.com/schemas/create-line-array-product.json",
    title: "Create Line Array Product",
    description: "Schema for creating a new line array product",
    type: "object",
    required: [
        "name",
        "image",
        "price",
        "description",
        "category",
        "categoryId",
        "categoryName",
        "inStock",
        "stockCount",
        "reviewCount",
        "tags",
        "specifications",
        "brand",
        "sku",
        "warranty"
    ],
    properties: {
        name: LineArrayProductJSONSchema.properties.name,
        image: LineArrayProductJSONSchema.properties.image,
        price: LineArrayProductJSONSchema.properties.price,
        originalPrice: LineArrayProductJSONSchema.properties.originalPrice,
        description: LineArrayProductJSONSchema.properties.description,
        category: LineArrayProductJSONSchema.properties.category,
        categoryId: LineArrayProductJSONSchema.properties.categoryId,
        categoryName: LineArrayProductJSONSchema.properties.categoryName,
        inStock: LineArrayProductJSONSchema.properties.inStock,
        stockCount: LineArrayProductJSONSchema.properties.stockCount,
        rating: LineArrayProductJSONSchema.properties.rating,
        reviewCount: LineArrayProductJSONSchema.properties.reviewCount,
        tags: LineArrayProductJSONSchema.properties.tags,
        specifications: LineArrayProductJSONSchema.properties.specifications,
        brand: LineArrayProductJSONSchema.properties.brand,
        sku: LineArrayProductJSONSchema.properties.sku,
        warranty: LineArrayProductJSONSchema.properties.warranty
    },
    additionalProperties: false
};

// Schema for updating a product (all fields optional except _id)
export const UpdateLineArrayProductSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://yashvi-audio.com/schemas/update-line-array-product.json",
    title: "Update Line Array Product",
    description: "Schema for updating an existing line array product",
    type: "object",
    required: ["_id"],
    properties: {
        _id: LineArrayProductJSONSchema.properties._id,
        name: LineArrayProductJSONSchema.properties.name,
        image: LineArrayProductJSONSchema.properties.image,
        price: LineArrayProductJSONSchema.properties.price,
        originalPrice: LineArrayProductJSONSchema.properties.originalPrice,
        description: LineArrayProductJSONSchema.properties.description,
        category: LineArrayProductJSONSchema.properties.category,
        categoryId: LineArrayProductJSONSchema.properties.categoryId,
        categoryName: LineArrayProductJSONSchema.properties.categoryName,
        inStock: LineArrayProductJSONSchema.properties.inStock,
        stockCount: LineArrayProductJSONSchema.properties.stockCount,
        rating: LineArrayProductJSONSchema.properties.rating,
        reviewCount: LineArrayProductJSONSchema.properties.reviewCount,
        tags: LineArrayProductJSONSchema.properties.tags,
        specifications: LineArrayProductJSONSchema.properties.specifications,
        brand: LineArrayProductJSONSchema.properties.brand,
        sku: LineArrayProductJSONSchema.properties.sku,
        warranty: LineArrayProductJSONSchema.properties.warranty
    },
    additionalProperties: false
};

// Schema for product list response
export const ProductListResponseSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://yashvi-audio.com/schemas/product-list-response.json",
    title: "Product List Response",
    description: "Schema for product list API response",
    type: "object",
    required: ["success", "data"],
    properties: {
        success: {
            type: "boolean",
            description: "Request success status"
        },
        data: {
            type: "array",
            description: "Array of products",
            items: LineArrayProductJSONSchema
        },
        total: {
            type: "integer",
            description: "Total number of products",
            minimum: 0
        },
        page: {
            type: "integer",
            description: "Current page number",
            minimum: 1
        },
        limit: {
            type: "integer",
            description: "Number of items per page",
            minimum: 1,
            maximum: 100
        },
        totalPages: {
            type: "integer",
            description: "Total number of pages",
            minimum: 0
        },
        message: {
            type: "string",
            description: "Response message",
            maxLength: 500
        }
    },
    additionalProperties: false
};

// Schema for single product response
export const ProductResponseSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://yashvi-audio.com/schemas/product-response.json",
    title: "Product Response",
    description: "Schema for single product API response",
    type: "object",
    required: ["success", "data"],
    properties: {
        success: {
            type: "boolean",
            description: "Request success status"
        },
        data: LineArrayProductJSONSchema,
        message: {
            type: "string",
            description: "Response message",
            maxLength: 500
        }
    },
    additionalProperties: false
};

// Schema for product search/filter parameters
export const ProductSearchParamsSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://yashvi-audio.com/schemas/product-search-params.json",
    title: "Product Search Parameters",
    description: "Schema for product search and filter parameters",
    type: "object",
    properties: {
        search: {
            type: "string",
            description: "Search query",
            minLength: 1,
            maxLength: 100
        },
        category: {
            type: "string",
            description: "Filter by category",
            enum: ["Line Array Speakers", "Subwoofers", "Mounting Hardware"]
        },
        brand: {
            type: "string",
            description: "Filter by brand",
            minLength: 1,
            maxLength: 100
        },
        minPrice: {
            type: "number",
            description: "Minimum price filter",
            minimum: 0,
            maximum: 999999.99
        },
        maxPrice: {
            type: "number",
            description: "Maximum price filter",
            minimum: 0,
            maximum: 999999.99
        },
        inStock: {
            type: "boolean",
            description: "Filter by stock availability"
        },
        rating: {
            type: "number",
            description: "Minimum rating filter",
            minimum: 0,
            maximum: 5
        },
        sortBy: {
            type: "string",
            description: "Sort field",
            enum: ["price", "rating", "name", "createdAt"]
        },
        sortOrder: {
            type: "string",
            description: "Sort order",
            enum: ["asc", "desc"]
        },
        page: {
            type: "integer",
            description: "Page number",
            minimum: 1,
            maximum: 1000
        },
        limit: {
            type: "integer",
            description: "Items per page",
            minimum: 1,
            maximum: 100
        }
    },
    additionalProperties: false
};

// Export all schemas
export default {
    LineArrayProduct: LineArrayProductJSONSchema,
    CreateProduct: CreateLineArrayProductSchema,
    UpdateProduct: UpdateLineArrayProductSchema,
    ProductListResponse: ProductListResponseSchema,
    ProductResponse: ProductResponseSchema,
    ProductSearchParams: ProductSearchParamsSchema
};

