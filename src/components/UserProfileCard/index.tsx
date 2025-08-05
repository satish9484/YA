import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Adjust path to your slice
import { changePassword, doLogout, forgotPassword } from '@/redux/actions/auth.ts';
import type { AppDispatch, RootState } from '@/redux/store';

import './styles.scss';

// --- Change Password Form Sub-Component ---
// This component now receives a dispatch function to call the async thunk
const ChangePasswordForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        // Dispatch the changePassword async thunk with the form data
        // @ts-expect-error: Suppress type error for dispatching thunk action
        void dispatch(changePassword({ oldPassword, newPassword }));
    };

    const handleForgotPassword = () => {
        // Dispatch the forgotPassword async thunk
        // @ts-expect-error: Suppress type error for dispatching thunk action
        void dispatch(forgotPassword({ email: 'user@example.com' }));
    };

    return (
        <form className="change-password-form" onSubmit={handleSubmit}>
            {error && <div className="form-error">{error.message}</div>}
            <div className="form-group">
                <label htmlFor="oldPassword">Old Password</label>
                <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Change Password'}
                </button>
                <a href="#" onClick={handleForgotPassword} className="forgot-password-link">
                    Forgot Password?
                </a>
            </div>
        </form>
    );
};

// --- Main User Profile Page Component ---
const UserProfilePage = () => {
    // Get user data directly from the Redux store
    const user = useSelector((state: RootState) => state.auth.userData);
    const dispatch = useDispatch<AppDispatch>();
    const [activeView, setActiveView] = useState<'profile' | 'security'>('profile');

    // If user data isn't loaded yet, show a loading state or return null
    if (!user) {
        return <div className="loading-container">Loading Profile...</div>;
    }

    const handleLogout = () => {
        // @ts-expect-error: Suppress type error for dispatching thunk action
        void dispatch(doLogout({ userId: user.id, refreshToken: user.email }));
    };

    return (
        <div className="user-profile-page">
            <aside className="profile-sidebar">
                <div className="sidebar-header">
                    <img
                        src={user.avatarUrl}
                        alt={`${user.name}'s avatar`}
                        className="sidebar-avatar"
                    />
                    <h2 className="sidebar-username">{user.name}</h2>
                </div>
                <nav className="profile-nav">
                    <button
                        className={`nav-item ${activeView === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveView('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`nav-item ${activeView === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveView('security')}
                    >
                        Security
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button className="btn btn-secondary" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </aside>

            <main className="profile-content">
                <div className="content-view" id="profile-view" hidden={activeView !== 'profile'}>
                    <div className="profile-card">
                        <img
                            src={user.avatarUrl}
                            alt={`${user.name}'s avatar`}
                            className="profile-card-avatar"
                        />
                        <h1 className="profile-card-name">{user.name}</h1>
                        <p className="profile-card-email">{user.email}</p>
                        <p className="profile-card-address">
                            {user.address.street}, {user.address.city}, {user.address.country}
                        </p>
                        <button className="btn btn-primary-outline">Edit Profile</button>
                    </div>
                </div>

                <div className="content-view" id="security-view" hidden={activeView !== 'security'}>
                    <div className="security-card">
                        <h2>Security Settings</h2>
                        <p>Update your password and secure your account.</p>
                        <ChangePasswordForm />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfilePage;
