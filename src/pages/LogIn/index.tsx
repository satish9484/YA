import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// Assuming antd is installed
import { toast } from 'react-toastify';

import { Button, Form, Input } from 'antd';

import { doLogin } from '@/redux/actions/auth.ts';
// Import the doLogin action creator
import type { AppDispatch } from '@/redux/store';

// --- Import Redux action and type definitions from separate files ---
// Assuming authTypes.ts is in '../types/authTypes.ts'
import type {
    LoginFormData, // Type for login form data
} from './authTypes';

// Assuming react-toastify is installed

// Mock for RightIcon - In a real project, this would be your actual SVG component
const RightIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 ml-2 inline-block"
        style={{
            width: '1rem',
            height: '1rem',
            marginLeft: '0.5rem',
            display: 'inline-block',
            verticalAlign: 'middle',
        }}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
    </svg>
);

// Mock for patterns - In a real project, this would be your actual patterns object
const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

// Mock for LoginHeader - In a real project, this would be your actual header component
const LoginHeader: React.FC = () => (
    <header className="bg-blue-600 text-white p-4 text-center">
        <h2 className="text-2xl font-bold">Welcome to Our App</h2>
    </header>
);

const LogIn: React.FC = () => {
    // Use the typed useDispatch hook imported from ./authTypes
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onFinish = async (values: LoginFormData) => {
        try {
            // @ts-expect-error: Suppress type error for dispatching thunk action
            const response = await dispatch(doLogin(values));
            // doLogin is assumed to be a thunk that returns an action with payload

            if (
                response &&
                typeof response === 'object' &&
                'status' in response &&
                response.status === 200
            ) {
                toast.success((response as unknown as { message: string }).message);

                if ('token' in response && typeof response.token === 'string') {
                    localStorage.setItem('token', response.token);
                }
                void navigate('/dashboard');
            } else {
                const errorMessage =
                    response &&
                    typeof response === 'object' &&
                    'message' in response &&
                    typeof response.message === 'string'
                        ? response.message
                        : 'Login failed with an unknown error.';
                toast.error(errorMessage);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        } catch (error: unknown) {
            const errorMessage =
                error && typeof error === 'object' && 'message' in error
                    ? (error as { message: string }).message
                    : 'An unexpected error occurred during login.';
            toast.error(errorMessage);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    };

    return (
        <>
            <LoginHeader />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <div className="login-detail bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
                    <Form onFinish={onFinish} layout="vertical" className="login-form">
                        <Form.Item
                            className="mb-4"
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please enter email' },
                                { pattern: patterns.email, message: 'Please enter a valid email' },
                            ]}
                        >
                            <Input placeholder="Email" size="large" />
                        </Form.Item>

                        <Form.Item
                            className="mb-6"
                            name="password"
                            rules={[
                                { required: true, message: 'Please enter your password' },
                                () => ({
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject(
                                                new Error('Password is required'),
                                            );
                                        }
                                        // Pattern for at least 6 characters and no whitespace
                                        if (/^\S{6,50}$/.test(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                'Password must be 6-50 characters long and not contain white spaces',
                                            ),
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Password" size="large" />
                        </Form.Item>

                        <Form.Item className="flex flex-col items-center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="w-full mb-3 rounded-md"
                            >
                                Login
                                <RightIcon />
                            </Button>
                            <Link to="/forgot-password" className="text-blue-600 hover:underline">
                                Forgot password?
                            </Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default LogIn;
