import type React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    AudioOutlined,
    PlayCircleOutlined,
    SettingOutlined,
    TeamOutlined,
    TrophyOutlined,
} from '@ant-design/icons';

// Import modular components
import AboutSection from './components/AboutSection';
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductsSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import './landing.scss';
// Import types
import type { FeatureItem, LandingPageProps, Product } from './types/landing.types';

/**
 * Landing Page Component
 *
 * CRO-optimized landing page with modular architecture
 * Follows conversion-focused information hierarchy
 */
const Index: React.FC<LandingPageProps> = () => {
    const navigate = useNavigate();

    // Navigation handlers
    const handleGetStarted = () => {
        navigate('/products');
    };

    const handleLearnMore = () => {
        navigate('/about');
    };

    const handleViewDetails = (_productId: number) => {
        // For now, we'll navigate to the TOA HX-5B product detail page
        // In a real application, you'd map productId to specific product routes
        navigate('/products/toa-hx5b');
    };

    const handleContactUs = () => {
        navigate('/contact');
    };

    // Product data - CRO optimized for conversion
    const products: Product[] = [
        {
            id: 1,
            title: 'Full Range PA Speaker',
            image: 'https://tse4.mm.bing.net/th/id/OIP.ze6zwZu5ovcPy-6hqgLrZwAAAA?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
            features: [
                '8", 10", 12" and dual 15" models available',
                'Dual 18" and 21" subwoofers',
                'High-quality plywood cabinet',
                'Custom-made woofers for high output',
            ],
            icon: <AudioOutlined />,
        },
        {
            id: 2,
            title: 'FP Power Amplifier',
            image: 'https://tse1.mm.bing.net/th/id/OIP.ofHTW0BFe4Qju4aQWWOeTwHaHa?cb=thfvnext&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3',
            features: [
                '2-channel and 4-channel series',
                'Stable under 2-ohm long-term drive',
                '650W to 2500W @ 8-ohm per channel',
                'Compact 2U rack design',
            ],
            icon: <SettingOutlined />,
        },
        {
            id: 3,
            title: 'Dual 12" Line Array',
            image: 'https://tse1.mm.bing.net/th/id/OIP.xX9Tc2PYtjkoaiGYcxq9ygAAAA?cb=thfvnext&pid=ImgDet&w=184&h=235&c=7&dpr=1.3&o=7&rm=3',
            features: [
                'High-performance 2-way system',
                'Two 12-inch BEYMA woofers',
                'One 3-inch BEYMA compression driver',
                '900W RMS powerful line array',
            ],
            icon: <TrophyOutlined />,
        },
        {
            id: 4,
            title: 'Professional DJ Mixer',
            image: 'https://tse1.mm.bing.net/th/id/OIP.Vm-L7e9cr6ba-zN3O_KRawHaHg?cb=thfvnext&pid=ImgDet&w=184&h=186&c=7&dpr=1.3&o=7&rm=3',
            features: [
                '4-channel club-style layout',
                'Dedicated sound color FX',
                '14 high-quality beat FX',
                'Durable Magvel fader',
            ],
            icon: <PlayCircleOutlined />,
        },
    ];

    // Feature data for Why Choose Us section
    const features: FeatureItem[] = [
        {
            icon: <TrophyOutlined />,
            title: 'Professional Quality',
            description: 'Industry-leading audio equipment designed for professional applications.',
        },
        {
            icon: <TeamOutlined />,
            title: 'Expert Support',
            description: 'Dedicated technical support and installation services.',
        },
        {
            icon: <SettingOutlined />,
            title: 'Custom Solutions',
            description: 'Tailored audio solutions for your specific requirements.',
        },
    ];

    return (
        <>
            {/* Hero Section - Primary CTA */}
            <HeroSection onGetStarted={handleGetStarted} onLearnMore={handleLearnMore} />

            {/* About Section - Problem/Solution */}
            <AboutSection onViewProducts={handleGetStarted} onContactUs={handleContactUs} />

            {/* Why Choose Us Section - Detailed Features */}
            <WhyChooseUsSection features={features} />

            {/* Products Section - Social Proof */}
            <ProductsSection products={products} onViewDetails={handleViewDetails} />
        </>
    );
};

export default Index;
