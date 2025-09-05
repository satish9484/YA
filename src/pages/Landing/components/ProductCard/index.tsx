import type React from 'react';

import { Button, Typography } from 'antd';

import type { ProductCardProps } from '../../types/landing.types';
import './ProductCard.scss';

const { Title } = Typography;

/**
 * ProductCard Component
 *
 * Individual product display card with features and CTA
 * CRO optimized for product showcase and conversion
 */
const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
    return (
        <div className="product-card">
            <div className="product-card__image-container">
                <img src={product.image} alt={product.title} className="product-card__image" />
            </div>
            <div className="product-card__content">
                <div className="d-flex items-center mb-3">
                    <span className="text-primary mr-2" style={{ fontSize: '18px' }}>
                        {product.icon}
                    </span>
                    <Title level={4} className="product-card__title" style={{ margin: 0 }}>
                        {product.title}
                    </Title>
                </div>
                <ul className="product-card__features">
                    {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                <Button
                    className="ant-btn ant-btn-primary ant-btn-lg mt-auto"
                    type="primary"
                    block
                    onClick={() => onViewDetails(product.id)}
                >
                    View Details
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
