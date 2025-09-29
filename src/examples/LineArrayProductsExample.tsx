// Example usage of the Line Array Products Redux slice
import { useLineArrayProducts, useProductFilters, useProductOperations } from '@/redux/hooks/useLineArrayProducts';
import React, { useEffect } from 'react';

const LineArrayProductsExample: React.FC = () => {
    // Main hook for products
    const {
        productList,
        productInfo,
        filteredProducts,
        isLoading,
        error,
        fetchProducts,
        fetchProduct,
        clearProductError,
    } = useLineArrayProducts();

    // Hook for product operations
    const {
        isLoading: isOperating,
        error: operationError,
        createProductAsync,
        updateProductAsync,
        deleteProductAsync,
    } = useProductOperations();

    // Hook for filtering
    const {
        filters,
        searchQuery,
        sorting,
        setFilters,
        setSearchQuery,
        setSorting,
        resetFilters,
    } = useProductFilters();

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts({
            page: 1,
            limit: 10,
        });
    }, [fetchProducts]);

    // Example: Create a new product
    const handleCreateProduct = async () => {
        try {
            const newProduct = {
                name: 'New TOA Speaker',
                image: '/path/to/image.jpg',
                price: 999.99,
                description: 'A new line array speaker',
                category: 'Line Array Speakers',
                categoryId: 'line-array-professional',
                categoryName: 'Professional Line Array Systems',
                inStock: true,
                stockCount: 5,
                tags: ['New', 'Professional'],
                specifications: {
                    'Power Handling': '500W',
                    'Impedance': '8 Ω',
                },
                brand: 'TOA',
                sku: 'TOA-NEW-001',
                warranty: '3-Year Manufacturer Warranty',
            };

            await createProductAsync(newProduct);
            console.log('Product created successfully!');
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    // Example: Update a product
    const handleUpdateProduct = async (productId: string) => {
        try {
            await updateProductAsync(productId, {
                price: 1099.99,
                stockCount: 8,
            });
            console.log('Product updated successfully!');
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    // Example: Delete a product
    const handleDeleteProduct = async (productId: string) => {
        try {
            await deleteProductAsync(productId);
            console.log('Product deleted successfully!');
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    // Example: Filter products
    const handleFilterByBrand = (brand: string) => {
        setFilters({ ...filters, brand });
    };

    // Example: Search products
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Example: Sort products
    const handleSort = (sortBy: 'price' | 'rating' | 'name' | 'createdAt') => {
        setSorting(sortBy, sorting.sortOrder === 'asc' ? 'desc' : 'asc');
    };

    if (isLoading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={clearProductError}>Clear Error</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Line Array Products</h1>
            
            {/* Search and Filters */}
            <div>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                
                <button onClick={() => handleFilterByBrand('TOA')}>
                    Filter by TOA
                </button>
                
                <button onClick={() => handleSort('price')}>
                    Sort by Price
                </button>
                
                <button onClick={resetFilters}>
                    Reset Filters
                </button>
            </div>

            {/* Product Operations */}
            <div>
                <button onClick={handleCreateProduct} disabled={isOperating}>
                    {isOperating ? 'Creating...' : 'Create Product'}
                </button>
            </div>

            {/* Products List */}
            <div>
                <h2>Products ({filteredProducts.length})</h2>
                {filteredProducts.map((product) => (
                    <div key={product._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Brand: {product.brand}</p>
                        <p>Stock: {product.stockCount}</p>
                        <p>Rating: {product.rating || 'N/A'}</p>
                        
                        <div>
                            <button 
                                onClick={() => handleUpdateProduct(product._id)}
                                disabled={isOperating}
                            >
                                {isOperating ? 'Updating...' : 'Update'}
                            </button>
                            
                            <button 
                                onClick={() => handleDeleteProduct(product._id)}
                                disabled={isOperating}
                            >
                                {isOperating ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Current Product Details */}
            {productInfo && (
                <div>
                    <h2>Current Product Details</h2>
                    <h3>{productInfo.name}</h3>
                    <p>{productInfo.description}</p>
                    <p>Price: ${productInfo.price}</p>
                    <p>Brand: {productInfo.brand}</p>
                    <p>SKU: {productInfo.sku}</p>
                    <p>Warranty: {productInfo.warranty}</p>
                    
                    <h4>Specifications:</h4>
                    <ul>
                        {Object.entries(productInfo.specifications).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LineArrayProductsExample;
