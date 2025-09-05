import { useCallback, useMemo, useState } from 'react';

import type {
    ProductReview,
    ReviewFilter,
    ReviewSort,
    UseReviewsReturn,
} from '../types/product-detail.types';
import { filterReviewsByRating, sortReviews } from '../utils/product-detail.utils';

/**
 * Custom hook for managing reviews state and operations
 * Handles review filtering, sorting, and interactions
 */
export const useReviews = (
    reviews: ProductReview[],
    initialFilter: ReviewFilter = 'all',
    initialSort: ReviewSort = 'newest',
): UseReviewsReturn => {
    const [filter, setFilter] = useState<ReviewFilter>(initialFilter);
    const [sort, setSort] = useState<ReviewSort>(initialSort);
    const [loading, setLoading] = useState(false);

    // Filter reviews by rating
    const filteredReviews = useMemo(() => {
        const ratingFilter = filter === 'all' ? 'all' : parseInt(filter);
        const filtered = filterReviewsByRating(reviews, ratingFilter);
        return sortReviews(filtered, sort);
    }, [reviews, filter, sort]);

    // Handle filter change
    const handleSetFilter = useCallback((newFilter: string) => {
        setFilter(newFilter as ReviewFilter);
    }, []);

    // Handle sort change
    const handleSetSort = useCallback((newSort: string) => {
        setSort(newSort as ReviewSort);
    }, []);

    // Handle load more reviews
    const handleLoadMoreReviews = useCallback(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    // Handle mark helpful
    const handleMarkHelpful = useCallback((reviewId: number) => {
        // This would typically update the review in the backend
        console.log('Mark review as helpful:', reviewId);
    }, []);

    // Memoized actions
    const actions = useMemo(
        () => ({
            setFilter: handleSetFilter,
            setSort: handleSetSort,
            loadMoreReviews: handleLoadMoreReviews,
            markHelpful: handleMarkHelpful,
        }),
        [handleSetFilter, handleSetSort, handleLoadMoreReviews, handleMarkHelpful],
    );

    return {
        reviews,
        filteredReviews,
        loading,
        filter,
        sort,
        actions,
    };
};
