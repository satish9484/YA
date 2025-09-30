// TypeScript Schema Definition for Line Array Products
// This schema defines the structure and validation rules for line array products

// Product Specifications Interface
export interface IProductSpecifications {
    [key: string]: string;
}

// Main Product Interface
export interface ILineArrayProduct {
    _id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    description: string;
    category: string;
    categoryId: string;
    categoryName: string;
    inStock: boolean;
    stockCount: number;
    rating?: number;
    reviewCount: number;
    tags: string[];
    specifications: IProductSpecifications;
    brand: string;
    sku: string;
    warranty: string;
    createdAt: string;
    updatedAt: string;
}

// Hierarchical Category Structure Interfaces
export interface IProductSubCategory {
    subCategoryName: string;
    products: ILineArrayProduct[];
}

export interface IProductCategory {
    categoryName: string;
    subCategories: IProductSubCategory[];
}

// Hierarchical Data Structure (matches JSON structure)
export type ILineArrayProductsData = IProductCategory[];

// Validation Error Interface
export interface ValidationError {
    field: string;
    message: string;
    value?: unknown;
}

// Product Validator Class
export class ProductValidator {
    static validateProduct(product: Partial<ILineArrayProduct>): ValidationError[] {
        const errors: ValidationError[] = [];

        // Validate name
        if (!product.name) {
            errors.push({ field: 'name', message: 'Product name is required' });
        } else if (product.name.length < 1) {
            errors.push({ field: 'name', message: 'Product name is too short' });
        } else if (product.name.length > 200) {
            errors.push({ field: 'name', message: 'Product name is too long' });
        }

        // Validate image
        if (!product.image) {
            errors.push({ field: 'image', message: 'Product image is required' });
        } else if (!/^\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(product.image)) {
            errors.push({ field: 'image', message: 'Image must be a valid image path' });
        }

        // Validate price
        if (product.price === undefined) {
            errors.push({ field: 'price', message: 'Product price is required' });
        } else if (product.price < 0) {
            errors.push({ field: 'price', message: 'Price cannot be negative' });
        } else if (product.price > 999999.99) {
            errors.push({ field: 'price', message: 'Price exceeds maximum allowed value' });
        }

        // Validate originalPrice
        if (product.originalPrice !== undefined) {
            if (product.originalPrice < 0) {
                errors.push({
                    field: 'originalPrice',
                    message: 'Original price cannot be negative',
                });
            }
            if (product.originalPrice > 999999.99) {
                errors.push({
                    field: 'originalPrice',
                    message: 'Original price exceeds maximum allowed value',
                });
            }
            if (product.price && product.originalPrice < product.price) {
                errors.push({
                    field: 'originalPrice',
                    message: 'Original price cannot be less than current price',
                });
            }
        }

        // Validate description
        if (!product.description) {
            errors.push({ field: 'description', message: 'Product description is required' });
        } else if (product.description.length < 10) {
            errors.push({ field: 'description', message: 'Description is too short' });
        } else if (product.description.length > 1000) {
            errors.push({ field: 'description', message: 'Description is too long' });
        }

        // Validate category
        const allowedCategories = ['Line Array Speakers', 'Subwoofers', 'Mounting Hardware'];
        if (!product.category) {
            errors.push({ field: 'category', message: 'Product category is required' });
        } else if (!allowedCategories.includes(product.category)) {
            errors.push({ field: 'category', message: 'Invalid category' });
        }

        // Validate categoryId
        const allowedCategoryIds = ['line-array-professional', 'line-array-accessories'];
        if (!product.categoryId) {
            errors.push({ field: 'categoryId', message: 'Category ID is required' });
        } else if (!allowedCategoryIds.includes(product.categoryId)) {
            errors.push({ field: 'categoryId', message: 'Invalid category ID' });
        }

        // Validate categoryName
        if (!product.categoryName) {
            errors.push({ field: 'categoryName', message: 'Category name is required' });
        } else if (product.categoryName.length > 100) {
            errors.push({ field: 'categoryName', message: 'Category name is too long' });
        }

        // Validate inStock
        if (product.inStock === undefined) {
            errors.push({ field: 'inStock', message: 'Stock status is required' });
        }

        // Validate stockCount
        if (product.stockCount === undefined) {
            errors.push({ field: 'stockCount', message: 'Stock count is required' });
        } else if (product.stockCount < 0) {
            errors.push({ field: 'stockCount', message: 'Stock count cannot be negative' });
        } else if (product.stockCount > 9999) {
            errors.push({
                field: 'stockCount',
                message: 'Stock count exceeds maximum allowed value',
            });
        }

        // Validate rating
        if (product.rating !== undefined) {
            if (product.rating < 0) {
                errors.push({ field: 'rating', message: 'Rating cannot be negative' });
            }
            if (product.rating > 5) {
                errors.push({ field: 'rating', message: 'Rating cannot exceed 5' });
            }
        }

        // Validate reviewCount
        if (product.reviewCount === undefined) {
            errors.push({ field: 'reviewCount', message: 'Review count is required' });
        } else if (product.reviewCount < 0) {
            errors.push({ field: 'reviewCount', message: 'Review count cannot be negative' });
        } else if (product.reviewCount > 99999) {
            errors.push({
                field: 'reviewCount',
                message: 'Review count exceeds maximum allowed value',
            });
        }

        // Validate tags
        if (!product.tags || product.tags.length === 0) {
            errors.push({ field: 'tags', message: 'At least one tag is required' });
        } else if (product.tags.length > 10) {
            errors.push({ field: 'tags', message: 'Too many tags' });
        } else {
            product.tags.forEach((tag, index) => {
                if (tag.length > 50) {
                    errors.push({ field: `tags[${index}]`, message: 'Tag is too long' });
                }
            });
        }

        // Validate specifications
        if (!product.specifications || Object.keys(product.specifications).length === 0) {
            errors.push({
                field: 'specifications',
                message: 'At least one specification is required',
            });
        } else if (Object.keys(product.specifications).length > 20) {
            errors.push({ field: 'specifications', message: 'Too many specifications' });
        } else {
            Object.entries(product.specifications).forEach(([key, value]) => {
                if (value.length > 200) {
                    errors.push({
                        field: `specifications.${key}`,
                        message: 'Specification value is too long',
                    });
                }
            });
        }

        // Validate brand
        if (!product.brand) {
            errors.push({ field: 'brand', message: 'Product brand is required' });
        } else if (product.brand.length < 1) {
            errors.push({ field: 'brand', message: 'Brand name is too short' });
        } else if (product.brand.length > 100) {
            errors.push({ field: 'brand', message: 'Brand name is too long' });
        }

        // Validate SKU
        if (!product.sku) {
            errors.push({ field: 'sku', message: 'Product SKU is required' });
        } else if (product.sku.length < 3) {
            errors.push({ field: 'sku', message: 'SKU is too short' });
        } else if (product.sku.length > 50) {
            errors.push({ field: 'sku', message: 'SKU is too long' });
        } else if (!/^[A-Z0-9-]+$/.test(product.sku)) {
            errors.push({
                field: 'sku',
                message: 'SKU must contain only uppercase letters, numbers, and hyphens',
            });
        }

        // Validate warranty
        if (!product.warranty) {
            errors.push({ field: 'warranty', message: 'Warranty information is required' });
        } else if (product.warranty.length < 1) {
            errors.push({ field: 'warranty', message: 'Warranty description is too short' });
        } else if (product.warranty.length > 200) {
            errors.push({ field: 'warranty', message: 'Warranty description is too long' });
        }

        return errors;
    }

