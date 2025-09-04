import type React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Space, Typography } from 'antd';

import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';

import ProductDetail from './ProductDetail';
import './ProductDetail.scss';

const { Title, Paragraph } = Typography;

const ProductDetailDemo: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="product-detail-demo">
            <div className="demo-header">
                <div className="container">
                    <Space align="center" className="demo-controls">
                        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
                            Back
                        </Button>
                        <div className="demo-info">
                            <Title level={4} className="demo-title">
                                <EyeOutlined /> Product Detail Page Demo
                            </Title>
                            <Paragraph className="demo-description">
                                Interactive product page for TOA HX-5B Variable Dispersion Line
                                Array Speaker
                            </Paragraph>
                        </div>
                    </Space>
                </div>
            </div>

            <ProductDetail />
        </div>
    );
};

export default ProductDetailDemo;
