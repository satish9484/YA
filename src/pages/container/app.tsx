/**
 * 🚀 App Entry Point
 */
import { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';

import { ErrorBoundary } from '@/components/common/ErrorBoundary/index.tsx';
import Loader from '@/components/common/loader/index.tsx';
import { ThemeProvider } from '@/contexts/ThemeContext.tsx';
import store from '@/redux/store.tsx';
import { setupAxios } from '@/utills/index.tsx';

import Routes from './routes.tsx';

setupAxios(axios, store);

const App: React.FC = () => {
    const [isAppReady, setIsAppReady] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            // 💡 Replace this with real "ready" logic later
            setIsAppReady(true);
        }, 500); // Simulate delay for now

        return () => clearTimeout(timer);
    }, []);

    return (
        <ErrorBoundary>
            {!isAppReady ? (
                <Loader />
            ) : (
                <Provider store={store}>
                    <ThemeProvider>
                        <BrowserRouter>
                            <Suspense fallback={<Loader isSuspense={true} />}>
                                <Routes />
                            </Suspense>
                        </BrowserRouter>
                    </ThemeProvider>
                </Provider>
            )}
        </ErrorBoundary>
    );
};

export default App;
