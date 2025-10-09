import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { Skeleton, Spin } from 'antd';

import OptimizedLoader from '@/components/common/loader/OptimizedLoader';

import styles from './LazyLoadWrapper.module.scss';

interface LazyLoadWrapperProps {
    children: React.ReactNode;
    fallback?: 'spin' | 'skeleton' | 'optimized';
    skeletonConfig?: {
        rows?: number;
        avatar?: boolean;
        title?: boolean;
        paragraph?: boolean;
    };
    rootMargin?: string;
    threshold?: number;
    className?: string;
}

const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({
    children,
    fallback = 'optimized',
    skeletonConfig = { rows: 3, avatar: false, title: true, paragraph: true },
    rootMargin = '50px',
    threshold = 0.1,
    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isLoaded) {
                    setIsVisible(true);
                    setIsLoaded(true);
                    observer.unobserve(element);
                }
            },
            {
                rootMargin,
                threshold,
            },
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [isLoaded, rootMargin, threshold]);

    const renderFallback = () => {
        switch (fallback) {
            case 'spin':
                return (
                    <div className={styles['fallback-container']}>
                        <Spin size="large" />
                    </div>
                );
            case 'skeleton':
                return (
                    <div className={styles['fallback-container']}>
                        <Skeleton
                            active
                            avatar={skeletonConfig.avatar ?? false}
                            title={skeletonConfig.title ?? false}
                            paragraph={
                                skeletonConfig.paragraph
                                    ? { rows: skeletonConfig.rows ?? 3 }
                                    : false
                            }
                        />
                    </div>
                );
            case 'optimized':
            default:
                return (
                    <div className={styles['fallback-container']}>
                        <OptimizedLoader
                            isSuspense={true}
                            size="default"
                            tip="Loading content..."
                            context="inline"
                        />
                    </div>
                );
        }
    };

    return (
        <div ref={elementRef} className={`${styles['lazy-wrapper']} ${className}`}>
            {isVisible ? children : renderFallback()}
        </div>
    );
};

export default LazyLoadWrapper;
