import type { ReactNode } from 'react';

// Product interface for the products section
export interface Product {
    id: number;
    title: string;
    image: string;
    features: string[];
    icon: ReactNode;
}

// Navigation handler type
export type NavigationHandler = () => void;

// Product detail handler type
export type ProductDetailHandler = (productId: number) => void;

// Swiper pagination configuration
export interface SwiperPagination {
    clickable: boolean;
    renderBullet: (index: number, className: string) => string;
}

// Feature item interface for Why Choose Us section
export interface FeatureItem {
    icon: ReactNode;
    title: string;
    description: string;
}

// Landing page props
export interface LandingPageProps {
    // Add any props that might be passed to the main landing page
    readonly [key: string]: unknown;
}

// Section props interfaces
export interface HeroSectionProps {
    onGetStarted: NavigationHandler;
    onLearnMore: NavigationHandler;
}

export interface AboutSectionProps {
    onViewProducts: NavigationHandler;
    onContactUs: NavigationHandler;
}

export interface WhyChooseUsSectionProps {
    features: FeatureItem[];
}

export interface ProductsSectionProps {
    products: Product[];
    onViewDetails: ProductDetailHandler;
}

export interface ProductCardProps {
    product: Product;
    onViewDetails: ProductDetailHandler;
}
