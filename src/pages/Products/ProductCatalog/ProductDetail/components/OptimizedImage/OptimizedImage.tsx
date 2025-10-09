import type React from 'react';
import { memo, useState } from 'react';

import { Image, Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

import styles from './OptimizedImage.module.scss';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
    placeholder?: React.ReactNode;
    fallback?: string;
    preview?: boolean;
    width?: number | string;
    height?: number | string;
    onLoad?: () => void;
    onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = memo(
    ({
        src,
        alt,
        className = '',
        loading = 'lazy',
        placeholder,
        fallback = '/images/placeholder.jpg',
        preview = true,
        width,
        height,
        onLoad,
        onError,
    }) => {
        const [isLoading, setIsLoading] = useState(true);
        const [hasError, setHasError] = useState(false);

        const handleLoad = () => {
            setIsLoading(false);
            onLoad?.();
        };

        const handleError = () => {
            setIsLoading(false);
            setHasError(true);
            onError?.();
        };

        const defaultPlaceholder = (
            <div className={styles['image-placeholder']}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" />
            </div>
        );

        return (
            <div className={`${styles['optimized-image-container']} ${className}`}>
                {isLoading && (placeholder ?? defaultPlaceholder)}
                <Image
                    src={hasError ? fallback : src}
                    alt={alt}
                    loading={loading}
                    preview={preview}
                    width={width}
                    height={height}
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`${styles['optimized-image']} ${isLoading ? styles.loading : ''}`}
                    style={{
                        display: isLoading ? 'none' : 'block',
                        width,
                        height,
                    }}
                />
            </div>
        );
    },
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
