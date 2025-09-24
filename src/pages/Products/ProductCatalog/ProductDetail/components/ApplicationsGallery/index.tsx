import type React from 'react';
import { memo } from 'react';

import { Card, Col, Image, Row, Tag, Typography } from 'antd';

import styles from './ApplicationsGallery.module.scss';

const { Title, Text } = Typography;

interface Application {
    id: number;
    title: string;
    image: string;
    description: string;
    features: string[];
}

interface ApplicationsGalleryProps {
    applications: Application[];
}

const ApplicationsGallery: React.FC<ApplicationsGalleryProps> = memo(({ applications }) => {
    return (
        <section className={styles.applicationsSection}>
            <div className={styles.container}>
                <Title level={2} className={styles.sectionTitle}>
                    Real-World Applications
                </Title>
                <Text className={styles.sectionDescription}>
                    See how the TOA HX-5B performs in various professional environments
                </Text>

                <Row gutter={[24, 24]}>
                    {applications.map((application, index) => (
                        <Col key={application.id} xs={24} sm={12} lg={6}>
                            <Card
                                hoverable
                                className={styles.applicationCard}
                                cover={
                                    <div className={styles.applicationImageContainer}>
                                        <Image
                                            src={application.image}
                                            alt={application.title}
                                            className={styles.applicationImage}
                                            placeholder={
                                                <div
                                                    style={{
                                                        height: '100%',
                                                        background:
                                                            'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#999',
                                                    }}
                                                >
                                                    Loading...
                                                </div>
                                            }
                                            preview={{
                                                mask: (
                                                    <div className={styles.contextMask}>
                                                        <span>View Details</span>
                                                    </div>
                                                ),
                                            }}
                                        />
                                    </div>
                                }
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    height: '100%',
                                }}
                            >
                                <Card.Meta
                                    title={application.title}
                                    description={
                                        <div>
                                            <Text className={styles.applicationDescription}>
                                                {application.description}
                                            </Text>
                                            <div className={styles.applicationFeatures}>
                                                {application.features.map(
                                                    (feature, featureIndex) => (
                                                        <Tag
                                                            key={featureIndex}
                                                            className={styles.featureTag}
                                                        >
                                                            {feature}
                                                        </Tag>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
});

ApplicationsGallery.displayName = 'ApplicationsGallery';

export default ApplicationsGallery;
