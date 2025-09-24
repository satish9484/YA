# ProductDetail Components

This directory contains all the components used in the ProductDetail page, organized in a professional structure with each component having its own directory.

## Component Structure

Each component follows this structure:

```
ComponentName/
├── index.tsx              # Main component file
├── ComponentName.module.scss  # Component-specific styles
└── README.md              # Component documentation (optional)
```

## Components

### 1. ApplicationsGallery

- **Purpose**: Displays application images and use cases
- **Files**: `index.tsx`
- **SCSS**: Not yet created (needs styling)

### 2. DispersionShowcase

- **Purpose**: Interactive dispersion pattern visualization
- **Files**: `index.tsx`
- **SCSS**: Not yet created (needs styling)

### 3. ErrorState

- **Purpose**: Error handling and display component
- **Files**: `index.tsx`, `ErrorState.module.scss`
- **SCSS**: ✅ Complete

### 4. HeroSection

- **Purpose**: Main hero section with product image and basic info
- **Files**: `index.tsx`, `HeroSection.module.scss`
- **SCSS**: ✅ Complete

### 5. ProductImageGallery

- **Purpose**: Product image gallery with thumbnails and zoom
- **Files**: `index.tsx`, `ProductImageGallery.module.scss`
- **SCSS**: ✅ Complete

### 6. ProductInfo

- **Purpose**: Product information, pricing, and key features
- **Files**: `index.tsx`
- **SCSS**: Not yet created (needs styling)

### 7. ResourceHub

- **Purpose**: Downloads, documentation, and support resources
- **Files**: `index.tsx`
- **SCSS**: Not yet created (needs styling)

### 8. ReviewsQA

- **Purpose**: Customer reviews and Q&A section
- **Files**: `index.tsx`, `ReviewsQA.module.scss`
- **SCSS**: ✅ Complete

### 9. SectionWrapper

- **Purpose**: Reusable wrapper for page sections
- **Files**: `index.tsx`, `SectionWrapper.module.scss`
- **SCSS**: ✅ Complete

### 10. SystemBuilder

- **Purpose**: Interactive system configuration tool
- **Files**: `index.tsx`, `SystemBuilder.module.scss`
- **SCSS**: ✅ Complete

### 11. TechnicalSpecifications

- **Purpose**: Detailed technical specifications table
- **Files**: `index.tsx`, `TechnicalSpecifications.module.scss`
- **SCSS**: ✅ Complete

## Import Structure

All components are exported from the main `index.ts` file:

```typescript
import {
    ApplicationsGallery,
    DispersionShowcase,
    ErrorState,
    HeroSection,
    ProductImageGallery,
    ProductInfo,
    ResourceHub,
    ReviewsQA,
    SectionWrapper,
    SystemBuilder,
    TechnicalSpecifications,
} from './components';
```

## SCSS Architecture

Each component uses CSS Modules for scoped styling:

- **File naming**: `ComponentName.module.scss`
- **Import pattern**: `import styles from './ComponentName.module.scss'`
- **Usage**: `className={styles.className}`
- **Theme support**: All components use theme-adaptive colors

## Benefits of This Structure

1. **Modularity**: Each component is self-contained
2. **Maintainability**: Easy to find and modify component-specific code
3. **Reusability**: Components can be easily reused across the application
4. **Scalability**: Easy to add new components or modify existing ones
5. **Team Collaboration**: Clear separation of concerns for team development
6. **Testing**: Each component can be tested independently

## Next Steps

1. Create SCSS files for components missing them:
    - ApplicationsGallery
    - DispersionShowcase
    - ProductInfo
    - ResourceHub

2. Add component documentation (README.md) for complex components

3. Consider adding TypeScript interfaces for component props in separate files

4. Add unit tests for each component in a `__tests__` directory
