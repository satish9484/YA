// import type { ProductCategory } from '../ProductCatalog/types/product-catalog.types';

// Extended Product interface for LineArray products
interface LineArrayProduct {
    readonly id: string;
    readonly name: string;
    readonly image: string;
    readonly price: number;
    readonly originalPrice?: number;
    readonly description: string;
    readonly category?: string;
    readonly inStock?: boolean;
    readonly stockCount?: number;
    readonly rating?: number;
    readonly reviewCount?: number;
    readonly tags?: string[];
    readonly specifications?: Record<string, string>;
    readonly brand?: string;
    readonly sku?: string;
    readonly warranty?: string;
}

// Extended ProductCategory interface for LineArray products
interface LineArrayProductCategory {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly products: LineArrayProduct[];
    readonly totalCount: number;
}

export const lineArrayProducts: LineArrayProductCategory[] = [
    {
        id: 'line-array-professional',
        name: 'Professional Line Array Systems',
        description:
            'High-performance line array speakers for large venues and professional applications',
        totalCount: 6,
        products: [
            {
                id: 'toa-hx5b',
                name: 'TOA HX-5B Variable Dispersion Line Array Speaker',
                image: '/images/01.png',
                price: 1299.99,
                originalPrice: 1499.99,
                description:
                    'Precision Sound Control for Challenging Acoustic Spaces with variable dispersion technology',
                category: 'Line Array Speakers',
                inStock: true,
                stockCount: 12,
                rating: 4.8,
                reviewCount: 127,
                tags: ['Professional', 'Variable Dispersion', 'High-Quality'],
                specifications: {
                    'Power Handling': '600W Program / 300W Continuous',
                    Impedance: '8 Ω',
                    Sensitivity: '96-99 dB (varies by dispersion angle)',
                    'Frequency Response': '70 Hz - 20 kHz (varies by angle)',
                    'Maximum SPL': '130 dB',
                    Dispersion: '15°, 30°, 45°, 60° (adjustable)',
                },
                brand: 'TOA',
                sku: 'TOA-HX5B-001',
                warranty: '5-Year Manufacturer Warranty',
            },
            {
                id: 'toa-hx5b-wp',
                name: 'TOA HX-5B-WP Weatherproof Line Array Speaker',
                image: '/images/02.png',
                price: 1399.99,
                originalPrice: 1599.99,
                description: 'Weatherproof version with IP55 rating for outdoor applications',
                category: 'Line Array Speakers',
                inStock: true,
                stockCount: 8,
                rating: 4.9,
                reviewCount: 89,
                tags: ['Weatherproof', 'Outdoor', 'IP55'],
                specifications: {
                    'Power Handling': '600W Program / 300W Continuous',
                    Impedance: '8 Ω',
                    Sensitivity: '96-99 dB (varies by dispersion angle)',
                    'Frequency Response': '70 Hz - 20 kHz (varies by angle)',
                    'Maximum SPL': '130 dB',
                    'Weather Rating': 'IP55',
                },
                brand: 'TOA',
                sku: 'TOA-HX5B-WP-001',
                warranty: '5-Year Manufacturer Warranty',
            },
            {
                id: 'toa-hx3b',
                name: 'TOA HX-3B Compact Line Array Speaker',
                image: '/images/03.png',
                price: 899.99,
                originalPrice: 1099.99,
                description: 'Compact line array speaker for medium-sized venues and installations',
                category: 'Line Array Speakers',
                inStock: true,
                stockCount: 15,
                rating: 4.6,
                reviewCount: 95,
                tags: ['Compact', 'Medium Venue', 'Versatile'],
                specifications: {
                    'Power Handling': '400W Program / 200W Continuous',
                    Impedance: '8 Ω',
                    Sensitivity: '94-97 dB (varies by dispersion angle)',
                    'Frequency Response': '80 Hz - 20 kHz (varies by angle)',
                    'Maximum SPL': '125 dB',
                    Dispersion: '30°, 45°, 60° (adjustable)',
                },
                brand: 'TOA',
                sku: 'TOA-HX3B-001',
                warranty: '5-Year Manufacturer Warranty',
            },
            {
                id: 'toa-hx7b',
                name: 'TOA HX-7B High-Power Line Array Speaker',
                image: '/images/04.png',
                price: 1899.99,
                originalPrice: 2199.99,
                description: 'High-power line array speaker for large venues and outdoor events',
                category: 'Line Array Speakers',
                inStock: true,
                stockCount: 6,
                rating: 4.9,
                reviewCount: 67,
                tags: ['High-Power', 'Large Venue', 'Outdoor'],
                specifications: {
                    'Power Handling': '800W Program / 400W Continuous',
                    Impedance: '8 Ω',
                    Sensitivity: '98-101 dB (varies by dispersion angle)',
                    'Frequency Response': '65 Hz - 20 kHz (varies by angle)',
                    'Maximum SPL': '135 dB',
                    Dispersion: '15°, 30°, 45°, 60° (adjustable)',
                },
                brand: 'TOA',
                sku: 'TOA-HX7B-001',
                warranty: '5-Year Manufacturer Warranty',
            },
            {
                id: 'toa-hx1b',
                name: 'TOA HX-1B Entry-Level Line Array Speaker',
                image: '/images/01.png',
                price: 599.99,
                originalPrice: 749.99,
                description:
                    'Entry-level line array speaker perfect for small venues and budget installations',
                category: 'Line Array Speakers',
                inStock: true,
                stockCount: 20,
                rating: 4.4,
                reviewCount: 156,
                tags: ['Entry-Level', 'Budget', 'Small Venue'],
                specifications: {
                    'Power Handling': '300W Program / 150W Continuous',
                    Impedance: '8 Ω',
                    Sensitivity: '92-95 dB (varies by dispersion angle)',
                    'Frequency Response': '85 Hz - 20 kHz (varies by angle)',
                    'Maximum SPL': '120 dB',
                    Dispersion: '45°, 60° (adjustable)',
                },
                brand: 'TOA',
                sku: 'TOA-HX1B-001',
                warranty: '3-Year Manufacturer Warranty',
            },
            {
                id: 'toa-hx9b',
                name: 'TOA HX-9B Premium Line Array Speaker',
                image: '/images/02.png',
                price: 2499.99,
                originalPrice: 2799.99,
                description:
                    'Premium line array speaker with advanced DSP and networking capabilities',
                category: 'Line Array Speakers',
                inStock: false,
                stockCount: 0,
                rating: 5.0,
                reviewCount: 23,
                tags: ['Premium', 'DSP', 'Networking'],
                specifications: {
                    'Power Handling': '1000W Program / 500W Continuous',
                    Impedance: '8 Ω',
                    Sensitivity: '100-103 dB (varies by dispersion angle)',
                    'Frequency Response': '60 Hz - 20 kHz (varies by angle)',
                    'Maximum SPL': '140 dB',
                    DSP: 'Built-in Digital Signal Processing',
                },
                brand: 'TOA',
                sku: 'TOA-HX9B-001',
                warranty: '5-Year Manufacturer Warranty',
            },
        ],
    },
    {
        id: 'line-array-accessories',
        name: 'Line Array Accessories & Mounting',
        description: 'Essential accessories and mounting hardware for line array systems',
        totalCount: 4,
        products: [
            {
                id: 'toa-fb-120b',
                name: 'TOA FB-120B Matching Subwoofer',
                image: '/images/02.png',
                price: 899.99,
                description: 'Matching 12" subwoofer for extended low-frequency response',
                category: 'Subwoofers',
                inStock: true,
                stockCount: 10,
                rating: 4.7,
                reviewCount: 78,
                tags: ['Subwoofer', 'Matching', 'Extended Bass'],
                specifications: {
                    Driver: '12 inch',
                    Power: '500W RMS',
                    'Frequency Response': '35 Hz - 200 Hz',
                    Impedance: '8 Ω',
                    Sensitivity: '95 dB',
                },
                brand: 'TOA',
                sku: 'TOA-FB120B-001',
                warranty: '5-Year Manufacturer Warranty',
            },
            {
                id: 'toa-hy-wm1b',
                name: 'HY-WM1B Wall Mount Bracket',
                image: '/images/03.png',
                price: 149.99,
                description: 'Heavy-duty wall mounting bracket for single speaker',
                category: 'Mounting Hardware',
                inStock: true,
                stockCount: 25,
                rating: 4.5,
                reviewCount: 45,
                tags: ['Wall Mount', 'Heavy-Duty', 'Single Speaker'],
                specifications: {
                    'Weight Capacity': '50 kg',
                    Material: 'Steel',
                    Finish: 'Powder Coated',
                    Mounting: 'Wall',
                },
                brand: 'TOA',
                sku: 'TOA-HYWM1B-001',
                warranty: '2-Year Manufacturer Warranty',
            },
            {
                id: 'toa-hy-cw1b',
                name: 'HY-CW1B Ceiling Mount Bracket',
                image: '/images/04.png',
                price: 199.99,
                description: 'Professional ceiling mounting system with tilt adjustment',
                category: 'Mounting Hardware',
                inStock: true,
                stockCount: 18,
                rating: 4.6,
                reviewCount: 52,
                tags: ['Ceiling Mount', 'Tilt Adjustment', 'Professional'],
                specifications: {
                    'Weight Capacity': '50 kg',
                    Material: 'Steel',
                    'Tilt Range': '0-30 degrees',
                    Mounting: 'Ceiling',
                },
                brand: 'TOA',
                sku: 'TOA-HYCW1B-001',
                warranty: '2-Year Manufacturer Warranty',
            },
            {
                id: 'toa-hy-st1',
                name: 'HY-ST1 Stand Adapter',
                image: '/images/01.png',
                price: 89.99,
                description: 'Universal stand adapter for portable applications',
                category: 'Mounting Hardware',
                inStock: true,
                stockCount: 30,
                rating: 4.3,
                reviewCount: 67,
                tags: ['Stand Adapter', 'Portable', 'Universal'],
                specifications: {
                    Compatibility: 'Universal',
                    Material: 'Aluminum',
                    Weight: '2.5 kg',
                    Mounting: 'Stand',
                },
                brand: 'TOA',
                sku: 'TOA-HYST1-001',
                warranty: '1-Year Manufacturer Warranty',
            },
        ],
    },
];
