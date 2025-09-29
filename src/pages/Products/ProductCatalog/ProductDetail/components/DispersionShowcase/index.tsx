import type React from 'react';
import { memo } from 'react';

import { Button, Card, Col, Row, Statistic, Typography } from 'antd';

import styles from './DispersionShowcase.module.scss';

const { Title, Text } = Typography;

interface DispersionConfig {
    angle: string;
    sensitivity: string;
    frequencyResponse: string;
    description: string;
    useCase: string;
}

interface DispersionShowcaseProps {
    dispersionConfigs: Record<number, DispersionConfig>;
    selectedDispersion: number;
    onDispersionChange: (angle: number) => void;
}

const DispersionShowcase: React.FC<DispersionShowcaseProps> = memo(
    ({ dispersionConfigs, selectedDispersion, onDispersionChange }) => {
        const currentConfig = dispersionConfigs[selectedDispersion];

        return (
            <section className={styles.dispersionShowcase}>
                <div className="container">
                    <Title level={2} className={styles.sectionTitle}>
                        Variable Dispersion Technology
                    </Title>
                    <Text className={styles.sectionDescription}>
                        Experience the power of on-site adjustable dispersion. Select an angle to
                        see how it affects performance characteristics and ideal applications.
                    </Text>

                    <Row gutter={[48, 32]} align="middle">
                        <Col xs={24} lg={12}>
                            <div className={styles.dispersionVisualizer}>
                                <div className={styles.angleSelector}>
                                    {Object.entries(dispersionConfigs).map(([angle, config]) => (
                                        <Button
                                            key={angle}
                                            type={
                                                selectedDispersion === parseInt(angle)
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            onClick={() => onDispersionChange(parseInt(angle))}
                                            className={styles.angleButton}
                                        >
                                            {config.angle}
                                        </Button>
                                    ))}
                                </div>

                                <div className={styles.speakerVisualization}>
                                    <div className={styles.speakerGraphic}>
                                        <div className={styles.speakerBody}>
                                            <div className={styles.speakerDriver}></div>
                                            <div className={styles.speakerTweeter}></div>
                                        </div>
                                        <div
                                            className={`${styles.dispersionPattern} ${styles[`pattern${selectedDispersion}`]}`}
                                            style={{
                                                transform: `rotate(${selectedDispersion === 15 ? -7.5 : selectedDispersion === 30 ? -15 : selectedDispersion === 45 ? -22.5 : -30}deg)`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} lg={12}>
                            <div className={styles.dispersionInfo}>
                                <Title level={3}>{currentConfig.angle} Mode</Title>
                                <Text className={styles.dispersionDescription}>
                                    {currentConfig.description}
                                </Text>

                                <div className={styles.dynamicSpecs}>
                                    <Card size="small" className={styles.specCard}>
                                        <Statistic
                                            title="Sensitivity (1W, 1m)"
                                            value={currentConfig.sensitivity}
                                            suffix="dB"
                                        />
                                    </Card>
                                    <Card size="small" className={styles.specCard}>
                                        <Statistic
                                            title="Frequency Response"
                                            value={currentConfig.frequencyResponse}
                                        />
                                    </Card>
                                </div>

                                <div className={styles.useCase}>
                                    <Title level={5}>Ideal For:</Title>
                                    <Text>{currentConfig.useCase}</Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    },
);

DispersionShowcase.displayName = 'DispersionShowcase';

export default DispersionShowcase;
