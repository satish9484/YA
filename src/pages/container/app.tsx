/**
 * 🚀 App Entry Point
 */
import { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';

import { ErrorBoundary } from '@/components/common/ErrorBoundary/index.tsx';
import Loader from '@/components/common/loader/index.tsx';
import OptimizedLoader from '@/components/common/loader/OptimizedLoader';
import ScrollToTop from '@/components/common/scroll/index.tsx';
import { ThemeProvider } from '@/contexts/ThemeContext.tsx';
import store from '@/redux/store.tsx';
import { setupAxios } from '@/utills/index.tsx';

import Routes from './routes.tsx';

setupAxios(axios, store);

const App: React.FC = () => {
    const [isAppReady, setIsAppReady] = useState<boolean>(true);

    useEffect(() => {
        // Set app ready immediately - remove artificial delay
        setIsAppReady(true);
    }, []);

    return (
        <ErrorBoundary>
            {!isAppReady ? (
                <Loader />
            ) : (
                <Provider store={store}>
                    <ThemeProvider>
                        <BrowserRouter>
                            <ScrollToTop>
                                <Suspense fallback={<OptimizedLoader context="overlay" variant="error" color="#ff7a45" size="large" isSuspense={true} />}>
                                    <Routes />
                                </Suspense>
                            </ScrollToTop>
                        </BrowserRouter>
                    </ThemeProvider>
                </Provider>
            )}
        </ErrorBoundary>
    );
};

export default App;
