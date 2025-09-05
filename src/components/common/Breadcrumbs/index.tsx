import React, { useCallback, useMemo } from 'react';

import { HomeOutlined } from '@ant-design/icons';

// Import styles
import './Breadcrumbs.scss';
// Import components
import BreadcrumbEllipsis from './components/BreadcrumbEllipsis';
import BreadcrumbItem from './components/BreadcrumbItem';
import BreadcrumbSeparator from './components/BreadcrumbSeparator';
// Import hooks and utilities
import { useBreadcrumbs } from './hooks/useBreadcrumbs';
// Import types
import type { BreadcrumbsProps } from './types/breadcrumbs.types';
import { createBreadcrumbItem, getBreadcrumbAriaLabel } from './utils/breadcrumbs.utils';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
    items,
    className = '',
    variant = 'default',
    separator = 'chevron',
    showHome = false,
    homeIcon = <HomeOutlined />,
    maxItems = 5,
    onItemClick,
    ariaLabel,
}) => {
    // Use breadcrumbs hook for truncation logic
    const { visibleItems, hiddenItems, showEllipsis, actions } = useBreadcrumbs(items, maxItems);

    // Handle item click
    const handleItemClick = useCallback(
        (item: (typeof items)[0], index: number) => {
            if (onItemClick) {
                onItemClick(item, index);
            }
        },
        [onItemClick],
    );

    // Handle ellipsis click (expand)
    const handleEllipsisClick = useCallback(() => {
        actions.expandBreadcrumbs();
    }, [actions]);

    // Handle collapse
    const handleCollapse = useCallback(() => {
        actions.collapseBreadcrumbs();
    }, [actions]);

    // Get final aria label
    const finalAriaLabel = useMemo(() => {
        if (ariaLabel) return ariaLabel;
        return getBreadcrumbAriaLabel(items);
    }, [ariaLabel, items]);

    // Create home item if needed
    const homeItem = useMemo(() => {
        if (!showHome) return null;
        return createBreadcrumbItem('home', 'Home', false, '/', homeIcon, 'Go to home page');
    }, [showHome, homeIcon]);

    // Combine home item with visible items
    const allVisibleItems = useMemo(() => {
        if (homeItem) {
            return [homeItem, ...visibleItems];
        }
        return visibleItems;
    }, [homeItem, visibleItems]);

    // Render breadcrumb items
    const renderBreadcrumbItems = () => {
        return allVisibleItems.map((item, index) => {
            const isLast = index === allVisibleItems.length - 1;
            const actualIndex = homeItem ? index - 1 : index; // Adjust index for home item

            return (
                <React.Fragment key={item.id}>
                    <BreadcrumbItem
                        item={item}
                        index={actualIndex}
                        isLast={isLast}
                        separator={separator}
                        onClick={handleItemClick}
                        showIcon={true}
                        truncateName={true}
                        maxNameLength={30}
                    />
                    {!isLast && <BreadcrumbSeparator type={separator} size="medium" />}
                </React.Fragment>
            );
        });
    };

    // Render ellipsis if needed
    const renderEllipsis = () => {
        if (!showEllipsis) return null;

        return (
            <>
                <BreadcrumbSeparator type={separator} size="medium" />
                <BreadcrumbEllipsis
                    onClick={handleEllipsisClick}
                    hiddenItemsCount={hiddenItems.length}
                    variant="dots"
                    size="medium"
                    animated={false}
                />
                <BreadcrumbSeparator type={separator} size="medium" />
            </>
        );
    };

    // Render collapse button if expanded
    const renderCollapseButton = () => {
        if (!actions.isExpanded) return null;

        return (
            <button
                className="breadcrumbs__expand"
                onClick={handleCollapse}
                aria-label="Collapse breadcrumbs"
                type="button"
            >
                <span>Show less</span>
                <span className="breadcrumbs__expand-icon">⌄</span>
            </button>
        );
    };

    // Empty state
    if (items.length === 0) {
        return (
            <nav
                className={`breadcrumbs breadcrumbs--empty breadcrumbs--${variant} ${className}`}
                aria-label={finalAriaLabel}
            >
                <ol className="breadcrumbs__list">
                    <li>No breadcrumbs available</li>
                </ol>
            </nav>
        );
    }

    return (
        <nav
            className={`breadcrumbs breadcrumbs--${variant} ${className}`}
            aria-label={finalAriaLabel}
        >
            <div className="breadcrumbs__container">
                <ol className="breadcrumbs__list">
                    {renderBreadcrumbItems()}
                    {renderEllipsis()}
                </ol>
                {renderCollapseButton()}
            </div>
        </nav>
    );
};

export default Breadcrumbs;
