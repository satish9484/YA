// Import Swiper React components
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button, Col, Row, Space, Typography } from 'antd';

import Card from '@/components/common/Card/index.tsx';
import {
    AudioOutlined,
    CheckCircleOutlined,
    PlayCircleOutlined,
    SettingOutlined,
    StarOutlined,
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
        <Card>
            {/* Hero Section */}
            <section className="section-1">
                <div className="container h-100 flex-column gap-20 d-flex-center-center">
                    <Title level={1} className="section-1__title">
                        Professional Speaker Manufacturer <br />
                        and Distributor in India
                    </Title>
                    <Paragraph className="section-1__description">
                        Best Line Array for Your Best Business & Events
                    </Paragraph>
                    <Space size="large">
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlayCircleOutlined />}
                            className="btn-lets-go"
                        >
                            Get Started
                        </Button>
                        <Button
                            size="large"
                            icon={<StarOutlined />}
                            style={{
                                borderColor: '#fff',
                                color: '#fff',
                                background: 'rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            Learn More
                        </Button>
                    </Space>
                </div>
            </section>

            {/* About Section */}
            <section className="section-2">
                <div className="container container-section-2 h-100 d-flex align-items-center">
                    <Row gutter={[48, 32]} align="middle">
                        <Col xs={24} md={12}>
                            <div className="sectin-2-left w-100 d-flex flex-column">
                                <Text
                                    strong
                                    className="text-success"
                                    style={{ fontSize: '16px', letterSpacing: '0.15em' }}
                                >
                                    WHO WE ARE
                                </Text>
                                <Title level={2} className="sectin-2-left-h2">
                                    Our Highest Ambition
                                    <br />
                                    is to Help People
                                </Title>
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <div className="sectin-2-right w-100 flex-column justify-content-center gap-35">
                                <Title level={4}>
                                    Model Box Speaker Line Array - Factory, Suppliers, Manufacturers
                                    from India
                                </Title>
                                <Paragraph
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: '30px',
                                        color: '#4f4f4f',
                                    }}
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
                                <Space size="middle">
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<CheckCircleOutlined />}
                                    >
                                        View Products
                                    </Button>
                                    <Button size="large">Contact Us</Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Products Section */}
            <section className="section-5">
                <div className="container">
                    <Row justify="center" style={{ marginBottom: '48px' }}>
                        <Col xs={24} md={16} lg={12}>
                            <Title level={2} style={{ textAlign: 'center', marginBottom: '16px' }}>
                                Our Premium Products
                            </Title>
                            <Paragraph
                                style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}
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
                        breakpoints={{
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
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '12px',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginRight: '8px',
                                                    color: '#1890ff',
                                                    fontSize: '18px',
                                                }}
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
                                        <Button
                                            type="primary"
                                            block
                                            className="product-card__cta"
                                            size="large"
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
                <div className="container">
                    <Row gutter={[48, 32]} align="middle">
                        <Col xs={24} lg={12}>
                            <Title level={2} style={{ marginBottom: '24px' }}>
                                Why Choose Yashvi Audio?
                            </Title>
                            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <CheckCircleOutlined
                                        style={{
                                            fontSize: '24px',
                                            color: '#52c41a',
                                            marginRight: '16px',
                                            marginTop: '4px',
                                        }}
                                    />
                                    <div>
                                        <Title level={5} style={{ margin: 0, marginBottom: '8px' }}>
                                            Professional Quality
                                        </Title>
                                        <Paragraph style={{ margin: 0, color: '#666' }}>
                                            Industry-leading audio equipment designed for
                                            professional applications
                                        </Paragraph>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <CheckCircleOutlined
                                        style={{
                                            fontSize: '24px',
                                            color: '#52c41a',
                                            marginRight: '16px',
                                            marginTop: '4px',
                                        }}
                                    />
                                    <div>
                                        <Title level={5} style={{ margin: 0, marginBottom: '8px' }}>
                                            Expert Support
                                        </Title>
                                        <Paragraph style={{ margin: 0, color: '#666' }}>
                                            Dedicated technical support and installation services
                                        </Paragraph>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <CheckCircleOutlined
                                        style={{
                                            fontSize: '24px',
                                            color: '#52c41a',
                                            marginRight: '16px',
                                            marginTop: '4px',
                                        }}
                                    />
                                    <div>
                                        <Title level={5} style={{ margin: 0, marginBottom: '8px' }}>
                                            Custom Solutions
                                        </Title>
                                        <Paragraph style={{ margin: 0, color: '#666' }}>
                                            Tailored audio solutions for your specific requirements
                                        </Paragraph>
                                    </div>
                                </div>
                            </Space>
                        </Col>
                        <Col xs={24} lg={12}>
                            <div style={{ textAlign: 'center' }}>
                                <img
                                    src="/images/section_1_bg.png"
                                    alt="Audio Equipment"
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </Card>
    );
};

export default Index;
