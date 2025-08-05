import { Layout, Menu } from 'antd';

import './header.scss';

const { Header } = Layout;

const navItems = [
    {
        key: 'home',
        label: 'Home',
    },
    {
        key: 'product',
        label: 'Product',
    },
    {
        key: 'applications',
        label: 'Applications',
    },
    {
        key: 'about-us',
        label: 'About Us',
    },
    {
        key: 'contacts-us',
        label: 'Contacts Us',
    },
];
const pageHeader = () => {
    return (
        <Header className="header w-100 d-flex-center-center">
            <div className="container d-flex-center-center">
                <div className="logo d-flex justify-content-center ">
                    <figure className="d-flex justify-content-center">
                        <img src="/logo/YA-logo.PNG" alt="Logo" />
                    </figure>
                </div>
                <Menu
                    className="menu"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={navItems}
                />
            </div>
        </Header>
    );
};

export default pageHeader;
