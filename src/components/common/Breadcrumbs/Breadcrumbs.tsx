import type React from 'react';
import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';

import { HomeOutlined } from '@ant-design/icons';

import styles from './Breadcrumbs.module.scss';
import type { BreadcrumbItem, BreadcrumbsProps } from './types/breadcrumbs.types';
import { getRoutePath } from './utils/routeMapping';

/**
 * Professional breadcrumbs component using Ant Design and React Router
 *
 * Features:
 * - Uses Ant Design Breadcrumb component for consistent styling
 * - Integrates with React Router for navigation
 * - Supports custom separators and icons
 * - Handles truncation automatically
 * - Full accessibility support
 * - TypeScript support with strict typing
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
    items,
    className = '',
    separator = '/',
    showHome = false,
    homeIcon = <HomeOutlined />,
    maxItems = 5,
    onItemClick,
    ariaLabel = 'Breadcrumb navigation',
}) => {
    // Handle breadcrumb item click
    const handleItemClick = useCallback(
        (item: BreadcrumbItem, index: number) => {
            if (onItemClick) {
                onItemClick(item, index);
            }
        },
        [onItemClick],
    );

    // Create home item if needed
    const homeItem = useMemo(() => {
        if (!showHome) return null;
        return {
            id: 'home',
            name: 'Home',
            routerName: 'home',
            icon: homeIcon,
            isActive: false,
        };
    }, [showHome, homeIcon]);

    // Combine home item with provided items
    const allItems = useMemo(() => {
        if (homeItem) {
            return [homeItem, ...items];
        }
        return items;
    }, [homeItem, items]);

    // Truncate items if needed
    const visibleItems = useMemo(() => {
        if (allItems.length <= maxItems) {
            return allItems;
        }

        // Keep first item, last item, and items in between
        const firstItem = allItems[0];
        const lastItem = allItems[allItems.length - 1];
        const middleItems = allItems.slice(1, -1);

        // If we have more than 2 items and need to truncate
        if (middleItems.length > 0) {
            const visibleMiddleItems = middleItems.slice(0, maxItems - 2);
            return [firstItem, ...visibleMiddleItems, lastItem];
        }

        return allItems.slice(0, maxItems);
    }, [allItems, maxItems]);

    // Convert items to Ant Design breadcrumb format
    const breadcrumbItems = useMemo(() => {
        return visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;
            const routePath = getRoutePath(item.routerName);

            // Create the breadcrumb item content
            const itemContent = (
                <span className={styles['breadcrumb-item-content']}>
                    {item.icon && (
                        <span className={styles['breadcrumb-item-icon']}>{item.icon}</span>
                    )}
                    <span className={styles['breadcrumb-item-text']}>{item.name}</span>
                </span>
            );

            // If it's the last item or has no route, render as span
            if (isLast || !routePath) {
                return {
                    title: itemContent,
                    key: item.id,
                    ...(isLast && { 'aria-current': 'page' as const }),
                };
            }

            // Otherwise, render as Link
            return {
                title: (
                    <Link
                        to={routePath}
                        onClick={() => handleItemClick(item, index)}
                        className={styles['breadcrumb-link']}
                        aria-label={`Navigate to ${item.name}`}
                    >
                        {itemContent}
                    </Link>
                ),
                key: item.id,
            };
        });
    }, [visibleItems, handleItemClick]);

    // Don't render if no items
    if (items.length === 0 && !showHome) {
        return null;
    }

    // Build final classes
    const navClasses = [styles['breadcrumbs'], className].filter(Boolean).join(' ');

    return (
        <nav className={navClasses} aria-label={ariaLabel}>
            <Breadcrumb
                items={breadcrumbItems}
                separator={separator}
                className="ant-breadcrumb-custom"
            />
        </nav>
    );
};

export default Breadcrumbs;
