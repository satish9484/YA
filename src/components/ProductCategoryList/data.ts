import { ProductCategory } from './types';

export const productCategories: ProductCategory[] = [
    {
        id: '1',
        name: 'Featured Products',
        products: [
            {
                id: '101',
                name: 'Professional Loudspeaker',
                image: '/bg/bg-1.webp',
                price: 299.99,
                description: 'High-performance loudspeaker for professional audio applications.',
            },
            {
                id: '102',
                name: 'Studio Monitor',
                image: '/bg/bg-2.jpg',
                price: 199.99,
                description: 'Active studio monitor with a flat frequency response.',
            },
            {
                id: '103',
                name: 'Portable PA System',
                image: '/bg/empty-speaker-cabinet.jpg',
                price: 499.99,
                description: 'All-in-one portable PA system with a built-in mixer.',
            },
            {
                id: '104',
                name: 'Wireless Microphone System',
                image: '/bg/bg-1.webp',
                price: 149.99,
                description: 'UHF wireless microphone system with a handheld transmitter.',
            },
            {
                id: '105',
                name: 'Headphones',
                image: '/bg/bg-1.webp',
                price: 99.99,
                description: 'Professional studio headphones for critical listening.',
            },
            {
                id: '106',
                name: 'Acoustic Panels',
                image: '/bg/bg-2.jpg',
                price: 79.99,
                description: 'Sound-absorbing panels for room treatment.',
            },
        ],
    },
    {
        id: '2',
        name: 'New Arrivals',
        products: [
            {
                id: '201',
                name: 'DJ Controller',
                image: '/bg/bg-2.jpg',
                price: 399.99,
                description: '4-deck DJ controller with integrated audio interface.',
            },
            {
                id: '202',
                name: 'Audio Interface',
                image: '/bg/empty-speaker-cabinet.jpg',
                price: 129.99,
                description: '2-in/2-out USB audio interface with MIDI I/O.',
            },
            {
                id: '203',
                name: 'Mixing Console',
                image: '/bg/bg-1.webp',
                price: 699.99,
                description: '16-channel analog mixing console with digital effects.',
            },
            {
                id: '204',
                name: 'Subwoofer',
                image: '/bg/bg-2.jpg',
                price: 349.99,
                description: 'Powered subwoofer with a 12-inch driver.',
            },
            {
                id: '205',
                name: 'Digital Mixer',
                image: '/bg/empty-speaker-cabinet.jpg',
                price: 899.99,
                description: '32-channel digital mixer with motorized faders.',
            },
            {
                id: '206',
                name: 'DI Box',
                image: '/bg/bg-1.webp',
                price: 49.99,
                description: 'Active direct box for instruments.',
            },
        ],
    },
];
