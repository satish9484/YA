// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import 'antd/dist/reset.css';

import App from './pages/container/app.tsx';
import './style.scss';

// Apply theme immediately before React hydration to prevent FOUC
(function applyThemeBeforeHydration() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    const theme = savedTheme ?? 'system';

    let effectiveTheme: 'light' | 'dark';
    if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    } else {
        effectiveTheme = theme;
    }

    document.documentElement.setAttribute('data-theme', effectiveTheme);
})();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            limit={5}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
        <App />
    </StrictMode>,
);
