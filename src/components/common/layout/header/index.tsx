import { useState } from 'react';

import type { MenuProps } from 'antd';
import { Button, Drawer, Dropdown, Layout, Menu, Typography } from 'antd';

import { useTheme } from '@/hooks/useTheme';
import { Logo } from '@/utills/icon';
import {
    AppstoreOutlined,
    AudioOutlined,
    DownOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
    HomeOutlined,
    MenuOutlined,
    MoonOutlined,
    PhoneOutlined,
    SettingOutlined,
    SoundOutlined,
    SunOutlined,
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
            <a href="/products" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Line Array Systems</div>
                    <div className="dropdown-item-desc">
                        Professional line array speakers for large venues
                    </div>
                </div>
            </a>
        ),
    },
    {
        key: 'monitors',
        icon: <SoundOutlined />,
        label: (
            <a href="/dashboard" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Stage Monitors</div>
                    <div className="dropdown-item-desc">
                        Stage monitoring solutions for performers
                    </div>
                </div>
            </a>
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
    const { theme, setTheme } = useTheme();

    // Handle mobile menu toggle
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Close mobile menu
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

    // Theme selection dropdown menu
    const themeMenu = (
        <Menu
            onClick={({ key }) => setTheme(key as 'light' | 'dark' | 'system')}
            selectedKeys={[theme]}
            items={[
                {
                    key: 'light',
                    label: 'Light',
                    icon: <SunOutlined />,
                },
                {
                    key: 'dark',
                    label: 'Dark',
                    icon: <MoonOutlined />,
                },
                {
                    key: 'system',
                    label: 'System',
                    icon: <SettingOutlined />,
                },
            ]}
        />
    );

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
                    key: 'all-products',
                    icon: <AudioOutlined />,
                    label: <a href="/products">All Products</a>,
                },
                {
                    key: 'line-array',
                    icon: <AudioOutlined />,
                    label: <a href="/products/line-array">Line Array Speakers</a>,
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
                            <Logo
                                width={120}
                                height={40}
                                variant="image"
                                showBackground={true}
                                backgroundVariant="surface"
                            />
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

                    {/* Theme Dropdown */}
                    <Dropdown overlay={themeMenu} trigger={['click']}>
                        <Button type="text" className="theme-toggle-btn">
                            {theme === 'light' && <SunOutlined />}
                            {theme === 'dark' && <MoonOutlined />}
                            {theme === 'system' && <SettingOutlined />}
                            <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                        </Button>
                    </Dropdown>

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

            {/* Mobile Menu Drawer */}
            <Drawer
                title={
                    <div className="mobile-drawer-header">
                        <Text strong>Menu</Text>
                        <Dropdown overlay={themeMenu} trigger={['click']}>
                            <Button type="text" className="theme-toggle-btn mobile">
                                {theme === 'light' && <SunOutlined />}
                                {theme === 'dark' && <MoonOutlined />}
                                {theme === 'system' && <SettingOutlined />}
                            </Button>
                        </Dropdown>
                    </div>
                }
                placement="right"
                onClose={closeMobileMenu}
                open={mobileMenuOpen}
                className="mobile-drawer"
                closable={true}
            >
                <Menu
                    mode="inline"
                    items={mobileMenuItems}
                    className="mobile-menu"
                    onClick={handleMenuClick}
                    expandIcon={<DownOutlined />}
                />
            </Drawer>
        </>
    );
};

export default PageHeader;
