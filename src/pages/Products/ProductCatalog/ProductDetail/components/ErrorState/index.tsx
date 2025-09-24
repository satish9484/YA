import type React from 'react';

import styles from './ErrorState.module.scss';

interface ErrorStateProps {
    title?: string;
    message?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    title = 'Product not found',
    message = 'The requested product could not be found.',
}) => {
    return (
        <div className={styles['product-detail-page']}>
            <div className={styles['error-state']}>
                <h2>{title}</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ErrorState;
