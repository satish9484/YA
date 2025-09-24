import type React from 'react';

import styles from './SectionWrapper.module.scss';

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    showContainer?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
    children,
    className = '',
    containerClassName = '',
    showContainer = true,
}) => {
    return (
        <div className={`${styles['section-wrapper']} ${className}`}>
            {showContainer ? (
                <div className={`${styles.container} ${containerClassName}`}>{children}</div>
            ) : (
                children
            )}
        </div>
    );
};

export default SectionWrapper;
