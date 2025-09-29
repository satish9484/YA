import type React from 'react';
import { memo, useCallback, useState } from 'react';

import { Alert, Button, Skeleton, Spin, Table, Tabs, Typography } from 'antd';

import { DownloadOutlined, FileTextOutlined, ReloadOutlined } from '@ant-design/icons';

import styles from './TechnicalSpecifications.module.scss';

const { Title, Text } = Typography;

interface Specification {
    key: string;
    value: string;
}

interface Specifications {
    performance: Specification[];
    directivity: Specification[];
    components: Specification[];
    connections: Specification[];
    physical: Specification[];
}

interface TechnicalSpecificationsProps {
    specifications: Specifications;
    onDownloadSpecs?: () => void;
    isLoading?: boolean;
    hasError?: boolean;
    onRetry?: () => void;
}

const TechnicalSpecifications: React.FC<TechnicalSpecificationsProps> = memo(
    ({ specifications, onDownloadSpecs, isLoading = false, hasError = false, onRetry }) => {
        const [activeTab, setActiveTab] = useState('performance');
        const [isDownloading, setIsDownloading] = useState(false);

        const handleDownload = useCallback(async () => {
            if (!onDownloadSpecs) return;

            setIsDownloading(true);
            try {
                await onDownloadSpecs();
            } catch (error) {
                console.error('Download failed:', error);
            } finally {
                setIsDownloading(false);
            }
        }, [onDownloadSpecs]);

        // Loading placeholder for table rows
        const TableSkeleton = () => (
            <div className={styles['table-skeleton']}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className={styles['skeleton-row']}>
                        <Skeleton.Input active size="small" className={styles['skeleton-key']} />
                        <Skeleton.Input active size="small" className={styles['skeleton-value']} />
                    </div>
                ))}
            </div>
        );

        // Error state component
        const ErrorState = () => (
            <div className={styles['error-state']}>
                <Alert
                    message="Failed to load specifications"
                    description="There was an error loading the technical specifications. Please try again."
                    type="error"
                    showIcon
                    action={
                        onRetry && (
                            <Button size="small" danger onClick={onRetry} icon={<ReloadOutlined />}>
                                Retry
                            </Button>
                        )
                    }
                />
            </div>
        );

        // Empty state component
        const EmptyState = () => (
            <div className={styles['empty-state']}>
                <FileTextOutlined className={styles['empty-icon']} />
                <Text type="secondary">No specifications available for this category</Text>
            </div>
        );

        const getTabContent = (specs: Specification[], _category: string) => {
            if (hasError) {
                return <ErrorState />;
            }

            if (isLoading) {
                return <TableSkeleton />;
            }

            if (!specs || specs.length === 0) {
                return <EmptyState />;
            }

            return (
                <Table
                    dataSource={specs}
                    pagination={false}
                    showHeader={false}
                    className={styles['spec-table']}
                    rowKey="key"
                    columns={[
                        {
                            title: 'Specification',
                            dataIndex: 'key',
                            key: 'key',
                            className: styles['spec-key'],
                            width: '40%',
                        },
                        {
                            title: 'Value',
                            dataIndex: 'value',
                            key: 'value',
                            className: styles['spec-value'],
                        },
                    ]}
                />
            );
        };

        const tabItems = [
            {
                key: 'performance',
                label: 'Performance',
                children: getTabContent(specifications.performance, 'performance'),
            },
            {
                key: 'directivity',
                label: 'Directivity',
                children: getTabContent(specifications.directivity, 'directivity'),
            },
            {
                key: 'components',
                label: 'Components',
                children: getTabContent(specifications.components, 'components'),
            },
            {
                key: 'connections',
                label: 'Connections',
                children: getTabContent(specifications.connections, 'connections'),
            },
            {
                key: 'physical',
                label: 'Physical',
                children: getTabContent(specifications.physical, 'physical'),
            },
        ];

        return (
            <section className={styles['specifications-section']}>
                <div className="container">
                    <div className={styles['spec-header']}>
                        <Title level={2} className={styles['section-title']}>
                            Technical Specifications
                        </Title>
                        <Text className={styles['section-description']}>
                            Comprehensive technical details and performance characteristics
                        </Text>
                    </div>

                    <div className={styles['spec-actions']}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<DownloadOutlined />}
                            onClick={handleDownload}
                            loading={isDownloading}
                            className={styles['download-spec-btn']}
                        >
                            {isDownloading ? 'Downloading...' : 'Download Full Specifications'}
                        </Button>
                    </div>

                    <div className={styles['spec-tabs-container']}>
                        {isLoading ? (
                            <div className={styles['loading-container']}>
                                <Spin size="large" />
                                <Text type="secondary" className={styles['loading-text']}>
                                    Loading specifications...
                                </Text>
                            </div>
                        ) : hasError ? (
                            <ErrorState />
                        ) : (
                            <Tabs
                                activeKey={activeTab}
                                onChange={setActiveTab}
                                items={tabItems}
                                className={styles['spec-tabs']}
                                tabBarStyle={{
                                    background: 'var(--ant-tabs-nav-bg)',
                                    borderRadius: '12px',
                                    padding: '8px',
                                }}
                            />
                        )}
                    </div>
                </div>
            </section>
        );
    },
);

TechnicalSpecifications.displayName = 'TechnicalSpecifications';

export default TechnicalSpecifications;
