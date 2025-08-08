import { useState } from 'react';

import type { MenuProps } from 'antd';
import { Button, Dropdown, Layout, Menu, Typography } from 'antd';

import {
    AppstoreOutlined,
    AudioOutlined,
    DownOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
    HomeOutlined,
    MenuOutlined,
    PhoneOutlined,
    SettingOutlined,
    SoundOutlined,
    TeamOutlined,
    TrophyOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import './header.scss';

const { Header } = Layout;
const { Text } = Typography;

// Product subcategories
const productSubcategories: MenuProps['items'] = [
    {
        key: 'line-array',
        icon: <AudioOutlined />,
        label: (
            <div className="dropdown-item-content">
                <div className="dropdown-item-title">Line Array Systems</div>
                <div className="dropdown-item-desc">
                    Professional line array speakers for large venues
                </div>
            </div>
        ),
    },
    {
        key: 'monitors',
        icon: <SoundOutlined />,
        label: (
            <div className="dropdown-item-content">
                <div className="dropdown-item-title">Stage Monitors</div>
                <div className="dropdown-item-desc">Stage monitoring solutions for performers</div>
            </div>
        ),
    },
    {
        key: 'subwoofers',
        icon: <AudioOutlined />,
        label: (
            <div className="dropdown-item-content">
                <div className="dropdown-item-title">Subwoofers</div>
                <div className="dropdown-item-desc">Low-frequency reinforcement systems</div>
            </div>
        ),
    },
    {
        key: 'amplifiers',
        icon: <SettingOutlined />,
        label: (
            <div className="dropdown-item-content">
                <div className="dropdown-item-title">Power Amplifiers</div>
                <div className="dropdown-item-desc">High-power amplification solutions</div>
            </div>
        ),
    },
    {
        key: 'processors',
        icon: <SettingOutlined />,
        label: (
            <div className="dropdown-item-content">
                <div className="dropdown-item-title">Signal Processors</div>
                <div className="dropdown-item-desc">Digital signal processing equipment</div>
            </div>
        ),
    },
];

// Applications subcategories
const applicationsSubcategories: MenuProps['items'] = [
    {
        key: 'live-sound',
        icon: <VideoCameraOutlined />,
        label: (
            <div className="dropdown-item-content">
                <div className="dropdown-item-title">Live Sound</div>
                <div className="dropdown-item-desc">Concert halls, theaters, and live events</div>
            </div>
        ),
    },
    {
        key: 'corporate',
        icon: <TeamOutlined />,
        label: (
            <div className="dropdown-item-content">
                <div className="dropdown-item-title">Corporate Events</div>
                <div className="dropdown-item-desc">Conferences, meetings, and presentations</div>
            </div>
        ),
    },
    {
        key: 'worship',
        icon: <GlobalOutlined />,
        label: (
            <div className="dropdown-item-content">
                <div className="dropdown-item-title">Worship Spaces</div>
                <div className="dropdown-item-desc">Churches, temples, and religious venues</div>
            </div>
        ),
    },
    {
        key: 'entertainment',
        icon: <TrophyOutlined />,
        label: (
            <div className="dropdown-item-content">
                <div className="dropdown-item-title">Entertainment</div>
                <div className="dropdown-item-desc">Clubs, bars, and entertainment venues</div>
            </div>
        ),
    },
    {
        key: 'outdoor',
        icon: <EnvironmentOutlined />,
        label: (
            <div className="dropdown-item-content">
                <div className="dropdown-item-title">Outdoor Events</div>
                <div className="dropdown-item-desc">Festivals, outdoor concerts, and events</div>
            </div>
        ),
    },
];

const PageHeader: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle mobile menu toggle
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Close mobile menu when clicking outside
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // Handle menu item click
    const handleMenuClick = ({ key }: { key: string }) => {
        console.log('Menu item clicked:', key);
        // Close mobile menu after navigation
        setTimeout(() => {
            setMobileMenuOpen(false);
        }, 100);
    };

    // Desktop menu items with dropdowns
    const desktopMenuItems = [
        {
            key: 'home',
            label: (
                <a href="/" className="nav-link">
                    <HomeOutlined />
                    <span>Home</span>
                </a>
            ),
        },
        {
            key: 'products',
            label: (
                <Dropdown
                    menu={{ items: productSubcategories }}
                    placement="bottomLeft"
                    trigger={['hover']}
                    overlayClassName="header-dropdown"
                >
                    <a className="nav-link dropdown-link">
                        <AppstoreOutlined />
                        <span>Products</span>
                        <DownOutlined className="dropdown-arrow" />
                    </a>
                </Dropdown>
            ),
        },
        {
            key: 'applications',
            label: (
                <Dropdown
                    menu={{ items: applicationsSubcategories }}
                    placement="bottomLeft"
                    trigger={['hover']}
                    overlayClassName="header-dropdown"
                >
                    <a className="nav-link dropdown-link">
                        <SettingOutlined />
                        <span>Applications</span>
                        <DownOutlined className="dropdown-arrow" />
                    </a>
                </Dropdown>
            ),
        },
        {
            key: 'about',
            label: (
                <a href="/about" className="nav-link">
                    <UserOutlined />
                    <span>About Us</span>
                </a>
            ),
        },
        {
            key: 'contact',
            label: (
                <a href="/contact" className="nav-link">
                    <PhoneOutlined />
                    <span>Contact</span>
                </a>
            ),
        },
    ];

    // Mobile menu items
    const mobileMenuItems: MenuProps['items'] = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <a href="/">Home</a>,
        },
        {
            key: 'products',
            icon: <AppstoreOutlined />,
            label: 'Products',
            children: [
                {
                    key: 'line-array',
                    icon: <AudioOutlined />,
                    label: <a href="/products/line-array">Line Array Systems</a>,
                },
                {
                    key: 'monitors',
                    icon: <SoundOutlined />,
                    label: <a href="/products/monitors">Stage Monitors</a>,
                },
                {
                    key: 'subwoofers',
                    icon: <AudioOutlined />,
                    label: <a href="/products/subwoofers">Subwoofers</a>,
                },
                {
                    key: 'amplifiers',
                    icon: <SettingOutlined />,
                    label: <a href="/products/amplifiers">Power Amplifiers</a>,
                },
                {
                    key: 'processors',
                    icon: <SettingOutlined />,
                    label: <a href="/products/processors">Signal Processors</a>,
                },
            ],
        },
        {
            key: 'applications',
            icon: <SettingOutlined />,
            label: 'Applications',
            children: [
                {
                    key: 'live-sound',
                    icon: <VideoCameraOutlined />,
                    label: <a href="/applications/live-sound">Live Sound</a>,
                },
                {
                    key: 'corporate',
                    icon: <TeamOutlined />,
                    label: <a href="/applications/corporate">Corporate Events</a>,
                },
                {
                    key: 'worship',
                    icon: <GlobalOutlined />,
                    label: <a href="/applications/worship">Worship Spaces</a>,
                },
                {
                    key: 'entertainment',
                    icon: <TrophyOutlined />,
                    label: <a href="/applications/entertainment">Entertainment</a>,
                },
                {
                    key: 'outdoor',
                    icon: <EnvironmentOutlined />,
                    label: <a href="/applications/outdoor">Outdoor Events</a>,
                },
            ],
        },
        {
            key: 'about',
            icon: <UserOutlined />,
            label: <a href="/about">About Us</a>,
        },
        {
            key: 'contact',
            icon: <PhoneOutlined />,
            label: <a href="/contact">Contact</a>,
        },
    ];

    return (
        <>
            <Header className="header">
                <div className="header-container">
                    {/* Logo */}
                    <div className="header-logo">
                        <a href="/">
                            <img src="/logo/YA-logo.PNG" alt="Yashvi Audio Logo" />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="header-nav desktop-nav">
                        {desktopMenuItems.map(item => (
                            <div key={item.key} className="nav-item">
                                {item.label}
                            </div>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        className="mobile-menu-btn"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    />
                </div>
            </Header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="mobile-menu-overlay">
                    <div className="mobile-menu-content">
                        <div className="mobile-menu-header">
                            <Text strong className="mobile-menu-title">
                                Menu
                            </Text>
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={closeMobileMenu}
                                className="mobile-menu-close"
                            />
                        </div>
                        <Menu
                            mode="inline"
                            items={mobileMenuItems}
                            className="mobile-menu"
                            onClick={handleMenuClick}
                            expandIcon={<DownOutlined />}
                        />
                    </div>
                    {/* Backdrop */}
                    <div className="mobile-menu-backdrop" onClick={closeMobileMenu} />
                </div>
            )}
        </>
    );
};

export default PageHeader;
