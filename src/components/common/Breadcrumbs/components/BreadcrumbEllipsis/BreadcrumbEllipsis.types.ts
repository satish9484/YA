export interface BreadcrumbEllipsisProps {
    readonly className?: string;
    readonly onClick?: () => void;
    readonly hiddenItemsCount?: number;
    readonly ariaLabel?: string;
    readonly animated?: boolean;
}

export interface BreadcrumbEllipsisComponentProps extends BreadcrumbEllipsisProps {
    readonly size?: 'small' | 'medium' | 'large';
    readonly variant?: 'dots' | 'more' | 'expand';
}
