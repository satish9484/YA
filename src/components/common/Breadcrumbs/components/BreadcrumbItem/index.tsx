import type React from 'react';
import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { formatBreadcrumbName, getBreadcrumbItemAriaLabel } from '../../utils/breadcrumbs.utils';
import './BreadcrumbItem.scss';
import type { BreadcrumbItemComponentProps } from './BreadcrumbItem.types';

const BreadcrumbItem: React.FC<BreadcrumbItemComponentProps> = ({
    item,
    index,
    isLast,
    separator: _separator,
    onClick,
    className = '',
    showIcon = true,
    truncateName = false,
    maxNameLength = 30,
}) => {
    // Handle item click
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick(item, index);
        }
    }, [onClick, item, index]);

    // Format name with truncation if needed
    const displayName = useMemo(() => {
        if (truncateName) {
            return formatBreadcrumbName(item.name, maxNameLength);
        }
        return item.name;
    }, [item.name, truncateName, maxNameLength]);

    // Get aria label
    const ariaLabel = useMemo(() => {
        return getBreadcrumbItemAriaLabel(item);
    }, [item]);

    // Breadcrumb link component
    const BreadcrumbLink: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        if (item.link && !item.isActive) {
            return (
                <Link
                    to={item.link}
                    className="breadcrumb-item__link"
                    onClick={handleClick}
                    aria-label={ariaLabel}
                    aria-current={isLast ? 'page' : undefined}
                >
                    {children}
                </Link>
            );
        }

        return (
            <div
                className="breadcrumb-item__link"
                onClick={item.isActive ? undefined : handleClick}
                role={item.isActive ? 'text' : 'button'}
                tabIndex={item.isActive ? -1 : 0}
                aria-label={ariaLabel}
                aria-current={isLast ? 'page' : undefined}
                onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleClick();
                    }
                }}
            >
                {children}
            </div>
        );
    };

    // Breadcrumb text component
    const BreadcrumbText: React.FC = () => (
        <div className="breadcrumb-item__text">
            {showIcon && item.icon && (
                <span className="breadcrumb-item__icon" aria-hidden="true">
                    {item.icon}
                </span>
            )}
            <h4
                className={`breadcrumb-item__name ${truncateName ? 'breadcrumb-item__name--truncated' : ''}`}
            >
                {displayName}
            </h4>
        </div>
    );

    return (
        <li
            className={`breadcrumb-item ${item.isActive ? 'breadcrumb-item--active' : ''} ${className}`}
            role="listitem"
        >
            <BreadcrumbLink>
                <BreadcrumbText />
            </BreadcrumbLink>
        </li>
    );
};

export default BreadcrumbItem;