    static isValidProduct(product: Partial<ILineArrayProduct>): boolean {
        return this.validateProduct(product).length === 0;
    }

    // Validation for hierarchical data structure
    static validateSubCategory(subCategory: Partial<IProductSubCategory>): ValidationError[] {
        const errors: ValidationError[] = [];

        if (!subCategory.subCategoryName) {
            errors.push({ field: 'subCategoryName', message: 'Subcategory name is required' });
        } else if (subCategory.subCategoryName.length < 1) {
            errors.push({ field: 'subCategoryName', message: 'Subcategory name is too short' });
        } else if (subCategory.subCategoryName.length > 100) {
            errors.push({ field: 'subCategoryName', message: 'Subcategory name is too long' });
        }

        if (!subCategory.products || !Array.isArray(subCategory.products)) {
            errors.push({ field: 'products', message: 'Products array is required' });
        } else {
            subCategory.products.forEach((product, index) => {
                const productErrors = this.validateProduct(product);
                productErrors.forEach(error => {
                    errors.push({
                        field: `products[${index}].${error.field}`,
                        message: error.message,
                        value: error.value,
                    });
                });
            });
        }

        return errors;
    }

    static validateCategory(category: Partial<IProductCategory>): ValidationError[] {
        const errors: ValidationError[] = [];

        if (!category.categoryName) {
            errors.push({ field: 'categoryName', message: 'Category name is required' });
        } else if (category.categoryName.length < 1) {
            errors.push({ field: 'categoryName', message: 'Category name is too short' });
        } else if (category.categoryName.length > 100) {
            errors.push({ field: 'categoryName', message: 'Category name is too long' });
        }

        if (!category.subCategories || !Array.isArray(category.subCategories)) {
            errors.push({ field: 'subCategories', message: 'Subcategories array is required' });
        } else {
            category.subCategories.forEach((subCategory, index) => {
                const subCategoryErrors = this.validateSubCategory(subCategory);
                subCategoryErrors.forEach(error => {
                    errors.push({
                        field: `subCategories[${index}].${error.field}`,
                        message: error.message,
                        value: error.value,
                    });
                });
            });
        }

        return errors;
    }

