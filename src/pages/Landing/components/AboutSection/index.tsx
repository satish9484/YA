import type React from 'react';

import { Button, Col, Row, Typography } from 'antd';

import { CheckCircleOutlined } from '@ant-design/icons';

import type { AboutSectionProps } from '../../types/landing.types';
import styles from './AboutSection.module.scss';

const { Title, Paragraph, Text } = Typography;

/**
 * AboutSection Component
 *
 * Problem/Solution section that addresses customer pain points
 * and positions the company as the solution provider
 * CRO optimized for trust building and credibility
 */
const AboutSection: React.FC<AboutSectionProps> = ({ onViewProducts, onContactUs }) => {
    return (
        <section className={styles['about-section']}>
            <div className="container">
                <Row gutter={[48, 48]} align="middle">
                    <Col xs={24} md={10}>
                        <div className={styles['about-section__intro']}>
                            <Text
                                strong
                                className="text-success"
                                style={{
                                    fontSize: '16px',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Who We Are
                            </Text>
                            <Title level={2} className="mt-3 text-primary">
                                Our Highest Ambition is to Help People
                            </Title>
                        </div>
                    </Col>
                    <Col xs={24} md={14}>
                        <div className={styles['about-section__content']}>
                            <Title level={4} className="text-primary mb-4">
                                Model Box Speaker Line Array - Factory, Suppliers, Manufacturers
                                from India
                            </Title>
                            <Paragraph
                                className="text-secondary"
                                style={{ fontSize: '16px', lineHeight: '1.8' }}
                            >
                                The client satisfaction is our primary concentrate on. We uphold a
                                consistent level of professionalism, top quality, credibility and
                                service for Model Box Speaker Line Array, Line Array Speakers Oem,
                                Odm Active Speaker, Active Speaker Amplifier,Portable Line Array
                                Speakers. We focus on providing service for our clients as a key
                                element in strengthening our long-term relationships. Our continual
                                availability of high grade products in combination with our
                                excellent pre-sale and after-sales service ensures strong
                                competitiveness in an increasingly globalized market.
                            </Paragraph>
                            <div className="d-flex items-center gap-3 mt-6">
                                <Button
                                    className="ant-btn ant-btn-primary ant-btn-lg"
                                    type="primary"
                                    icon={<CheckCircleOutlined />}
                                    onClick={onViewProducts}
                                >
                                    View Products
                                </Button>
                                <Button
                                    className={`${styles['about-section__content__contact_us']} ant-btn ant-btn-primary ant-btn-lg`}
                                    onClick={onContactUs}
                                >
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default AboutSection;
