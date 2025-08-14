// Import Swiper React components
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button, Col, Row, Typography } from 'antd';

import Card from '@/components/common/Card/index.tsx';
import {
    AudioOutlined,
    CheckCircleOutlined,
    PlayCircleOutlined,
    SettingOutlined,
    StarOutlined,
    TeamOutlined,
    TrophyOutlined,
} from '@ant-design/icons';

import './landing.scss';

const { Title, Paragraph, Text } = Typography;

const Index = () => {
    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    const products = [
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

    return (
        <>
            {/* Hero Section */}
            <section className="section-1">
                <div className="container h-100">
                    <Row
                        className="h-100"
                        justify="center"
                        align="middle"
                        style={{ textAlign: 'center' }}
                    >
                        <Col span={24}>
                            <Title level={1} className="section-1__title text-white">
                                Professional Speaker Manufacturer <br />
                                and Distributor in India
                            </Title>
                            <Paragraph className="section-1__description text-white">
                                Best Line Array for Your Best Business & Events
                            </Paragraph>
                            <div
                                className="d-flex items-center justify-center gap-4"
                                style={{ marginTop: '2rem' }}
                            >
                                <Button
                                    className="section-1__get-started"
                                    type="primary"
                                    size="large"
                                    icon={<PlayCircleOutlined />}
                                >
                                    Get Started
                                </Button>
                                <Button
                                    className="section-1__learn-more"
                                    size="large"
                                    icon={<StarOutlined />}
                                >
                                    Learn More
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* About Section */}
            <section className="section-2 about-section">
                <div className="container">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} md={10}>
                            <div className="about-section__intro">
                                <Text
                                    strong
                                    className="text-success"
                                    style={{
                                        fontSize: '16px',
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Who We Are
                                </Text>
                                <Title level={2} className="mt-3 text-primary">
                                    Our Highest Ambition is to Help People
                                </Title>
                            </div>
                        </Col>
                        <Col xs={24} md={14}>
                            <div className="about-section__content">
                                <Title level={4} className="text-primary mb-4">
                                    Model Box Speaker Line Array - Factory, Suppliers, Manufacturers
                                    from India
                                </Title>
                                <Paragraph
                                    className="text-secondary"
                                    style={{ fontSize: '16px', lineHeight: '1.8' }}
                                >
                                    The client satisfaction is our primary concentrate on. We uphold
                                    a consistent level of professionalism, top quality, credibility
                                    and service for Model Box Speaker Line Array, Line Array
                                    Speakers Oem, Odm Active Speaker, Active Speaker
                                    Amplifier,Portable Line Array Speakers. We focus on providing
                                    service for our clients as a key element in strengthening our
                                    long-term relationships. Our continual availability of high
                                    grade products in combination with our excellent pre-sale and
                                    after-sales service ensures strong competitiveness in an
                                    increasingly globalized market.
                                </Paragraph>
                                <div className="d-flex items-center gap-3 mt-6">
                                    <Button type="primary" icon={<CheckCircleOutlined />}>
                                        View Products
                                    </Button>
                                    <Button className="about-section__content__contact_us">
                                        Contact Us
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-us-section">
                <div className="container">
                    <Row gutter={[48, 48]}>
                        <Col xs={24} lg={12}>
                            <Title level={2} className="mb-8 text-primary">
                                Why Choose Yashvi Audio?
                            </Title>
                            <div className="features-list">
                                <div className="feature-item">
                                    <div className="feature-item__icon">
                                        <TrophyOutlined />
                                    </div>
                                    <div className="feature-item__content">
                                        <Title level={4} className="m-0 mb-1 text-primary">
                                            Professional Quality
                                        </Title>
                                        <Paragraph className="m-0 text-secondary">
                                            Industry-leading audio equipment designed for
                                            professional applications.
                                        </Paragraph>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-item__icon">
                                        <TeamOutlined />
                                    </div>
                                    <div className="feature-item__content">
                                        <Title level={4} className="m-0 mb-1 text-primary">
                                            Expert Support
                                        </Title>
                                        <Paragraph className="m-0 text-secondary">
                                            Dedicated technical support and installation services.
                                        </Paragraph>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-item__icon">
                                        <SettingOutlined />
                                    </div>
                                    <div className="feature-item__content">
                                        <Title level={4} className="m-0 mb-1 text-primary">
                                            Custom Solutions
                                        </Title>
                                        <Paragraph className="m-0 text-secondary">
                                            Tailored audio solutions for your specific requirements.
                                        </Paragraph>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={12}>
                            <div className="why-choose-us-section__image-container">
                                <img src="/images/section_1_bg.png" alt="Audio Equipment" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Products Section */}
            <section className="section-5">
                <div className="container">
                    <Card>
                        <Row justify="center" className="mb-12">
                            <Col xs={24} md={16} lg={12}>
                                <Title level={2} className="text-center mb-4">
                                    Our Premium Products
                                </Title>
                                <Paragraph
                                    className="text-center text-secondary"
                                    style={{ fontSize: '18px' }}
                                >
                                    Discover our range of professional audio equipment designed for
                                    exceptional performance
                                </Paragraph>
                            </Col>
                        </Row>

                        <Swiper
                            modules={[Pagination, Autoplay]}
                            pagination={pagination}
                            loop={true}
                            navigation={true}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            spaceBetween={30}
                            slidesPerView={1}
                            respond-tos={{
                                576: { slidesPerView: 1, spaceBetween: 20 },
                                768: { slidesPerView: 2, spaceBetween: 30 },
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                                1200: { slidesPerView: 4, spaceBetween: 30 },
                            }}
                        >
                            {products.map(product => (
                                <SwiperSlide key={product.id}>
                                    <div className="product-card">
                                        <div className="product-card__image-container">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="product-card__image"
                                            />
                                        </div>
                                        <div className="product-card__content">
                                            <div className="d-flex items-center mb-3">
                                                <span
                                                    className="text-primary mr-2"
                                                    style={{ fontSize: '18px' }}
                                                >
                                                    {product.icon}
                                                </span>
                                                <Title
                                                    level={4}
                                                    className="product-card__title"
                                                    style={{ margin: 0 }}
                                                >
                                                    {product.title}
                                                </Title>
                                            </div>
                                            <ul className="product-card__features">
                                                {product.features.map((feature, index) => (
                                                    <li key={index}>{feature}</li>
                                                ))}
                                            </ul>
                                            <Button type="primary" block className="mt-auto">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default Index;
