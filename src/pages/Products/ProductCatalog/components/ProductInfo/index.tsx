import type React from 'react';
import { useCallback, useMemo } from 'react';

import { Alert, Button, InputNumber, Rate, Space, Tag, Typography } from 'antd';

import {
    CheckCircleOutlined,
    CustomerServiceOutlined,
    GiftOutlined,
    HeartOutlined,
    SafetyOutlined,
    SettingOutlined,
    ShareAltOutlined,
    ShoppingCartOutlined,
    SoundOutlined,
    TruckOutlined,
} from '@ant-design/icons';

import { calculateSavings, formatPrice, formatSavings } from '../../utils/product-detail.utils';
import './ProductInfo.scss';
import type { ProductInfoComponentProps } from './ProductInfo.types';

const { Title, Text } = Typography;

const ProductInfo: React.FC<ProductInfoComponentProps> = ({
    product,
    quantity,
    onQuantityChange,
    onAddToCart,
    onAddToWishlist,
    onShare,
    wishlist,
    className = '',
    showTrustSignals = true,
    showKeyFeatures = true,
    showStockAlert = true,
    variant = 'default',
}) => {
    // Calculate savings
    const savings = useMemo(() => {
        if (!product.originalPrice) return 0;
        return calculateSavings(product.originalPrice, product.price);
    }, [product.originalPrice, product.price]);

    // Key features data
    const keyFeatures = useMemo(
        () => [
            'Variable Dispersion: 15°, 30°, 45°, 60°',
            '600W Program Power Handling',
            'Ball Impact Proof Construction',
            '5-Year Manufacturer Warranty',
        ],
        [],
    );

    // Handle quantity change
    const handleQuantityChange = useCallback(
        (value: number | null) => {
            const newQuantity = value ?? 1;
            if (newQuantity > 0 && newQuantity <= product.stockCount) {
                onQuantityChange(newQuantity);
            }
        },
        [onQuantityChange, product.stockCount],
    );

    // Handle add to cart
    const handleAddToCart = useCallback(() => {
        onAddToCart();
    }, [onAddToCart]);

    // Handle add to wishlist
    const handleAddToWishlist = useCallback(() => {
        onAddToWishlist();
    }, [onAddToWishlist]);

    // Handle share
    const handleShare = useCallback(() => {
        onShare();
    }, [onShare]);

    // Pricing section component
    const PricingSection: React.FC = () => (
        <div className="product-info__pricing">
            <div className="product-info__price-display">
                <Text className="product-info__current-price">{formatPrice(product.price)}</Text>
                {product.originalPrice && (
                    <>
                        <Text delete className="product-info__original-price">
                            {formatPrice(product.originalPrice)}
                        </Text>
                        <Tag color="red" className="product-info__savings-tag">
                            {formatSavings(savings)}
                        </Tag>
                    </>
                )}
            </div>

            {showStockAlert && (
                <Alert
                    message={
                        <span style={{ color: 'var(--color-text-primary)' }}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    }
                    description={
                        <span style={{ color: 'var(--color-text-secondary)' }}>
                            {product.inStock
                                ? `${product.stockCount} units available`
                                : 'Currently unavailable'}
                        </span>
                    }
                    type={product.inStock ? 'success' : 'error'}
                    showIcon
                    icon={<CheckCircleOutlined />}
                    className="product-info__stock-alert"
                />
            )}
        </div>
    );

    // Key features component
    const KeyFeatures: React.FC = () => {
        if (!showKeyFeatures) return null;

        return (
            <div className="product-info__key-features">
                <Title level={4} className="product-info__features-title">
                    Key Features
                </Title>
                <Space direction="vertical" size="small" className="product-info__feature-list">
                    {keyFeatures.map((feature, index) => (
                        <div key={index} className="product-info__feature-item">
                            {index === 0 && (
                                <SoundOutlined className="product-info__feature-icon" />
                            )}
                            {index === 1 && (
                                <SettingOutlined className="product-info__feature-icon" />
                            )}
                            {index === 2 && (
                                <SafetyOutlined className="product-info__feature-icon" />
                            )}
                            {index === 3 && <GiftOutlined className="product-info__feature-icon" />}
                            <Text className="product-info__feature-text">{feature}</Text>
                        </div>
                    ))}
                </Space>
            </div>
        );
    };

    // Purchase actions component
    const PurchaseActions: React.FC = () => (
        <div className="product-info__purchase">
            <div className="product-info__quantity-selector">
                <Text strong className="product-info__quantity-label">
                    Quantity:
                </Text>
                <InputNumber
                    min={1}
                    max={product.stockCount}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="product-info__quantity-input"
                    size="large"
                />
            </div>

            <Space direction="vertical" size="middle" className="product-info__action-buttons">
                <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    className="product-info__add-to-cart-btn"
                    block
                    disabled={!product.inStock}
                >
                    Add to Cart - {formatPrice(product.price * quantity)}
                </Button>

                <Space className="product-info__secondary-actions">
                    <Button
                        icon={<HeartOutlined />}
                        onClick={handleAddToWishlist}
                        className={`product-info__secondary-btn product-info__wishlist-btn ${
                            wishlist ? 'product-info__wishlist-btn--active' : ''
                        }`}
                        size="large"
                    >
                        {wishlist ? 'In Wishlist' : 'Add to Wishlist'}
                    </Button>
                    <Button
                        icon={<ShareAltOutlined />}
                        onClick={handleShare}
                        className="product-info__secondary-btn"
                        size="large"
                    >
                        Share
                    </Button>
                </Space>
            </Space>
        </div>
    );

    // Trust signals component
    const TrustSignals: React.FC = () => {
        if (!showTrustSignals) return null;

        return (
            <div className="product-info__trust-signals">
                <Space direction="vertical" size="small" className="product-info__trust-list">
                    <div className="product-info__trust-item">
                        <CheckCircleOutlined className="product-info__trust-icon" />
                        <Text>✓ {product.warranty}</Text>
                    </div>
                    <div className="product-info__trust-item">
                        <CustomerServiceOutlined className="product-info__trust-icon" />
                        <Text>✓ Free Expert Technical Support</Text>
                    </div>
                    <div className="product-info__trust-item">
                        <TruckOutlined className="product-info__trust-icon" />
                        <Text>✓ Free Shipping on Orders Over $500</Text>
                    </div>
                </Space>
            </div>
        );
    };

    return (
        <div className={`product-info product-info--${variant} ${className}`}>
            {/* Header */}
            <div className="product-info__header">
                <Title level={2} className="product-info__title">
                    {product.name}
                </Title>
                <Text className="product-info__tagline">{product.tagline}</Text>

                <div className="product-info__meta">
                    <div className="product-info__rating">
                        <Rate disabled defaultValue={product.rating} />
                        <Text>({product.reviewCount} reviews)</Text>
                    </div>
                    <Text className="product-info__sku">SKU: {product.sku}</Text>
                </div>
            </div>

            {/* Pricing */}
            <PricingSection />

            {/* Key Features */}
            <KeyFeatures />

            {/* Purchase Actions */}
            <PurchaseActions />

            {/* Trust Signals */}
            <TrustSignals />
        </div>
    );
};

export default ProductInfo;
