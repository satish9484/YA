import type React from 'react';
import { memo } from 'react';

import { Button, Card, Col, List, Row, Typography } from 'antd';

import {
    CustomerServiceOutlined,
    DownloadOutlined,
    FileOutlined,
    FileTextOutlined,
    MailOutlined,
    MessageOutlined,
    PhoneOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import styles from './ResourceHub.module.scss';

const { Title, Text } = Typography;

interface Resource {
    id: number;
    title: string;
    type: string;
    size: string;
    url: string;
    icon?: React.ReactNode;
}

interface ResourceHubProps {
    resources: Resource[];
    onDownload?: (resourceId: number) => void;
    onContactSupport?: () => void;
}

const ResourceHub: React.FC<ResourceHubProps> = memo(
    ({ resources, onDownload, onContactSupport }) => {
        const getResourceIcon = (type: string) => {
            switch (type.toLowerCase()) {
                case 'pdf':
                    return <FileTextOutlined />;
                case 'mp4':
                    return <VideoCameraOutlined />;
                case 'dwg':
                    return <FileOutlined />;
                default:
                    return <FileOutlined />;
            }
        };

        const supportOptions = [
            {
                title: 'Technical Support',
                description: 'Get help with installation and configuration',
                icon: <CustomerServiceOutlined />,
                action: 'Contact Support',
            },
            {
                title: 'Phone Support',
                description: 'Speak directly with our technical team',
                icon: <PhoneOutlined />,
                action: 'Call Now',
            },
            {
                title: 'Email Support',
                description: 'Send us your questions via email',
                icon: <MailOutlined />,
                action: 'Send Email',
            },
            {
                title: 'Live Chat',
                description: 'Chat with our support team in real-time',
                icon: <MessageOutlined />,
                action: 'Start Chat',
            },
        ];

        return (
            <section className={styles.resourceHubSection}>
                <div className="container">
                    <Title level={2} className={styles.sectionTitle}>
                        Resources & Support
                    </Title>
                    <Text className={styles.sectionDescription}>
                        Download documentation, specifications, and get the support you need
                    </Text>

                    <Row gutter={[32, 32]}>
                        <Col xs={24} lg={12}>
                            <Card title="Downloads" className={styles.downloadsCard}>
                                <List
                                    dataSource={resources}
                                    renderItem={(resource, index) => (
                                        <List.Item
                                            key={index}
                                            actions={[
                                                <Button
                                                    key="download"
                                                    type="link"
                                                    icon={<DownloadOutlined />}
                                                    onClick={() => onDownload?.(resource.id)}
                                                >
                                                    Download
                                                </Button>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <div className={styles.resourceIcon}>
                                                        {getResourceIcon(resource.type)}
                                                    </div>
                                                }
                                                title={
                                                    <div>
                                                        <Text strong>{resource.title}</Text>
                                                        <Text
                                                            type="secondary"
                                                            style={{ marginLeft: 8 }}
                                                        >
                                                            ({resource.type.toUpperCase()})
                                                        </Text>
                                                    </div>
                                                }
                                                description={
                                                    <div>
                                                        <Text type="secondary">
                                                            {resource.size}
                                                        </Text>
                                                    </div>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card title="Support Options" className={styles.supportCard}>
                                <div className={styles.supportOptions}>
                                    {supportOptions.map((option, index) => (
                                        <div
                                            key={index}
                                            className={styles.supportItem}
                                            onClick={() => onContactSupport?.()}
                                        >
                                            <div className={styles.supportIcon}>{option.icon}</div>
                                            <div className={styles.supportContent}>
                                                <Text strong className={styles.supportTitle}>
                                                    {option.title}
                                                </Text>
                                                <Text className={styles.supportDescription}>
                                                    {option.description}
                                                </Text>
                                                <Button
                                                    type="link"
                                                    className={styles.supportAction}
                                                >
                                                    {option.action}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    },
);

ResourceHub.displayName = 'ResourceHub';

export default ResourceHub;
