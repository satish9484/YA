import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import type { RootState } from '@/redux/store';

// Import Outlet

// Define the types for the AuthGuard component's props.
// Since we are using <Outlet />, we no longer directly consume 'children' as a prop,
// but React.FC implicitly allows it, so we can keep the interface for consistency
// or remove it if AuthGuard won't take any other props.
// For this use case with <Outlet />, the children prop is not needed for direct consumption.
interface AuthGuardProps {
    children?: React.ReactNode; // 'children' is no longer directly used/required by this component due to <Outlet />
}

const AuthGuard: React.FC<AuthGuardProps> = () => {
    const navigate = useNavigate();

    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);

    // If the user is not logged in, navigate to the login page.
    // `replace: true` ensures that the login page replaces the current entry in the history stack,
    // preventing the user from navigating back to the guarded page directly after logging out.
    useEffect(() => {
        if (!isLoggedIn) {
            void navigate('/login', { replace: true });
        }
    }, [isLoggedIn, navigate]); // Dependencies: re-run effect if isLoggedIn state or navigate function changes

    // Render the <Outlet /> where nested routes will be displayed.
    // This is the correct pattern for nested routes with AuthGuard acting as a layout/guard.
    return (
        <>
            {isLoggedIn ? <Outlet /> : null}{' '}
            {/* Only render Outlet if logged in, otherwise let useEffect handle navigation */}
        </>
    );
};

export default AuthGuard;
