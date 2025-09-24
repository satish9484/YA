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

import styles from './footer.module.scss';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const PageFooter = () => {
    return (
        <Footer className={styles['page-footer']}>
            <div className={styles.container}>
                <div className={styles['footer-grid']}>
                    {/* Column 1: Brand and Contact Info */}
                    <div className={styles['footer-column']}>
                        <Logo
                            variant="image"
                            className={styles['footer-logo']}
                            width={150}
                            height={60}
                            showBackground={true}
                        />
                        <Text className={styles['footer-description']}>{APP_DESCRIPTION}</Text>
                        <div className={styles['contact-info']}>
                            <Link href="tel:+1234567890" className={styles['footer-link']}>
                                <PhoneOutlined />
                                <span>+1 (234) 567-890</span>
                            </Link>
                            <Link
                                href="mailto:info@yashviaudio.com"
                                className={styles['footer-link']}
                            >
                                <MailOutlined />
                                <span>info@outburstacoustic.com</span>
                            </Link>
                            <div className={styles['contact-info-item']}>
                                <EnvironmentOutlined style={{ fontSize: '1.2rem' }} />
                                <span>Unit 38, 25-37 Huntingdale Rd, Burwood, VIC 3125</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className={styles['footer-column']}>
                        <Title level={4} className={styles['footer-title']}>
                            Quick Links
                        </Title>
                        <div className={styles['quick-links']}>
                            <Link href="/" className={styles['footer-link']}>
                                <HomeOutlined />
                                <span>Home</span>
                            </Link>
                            <Link href="/about" className={styles['footer-link']}>
                                <QuestionCircleOutlined />
                                <span>About Us</span>
                            </Link>
                            <Link href="/terms" className={styles['footer-link']}>
                                <FileTextOutlined />
                                <span>Terms of Service</span>
                            </Link>
                            <Link href="/privacy" className={styles['footer-link']}>
                                <SafetyCertificateOutlined />
                                <span>Privacy Policy</span>
                            </Link>
                            <Link href="/contact" className={styles['footer-link']}>
                                <MessageOutlined />
                                <span>Contact</span>
                            </Link>
                        </div>
                    </div>

                    {/* Column 3: Follow Us */}
                    <div className={styles['footer-column']}>
                        <Title level={4} className={styles['footer-title']}>
                            Follow Us
                        </Title>
                        <div className={styles['social-links']}>
                            <Link href="#" target="_blank" className={styles['social-icon']}>
                                <FacebookOutlined />
                            </Link>
                            <Link href="#" target="_blank" className={styles['social-icon']}>
                                <InstagramOutlined />
                            </Link>
                            <Link href="#" target="_blank" className={styles['social-icon']}>
                                <TwitterOutlined />
                            </Link>
                        </div>
                    </div>
                </div>

                <Divider className={styles['footer-divider']} />
                <div className={styles['footer-bottom']}>
                    <Text>
                        © {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
                    </Text>
                </div>
            </div>
        </Footer>
    );
};

export default PageFooter;
