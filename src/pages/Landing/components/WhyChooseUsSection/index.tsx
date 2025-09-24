import type React from 'react';

import { Col, Row, Typography } from 'antd';

import { APP_NAME } from '@/utills/constants';

import type { WhyChooseUsSectionProps } from '../../types/landing.types';
import styles from './WhyChooseUsSection.module.scss';

const { Title } = Typography;

/**
 * WhyChooseUsSection Component
 *
 * Detailed Features section highlighting key value propositions
 * CRO optimized to build trust and showcase competitive advantages
 */
const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ features }) => {
    return (
        <section className={styles['why-choose-us-section']}>
            <div className="container">
                <Row gutter={[48, 48]}>
                    <Col xs={24} lg={12}>
                        <Title level={2} className="mb-8 text-primary">
                            Why Choose {APP_NAME}?
                        </Title>
                        <div className={styles['features-list']}>
                            {features.map((feature, index) => (
                                <div key={index} className={styles['feature-item']}>
                                    <div className={styles['feature-item__icon']}>
                                        {feature.icon}
                                    </div>
                                    <div className={styles['feature-item__content']}>
                                        <Title level={4} className="m-0 mb-1 text-primary">
                                            {feature.title}
                                        </Title>
                                        <p className="m-0 text-secondary">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div className={styles['why-choose-us-section__image-container']}>
                            <img src="/images/section_1_bg.png" alt="Audio Equipment" />
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
