import type React from 'react';

import { Button, Col, Row, Typography } from 'antd';

import { PlayCircleOutlined, StarOutlined } from '@ant-design/icons';

import type { HeroSectionProps } from '../../types/landing.types';
import styles from './HeroSection.module.scss';

const { Title, Paragraph } = Typography;

/**
 * HeroSection Component
 *
 * Primary CTA section with compelling headline and clear value proposition
 * Optimized for conversion with prominent call-to-action buttons
 */
const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onLearnMore }) => {
    return (
        <section className={styles['hero-section']}>
            <div className="container h-100">
                <Row
                    className="h-100"
                    justify="center"
                    align="middle"
                    style={{ textAlign: 'center' }}
                >
                    <Col span={24}>
                        <Title level={1} className={`${styles['hero-section__title']} text-white`}>
                            Professional Speaker Manufacturer <br />
                            and Distributor in India
                        </Title>
                        <Paragraph className={`${styles['hero-section__description']} `}>
                            Best Line Array for Your Best Business & Events
                        </Paragraph>
                        <div
                            className="d-flex items-center justify-center gap-4"
                            style={{ marginTop: '2rem' }}
                        >
                            <Button
                                className={`${styles['hero-section__get-started']} ant-btn ant-btn-primary ant-btn-xl`}
                                type="primary"
                                size="large"
                                icon={<PlayCircleOutlined />}
                                onClick={onGetStarted}
                            >
                                Get Started
                            </Button>
                            <Button
                                className={`${styles['hero-section__learn-more']} ant-btn ant-btn-ghost ant-btn-xl`}
                                size="large"
                                icon={<StarOutlined />}
                                onClick={onLearnMore}
                            >
                                Learn More
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default HeroSection;
