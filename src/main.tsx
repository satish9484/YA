import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './pages/container/app.tsx';
import './style.scss';

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
