import { useState } from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/products/line-array" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Line Array Systems</div>
                    <div className="dropdown-item-desc">
                        Professional line array speakers for large venues
                    </div>
                </div>
            </Link>
        ),
    },
    {
        key: 'monitors',
        icon: <SoundOutlined />,
        label: (
            <Link to="/products/monitors" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Stage Monitors</div>
                    <div className="dropdown-item-desc">
                        Stage monitoring solutions for performers
                    </div>
                </div>
            </Link>
        ),
    },
    {
        key: 'subwoofers',
        icon: <AudioOutlined />,
        label: (
            <Link to="/products/subwoofers" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Subwoofers</div>
                    <div className="dropdown-item-desc">Low-frequency reinforcement systems</div>
                </div>
            </Link>
        ),
    },
    {
        key: 'amplifiers',
        icon: <SettingOutlined />,
        label: (
            <Link to="/products/amplifiers" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Power Amplifiers</div>
                    <div className="dropdown-item-desc">High-power amplification solutions</div>
                </div>
            </Link>
        ),
    },
    {
        key: 'processors',
        icon: <SettingOutlined />,
        label: (
            <Link to="/products/processors" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Signal Processors</div>
                    <div className="dropdown-item-desc">Digital signal processing equipment</div>
                </div>
            </Link>
        ),
    },
];

// Applications subcategories
const applicationsSubcategories: MenuProps['items'] = [
    {
        key: 'live-sound',
        icon: <VideoCameraOutlined />,
        label: (
            <Link to="/applications/live-sound" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Live Sound</div>
                    <div className="dropdown-item-desc">
                        Concert halls, theaters, and live events
                    </div>
                </div>
            </Link>
        ),
    },
    {
        key: 'corporate',
        icon: <TeamOutlined />,
        label: (
            <Link to="/applications/corporate" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Corporate Events</div>
                    <div className="dropdown-item-desc">
                        Conferences, meetings, and presentations
                    </div>
                </div>
            </Link>
        ),
    },
    {
        key: 'worship',
        icon: <GlobalOutlined />,
        label: (
            <Link to="/applications/worship" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Worship Spaces</div>
                    <div className="dropdown-item-desc">
                        Churches, temples, and religious venues
                    </div>
                </div>
            </Link>
        ),
    },
    {
        key: 'entertainment',
        icon: <TrophyOutlined />,
        label: (
            <Link to="/applications/entertainment" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Entertainment</div>
                    <div className="dropdown-item-desc">Clubs, bars, and entertainment venues</div>
                </div>
            </Link>
        ),
    },
    {
        key: 'outdoor',
        icon: <EnvironmentOutlined />,
        label: (
            <Link to="/applications/outdoor" className="dropdown-item-content">
                <div className="dropdown-item-content">
                    <div className="dropdown-item-title">Outdoor Events</div>
                    <div className="dropdown-item-desc">
                        Festivals, outdoor concerts, and events
                    </div>
                </div>
            </Link>
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

    // Theme selection dropdown menu items
    const themeMenuItems = [
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
    ];

    // Desktop menu items with dropdowns
    const desktopMenuItems = [
        {
            key: 'home',
            label: (
                <Link to="/" className="nav-link">
                    <HomeOutlined />
                    <span>Home</span>
                </Link>
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
                <Link to="/about" className="nav-link">
                    <UserOutlined />
                    <span>About Us</span>
                </Link>
            ),
        },
        {
            key: 'contact',
            label: (
                <Link to="/contact" className="nav-link">
                    <PhoneOutlined />
                    <span>Contact</span>
                </Link>
            ),
        },
    ];

    // Mobile menu items
    const mobileMenuItems: MenuProps['items'] = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <Link to="/">Home</Link>,
        },
        {
            key: 'products',
            icon: <AppstoreOutlined />,
            label: 'Products',
            children: [
                {
                    key: 'line-array',
                    icon: <AudioOutlined />,
                    label: <Link to="/products/line-array">Line Array Speakers</Link>,
                },
                {
                    key: 'monitors',
                    icon: <SoundOutlined />,
                    label: <Link to="/products/monitors">Stage Monitors</Link>,
                },
                {
                    key: 'subwoofers',
                    icon: <AudioOutlined />,
                    label: <Link to="/products/subwoofers">Subwoofers</Link>,
                },
                {
                    key: 'amplifiers',
                    icon: <SettingOutlined />,
                    label: <Link to="/products/amplifiers">Power Amplifiers</Link>,
                },
                {
                    key: 'processors',
                    icon: <SettingOutlined />,
                    label: <Link to="/products/processors">Signal Processors</Link>,
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
                    label: <Link to="/applications/live-sound">Live Sound</Link>,
                },
                {
                    key: 'corporate',
                    icon: <TeamOutlined />,
                    label: <Link to="/applications/corporate">Corporate Events</Link>,
                },
                {
                    key: 'worship',
                    icon: <GlobalOutlined />,
                    label: <Link to="/applications/worship">Worship Spaces</Link>,
                },
                {
                    key: 'entertainment',
                    icon: <TrophyOutlined />,
                    label: <Link to="/applications/entertainment">Entertainment</Link>,
                },
                {
                    key: 'outdoor',
                    icon: <EnvironmentOutlined />,
                    label: <Link to="/applications/outdoor">Outdoor Events</Link>,
                },
            ],
        },
        {
            key: 'about',
            icon: <UserOutlined />,
            label: <Link to="/about">About Us</Link>,
        },
        {
            key: 'contact',
            icon: <PhoneOutlined />,
            label: <Link to="/contact">Contact</Link>,
        },
    ];

    return (
        <>
            <Header className="header">
                <div className="header-container">
                    {/* Logo */}
                    <div className="header-logo">
                        <Link to="/">
                            <Logo width={120} height={40} variant="image" showBackground={true} />
                        </Link>
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
                    <Dropdown
                        menu={{
                            items: themeMenuItems,
                            onClick: ({ key }) => setTheme(key as 'light' | 'dark' | 'system'),
                            selectedKeys: [theme],
                        }}
                        trigger={['click']}
                    >
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
                        <Dropdown
                            menu={{
                                items: themeMenuItems,
                                onClick: ({ key }) => setTheme(key as 'light' | 'dark' | 'system'),
                                selectedKeys: [theme],
                            }}
                            trigger={['click']}
                        >
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
