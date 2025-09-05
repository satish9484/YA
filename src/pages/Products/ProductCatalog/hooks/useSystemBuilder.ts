import { useCallback, useMemo } from 'react';

import type { ProductDetail, UseSystemBuilderReturn } from '../types/product-detail.types';
import { calculateSystemTotal, getSelectedAccessories } from '../utils/product-detail.utils';

/**
 * Custom hook for managing system builder state and logic
 * Handles accessory selection and system configuration
 */
export const useSystemBuilder = (
    product: ProductDetail | null,
    selectedAccessories: string[],
    quantity: number,
): UseSystemBuilderReturn => {
    // Calculate total price
    const totalPrice = useMemo(() => {
        if (!product) return 0;
        return calculateSystemTotal(
            product.price,
            quantity,
            selectedAccessories,
            product.accessories,
        );
    }, [product, quantity, selectedAccessories]);

    // Get selected accessories
    const selectedAccessoriesList = useMemo(() => {
        if (!product) return [];
        return getSelectedAccessories(selectedAccessories, product.accessories);
    }, [product, selectedAccessories]);

    // Handle accessory toggle
    const handleToggleAccessory = useCallback((accessoryId: string) => {
        // This would typically be handled by the parent component
        // The hook provides the logic, parent manages the state
        console.log('Toggle accessory:', accessoryId);
    }, []);

    // Calculate total
    const calculateTotal = useCallback(() => {
        if (!product) return 0;
        return calculateSystemTotal(
            product.price,
            quantity,
            selectedAccessories,
            product.accessories,
        );
    }, [product, quantity, selectedAccessories]);

    return {
        selectedAccessories,
        totalPrice,
        toggleAccessory: handleToggleAccessory,
        calculateTotal,
        getSelectedAccessories: () => selectedAccessoriesList,
    };
};
