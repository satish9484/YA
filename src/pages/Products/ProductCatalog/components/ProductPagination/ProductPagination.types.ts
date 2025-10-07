import type React from 'react';

import type { ProductPaginationProps } from '../../types/product-catalog.types';

export interface ProductPaginationComponentProps extends Omit<ProductPaginationProps, 'showTotal'> {
    readonly className?: string;
    readonly size?: 'small' | 'default' | 'large';
    readonly showQuickJumper?: boolean;
    readonly showLessItems?: boolean;
    readonly hideOnSinglePage?: boolean;
    readonly responsive?: boolean;
    readonly onPageSizeChange?: ((current: number, size: number) => void) | undefined;
    // Enhanced props for better theme integration
    readonly showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode);
    readonly pageSizeOptions?: string[];
    readonly disabled?: boolean;
    readonly simple?: boolean;
}
