import { useCallback, useMemo, useState } from 'react';

import type { BreadcrumbItem, UseBreadcrumbsReturn } from '../types/breadcrumbs.types';
import { truncateBreadcrumbs } from '../utils/breadcrumbs.utils';

/**
 * Custom hook for managing breadcrumbs state and operations
 * Handles breadcrumb truncation, expansion, and navigation
 */
export const useBreadcrumbs = (
    items: BreadcrumbItem[],
    maxItems: number = 5,
): UseBreadcrumbsReturn => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Calculate visible and hidden items
    const { visibleItems, hiddenItems, showEllipsis } = useMemo(() => {
        if (isExpanded || items.length <= maxItems) {
            return {
                visibleItems: items,
                hiddenItems: [],
                showEllipsis: false,
            };
        }
        return truncateBreadcrumbs(items, maxItems);
    }, [items, maxItems, isExpanded]);

    // Handle expand breadcrumbs
    const handleExpandBreadcrumbs = useCallback(() => {
        setIsExpanded(true);
    }, []);

    // Handle collapse breadcrumbs
    const handleCollapseBreadcrumbs = useCallback(() => {
        setIsExpanded(false);
    }, []);

    // Memoized actions
    const actions = useMemo(
        () => ({
            expandBreadcrumbs: handleExpandBreadcrumbs,
            collapseBreadcrumbs: handleCollapseBreadcrumbs,
            isExpanded,
        }),
        [handleExpandBreadcrumbs, handleCollapseBreadcrumbs, isExpanded],
    );

    return {
        visibleItems,
        hiddenItems,
        showEllipsis,
        actions,
    };
};
