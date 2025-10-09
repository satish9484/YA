// API Documentation Schema for Line Array Products
// OpenAPI 3.0 specification for the product endpoints

export const LineArrayProductAPISchema = {
    openapi: '3.0.0',
    info: {
        title: 'Yashvi Audio Line Array Products API',
        description: 'API for managing line array speaker products',
        version: '1.0.0',
        contact: {
            name: 'Yashvi Audio Support',
            email: 'support@yashvi-audio.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server',
        },
        {
            url: 'https://api.yashvi-audio.com',
            description: 'Production server',
        },
    ],
    paths: {
        '/product/line-array': {
            get: {
                summary: 'Get all line array products',
                description:
                    'Retrieve a paginated list of line array products with optional filtering and sorting',
                tags: ['Products'],
                parameters: [
                    {
                        name: 'search',
                        in: 'query',
                        description: 'Search term for product name, description, or brand',
                        required: false,
                        schema: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 100,
                        },
                    },
                    {
                        name: 'category',
                        in: 'query',
                        description: 'Filter by product category',
                        required: false,
                        schema: {
                            type: 'string',
                            enum: ['Line Array Speakers', 'Subwoofers', 'Mounting Hardware'],
                        },
                    },
                    {
                        name: 'brand',
                        in: 'query',
                        description: 'Filter by product brand',
                        required: false,
                        schema: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 100,
                        },
                    },
                    {
                        name: 'minPrice',
                        in: 'query',
                        description: 'Minimum price filter',
                        required: false,
                        schema: {
                            type: 'number',
                            minimum: 0,
                            maximum: 999999.99,
                        },
                    },
                    {
                        name: 'maxPrice',
                        in: 'query',
                        description: 'Maximum price filter',
                        required: false,
                        schema: {
                            type: 'number',
                            minimum: 0,
                            maximum: 999999.99,
                        },
                    },
                    {
                        name: 'inStock',
                        in: 'query',
                        description: 'Filter by stock availability',
                        required: false,
                        schema: {
                            type: 'boolean',
                        },
                    },
                    {
                        name: 'rating',
                        in: 'query',
                        description: 'Minimum rating filter',
                        required: false,
                        schema: {
                            type: 'number',
                            minimum: 0,
                            maximum: 5,
                        },
                    },
                    {
                        name: 'sortBy',
                        in: 'query',
                        description: 'Sort field',
                        required: false,
                        schema: {
                            type: 'string',
                            enum: ['price', 'rating', 'name', 'createdAt'],
                            default: 'name',
                        },
                    },
                    {
                        name: 'sortOrder',
                        in: 'query',
                        description: 'Sort order',
                        required: false,
                        schema: {
                            type: 'string',
                            enum: ['asc', 'desc'],
                            default: 'asc',
                        },
                    },
                    {
                        name: 'page',
                        in: 'query',
                        description: 'Page number',
                        required: false,
                        schema: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 1000,
                            default: 1,
                        },
                    },
                    {
                        name: 'limit',
                        in: 'query',
                        description: 'Items per page',
                        required: false,
                        schema: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 100,
                            default: 10,
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['success', 'data'],
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            example: true,
                                        },
                                        data: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/LineArrayProduct',
                                            },
                                        },
                                        total: {
                                            type: 'integer',
                                            description: 'Total number of products',
                                            example: 150,
                                        },
                                        page: {
                                            type: 'integer',
                                            description: 'Current page number',
                                            example: 1,
                                        },
                                        limit: {
                                            type: 'integer',
                                            description: 'Items per page',
                                            example: 10,
                                        },
                                        totalPages: {
                                            type: 'integer',
                                            description: 'Total number of pages',
                                            example: 15,
                                        },
                                        message: {
                                            type: 'string',
                                            example: 'Products retrieved successfully',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse',
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Create a new line array product',
                description: 'Create a new line array product',
                tags: ['Products'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreateProductRequest',
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Product created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['success', 'data'],
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            example: true,
                                        },
                                        data: {
                                            $ref: '#/components/schemas/LineArrayProduct',
                                        },
                                        message: {
                                            type: 'string',
                                            example: 'Product created successfully',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Validation error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ValidationErrorResponse',
                                },
                            },
                        },
                    },
                    '409': {
                        description: 'Product with SKU already exists',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/product/line-array/{id}': {
            get: {
                summary: 'Get a specific product by ID',
                description: 'Retrieve a single line array product by its ID',
                tags: ['Products'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Product ID',
                        schema: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-_]+$',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Product found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['success', 'data'],
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            example: true,
                                        },
                                        data: {
                                            $ref: '#/components/schemas/LineArrayProduct',
                                        },
                                        message: {
                                            type: 'string',
                                            example: 'Product retrieved successfully',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Product not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse',
                                },
                            },
                        },
                    },
                },
            },
            put: {
                summary: 'Update a product',
                description: 'Update an existing line array product',
                tags: ['Products'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Product ID',
                        schema: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-_]+$',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UpdateProductRequest',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Product updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['success', 'data'],
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            example: true,
                                        },
                                        data: {
                                            $ref: '#/components/schemas/LineArrayProduct',
                                        },
                                        message: {
                                            type: 'string',
                                            example: 'Product updated successfully',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Validation error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ValidationErrorResponse',
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Product not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse',
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                summary: 'Delete a product',
                description: 'Delete a line array product',
                tags: ['Products'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Product ID',
                        schema: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-_]+$',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Product deleted successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['success'],
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            example: true,
                                        },
                                        message: {
                                            type: 'string',
                                            example: 'Product deleted successfully',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Product not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            LineArrayProduct: {
                type: 'object',
                required: [
                    '_id',
                    'name',
                    'image',
                    'price',
                    'description',
                    'category',
                    'categoryId',
                    'categoryName',
                    'inStock',
                    'stockCount',
                    'reviewCount',
                    'tags',
                    'specifications',
                    'brand',
                    'sku',
                    'warranty',
                ],
                properties: {
                    _id: {
                        type: 'string',
                        description: 'Unique product identifier',
                        example: 'toa-hx5b',
                    },
                    name: {
                        type: 'string',
                        description: 'Product name',
                        example: 'TOA HX-5B Variable Dispersion Line Array Speaker',
                    },
                    image: {
                        type: 'string',
                        description: 'Product image path',
                        example: '/adobe/AdobeStock_1399177338_Preview.png',
                    },
                    price: {
                        type: 'number',
                        description: 'Current product price',
                        example: 1299.99,
                    },
                    originalPrice: {
                        type: 'number',
                        description: 'Original price before discount',
                        example: 1499.99,
                    },
                    description: {
                        type: 'string',
                        description: 'Product description',
                        example:
                            'Precision Sound Control for Challenging Acoustic Spaces with variable dispersion technology',
                    },
                    category: {
                        type: 'string',
                        enum: ['Line Array Speakers', 'Subwoofers', 'Mounting Hardware'],
                        example: 'Line Array Speakers',
                    },
                    categoryId: {
                        type: 'string',
                        enum: ['line-array-professional', 'line-array-accessories'],
                        example: 'line-array-professional',
                    },
                    categoryName: {
                        type: 'string',
                        example: 'Professional Line Array Systems',
                    },
                    inStock: {
                        type: 'boolean',
                        example: true,
                    },
                    stockCount: {
                        type: 'integer',
                        example: 12,
                    },
                    rating: {
                        type: 'number',
                        minimum: 0,
                        maximum: 5,
                        example: 4.8,
                    },
                    reviewCount: {
                        type: 'integer',
                        example: 127,
                    },
                    tags: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        example: ['Professional', 'Variable Dispersion', 'High-Quality'],
                    },
                    specifications: {
                        type: 'object',
                        additionalProperties: {
                            type: 'string',
                        },
                        example: {
                            'Power Handling': '600W Program / 300W Continuous',
                            Impedance: '8 Ω',
                            Sensitivity: '96-99 dB (varies by dispersion angle)',
                        },
                    },
                    brand: {
                        type: 'string',
                        example: 'TOA',
                    },
                    sku: {
                        type: 'string',
                        example: 'TOA-HX5B-001',
                    },
                    warranty: {
                        type: 'string',
                        example: '5-Year Manufacturer Warranty',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-01-15T10:00:00.000Z',
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-01-15T10:00:00.000Z',
                    },
                },
            },
            CreateProductRequest: {
                type: 'object',
                required: [
                    'name',
                    'image',
                    'price',
                    'description',
                    'category',
                    'categoryId',
                    'categoryName',
                    'inStock',
                    'stockCount',
                    'reviewCount',
                    'tags',
                    'specifications',
                    'brand',
                    'sku',
                    'warranty',
                ],
                properties: {
                    name: {
                        type: 'string',
                        minLength: 1,
                        maxLength: 200,
                        example: 'TOA HX-5B Variable Dispersion Line Array Speaker',
                    },
                    image: {
                        type: 'string',
                        pattern: '^\\/.*\\.(jpg|jpeg|png|gif|webp)$',
                        example: '/adobe/AdobeStock_1399177338_Preview.png',
                    },
                    price: {
                        type: 'number',
                        minimum: 0,
                        example: 1299.99,
                    },
                    originalPrice: {
                        type: 'number',
                        minimum: 0,
                        example: 1499.99,
                    },
                    description: {
                        type: 'string',
                        minLength: 10,
                        maxLength: 1000,
                        example: 'Precision Sound Control for Challenging Acoustic Spaces',
                    },
                    category: {
                        type: 'string',
                        enum: ['Line Array Speakers', 'Subwoofers', 'Mounting Hardware'],
                    },
                    categoryId: {
                        type: 'string',
                        enum: ['line-array-professional', 'line-array-accessories'],
                    },
                    categoryName: {
                        type: 'string',
                        example: 'Professional Line Array Systems',
                    },
                    inStock: {
                        type: 'boolean',
                        example: true,
                    },
                    stockCount: {
                        type: 'integer',
                        minimum: 0,
                        example: 12,
                    },
                    rating: {
                        type: 'number',
                        minimum: 0,
                        maximum: 5,
                        example: 4.8,
                    },
                    reviewCount: {
                        type: 'integer',
                        minimum: 0,
                        example: 127,
                    },
                    tags: {
                        type: 'array',
                        items: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        minItems: 1,
                        maxItems: 10,
                        example: ['Professional', 'Variable Dispersion', 'High-Quality'],
                    },
                    specifications: {
                        type: 'object',
                        additionalProperties: {
                            type: 'string',
                            maxLength: 200,
                        },
                        minProperties: 1,
                        maxProperties: 20,
                    },
                    brand: {
                        type: 'string',
                        minLength: 1,
                        maxLength: 100,
                        example: 'TOA',
                    },
                    sku: {
                        type: 'string',
                        pattern: '^[A-Z0-9\\-]+$',
                        minLength: 3,
                        maxLength: 50,
                        example: 'TOA-HX5B-001',
                    },
                    warranty: {
                        type: 'string',
                        minLength: 1,
                        maxLength: 200,
                        example: '5-Year Manufacturer Warranty',
                    },
                },
            },
            UpdateProductRequest: {
                type: 'object',
                required: ['_id'],
                properties: {
                    _id: {
                        type: 'string',
                        example: 'toa-hx5b',
                    },
                    name: {
                        type: 'string',
                        minLength: 1,
                        maxLength: 200,
                    },
                    image: {
                        type: 'string',
                        pattern: '^\\/.*\\.(jpg|jpeg|png|gif|webp)$',
                    },
                    price: {
                        type: 'number',
                        minimum: 0,
                    },
                    originalPrice: {
                        type: 'number',
                        minimum: 0,
                    },
                    description: {
                        type: 'string',
                        minLength: 10,
                        maxLength: 1000,
                    },
                    category: {
                        type: 'string',
                        enum: ['Line Array Speakers', 'Subwoofers', 'Mounting Hardware'],
                    },
                    categoryId: {
                        type: 'string',
                        enum: ['line-array-professional', 'line-array-accessories'],
                    },
                    categoryName: {
                        type: 'string',
                    },
                    inStock: {
                        type: 'boolean',
                    },
                    stockCount: {
                        type: 'integer',
                        minimum: 0,
                    },
                    rating: {
                        type: 'number',
                        minimum: 0,
                        maximum: 5,
                    },
                    reviewCount: {
                        type: 'integer',
                        minimum: 0,
                    },
                    tags: {
                        type: 'array',
                        items: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        maxItems: 10,
                    },
                    specifications: {
                        type: 'object',
                        additionalProperties: {
                            type: 'string',
                            maxLength: 200,
                        },
                        maxProperties: 20,
                    },
                    brand: {
                        type: 'string',
                        minLength: 1,
                        maxLength: 100,
                    },
                    sku: {
                        type: 'string',
                        pattern: '^[A-Z0-9\\-]+$',
                        minLength: 3,
                        maxLength: 50,
                    },
                    warranty: {
                        type: 'string',
                        minLength: 1,
                        maxLength: 200,
                    },
                },
            },
            ErrorResponse: {
                type: 'object',
                required: ['success', 'message'],
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'An error occurred',
                    },
                    code: {
                        type: 'string',
                        example: 'PRODUCT_NOT_FOUND',
                    },
                },
            },
            ValidationErrorResponse: {
                type: 'object',
                required: ['success', 'message', 'errors'],
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Validation failed',
                    },
                    errors: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['field', 'message'],
                            properties: {
                                field: {
                                    type: 'string',
                                    example: 'name',
                                },
                                message: {
                                    type: 'string',
                                    example: 'Name is required',
                                },
                                value: {
                                    type: 'string',
                                    example: '',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    tags: [
        {
            name: 'Products',
            description: 'Operations related to line array products',
        },
    ],
};

export default LineArrayProductAPISchema;
