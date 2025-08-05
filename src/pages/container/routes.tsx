import { lazy, Suspense } from 'react';
// Import Suspense for lazy loading
import { Navigate, Route, Routes } from 'react-router-dom';

// Import  AuthGuard component
import AuthGuard from '@/components/auth/index.tsx';
// Import  UserProfileCard component
import UserProfileCard from '@/components/UserProfileCard/index.tsx';

// Lazily load the LogIn component for better bundle splitting
// const LogIn = lazy(() => import('@/pages/LogIn/index.tsx'));

const PageLayout = lazy(() => import('@/components/common/layout/index.tsx'));
const Landing = lazy(() => import('@/pages/Landing/index.tsx'));

const Routing: React.FC = () => {
    return (
        // Suspense is required when using React.lazy for dynamic imports.
        // A fallback UI (e.g., a loading spinner) can be displayed while the component loads.
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {/* Public Route: Login page */}
                {/* <Route path="/login" element={<LogIn />} /> */}

                <Route path="/" element={<PageLayout />}>
                    {/* Landing Page */}
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/" element={<Landing />} />
                </Route>

                {/* Protected Routes: All routes nested under AuthGuard require authentication */}
                <Route path="/" element={<AuthGuard />}>
                    {/* Default redirect: If a user navigates to "/", redirect them to "/dashboard" */}
                    <Route path="/" element={<Navigate replace to="/dashboard" />} />

                    {/* Dashboard Route: Displays the UserProfileCard */}
                    {/* This route is protected by AuthGuard, meaning if not logged in,
              AuthGuard will redirect to /login before UserProfileCard is rendered. */}
                    <Route path="/dashboard" element={<UserProfileCard />} />
                </Route>

                {/* Catch-all Route: Redirects any unmatched paths to the root, which then hits AuthGuard */}
                {/* If an invalid URL is entered while logged in, it will go to /dashboard.
            If not logged in, it will go to /login. */}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Suspense>
    );
};

export default Routing;
