import type * as React from 'react';
import { useState } from 'react';

import { Image, Pagination } from 'antd';

import { productCategories } from './data.ts';
import './styles.scss';

const PRODUCTS_PER_PAGE = 4;

const ProductCatalog: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({});

    const handlePageChange = (categoryId: string, page: number) => {
        setCurrentPage(prev => ({ ...prev, [categoryId]: page }));
    };

    return (
        <div className="product-category-list py-8">
            <div className="container">
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
                                        <Image.PreviewGroup
                                            items={[
                                                product.image,
                                                '/bg/bg-2.jpg',
                                                '/bg/empty-speaker-cabinet.jpg',
                                                '/bg/bg-1.webp',
                                            ]}
                                        >
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                className="product-card__image"
                                                preview={{
                                                    mask: (
                                                        <div className="image-preview-mask">
                                                            <div className="preview-content">
                                                                <div className="preview-icon">
                                                                    <svg
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                                                                            fill="currentColor"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <span className="preview-text">
                                                                    View Gallery
                                                                </span>
                                                                <div className="preview-count">
                                                                    4
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ),
                                                    maskClassName: 'custom-preview-mask',
                                                    scaleStep: 0.5,
                                                    minScale: 1,
                                                    maxScale: 3,
                                                }}
                                                placeholder={
                                                    <div className="image-placeholder">
                                                        <div className="placeholder-content">
                                                            <svg
                                                                width="48"
                                                                height="48"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                            <span>Loading...</span>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </Image.PreviewGroup>
                                        <div className="card-body">
                                            <h3 className="h5 text-primary mb-2">{product.name}</h3>
                                            <p className="text-secondary mb-4">
                                                {product.description}
                                            </p>
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
        </div>
    );
};

export default ProductCatalog;
