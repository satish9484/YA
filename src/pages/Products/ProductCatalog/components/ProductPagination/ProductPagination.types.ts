import type { ProductPaginationProps } from '../../types/product-catalog.types';

export interface ProductPaginationComponentProps extends ProductPaginationProps {
    readonly className?: string;
    readonly size?: 'small' | 'default' | 'large';
    readonly showQuickJumper?: boolean;
    readonly showLessItems?: boolean;
    readonly hideOnSinglePage?: boolean;
    readonly responsive?: boolean;
    readonly onPageSizeChange?: ((current: number, size: number) => void) | undefined;
}
