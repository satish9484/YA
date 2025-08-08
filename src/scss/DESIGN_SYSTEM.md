# Design System Documentation

## Overview

This is a comprehensive, maintainable, and truly responsive design system built with SCSS. It provides a consistent foundation for building modern web applications with mobile-first responsive design.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Design Tokens](#design-tokens)
3. [Responsive Breakpoints](#responsive-breakpoints)
4. [Typography](#typography)
5. [Spacing System](#spacing-system)
6. [Color System](#color-system)
7. [Component Library](#component-library)
8. [Utility Classes](#utility-classes)
9. [Best Practices](#best-practices)
10. [Examples](#examples)

## Getting Started

### File Structure

```
src/scss/
├── _variable.scss      # Design tokens and variables
├── _mixin.scss        # SCSS mixins and functions
├── _utilities.scss    # Utility classes
├── _reset.scss        # CSS reset
├── _col.scss          # Grid system
├── _flex.scss         # Flexbox utilities
├── _common.scss       # Common styles
├── _common2.scss      # Additional common styles
└── style.scss         # Main stylesheet
```

### Import Order

The main `style.scss` file imports all modules in the correct order:

```scss
@use './variable' as *; // Variables first
@use './mixin' as *; // Mixins second
@use './reset' as *; // Reset third
@use './utilities' as *; // Utilities fourth
@use './col' as *; // Grid system
@use './flex' as *; // Flexbox utilities
@use './common' as *; // Common styles
@use './common2' as *; // Additional styles
```

## Design Tokens

### Breakpoints

Mobile-first responsive breakpoints:

```scss
$breakpoints: (
    xs: 0,
    // Extra small devices (portrait phones)
    sm: 576px,
    // Small devices (landscape phones)
    md: 768px,
    // Medium devices (tablets)
    lg: 992px,
    // Large devices (desktops)
    xl: 1200px,
    // Extra large devices (large desktops)
    xxl: 1400px, // Extra extra large devices
);
```

### Spacing Scale

8px base unit system:

```scss
$spacing-0: 0; // 0px
$spacing-1: 0.25rem; // 4px
$spacing-2: 0.5rem; // 8px
$spacing-3: 0.75rem; // 12px
$spacing-4: 1rem; // 16px
$spacing-5: 1.25rem; // 20px
$spacing-6: 1.5rem; // 24px
$spacing-8: 2rem; // 32px
$spacing-10: 2.5rem; // 40px
$spacing-12: 3rem; // 48px
$spacing-16: 4rem; // 64px
$spacing-20: 5rem; // 80px
$spacing-24: 6rem; // 96px
$spacing-32: 8rem; // 128px
$spacing-40: 10rem; // 160px
$spacing-48: 12rem; // 192px
$spacing-56: 14rem; // 224px
$spacing-64: 16rem; // 256px
```

### Typography Scale

Rem-based font sizes for better scaling:

```scss
$font-size-xs: 0.75rem; // 12px
$font-size-sm: 0.875rem; // 14px
$font-size-base: 1rem; // 16px
$font-size-lg: 1.125rem; // 18px
$font-size-xl: 1.25rem; // 20px
$font-size-2xl: 1.5rem; // 24px
$font-size-3xl: 1.875rem; // 30px
$font-size-4xl: 2.25rem; // 36px
$font-size-5xl: 3rem; // 48px
$font-size-6xl: 3.75rem; // 60px
```

## Responsive Breakpoints

### Usage

Use the `@include breakpoint()` mixin for responsive styles:

```scss
.my-component {
    // Mobile-first base styles
    padding: $spacing-4;
    font-size: $font-size-base;

    // Tablet and up
    @include breakpoint(md) {
        padding: $spacing-6;
        font-size: $font-size-lg;
    }

    // Desktop and up
    @include breakpoint(lg) {
        padding: $spacing-8;
        font-size: $font-size-xl;
    }
}
```

### Legacy Support

For backward compatibility, the old `@include responsive()` mixin is still available:

```scss
.my-component {
    @include responsive(md) {
        // Styles for screens smaller than 768px
    }
}
```

## Typography

### Heading Styles

All headings are responsive and use the design system's typography scale:

```html
<h1>Main Heading</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Card Heading</h4>
<h5>Small Heading</h5>
<h6>Tiny Heading</h6>
```

### Responsive Typography

Headings automatically scale down on smaller screens:

- `h1`: 36px → 30px → 24px
- `h2`: 30px → 24px → 20px
- `h3`: 24px → 20px → 18px

### Text Utilities

```html
<p class="text-sm">Small text</p>
<p class="text-base">Base text</p>
<p class="text-lg">Large text</p>
<p class="text-xl">Extra large text</p>

<p class="font-light">Light weight</p>
<p class="font-normal">Normal weight</p>
<p class="font-medium">Medium weight</p>
<p class="font-semibold">Semibold weight</p>
<p class="font-bold">Bold weight</p>
```

## Spacing System

### Margin and Padding Utilities

The system generates responsive spacing utilities for all breakpoints:

```html
<!-- Margin -->
<div class="m-4">Margin all sides</div>
<div class="mt-4">Margin top</div>
<div class="mb-4">Margin bottom</div>
<div class="ml-4">Margin left</div>
<div class="mr-4">Margin right</div>
<div class="mx-4">Margin horizontal</div>
<div class="my-4">Margin vertical</div>

<!-- Padding -->
<div class="p-4">Padding all sides</div>
<div class="pt-4">Padding top</div>
<div class="pb-4">Padding bottom</div>
<div class="pl-4">Padding left</div>
<div class="pr-4">Padding right</div>
<div class="px-4">Padding horizontal</div>
<div class="py-4">Padding vertical</div>

<!-- Responsive spacing -->
<div class="p-4 md:p-6 lg:p-8">Responsive padding</div>
```

## Color System

### Primary Colors

```scss
$primary-50: #e6f4ff; // Lightest
$primary-100: #bae0ff;
$primary-200: #91caff;
$primary-300: #69b1ff;
$primary-400: #4096ff;
$primary-500: #1677ff; // Main brand color
$primary-600: #0958d9;
$primary-700: #004fc4;
$primary-800: #003eb3;
$primary-900: #002c8c; // Darkest
```

### Semantic Colors

```scss
// Success
$success-500: #52c41a;

// Warning
$warning-500: #faad14;

// Error
$error-500: #f5222d;

// Info
$info-500: #1890ff;
```

### Color Utilities

```html
<div class="text-primary">Primary text</div>
<div class="text-success">Success text</div>
<div class="text-warning">Warning text</div>
<div class="text-error">Error text</div>

<div class="bg-primary">Primary background</div>
<div class="bg-success">Success background</div>
<div class="bg-warning">Warning background</div>
<div class="bg-error">Error background</div>
```

## Component Library

### Buttons

```html
<!-- Button variants -->
<button class="btn btn--primary">Primary Button</button>
<button class="btn btn--secondary">Secondary Button</button>
<button class="btn btn--success">Success Button</button>
<button class="btn btn--warning">Warning Button</button>
<button class="btn btn--error">Error Button</button>

<!-- Button sizes -->
<button class="btn btn--primary btn--sm">Small Button</button>
<button class="btn btn--primary">Default Button</button>
<button class="btn btn--primary btn--lg">Large Button</button>

<!-- Button styles -->
<button class="btn btn--outline">Outline Button</button>
<button class="btn btn--ghost">Ghost Button</button>
```

### Cards

```html
<!-- Basic card -->
<div class="card">
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
</div>

<!-- Card variants -->
<div class="card card--compact">Compact card</div>
<div class="card card--spacious">Spacious card</div>
<div class="card card--bordered">Bordered card</div>
<div class="card card--elevated">Elevated card</div>
```

### Forms

```html
<form>
    <label class="form-label">Email</label>
    <input type="email" class="form-input" placeholder="Enter your email" />

    <label class="form-label">Password</label>
    <input type="password" class="form-input form-input--error" placeholder="Enter your password" />
    <div class="form-error">Password is required</div>
</form>
```

### Layout Components

```html
<!-- Section -->
<section class="section">
    <h2>Section Title</h2>
    <p>Section content</p>
</section>

<!-- Hero section -->
<section class="hero">
    <h1 class="hero__title">Welcome to Our Platform</h1>
    <p class="hero__subtitle">The best solution for your needs</p>
    <div class="hero__actions">
        <button class="btn btn--primary">Get Started</button>
        <button class="btn btn--outline">Learn More</button>
    </div>
</section>
```

## Utility Classes

### Layout Utilities

```html
<!-- Display -->
<div class="d-block">Block</div>
<div class="d-flex">Flex</div>
<div class="d-grid">Grid</div>
<div class="d-none">Hidden</div>

<!-- Responsive display -->
<div class="d-none md:d-block">Hidden on mobile, visible on tablet+</div>
<div class="d-block lg:d-none">Visible on mobile, hidden on desktop</div>
```

### Flexbox Utilities

```html
<!-- Flex direction -->
<div class="d-flex flex-row">Row</div>
<div class="d-flex flex-col">Column</div>

<!-- Justify content -->
<div class="d-flex justify-start">Start</div>
<div class="d-flex justify-center">Center</div>
<div class="d-flex justify-end">End</div>
<div class="d-flex justify-between">Between</div>

<!-- Align items -->
<div class="d-flex items-start">Start</div>
<div class="d-flex items-center">Center</div>
<div class="d-flex items-end">End</div>
```

### Spacing Utilities

```html
<!-- Margin -->
<div class="m-0">No margin</div>
<div class="m-4">16px margin</div>
<div class="mt-4">16px top margin</div>
<div class="mb-4">16px bottom margin</div>

<!-- Padding -->
<div class="p-0">No padding</div>
<div class="p-4">16px padding</div>
<div class="pt-4">16px top padding</div>
<div class="pb-4">16px bottom padding</div>
```

### Responsive Utilities

All utilities are responsive:

```html
<!-- Responsive spacing -->
<div class="p-4 md:p-6 lg:p-8">Responsive padding</div>

<!-- Responsive text -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">Responsive heading</h1>

<!-- Responsive display -->
<div class="d-none md:d-block lg:d-flex">Responsive display</div>
```

## Best Practices

### 1. Mobile-First Approach

Always start with mobile styles and enhance for larger screens:

```scss
.my-component {
    // Mobile styles (default)
    padding: $spacing-4;
    font-size: $font-size-base;

    // Tablet and up
    @include breakpoint(md) {
        padding: $spacing-6;
        font-size: $font-size-lg;
    }

    // Desktop and up
    @include breakpoint(lg) {
        padding: $spacing-8;
        font-size: $font-size-xl;
    }
}
```

### 2. Use Design Tokens

Always use variables instead of hardcoded values:

```scss
// ✅ Good
.my-component {
    padding: $spacing-6;
    color: $primary-500;
    font-size: $font-size-lg;
}

// ❌ Bad
.my-component {
    padding: 24px;
    color: #1677ff;
    font-size: 18px;
}
```

### 3. Leverage Utility Classes

Use utility classes for common patterns:

```html
<!-- ✅ Good - Uses utilities -->
<div class="d-flex items-center justify-between p-4 bg-white rounded-lg shadow">
    <h3 class="text-lg font-semibold">Title</h3>
    <button class="btn btn--primary">Action</button>
</div>

<!-- ❌ Bad - Custom CSS for everything -->
<div class="custom-header">
    <h3 class="custom-title">Title</h3>
    <button class="custom-button">Action</button>
</div>
```

### 4. Consistent Spacing

Use the spacing scale consistently:

```scss
// ✅ Good - Uses spacing scale
.my-component {
    margin-bottom: $spacing-6;
    padding: $spacing-4;
}

// ❌ Bad - Inconsistent spacing
.my-component {
    margin-bottom: 25px;
    padding: 15px;
}
```

### 5. Semantic Color Usage

Use semantic colors for their intended purpose:

```scss
// ✅ Good - Semantic colors
.success-message {
    color: $success-500;
    background-color: $success-50;
}

.error-message {
    color: $error-500;
    background-color: $error-50;
}

// ❌ Bad - Hardcoded colors
.success-message {
    color: #52c41a;
    background-color: #f6ffed;
}
```

## Examples

### Responsive Card Grid

```html
<div class="container">
    <div class="d-grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="card">
            <h3 class="text-xl font-semibold mb-4">Card 1</h3>
            <p class="text-gray-600">Card content goes here.</p>
        </div>
        <div class="card">
            <h3 class="text-xl font-semibold mb-4">Card 2</h3>
            <p class="text-gray-600">Card content goes here.</p>
        </div>
        <div class="card">
            <h3 class="text-xl font-semibold mb-4">Card 3</h3>
            <p class="text-gray-600">Card content goes here.</p>
        </div>
    </div>
</div>
```

### Responsive Navigation

```html
<nav class="d-flex items-center justify-between p-4 bg-white shadow">
    <div class="d-flex items-center">
        <img src="logo.svg" alt="Logo" class="h-8" />
        <span class="ml-3 text-lg font-semibold">Brand</span>
    </div>

    <!-- Desktop menu -->
    <div class="d-none md:d-flex items-center gap-6">
        <a href="#" class="text-gray-600 hover:text-primary">Home</a>
        <a href="#" class="text-gray-600 hover:text-primary">About</a>
        <a href="#" class="text-gray-600 hover:text-primary">Contact</a>
        <button class="btn btn--primary">Sign Up</button>
    </div>

    <!-- Mobile menu button -->
    <button class="d-block md:d-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
            ></path>
        </svg>
    </button>
</nav>
```

### Responsive Form

```html
<form class="max-w-md mx-auto p-6">
    <div class="mb-4">
        <label class="form-label">Email Address</label>
        <input type="email" class="form-input" placeholder="Enter your email" />
    </div>

    <div class="mb-6">
        <label class="form-label">Password</label>
        <input type="password" class="form-input" placeholder="Enter your password" />
    </div>

    <div class="d-flex flex-col sm:flex-row gap-4">
        <button type="submit" class="btn btn--primary flex-1">Sign In</button>
        <button type="button" class="btn btn--outline flex-1">Cancel</button>
    </div>
</form>
```

## Performance Considerations

### CSS Bundle Size

- The design system generates many utility classes
- Consider using PurgeCSS to remove unused utilities
- Use critical CSS for above-the-fold content

### Responsive Images

```html
<img
    src="image.jpg"
    srcset="image-300w.jpg 300w, image-600w.jpg 600w, image-900w.jpg 900w"
    sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
    alt="Responsive image"
/>
```

### Performance Best Practices

1. **Use CSS Grid and Flexbox** for layouts instead of floats
2. **Minimize DOM queries** by using utility classes
3. **Optimize images** and use appropriate formats (WebP, AVIF)
4. **Use lazy loading** for images below the fold
5. **Implement proper caching** strategies

## Browser Support

The design system supports:

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **iOS Safari**: 14+
- **Android Chrome**: 90+

### Polyfills

For older browsers, consider adding:

- CSS Grid polyfill
- Flexbox polyfill
- Custom properties polyfill

## Contributing

When contributing to the design system:

1. Follow the established naming conventions
2. Use design tokens for all values
3. Write responsive, mobile-first code
4. Document new components and utilities
5. Test across different screen sizes
6. Ensure accessibility compliance

## Resources

- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Responsive Design Patterns](https://www.lukew.com/ff/entry.asp?1514)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
