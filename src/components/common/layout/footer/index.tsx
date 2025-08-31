import { Divider, Layout, Typography } from 'antd';

import { APP_DESCRIPTION, APP_NAME } from '@/utills/constants';
import { Logo } from '@/utills/icon';
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

// Address History Interface
// interface AddressEntry {
//     dateFrom: string;
//     dateTo: string;
//     address: string[];
// }

// // Sample Address History Data
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const addressHistory: AddressEntry[] = [
//     {
//         dateFrom: '14/02/2024',
//         dateTo: 'Present',
//         address: ['42 Strelden Ave, Oakleigh East, 3166, VIC, Australia'],
//     },
//     {
//         dateFrom: '16/05/2023',
//         dateTo: '13/02/2024',
//         address: ['20 Browns Ct, Clayton, 3168, VIC, Australia'],
//     },
//     {
//         dateFrom: '20/01/2008',
//         dateTo: '15/02/2023',
//         address: ['34, OLD GAMTAL AT SANDHAVAYA, TA KOTDA SANGANI, RAJKOT, GUJARAT,INDIA'],
//     },
// ];

const PageFooter = () => {
    return (
        <Footer className="page-footer">
            <div className="container">
                <div className="d-grid md:grid-cols-3 gap-8">
                    {/* Column 1: Brand and Contact Info */}
                    <div className="d-flex flex-column gap-4">
                        <Logo
                            variant="image"
                            className="footer-logo"
                            width={150}
                            height={60}
                            showBackground={true}
                            backgroundVariant="accent"
                        />
                        <Text>{APP_DESCRIPTION}</Text>
                        <div className="d-flex flex-column gap-2 mar-top-4">
                            <Link
                                href="tel:+1234567890"
                                className="footer-link d-flex items-center gap-2"
                            >
                                <PhoneOutlined />
                                <span className="mar-left-2">+1 (234) 567-890</span>
                            </Link>
                            <Link
                                href="mailto:info@yashviaudio.com"
                                className="footer-link d-flex items-center gap-2"
                            >
                                <MailOutlined />
                                <span className="mar-left-2">info@outburstacoustic.com</span>
                            </Link>
                            <div className="footer-link d-flex items-center gap-2">
                                <EnvironmentOutlined style={{ fontSize: '1.2rem' }} />
                                <span className="mar-left-2">
                                    Unit 38, 25-37 Huntingdale Rd, Burwood, VIC 3125
                                </span>
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
                    <Text>
                        © {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
                    </Text>
                </div>
            </div>
        </Footer>
    );
};

export default PageFooter;
