import { Layout } from 'antd';

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

const PageFooter = () => {
    return (
        <Footer>
            <div className="footer-part-1 w-100 d-flex-center-center">
                <div className="container">
                    <div className="footer-grid">
                        {/* Contact Section */}
                        <div className="d-flex flex-column align-items-start gap-20">
                            <figure className="footer-img">
                                <img src="./logo/YA-logo.PNG" alt="Yashvi Audio Logo" />
                            </figure>
                            <div className="contact-info">
                                <h3>
                                    Have other questions? <br />
                                    Email Us At <br />
                                    <span>
                                        <MailOutlined style={{ marginRight: '8px' }} />
                                        outburst@auduio.com.au
                                    </span>
                                </h3>
                                <div className="contact-details">
                                    <p>
                                        <PhoneOutlined style={{ marginRight: '8px' }} />
                                        +61 123 456 789
                                    </p>
                                    <p>
                                        <EnvironmentOutlined style={{ marginRight: '8px' }} />
                                        Sydney, Australia
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Links Section */}
                        <div className="footer-links w-100">
                            <div className="footer-menu-grid">
                                {/* Menu Section */}
                                <div className="d-flex flex-column gap-40">
                                    <h2 className="footer-heading-font">
                                        <HomeOutlined style={{ marginRight: '8px' }} />
                                        MENU
                                    </h2>
                                    <div className="d-flex flex-column align-content-between flex-wrap gap-20">
                                        <a
                                            href="/line-array"
                                            className="menu-links"
                                            aria-label="Line Array Products"
                                        >
                                            Line Array
                                        </a>
                                        <a
                                            href="/professional-speaker"
                                            className="menu-links"
                                            aria-label="Professional Speaker Products"
                                        >
                                            Professional Speaker
                                        </a>
                                        <a
                                            href="/stage-monitor"
                                            className="menu-links"
                                            aria-label="Stage Monitor Products"
                                        >
                                            Stage Monitor
                                        </a>
                                        <a
                                            href="/packaging-shipping"
                                            className="menu-links"
                                            aria-label="Packaging and Shipping Services"
                                        >
                                            Packaging and Shipping
                                        </a>
                                        <a
                                            href="/about"
                                            className="menu-links"
                                            aria-label="About Us"
                                        >
                                            About
                                        </a>
                                        <a
                                            href="/contact"
                                            className="menu-links"
                                            aria-label="Contact Us"
                                        >
                                            Contact Us
                                        </a>
                                    </div>
                                </div>

                                {/* Support Section */}
                                <div className="d-flex flex-column gap-40">
                                    <h2 className="footer-heading-font">
                                        <SafetyCertificateOutlined style={{ marginRight: '8px' }} />
                                        Support
                                    </h2>
                                    <div className="d-flex flex-column gap-20">
                                        <a
                                            href="/terms"
                                            className="menu-links"
                                            aria-label="Terms of Use"
                                        >
                                            <FileTextOutlined style={{ marginRight: '8px' }} />
                                            Terms of Use
                                        </a>
                                        <a
                                            href="/faqs"
                                            className="menu-links"
                                            aria-label="Frequently Asked Questions"
                                        >
                                            <QuestionCircleOutlined
                                                style={{ marginRight: '8px' }}
                                            />
                                            FAQ's
                                        </a>
                                        <a
                                            href="/privacy"
                                            className="menu-links"
                                            aria-label="Privacy Policy"
                                        >
                                            <SafetyCertificateOutlined
                                                style={{ marginRight: '8px' }}
                                            />
                                            Privacy Policy
                                        </a>
                                    </div>
                                </div>

                                {/* Social Section */}
                                <div className="d-flex flex-column gap-40">
                                    <h2 className="footer-heading-font">
                                        <MessageOutlined style={{ marginRight: '8px' }} />
                                        SOCIAL
                                    </h2>
                                    <div className="d-flex-center-center flex-column gap-20">
                                        <a
                                            href="https://facebook.com/yashviaudio"
                                            className="social-link"
                                            aria-label="Follow us on Facebook"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FacebookOutlined className="social-icon" />
                                        </a>
                                        <a
                                            href="https://twitter.com/yashviaudio"
                                            className="social-link"
                                            aria-label="Follow us on Twitter"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <TwitterOutlined className="social-icon" />
                                        </a>
                                        <a
                                            href="https://instagram.com/yashviaudio"
                                            className="social-link"
                                            aria-label="Follow us on Instagram"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <InstagramOutlined className="social-icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-part-2 w-100 d-flex-center-center">
                <p>© 2024 Yashvi Audio. All rights reserved.</p>
            </div>

            {/* Mobile Navigation (Optional) */}
            {/* Uncomment to enable mobile navigation */}
            {/*
            <div className="md-container d-flex justify-evenly">
                <div className="d-flex-column-center">
                    <figure className="md-fig-1">
                        <HomeOutlined />
                    </figure>
                    <p className="md-fig-p">Home</p>
                </div>

                <div className="d-flex-column-center">
                    <figure className="md-fig-1">
                        <UserOutlined />
                    </figure>
                    <p className="md-fig-p">Community</p>
                </div>

                <div className="d-flex-column-center">
                    <figure className="md-fig-1">
                        <MessageOutlined />
                    </figure>
                    <p className="md-fig-p">Chat</p>
                </div>

                <div className="d-flex-column-center">
                    <figure className="md-fig-1">
                        <FileTextOutlined />
                    </figure>
                    <p className="md-fig-p">Posts</p>
                </div>

                <div className="d-flex-column-center">
                    <figure className="md-fig-1">
                        <UserOutlined />
                    </figure>
                    <p className="md-fig-p">Profile</p>
                </div>
            </div>
            */}
        </Footer>
    );
};

export default PageFooter;
