import { type FormEvent, type ReactNode, useState } from 'react';

import { useAppSelector } from '@/redux/hooks';
import { APP_NAME } from '@/utills/constants';

import type { RootState } from '../../redux/store';
import Breadcrumbs from '../common/Breadcrumbs';
import './styles.scss';

// --- (Existing ChangePasswordForm component remains the same) ---
const ChangePasswordForm = () => {
    // const dispatch = useAppDispatch();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { isLoading, error } = useAppSelector((state: RootState) => state.auth);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords don't match!");
            return;
        }

        // void dispatch(changePassword({ oldPassword, newPassword }));
    };

    const handleForgotPassword = () => {
        // void dispatch(forgotPassword({ email: 'user@example.com' }));
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="text-danger mb-4">{error.message}</div>}
            <div className="form-group">
                <label className="form-label" htmlFor="oldPassword">
                    Old Password
                </label>
                <input
                    type="password"
                    id="oldPassword"
                    className="form-input"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="newPassword">
                    New Password
                </label>
                <input
                    type="password"
                    id="newPassword"
                    className="form-input"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                    Confirm New Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <div className="d-flex justify-between items-center mt-6">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Change Password'}
                </button>
                <a href="#" onClick={handleForgotPassword} className="text-sm link">
                    Forgot Password?
                </a>
            </div>
        </form>
    );
};

const UserProfilePage = () => {
    const userFromStore = useAppSelector((state: RootState) => state.auth.userData);
    const [activeView, setActiveView] = useState<'profile' | 'security'>('profile');

    const user = {
        id: 'sample-user-id',
        name: APP_NAME,
        email: `${APP_NAME.replace(/\s+/g, '.')}@example.com`,
        avatarUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
        address: {
            street: '123 Music Lane',
            city: 'Soundville',
            country: 'Audioland',
        },
    };

    console.log(userFromStore);

    const handleLogout = () => {
        // void dispatch(doLogout({ userId: user.id, refreshToken: user.email }));
    };

    const NavLink = ({
        view,
        label,
        icon,
    }: {
        view: 'profile' | 'security';
        label: string;
        icon: ReactNode;
    }) => (
        <button
            className={`sidebar-nav-link ${activeView === view ? 'active' : ''}`}
            onClick={() => setActiveView(view)}
        >
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
        </button>
    );

    const breadcrumbs = [
        { id: 'home', name: 'Home', link: '/', isActive: true },
        { id: 'dashboard', name: 'Dashboard', link: '/dashboard', isActive: false },
    ];

    return (
        <div className="d-flex flex-column md:flex-row min-h-screen bg-background text-text-primary header-mr">
            <aside className="profile-sidebar w-full md:w-80 bg-secondary border-r border-border flex-shrink-0 d-flex flex-column">
                <div className="p-6 text-center border-b border-border">
                    <img
                        src={user.avatarUrl}
                        alt={`${user.name}'s avatar`}
                        className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
                    />
                    <h2 className="h5 font-semibold">{user.name}</h2>
                    <p className="text-sm text-secondary">{user.email}</p>
                </div>
                <nav className="d-flex flex-column gap-2 p-4 space-y-2">
                    <NavLink
                        view="profile"
                        label="Profile"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        }
                    />
                    <NavLink
                        view="security"
                        label="Security"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        }
                    />
                </nav>
                <div className="p-4 mt-auto">
                    <button
                        className="btn btn-secondary w-full d-flex items-center justify-center logout-btn"
                        onClick={handleLogout}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-6 md:p-10">
                <Breadcrumbs items={breadcrumbs} />
                <div className="max-w-3xl mx-auto">
                    <div hidden={activeView !== 'profile'}>
                        <div className="card">
                            <div className="card-header">
                                <h2 className="h3 font-bold">Public Profile</h2>
                            </div>
                            <div className="card-body">
                                <div className="d-flex flex-column items-center md:flex-row md:items-start text-center md:text-left">
                                    <img
                                        src={user.avatarUrl}
                                        alt={`${user.name}'s avatar`}
                                        className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8 border-4 border-border shadow-md"
                                    />
                                    <div className="flex-1">
                                        <h1 className="h2 font-bold">{user.name}</h1>
                                        <p className="text-secondary mt-1">{user.email}</p>
                                        <p className="text-secondary mt-4">
                                            {user.address.street}, {user.address.city},{' '}
                                            {user.address.country}
                                        </p>
                                        <button className="btn btn-primary mt-6">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div hidden={activeView !== 'security'}>
                        <div className="card">
                            <div className="card-header">
                                <h2 className="h3 font-bold">Security Settings</h2>
                            </div>
                            <div className="card-body">
                                <p className="text-secondary mt-2 mb-6">
                                    Update your password and secure your account.
                                </p>
                                <ChangePasswordForm />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfilePage;
