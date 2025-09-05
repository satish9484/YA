import { useCallback, useMemo, useState } from 'react';

import { message } from 'antd';

import type {
    ProductDetail,
    ProductDetailProps,
    UseProductDetailReturn,
} from '../types/product-detail.types';
import { calculateSystemTotal, shareProduct } from '../utils/product-detail.utils';

/**
 * Custom hook for managing product detail state and operations
 * Handles all product detail interactions and state management
 */
export const useProductDetail = (
    product: ProductDetail | null,
    props: ProductDetailProps = {},
): UseProductDetailReturn => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedDispersion, setSelectedDispersion] = useState(60);
    const [quantity, setQuantity] = useState(1);
    const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
    const [wishlist, setWishlist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handle image selection
    const handleSetSelectedImage = useCallback((index: number) => {
        setSelectedImage(index);
    }, []);

    // Handle dispersion change
    const handleSetSelectedDispersion = useCallback((angle: number) => {
        setSelectedDispersion(angle);
    }, []);

    // Handle quantity change
    const handleSetQuantity = useCallback(
        (newQuantity: number) => {
            if (product && newQuantity > 0 && newQuantity <= product.stockCount) {
                setQuantity(newQuantity);
            }
        },
        [product],
    );

    // Handle accessory toggle
    const handleToggleAccessory = useCallback((accessoryId: string) => {
        setSelectedAccessories(prev => {
            if (prev.includes(accessoryId)) {
                return prev.filter(id => id !== accessoryId);
            } else {
                return [...prev, accessoryId];
            }
        });
    }, []);

    // Handle wishlist toggle
    const handleToggleWishlist = useCallback(() => {
        setWishlist(prev => !prev);
        message.success(wishlist ? 'Removed from wishlist' : 'Added to wishlist');
    }, [wishlist]);

    // Handle add to cart
    const handleAddToCart = useCallback(() => {
        if (!product) return;

        setLoading(true);
        try {
            // Simulate API call
            setTimeout(() => {
                message.success(`Added ${quantity} ${product.name} to cart`);
                setLoading(false);
            }, 1000);

            // Call external handler if provided
            if (props.onAddToCart) {
                props.onAddToCart(product, quantity);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add to cart');
            setLoading(false);
        }
    }, [product, quantity, props]);

    // Handle add system to cart
    const handleAddSystemToCart = useCallback(() => {
        if (!product) return;

        setLoading(true);
        try {
            const totalPrice = calculateSystemTotal(
                product.price,
                quantity,
                selectedAccessories,
                product.accessories,
            );

            // Simulate API call
            setTimeout(() => {
                message.success(`Added complete system ($${totalPrice.toFixed(2)}) to cart`);
                setLoading(false);
            }, 1000);

            // Call external handler if provided
            if (props.onAddToCart) {
                props.onAddToCart(product, quantity);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add system to cart');
            setLoading(false);
        }
    }, [product, quantity, selectedAccessories, props]);

    // Handle share
    const handleShare = useCallback(async () => {
        if (!product) return;

        try {
            await shareProduct(product);
            message.success('Product shared successfully');

            // Call external handler if provided
            if (props.onShare) {
                props.onShare(product);
            }
        } catch {
            message.error('Failed to share product');
        }
    }, [product, props]);

    // Memoized actions
    const actions = useMemo(
        () => ({
            setSelectedImage: handleSetSelectedImage,
            setSelectedDispersion: handleSetSelectedDispersion,
            setQuantity: handleSetQuantity,
            toggleAccessory: handleToggleAccessory,
            toggleWishlist: handleToggleWishlist,
            addToCart: handleAddToCart,
            addSystemToCart: handleAddSystemToCart,
            share: handleShare,
        }),
        [
            handleSetSelectedImage,
            handleSetSelectedDispersion,
            handleSetQuantity,
            handleToggleAccessory,
            handleToggleWishlist,
            handleAddToCart,
            handleAddSystemToCart,
            handleShare,
        ],
    );

    return {
        product,
        loading,
        error,
        selectedImage,
        selectedDispersion,
        quantity,
        selectedAccessories,
        wishlist,
        actions,
    };
};
