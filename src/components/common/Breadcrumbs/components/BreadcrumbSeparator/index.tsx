import type React from 'react';
import { useMemo } from 'react';

import { getSeparatorAriaLabel, getSeparatorIcon } from '../../utils/breadcrumbs.utils';
import './BreadcrumbSeparator.scss';
import type { BreadcrumbSeparatorComponentProps } from './BreadcrumbSeparator.types';

const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorComponentProps> = ({
    type = 'chevron',
    className = '',
    size = 'medium',
    animated = false,
}) => {
    // Get separator icon and aria label
    const { icon, ariaLabel } = useMemo(() => {
        return {
            icon: getSeparatorIcon(type),
            ariaLabel: getSeparatorAriaLabel(type),
        };
    }, [type]);

    return (
        <span
            className={`breadcrumb-separator breadcrumb-separator--${type} breadcrumb-separator--${size} ${
                animated ? 'breadcrumb-separator--animated' : ''
            } ${className}`}
            role="separator"
            aria-label={ariaLabel}
            aria-hidden="true"
        >
            <span className="breadcrumb-separator__icon">{icon}</span>
        </span>
    );
};

export default BreadcrumbSeparator;
