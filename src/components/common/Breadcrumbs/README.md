# Breadcrumbs Component

A comprehensive, modular breadcrumb navigation system built with React, TypeScript, and SCSS following modern architectural patterns and accessibility best practices.

## 🏗️ Architecture Overview

### Modular Component Structure

```
src/components/common/Breadcrumbs/
├── index.tsx                          # Main Breadcrumbs component
├── Breadcrumbs.scss                   # Main component styles
├── components/                        # Modular components
│   ├── BreadcrumbItem/                # Individual breadcrumb item
│   │   ├── index.tsx
│   │   ├── BreadcrumbItem.scss
│   │   └── BreadcrumbItem.types.ts
│   ├── BreadcrumbSeparator/           # Breadcrumb separator
│   │   ├── index.tsx
│   │   ├── BreadcrumbSeparator.scss
│   │   └── BreadcrumbSeparator.types.ts
│   └── BreadcrumbEllipsis/            # Ellipsis for truncated items
│       ├── index.tsx
│       ├── BreadcrumbEllipsis.scss
│       └── BreadcrumbEllipsis.types.ts
├── hooks/                            # Custom React hooks
│   └── useBreadcrumbs.ts             # Breadcrumb state management
├── types/                            # TypeScript definitions
│   └── breadcrumbs.types.ts          # Comprehensive type system
├── utils/                            # Utility functions
│   └── breadcrumbs.utils.ts          # Helper functions
└── README.md                         # Documentation
```

## ✨ Key Features

### 🎯 Navigation Excellence

- **Smart Truncation**: Automatically truncates long breadcrumb trails
- **Expandable**: Click to show hidden breadcrumb items
- **Home Integration**: Optional home icon and link
- **Multiple Separators**: Chevron, slash, arrow, and dot separators
- **Responsive Design**: Adapts to different screen sizes

### 🔧 Technical Excellence

- **TypeScript**: Comprehensive type safety with strict interfaces
- **Performance**: React.memo, useMemo, and useCallback optimizations
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation
- **Responsive**: Mobile-first design with breakpoint mixins
- **Modularity**: Reusable components with clear separation of concerns

## 🚀 Usage

### Basic Implementation

```tsx
import Breadcrumbs from '@/components/common/Breadcrumbs';

const breadcrumbItems = [
    { id: 'home', name: 'Home', link: '/', isActive: false },
    { id: 'products', name: 'Products', link: '/products', isActive: false },
    { id: 'speakers', name: 'Speakers', link: '/products/speakers', isActive: false },
    { id: 'toa-hx5b', name: 'TOA HX-5B', isActive: true },
];

function App() {
    return (
        <Breadcrumbs
            items={breadcrumbItems}
            variant="default"
            separator="chevron"
            showHome={true}
            maxItems={5}
            onItemClick={(item, index) => console.log('Clicked:', item, index)}
        />
    );
}
```

### Advanced Implementation

```tsx
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { createBreadcrumbItem } from '@/components/common/Breadcrumbs/utils/breadcrumbs.utils';

const breadcrumbItems = [
    createBreadcrumbItem('home', 'Home', false, '/', <HomeOutlined />),
    createBreadcrumbItem('category', 'Audio Equipment', false, '/audio'),
    createBreadcrumbItem('subcategory', 'Speakers', false, '/audio/speakers'),
    createBreadcrumbItem(
        'product',
        'TOA HX-5B',
        true,
        undefined,
        undefined,
        'Current product page',
    ),
];

function App() {
    return (
        <Breadcrumbs
            items={breadcrumbItems}
            variant="detailed"
            separator="arrow"
            showHome={true}
            maxItems={3}
            onItemClick={(item, index) => {
                // Handle navigation
                if (item.link) {
                    navigate(item.link);
                }
            }}
            ariaLabel="Product navigation breadcrumbs"
        />
    );
}
```

## 📋 Component API

### Breadcrumbs Props

```typescript
interface BreadcrumbsProps {
    readonly items: BreadcrumbItem[];
    readonly className?: string;
    readonly variant?: 'default' | 'compact' | 'detailed';
    readonly separator?: 'chevron' | 'slash' | 'arrow' | 'dot';
    readonly showHome?: boolean;
    readonly homeIcon?: React.ReactNode;
    readonly maxItems?: number;
    readonly onItemClick?: (item: BreadcrumbItem, index: number) => void;
    readonly ariaLabel?: string;
}
```

### BreadcrumbItem Interface

