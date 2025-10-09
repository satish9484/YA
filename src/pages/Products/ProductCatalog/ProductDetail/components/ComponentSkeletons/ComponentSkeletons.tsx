import type React from 'react';

import { Skeleton } from 'antd';

import styles from './ComponentSkeletons.module.scss';

interface ComponentSkeletonProps {
    className?: string;
}

export const TechnicalSpecsSkeleton: React.FC<ComponentSkeletonProps> = ({ className }) => (
    <div className={`${styles['skeleton-technical-specs']} ${className ?? ''}`}>
        <Skeleton active title={{ width: '60%' }} paragraph={{ rows: 8 }} />
    </div>
);

export const ReviewsQASkeleton: React.FC<ComponentSkeletonProps> = ({ className }) => (
    <div className={`${styles['skeleton-reviews-qa']} ${className ?? ''}`}>
        <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 6 }} />
    </div>
);

export const SystemBuilderSkeleton: React.FC<ComponentSkeletonProps> = ({ className }) => (
    <div className={`${styles['skeleton-system-builder']} ${className ?? ''}`}>
        <Skeleton active title={{ width: '50%' }} paragraph={{ rows: 5 }} />
    </div>
);

export const ResourceHubSkeleton: React.FC<ComponentSkeletonProps> = ({ className }) => (
    <div className={`${styles['skeleton-resource-hub']} ${className ?? ''}`}>
        <Skeleton active title={{ width: '45%' }} paragraph={{ rows: 4 }} />
    </div>
);

export const DispersionShowcaseSkeleton: React.FC<ComponentSkeletonProps> = ({ className }) => (
    <div className={`${styles['skeleton-dispersion-showcase']} ${className ?? ''}`}>
        <Skeleton active title={{ width: '55%' }} paragraph={{ rows: 3 }} />
    </div>
);

export const ProductUseCasesSkeleton: React.FC<ComponentSkeletonProps> = ({ className }) => (
    <div className={`${styles['skeleton-product-use-cases']} ${className ?? ''}`}>
        <Skeleton active title={{ width: '50%' }} paragraph={{ rows: 4 }} />
    </div>
);
