import { Divider, Layout, Typography } from 'antd';

import {
    EnvironmentOutlined,
    FacebookOutlined,
    FileTextOutlined,
    HomeOutlined,
    InstagramOutlined,
    MailOutlined,
    MessageOutlined,
    PhoneOutlined,
    QuestionCircleOutlined,
    SafetyCertificateOutlined,
    TwitterOutlined,
} from '@ant-design/icons';

import './footer.scss';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const PageFooter = () => {
    return (
        <Footer className="page-footer">
            <div className="container">
                <div className="d-grid md:grid-cols-3 gap-8">
                    {/* Column 1: Brand and Contact Info */}
                    <div className="d-flex flex-column gap-4">
                        <img
                            src="./logo/YA-logo.PNG"
                            alt="Yashvi Audio Logo"
                            className="footer-logo"
                        />
                        <Text>High-quality audio equipment for professionals and enthusiasts.</Text>
                        <div className="d-flex flex-column gap-2 mar-top-4">
                            <Link href="tel:+1234567890" className="footer-link">
                                <PhoneOutlined />
                                <span className="mar-left-2">+1 (234) 567-890</span>
                            </Link>
                            <Link href="mailto:info@yashviaudio.com" className="footer-link">
                                <MailOutlined />
                                <span className="mar-left-2">info@yashviaudio.com</span>
                            </Link>
                            <div className="footer-link">
                                <EnvironmentOutlined />
                                <span className="mar-left-2">123 Audio Lane, Music City, USA</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="d-flex flex-column gap-4">
                        <Title level={4} className="footer-title">
                            Quick Links
                        </Title>
                        <div className="d-flex flex-column gap-3">
                            <Link href="/" className="footer-link">
                                <HomeOutlined />
                                <span className="mar-left-2">Home</span>
                            </Link>
                            <Link href="/about" className="footer-link">
                                <QuestionCircleOutlined />
                                <span className="mar-left-2">About Us</span>
                            </Link>
                            <Link href="/terms" className="footer-link">
                                <FileTextOutlined />
                                <span className="mar-left-2">Terms of Service</span>
                            </Link>
                            <Link href="/privacy" className="footer-link">
                                <SafetyCertificateOutlined />
                                <span className="mar-left-2">Privacy Policy</span>
                            </Link>
                            <Link href="/contact" className="footer-link">
                                <MessageOutlined />
                                <span className="mar-left-2">Contact</span>
                            </Link>
                        </div>
                    </div>

                    {/* Column 3: Follow Us */}
                    <div className="d-flex flex-column gap-4">
                        <Title level={4} className="footer-title">
                            Follow Us
                        </Title>
                        <div className="d-flex items-center gap-4">
                            <Link href="#" target="_blank" className="social-icon">
                                <FacebookOutlined />
                            </Link>
                            <Link href="#" target="_blank" className="social-icon">
                                <InstagramOutlined />
                            </Link>
                            <Link href="#" target="_blank" className="social-icon">
                                <TwitterOutlined />
                            </Link>
                        </div>
                    </div>
                </div>

                <Divider className="footer-divider" />
                <div className="footer-bottom text-center">
                    <Text>© {new Date().getFullYear()} Yashvi Audio. All Rights Reserved.</Text>
                </div>
            </div>
        </Footer>
    );
};

export default PageFooter;
