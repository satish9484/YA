import type { BreadcrumbItem } from '@/components/common/Breadcrumbs/types/breadcrumbs.types';

export interface ProductDetailBreadcrumbsProps {
    readonly productId: string;
    readonly productName: string;
    readonly categoryId: string;
    readonly categoryName: string;
    readonly className?: string;
    readonly variant?: 'default' | 'compact' | 'detailed';
    readonly separator?: 'chevron' | 'slash' | 'arrow' | 'dot';
    readonly onItemClick?: (item: BreadcrumbItem, index: number) => void;
}
