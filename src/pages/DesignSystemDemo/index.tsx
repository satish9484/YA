import React from 'react';

import './DesignSystemDemo.scss';

const DesignSystemDemo: React.FC = () => {
    return (
        <div className="design-system-demo">
            {/* Skip Link for Accessibility */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            {/* Navigation */}
            <nav className="demo-nav">
                <div className="container">
                    <div className="d-flex items-center justify-between p-4">
                        <div className="d-flex items-center">
                            <h1 className="text-xl font-semibold">Design System Demo</h1>
                        </div>
                        <div className="d-none md:d-flex items-center gap-6">
                            <a href="#typography" className="text-neutral-600 hover:text-primary">
                                Typography
                            </a>
                            <a href="#components" className="text-neutral-600 hover:text-primary">
                                Components
                            </a>
                            <a href="#utilities" className="text-neutral-600 hover:text-primary">
                                Utilities
                            </a>
                            <a href="#responsive" className="text-neutral-600 hover:text-primary">
                                Responsive
                            </a>
                        </div>
                        <button className="d-block md:d-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <main id="main-content">
                {/* Hero Section */}
                <section className="hero">
                    <div className="container">
                        <h1 className="hero__title">Responsive Design System</h1>
                        <p className="hero__subtitle">
                            A comprehensive, maintainable, and truly responsive design system built
                            with SCSS. This demo showcases all components, utilities, and responsive
                            features.
                        </p>
                        <div className="hero__actions">
                            <button className="btn btn--primary">Get Started</button>
                            <button className="btn btn--outline">View Documentation</button>
                        </div>
                    </div>
                </section>

                {/* Typography Section */}
                <section id="typography" className="section">
                    <div className="container">
                        <h2 className="text-center mb-12">Typography Scale</h2>

                        <div className="d-grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="card">
                                <h1>Heading 1</h1>
                                <p className="text-sm text-neutral-600">36px → 30px → 24px</p>
                            </div>

                            <div className="card">
                                <h2>Heading 2</h2>
                                <p className="text-sm text-neutral-600">30px → 24px → 20px</p>
                            </div>

                            <div className="card">
                                <h3>Heading 3</h3>
                                <p className="text-sm text-neutral-600">24px → 20px → 18px</p>
                            </div>

                            <div className="card">
                                <h4>Heading 4</h4>
                                <p className="text-sm text-neutral-600">20px → 16px</p>
                            </div>

                            <div className="card">
                                <h5>Heading 5</h5>
                                <p className="text-sm text-neutral-600">18px</p>
                            </div>

                            <div className="card">
                                <h6>Heading 6</h6>
                                <p className="text-sm text-neutral-600">16px</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3>Text Utilities</h3>
                            <div className="d-grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <p className="text-xs">Extra Small Text</p>
                                <p className="text-sm">Small Text</p>
                                <p className="text-base">Base Text</p>
                                <p className="text-lg">Large Text</p>
                                <p className="text-xl">Extra Large Text</p>
                                <p className="text-2xl">2XL Text</p>
                                <p className="text-3xl">3XL Text</p>
                                <p className="text-4xl">4XL Text</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3>Font Weights</h3>
                            <div className="d-grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <p className="font-light">Light Weight</p>
                                <p className="font-normal">Normal Weight</p>
                                <p className="font-medium">Medium Weight</p>
                                <p className="font-semibold">Semibold Weight</p>
                                <p className="font-bold">Bold Weight</p>
                                <p className="font-extrabold">Extrabold Weight</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Components Section */}
                <section id="components" className="section section--compact">
                    <div className="container">
                        <h2 className="text-center mb-12">Component Library</h2>

                        {/* Buttons */}
                        <div className="mb-12">
                            <h3 className="mb-6">Buttons</h3>
                            <div className="d-grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <div className="card">
                                    <h4 className="mb-4">Button Variants</h4>
                                    <div className="d-flex flex-col gap-3">
                                        <button className="btn btn--primary">Primary Button</button>
                                        <button className="btn btn--secondary">
                                            Secondary Button
                                        </button>
                                        <button className="btn btn--success">Success Button</button>
                                        <button className="btn btn--warning">Warning Button</button>
                                        <button className="btn btn--error">Error Button</button>
                                        <button className="btn btn--outline">Outline Button</button>
                                        <button className="btn btn--ghost">Ghost Button</button>
                                    </div>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Button Sizes</h4>
                                    <div className="d-flex flex-col gap-3">
                                        <button className="btn btn--primary btn--sm">
                                            Small Button
                                        </button>
                                        <button className="btn btn--primary">Default Button</button>
                                        <button className="btn btn--primary btn--lg">
                                            Large Button
                                        </button>
                                    </div>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Responsive Buttons</h4>
                                    <div className="d-flex flex-col gap-3">
                                        <button className="btn btn--primary w-full md:w-auto">
                                            Responsive Width
                                        </button>
                                        <button className="btn btn--secondary text-sm md:text-base">
                                            Responsive Text
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="mb-12">
                            <h3 className="mb-6">Cards</h3>
                            <div className="d-grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <div className="card">
                                    <h4>Basic Card</h4>
                                    <p>This is a basic card with default styling.</p>
                                </div>

                                <div className="card card--compact">
                                    <h4>Compact Card</h4>
                                    <p>This card has reduced padding.</p>
                                </div>

                                <div className="card card--spacious">
                                    <h4>Spacious Card</h4>
                                    <p>This card has increased padding.</p>
                                </div>

                                <div className="card card--bordered">
                                    <h4>Bordered Card</h4>
                                    <p>This card has a visible border.</p>
                                </div>

                                <div className="card card--elevated">
                                    <h4>Elevated Card</h4>
                                    <p>This card has enhanced shadow effects.</p>
                                </div>
                            </div>
                        </div>

                        {/* Forms */}
                        <div className="mb-12">
                            <h3 className="mb-6">Forms</h3>
                            <div className="d-grid gap-8 md:grid-cols-2">
                                <div className="card">
                                    <h4 className="mb-4">Basic Form</h4>
                                    <form>
                                        <div className="mb-4">
                                            <label className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="Enter your email"
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-input"
                                                placeholder="Enter your password"
                                            />
                                        </div>

                                        <div className="d-flex flex-col sm:flex-row gap-4">
                                            <button
                                                type="submit"
                                                className="btn btn--primary flex-1"
                                            >
                                                Sign In
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn--outline flex-1"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Form States</h4>
                                    <form>
                                        <div className="mb-4">
                                            <label className="form-label">Valid Input</label>
                                            <input
                                                type="text"
                                                className="form-input form-input--success"
                                                value="Valid input"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Error Input</label>
                                            <input
                                                type="text"
                                                className="form-input form-input--error"
                                                value="Invalid input"
                                            />
                                            <div className="form-error">This field is required</div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Disabled Input</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                disabled
                                                value="Disabled input"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Utilities Section */}
                <section id="utilities" className="section section--compact">
                    <div className="container">
                        <h2 className="text-center mb-12">Utility Classes</h2>

                        {/* Spacing Utilities */}
                        <div className="mb-12">
                            <h3 className="mb-6">Spacing Utilities</h3>
                            <div className="d-grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div className="card">
                                    <h4 className="mb-4">Margin Examples</h4>
                                    <div className="bg-neutral-100 p-4">
                                        <div className="bg-primary-100 m-4 p-2">
                                            m-4 (16px margin)
                                        </div>
                                        <div className="bg-primary-100 mt-4 p-2">
                                            mt-4 (16px top margin)
                                        </div>
                                        <div className="bg-primary-100 mb-4 p-2">
                                            mb-4 (16px bottom margin)
                                        </div>
                                        <div className="bg-primary-100 mx-4 p-2">
                                            mx-4 (16px horizontal margin)
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Padding Examples</h4>
                                    <div className="bg-neutral-100">
                                        <div className="bg-primary-100 p-4">p-4 (16px padding)</div>
                                        <div className="bg-primary-100 pt-4">
                                            pt-4 (16px top padding)
                                        </div>
                                        <div className="bg-primary-100 pb-4">
                                            pb-4 (16px bottom padding)
                                        </div>
                                        <div className="bg-primary-100 px-4">
                                            px-4 (16px horizontal padding)
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Responsive Spacing</h4>
                                    <div className="bg-neutral-100 p-4">
                                        <div className="bg-primary-100 p-4 md:p-6 lg:p-8">
                                            Responsive padding: 16px → 24px → 32px
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Layout Utilities */}
                        <div className="mb-12">
                            <h3 className="mb-6">Layout Utilities</h3>
                            <div className="d-grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div className="card">
                                    <h4 className="mb-4">Display Utilities</h4>
                                    <div className="d-flex flex-col gap-2">
                                        <div className="d-block bg-primary-100 p-2">d-block</div>
                                        <div className="d-flex bg-primary-100 p-2">d-flex</div>
                                        <div className="d-grid bg-primary-100 p-2">d-grid</div>
                                        <div className="d-none bg-primary-100 p-2">
                                            d-none (hidden)
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Flexbox Utilities</h4>
                                    <div className="d-flex flex-col gap-2">
                                        <div className="d-flex justify-start bg-primary-100 p-2">
                                            <span>justify-start</span>
                                        </div>
                                        <div className="d-flex justify-center bg-primary-100 p-2">
                                            <span>justify-center</span>
                                        </div>
                                        <div className="d-flex justify-end bg-primary-100 p-2">
                                            <span>justify-end</span>
                                        </div>
                                        <div className="d-flex justify-between bg-primary-100 p-2">
                                            <span>justify-between</span>
                                            <span>Item 2</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Responsive Display</h4>
                                    <div className="d-flex flex-col gap-2">
                                        <div className="d-none md:d-block bg-primary-100 p-2">
                                            Hidden on mobile, visible on tablet+
                                        </div>
                                        <div className="d-block lg:d-none bg-primary-100 p-2">
                                            Visible on mobile, hidden on desktop
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Color Utilities */}
                        <div className="mb-12">
                            <h3 className="mb-6">Color Utilities</h3>
                            <div className="d-grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <div className="card">
                                    <h4 className="mb-4">Text Colors</h4>
                                    <div className="d-flex flex-col gap-2">
                                        <p className="text-primary">text-primary</p>
                                        <p className="text-success">text-success</p>
                                        <p className="text-warning">text-warning</p>
                                        <p className="text-error">text-error</p>
                                        <p className="text-neutral-600">text-neutral-600</p>
                                    </div>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Background Colors</h4>
                                    <div className="d-flex flex-col gap-2">
                                        <div className="bg-primary-100 p-2">bg-primary-100</div>
                                        <div className="bg-success-100 p-2">bg-success-100</div>
                                        <div className="bg-warning-100 p-2">bg-warning-100</div>
                                        <div className="bg-error-100 p-2">bg-error-100</div>
                                        <div className="bg-neutral-100 p-2">bg-neutral-100</div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Border Colors</h4>
                                    <div className="d-flex flex-col gap-2">
                                        <div className="border border-primary p-2">
                                            border-primary
                                        </div>
                                        <div className="border border-success p-2">
                                            border-success
                                        </div>
                                        <div className="border border-warning p-2">
                                            border-warning
                                        </div>
                                        <div className="border border-error p-2">border-error</div>
                                        <div className="border border-neutral-300 p-2">
                                            border-neutral-300
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Shadow Utilities</h4>
                                    <div className="d-flex flex-col gap-2">
                                        <div className="shadow-sm p-4 bg-white">shadow-sm</div>
                                        <div className="shadow p-4 bg-white">shadow</div>
                                        <div className="shadow-md p-4 bg-white">shadow-md</div>
                                        <div className="shadow-lg p-4 bg-white">shadow-lg</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Responsive Demo Section */}
                <section id="responsive" className="section section--compact">
                    <div className="container">
                        <h2 className="text-center mb-12">Responsive Design Demo</h2>

                        {/* Responsive Grid */}
                        <div className="mb-12">
                            <h3 className="mb-6">Responsive Grid System</h3>
                            <div className="d-grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {Array.from({ length: 12 }, (_, i) => (
                                    <div key={i} className="card">
                                        <h4>Card {i + 1}</h4>
                                        <p className="text-sm text-neutral-600">
                                            This card demonstrates responsive grid behavior.
                                        </p>
                                        <div className="mt-4 text-xs text-neutral-500">
                                            <div className="d-block md:d-none">
                                                Mobile: 1 column
                                            </div>
                                            <div className="d-none md:d-block lg:d-none">
                                                Tablet: 2 columns
                                            </div>
                                            <div className="d-none lg:d-block xl:d-none">
                                                Desktop: 3 columns
                                            </div>
                                            <div className="d-none xl:d-block">
                                                Large: 4 columns
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Responsive Typography */}
                        <div className="mb-12">
                            <h3 className="mb-6">Responsive Typography</h3>
                            <div className="d-grid gap-6 md:grid-cols-2">
                                <div className="card">
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                                        Responsive Heading
                                    </h1>
                                    <p className="text-sm md:text-base lg:text-lg">
                                        This text scales responsively across different screen sizes.
                                    </p>
                                </div>

                                <div className="card">
                                    <h2 className="text-xl md:text-2xl lg:text-3xl">
                                        Another Responsive Heading
                                    </h2>
                                    <p className="text-xs md:text-sm lg:text-base">
                                        Smaller text that also scales appropriately.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Responsive Components */}
                        <div className="mb-12">
                            <h3 className="mb-6">Responsive Components</h3>
                            <div className="d-grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div className="card">
                                    <h4 className="mb-4">Responsive Button Group</h4>
                                    <div className="d-flex flex-col sm:flex-row gap-2">
                                        <button className="btn btn--primary flex-1">Primary</button>
                                        <button className="btn btn--secondary flex-1">
                                            Secondary
                                        </button>
                                        <button className="btn btn--outline flex-1">Outline</button>
                                    </div>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Responsive Navigation</h4>
                                    <nav className="d-flex flex-col sm:flex-row gap-2">
                                        <a href="#" className="text-primary hover:text-primary-600">
                                            Home
                                        </a>
                                        <a href="#" className="text-primary hover:text-primary-600">
                                            About
                                        </a>
                                        <a href="#" className="text-primary hover:text-primary-600">
                                            Contact
                                        </a>
                                    </nav>
                                </div>

                                <div className="card">
                                    <h4 className="mb-4">Responsive Spacing</h4>
                                    <div className="p-4 md:p-6 lg:p-8 bg-neutral-100">
                                        <p>This container has responsive padding</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Performance Section */}
                <section className="section section--compact bg-neutral-50">
                    <div className="container">
                        <h2 className="text-center mb-12">Performance & Best Practices</h2>

                        <div className="d-grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="card">
                                <h4 className="mb-4">Mobile-First Approach</h4>
                                <p>
                                    All components are built mobile-first, then enhanced for larger
                                    screens.
                                </p>
                                <ul className="mt-4 text-sm">
                                    <li>• Start with mobile styles</li>
                                    <li>• Use @include breakpoint() for enhancements</li>
                                    <li>• Test on real devices</li>
                                </ul>
                            </div>

                            <div className="card">
                                <h4 className="mb-4">Design Tokens</h4>
                                <p>Consistent use of design tokens ensures maintainability.</p>
                                <ul className="mt-4 text-sm">
                                    <li>• Use $spacing-* variables</li>
                                    <li>• Use $font-size-* variables</li>
                                    <li>• Use semantic color variables</li>
                                </ul>
                            </div>

                            <div className="card">
                                <h4 className="mb-4">Utility Classes</h4>
                                <p>Leverage utility classes for common patterns.</p>
                                <ul className="mt-4 text-sm">
                                    <li>• Use spacing utilities</li>
                                    <li>• Use flexbox utilities</li>
                                    <li>• Use responsive utilities</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-neutral-900 text-white py-12">
                <div className="container">
                    <div className="d-grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h3 className="mb-4">Design System</h3>
                            <p className="text-neutral-300">
                                A comprehensive, maintainable, and truly responsive design system.
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4">Components</h4>
                            <ul className="d-flex flex-col gap-2 text-neutral-300">
                                <li>
                                    <a href="#typography" className="hover:text-white">
                                        Typography
                                    </a>
                                </li>
                                <li>
                                    <a href="#components" className="hover:text-white">
                                        Buttons
                                    </a>
                                </li>
                                <li>
                                    <a href="#components" className="hover:text-white">
                                        Cards
                                    </a>
                                </li>
                                <li>
                                    <a href="#components" className="hover:text-white">
                                        Forms
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4">Utilities</h4>
                            <ul className="d-flex flex-col gap-2 text-neutral-300">
                                <li>
                                    <a href="#utilities" className="hover:text-white">
                                        Spacing
                                    </a>
                                </li>
                                <li>
                                    <a href="#utilities" className="hover:text-white">
                                        Layout
                                    </a>
                                </li>
                                <li>
                                    <a href="#utilities" className="hover:text-white">
                                        Colors
                                    </a>
                                </li>
                                <li>
                                    <a href="#utilities" className="hover:text-white">
                                        Typography
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4">Resources</h4>
                            <ul className="d-flex flex-col gap-2 text-neutral-300">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Examples
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-neutral-700 text-center text-neutral-400">
                        <p>
                            &copy; 2024 Design System Demo. Built with responsive design principles.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DesignSystemDemo;
