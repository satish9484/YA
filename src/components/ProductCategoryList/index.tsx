import type * as React from 'react';
import { useState } from 'react';

import { Pagination } from 'antd';

import { productCategories } from './data.ts';
import './styles.scss';

const PRODUCTS_PER_PAGE = 4;

const ProductCategoryList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({});

    const handlePageChange = (categoryId: string, page: number) => {
        setCurrentPage(prev => ({ ...prev, [categoryId]: page }));
    };

    return (
        <div className="product-category-list container py-8">
            {productCategories.map(category => {
                const page = currentPage[category.id] || 1;
                const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
                const paginatedProducts = category.products.slice(
                    startIndex,
                    startIndex + PRODUCTS_PER_PAGE,
                );

                return (
                    <div key={category.id} className="category-section mb-12">
                        <h2 className="h2 text-primary mb-6">{category.name}</h2>
                        <div className="product-grid">
                            {paginatedProducts.map(product => (
                                <div key={product.id} className="card product-card">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-card__image"
                                    />
                                    <div className="card-body">
                                        <h3 className="h5 text-primary mb-2">{product.name}</h3>
                                        <p className="text-secondary mb-4">{product.description}</p>
                                        <div style={{ flexGrow: 1 }} />
                                        <p className="h6 text-primary font-weight-bold mb-4">
                                            ${product.price.toFixed(2)}
                                        </p>
                                        <button className="btn btn-primary w-100">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            current={page}
                            total={category.products.length}
                            pageSize={PRODUCTS_PER_PAGE}
                            onChange={newPage => handlePageChange(category.id, newPage)}
                            showTotal={(total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`
                            }
                            className="mt-8 d-flex justify-center"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ProductCategoryList;
