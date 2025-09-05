# Products Pages with Breadcrumb Integration

A comprehensive product management system with integrated breadcrumb navigation, built with React, TypeScript, and SCSS following modern architectural patterns.

## 🏗️ Architecture Overview

### File Structure

```
src/pages/Products/
├── index.tsx                          # Main Products page
├── ProductCatalog/                    # Product catalog module
│   ├── index.tsx                      # Main catalog component
│   ├── ProductDetail/                 # Product detail module
│   │   ├── index.tsx                  # Product detail component
│   │   └── ProductDetail.scss         # Product detail styles
│   ├── components/                    # Modular components
│   ├── hooks/                         # Custom hooks
│   ├── types/                         # TypeScript definitions
│   ├── utils/                         # Utility functions
│   └── data/                          # Product data
├── components/                        # Product-specific components
│   ├── CategoryBreadcrumbs/           # Category breadcrumb component
│   └── ProductDetailBreadcrumbs/      # Product detail breadcrumb component
├── hooks/                            # Product-specific hooks
│   └── useBreadcrumbs.ts             # Breadcrumb management hook
├── utils/                            # Product utilities
│   ├── breadcrumb.utils.ts           # Breadcrumb generation utilities
│   └── breadcrumb-icons.tsx          # Breadcrumb icon definitions
├── examples/                         # Usage examples
│   └── BreadcrumbExamples.tsx        # Breadcrumb implementation examples
└── README.md                         # This documentation
```

## ✨ Key Features

### 🧭 Smart Breadcrumb Navigation

- **Automatic Generation**: Breadcrumbs automatically generated based on current route and context
- **Context-Aware**: Different breadcrumb trails for products, categories, and product details
- **Icon Integration**: Appropriate icons for each breadcrumb level
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Full ARIA support and keyboard navigation

### 🎯 Product Management

- **Product Catalog**: Comprehensive product listing with pagination
- **Product Details**: Detailed product information with image galleries
- **Category Navigation**: Organized product categories
- **Search & Filter**: Advanced product discovery features

## 🚀 Usage

### Basic Implementation

```tsx
import Breadcrumbs from '@/components/common/Breadcrumbs';

import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

const ProductCatalog = () => {
    const { breadcrumbs, handleBreadcrumbClick } = useBreadcrumbs();

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbs}
                onItemClick={handleBreadcrumbClick}
                variant="default"
                separator="chevron"
            />
            {/* Rest of component */}
        </div>
    );
};
```

### Product Detail Implementation

```tsx
import Breadcrumbs from '@/components/common/Breadcrumbs';

import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

const ProductDetail = ({ product }) => {
    const { breadcrumbs, handleBreadcrumbClick } = useBreadcrumbs({
        productId: product.id,
        productName: product.name,
        categoryId: product.category.toLowerCase().replace(/\s+/g, '-'),
        categoryName: product.category,
    });

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbs}
                onItemClick={handleBreadcrumbClick}
                variant="default"
                separator="chevron"
            />
            {/* Rest of component */}
        </div>
    );
};
```

### Specialized Components

```tsx
import CategoryBreadcrumbs from '../components/CategoryBreadcrumbs';
import ProductDetailBreadcrumbs from '../components/ProductDetailBreadcrumbs';

// Category page
<CategoryBreadcrumbs
    categoryId="line-array"
    categoryName="Line Array Speakers"
    onItemClick={handleBreadcrumbClick}
    variant="default"
    separator="arrow"
/>

// Product detail page
<ProductDetailBreadcrumbs
    productId="toa-hx5b"
    productName="TOA HX-5B"
    categoryId="line-array"
    categoryName="Line Array Speakers"
    onItemClick={handleBreadcrumbClick}
    variant="detailed"
    separator="chevron"
/>
```

## 🔧 Custom Hooks

### useBreadcrumbs

Manages breadcrumb generation and navigation for Products pages.

```typescript
const {
    breadcrumbs,
    handleBreadcrumbClick
} = useBreadcrumbs({
    productId?: string;
    productName?: string;
    categoryId?: string;
    categoryName?: string;
});
```

**Features:**

- Automatic breadcrumb generation based on context
- Icon integration for visual consistency
- Click handling for navigation
- Path-based fallback generation

## 🛠️ Utility Functions

### Breadcrumb Generation

```typescript
import {
    generateBreadcrumbsFromPath,
    generateCategoryPageBreadcrumbs,
    generateProductDetailBreadcrumbs,
    generateProductsPageBreadcrumbs,
} from '../utils/breadcrumb.utils';

// Generate specific breadcrumb trails
const productsBreadcrumbs = generateProductsPageBreadcrumbs();
const categoryBreadcrumbs = generateCategoryPageBreadcrumbs('line-array', 'Line Array Speakers');
const productBreadcrumbs = generateProductDetailBreadcrumbs(
    'toa-hx5b',
    'TOA HX-5B',
    'line-array',
    'Line Array Speakers',
);

// Generate from URL path
const pathBreadcrumbs = generateBreadcrumbsFromPath('/products/line-array/toa-hx5b');
```

### Icon Management

```typescript
import { getBreadcrumbIcon } from '../utils/breadcrumb-icons';

// Get appropriate icon for breadcrumb item
const icon = getBreadcrumbIcon('line-array'); // Returns <SoundOutlined />
```

## 🎨 Breadcrumb Variants

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

## ♿ Accessibility Features

### ARIA Support

- **Semantic HTML**: Proper `<nav>` and `<ol>` structure
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators and logical tab order

### Screen Reader Support

- **Breadcrumb Trail**: Screen readers announce the full path
- **Current Page**: Active item marked with `aria-current="page"`
- **Context Information**: Clear indication of current location
- **Navigation Context**: Breadcrumb purpose clearly communicated

## 🧪 Testing Strategy

### Unit Tests

- Component rendering tests
- Hook behavior tests
- Utility function tests
- Type safety tests

### Integration Tests

- Navigation flow tests
- Breadcrumb generation tests
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

### Breadcrumb Optimizations

- **Icon Caching**: Icons are cached and reused
- **Path Caching**: Breadcrumb generation is memoized
- **Lazy Loading**: Components loaded on demand

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

## 📚 Examples

See `src/pages/Products/examples/BreadcrumbExamples.tsx` for comprehensive usage examples including:

- Different breadcrumb variants
- Various separator types
- Context-specific implementations
- Code examples and best practices

## 🎯 Best Practices

1. **Use Context**: Always provide context when possible for accurate breadcrumb generation
2. **Consistent Icons**: Use the centralized icon system for consistency
3. **Accessibility**: Ensure proper ARIA labels and keyboard navigation
4. **Performance**: Use memoization for expensive breadcrumb calculations
5. **Responsive**: Test breadcrumbs across different screen sizes
6. **Error Handling**: Provide fallback breadcrumbs for error states
