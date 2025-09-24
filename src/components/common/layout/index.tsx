import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import styles from './layout.module.scss';

const { Content } = Layout;

const PageHeader = lazy(() => import('./header/index.tsx'));
const PageFooter = lazy(() => import('./footer/index.tsx'));

const App: React.FC = () => {
    return (
        <Layout className={styles.layout}>
            <PageHeader />
            <Content className={styles.content}>
                <Outlet />
            </Content>
            <PageFooter />
        </Layout>
    );
};

export default App;
