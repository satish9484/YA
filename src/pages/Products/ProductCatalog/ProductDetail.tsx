import type React from 'react';
import { useState } from 'react';

import {
    Alert,
    Avatar,
    Badge,
    Button,
    Card,
    Carousel,
    Checkbox,
    Col,
    Divider,
    Form,
    Image,
    Input,
    InputNumber,
    List,
    message,
    Modal,
    Progress,
    Rate,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    Tabs,
    Tag,
    Typography,
} from 'antd';

import {
    CheckCircleOutlined,
    CloseOutlined,
    CustomerServiceOutlined,
    DownloadOutlined,
    FileTextOutlined,
    GiftOutlined,
    HeartOutlined,
    InfoCircleOutlined,
    LikeOutlined,
    MoreOutlined,
    PictureOutlined,
    PlayCircleOutlined,
    QuestionCircleOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SafetyOutlined,
    SearchOutlined,
    SettingOutlined,
    ShareAltOutlined,
    ShoppingCartOutlined,
    SoundOutlined,
    TruckOutlined,
    VideoCameraOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';

import './ProductDetail.scss';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Product data based on the detailed specifications
const productData = {
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
            icon: <FileTextOutlined />,
        },
        {
            id: 2,
            title: 'Specification Sheet',
            type: 'PDF',
            size: '1.8 MB',
            url: '/downloads/hx5b-specs.pdf',
            icon: <FileTextOutlined />,
        },
        {
            id: 3,
            title: 'Product Brochure',
            type: 'PDF',
            size: '3.2 MB',
            url: '/downloads/hx5b-brochure.pdf',
            icon: <FileTextOutlined />,
        },
        {
            id: 4,
            title: 'CAD Drawings',
            type: 'DWG',
            size: '1.1 MB',
            url: '/downloads/hx5b-cad.dwg',
            icon: <FileTextOutlined />,
        },
        {
            id: 5,
            title: 'Product Video',
            type: 'MP4',
            size: '45.2 MB',
            url: '/downloads/hx5b-video.mp4',
            icon: <VideoCameraOutlined />,
        },
    ],
};

