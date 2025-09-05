import type { ProductDetail } from '../types/product-detail.types';

// Product data based on the detailed specifications
export const productDetailData: ProductDetail = {
    id: 'toa-hx5b',
    name: 'TOA HX-5B Variable Dispersion Line Array Speaker',
    tagline: 'Precision Sound Control for Challenging Acoustic Spaces',
    price: 1299.99,
    originalPrice: 1499.99,
    inStock: true,
    stockCount: 12,
    sku: 'TOA-HX5B-001',
    brand: 'TOA',
    category: 'Line Array Speakers',
    rating: 4.8,
    reviewCount: 127,
    warranty: '5-Year Manufacturer Warranty',

    // Image gallery with Amazon-style preview
    images: [
        {
            id: 1,
            src: '/images/01.png',
            alt: 'TOA HX-5B Front View',
            type: 'main',
        },
        {
            id: 2,
            src: '/images/02.png',
            alt: 'TOA HX-5B Side View',
            type: 'gallery',
        },
        {
            id: 3,
            src: '/images/03.png',
            alt: 'TOA HX-5B Back View',
            type: 'gallery',
        },
        {
            id: 4,
            src: '/images/04.png',
            alt: 'TOA HX-5B Terminal Panel',
            type: 'gallery',
        },
        {
            id: 5,
            src: '/bg/bg-2.jpg',
            alt: 'TOA HX-5B in Auditorium',
            type: 'context',
        },
        {
            id: 6,
            src: '/bg/empty-speaker-cabinet.jpg',
            alt: 'TOA HX-5B Installation',
            type: 'context',
        },
        {
            id: 7,
            src: '/bg/bg-1.webp',
            alt: 'TOA HX-5B Professional Setup',
            type: 'context',
        },
    ],

    // Variable dispersion configurations
    dispersionConfigs: {
        15: {
            angle: '15°',
            sensitivity: '99 dB',
            frequencyResponse: '85 Hz - 20 kHz',
            description: 'Long-throw applications in large venues',
            useCase:
                'Ideal for delivering maximum sound pressure and intelligibility to the furthest seats in auditoriums and large halls.',
        },
        30: {
            angle: '30°',
            sensitivity: '98 dB',
            frequencyResponse: '80 Hz - 20 kHz',
            description: 'Medium-throw focused coverage',
            useCase:
                'Perfect for medium-sized venues requiring focused sound coverage with excellent clarity.',
        },
        45: {
            angle: '45°',
            sensitivity: '97 dB',
            frequencyResponse: '75 Hz - 20 kHz',
            description: 'Versatile coverage for most applications',
            useCase:
                'The most versatile setting, ideal for a wide range of venues from conference rooms to small auditoriums.',
        },
        60: {
            angle: '60°',
            sensitivity: '96 dB',
            frequencyResponse: '70 Hz - 20 kHz',
            description: 'Wide coverage for intimate spaces',
            useCase:
                'Excellent for smaller venues, boardrooms, and spaces requiring wide, even coverage.',
        },
    },

    // Technical specifications
    specifications: {
        performance: [
            { key: 'Power Handling', value: '600W Program / 300W Continuous' },
            { key: 'Impedance', value: '8 Ω' },
            { key: 'Sensitivity (1W, 1m)', value: '96-99 dB (varies by dispersion angle)' },
            { key: 'Frequency Response (-10 dB)', value: '70 Hz - 20 kHz (varies by angle)' },
            { key: 'Crossover Frequency', value: '2.5 kHz' },
            { key: 'Maximum SPL', value: '130 dB' },
        ],
        directivity: [
            { key: 'Horizontal Coverage', value: '120°' },
            { key: 'Vertical Coverage', value: '15°, 30°, 45°, 60° (adjustable)' },
            { key: 'Dispersion Control', value: 'On-site adjustable' },
        ],
        components: [
            { key: 'Low Frequency Driver', value: '12" Woofer with 2.5" voice coil' },
            { key: 'High Frequency Driver', value: '1" Compression driver with 1.4" exit' },
            { key: 'Enclosure Type', value: '2-way compact speaker system' },
            { key: 'Construction', value: 'Lightweight polypropylene' },
        ],
        connections: [
            { key: 'Input Terminals', value: 'Dual Speakon and screw terminal' },
            { key: 'Parallel Connectors', value: 'Pass-through to additional speakers' },
            { key: 'Protection', value: 'Ball impact proof' },
        ],
        physical: [
            { key: 'Dimensions (W x H x D)', value: '408 x 546 x 342 mm / 16.1" x 21.5" x 13.5"' },
            { key: 'Weight', value: '12.5 kg / 27.6 lbs' },
            { key: 'Finish', value: 'Black polypropylene' },
            { key: 'Mounting', value: 'Multiple bracket options available' },
        ],
    },

    // Applications and use cases
    applications: [
        {
            id: 1,
            title: 'Auditoriums & Theaters',
            image: '/bg/bg-2.jpg',
            description: 'Overcoming reverberation to deliver crisp, clear speech to every seat',
            features: ['Long-throw capability', 'Variable dispersion', 'High intelligibility'],
        },
        {
            id: 2,
            title: 'Houses of Worship',
            image: '/bg/empty-speaker-cabinet.jpg',
            description: 'Perfect for both speech and music in challenging acoustic environments',
            features: ['Versatile coverage', 'Easy installation', 'Professional sound quality'],
        },
        {
            id: 3,
            title: 'Corporate Boardrooms',
            image: '/bg/bg-1.webp',
            description: 'Clear communication for presentations and video conferences',
            features: ['Compact design', 'Multiple mounting options', 'Crystal clear speech'],
        },
        {
            id: 4,
            title: 'Sports Facilities',
            image: '/images/01.png',
            description: 'Durable, high-performance audio for gymnasiums and sports halls',
            features: ['Impact resistant', 'High SPL capability', 'Weather considerations'],
        },
    ],

    // Accessories and system components
    accessories: [
        {
            id: 'fb-120b',
            name: 'TOA FB-120B Subwoofer',
            price: 899.99,
            image: '/images/02.png',
            description: 'Matching 12" subwoofer for extended low-frequency response',
            compatible: true,
            recommended: true,
        },
        {
            id: 'hy-wm1b',
            name: 'HY-WM1B Wall Mount Bracket',
            price: 149.99,
            image: '/images/03.png',
            description: 'Heavy-duty wall mounting bracket for single speaker',
            compatible: true,
            recommended: false,
        },
        {
            id: 'hy-cw1b',
            name: 'HY-CW1B Ceiling Mount Bracket',
            price: 199.99,
            image: '/images/04.png',
            description: 'Professional ceiling mounting system with tilt adjustment',
            compatible: true,
            recommended: false,
        },
        {
            id: 'hy-st1',
            name: 'HY-ST1 Stand Adapter',
            price: 89.99,
            image: '/images/01.png',
            description: 'Universal stand adapter for portable applications',
            compatible: true,
            recommended: false,
        },
    ],

    // Customer reviews
    reviews: [
        {
            id: 1,
            user: 'Audio Engineer Pro',
            rating: 5,
            date: '2024-01-15',
            verified: true,
            title: 'Exceptional sound quality and flexibility',
            content:
                'The variable dispersion feature is a game-changer. Being able to adjust the coverage pattern on-site has saved us countless hours of repositioning speakers. The sound quality is outstanding across all frequency ranges.',
            helpful: 23,
            images: ['/images/01.png'],
        },
        {
            id: 2,
            user: 'AV Installer',
            rating: 5,
            date: '2024-01-10',
            verified: true,
            title: 'Perfect for challenging acoustic spaces',
            content:
                'Installed these in a reverberant church hall and the difference was night and day. The 15-degree setting gave us the focused coverage we needed for the back rows.',
            helpful: 18,
            images: [],
        },
        {
            id: 3,
            user: 'Venue Manager',
            rating: 4,
            date: '2024-01-08',
            verified: true,
            title: 'Great value for professional audio',
            content:
                "Solid build quality and excellent performance. The modular design means we can expand our system as needed. Only minor complaint is the weight, but that's expected for this level of performance.",
            helpful: 12,
            images: [],
        },
    ],

    // Q&A section
    qa: [
        {
            id: 1,
            question:
                'What is the difference between the indoor (HX-5B) and weatherproof (HX-5B-WP) versions?',
            answer: 'The HX-5B is designed for indoor use, while the HX-5B-WP features weatherproof construction with IP55 rating for outdoor applications. Both share the same variable dispersion technology and performance characteristics.',
            answeredBy: 'Product Expert',
            date: '2024-01-20',
            helpful: 15,
        },
        {
            id: 2,
            question: 'What tools are required to adjust the dispersion angle?',
            answer: 'The dispersion angle can be adjusted using the included hex wrench. The adjustment mechanism is designed for easy on-site configuration without requiring specialized tools.',
            answeredBy: 'Technical Support',
            date: '2024-01-18',
            helpful: 22,
        },
        {
            id: 3,
            question: 'Can multiple HX-5B units be stacked together?',
            answer: 'Yes, up to four HX-5B units can be stacked to form a larger line array. This modular approach allows for scalable coverage based on venue size and requirements.',
            answeredBy: 'Product Expert',
            date: '2024-01-16',
            helpful: 19,
        },
    ],

    // Downloads and resources
    resources: [
        {
            id: 1,
            title: 'Instruction Manual',
            type: 'PDF',
            size: '2.4 MB',
            url: '/downloads/hx5b-manual.pdf',
            icon: undefined, // Icon will be set in component
        },
        {
            id: 2,
            title: 'Specification Sheet',
            type: 'PDF',
            size: '1.8 MB',
            url: '/downloads/hx5b-specs.pdf',
            icon: undefined, // Icon will be set in component
        },
        {
            id: 3,
            title: 'Product Brochure',
            type: 'PDF',
            size: '3.2 MB',
            url: '/downloads/hx5b-brochure.pdf',
            icon: undefined, // Icon will be set in component
        },
        {
            id: 4,
            title: 'CAD Drawings',
            type: 'DWG',
            size: '1.1 MB',
            url: '/downloads/hx5b-cad.dwg',
            icon: undefined, // Icon will be set in component
        },
        {
            id: 5,
            title: 'Product Video',
            type: 'MP4',
            size: '45.2 MB',
            url: '/downloads/hx5b-video.mp4',
            icon: undefined, // Icon will be set in component
        },
    ],
};
