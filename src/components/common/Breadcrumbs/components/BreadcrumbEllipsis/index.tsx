import type React from 'react';
import { useCallback, useMemo } from 'react';

import { MoreOutlined } from '@ant-design/icons';

import './BreadcrumbEllipsis.scss';
import type { BreadcrumbEllipsisComponentProps } from './BreadcrumbEllipsis.types';

const BreadcrumbEllipsis: React.FC<BreadcrumbEllipsisComponentProps> = ({
    className = '',
    onClick,
    hiddenItemsCount = 0,
    ariaLabel,
    animated = false,
    size = 'medium',
    variant = 'dots',
}) => {
    // Handle click
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        }
    }, [onClick]);

    // Handle keyboard interaction
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        },
        [handleClick],
    );

    // Get display text
    const displayText = useMemo(() => {
        if (hiddenItemsCount > 0) {
            return `${hiddenItemsCount} more`;
        }
        return '';
    }, [hiddenItemsCount]);

    // Get aria label
    const finalAriaLabel = useMemo(() => {
        if (ariaLabel) return ariaLabel;
        if (hiddenItemsCount > 0) {
            return `Show ${hiddenItemsCount} more breadcrumb items`;
        }
        return 'Show more breadcrumb items';
    }, [ariaLabel, hiddenItemsCount]);

    // Get icon based on variant
    const getIcon = () => {
        switch (variant) {
            case 'more':
                return <MoreOutlined />;
            case 'expand':
                return '⋯';
            case 'dots':
            default:
                return '⋯';
        }
    };

    return (
        <li
            className={`breadcrumb-ellipsis breadcrumb-ellipsis--${variant} breadcrumb-ellipsis--${size} ${
                animated ? 'breadcrumb-ellipsis--animated' : ''
            } ${className}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={finalAriaLabel}
        >
            <span className="breadcrumb-ellipsis__icon" aria-hidden="true">
                {getIcon()}
            </span>
            {displayText && <span className="breadcrumb-ellipsis__text">{displayText}</span>}
        </li>
    );
};

export default BreadcrumbEllipsis;