const ProductDetail: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedDispersion, setSelectedDispersion] = useState(60);
    const [quantity, setQuantity] = useState(1);
    const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
    const [wishlist, setWishlist] = useState(false);
    const [qaModalVisible, setQaModalVisible] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');

    const handleAddToCart = () => {
        message.success(`Added ${quantity} TOA HX-5B to cart`);
    };

    const handleAddToWishlist = () => {
        setWishlist(!wishlist);
        message.success(wishlist ? 'Removed from wishlist' : 'Added to wishlist');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: productData.name,
                text: productData.tagline,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            message.success('Link copied to clipboard');
        }
    };

    const handleSubmitQuestion = () => {
        if (newQuestion.trim()) {
            message.success('Question submitted successfully');
            setNewQuestion('');
            setQaModalVisible(false);
        }
    };

    const calculateTotal = () => {
        const basePrice = productData.price * quantity;
        const accessoryPrice = selectedAccessories.reduce((total, accessoryId) => {
            const accessory = productData.accessories.find(acc => acc.id === accessoryId);
            return total + (accessory ? accessory.price : 0);
        }, 0);
        return basePrice + accessoryPrice;
    };

    const mainImages = productData.images.filter(
        img => img.type === 'main' || img.type === 'gallery',
    );
    const contextImages = productData.images.filter(img => img.type === 'context');

    return (
        <div className="product-detail-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <Row gutter={[32, 32]} align="top">
                        {/* Image Gallery */}
                        <Col xs={24} lg={14}>
                            <div className="image-gallery">
                                <div className="main-image-container">
                                    <Image.PreviewGroup
                                        items={mainImages.map(img => img.src)}
                                        preview={{
                                            toolbarRender: (_, info) => (
                                                <div className="custom-toolbar">
                                                    <Button
                                                        type="text"
                                                        icon={<RotateLeftOutlined />}
                                                        onClick={() => info.actions.onRotateLeft()}
                                                    />
                                                    <Button
                                                        type="text"
                                                        icon={<RotateRightOutlined />}
                                                        onClick={() => info.actions.onRotateRight()}
                                                    />
                                                    <Button
                                                        type="text"
                                                        icon={<ZoomOutOutlined />}
                                                        onClick={() => info.actions.onZoomOut()}
                                                    />
                                                    <Button
                                                        type="text"
                                                        icon={<ZoomInOutlined />}
                                                        onClick={() => info.actions.onZoomIn()}
                                                    />
                                                    <Button
                                                        type="text"
                                                        icon={<CloseOutlined />}
                                                        onClick={() => info.actions.onClose()}
                                                    />
                                                </div>
                                            ),
                                            scaleStep: 0.5,
                                            minScale: 1,
                                            maxScale: 3,
                                        }}
                                    >
                                        <Image
                                            src={mainImages[selectedImage]?.src}
                                            alt={mainImages[selectedImage]?.alt}
                                            className="main-image"
                                            placeholder={
                                                <div className="image-placeholder">
                                                    <PictureOutlined
                                                        style={{ fontSize: 48, color: '#ccc' }}
                                                    />
                                                </div>
                                            }
                                        />
                                    </Image.PreviewGroup>
                                </div>

                                <div className="thumbnail-strip">
                                    {mainImages.map((image, index) => (
                                        <div
                                            key={image.id}
                                            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                className="thumbnail-image"
                                                preview={false}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="context-gallery">
                                    <Title level={5}>In Action</Title>
                                    <Carousel
                                        dots={false}
                                        slidesToShow={3}
                                        slidesToScroll={1}
                                        responsive={[
                                            { breakpoint: 768, settings: { slidesToShow: 2 } },
                                            { breakpoint: 480, settings: { slidesToShow: 1 } },
                                        ]}
                                    >
                                        {contextImages.map(image => (
                                            <div key={image.id} className="context-image-item">
                                                <Image
                                                    src={image.src}
                                                    alt={image.alt}
                                                    className="context-image"
                                                    preview={{
                                                        mask: (
                                                            <div className="context-mask">
                                                                <PlayCircleOutlined />
                                                                <span>View Application</span>
                                                            </div>
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        </Col>

                        {/* Product Info & Purchase */}
                        <Col xs={24} lg={10}>
                            <div className="product-info">
                                <div className="product-header">
                                    {/* <Badge.Ribbon text="Professional Audio" color="blue">
                                        <Title level={2} className="product-title">
                                            {productData.name}
                                        </Title>
                                    </Badge.Ribbon> */}
                                    <Text className="product-tagline">{productData.tagline}</Text>

                                    <div className="product-meta">
                                        <Space>
                                            <Rate disabled defaultValue={productData.rating} />
                                            <Text>({productData.reviewCount} reviews)</Text>
                                        </Space>
                                        <Text>SKU: {productData.sku}</Text>
                                    </div>
                                </div>

                                <div className="pricing-section">
                                    <div className="price-display">
                                        <Text className="current-price">
                                            ${productData.price.toFixed(2)}
                                        </Text>
                                        <Text delete className="original-price">
                                            ${productData.originalPrice.toFixed(2)}
                                        </Text>
                                        <Tag color="red" className="savings-tag">
                                            Save $
                                            {(
                                                productData.originalPrice - productData.price
                                            ).toFixed(2)}
                                        </Tag>
                                    </div>

                                    <Alert
                                        message={
                                            <span style={{ color: 'var(--color-text-primary)' }}>
                                                In Stock
                                            </span>
                                        }
                                        description={
                                            <span
                                                style={{ color: 'var(--color-text-secondary)' }}
                                            >{`${productData.stockCount} units available`}</span>
                                        }
                                        type="success"
                                        showIcon
                                        icon={<CheckCircleOutlined />}
                                        className="stock-alert"
                                    />
                                </div>

                                <div className="key-features">
                                    <Title level={4}>Key Features</Title>
                                    <Space
                                        direction="vertical"
                                        size="small"
                                        className="feature-list"
                                    >
                                        <div className="feature-item">
                                            <SoundOutlined className="feature-icon" />
                                            <Text>Variable Dispersion: 15°, 30°, 45°, 60°</Text>
                                        </div>
                                        <div className="feature-item">
                                            <SettingOutlined className="feature-icon" />
                                            <Text>600W Program Power Handling</Text>
                                        </div>
                                        <div className="feature-item">
                                            <SafetyOutlined className="feature-icon" />
                                            <Text>Ball Impact Proof Construction</Text>
                                        </div>
                                        <div className="feature-item">
                                            <GiftOutlined className="feature-icon" />
                                            <Text>5-Year Manufacturer Warranty</Text>
                                        </div>
                                    </Space>
                                </div>

                                <div className="purchase-section">
                                    <div className="quantity-selector">
                                        <Text strong>Quantity:</Text>
                                        <InputNumber
                                            min={1}
                                            max={productData.stockCount}
                                            value={quantity}
                                            onChange={value => setQuantity(value ?? 1)}
                                            className="quantity-input"
                                        />
                                    </div>

                                    <Space
                                        direction="vertical"
                                        size="middle"
                                        className="action-buttons"
                                    >
                                        <Button
                                            type="primary"
                                            size="large"
                                            icon={<ShoppingCartOutlined />}
                                            onClick={handleAddToCart}
                                            className="add-to-cart-btn"
                                            block
                                        >
                                            Add to Cart - $
                                            {(productData.price * quantity).toFixed(2)}
                                        </Button>

                                        <Space className="secondary-actions">
                                            <Button
                                                icon={<HeartOutlined />}
                                                onClick={handleAddToWishlist}
                                                className={wishlist ? 'wishlist-active' : ''}
                                            >
                                                {wishlist ? 'In Wishlist' : 'Add to Wishlist'}
                                            </Button>
                                            <Button
                                                icon={<ShareAltOutlined />}
                                                onClick={handleShare}
                                            >
                                                Share
                                            </Button>
                                        </Space>
                                    </Space>

                                    <div className="trust-signals">
                                        <Space direction="vertical" size="small">
                                            <div className="trust-item">
                                                <CheckCircleOutlined className="trust-icon" />
                                                <Text>✓ {productData.warranty}</Text>
                                            </div>
                                            <div className="trust-item">
                                                <CustomerServiceOutlined className="trust-icon" />
                                                <Text>✓ Free Expert Technical Support</Text>
                                            </div>
                                            <div className="trust-item">
                                                <TruckOutlined className="trust-icon" />
                                                <Text>✓ Free Shipping on Orders Over $500</Text>
                                            </div>
                                        </Space>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Interactive Dispersion Showcase */}
            <section className="dispersion-showcase">
                <div className="container">
                    <Title level={2} className="section-title">
                        Variable Dispersion Technology
                    </Title>
                    <Paragraph className="section-description">
                        Experience the power of on-site adjustable dispersion. Select an angle to
                        see how it affects performance characteristics and ideal applications.
                    </Paragraph>

                    <Row gutter={[48, 32]} align="middle">
                        <Col xs={24} lg={12}>
                            <div className="dispersion-visualizer">
                                <div className="angle-selector">
                                    {Object.entries(productData.dispersionConfigs).map(
                                        ([angle, config]) => (
                                            <Button
                                                key={angle}
                                                type={
                                                    selectedDispersion === parseInt(angle)
                                                        ? 'primary'
                                                        : 'default'
                                                }
                                                onClick={() =>
                                                    setSelectedDispersion(parseInt(angle))
                                                }
                                                className="angle-button"
                                            >
                                                {config.angle}
                                            </Button>
                                        ),
                                    )}
                                </div>

                                <div className="speaker-visualization">
                                    <div className="speaker-graphic">
                                        <div className="speaker-body">
                                            <div className="speaker-driver"></div>
                                            <div className="speaker-tweeter"></div>
                                        </div>
                                        <div
                                            className={`dispersion-pattern pattern-${selectedDispersion}`}
                                            style={{
                                                transform: `rotate(${selectedDispersion === 15 ? -7.5 : selectedDispersion === 30 ? -15 : selectedDispersion === 45 ? -22.5 : -30}deg)`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} lg={12}>
                            <div className="dispersion-info">
                                <Title level={3}>
                                    {
                                        productData.dispersionConfigs[
                                            selectedDispersion as keyof typeof productData.dispersionConfigs
                                        ].angle
                                    }{' '}
                                    Mode
                                </Title>
                                <Text className="dispersion-description">
                                    {
                                        productData.dispersionConfigs[
                                            selectedDispersion as keyof typeof productData.dispersionConfigs
                                        ].description
                                    }
                                </Text>

                                <div className="dynamic-specs">
                                    <Card size="small" className="spec-card">
                                        <Statistic
                                            title="Sensitivity (1W, 1m)"
                                            value={
                                                productData.dispersionConfigs[
                                                    selectedDispersion as keyof typeof productData.dispersionConfigs
                                                ].sensitivity
                                            }
                                            suffix="dB"
                                        />
                                    </Card>
                                    <Card size="small" className="spec-card">
                                        <Statistic
                                            title="Frequency Response"
                                            value={
                                                productData.dispersionConfigs[
                                                    selectedDispersion as keyof typeof productData.dispersionConfigs
                                                ].frequencyResponse
                                            }
                                        />
                                    </Card>
                                </div>

                                <div className="use-case">
                                    <Title level={5}>Ideal For:</Title>
                                    <Text>
                                        {
                                            productData.dispersionConfigs[
                                                selectedDispersion as keyof typeof productData.dispersionConfigs
                                            ].useCase
                                        }
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Technical Specifications */}
            <section className="specifications-section">
                <div className="container">
                    <div className="spec-header">
                        <Title level={2} className="section-title">
                            Technical Specifications
                        </Title>
                        <Paragraph className="section-description">
                            Comprehensive technical details and performance characteristics
                        </Paragraph>
                    </div>

                    <div className="spec-actions">
                        <Button
                            icon={<DownloadOutlined />}
                            type="primary"
                            size="large"
                            className="download-spec-btn"
                        >
                            Download Full Spec Sheet (PDF)
                        </Button>
                    </div>

                    <div className="spec-tabs-container">
                        <Tabs
                            defaultActiveKey="performance"
                            className="spec-tabs"
                            size="large"
                            tabPosition="top"
                            items={Object.entries(productData.specifications).map(
                                ([category, specs]) => ({
                                    key: category,
                                    label: (
                                        <span className="tab-label">
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </span>
                                    ),
                                    children: (
                                        <div className="spec-content">
                                            <Table
                                                dataSource={specs}
                                                pagination={false}
                                                showHeader={false}
                                                className="spec-table"
                                                rowKey="key"
                                                size="middle"
                                            >
                                                <Table.Column
                                                    dataIndex="key"
                                                    className="spec-key"
                                                    width="40%"
                                                />
                                                <Table.Column
                                                    dataIndex="value"
                                                    className="spec-value"
                                                    width="60%"
                                                />
                                            </Table>
                                        </div>
                                    ),
                                }),
                            )}
                        />
                    </div>
                </div>
            </section>

            {/* Applications Gallery */}
            <section className="applications-section">
                <div className="container">
                    <Title level={2} className="section-title">
                        Applications in Action
                    </Title>
                    <Paragraph className="section-description">
                        See how the TOA HX-5B performs in real-world professional audio
                        environments.
                    </Paragraph>

                    <Row gutter={[24, 24]}>
                        {productData.applications.map(app => (
                            <Col xs={24} sm={12} lg={6} key={app.id}>
                                <Card
                                    hoverable
                                    cover={
                                        <Image
                                            src={app.image}
                                            alt={app.title}
                                            className="application-image"
                                            preview={{
                                                mask: (
                                                    <div className="application-mask">
                                                        <InfoCircleOutlined />
                                                        <span>View Details</span>
                                                    </div>
                                                ),
                                            }}
                                        />
                                    }
                                    className="application-card"
                                >
                                    <Card.Meta title={app.title} description={app.description} />
                                    <div className="application-features">
                                        {app.features.map((feature, index) => (
                                            <Tag key={index} color="blue" className="feature-tag">
                                                {feature}
                                            </Tag>
                                        ))}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* System Builder */}
            <section className="system-builder-section">
                <div className="container">
                    <Title level={2} className="section-title">
                        Complete Your HX-5B System
                    </Title>
                    <Paragraph className="section-description">
                        Build a complete professional audio solution with compatible accessories and
                        mounting hardware.
                    </Paragraph>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                            <div className="accessories-grid">
                                {productData.accessories.map(accessory => (
                                    <Card
                                        key={accessory.id}
                                        hoverable
                                        className={`accessory-card ${accessory.recommended ? 'recommended' : ''}`}
                                    >
                                        {accessory.recommended && (
                                            <Badge.Ribbon text="Recommended" color="green" />
                                        )}
                                        <div className="accessory-content">
                                            <Image
                                                src={accessory.image}
                                                alt={accessory.name}
                                                className="accessory-image"
                                            />
                                            <div className="accessory-info">
                                                <Title level={5}>{accessory.name}</Title>
                                                <Text className="accessory-price">
                                                    ${accessory.price.toFixed(2)}
                                                </Text>
                                                <Text className="accessory-description">
                                                    {accessory.description}
                                                </Text>
                                                <Checkbox
                                                    checked={selectedAccessories.includes(
                                                        accessory.id,
                                                    )}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            setSelectedAccessories([
                                                                ...selectedAccessories,
                                                                accessory.id,
                                                            ]);
                                                        } else {
                                                            setSelectedAccessories(
                                                                selectedAccessories.filter(
                                                                    id => id !== accessory.id,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Add to System
                                                </Checkbox>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </Col>

                        <Col xs={24} lg={8}>
                            <Card className="system-summary">
                                <Title level={4}>System Summary</Title>
                                <div className="summary-items">
                                    <div className="summary-item">
                                        <Text>TOA HX-5B (x{quantity})</Text>
                                        <Text>${(productData.price * quantity).toFixed(2)}</Text>
                                    </div>
                                    {selectedAccessories.map(accessoryId => {
                                        const accessory = productData.accessories.find(
                                            acc => acc.id === accessoryId,
                                        );
                                        return accessory ? (
                                            <div key={accessoryId} className="summary-item">
                                                <Text>{accessory.name}</Text>
                                                <Text>${accessory.price.toFixed(2)}</Text>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                                <Divider />
                                <div className="total-section">
                                    <div className="total-item">
                                        <Text strong>Total:</Text>
                                        <Text strong className="total-price">
                                            ${calculateTotal().toFixed(2)}
                                        </Text>
                                    </div>
                                </div>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<ShoppingCartOutlined />}
                                    block
                                    className="add-system-btn"
                                >
                                    Add Complete System to Cart
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Reviews and Q&A */}
            <section className="reviews-qa-section">
                <div className="container">
                    {/* Section Header */}
                    <div className="section-header">
                        <Title level={2} className="section-title">
                            Customer Reviews & Q&A
                        </Title>
                        <Text className="section-subtitle">
                            Real feedback from our customers and expert answers to common questions
                        </Text>
                    </div>

                    <Row gutter={[48, 48]}>
                        {/* Reviews Section */}
                        <Col xs={24} lg={14}>
                            <div className="reviews-section">
                                <div className="reviews-header">
                                    <div className="reviews-title-group">
                                        <Title level={3} className="reviews-title">
                                            Customer Reviews
                                        </Title>
                                        <div className="review-stats">
                                            <div className="rating-display">
                                                <div className="rating-number">
                                                    {productData.rating}
                                                </div>
                                                <div className="rating-stars">
                                                    <Rate
                                                        disabled
                                                        defaultValue={productData.rating}
                                                    />
                                                </div>
                                                <div className="rating-count">
                                                    Based on {productData.reviewCount} reviews
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="review-filters">
                                        <Select
                                            defaultValue="all"
                                            style={{ width: 120 }}
                                            options={[
                                                { value: 'all', label: 'All Stars' },
                                                { value: '5', label: '5 Stars' },
                                                { value: '4', label: '4 Stars' },
                                                { value: '3', label: '3 Stars' },
                                                { value: '2', label: '2 Stars' },
                                                { value: '1', label: '1 Star' },
                                            ]}
                                        />
                                        <Select
                                            defaultValue="newest"
                                            style={{ width: 120 }}
                                            options={[
                                                { value: 'newest', label: 'Newest' },
                                                { value: 'oldest', label: 'Oldest' },
                                                { value: 'highest', label: 'Highest Rated' },
                                                { value: 'lowest', label: 'Lowest Rated' },
                                            ]}
                                        />
                                    </div>
                                </div>

                                {/* Rating Breakdown */}
                                <div className="rating-breakdown">
                                    {[5, 4, 3, 2, 1].map(star => (
                                        <div key={star} className="rating-bar">
                                            <Text className="star-label">{star} star</Text>
                                            <Progress
                                                percent={Math.random() * 100}
                                                strokeColor="#3b82f6"
                                                showInfo={false}
                                                className="rating-progress"
                                            />
                                            <Text className="star-count">
                                                {Math.floor(Math.random() * 50)}
                                            </Text>
                                        </div>
                                    ))}
                                </div>

                                {/* Reviews List */}
                                <div className="reviews-list">
                                    {productData.reviews.map(review => (
                                        <Card key={review.id} className="review-card">
                                            <div className="review-card-header">
                                                <div className="reviewer-info">
                                                    <Avatar
                                                        size={40}
                                                        style={{
                                                            backgroundColor: '#3b82f6',
                                                            color: '#ffffff',
                                                        }}
                                                    >
                                                        {review.user.charAt(0)}
                                                    </Avatar>
                                                    <div className="reviewer-details">
                                                        <div className="reviewer-name">
                                                            <Text strong>{review.user}</Text>
                                                            {review.verified && (
                                                                <Tag
                                                                    color="green"
                                                                    className="verified-tag"
                                                                >
                                                                    <CheckCircleOutlined /> Verified
                                                                </Tag>
                                                            )}
                                                        </div>
                                                        <div className="review-rating">
                                                            <Rate
                                                                disabled
                                                                defaultValue={review.rating}
                                                            />
                                                            <Text
                                                                type="secondary"
                                                                className="review-date"
                                                            >
                                                                {review.date}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="review-actions">
                                                    <Button
                                                        type="text"
                                                        icon={<ShareAltOutlined />}
                                                    />
                                                    <Button type="text" icon={<MoreOutlined />} />
                                                </div>
                                            </div>

                                            <div className="review-content">
                                                <Title level={5} className="review-title">
                                                    {review.title}
                                                </Title>
                                                <Paragraph className="review-text">
                                                    {review.content}
                                                </Paragraph>

                                                {review.images && review.images.length > 0 && (
                                                    <div className="review-images">
                                                        {review.images.map((img, index) => (
                                                            <Image
                                                                key={index}
                                                                src={img}
                                                                alt={`Review image ${index + 1}`}
                                                                className="review-image"
                                                                preview
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="review-footer">
                                                <div className="review-helpful">
                                                    <Button
                                                        type="text"
                                                        icon={<LikeOutlined />}
                                                        className="helpful-btn"
                                                    >
                                                        Helpful ({review.helpful})
                                                    </Button>
                                                </div>
                                                <div className="review-response">
                                                    <Button type="link" size="small">
                                                        Reply
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                <div className="reviews-pagination">
                                    <Button type="primary" size="large" block>
                                        Load More Reviews
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        {/* Q&A Section */}
                        <Col xs={24} lg={10}>
                            <div className="qa-section">
                                <div className="qa-header">
                                    <div className="qa-title-group">
                                        <Title level={3} className="qa-title">
                                            Questions & Answers
                                        </Title>
                                        <Text className="qa-subtitle">
                                            {productData.qa.length} questions answered
                                        </Text>
                                    </div>
                                    <Button
                                        type="primary"
                                        icon={<QuestionCircleOutlined />}
                                        onClick={() => setQaModalVisible(true)}
                                        className="ask-question-btn"
                                    >
                                        Ask a Question
                                    </Button>
                                </div>

                                <div className="qa-search">
                                    <Input
                                        placeholder="Search questions..."
                                        prefix={<SearchOutlined />}
                                        className="qa-search-input"
                                    />
                                </div>

                                <div className="qa-list">
                                    {productData.qa.map(qa => (
                                        <Card key={qa.id} className="qa-card">
                                            <div className="qa-question">
                                                <div className="qa-question-header">
                                                    <Text strong className="qa-question-text">
                                                        {qa.question}
                                                    </Text>
                                                    <div className="qa-question-meta">
                                                        <Tag
                                                            color="blue"
                                                            className="qa-answered-by"
                                                        >
                                                            {qa.answeredBy}
                                                        </Tag>
                                                        <Text type="secondary" className="qa-date">
                                                            {qa.date}
                                                        </Text>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="qa-answer">
                                                <div className="qa-answer-header">
                                                    <Text strong className="qa-answer-label">
                                                        Answer:
                                                    </Text>
                                                </div>
                                                <Paragraph className="qa-answer-text">
                                                    {qa.answer}
                                                </Paragraph>
                                                <div className="qa-answer-footer">
                                                    <Button
                                                        type="text"
                                                        icon={<LikeOutlined />}
                                                        className="qa-helpful-btn"
                                                    >
                                                        Helpful ({qa.helpful})
                                                    </Button>
                                                    <Button type="link" size="small">
                                                        Follow up
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                <div className="qa-footer">
                                    <Button type="primary" ghost size="large" block>
                                        View All Questions
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Resource Hub */}
            <section className="resource-hub-section">
                <div className="container">
                    <Title level={2} className="section-title">
                        Resources & Support
                    </Title>
                    <Paragraph className="section-description">
                        Download technical documentation, CAD files, and access expert support.
                    </Paragraph>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                            <Card title="Downloads" className="downloads-card">
                                <List
                                    dataSource={productData.resources}
                                    renderItem={resource => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    key="download"
                                                    type="link"
                                                    icon={<DownloadOutlined />}
                                                    href={resource.url}
                                                    download
                                                >
                                                    Download
                                                </Button>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={resource.icon}
                                                title={resource.title}
                                                description={`${resource.type} • ${resource.size}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>

                        <Col xs={24} lg={8}>
                            <Card title="Support" className="support-card">
                                <Space
                                    direction="vertical"
                                    size="middle"
                                    className="support-options"
                                >
                                    <div className="support-item">
                                        <CustomerServiceOutlined className="support-icon" />
                                        <div>
                                            <Text strong>Technical Support</Text>
                                            <br />
                                            <Text type="secondary">Free expert consultation</Text>
                                        </div>
                                    </div>
                                    <div className="support-item">
                                        <SafetyOutlined className="support-icon" />
                                        <div>
                                            <Text strong>Warranty Service</Text>
                                            <br />
                                            <Text type="secondary">
                                                5-year manufacturer warranty
                                            </Text>
                                        </div>
                                    </div>
                                    <div className="support-item">
                                        <TruckOutlined className="support-icon" />
                                        <div>
                                            <Text strong>Installation Support</Text>
                                            <br />
                                            <Text type="secondary">
                                                Professional installation guidance
                                            </Text>
                                        </div>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Q&A Modal */}
            <Modal
                title="Ask a Question"
                open={qaModalVisible}
                onCancel={() => setQaModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setQaModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmitQuestion}>
                        Submit Question
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Your Question" required>
                        <TextArea
                            rows={4}
                            value={newQuestion}
                            onChange={e => setNewQuestion(e.target.value)}
                            placeholder="Ask a specific question about this product..."
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductDetail;
