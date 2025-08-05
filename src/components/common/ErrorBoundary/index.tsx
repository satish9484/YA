import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

import './error.scss';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
    errorName: string;
    componentStack: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: '',
            errorName: '',
            componentStack: '',
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return {
            hasError: true,
            errorMessage: error.message,
            errorName: error.name,
        };
    }

    override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.groupCollapsed(
            '%c[ErrorBoundary] 🚨 Error caught in component tree',
            'color: red; font-weight: bold;',
        );
        console.debug('🧨 Name:', error.name);
        console.debug('📝 Message:', error.message);
        console.dir(error);
        console.debug('📍 Component stack trace:');
        console.dir(errorInfo.componentStack);
        console.groupEnd();

        this.setState({ componentStack: errorInfo.componentStack ?? '' });
    }

    override render(): ReactNode {
        const { hasError, errorMessage, componentStack } = this.state;

        if (hasError) {
            return (
                <div className="heading">
                    <h1>Oops, something went wrong 😬</h1>
                    <h3>Please refresh or go back</h3>

                    <div className="card">
                        <div className="header">
                            <span className="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    width="48"
                                    height="48"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.29 3.86c.89-1.53 3.12-1.53 4.01 0l8.27 14.22c.9 1.55-.22 3.5-2.01 3.5H4.03c-1.79 0-2.91-1.95-2.01-3.5L10.29 3.86zM13 16v2h-2v-2h2zm0-8v6h-2V8h2z"
                                    />
                                </svg>
                            </span>
                            <p className="alert">Something broke!</p>
                        </div>

                        <div className="message error-message-container">
                            <strong className="error-message-title">Error Message:</strong>
                            <p className="error-message-text">{errorMessage}</p>

                            {componentStack && (
                                <>
                                    <strong className="stack-trace-title">Stack Trace:</strong>
                                    <pre className="scrollable-pre">{componentStack}</pre>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="content">
                        <a href="/">
                            <button className="glow-on-hover" type="button">
                                Go Back
                            </button>
                        </a>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
