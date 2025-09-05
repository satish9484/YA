import type { BreadcrumbItemProps } from '../../types/breadcrumbs.types';

export interface BreadcrumbItemComponentProps extends BreadcrumbItemProps {
    readonly className?: string;
    readonly showIcon?: boolean;
    readonly truncateName?: boolean;
    readonly maxNameLength?: number;
}

export interface BreadcrumbLinkProps {
    readonly item: BreadcrumbItemProps['item'];
    readonly onClick?: BreadcrumbItemProps['onClick'];
    readonly index: number;
    readonly className?: string;
}

export interface BreadcrumbTextProps {
    readonly item: BreadcrumbItemProps['item'];
    readonly className?: string;
    readonly truncateName?: boolean;
    readonly maxNameLength?: number;
}