```typescript
interface BreadcrumbItem {
    readonly id: string;
    readonly name: string;
    readonly link?: string;
    readonly isActive: boolean;
    readonly icon?: React.ReactNode;
    readonly ariaLabel?: string;
}
```

## 🎨 Styling Architecture

- **Component-Specific**: Each component has its own SCSS file
- **Global Tokens**: Uses design system variables and mixins
- **Responsive**: Mobile-first approach with breakpoint mixins
- **Theming**: Dark mode support with CSS custom properties
- **Performance**: Optimized CSS with minimal specificity

## 🔧 Custom Hooks

### useBreadcrumbs

Manages breadcrumb truncation and expansion state

```typescript
const {
    visibleItems,
    hiddenItems,
    showEllipsis,
    actions: { expandBreadcrumbs, collapseBreadcrumbs, isExpanded },
} = useBreadcrumbs(items, maxItems);
```

## 🛠️ Utility Functions

### Breadcrumb Creation

```typescript
import { createBreadcrumbItem } from './utils/breadcrumbs.utils';

const item = createBreadcrumbItem(
    'product-id',
    'Product Name',
    true, // isActive
    '/product-url',
    <Icon />, // icon
    'Product page' // ariaLabel
);
```

### Breadcrumb Manipulation

```typescript
import {
    addBreadcrumbItem,
    removeBreadcrumbItem,
    setBreadcrumbItemActive,
    updateBreadcrumbItem,
} from './utils/breadcrumbs.utils';

// Add item
const newItems = addBreadcrumbItem(items, newItem, 'end');

// Remove item
const filteredItems = removeBreadcrumbItem(items, 'item-id');

// Update item
const updatedItems = updateBreadcrumbItem(items, 'item-id', { name: 'New Name' });

// Set active
const activeItems = setBreadcrumbItemActive(items, 'item-id');
```

### Breadcrumb Truncation

```typescript
import { truncateBreadcrumbs } from './utils/breadcrumbs.utils';

const { visibleItems, hiddenItems, showEllipsis } = truncateBreadcrumbs(items, 5);
```

## ♿ Accessibility Features

### ARIA Support

- **Semantic HTML**: Proper `<nav>` and `<ol>` structure
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators and logical tab order

### Screen Reader Support

- **Breadcrumb Trail**: Screen readers announce the full path
- **Current Page**: Active item marked with `aria-current="page"`
- **Expandable Items**: Clear indication of hidden items
- **Navigation Context**: Breadcrumb purpose clearly communicated

## 🎯 Variants

### Default Variant

Standard breadcrumb appearance with medium spacing and typography.

### Compact Variant

Smaller spacing and typography for space-constrained layouts.

### Detailed Variant

Larger spacing and typography for prominent navigation areas.

## 🔄 Separators

### Chevron (›)

Default separator with right-pointing chevron.

### Slash (/)

Simple forward slash separator.

### Arrow (→)

Right-pointing arrow separator.

### Dot (•)

Bullet point separator.

## 📱 Responsive Behavior

### Mobile (< 768px)

- Reduced spacing and font sizes
- Hidden text in ellipsis button
- Simplified separator appearance

### Tablet (768px - 1024px)

- Medium spacing and typography
- Full ellipsis button text
- Standard separator appearance

### Desktop (> 1024px)

- Full spacing and typography
- All features available
- Enhanced hover effects

## 🧪 Testing Strategy

### Unit Tests

- Component rendering tests
- Hook behavior tests
- Utility function tests
- Type safety tests

### Integration Tests

- Navigation flow tests
- Truncation logic tests
- Accessibility tests

### E2E Tests

- Complete navigation journeys
- Cross-browser compatibility
- Performance testing

## 📈 Performance Optimizations

### React Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useMemo**: Memoizes expensive calculations
- **useCallback**: Prevents function recreation on every render

### CSS Optimizations

- **Efficient Selectors**: Minimal specificity
- **Hardware Acceleration**: Transform-based animations
- **Minimal Repaints**: Optimized transition properties

## 🔮 Future Enhancements

### Planned Features

- **Breadcrumb History**: Track and restore previous states
- **Smart Truncation**: AI-powered intelligent truncation
- **Breadcrumb Analytics**: Track navigation patterns
- **Custom Separators**: User-defined separator components

### Performance Improvements

- **Virtual Scrolling**: For extremely long breadcrumb trails
- **Lazy Loading**: Load breadcrumb items on demand
- **Caching Strategy**: Cache breadcrumb configurations
