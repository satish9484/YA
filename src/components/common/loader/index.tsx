import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import styles from './style.module.scss';

interface LoadingProps {
    isSuspense?: boolean;
    children?: ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ isSuspense = false, children }: LoadingProps) => {
    const isLoading = useSelector(
        (s: unknown) => (s as { api?: { loading?: boolean } }).api?.loading,
    ); // Replace 'any' with your RootState if available

    return (
        <>
            {(isSuspense || isLoading) && (
                <div className={styles['spinner-wrap']}>
                    <div className={styles.spinner}>
                        <div className={styles['double-bounce1']}></div>
                        <div className={styles['double-bounce2']}></div>
                    </div>
                </div>
            )}
            {children}
        </>
    );
};

export default Loading;
