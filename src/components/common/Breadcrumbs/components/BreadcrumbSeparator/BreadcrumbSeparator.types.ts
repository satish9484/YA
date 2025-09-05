import type { BreadcrumbSeparatorProps } from '../../types/breadcrumbs.types';

export interface BreadcrumbSeparatorComponentProps extends BreadcrumbSeparatorProps {
    readonly className?: string;
    readonly size?: 'small' | 'medium' | 'large';
    readonly animated?: boolean;
}
