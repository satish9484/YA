import { memo } from 'react';

import { Typography } from 'antd';

import styles from './OptimizedLoader.module.scss';

const { Text } = Typography;

interface OptimizedLoaderProps {
    isSuspense?: boolean;
    size?: 'small' | 'default' | 'large';
    tip?: string;
    color?: string;
    variant?: 'default' | 'success' | 'error' | 'warning';
    floating?: boolean;
    context?: 'page' | 'overlay' | 'inline';
}

const OptimizedLoader: React.FC<OptimizedLoaderProps> = memo(
    ({
        isSuspense = false,
        size = 'default',
        tip = 'Loading...',
        color,
        variant = 'default',
        floating = false,
        context = 'page',
    }) => {
        const getSizeClass = () => {
            switch (size) {
                case 'small':
                    return styles.small;
                case 'large':
                    return styles.large;
                default:
                    return styles.default;
            }
        };

        const getContextClass = () => {
            switch (context) {
                case 'overlay':
                    return styles['loading-overlay'];
                case 'inline':
                    return styles['loading-inline'];
                default:
                    return isSuspense ? styles.suspense : styles.fullscreen;
            }
        };

        const getVariantClass = () => {
            switch (variant) {
                case 'success':
                    return styles.success;
                case 'error':
                    return styles.error;
                case 'warning':
                    return styles.warning;
                default:
                    return '';
            }
        };

        return (
            <div
                className={`${styles['loader-container']} ${getContextClass()} ${getVariantClass()} ${floating ? styles.floating : ''}`}
            >
                <div className={`${styles['bouncing-loader']} ${getSizeClass()}`}>
                    <div
                        className={styles['bouncing-circle']}
                        style={color ? { backgroundColor: color } : {}}
                    />
                    <div
                        className={styles['bouncing-circle']}
                        style={color ? { backgroundColor: color } : {}}
                    />
                    <div
                        className={styles['bouncing-circle']}
                        style={color ? { backgroundColor: color } : {}}
                    />
                </div>
                {tip && <Text className={styles['loader-text']}>{tip}</Text>}
            </div>
        );
    },
);

OptimizedLoader.displayName = 'OptimizedLoader';

export default OptimizedLoader;
