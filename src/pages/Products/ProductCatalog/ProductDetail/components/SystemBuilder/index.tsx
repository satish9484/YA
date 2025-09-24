import type React from 'react';
import { memo, useCallback, useMemo, useState } from 'react';

import {
    Badge,
    Button,
    Card,
    Checkbox,
    Col,
    Divider,
    Image,
    Progress,
    Row,
    Tag,
    Typography,
} from 'antd';

import { ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';

import styles from './SystemBuilder.module.scss';

const { Title, Text } = Typography;

interface Accessory {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    compatible: boolean;
    recommended: boolean;
    category: string;
    features: string[];
    inStock: boolean;
    rating?: number;
    reviews?: number;
}

interface SystemBuilderProps {
    accessories: Accessory[];
    onAddToSystem?: (accessoryId: string) => void;
    onRemoveFromSystem?: (accessoryId: string) => void;
    mainProductPrice?: number;
    mainProductName?: string;
    onAddCompleteSystem?: (accessories: string[]) => void;
}

const SystemBuilder: React.FC<SystemBuilderProps> = memo(
    ({
        accessories = [],
        onAddToSystem,
        onRemoveFromSystem,
        mainProductPrice = 1299.99,
        mainProductName = 'Main Speaker',
        onAddCompleteSystem,
    }) => {
        const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
        const [filterCategory, setFilterCategory] = useState<string>('all');

        const handleAccessoryToggle = useCallback(
            (accessoryId: string, checked: boolean) => {
                if (checked) {
                    setSelectedAccessories(prev => [...prev, accessoryId]);
                    onAddToSystem?.(accessoryId);
                } else {
                    setSelectedAccessories(prev => prev.filter(id => id !== accessoryId));
                    onRemoveFromSystem?.(accessoryId);
                }
            },
            [onAddToSystem, onRemoveFromSystem],
        );

        const handleAddCompleteSystem = useCallback(() => {
            onAddCompleteSystem?.(selectedAccessories);
        }, [selectedAccessories, onAddCompleteSystem]);

        const systemTotal = useMemo(() => {
            if (!accessories || accessories.length === 0) return 0;
            return selectedAccessories.reduce((total, accessoryId) => {
                const accessory = accessories.find(acc => acc.id === accessoryId);
                return total + (accessory?.price ?? 0);
            }, 0);
        }, [selectedAccessories, accessories]);

        const selectedAccessoriesList = useMemo(() => {
            if (!accessories || accessories.length === 0) return [];
            return accessories.filter(accessory => selectedAccessories.includes(accessory.id));
        }, [accessories, selectedAccessories]);

        const filteredAccessories = useMemo(() => {
            if (!accessories || accessories.length === 0) return [];
            if (filterCategory === 'all') return accessories;
            return accessories.filter(accessory => accessory.category === filterCategory);
        }, [accessories, filterCategory]);

        const categories = useMemo(() => {
            if (!accessories || accessories.length === 0) return [];
            const uniqueCategories = [...new Set(accessories.map(acc => acc.category))];
            return uniqueCategories;
        }, [accessories]);

        const totalSystemPrice = mainProductPrice + systemTotal;
        const savings = useMemo(() => {
            // Calculate 10% discount on complete system
            return totalSystemPrice * 0.1;
        }, [totalSystemPrice]);

        // Early return if no accessories are available
        if (!accessories || accessories.length === 0) {
            return (
                <section className={styles['system-builder-section']}>
                    <div className={styles.container}>
                        <div className={styles['section-header']}>
                            <Title level={2} className={styles['section-title']}>
                                Build Your Complete System
                            </Title>
                            <Text className={styles['section-description']}>
                                Select compatible accessories to create your ideal audio solution
                            </Text>
                        </div>
                        <div className={styles['empty-state']}>
                            <Text>
                                No accessories available at the moment. Please check back later.
                            </Text>
                        </div>
                    </div>
                </section>
            );
        }

        return (
            <section className={styles['system-builder-section']}>
                <div className={styles.container}>
                    <div className={styles['section-header']}>
                        <Title level={2} className={styles['section-title']}>
                            Build Your Complete System
                        </Title>
                        <Text className={styles['section-description']}>
                            Select compatible accessories to create your ideal audio solution
                        </Text>
                    </div>

                    <Row gutter={[32, 32]}>
                        <Col xs={24} lg={16}>
                            <div className={styles['filter-section']}>
                                <div className={styles['category-filters']}>
                                    <Button
                                        type={filterCategory === 'all' ? 'primary' : 'default'}
                                        onClick={() => setFilterCategory('all')}
                                        className={styles['filter-btn']}
                                    >
                                        All Accessories
                                    </Button>
                                    {categories.map((category, index) => (
                                        <Button
                                            key={`category-${category}-${index}`}
                                            type={
                                                filterCategory === category ? 'primary' : 'default'
                                            }
                                            onClick={() => setFilterCategory(category)}
                                            className={styles['filter-btn']}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles['accessories-grid']}>
                                {filteredAccessories.map(accessory => (
                                    <Card
                                        key={accessory.id}
                                        className={`${styles['accessory-card']} ${
                                            accessory.recommended ? styles.recommended : ''
                                        } ${selectedAccessories.includes(accessory.id) ? styles.selected : ''}`}
                                        hoverable
                                    >
                                        <div className={styles['accessory-content']}>
                                            <div className={styles['accessory-image-container']}>
                                                <Image
                                                    src={
                                                        accessory.image || '/placeholder-image.jpg'
                                                    }
                                                    alt={accessory.name || 'Accessory image'}
                                                    className={styles['accessory-image']}
                                                    preview={false}
                                                />
                                                {accessory.recommended && (
                                                    <Badge
                                                        count="Recommended"
                                                        className={styles['recommended-badge']}
                                                    />
                                                )}
                                                {!accessory.inStock && (
                                                    <div className={styles['out-of-stock-overlay']}>
                                                        <Text>Out of Stock</Text>
                                                    </div>
                                                )}
                                            </div>

                                            <div className={styles['accessory-info']}>
                                                <div className={styles['accessory-header']}>
                                                    <Title
                                                        level={5}
                                                        className={styles['accessory-name']}
                                                    >
                                                        {accessory.name || 'Unnamed Accessory'}
                                                    </Title>
                                                    <div className={styles['accessory-tags']}>
                                                        {accessory.recommended && (
                                                            <Tag
                                                                color="green"
                                                                className={
                                                                    styles['recommended-tag']
                                                                }
                                                                icon={<StarOutlined />}
                                                            >
                                                                Recommended
                                                            </Tag>
                                                        )}
                                                        <Tag className={styles['category-tag']}>
                                                            {accessory.category || 'Uncategorized'}
                                                        </Tag>
                                                    </div>
                                                </div>

                                                <div className={styles['accessory-rating']}>
                                                    {accessory.rating && accessory.rating > 0 && (
                                                        <div className={styles['rating-container']}>
                                                            <Text className={styles['rating-text']}>
                                                                {accessory.rating}/5
                                                            </Text>
                                                            {accessory.reviews &&
                                                                accessory.reviews > 0 && (
                                                                    <Text
                                                                        className={
                                                                            styles['reviews-text']
                                                                        }
                                                                    >
                                                                        ({accessory.reviews}{' '}
                                                                        reviews)
                                                                    </Text>
                                                                )}
                                                        </div>
                                                    )}
                                                </div>

                                                <Text className={styles['accessory-price']}>
                                                    ${(accessory.price || 0).toFixed(2)}
                                                </Text>

                                                <Text className={styles['accessory-description']}>
                                                    {accessory.description ||
                                                        'No description available'}
                                                </Text>

                                                {accessory.features &&
                                                    accessory.features.length > 0 && (
                                                        <div
                                                            className={styles['accessory-features']}
                                                        >
                                                            <Text strong>Key Features:</Text>
                                                            <ul className={styles['features-list']}>
                                                                {accessory.features
                                                                    .slice(0, 3)
                                                                    .map((feature, index) => (
                                                                        <li
                                                                            key={`feature-${accessory.id}-${index}`}
                                                                        >
                                                                            {feature}
                                                                        </li>
                                                                    ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                <div className={styles['accessory-actions']}>
                                                    <Checkbox
                                                        checked={selectedAccessories.includes(
                                                            accessory.id,
                                                        )}
                                                        onChange={e =>
                                                            handleAccessoryToggle(
                                                                accessory.id,
                                                                e.target.checked,
                                                            )
                                                        }
                                                        className={styles['accessory-checkbox']}
                                                        disabled={!accessory.inStock}
                                                    >
                                                        {selectedAccessories.includes(accessory.id)
                                                            ? 'Remove from System'
                                                            : 'Add to System'}
                                                    </Checkbox>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </Col>

                        <Col xs={24} lg={8}>
                            <Card className={styles['system-summary']} title="System Summary">
                                <div className={styles['summary-content']}>
                                    <div className={styles['progress-section']}>
                                        <Text className={styles['progress-label']}>
                                            System Completion: {selectedAccessories.length}{' '}
                                            accessories selected
                                        </Text>
                                        <Progress
                                            percent={Math.min(
                                                (selectedAccessories.length / 5) * 100,
                                                100,
                                            )}
                                            strokeColor={{
                                                '0%': '#1890ff',
                                                '100%': '#52c41a',
                                            }}
                                            className={styles['completion-progress']}
                                        />
                                    </div>

                                    <div className={styles['summary-items']}>
                                        <div className={styles['summary-item']}>
                                            <div className={styles['item-info']}>
                                                <Text strong className={styles['item-name']}>
                                                    {mainProductName}
                                                </Text>
                                                <Text className={styles['item-category']}>
                                                    Main Product
                                                </Text>
                                            </div>
                                            <Text className={styles['item-price']}>
                                                ${mainProductPrice.toFixed(2)}
                                            </Text>
                                        </div>

                                        {selectedAccessoriesList.map(accessory => (
                                            <div
                                                key={accessory.id}
                                                className={styles['summary-item']}
                                            >
                                                <div className={styles['item-info']}>
                                                    <Text className={styles['item-name']}>
                                                        {accessory.name || 'Unnamed Accessory'}
                                                    </Text>
                                                    <Text className={styles['item-category']}>
                                                        {accessory.category || 'Uncategorized'}
                                                    </Text>
                                                </div>
                                                <Text className={styles['item-price']}>
                                                    ${(accessory.price || 0).toFixed(2)}
                                                </Text>
                                            </div>
                                        ))}
                                    </div>

                                    <Divider className={styles['summary-divider']} />

                                    <div className={styles['pricing-section']}>
                                        <div className={styles['price-breakdown']}>
                                            <div className={styles['price-row']}>
                                                <Text>Subtotal</Text>
                                                <Text>${totalSystemPrice.toFixed(2)}</Text>
                                            </div>
                                            <div className={styles['price-row']}>
                                                <Text>System Discount (10%)</Text>
                                                <Text className={styles['discount-text']}>
                                                    -${savings.toFixed(2)}
                                                </Text>
                                            </div>
                                        </div>

                                        <div className={styles['total-section']}>
                                            <div className={styles['total-item']}>
                                                <Text strong className={styles['total-label']}>
                                                    Total System Price
                                                </Text>
                                                <Text className={styles['total-price']}>
                                                    ${(totalSystemPrice - savings).toFixed(2)}
                                                </Text>
                                            </div>
                                            <Text className={styles['savings-text']}>
                                                You save ${savings.toFixed(2)}!
                                            </Text>
                                        </div>
                                    </div>

                                    <div className={styles['action-section']}>
                                        <Button
                                            type="primary"
                                            size="large"
                                            icon={<ShoppingCartOutlined />}
                                            className={styles['add-system-btn']}
                                            block
                                            disabled={selectedAccessories.length === 0}
                                            onClick={handleAddCompleteSystem}
                                        >
                                            Add Complete System to Cart
                                        </Button>

                                        {selectedAccessories.length === 0 && (
                                            <Text className={styles['empty-state-text']}>
                                                Select accessories to build your system
                                            </Text>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    },
);

SystemBuilder.displayName = 'SystemBuilder';

export default SystemBuilder;
