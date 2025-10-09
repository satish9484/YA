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
import styles from './ProductCatalogInfo.module.scss';
import type { ProductCatalogInfoComponentProps } from './ProductCatalogInfo.types';

const { Title, Text } = Typography;

const ProductCatalogInfo: React.FC<ProductCatalogInfoComponentProps> = ({
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
        <div className={styles.pricingSection}>
            <div className={styles.priceDisplay}>
                <Text className={styles.currentPrice}>{formatPrice(product.price)}</Text>
                {product.originalPrice && (
                    <>
                        <Text delete className={styles.originalPrice}>
                            {formatPrice(product.originalPrice)}
                        </Text>
                        <Tag color="red" className={styles.savingsTag}>
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
                    className={styles.stockAlert}
                />
            )}
        </div>
    );

    // Key features component
    const KeyFeatures: React.FC = () => {
        if (!showKeyFeatures) return null;

        return (
            <div className={styles.keyFeatures}>
                <Title level={4} className={styles.featuresTitle}>
                    Key Features
                </Title>
                <Space direction="vertical" size="small" className={styles.featureList}>
                    {keyFeatures.map((feature, index) => (
                        <div key={index} className={styles.featureItem}>
                            {index === 0 && <SoundOutlined className={styles.featureIcon} />}
                            {index === 1 && <SettingOutlined className={styles.featureIcon} />}
                            {index === 2 && <SafetyOutlined className={styles.featureIcon} />}
                            {index === 3 && <GiftOutlined className={styles.featureIcon} />}
                            <Text className={styles.featureText}>{feature}</Text>
                        </div>
                    ))}
                </Space>
            </div>
        );
    };

    // Purchase actions component
    const PurchaseActions: React.FC = () => (
        <div className={styles.purchaseSection}>
            <div className={styles.quantitySelector}>
                <Text strong className={styles.quantityLabel}>
                    Quantity:
                </Text>
                <InputNumber
                    min={1}
                    max={product.stockCount}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className={styles.quantityInput}
                    size="large"
                />
            </div>

            <Space direction="vertical" size="middle" className={styles.actionButtons}>
                <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    className={styles.addToCartBtn}
                    block
                    disabled={!product.inStock}
                >
                    Add to Cart - {formatPrice(product.price * quantity)}
                </Button>

                <Space className={styles.secondaryActions}>
                    <Button
                        icon={<HeartOutlined />}
                        onClick={handleAddToWishlist}
                        className={`${styles.secondaryBtn} ${styles.wishlistBtn} ${
                            wishlist ? styles.wishlistActive : ''
                        }`}
                        size="large"
                    >
                        {wishlist ? 'In Wishlist' : 'Add to Wishlist'}
                    </Button>
                    <Button
                        icon={<ShareAltOutlined />}
                        onClick={handleShare}
                        className={styles.secondaryBtn}
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
            <div className={styles.trustSignals}>
                <Space direction="vertical" size="small" className={styles.trustList}>
                    <div className={styles.trustItem}>
                        <CheckCircleOutlined className={styles.trustIcon} />
                        <Text>✓ {product.warranty}</Text>
                    </div>
                    <div className={styles.trustItem}>
                        <CustomerServiceOutlined className={styles.trustIcon} />
                        <Text>✓ Free Expert Technical Support</Text>
                    </div>
                    <div className={styles.trustItem}>
                        <TruckOutlined className={styles.trustIcon} />
                        <Text>✓ Free Shipping on Orders Over $500</Text>
                    </div>
                </Space>
            </div>
        );
    };

    return (
        <div className={`${styles.productInfo} ${styles[`productInfo--${variant}`]} ${className}`}>
            {/* Header */}
            <div className={styles.productHeader}>
                <Title level={2} className={styles.productTitle}>
                    {product.name}
                </Title>
                <Text className={styles.productTagline}>{product.tagline}</Text>

                <div className={styles.productMeta}>
                    <div className={styles.productRating}>
                        <Rate disabled defaultValue={product.rating} />
                        <Text>({product.reviewCount} reviews)</Text>
                    </div>
                    <Text className={styles.productSku}>SKU: {product.sku}</Text>
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

export default ProductCatalogInfo;