    static validateHierarchicalData(data: Partial<ILineArrayProductsData>): ValidationError[] {
        const errors: ValidationError[] = [];

        if (!Array.isArray(data)) {
            errors.push({ field: 'data', message: 'Data must be an array' });
            return errors;
        }

        data.forEach((category, index) => {
            if (category) {
                const categoryErrors = this.validateCategory(category);
                categoryErrors.forEach(error => {
                    errors.push({
                        field: `[${index}].${error.field}`,
                        message: error.message,
                        value: error.value,
                    });
                });
            }
        });

        return errors;
    }

    static isValidSubCategory(subCategory: Partial<IProductSubCategory>): boolean {
        return this.validateSubCategory(subCategory).length === 0;
    }

    static isValidCategory(category: Partial<IProductCategory>): boolean {
        return this.validateCategory(category).length === 0;
    }

    static isValidHierarchicalData(data: Partial<ILineArrayProductsData>): boolean {
        return this.validateHierarchicalData(data).length === 0;
    }
}

// Utility Functions
export class ProductUtils {
    static calculateDiscountPercentage(price: number, originalPrice?: number): number {
        if (!originalPrice || originalPrice <= price) return 0;
        return Math.round(((originalPrice - price) / originalPrice) * 100);
    }

    static getAvailabilityStatus(product: ILineArrayProduct): string {
        if (!product.inStock || product.stockCount === 0) return 'Out of Stock';
        if (product.stockCount <= 5) return 'Low Stock';
        return 'In Stock';
    }

    static isLowStock(product: ILineArrayProduct, threshold: number = 5): boolean {
        return product.stockCount <= threshold && product.stockCount > 0;
    }

    static isOutOfStock(product: ILineArrayProduct): boolean {
        return product.stockCount === 0 || !product.inStock;
    }

    static generateSKU(brand: string, model: string, variant?: string): string {
        const brandCode = brand
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .substring(0, 3);
        const modelCode = model
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .substring(0, 3);
        const variantCode = variant
            ? variant
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, '')
                  .substring(0, 2)
            : '01';
        return `${brandCode}-${modelCode}-${variantCode}`;
    }
}

// All interfaces and classes are already exported above
