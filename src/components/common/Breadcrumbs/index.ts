// Breadcrumbs - Professional Implementation
// Using Ant Design Breadcrumb component with React Router integration

export { default as Breadcrumbs } from './Breadcrumbs';
export { useBreadcrumbs } from './hooks/useBreadcrumbs';
export {
    getAllRouterNames,
    getRoutePath,
    getRoutesByCategory,
    hasRoute,
} from './utils/routeMapping';

// Re-export types for convenience
export type {
    BreadcrumbClickEvent,
    BreadcrumbItem,
    BreadcrumbsProps,
    RouteMapping,
} from './types/breadcrumbs.types';

// Default export for easy importing
export { default } from './Breadcrumbs';
