import { memo } from 'react';

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

import type { ProductDetail } from '../../../types/product-detail.types';
import styles from './ProductInfo.module.scss';

const { Title, Text } = Typography;

interface ProductInfoProps {
    product: ProductDetail;
    quantity: number;
    wishlist: boolean;
    onQuantityChange: (value: number | null) => void;
    onAddToCart: () => void;
    onAddToWishlist: () => void;
    onShare: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = memo(
    ({ product, quantity, wishlist, onQuantityChange, onAddToCart, onAddToWishlist, onShare }) => {
        return (
            <div className={styles.productInfo}>
                <div className={styles.productHeader}>
                    <Text className={styles.productTagline}>{product.tagline}</Text>

                    <div className={styles.productMeta}>
                        <Space>
                            <Rate disabled defaultValue={product.rating} />
                            <Text>({product.reviewCount} reviews)</Text>
                        </Space>
                        <Text>SKU: {product.sku}</Text>
                    </div>
                </div>

                <div className={styles.pricingSection}>
                    <div className={styles.priceDisplay}>
                        <Text className={styles.currentPrice}>${product.price.toFixed(2)}</Text>
                        <Text delete className={styles.originalPrice}>
                            ${product.originalPrice?.toFixed(2) ?? '0.00'}
                        </Text>
                        <Tag color="red" className={styles.savingsTag}>
                            Save ${((product.originalPrice ?? 0) - product.price).toFixed(2)}
                        </Tag>
                    </div>

                    <Alert
                        message={
                            <span style={{ color: 'var(--color-text-primary)' }}>In Stock</span>
                        }
                        description={
                            <span
                                style={{ color: 'var(--color-text-secondary)' }}
                            >{`${product.stockCount} units available`}</span>
                        }
                        type="success"
                        showIcon
                        icon={<CheckCircleOutlined />}
                        className={styles.stockAlert}
                    />
                </div>

                <div className={styles.keyFeatures}>
                    <Title level={4}>Key Features</Title>
                    <Space direction="vertical" size="small" className={styles.featureList}>
                        <div className={styles.featureItem}>
                            <SoundOutlined className={styles.featureIcon} />
                            <Text>Variable Dispersion: 15°, 30°, 45°, 60°</Text>
                        </div>
                        <div className={styles.featureItem}>
                            <SettingOutlined className={styles.featureIcon} />
                            <Text>600W Program Power Handling</Text>
                        </div>
                        <div className={styles.featureItem}>
                            <SafetyOutlined className={styles.featureIcon} />
                            <Text>Ball Impact Proof Construction</Text>
                        </div>
                        <div className={styles.featureItem}>
                            <GiftOutlined className={styles.featureIcon} />
                            <Text>5-Year Manufacturer Warranty</Text>
                        </div>
                    </Space>
                </div>

                <div className={styles.purchaseSection}>
                    <div className={styles.quantitySelector}>
                        <Text strong>Quantity:</Text>
                        <InputNumber
                            min={1}
                            max={product.stockCount}
                            value={quantity}
                            onChange={onQuantityChange}
                            className={styles.quantityInput}
                        />
                    </div>

                    <Space direction="vertical" size="middle" className={styles.actionButtons}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            onClick={onAddToCart}
                            className={styles.addToCartBtn}
                            block
                        >
                            Add to Cart - ${(product.price * quantity).toFixed(2)}
                        </Button>

                        <Space className={styles.secondaryActions}>
                            <Button
                                icon={<HeartOutlined />}
                                onClick={onAddToWishlist}
                                className={wishlist ? styles.wishlistActive : ''}
                            >
                                {wishlist ? 'In Wishlist' : 'Add to Wishlist'}
                            </Button>
                            <Button
                                icon={<ShareAltOutlined />}
                                onClick={() => {
                                    console.log('Share button clicked');
                                    onShare();
                                }}
                                className={styles.shareBtn}
                            >
                                Share
                            </Button>
                        </Space>
                    </Space>

                    <div className={styles.trustSignals}>
                        <Space direction="vertical" size="small">
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
                </div>
            </div>
        );
    },
);

ProductInfo.displayName = 'ProductInfo';

export default ProductInfo;
