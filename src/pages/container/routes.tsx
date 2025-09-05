import { lazy } from 'react';
// Import Suspense for lazy loading
import { Navigate, Route, Routes } from 'react-router-dom';

// Import  AuthGuard component
import AuthGuard from '@/components/auth';
// Import  UserProfileCard component
import UserProfileCard from '@/components/UserProfileCard';

// Lazily load the LogIn component for better bundle splitting
// const LogIn = lazy(() => import('@/pages/LogIn/index.tsx'));

const PageLayout = lazy(() => import('@/components/common/layout'));
const Landing = lazy(() => import('@/pages/Landing'));
const DesignSystemDemo = lazy(() => import('@/pages/DesignSystemDemo'));
const ProductsPage = lazy(() => import('@/pages/Products'));

// Product subcategory pages
const LineArrayPage = lazy(() => import('@/pages/Products/LineArray'));
const StageMonitorsPage = lazy(() => import('@/pages/Products/Monitors'));
const SubwoofersPage = lazy(() => import('@/pages/Products/Subwoofers'));
const PowerAmplifiersPage = lazy(() => import('@/pages/Products/Amplifiers'));
const SignalProcessorsPage = lazy(() => import('@/pages/Products/Processors'));

// Product detail pages
const ProductDetailPage = lazy(() => import('@/pages/Products/ProductCatalog/ProductDetail'));
const LineArrayProductDetailPage = lazy(() => import('@/pages/Products/LineArray/ProductDetail'));

// Application pages
const LiveSoundPage = lazy(() => import('@/pages/Applications/LiveSound'));
const CorporateEventsPage = lazy(() => import('@/pages/Applications/Corporate'));
const WorshipSpacesPage = lazy(() => import('@/pages/Applications/Worship'));
const EntertainmentPage = lazy(() => import('@/pages/Applications/Entertainment'));
const OutdoorEventsPage = lazy(() => import('@/pages/Applications/Outdoor'));

// Other pages
const AboutPage = lazy(() => import('@/pages/About'));
const ContactPage = lazy(() => import('@/pages/Contact'));

const Routing: React.FC = () => {
    return (
        <Routes>
            {/* Public Route: Login page */}
            {/* <Route path="/login" element={<LogIn />} /> */}

            <Route path="/" element={<PageLayout />}>
                {/* Landing Page */}
                <Route path="/landing" element={<Landing />} />
                <Route path="/" element={<Landing />} />

                {/* Products Page */}
                <Route path="/products" element={<ProductsPage />} />

                {/* Product subcategory routes */}
                <Route path="/products/line-array" element={<LineArrayPage />} />
                <Route path="/products/monitors" element={<StageMonitorsPage />} />
                <Route path="/products/subwoofers" element={<SubwoofersPage />} />
                <Route path="/products/amplifiers" element={<PowerAmplifiersPage />} />
                <Route path="/products/processors" element={<SignalProcessorsPage />} />

                {/* Product detail routes */}
                <Route path="/products/toa-hx5b" element={<ProductDetailPage />} />
                <Route
                    path="/products/line-array/:productId"
                    element={<LineArrayProductDetailPage />}
                />

                {/* Application routes */}
                <Route path="/applications/live-sound" element={<LiveSoundPage />} />
                <Route path="/applications/corporate" element={<CorporateEventsPage />} />
                <Route path="/applications/worship" element={<WorshipSpacesPage />} />
                <Route path="/applications/entertainment" element={<EntertainmentPage />} />
                <Route path="/applications/outdoor" element={<OutdoorEventsPage />} />

                {/* Other pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Design System Demo */}
                <Route path="/design-system" element={<DesignSystemDemo />} />
                <Route path="/dashboard" element={<UserProfileCard />} />
            </Route>

            {/* Protected Routes: All routes nested under AuthGuard require authentication */}
            <Route path="/admin" element={<AuthGuard />}>
                {/* Default redirect: If a user navigates to "/", redirect them to "/dashboard" */}
                <Route path="/admin" element={<Navigate replace to="/dashboard" />} />

                {/* Dashboard Route: Displays the UserProfileCard */}
                {/* This route is protected by AuthGuard, meaning if not logged in,
              AuthGuard will redirect to /login before UserProfileCard is rendered. */}
                <Route path="/admin/dashboard" element={<UserProfileCard />} />
            </Route>

            {/* Catch-all Route: Redirects any unmatched paths to the root, which then hits AuthGuard */}
            {/* If an invalid URL is entered while logged in, it will go to /dashboard.
            If not logged in, it will go to /login. */}
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    );
};

export default Routing;
