import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type React from 'react';

import { Col, Row, Typography } from 'antd';

import Card from '@/components/common/Card/index.tsx';

import type { ProductsSectionProps, SwiperPagination } from '../../types/landing.types';
import ProductCard from '../ProductCard';
import './ProductsSection.scss';

const { Title, Paragraph } = Typography;

/**
 * ProductsSection Component
 *
 * Social Proof section showcasing premium products
 * CRO optimized with interactive carousel and clear CTAs
 */
const ProductsSection: React.FC<ProductsSectionProps> = ({ products, onViewDetails }) => {
    const pagination: SwiperPagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <section className="products-section">
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
                        loop={false}
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
                                <ProductCard product={product} onViewDetails={onViewDetails} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Card>
            </div>
        </section>
    );
};

export default ProductsSection;
